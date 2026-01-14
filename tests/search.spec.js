import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test.describe('Search and Filter Functionality', () => {
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

    test('should filter search results case-insensitively', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        // Test lowercase
        await page.fill('input[placeholder*="Search domains"]', 'github');
        await expect(page.locator('text=/github.com/i').first()).toBeVisible();

        // Test uppercase
        await page.fill('input[placeholder*="Search domains"]', 'GITHUB');
        await expect(page.locator('text=/github.com/i').first()).toBeVisible();

        // Test mixed case
        await page.fill('input[placeholder*="Search domains"]', 'GiTHuB');
        await expect(page.locator('text=/github.com/i').first()).toBeVisible();

        await page.close();
    });

    test('should show no results message for non-existent domains', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        await page.fill('input[placeholder*="Search domains"]', 'thisdoesnotexist123456789.com');

        await expect(page.locator('text=/No sites found/i')).toBeVisible();

        await page.close();
    });

    test('should clear search and show all sites when input is cleared', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        // Search for something specific
        await page.fill('input[placeholder*="Search domains"]', 'github');
        await expect(page.locator('text=/github.com/i').first()).toBeVisible();

        // Clear search
        await page.fill('input[placeholder*="Search domains"]', '');

        // Should show multiple results again (not filtered)
        const results = page.locator('[class*="space-y-3"] > div');
        const count = await results.count();
        expect(count).toBeGreaterThan(5);

        await page.close();
    });

    test('should search by partial domain match', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        // Search for partial match
        await page.fill('input[placeholder*="Search domains"]', 'goo');

        // Should match google.com
        await expect(page.locator('text=/google.com/i').first()).toBeVisible();

        await page.close();
    });

    test('should display 2FA methods in search results', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        await page.fill('input[placeholder*="Search domains"]', 'github');

        const githubResult = page.locator('div', { hasText: 'github.com' }).first();
        await expect(githubResult).toBeVisible();

        // Should show at least one 2FA method badge
        const badges = githubResult.locator('[class*="rounded"]');
        expect(await badges.count()).toBeGreaterThan(0);

        await page.close();
    });
});

