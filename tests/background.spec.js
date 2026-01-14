import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test.describe('Background Service Worker', () => {
    let context;
    let extensionId;

    test.beforeAll(async () => {
        const pathToExtension = path.resolve('dist');
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
            ],
        });

        // Wait for service worker
        const serviceWorkerPromise = new Promise((resolve) => {
            context.on('serviceworker', (worker) => {
                if (worker.url().includes('extension')) {
                    resolve(worker);
                }
            });
        });

        for (let i = 0; i < 30; i++) {
            const workers = context.serviceWorkers();
            const background = workers.find(sw => sw.url().includes('extension'));
            if (background) {
                extensionId = background.url().split('/')[2];
                break;
            }
            await new Promise(r => setTimeout(r, 1000));
        }

        if (!extensionId) {
            const background = await Promise.race([
                serviceWorkerPromise,
                new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000))
            ]).catch(() => null);

            if (background) {
                extensionId = background.url().split('/')[2];
            }
        }

        if (!extensionId) {
            throw new Error('Could not find extension service worker');
        }
    }, 120000);

    test.afterAll(async () => {
        if (context) {
            await Promise.race([
                context.close(),
                new Promise(resolve => setTimeout(resolve, 5000))
            ]);
        }
    });

    test.skip('should update icon when navigating to a site with 2FA', async () => {
        // Skipped: Requires external network access to google.com
        const page = await context.newPage();

        // Navigate to a known 2FA site (google.com)
        await page.goto('https://google.com');
        await page.waitForTimeout(2000); // Wait for icon update

        // We can't directly check the extension icon, but we can verify the extension is active
        const popup = await context.newPage();
        await popup.goto(`chrome-extension://${extensionId}/popup/ui.html`);
        await popup.waitForTimeout(1000);

        // Should detect google.com as having 2FA
        await expect(popup.locator('text=/google.com/i')).toBeVisible({ timeout: 5000 });

        await popup.close();
        await page.close();
    });

    test.skip('should update icon when navigating to a site without 2FA', async () => {
        // Skipped: Requires external network access to example.com
        const page = await context.newPage();

        // Navigate to a site that likely doesn't have 2FA
        await page.goto('https://example.com');
        await page.waitForTimeout(2000);

        const popup = await context.newPage();
        await popup.goto(`chrome-extension://${extensionId}/popup/ui.html`);
        await popup.waitForTimeout(1000);

        // Should detect example.com
        await expect(popup.locator('text=/example.com/i')).toBeVisible({ timeout: 5000 });

        await popup.close();
        await page.close();
    });

    test.skip('should handle tab switching correctly', async () => {
        // Skipped: Requires external network access to github.com and example.com
        const page1 = await context.newPage();
        await page1.goto('https://github.com');
        await page1.waitForTimeout(1000);

        const page2 = await context.newPage();
        await page2.goto('https://example.com');
        await page2.waitForTimeout(1000);

        // Switch back to first tab
        await page1.bringToFront();
        await page1.waitForTimeout(1000);

        const popup = await context.newPage();
        await popup.goto(`chrome-extension://${extensionId}/popup/ui.html`);
        await popup.waitForTimeout(1000);

        // Should show github.com (active tab)
        await expect(popup.locator('text=/github.com/i')).toBeVisible({ timeout: 5000 });

        await popup.close();
        await page1.close();
        await page2.close();
    });
});

