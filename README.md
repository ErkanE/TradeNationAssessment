# Trade Nation Framework

Playwright test automation framework for Trade Nation website testing.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test tests/TradeNationHomePage.spec.ts

# View test report
npx playwright show-report
```

## Configuration

- Tests run on Firefox by default
- Base URL: https://tradenation.com/
- Test timeout: 60 seconds
- Action timeout: 90 seconds


--------------------------------------------------------------------------------------------------------------------------------------

Overall I have very much enjoyed this exercise. It was very thought-provoking and seeing as this is a task that I have been set, I genuinely made a good faith attempt to automate this notoriously difficult to automate process. I have attempted to automate this process before at Reach PLC but it seems to me that it isn't really worth trying to automate Google logins in this way since it is firstly against their terms of service, but also the point of automation is for processes that are highly reliable and structured. This test case, in my opinion, is best tested manually and I would bring this up to the team and demonstrate why it is neither reliable nor desirable due to the inconsistency. 

I thank you very much for this test exercise and i just want to say i did chuckle when i saw it. Brilliant!

--------------------------------------------------------------------------------------------------------------------------------------

## Google Authentication Detection Avoidance Attempts & Analysis

### Anti-Detection Measures Implemented:

1. Stealth Plugin Integration (`GoogleInvalidLogin.spec.ts:5,12`)
   - Used `puppeteer-extra-plugin-stealth` to mask automation signatures
   - Applied stealth plugin to Chromium browser instance

2. Browser Launch Arguments (Both config and test files)
   - `--disable-blink-features=AutomationControlled` - Hide automation flags
   - `--no-sandbox` - Bypass security restrictions
   - `--disable-web-security` - Disable web security features
   - `--disable-infobars` - Hide automation info bars
   - `--disable-extensions` - Disable browser extensions
   - `--start-maximized` - Start in maximized window
   - `--exclude-switches=enable-automation` - Remove automation switches

3. Browser Configuration
   - viewport: 1280x800
   - UK locale and timezone (`en-GB`, `Europe/London`)
   - Geolocation permissions
   - Cookie clearing before tests

4. Realistic User Interactions
   - Random delays
   - Used keyboard.press('Enter') instead of button clicks
   - Gradual form filling with delays
   - Network idle waiting

### Why These Measures will fail in automation:

  Google has gotten really good at catching automated bots because they don't just look for the obvious automation flags anymore. They're analyzing how you actually behave on their
  site. They can spot patterns in timing, mouse movements, and interaction with pages. Our current setup falls short because we're not able to randomize interactions enough. there's
  no mouse movement simulation and our interactions are way too predictable. Even with stealth mode, they can still fingerprint our browser through WebGL, canvas rendering, audio
  context, and performance timing patterns. We're also missing a lot of natural user behaviors like scrolling around, exploring pages normally, and typing realistically instead of
  just instantly focusing on fields. On top of all that, our automated requests have telltale timing patterns, we're not varying HTTP headers like a real user would, and we don't
  have those typical browsing session patterns that real users create. 
