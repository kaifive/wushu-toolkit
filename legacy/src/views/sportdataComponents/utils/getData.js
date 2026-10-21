const apiUrl = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000';

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

const fetchScoresByCategory = async (competition, categoryName, categoryId) => {
    const categoryScores = await fetch(`${apiUrl}/${competition}/scorecard-data/${categoryId}`).then(res => res.json())

    return { [categoryName]: categoryScores }
}

const fetchAllCategories = async (competition, categoryData) => {
    console.log("Fetching all categories for competition:", competition, categoryData);
    const promises = Object.entries(categoryData).map(([categoryName, categoryId]) =>
        fetchScoresByCategory(competition, categoryName, categoryId)
    );

    const results = await Promise.all(promises);
    return results;
};

export async function getData(config) {
    const { competition, searchTerm, mensLookupTerm, showWaitingList } = config;

    const [waitingListData, registrationData, categoryData] = await Promise.all([
        showWaitingList ? fetch(`${apiUrl}/${competition}/waiting-list-data?searchTerm=${encodeURIComponent(searchTerm)}`).then(res => res.json()) : {},
        fetch(`${apiUrl}/${competition}/registration-data?searchTerm=${encodeURIComponent(searchTerm)}`).then(res => res.json()),
        fetch(`${apiUrl}/${competition}/category-data?searchTerm=${encodeURIComponent(searchTerm)}`).then(res => res.json()),
    ]);

    let scorecardData;

    console.log("here")
    try {
        await fetchAllCategories(competition, categoryData.data).then((categories) => {
            scorecardData = Object.assign({}, ...categories);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }

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
        ...waitingListData.data,
    }

    Object.values(joined).forEach((registration) => {
        const athleteName = registration.competitor.name

        registration.events.forEach((event) => {
            const eventInfo = event.event

            const gender = eventInfo.includes(mensLookupTerm) ? "MALES" : "FEMALES";

            const type = Object.keys(EVENT_CATEGORY_MAPPING).find((key) =>
                eventInfo?.includes(key)
            );

            const category = EVENT_CATEGORY_MAPPING[type];

            const athleteEventScorecard = scorecardData[eventInfo]?.data[athleteName.toLowerCase()] || {}

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

    Object.entries(ATHLETE_DATA).forEach(([gender, categories]) => {
        Object.entries(categories).forEach(([category, registrations]) => {
            // Convert registrations object to an array of [athleteName, registration]
            const athletesArray = Object.entries(registrations).map(([athleteName, registration]) => {
                const averageFinalScoreRaw = registration.events.reduce(
                    (sum, item) => sum + parseFloat(item.finalScore || 0),
                    0
                ) / registration.events.length;

                const averageFinalScore = Number(averageFinalScoreRaw.toFixed(3));

                const aTeamEligible = registration.events.some(event => {
                    return event.C && Array.isArray(event.C.isNotMissed) &&
                        event.C.isNotMissed.length > 0 &&
                        event.C.isNotMissed.every(val => val === true);
                });

                return {
                    athleteName,
                    registration,
                    averageFinalScore,
                    aTeamEligible,
                };
            });

            // Sort by averageFinalScore descending (highest first)
            athletesArray.sort((a, b) => b.averageFinalScore - a.averageFinalScore);

            if (!athletesArray[0]?.aTeamEligible) {
                const firstEligibleIndex = athletesArray.findIndex(a => a.aTeamEligible);
              
                if (firstEligibleIndex > 0) {
                  // Remove the eligible athlete from their current position
                  const [eligibleAthlete] = athletesArray.splice(firstEligibleIndex, 1);
              
                  // Insert them at the front
                  athletesArray.unshift(eligibleAthlete);
                }
              }

            // Optional: overwrite original object registrations with sorted athletes (if you want)
            ATHLETE_DATA[gender][category] = {}; // Clear original object

            athletesArray.forEach(({ athleteName, registration, averageFinalScore, aTeamEligible }) => {
                // Add calculations to registration
                registration.calculations = { averageFinalScore, aTeamEligible };

                ATHLETE_DATA[gender][category][athleteName] = registration;
            });
        });
    });

    return ATHLETE_DATA;
}