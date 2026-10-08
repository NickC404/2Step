import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test.describe('Edge Cases and Error Handling', () => {
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

    test('should handle special characters in search', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        const specialSearches = ['@test', '!domain', 'test.com-test', 'test_domain'];

        for (const searchTerm of specialSearches) {
            await page.fill('input[placeholder*="Search domains"]', searchTerm);
            await page.waitForTimeout(300);

            // Should either show results or "no results" message without errors
            // (target the visible, quoted message — not the sr-only live region).
            const hasResults = await page.locator('#directory-results button').count() > 0;
            const hasNoResults = await page.locator('text=/No sites found matching "/i').isVisible();

            expect(hasResults || hasNoResults).toBe(true);
        }

        await page.close();
    });

    test('should handle very long search queries', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        const longQuery = 'a'.repeat(200);
        await page.fill('input[placeholder*="Search domains"]', longQuery);

        // Should show no results without crashing (visible, quoted message).
        await expect(page.locator('text=/No sites found matching "/i')).toBeVisible();

        await page.close();
    });

    test('should handle empty search gracefully', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        // Type and then clear
        await page.fill('input[placeholder*="Search domains"]', 'test');
        await page.fill('input[placeholder*="Search domains"]', '');

        // When search is empty, popular sites grid is shown
        await expect(page.locator('text=Popular sites')).toBeVisible();

        await page.close();
    });

    test('should handle rapid search input changes', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        const searchInput = page.locator('input[placeholder*="Search domains"]');

        // Rapidly type different searches
        await searchInput.fill('g');
        await page.waitForTimeout(50);
        await searchInput.fill('gi');
        await page.waitForTimeout(50);
        await searchInput.fill('git');
        await page.waitForTimeout(50);
        await searchInput.fill('gith');
        await page.waitForTimeout(50);
        await searchInput.fill('githu');
        await page.waitForTimeout(50);
        await searchInput.fill('github');

        // Should show github results
        await expect(page.locator('text=/github.com/i').first()).toBeVisible();

        await page.close();
    });

    test('should handle navigation to non-http pages', async () => {
        const page = await context.newPage();

        // Navigate to chrome:// page
        await page.goto('chrome://version/');
        await page.waitForTimeout(1000);

        const popup = await context.newPage();
        await popup.goto(`chrome-extension://${extensionId}/popup/ui.html`);
        await popup.waitForTimeout(1000);

        // Extension should not crash — header should be visible
        await expect(popup.locator('h1')).toBeVisible();

        await popup.close();
        await page.close();
    });

    test.skip('should handle subdomain detection correctly', async () => {
        // Skipped: Requires external network access to mail.google.com
        const page = await context.newPage();

        await page.goto('https://mail.google.com');
        await page.waitForTimeout(1500);

        const popup = await context.newPage();
        await popup.goto(`chrome-extension://${extensionId}/popup/ui.html`);
        await popup.waitForTimeout(1000);

        const hasGoogleDomain = await popup.locator('text=/google.com/i').isVisible();

        if (hasGoogleDomain) {
            await expect(popup.locator('text=/2FA Supported/i')).toBeVisible();
        }

        await popup.close();
        await page.close();
    });

    test.skip('should handle www prefix correctly', async () => {
        // Skipped: Requires external network access to www.github.com
        const page = await context.newPage();

        await page.goto('https://www.github.com');
        await page.waitForTimeout(1500);

        const popup = await context.newPage();
        await popup.goto(`chrome-extension://${extensionId}/popup/ui.html`);
        await popup.waitForTimeout(1000);

        await expect(popup.locator('text=/github.com/i')).toBeVisible();

        await popup.close();
        await page.close();
    });

    test('should handle popup reopening without data loss', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'github');

        const result = page.locator('div', { hasText: 'github.com' }).first();
        await result.click();

        await page.close();

        // Reopen popup
        const page2 = await context.newPage();
        await page2.goto(`chrome-extension://${extensionId}/popup/ui.html`);
        await page2.waitForTimeout(1000);

        // Should load fresh — header should be visible
        await expect(page2.locator('h1')).toBeVisible();

        await page2.close();
    });

    test('should handle clicking on result multiple times', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'github');

        const result = page.locator('div', { hasText: 'github.com' }).first();

        // Click multiple times rapidly
        await result.click();
        await result.click();
        await result.click();

        // Should still show site details correctly
        await expect(page.locator('h2', { hasText: 'github.com' })).toBeVisible();

        await page.close();
    });

    test('should handle external links opening in new tabs', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'google.com');

        const result = page.locator('div', { hasText: 'google.com' }).first();
        await result.click();

        const setupGuide = page.locator('a:has-text("Setup Guide")');
        if (await setupGuide.count() > 0) {
            const target = await setupGuide.getAttribute('target');
            expect(target).toBe('_blank');

            const href = await setupGuide.getAttribute('href');
            expect(href).toMatch(/^https?:\/\//);
        }

        await page.close();
    });

    test('should handle FAQ accordion toggle multiple times', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("FAQ")');

        const firstFaq = page.locator('button').filter({ hasText: 'What is two-factor authentication (2FA)?' }).first();

        // Toggle multiple times — odd number of clicks leaves it open
        for (let i = 0; i < 5; i++) {
            await firstFaq.click();
            await page.waitForTimeout(200);
        }

        // After 5 clicks (odd), accordion is open — answer paragraph should be visible
        // Use leading-relaxed to distinguish FAQ answers from loading state text
        await expect(page.locator('p.text-sm.text-gray-500.leading-relaxed').first()).toBeVisible();

        await page.close();
    });

    test('should maintain UI consistency with no active tab', async () => {
        const page = await context.newPage();

        await page.goto('about:blank');
        await page.waitForTimeout(1000);

        const popup = await context.newPage();
        await popup.goto(`chrome-extension://${extensionId}/popup/ui.html`);
        await popup.waitForTimeout(1000);

        // Extension should still load and show UI
        await expect(popup.locator('h1')).toBeVisible();

        // Should show the tab bar at minimum
        const hasContent = await popup.locator('text=/Directory|FAQ|Tips/i').count() > 0;
        expect(hasContent).toBe(true);

        await popup.close();
        await page.close();
    });
});
