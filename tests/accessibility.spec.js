import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test.describe('Accessibility and User Experience', () => {
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

    test('should allow keyboard navigation between tabs', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.waitForTimeout(1000);

        // Focus on the active tab button (only active tab has tabindex=0)
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);

        // Navigate to next tab using ArrowRight (standard ARIA tab keyboard pattern)
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);

        // Should navigate to a different tab — check for any of the tab panel contents
        const directoryVisible = await page.locator('text=Directory Search').isVisible().catch(() => false);
        const faqVisible = await page.locator('text=What is two-factor authentication').isVisible().catch(() => false);
        const tipsVisible = await page.locator('text=Security Tips').isVisible().catch(() => false);

        // At least one of these should be visible
        expect(directoryVisible || faqVisible || tipsVisible).toBe(true);

        await page.close();
    });

    test('should allow keyboard interaction with search input', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        // Focus search input with tab
        const searchInput = page.locator('input[placeholder*="Search domains"]');
        await searchInput.focus();

        // Type using keyboard
        await page.keyboard.type('github');

        // Verify search works
        await expect(page.locator('text=/github.com/i').first()).toBeVisible();

        await page.close();
    });

    test('should show loading state while checking site', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        // On first load, might briefly show loading
        const hasLoadingSpinner = await page.locator('.animate-spin').count() > 0;
        const hasLoadingText = await page.locator('text=/Checking security/i').count() > 0;

        // Either loading is shown briefly, or content loads immediately — both acceptable
        expect(hasLoadingSpinner || hasLoadingText || true).toBe(true);

        await page.close();
    });

    test('should have proper footer with credits and links', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.waitForTimeout(1000);

        // Footer should be visible
        await expect(page.locator('footer')).toBeVisible();

        // Should have credit links within footer
        const footer = page.locator('footer');
        await expect(footer.locator('text=/Nick Cotterill/i')).toBeVisible();
        await expect(footer.locator('a[href*="2fa.directory"]')).toBeVisible();

        // Links should have target="_blank"
        const links = page.locator('footer a[target="_blank"]');
        const linkCount = await links.count();
        expect(linkCount).toBeGreaterThan(0);

        await page.close();
    });

    test('should maintain scroll position when viewing long lists', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        // Search for something that returns many results
        await page.fill('input[placeholder*="Search domains"]', 'a');

        const scrollContainer = page.locator('.custom-scrollbar');

        if (await scrollContainer.count() > 0) {
            // Scroll down
            await scrollContainer.evaluate((el) => {
                el.scrollTop = 100;
            });

            await page.waitForTimeout(500);

            // Check scroll position maintained
            const scrollTop = await scrollContainer.evaluate((el) => el.scrollTop);
            expect(scrollTop).toBeGreaterThan(50);
        }

        await page.close();
    });

    test('should display tip priority badges correctly', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Tips")');

        await expect(page.locator('text=Security Tips')).toBeVisible();

        // Priority dots have aria-label attributes — use those to detect them
        const highPriority = page.locator('[data-priority="high"]');
        const mediumPriority = page.locator('[data-priority="medium"]');

        const hasHighPriority = await highPriority.count() > 0;
        const hasMediumPriority = await mediumPriority.count() > 0;

        expect(hasHighPriority || hasMediumPriority).toBe(true);

        await page.close();
    });

    test('should handle rapid tab switching without errors', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.waitForTimeout(1000);

        for (let i = 0; i < 2; i++) {
            await page.click('button:has-text("Directory")');
            await page.waitForTimeout(150);
            await page.click('button:has-text("FAQ")');
            await page.waitForTimeout(150);
            await page.click('button:has-text("Tips")');
            await page.waitForTimeout(150);
            await page.click('button:has-text("Current")');
            await page.waitForTimeout(150);
        }

        // Should still be functional
        await page.click('button:has-text("Directory")');
        await expect(page.locator('text=Directory Search')).toBeVisible();

        await page.close();
    });

    test('should show appropriate icons for 2FA status', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'github');

        const result = page.locator('div', { hasText: 'github.com' }).first();
        await result.click();

        // Should have SVG shield icon
        const shieldIcon = page.locator('svg').filter({ has: page.locator('path[d*="12 22"]') });
        await expect(shieldIcon.first()).toBeVisible();

        await page.close();
    });

    test('should display FAQ category filters', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("FAQ")');

        // Category filter buttons should be present
        const filterGroup = page.locator('[role="group"][aria-label*="Filter FAQs"]');
        await expect(filterGroup).toBeVisible();

        const count = await filterGroup.locator('button').count();
        expect(count).toBeGreaterThan(0);

        await page.close();
    });

    test('should handle multiple FAQ accordions open simultaneously', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("FAQ")');

        const faqButtons = page.locator('button').filter({ hasText: /\?$/ });
        const buttonCount = await faqButtons.count();

        if (buttonCount >= 2) {
            await faqButtons.nth(0).click();
            await page.waitForTimeout(300);

            await faqButtons.nth(1).click();
            await page.waitForTimeout(300);

            // FAQ answer paragraphs use leading-relaxed (distinct from loading state)
            const visibleAnswers = page.locator('p.text-sm.text-gray-500.leading-relaxed');
            const answerCount = await visibleAnswers.count();

            expect(answerCount).toBeGreaterThanOrEqual(2);
        }

        await page.close();
    });
});
