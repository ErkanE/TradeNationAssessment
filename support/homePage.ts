import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    
    readonly cookieBanner: Locator;
    readonly acceptCookiesButton: Locator;
    
    readonly logoImage: Locator;
    readonly mainNav: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.cookieBanner = page.locator('#onetrust-banner-sdk');
        this.acceptCookiesButton = page.getByRole('button', { name: 'Accept All Cookies' });
        this.logoImage = page.locator('[data-testid="logo"]');
        this.loginButton = page.getByRole('link', { name: 'Sign up / Log in' });
    }

    async goto(url): Promise<void> {
        await this.page.goto(`https://tradenation.com/${url}`);
    }

    async acceptCookies(): Promise<void> {
        try {
            await this.cookieBanner.waitFor({ state: 'visible', timeout: 10000 });
            await this.acceptCookiesButton.click();
            await this.cookieBanner.waitFor({ state: 'hidden' });
        } catch (error) {
            console.log('Cookie banner not found or already handled:', error);
        }
    }

    async isLoaded(): Promise<boolean> {
        return await this.logoImage.isVisible();
    }
}