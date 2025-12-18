import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

/**
 * Email configuration for sending captcha alerts
 * Uses Gmail SMTP with app-specific password
 */
const EMAIL_CONFIG = {
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER || 'your-email@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password', // Use app-specific password, not regular password
    },
};

/**
 * Array of scorecard configurations to scrape
 * Format: { competitionId, categoryId, name }
 */
const SCORECARD_TARGETS = [
    {
        name: '2025 Adults - Changquan',
        competitionId: '63',  // Replace with actual competition ID from sportdata.org
        categoryId: '10680',      // Replace with actual category ID from sportdata.org
    },
    {
        name: '2025 Adults - Taijiquan',
        competitionId: '63',
        categoryId: '10727',
    },
    {
        name: '2025 Phoenix - Changquan',
        competitionId: '63',
        categoryId: '10679',
    },
];

/**
 * Send email notification when captcha is encountered
 * @param {string} targetName - Name of the target where captcha was found
 */
async function sendCaptchaAlert(targetName) {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport(EMAIL_CONFIG);

        // Send email
        const info = await transporter.sendMail({
            from: EMAIL_CONFIG.auth.user,
            to: process.env.GMAIL_USER || 'default@example.com',
            subject: 'Scraper encountered captcha',
            text: `Address captcha on script running device.\n\nTarget: ${targetName}\nTime: ${new Date().toISOString()}`,
            html: `
                <p>Address captcha on script running device.</p>
                <p><strong>Target:</strong> ${targetName}</p>
                <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            `,
        });

        console.log('✓ Captcha alert email sent:', info.messageId);
    } catch (error) {
        console.error('✗ Failed to send captcha alert email:', error.message);
        // Continue execution even if email fails
    }
}

/**
 * Parse scorecard HTML content using cheerio
 * Based on sportdata.org scorecard structure
 * @param {string} html - HTML content to parse
 * @param {string} targetName - Name of the target being parsed
 * @returns {object} Parsed scorecard data
 */
function parseScorecardContent(html, targetName) {
    const $ = cheerio.load(html);
    const scorecards = {};

    const tables = $('table');
    const rows = $(tables[3])?.children('tbody').children('tr') || [];

    rows.each((_, row) => {
        const scorecardData = {
            A: {},
            B: {},
            C: {},
        };

        const cells = $(row).children('td');

        cells.each((idx, cell) => {
            const $cell = $(cell);

            if ($cell.find('table').length > 0) {
                // Nested table with judge scores
                const nestedRows = $cell.find('table tr');

                nestedRows.each((nestedIdx, nestedRow) => {
                    const texts = [];
                    const isValid = [];

                    $(nestedRow).children('td').each((_, nestedCell) => {
                        const $nestedCell = $(nestedCell);

                        $nestedCell.contents().each((_, el) => {
                            const $el = $(el);
                            const parts = $el.text().split('|').map(s => s.trim()).filter(Boolean);

                            parts.forEach((part) => {
                                if (part === '') return;
                                texts.push(part);
                                isValid.push(el.tagName !== 'strike'); // false if struck through
                            });
                        });
                    });

                    if (nestedIdx === 0) {
                        // Panel A scores and deductions
                        scorecardData.A.score = texts[2];
                        scorecardData.A.deductions = texts[1]?.split(" ") || [];
                    } else if (nestedIdx === 1) {
                        // Panel B scores
                        scorecardData.B.score = texts.pop();
                        scorecardData.B.scores = texts.slice(1);
                        scorecardData.B.isNotDropped = isValid.slice(1, -1);
                    } else if (nestedIdx === 2) {
                        // Panel C scores
                        scorecardData.C.score = texts.pop();
                        scorecardData.C.counts = texts.slice(1);
                        scorecardData.C.isNotMissed = isValid.slice(1, -1);
                    } else if (nestedIdx === 3) {
                        // Adjustment
                        scorecardData.adjustment = texts[2];
                    }
                });
            } else {
                // Simple text cells
                const text = $cell.text().trim();

                if (idx === 1) {
                    // Athlete name and school
                    scorecardData.athleteName = text.split("(")[0].trim();
                    scorecardData.schoolName = text.split("(")[1]?.replace(")", "").trim() || "";
                } else if (idx === 4) {
                    // Final score
                    scorecardData.finalScore = text;
                }
            }
        });

        if (scorecardData.athleteName) {
            const key = scorecardData.athleteName.toLowerCase();
            scorecards[key] = scorecardData;
        }
    });

    delete scorecards.undefined;

    return {
        source: targetName,
        timestamp: new Date().toISOString(),
        data: scorecards,
    };
}

