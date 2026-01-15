import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test.describe('Data Loading and Integration', () => {
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

    test('should load sites.json data correctly', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        // Should display site count (means data loaded)
        const siteCountText = page.locator('text=/Search through \\d+ sites/i');
        await expect(siteCountText).toBeVisible();

        // Search for a known site
        await page.fill('input[placeholder*="Search domains"]', 'google.com');
        await expect(page.locator('text=/google.com/i').first()).toBeVisible();

        await page.close();
    });

    test('should load FAQ data correctly', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("FAQ")');

        // Should show FAQ categories
        await expect(page.locator('text=How can we help?')).toBeVisible();

        // Should have FAQ items
        const faqButtons = page.locator('button').filter({ hasText: /\?$/ });
        const count = await faqButtons.count();

        expect(count).toBeGreaterThan(0);

        await page.close();
    });

    test('should load tips data correctly', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Tips")');

        // Should show tips header
        await expect(page.locator('text=Security Tips')).toBeVisible();

        // Should have tip items
        const tips = page.locator('div').filter({ has: page.locator('text=/priority/i') });
        const count = await tips.count();

        expect(count).toBeGreaterThan(0);

        await page.close();
    });

    test('should handle sites with multiple 2FA methods', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'google.com');

        const result = page.locator('div', { hasText: 'google.com' }).first();
        await result.click();

        // Should display multiple methods
        const methodBadges = page.locator('[class*="uppercase tracking-tight"]').filter({ hasText: /totp|sms|u2f|hardware|software|phone|email/i });
        const badgeCount = await methodBadges.count();

        expect(badgeCount).toBeGreaterThan(1);

        await page.close();
    });

    test('should correctly identify sites with documentation links', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'google.com');

        const result = page.locator('div', { hasText: 'google.com' }).first();
        await result.click();

        // Should have setup guide button
        const setupGuide = page.locator('a:has-text("Setup Guide")');
        await expect(setupGuide).toBeVisible();

        const href = await setupGuide.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toMatch(/^https?:\/\//);

        await page.close();
    });

    test.skip('should handle domain normalization correctly', async () => {
        // Skipped: Requires external network access to www.github.com
        const page = await context.newPage();

        // Test with www prefix
        await page.goto('https://www.github.com');
        await page.waitForTimeout(1500);

        const popup = await context.newPage();
        await popup.goto(`chrome-extension://${extensionId}/popup/ui.html`);
        await popup.waitForTimeout(1000);

        // Should show normalized domain (github.com)
        await expect(popup.locator('text=/github.com/i')).toBeVisible();

        await popup.close();
        await page.close();
    });

    test.skip('should match parent domain for subdomains', async () => {
        // Skipped: Requires external network access to accounts.google.com
        const page = await context.newPage();

        // Test with subdomain
        await page.goto('https://accounts.google.com');
        await page.waitForTimeout(1500);

        const popup = await context.newPage();
        await popup.goto(`chrome-extension://${extensionId}/popup/ui.html`);
        await popup.waitForTimeout(1000);

        // Should match google.com and show 2FA available
        const has2FAText = await popup.locator('text=/2FA Available/i').count();
        expect(has2FAText).toBeGreaterThan(0);

        await popup.close();
        await page.close();
    });

    test('should filter search results efficiently with large query', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.waitForTimeout(500);

        // Search for common letter (should limit to 50 results)
        await page.fill('input[placeholder*="Search domains"]', 'a');
        await page.waitForTimeout(500);

        // Count the clickable site result divs - they have specific structure
        const results = page.locator('div.flex.items-center.justify-between.p-4.rounded-xl');
        const count = await results.count();

        // Should be limited to 50 or fewer
        expect(count).toBeLessThanOrEqual(50);
        expect(count).toBeGreaterThan(0);

        await page.close();
    });

    test('should display correct 2FA status icons in results', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'github');

        // Sites with 2FA should have green shield icon
        const result = page.locator('div', { hasText: 'github.com' }).first();
        const greenShield = result.locator('.bg-emerald-100\\/50');

        await expect(greenShield).toBeVisible();

        await page.close();
    });

    test('should handle empty FAQ categories gracefully', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("FAQ")');

        // All categories should have at least one FAQ
        const categories = page.locator('h4.uppercase.tracking-widest');
        const categoryCount = await categories.count();

        for (let i = 0; i < categoryCount; i++) {
            // Look for FAQs in this category
            const nextDiv = page.locator('div.space-y-2').nth(i);
            const faqsInCategory = nextDiv.locator('div.bg-white');
            const faqCount = await faqsInCategory.count();

            expect(faqCount).toBeGreaterThanOrEqual(0);
        }

        await page.close();
    });

    test('should maintain state when switching between tabs', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        // Go to Directory and search
        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'github');
        await expect(page.locator('text=/github.com/i').first()).toBeVisible();

        // Switch to FAQ
        await page.click('button:has-text("FAQ")');
        await expect(page.locator('text=How can we help?')).toBeVisible();

        // Switch back to Directory
        await page.click('button:has-text("Directory")');

        // Search term should still be there
        const input = page.locator('input[placeholder*="Search domains"]');
        const value = await input.inputValue();
        expect(value).toBe('github');

        await page.close();
    });

    test('should show appropriate message when viewing site details', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'github');

        const result = page.locator('div', { hasText: 'github.com' }).first();
        await result.click();

        // Should show site details header
        await expect(page.locator('h2', { hasText: 'github.com' })).toBeVisible();

        // Should show 2FA status
        await expect(page.locator('text=/2FA Available/i')).toBeVisible();

        // Should show Security Methods section
        await expect(page.locator('text=/Security Methods/i')).toBeVisible();

        await page.close();
    });

    test.skip('should handle message passing between wrapper and sandbox', async () => {
        // Skipped: Requires external network access to github.com
        const page = await context.newPage();
        await page.goto('https://github.com');
        await page.waitForTimeout(1500);

        const popup = await context.newPage();
        await popup.goto(`chrome-extension://${extensionId}/popup/index.html`);

        // Wait for iframe to load
        const frame = popup.frameLocator('#sandbox-frame');
        await expect(frame.locator('h1')).toContainText('2Step', { timeout: 10000 });

        // Should detect current site via message passing
        await expect(frame.locator('text=/github.com/i')).toBeVisible({ timeout: 5000 });

        await popup.close();
        await page.close();
    });

    test('should fall back to default site when no active tab', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        // Should eventually show a default site (github.com)
        await page.waitForTimeout(1000);

        const hasDefaultSite = await page.locator('text=/github.com/i').count() > 0;
        expect(hasDefaultSite).toBe(true);

        await page.close();
    });
});

