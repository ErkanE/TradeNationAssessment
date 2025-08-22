import { type Locator, type Page } from '@playwright/test';

export class GoogleLogin {
    readonly page: Page;
    
    readonly loginButton: Locator;
    readonly loginWithGoogle: Locator;

    readonly googleUsername: Locator;
    readonly googlePassword: Locator;
    readonly googleInvalidPasswordMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.loginButton = page.getByRole('link', { name: 'Log in here' })
        this.loginWithGoogle = page.locator('[id=logingoogle]');

        this.googleUsername = page.getByRole('textbox', { name: 'Email or phone' });
        this.googlePassword = page.getByRole('textbox', { name: 'Enter your password' });
        this.googleInvalidPasswordMessage = page.getByRole('textbox', { name: 'Wrong password. Try again or click ‘Forgot password’ to reset it.' });
    }
}