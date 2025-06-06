
import { JSDOM } from "jsdom"

const BASE_URL = "https://www.sportdata.org/wushu/set-online/"
const COMPETITION_ID = "68"

const getWaitingListRegistrations = async () => {
    const REGISTRATIONS = {}

    const url = `${BASE_URL}popup_nennungen_main.php?popup_action=waitlistallpublic&verid=${COMPETITION_ID}`;

    try {
        const response = await fetch(url);
        const htmlText = await response.text();

        const dom = new JSDOM(htmlText);
        const document = dom.window.document;

        const tables = document.querySelectorAll("table");

        const rows = tables[2].querySelectorAll("tr");
        rows.forEach((row, i) => {
            const cells = Array.from(row.querySelectorAll("td")).map(cell => cell.textContent.trim());

            const eventInfo = cells[4]

            if (eventInfo && eventInfo.includes("Taolu Team Trials")) {
                const athleteName = cells[1];

                if (REGISTRATIONS[athleteName]) {
                    REGISTRATIONS[athleteName].events.push(
                        {
                            event: eventInfo,
                        }
                    )
                } else {
                    REGISTRATIONS[athleteName] = {
                        competitor: {
                            name: athleteName,
                        },
                        events: [
                            {
                                event: eventInfo,
                            }
                        ]
                    }
                }
            }
        });

        return REGISTRATIONS;
    } catch (error) {
        console.error("Error fetching/parsing HTML:", error);
    }
};

const getRegistrations = async () => {
    const REGISTRATIONS = {}

    const url = `${BASE_URL}popup_nennungen_main.php?popup_action=nennungenall&verid=${COMPETITION_ID}`;

    try {
        const response = await fetch(url);
        const htmlText = await response.text();

        const dom = new JSDOM(htmlText);
        const document = dom.window.document;

        const tables = document.querySelectorAll("table");

        const rows = tables[2].querySelectorAll("tr");

        rows.forEach((row, i) => {
            const cells = Array.from(row.querySelectorAll("td")).map(cell => cell.textContent.trim());

            const eventInfo = cells[6]

            if (eventInfo && eventInfo.includes("Taolu Team Trials")) {

                const athleteName = cells[2];

                const eventDetails = cells[7].split("|");

                const diffIndex = eventDetails.findIndex((item) => item.trim() === "DIFF");

                const nandu = eventDetails[diffIndex + 1].split(",").map(s => s.trim());
                
                if (REGISTRATIONS[athleteName]) {
                    REGISTRATIONS[athleteName].events.push(
                        {
                            event: eventInfo,
                            nandu: nandu,
                        }
                    )
                } else {
                    REGISTRATIONS[athleteName] = {
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

        return REGISTRATIONS;
    } catch (error) {
        console.error("Error fetching/parsing HTML:", error);
    }
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
    Taijiquan: "TQ_TJ",
    Taijijian: "TQ_TJ",
}

const getAthleteData = async () => {
    const ATHLETE_DATA = {
        MALES: {
            CQ_DS_GS: {},
            CQ_JS_QS: {},
            NQ_ND_NG: {},
            TQ_TJ: {},
            CQ: {},
        },
        FEMALES: {
            CQ_DS_GS: {},
            CQ_JS_QS: {},
            NQ_ND_NG: {},
            TQ_TJ: {},
            CQ: {},
        },
    }

    const waitingList = await getWaitingListRegistrations();
    const registrations = await getRegistrations();

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

    console.log(JSON.stringify(ATHLETE_DATA, null, 2));

    return ATHLETE_DATA
}

getAthleteData();
//INTERESTING URLS
/*
https://www.sportdata.org/wushu/set-online/getCategories.php?vernr=68&id=2912
https://www.sportdata.org/wushu/set-online/getIwufDiffMove.php?vernr=68&catid=11010&style=&seldiffs=&selmoves=&bstyle=

*/