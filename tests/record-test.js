import { chromium } from '@playwright/test';
import path from 'path';

(async () => {
    const pathToExtension = path.join('.', 'dist');

    const context = await chromium.launchPersistentContext('', {
        headless: false,
        args: [
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`,
        ],
    });

    // Get extension ID
    let [background] = context.serviceWorkers();
    if (!background) {
        background = await context.waitForEvent('serviceworker');
    }
    const extensionId = background.url().split('/')[2];

    console.log('Extension ID:', extensionId);
    console.log('Popup URL:', `chrome-extension://${extensionId}/popup.html`);

    // Open a page to test on
    const page = await context.newPage();
    await page.goto('https://bbc.co.uk');

    // Open the inspector to record actions
    await page.pause(); // This opens Playwright Inspector
})();