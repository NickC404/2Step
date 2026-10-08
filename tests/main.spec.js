import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test.describe('2Step Extension', () => {
    let context;
    let extensionId;

    test.beforeAll(async () => {
        const pathToExtension = path.resolve('dist');
        console.log('--- Playwright Setup Start ---');
        console.log('Path to extension:', pathToExtension);
        test.setTimeout(120000);

        console.log('Launching browser context...');
        context = await chromium.launchPersistentContext('', {
            headless: false,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-software-rasterizer',
                '--window-size=1280,1024'
            ],
        });

        console.log('Browser context launched.');

        // Open a dummy page to wake up the service worker in CI
        console.log('Opening dummy page to trigger service worker...');
        const page = await context.newPage();
        await page.goto('about:blank');
        console.log('Dummy page loaded.');

        // Try to trigger extension loading by visiting chrome://extensions
        try {
            await page.goto('chrome://extensions/');
            await page.waitForTimeout(1000);
        } catch (e) {
            console.log('Could not access chrome://extensions (expected in some environments)');
        }

        console.log('Polling for service worker (up to 30s)...');
        let background;

        // Listen for new service workers
        const serviceWorkerPromise = new Promise((resolve) => {
            context.on('serviceworker', (worker) => {
                console.log('Service worker detected:', worker.url());
                if (worker.url().includes('extension')) {
                    resolve(worker);
                }
            });
        });

        // Poll for existing service workers with shorter timeout
        for (let i = 0; i < 30; i++) {
            // Check all service workers and find the one that belongs to our extension
            const workers = context.serviceWorkers();
            background = workers.find(sw => sw.url().includes('extension'));

            if (background) {
                console.log(`Service worker found after ${i}s!`);
                break;
            }

            await new Promise(r => setTimeout(r, 1000));
            if (i % 5 === 0 && i > 0) {
                console.log(`Still waiting for service worker (${i}s)... Total workers found: ${workers.length}`);
                if (workers.length > 0) {
                    workers.forEach((sw, idx) => console.log(` - Worker ${idx}: ${sw.url()}`));
                }
            }
        }

        // If not found through polling, try waiting for the event
        if (!background) {
            console.log('Waiting for serviceworker event (10s)...');
            background = await Promise.race([
                serviceWorkerPromise,
                new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000))
            ]).catch(() => null);
        }

        if (background) {
            extensionId = background.url().split('/')[2];
            console.log(`Extension ID: ${extensionId}`);
            console.log('--- Playwright Setup Complete ---');
        } else {
            console.error('FAILED: Service worker not found after 40s.');
            console.error('Final workers list:');
            context.serviceWorkers().forEach((sw, idx) => console.log(` - Worker ${idx}: ${sw.url()}`));

            // Additional debugging
            console.error('Extension path:', pathToExtension);
            console.error('Context pages:', context.pages().length);

            throw new Error('Could not find extension service worker after 40s');
        }
    }, 120000);

    test.afterAll(async () => {
        if (context) {
            // Give context.close() a reasonable timeout to prevent hanging worker teardown
            await Promise.race([
                context.close(),
                new Promise(resolve => setTimeout(resolve, 5000))
            ]);
        }
    });

    test('should load the popup and show current site status', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/index.html`);

        const frame = page.frameLocator('#sandbox-frame');

        // The active tab in the test harness is the extension's own page, so the
        // Current panel shows either a 2FA verdict or the "can't be checked" state.
        const statusText = frame.locator("text=/2FA (Supported|Not Supported)|can't be checked/i");
        await expect(statusText).toBeVisible({ timeout: 10000 });

        // Tab bar should be visible
        await expect(frame.locator('button:has-text("Current")')).toBeVisible({ timeout: 10000 });
    });

    test('should switch tabs', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        // Click on Directory tab
        await page.click('button:has-text("Directory")');
        await expect(page.locator('text=Directory Search')).toBeVisible();

        // Click on FAQ tab
        await page.click('button:has-text("FAQ")');
        await expect(page.locator('text=What is two-factor authentication')).toBeVisible();

        // Click on Tips tab
        await page.click('button:has-text("Tips")');
        await expect(page.locator('text=Security Tips')).toBeVisible();
    });

    test('should search in directory', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        // Search for google
        await page.fill('input[placeholder*="Search domains"]', 'google.com');

        // Check if google.com result appears
        const result = page.locator('#directory-results button', { hasText: 'google.com' }).first();
        await expect(result).toBeVisible();

        // Click on the result
        await result.click();

        // Should show site details for google.com
        await expect(page.locator('h2', { hasText: 'google.com' })).toBeVisible();
        await expect(page.locator('button:has-text("Back to list")')).toBeVisible();
    });

    test('should toggle FAQ accordion', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("FAQ")');

        // Find the first FAQ question and click it
        const firstFaq = page.locator('summary').filter({ hasText: 'What is two-factor authentication (2FA)?' }).first();
        await firstFaq.click();

        // Check if answer is visible — use leading-relaxed to distinguish from loading text
        await expect(page.locator('p.text-sm.text-gray-500.leading-relaxed').first()).toBeVisible();
    });

    test('should show security tips', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Tips")');

        // Check for a specific tip
        await expect(page.locator('text=Start with your email').first()).toBeVisible();
        await expect(page.locator('[data-priority="high"]').first()).toBeVisible();
    });

    test('should load the popup wrapper and render the app inside its frame', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/index.html`);

        const frame = page.frameLocator('#sandbox-frame');

        // Wait for the app to mount
        await expect(frame.locator('h1')).toContainText('2Step', { timeout: 10000 });

        // Verify the Current panel renders — either a 2FA verdict or, for the
        // extension's own page, the "can't be checked" state.
        const statusText = frame.locator("text=/2FA (Supported|Not Supported)|can't be checked/i");
        await expect(statusText).toBeVisible({ timeout: 10000 });
    });
});
