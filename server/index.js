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

const EVENT_CATEGORY_MAPPING = {
    Changquan: "CQ",
    Daoshu: "CQ_DS_GS",
    Gunshu: "CQ_DS_GS",
    Jianshu: "CQ_JS_QS",
    Qiangshu: "CQ_JS_QS",
    Nanquan: "NQ_ND_NG",
    Nandao: "NQ_ND_NG",
    Nangun: "NQ_ND_NG",
    Taijiquan: "TQ_TJ_TS",
    Taijijian: "TQ_TJ_TS",
    Taijishan: "TQ_TJ_TS",
}


async function getAdultsData() {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });
    

    try {
        const waitingListPage = await browser.newPage();
        const registrationPage = await browser.newPage();

        const [waitingList, registrations] = await Promise.all([
            scrapeWaitingList(waitingListPage),
            scrapeRegistration(registrationPage),
        ]);

        await waitingListPage.close();
        await registrationPage.close();

        const ATHLETE_DATA = {
            MALES: {
                CQ_DS_GS: {},
                CQ_JS_QS: {},
                NQ_ND_NG: {},
                TQ_TJ_TS: {},
                CQ: {},
            },
            FEMALES: {
                CQ_DS_GS: {},
                CQ_JS_QS: {},
                NQ_ND_NG: {},
                TQ_TJ_TS: {},
                CQ: {},
            },
        }


        const joined = {
            ...waitingList,
            ...registrations,
        }

        Object.values(joined).forEach((registration) => {
            const athleteName = registration.competitor.name

            registration.events.forEach((event) => {
                const eventInfo = event.event.split("-")

                const gender = eventInfo[1]
                    .trim()
                    .split(" ")[0]
                    .includes("Men´s") ? "MALES" : "FEMALES";

                const type = eventInfo[1]
                    .trim()
                    .split(" ")[1];

                const category = EVENT_CATEGORY_MAPPING[type];

                if (ATHLETE_DATA[gender][category][athleteName]) {
                    ATHLETE_DATA[gender][category][athleteName].events.push(event)
                } else {
                    ATHLETE_DATA[gender][category][athleteName] = {
                        competitor: {
                            name: athleteName,
                        },
                        events: [event]
                    }
                }
            })
        })

        Object.entries(ATHLETE_DATA.MALES.CQ).forEach(([athleteId, registration]) => {
            if (ATHLETE_DATA.MALES.CQ_DS_GS[athleteId]) {
                ATHLETE_DATA.MALES.CQ_DS_GS[athleteId].events.push(...registration.events)
            }
            if (ATHLETE_DATA.MALES.CQ_JS_QS[athleteId]) {
                ATHLETE_DATA.MALES.CQ_JS_QS[athleteId].events.push(...registration.events)
            }
        })

        Object.entries(ATHLETE_DATA.FEMALES.CQ).forEach(([athleteId, registration]) => {
            if (ATHLETE_DATA.FEMALES.CQ_DS_GS[athleteId]) {
                ATHLETE_DATA.FEMALES.CQ_DS_GS[athleteId].events.push(...registration.events)
            }
            if (ATHLETE_DATA.FEMALES.CQ_JS_QS[athleteId]) {
                ATHLETE_DATA.FEMALES.CQ_JS_QS[athleteId].events.push(...registration.events)
            }
        })

        delete ATHLETE_DATA.MALES.CQ
        delete ATHLETE_DATA.FEMALES.CQ

        return ATHLETE_DATA;
    } finally {
        await browser.close();
    }
}

const lightweight1 = async () => {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
      });

      const registrationPage = await browser.newPage();

      const registration = await scrapeRegistration(registrationPage);

      return registration

}

app.get('/2025AdultsData', async (req, res) => {
    try {
        const data = await getAdultsData();
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/testing", async (req, res) => {
    try {
        const data = await lightweight1();
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
