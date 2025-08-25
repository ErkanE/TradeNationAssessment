import { test, expect } from '@playwright/test';
import { HomePage } from '../support/homePage';
import { GoogleLogin } from '../support/googleLogin';
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth');

test.describe('Trade Nation Homepage', () => {
    let homePage: HomePage;
    let googlelogin: GoogleLogin;

    test.beforeEach(async () => {
        chromium.use(stealth());
        
        const browser = await chromium.launch({
            headless: false,
            args: [
                '--disable-blink-features=AutomationControlled',
                '--no-sandbox',
                '--disable-web-security',
                '--disable-infobars',
                '--disable-extensions',
                '--start-maximized'
            ]
        });
        
        const context = await browser.newContext({
            viewport: { width: 1280, height: 800 },
            locale: 'en-GB',
            timezoneId: 'Europe/London',
            permissions: ['geolocation'],
            extraHTTPHeaders: {
                'Accept-Language': 'en-GB,en;q=0.9'
            }
        });
        
        await context.clearCookies();
        const page = await context.newPage();
        
        homePage = new HomePage(page);
        googlelogin = new GoogleLogin(page);
        await homePage.goto('en-gb/');
        await homePage.acceptCookies();
    });

    test('should load homepage successfully', async () => {
        test.setTimeout(90000);
        // wait for page to be loaded
        await expect(await homePage.isLoaded()).toBeTruthy();

        // navigating to login page on the Trade Nation website

        await homePage.loginButton.click();

        await googlelogin.loginButton.click();

        await googlelogin.loginWithGoogle.click();

        // at this point we are on the google login page however it should be noted that google is very good at detecting automation and this will not work most of the time.
        // It is also against google's terms of service to automate login to google accounts so this is for demonstration purposes only.
        // In order to do this in some realistic way we would need to use a real browser profile with cookies and local storage already set up to simulate a real user more closely
        // however this is not possible in the context of this exercise as it would require sharing sensitive information.
        // for the purpose of this exercise we will proceed with this approach.

        await googlelogin.page.waitForLoadState('networkidle');

        //waiting a random time between 5 and 12 seconds to attempt to simulate human behaviour
        await googlelogin.page.waitForTimeout(Math.floor(Math.random() * (12000 - 5000) + 5000));

        //await googlelogin.googleUsername.fill('InvalidUsername@gmail.com'); 

        await googlelogin.googleUsername.pressSequentially('InvalidUsername@gmail.com'); 
        
        await googlelogin.page.waitForTimeout(Math.floor(Math.random() * (4000 - 1500) + 1500));
        
        await googlelogin.page.keyboard.press('Enter');

        await googlelogin.page.waitForTimeout(Math.floor(Math.random() * (3500 - 1000) + 1000));

        //await googlelogin.googlePassword.fill('InvalidPassword123!'); 
        
        await googlelogin.googleUsername.pressSequentially('InvalidUsername@gmail.com'); 

        await googlelogin.page.waitForTimeout(Math.floor(Math.random() * (4000 - 1500) + 1500));

        await googlelogin.page.keyboard.press('Enter');

        await expect(googlelogin.googleInvalidPasswordMessage).toBeVisible();

        await expect(googlelogin.googleInvalidPasswordMessage).toHaveText('Wrong password. Try again or click ‘Forgot password’ to reset it.');

        //Overall this test would be better suited to a manual test due to the high level of bot detection employed by google. We have attempted to do this before at Reach and it has never worked with any level of consistency.

    });
});
