# HTML Score Scraper Setup Guide

## Overview

The HTML Score Scraper is an automated web scraping tool that:
- Opens a Chrome browser and navigates to hardcoded URLs
- Parses HTML content and extracts score data
- Detects and waits for captcha challenges (manual user solve)
- Sends email notifications on success/failure
- Saves snapshots of collected data to JSON files

## Features

✅ **Automated Browser Control** - Uses Puppeteer to control a real Chrome instance
✅ **Captcha Handling** - Detects reCAPTCHA and waits for manual user solve (up to 5 minutes)
✅ **HTML Parsing** - Uses Cheerio to parse and extract structured data
✅ **Email Notifications** - Sends notifications via EmailJS (free tier)
✅ **Data Backup** - Saves all results to timestamped JSON snapshots
✅ **Error Handling** - Robust error handling with detailed logging

## Setup Instructions

### 1. Configure EmailJS (Free)

EmailJS provides free email sending without a backend:

1. Go to [emailjs.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Create a new Gmail service:
   - Click "Services" → "Add Service" → "Gmail"
   - Follow the authorization steps
4. Create an email template:
   - Click "Email Templates" → "Create New Template"
   - Use these template variables:
     - `{{to_email}}`
     - `{{subject}}`
     - `{{message}}`

### 2. Set Environment Variables

Create a `.env` file in the project root:

```env
NOTIFICATION_EMAIL=your-email@gmail.com
EMAILJS_PUBLIC_KEY=your_public_key_from_emailjs
EMAILJS_SERVICE_ID=gmail
EMAILJS_TEMPLATE_ID=template_xxxxx
```

Get these values from:
- **Public Key**: EmailJS Dashboard → API Keys
- **Service ID**: EmailJS Dashboard → Services (usually "gmail")
- **Template ID**: EmailJS Dashboard → Email Templates

### 3. Update Scrape Targets

Edit the `SCRAPE_TARGETS` array in `htmlScoreScraper.js`:

```javascript
const SCRAPE_TARGETS = [
    {
        name: 'My Target 1',
        url: 'https://your-url-1.com',
    },
    {
        name: 'My Target 2',
        url: 'https://your-url-2.com',
    },
];
```

### 4. Customize HTML Parsing

The `parseHtmlContent()` function needs to be customized for your target websites.

Example for a table-based layout:

```javascript
function parseHtmlContent(html, targetName) {
    const $ = cheerio.load(html);
    const parsedData = {
        source: targetName,
        timestamp: new Date().toISOString(),
        scores: [],
    };

    // Adjust these selectors based on your HTML structure
    $('table tbody tr').each((index, element) => {
        const cells = $(element).find('td');
        parsedData.scores.push({
            rank: $(cells[0]).text().trim(),
            name: $(cells[1]).text().trim(),
            event: $(cells[2]).text().trim(),
            score: $(cells[3]).text().trim(),
        });
    });

    return parsedData;
}
```

## Running the Scraper

### Option 1: Direct Node Execution
```bash
node src/views/sportdataComponents/utils/runScraper.js
```

### Option 2: Add to package.json
Add this script to `package.json`:
```json
{
  "scripts": {
    "scrape": "node src/views/sportdataComponents/utils/runScraper.js"
  }
}
```

Then run:
```bash
npm run scrape
```

### Option 3: Schedule with Cron (Linux/Mac)
```bash
# Run every day at 2 AM
0 2 * * * cd /path/to/project && node src/views/sportdataComponents/utils/runScraper.js
```

### Option 4: Schedule with Task Scheduler (Windows)
Create a batch file `scraper.bat`:
```batch
@echo off
cd C:\path\to\wushu-toolkit
node src\views\sportdataComponents\utils\runScraper.js
```

Then schedule it using Windows Task Scheduler.

## Handling Captchas

When a captcha is detected:

1. The browser stays open showing the captcha
2. You have **5 minutes** to solve it manually
3. Once solved, the script automatically continues
4. If timeout occurs, that target is marked as failed

**Note**: Adjust the timeout in `waitForCaptchaSolve()` if needed:
```javascript
async function waitForCaptchaSolve(page, maxWaitTime = 10 * 60 * 1000) // 10 minutes
```

## Data Snapshots

All scraped data is saved to:
```
src/views/sportdataComponents/utils/snapshots/
scraper-snapshot-YYYY-MM-DDTHH-mm-ss-fffZ.json
```

Format:
```json
{
  "timestamp": "2025-12-08T12:00:00.000Z",
  "totalTargets": 2,
  "successCount": 2,
  "failureCount": 0,
  "results": [
    {
      "success": true,
      "data": {
        "source": "Target Name",
        "scores": [ ... ]
      }
    }
  ]
}
```

## Troubleshooting

### Browser won't open
- Ensure Puppeteer is installed: `npm install puppeteer`
- Check if Chrome/Chromium is installed on your system
- On headless systems, use Chromium from `puppeteer`

### Captcha not detected
- Check the selectors in `hasCaptcha()` function
- Add additional selectors matching your target sites
- Check browser console for any JavaScript errors

### Email not sending
- Verify EmailJS credentials are correct
- Check spam folder
- Test with EmailJS dashboard first
- Ensure Gmail account allows third-party apps

### Data not parsing correctly
- Open the page in a browser and inspect HTML structure
- Update CSS selectors in `parseHtmlContent()`
- Use browser DevTools to test selector queries

## API Reference

### `runHtmlScraper(targets)`
Main scraper function.

**Parameters:**
- `targets` (array): Array of target objects with `name` and `url`

**Returns:**
```javascript
{
  success: boolean,
  results: array,
  snapshot: { filepath, size }
}
```

### `scrapeTarget(browser, target)`
Scrapes a single target URL.

**Parameters:**
- `browser`: Puppeteer browser instance
- `target`: Target configuration object

**Returns:**
```javascript
{
  success: boolean,
  data: parsedData,
  error: string (if failed)
}
```

## License

MIT License - See LICENSE file

## Support

For issues or questions, please check the troubleshooting section above or open an issue on GitHub.
