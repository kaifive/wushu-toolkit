const apiUrl = import.meta.env.VITE_API_BASE_URL;

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

const fetchScoresByCategory = async (categoryName, categoryId) => {
    const categoryScores = await fetch(`${apiUrl}/2025-phoenix/scorecard-data/${categoryId}`).then(res => res.json())

    return { [categoryName]: categoryScores }
}

const fetchAllCategories = async (categoryData) => {
    const promises = Object.entries(categoryData).map(([categoryName, categoryId]) =>
        fetchScoresByCategory(categoryName, categoryId)
    );

    const results = await Promise.all(promises);
    return results;
};

export async function getData() {
    const [registrationData, categoryData] = await Promise.all([
        fetch(`${apiUrl}/2025-phoenix/registration-data?searchTerm=${encodeURIComponent("Optional")}`).then(res => res.json()),
        fetch(`${apiUrl}/2025-phoenix/category-data?searchTerm=${encodeURIComponent("Optional")}`).then(res => res.json()),
    ]);

    let scorecardData;

    await fetchAllCategories(categoryData.data).then((categories) => {
        scorecardData = Object.assign({}, ...categories);
    });

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

    const joined = {
        ...registrationData.data,
    }

    Object.values(joined).forEach((registration) => {
        const athleteName = registration.competitor.name

        registration.events.forEach((event) => {
            const eventInfo = event.event

            const gender = eventInfo.includes("Male") ? "MALES" : "FEMALES";

            const type = Object.keys(EVENT_CATEGORY_MAPPING).find((key) =>
                eventInfo?.includes(key)
            );

            const category = EVENT_CATEGORY_MAPPING[type];

            const athleteEventScorecard = scorecardData[eventInfo].data[athleteName.toLowerCase()]

            const mergedEventData = {
                ...event,
                ...athleteEventScorecard,
            }

            if (ATHLETE_DATA[gender][category][athleteName]) {
                ATHLETE_DATA[gender][category][athleteName].events.push(mergedEventData)
            } else {
                ATHLETE_DATA[gender][category][athleteName] = {
                    competitor: {
                        name: athleteName,
                    },
                    events: [mergedEventData]
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