/**
 * Wait for captcha to be solved by user with timeout
 * @param {object} page - Puppeteer page object
 * @param {string} targetName - Name of target for email notification
 * @param {number} maxWaitTime - Maximum wait time in milliseconds (default 5 min)
 */
async function waitForCaptchaSolve(page, targetName, maxWaitTime = 5 * 60 * 1000) {
    console.log('\n⏳ Captcha detected. Waiting for manual solve...');
    console.log(`⏳ Maximum wait time: ${maxWaitTime / 1000 / 60} minutes`);

    // Send alert email
    await sendCaptchaAlert(targetName);

    const startTime = Date.now();

    try {
        // Wait for navigation or page reload indicating captcha was solved
        await Promise.race([
            page.waitForNavigation({ waitUntil: 'networkidle2', timeout: maxWaitTime }),
            new Promise(resolve => setTimeout(resolve, maxWaitTime)),
        ]);
        console.log('✓ Captcha solved successfully');
        return true;
    } catch (error) {
        const elapsedTime = Date.now() - startTime;
        console.error(`✗ Timeout waiting for captcha (${elapsedTime / 1000 / 60} minutes)`);
        return false;
    }
}

/**
 * Check if page has captcha challenge that needs solving
 * @param {object} page - Puppeteer page object
 * @returns {Promise<boolean>}
 */
async function hasCaptcha(page) {
    try {
        console.log('🔒 Checking for reCAPTCHA elements...');

        // 1. Check for the main reCAPTCHA container element by ID
        const mainContainer = await page.$('#rc-anchor-container');
        if (mainContainer) {
            console.log('🔒 Main reCAPTCHA anchor container detected (#rc-anchor-container).');

            // 2. Check for the specific unsolved state within the container
            // The class 'recaptcha-checkbox-unchecked' indicates the box needs to be clicked/solved.
            const unsolvedCheckbox = await page.$('.recaptcha-checkbox-unchecked');
            if (unsolvedCheckbox) {
                console.log('🔒 Unsolved captcha detected (recaptcha-checkbox-unchecked).');
                return true;
            }
            
            // If the container is present but the checkbox is checked, it means the captcha 
            // is solved, but we still consider the container's presence a trigger for a check.
            // If you only want to proceed if it is UNCHECKED, remove the following block:
            /*
            else {
                 // The container is present, but the checkbox might be checked 
                 // (class 'recaptcha-checkbox-checked'), meaning it was already solved. 
                 // However, for safety in scraping, if the main container is there, 
                 // we might want to flag it unless explicitly solved previously.
                 // For now, we only return true if the unchecked state is found.
            }
            */
        }


        // 3. Fallback check for general captcha selectors (including invisible reCAPTCHA and hCaptcha)
        const captchaSelectors = [
            'iframe[src*="recaptcha"]',
            'iframe[src*="hcaptcha"]',
            '[data-captcha]',
            '.g-recaptcha',
            'iframe[title*="captcha"]',
        ];

        for (const selector of captchaSelectors) {
            const element = await page.$(selector);
            if (element) {
                console.log(`🔒 Generic Captcha element detected (Selector: ${selector}).`);
                return true;
            }
        }
        
        console.log('🔓 No unsolved captcha detected.');
        return false;
    } catch (error) {
        console.error('Error during captcha check:', error.message);
        // Fail safe: assume no captcha if an error occurs during the check
        return false;
    }
}
/**
 * Scrape a single scorecard with captcha handling
 * @param {object} browser - Puppeteer browser instance
 * @param {object} target - Target configuration { competitionId, categoryId, name }
 * @returns {object} Scraped data
 */
