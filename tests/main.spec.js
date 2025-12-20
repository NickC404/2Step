import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test.describe('2Step Extension', () => {
    let context;
    let extensionId;

    test.beforeAll(async () => {
        const pathToExtension = path.resolve('dist');
        context = await chromium.launchPersistentContext('', {
            headless: false, // Extensions only work in headful mode normally, but Playwright can handle some headless cases. For this we'll use headful to be safe or special flags.
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
            ],
        });

        let [background] = context.serviceWorkers();
        if (!background) {
            background = await context.waitForEvent('serviceworker');
        }
        extensionId = background.url().split('/')[2];
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('should load the popup and show current site status', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        // Wait for the fallback detection (500ms in App.vue)
        await page.waitForTimeout(1000);

        // Check if "github.com" is shown (the default fallback)
        const siteTitle = page.locator('h2', { hasText: 'github.com' });
        await expect(siteTitle).toBeVisible();

        // Check if 2FA status is shown
        await expect(page.locator('text=2FA AVAILABLE')).toBeVisible();
    });

    test('should switch tabs', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        // Click on Directory tab
        await page.click('button:has-text("Directory")');
        await expect(page.locator('text=Directory Search')).toBeVisible();

        // Click on FAQ tab
        await page.click('button:has-text("FAQ")');
        await expect(page.locator('text=How can we help?')).toBeVisible();

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
        const result = page.locator('div', { hasText: 'google.com' }).first();
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
        const firstFaq = page.locator('button').filter({ hasText: 'What is two-factor authentication (2FA)?' }).first();
        await firstFaq.click();

        // Check if answer is visible
        // The answer text is "Two-Factor Authentication (2FA) adds an extra layer of security..." (based on typical FAQ content)
        // Let's just check for the presence of the answer container which is v-show="itemsOpen[faq.id]"
        await expect(page.locator('p.text-sm.text-gray-600').first()).toBeVisible();
    });

    test('should show security tips', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Tips")');

        // Check for a specific tip
        await expect(page.locator('text=Enable 2FA on your email first').first()).toBeVisible();
        await expect(page.locator('text=high priority').first()).toBeVisible();
    });

    test('should load the main index.html and render the iframe contents', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/index.html`);

        // The iframe has ID sandbox-frame
        const frame = page.frameLocator('#sandbox-frame');

        // Wait for the iframe content to load
        await expect(frame.locator('h1')).toContainText('2Step');

        // Verify that the site details section is eventually shown (either via wrapper message or fallback)
        // We check for the 2FA status text instead of a specific domain to be more robust
        const statusText = frame.locator('text=/2FA (Available|Not Supported)/');
        await expect(statusText).toBeVisible({ timeout: 5000 });
    });
});
