import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/logger';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.getByRole('textbox', {
            name: 'you@company.com'
        });

        this.passwordInput = page.getByPlaceholder('••••••••');

        this.signInButton = page.getByRole('button', {
            name: 'Sign in'
        });
    }

    async navigateToLoginPage() {
        Logger.info('Navigating to Login page');

        await this.page.goto('/login');
    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async login(email: string, password: string) {
        Logger.info('Attempting user login');

        try {
            await this.enterEmail(email);
            await this.enterPassword(password);
            await this.clickSignIn();

            await this.page.waitForURL(
                url => !url.pathname.includes('/login'),
                { timeout: 30000 }
            );

            Logger.info('User login successful');

        } catch (error) {
            Logger.error('User login failed');
            throw error;
        }
    }
}