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

export async function getData() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const registrationResponse = await fetch(`${apiUrl}/registrationData2025Adults`);
    const registrationData = await registrationResponse.json();

    const waitingListResponse = await fetch(`${apiUrl}/waitingListData2025Adults`);
    const waitingListData = await waitingListResponse.json();

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
        ...waitingListData.data,
        ...registrationData.data,
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
}