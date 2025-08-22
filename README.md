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

I thank you very much for your test and i just want to say i did chuckle when i saw it. Brilliant!

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

3. Browser Context Configuration
   - Set realistic viewport: 1280x800
   - UK locale and timezone (`en-GB`, `Europe/London`)
   - Geolocation permissions
   - Accept-Language headers matching UK locale
   - Cookie clearing before tests

4. Realistic User Interactions
   - Random delays
   - Used keyboard.press('Enter') instead of button clicks
   - Gradual form filling with delays
   - Network idle waiting

### Why These Measures Failed:

1. **Google's Advanced Detection**
   - Google uses sophisticated behavioral analysis beyond simple automation flags
   - Detects patterns in timing, mouse movements, and interaction sequences

2. **Insufficient Randomization**
   - No mouse movement simulation
   - Predictable interactions

3. **Browser Fingerprinting**
   - Despite stealth measures, Google can detect automation through:
     - WebGL fingerprinting
     - Canvas fingerprinting
     - Audio context fingerprinting
     - Performance timing patterns

4. **Behavioral Analysis Gaps**
   - No scrolling or natural page exploration
   - Instant field focus without typical user browsing behavior
   - Missing realistic typing

5. **Network-level Detection**
   - Automated requests have different timing patterns
   - Missing realistic HTTP header variations
   - Absence of typical user session patterns
