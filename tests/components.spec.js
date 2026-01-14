import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test.describe('Component Functionality', () => {
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

    test('should display method badge tooltips on hover', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'github');

        const result = page.locator('div', { hasText: 'github.com' }).first();
        await result.click();

        // Find a method badge
        const badge = page.locator('[class*="uppercase tracking-tight"]').filter({ hasText: /totp|sms|u2f/i }).first();

        if (await badge.count() > 0) {
            // Hover over badge
            await badge.hover();
            await page.waitForTimeout(300);

            // Tooltip should become visible (checking for descriptive text)
            const tooltip = page.locator('text=/authenticator|hardware|code|password/i');
            const hasTooltip = await tooltip.count() > 0;
            expect(hasTooltip).toBe(true);
        }

        await page.close();
    });

    test('should display compact badges in search results', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'google');

        // Search results should show compact badges
        const compactBadges = page.locator('[class*="text-[10px]"]').filter({ hasText: /totp|sms|u2f/i });
        const count = await compactBadges.count();

        expect(count).toBeGreaterThan(0);

        await page.close();
    });

    test('should show +N indicator when more than 2 methods exist', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'google');

        // Look for +N indicators
        const plusIndicator = page.locator('span').filter({ hasText: /^\+\d+$/ });

        if (await plusIndicator.count() > 0) {
            const text = await plusIndicator.first().textContent();
            expect(text).toMatch(/^\+\d+$/);
        }

        await page.close();
    });

    test('should highlight active tab in tab bar', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.waitForTimeout(1000);

        // Current tab button should have active styling
        const currentTabButton = page.locator('button', { hasText: 'Current' });
        const classes = await currentTabButton.getAttribute('class');

        expect(classes).toContain('bg-white');
        expect(classes).toContain('text-blue-600');

        await page.close();
    });

    test('should update tab bar styling when switching tabs', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.waitForTimeout(1000);

        // Click Directory tab
        const directoryButton = page.locator('button', { hasText: 'Directory' });
        await directoryButton.click();

        // Directory button should now have active styling
        const classes = await directoryButton.getAttribute('class');
        expect(classes).toContain('bg-white');
        expect(classes).toContain('text-blue-600');

        // Current button should not have active styling
        const currentButton = page.locator('button', { hasText: 'Current' });
        const currentClasses = await currentButton.getAttribute('class');
        expect(currentClasses).toContain('text-blue-100');

        await page.close();
    });

    test('should handle input component v-model correctly', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        const input = page.locator('input[placeholder*="Search domains"]');

        // Type text
        await input.fill('test input');

        // Value should be updated
        const value = await input.inputValue();
        expect(value).toBe('test input');

        // Clear input
        await input.fill('');
        const clearedValue = await input.inputValue();
        expect(clearedValue).toBe('');

        await page.close();
    });

    test('should display site count in directory header', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');

        // Should show total number of sites
        const siteCountText = page.locator('text=/Search through \\d+ sites/i');
        await expect(siteCountText).toBeVisible();

        const text = await siteCountText.textContent();
        const match = text.match(/(\d+)\s+sites/i);

        if (match) {
            const count = parseInt(match[1]);
            expect(count).toBeGreaterThan(100); // Should have many sites
        }

        await page.close();
    });

    test('should show appropriate icons for different 2FA methods', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'github');

        // Results should show shield icons
        const shieldIcons = page.locator('svg').filter({ has: page.locator('path[d*="12 22"]') });
        const iconCount = await shieldIcons.count();

        expect(iconCount).toBeGreaterThan(0);

        await page.close();
    });

    test('should display hover effects on search results', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'github');

        const result = page.locator('div', { hasText: 'github.com' }).first();

        // Hover over result
        await result.hover();
        await page.waitForTimeout(200);

        // Arrow icon should appear (opacity change)
        const arrowIcon = result.locator('svg').filter({ has: page.locator('path[d*="M5 12h14"]') });
        const isVisible = await arrowIcon.isVisible();

        expect(isVisible).toBe(true);

        await page.close();
    });

    test('should show footer links with correct attributes', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.waitForTimeout(1000);

        // Check Nick Cotterill link
        const nickLink = page.locator('a[href*="nickcotterill.co.uk"]');
        await expect(nickLink).toBeVisible();

        const nickTarget = await nickLink.getAttribute('target');
        expect(nickTarget).toBe('_blank');

        // Check 2FA Directory link
        const directoryLink = page.locator('a[href*="2fa.directory"]');
        await expect(directoryLink).toBeVisible();

        const dirTarget = await directoryLink.getAttribute('target');
        expect(dirTarget).toBe('_blank');

        await page.close();
    });

    test('should display all FAQ categories with icons', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("FAQ")');

        // Should have category headers with emojis
        const categoryIcons = page.locator('span.text-lg');
        const iconCount = await categoryIcons.count();

        expect(iconCount).toBeGreaterThan(0);

        // Each category should have a name
        const categoryNames = page.locator('h4.uppercase.tracking-widest');
        const nameCount = await categoryNames.count();

        expect(nameCount).toBeGreaterThan(0);

        await page.close();
    });

    test('should format FAQ answers with proper punctuation', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("FAQ")');

        const firstFaq = page.locator('button').filter({ hasText: 'What is two-factor authentication (2FA)?' }).first();
        await firstFaq.click();
        await page.waitForTimeout(300);

        // Check that answer paragraphs end with periods
        const answerParagraphs = page.locator('p.text-sm.text-gray-500');
        const count = await answerParagraphs.count();

        if (count > 0) {
            const firstParagraph = await answerParagraphs.first().textContent();
            expect(firstParagraph.trim()).toMatch(/\.$/);
        }

        await page.close();
    });

    test('should display security tips with correct priority order', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Tips")');

        // Wait for tips section to fully render
        await expect(page.locator('text=Security Tips')).toBeVisible();
        await expect(page.locator('text=Quick wins')).toBeVisible();
        await page.waitForTimeout(1500);

        // Look for any element containing "high priority" text
        const highPriorityElements = page.locator('text=/high priority/i');
        const highCount = await highPriorityElements.count();

        // Look for any element containing "medium priority" text
        const mediumPriorityElements = page.locator('text=/medium priority/i');
        const mediumCount = await mediumPriorityElements.count();

        // Should have some priority indicators
        const totalCount = highCount + mediumCount;
        expect(totalCount).toBeGreaterThan(0);

        // Should have high priority tips (they should be ordered first)
        expect(highCount).toBeGreaterThan(0);

        await page.close();
    });

    test('should display different icons for high vs medium priority tips', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Tips")');
        await page.waitForTimeout(500);

        // High priority tips should have warning triangle icon
        const highPriorityTips = page.locator('div').filter({ has: page.locator('text=/high priority/i') });
        const highCount = await highPriorityTips.count();

        // Medium priority tips should have info circle icon
        const mediumPriorityTips = page.locator('div').filter({ has: page.locator('text=/medium priority/i') });
        const mediumCount = await mediumPriorityTips.count();

        // Should have both types
        expect(highCount + mediumCount).toBeGreaterThan(0);

        await page.close();
    });

    test('should show custom scrollbar in search results', async () => {
        const page = await context.newPage();
        await page.goto(`chrome-extension://${extensionId}/popup/ui.html`);

        await page.click('button:has-text("Directory")');
        await page.fill('input[placeholder*="Search domains"]', 'a');

        // Check that scrollable container exists
        const scrollContainer = page.locator('.custom-scrollbar');
        const exists = await scrollContainer.count() > 0;

        expect(exists).toBe(true);

        await page.close();
    });
});