async function scrapeScorecard(browser, target) {
    let page;
    const BASE_URL = "https://www.sportdata.org/wushu/set-online/";
    const url = `${BASE_URL}popup_mitschrift_main.php?popup_action=auslosungcatpunktexml&catid=${target.categoryId}&verid=${target.competitionId}`;

    try {
        console.log(`\n📍 Processing: ${target.name}`);
        console.log(`🌐 URL: ${url}`);

        page = await browser.newPage();

        // Set viewport for better rendering
        await page.setViewport({ width: 1920, height: 1080 });

        // Navigate to URL
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        // Check for captcha
        if (await hasCaptcha(page)) {
            const captchaSolved = await waitForCaptchaSolve(page, target.name);
            if (!captchaSolved) {
                throw new Error('Captcha not solved within timeout');
            }
        }

        // Get page HTML
        const html = await page.content();

        // Parse scorecard content
        const parsedData = parseScorecardContent(html, target.name);

        const recordCount = Object.keys(parsedData.data).length;
        console.log(parsedData)
        console.log(`✓ Successfully scraped ${recordCount} athlete records`);

        return {
            success: true,
            data: parsedData,
        };
    } catch (error) {
        console.error(`✗ Error scraping ${target.name}:`, error.message);
        return {
            success: false,
            error: error.message,
            target: target.name,
        };
    } finally {
        if (page) {
            await page.close();
        }
    }
}

/**
 * Save scraped data to snapshot file
 * @param {array} results - Array of scrape results
 */
async function saveSnapshot(results) {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `scraper-snapshot-${timestamp}.json`;
        const snapshotDir = path.resolve('src/views/sportdataComponents/utils/snapshots');

        // Ensure directory exists
        await fs.mkdir(snapshotDir, { recursive: true });

        const filepath = path.join(snapshotDir, filename);

        // Prepare snapshot data
        const snapshotData = {
            timestamp: new Date().toISOString(),
            totalTargets: results.length,
            successCount: results.filter(r => r.success).length,
            failureCount: results.filter(r => !r.success).length,
            results: results,
        };

        // Write to file
        await fs.writeFile(
            filepath,
            JSON.stringify(snapshotData, null, 2),
            'utf-8'
        );

        console.log(`\n📁 Snapshot saved: ${filepath}`);
        return {
            filepath,
            size: snapshotData.successCount,
        };
    } catch (error) {
        console.error('✗ Error saving snapshot:', error);
        throw error;
    }
}

/**
 * Main scraper function
 * @param {array} targets - Array of scorecard targets to scrape
 */
export async function runHtmlScraper(targets = SCORECARD_TARGETS) {
    let browser;
    const results = [];

    try {
        if (targets.length === 0) {
            console.warn('⚠️  No targets provided. Using SCORECARD_TARGETS array.');
            targets = SCORECARD_TARGETS;
        }

        if (targets.length === 0) {
            throw new Error('No scorecard targets to scrape. Please configure SCORECARD_TARGETS.');
        }

        console.log('\n🚀 Starting Scorecard Scraper');
        console.log(`📊 Targets to scrape: ${targets.length}`);
        console.log('━'.repeat(50));

        // Launch browser
        const launchOptions = {
            headless: false, // Show browser for captcha solving
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
            ],
        };

        browser = await puppeteer.launch(launchOptions);

        // Scrape each target
        for (const target of targets) {
            const result = await scrapeScorecard(browser, target);
            results.push(result);
        }

        console.log('\n━'.repeat(50));

        // Save snapshot
        const snapshot = await saveSnapshot(results);

        console.log('\n✓ Scraper completed successfully');
        return {
            success: true,
            results,
            snapshot,
        };
    } catch (error) {
        console.error('\n✗ Fatal error in scraper:', error);

        return {
            success: false,
            error: error.message,
            results,
        };
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Export for use in other modules
export default runHtmlScraper;
