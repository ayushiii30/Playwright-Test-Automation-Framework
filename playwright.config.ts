import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
      globalSetup: require.resolve('./global-setup'),
    testDir: './tests',
       workers: process.env.CI ? 2 : undefined,

    use: {
        baseURL: process.env.BASE_URL,

        // Headed locally, headless in GitHub Actions
       headless: process.env.GITHUB_ACTIONS === 'true',

        launchOptions: {
            slowMo: 1000,
        },

        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },

    projects: [

        // Authentication setup
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
        },

        // Actual tests
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                storageState: 'playwright/.auth/user.json',
            },
            dependencies: ['setup'],
        },
    ],

   reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', {
        resultsDir: 'allure-results',
    }],
],

});

