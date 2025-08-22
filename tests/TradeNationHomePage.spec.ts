import { test, expect } from '@playwright/test';
import { HomePage } from '../support/homePage';

test.describe('Trade Nation Homepage', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page, context }) => {
        await context.clearCookies();
        homePage = new HomePage(page);
        await homePage.goto('en-gb/markets/#forex');
        await homePage.acceptCookies();
    });

    test('should load homepage successfully', async () => {
        //wait for page to be loaded
        await expect(await homePage.isLoaded()).toBeTruthy();

        //get the page title for the forex page
        const forexpageTitle = await homePage.page.title();
        //log for illustration purposes only
        console.log(`Current page title is: ${forexpageTitle}`);
        await expect(homePage.page).toHaveTitle('Popular Markets to Trade With Us — Trade Nation');
        
        // Verify the logo is visible and clickable
        await expect(homePage.logoImage).toBeVisible();
        await homePage.logoImage.click();

        //verify that clicking the logo navigates to the homepage
        await expect(homePage.page).toHaveURL('https://tradenation.com/en-gb/');
        //get the page title for the homepage to make sure we are on the homepage
        await expect(homePage.page).toHaveTitle('Trade Nation UK – Low-Cost Spread Betting and Forex Broker');
        //log for illustration purposes only
        const homePageTitle = await homePage.page.title();
        console.log(`Current page title is: ${homePageTitle}`);
    });
});
