#!/usr/bin/env node
/**
 * HTML Score Scraper Runner
 * Execute this script to run the automated web scraper
 *
 * Usage:
 *   node runScraper.js
 *
 * Environment Variables Required:
 *   NOTIFICATION_EMAIL - Email address to send notifications to
 *   EMAILJS_PUBLIC_KEY - EmailJS public key (from emailjs.com)
 *   EMAILJS_SERVICE_ID - EmailJS service ID
 */

import runHtmlScraper from './htmlScoreScraper.js';

// Custom targets (optional) - uncomment and modify if needed
// const customTargets = [
//     {
//         name: 'My Custom Target',
//         url: 'https://example.com',
//     },
// ];

console.log('🚀 Wushu Toolkit - HTML Score Scraper');
console.log('=====================================\n');

// Run with default targets
runHtmlScraper()
    .then(result => {
        if (result.success) {
            console.log('\n✅ Scraper execution completed successfully');
            process.exit(0);
        } else {
            console.log('\n❌ Scraper execution failed');
            process.exit(1);
        }
    })
    .catch(error => {
        console.error('❌ Unexpected error:', error);
        process.exit(1);
    });
