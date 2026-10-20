/**
 * Example configuration for HTML Score Scraper
 * Copy this and modify with your actual competition and category IDs
 */

// Example scorecard targets for 2025 competitions
export const EXAMPLE_SCORECARD_TARGETS = [
    {
        name: '2025 Adults - Changquan',
        competitionId: '12345',  // Replace with actual competition ID from sportdata.org
        categoryId: '67890',      // Replace with actual category ID from sportdata.org
    },
    {
        name: '2025 Adults - Taijiquan',
        competitionId: '12345',
        categoryId: '67891',
    },
    {
        name: '2025 Phoenix - Changquan',
        competitionId: '12346',
        categoryId: '67892',
    },
];

/**
 * How to find your competition and category IDs:
 *
 * 1. Go to https://www.sportdata.org/wushu/set-online/
 * 2. Navigate to your competition
 * 3. Click on a scorecard to open it
 * 4. Look at the URL in your browser:
 *    popup_mitschrift_main.php?popup_action=auslosungcatpunktexml&catid=67890&verid=12345
 *    - catid = categoryId (67890)
 *    - verid = competitionId (12345)
 */

/**
 * Environment variables required in .env:
 *
 * VITE_EMAILJS_SERVICE_ID=service_xxxx_from_emailjs
 * VITE_SCRAPING_NOTIFICATION_EMAIL=your-email@gmail.com
 *
 * Note: The EmailJS public key and template ID are already hardcoded
 * in htmlScoreScraper.js
 */

export const SCRAPER_SETUP = {
    description: 'Configure scorecard scraper for sportdata.org',
    steps: [
        '1. Add your competition IDs and category IDs to SCORECARD_TARGETS in htmlScoreScraper.js',
        '2. Set environment variables: VITE_EMAILJS_SERVICE_ID and VITE_SCRAPING_NOTIFICATION_EMAIL',
        '3. Run: node src/views/sportdataComponents/utils/runScraper.js',
        '4. When captcha appears, solve it manually in the browser',
        '5. Scraped data is saved to snapshots/ folder',
    ],
};
