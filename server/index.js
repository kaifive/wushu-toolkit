// server.js
import express from 'express';
import cors from 'cors';
import chromium from 'chrome-aws-lambda'

// import puppeteer from 'puppeteer';
// const chromium = require('chrome-aws-lambda');

const app = express();
app.use(cors()); // enable CORS for your frontend to call this

const PORT = 5000;


const BASE_URL = "https://www.sportdata.org/wushu/set-online/"
const COMPETITION_ID = "68"

const scrapeWaitingList = async (page) => {
    const url = `${BASE_URL}popup_nennungen_main.php?popup_action=waitlistallpublic&verid=${COMPETITION_ID}`;

    await page.goto(url);
    const data = await page.evaluate(() => {
        const waitingList = {};

        const tables = document.querySelectorAll("table");

        const rows = tables[2].querySelectorAll("tr");

        rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll("td")).map(cell => cell.textContent.trim());

            const eventInfo = cells[4];

            if (eventInfo && eventInfo.includes("Taolu Team Trials")) {
                const athleteName = cells[1];

                if (waitingList[athleteName]) {
                    waitingList[athleteName].events.push({ event: eventInfo });
                } else {
                    waitingList[athleteName] = {
                        competitor: { name: athleteName },
                        events: [{ event: eventInfo }]
                    };
                }
            }
        });

        return waitingList;
    });

    return data;
};


const scrapeRegistration = async (page) => {
    const url = `${BASE_URL}popup_nennungen_main.php?popup_action=nennungenall&verid=${COMPETITION_ID}`;

    await page.goto(url);
    const data = await page.evaluate(() => {
        const registration = {};

        const tables = document.querySelectorAll("table");

        const rows = tables[2].querySelectorAll("tr");

        rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll("td")).map(cell => cell.textContent.trim());

            const eventInfo = cells[6]

            if (eventInfo && eventInfo.includes("Taolu Team Trials")) {

                const athleteName = cells[2];

                const eventDetails = cells[7].split("|");

                const diffIndex = eventDetails.findIndex((item) => item.trim() === "DIFF");

                const nandu = eventDetails[diffIndex + 1].split(",").map(s => s.trim());

                if (registration[athleteName]) {
                    registration[athleteName].events.push(
                        {
                            event: eventInfo,
                            nandu: nandu,
                        }
                    )
                } else {
                    registration[athleteName] = {
                        competitor: {
                            name: athleteName,
                        },
                        events: [
                            {
                                event: eventInfo,
                                nandu: nandu,
                            }
                        ]
                    }
                }
            }
        });

        return registration;
    });

    return data;
};

const getRegistrationData = async () => {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
      });

      const registrationPage = await browser.newPage();

      const registration = await scrapeRegistration(registrationPage);

      return registration;
}

const getWaitingListData = async () => {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
      });

      const waitingListPage = await browser.newPage();

      const waitingList = await scrapeWaitingList(waitingListPage);

      return waitingList;
}

import axios from 'axios';
import * as cheerio from 'cheerio';

async function scrape(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        // Pretend to be a real browser
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const $ = cheerio.load(html);

    // Example: extract all links
    const links = [];
    $('a').each((_, el) => {
      links.push({
        text: $(el).text().trim(),
        href: $(el).attr('href'),
      });
    });

    return links;
  } catch (err) {
    console.error('Scrape failed:', err.message);
    return [];
  }
}

app.get('/scrape', async (req, res) => {
    // const { url } = req.query;
    // if (!url) return res.status(400).send('Missing url');
    const url = `${BASE_URL}popup_nennungen_main.php?popup_action=nennungenall&verid=${COMPETITION_ID}`;

    
    const data = await scrape(url);
    res.json(data);
  });
  

app.get("/registrationData2025Adults", async (req, res) => {
    try {
        const data = await getRegistrationData();
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/waitingListData2025Adults", async (req, res) => {
    try {
        const data = await getWaitingListData();
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
