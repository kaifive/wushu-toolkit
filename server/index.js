// server.js
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
app.use(cors()); // enable CORS for your frontend to call this

const PORT = 5000;


const BASE_URL = "https://www.sportdata.org/wushu/set-online/"
const COMPETITION_ID = "68"

const scrapeWaitingList = async () => {
    const url = `${BASE_URL}popup_nennungen_main.php?popup_action=waitlistallpublic&verid=${COMPETITION_ID}`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const waitingList = {};

    const tables = $('table');
    const rows = $(tables[2]).find('tr');

    rows.each((_, row) => {
        const cells = $(row).find('td').map((_, cell) =>
            $(cell).text().trim()
        ).get();

        const eventInfo = cells[4];
        if (eventInfo && eventInfo.includes('Taolu Team Trials')) {
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
};

const scrapeRegistration = async () => {
    const url = `${BASE_URL}popup_nennungen_main.php?popup_action=nennungenall&verid=${COMPETITION_ID}`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const registration = {};

    const tables = $('table');
    const rows = $(tables[2]).find('tr');

    rows.each((_, row) => {
        const cells = $(row).find('td').map((_, cell) =>
            $(cell).text().trim()
        ).get();

        const eventInfo = cells[6];

        if (eventInfo && eventInfo.includes('Taolu Team Trials')) {
            const athleteName = cells[2];
            const eventDetails = cells[7]?.split('|').map(s => s.trim()) ?? [];
            const diffIndex = eventDetails.findIndex((item) => item === 'DIFF');

            const nandu = (diffIndex !== -1 && eventDetails[diffIndex + 1])
                ? eventDetails[diffIndex + 1].split(',').map(s => s.trim())
                : [];

            if (registration[athleteName]) {
                registration[athleteName].events.push({
                    event: eventInfo,
                    nandu: nandu,
                });
            } else {
                registration[athleteName] = {
                    competitor: { name: athleteName },
                    events: [{
                        event: eventInfo,
                        nandu: nandu,
                    }]
                };
            }
        }
    });

    return registration;
};

app.get("/registrationData2025Adults", async (req, res) => {
    try {
        const data = await scrapeRegistration();
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/waitingListData2025Adults", async (req, res) => {
    try {
        const data = await scrapeWaitingList();
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
