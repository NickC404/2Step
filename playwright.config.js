import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    timeout: 30000, // 30 seconds is more reasonable
    expect: {
        timeout: 10000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:4173', // Vite preview default port
        trace: 'on-first-retry',
    },

    // Add this section:
    webServer: {
        command: 'npm run preview',
        port: 4173,
        timeout: 120000,
        reuseExistingServer: !process.env.CI,
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});