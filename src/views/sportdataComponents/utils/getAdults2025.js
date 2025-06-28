import registrationData from "./snapshots/2025-adults-2025-06-13T20-55-51-605Z.json"

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

const GOOGLE_DOCS_MAPPING = {
    "Taolu Team Trials - Men´s Changquan": "https://docs.google.com/document/d/e/2PACX-1vSimQEYtitCtIdgAJdINos0csVl7wrRXkQ3Wq9swno3wFa64QYR9BbP7sbse7pU0bGfg2d3cgAg51fz/pub",
    "Taolu Team Trials - Men´s Daoshu": "https://docs.google.com/document/d/e/2PACX-1vQueViFAZ-TeOHcYHwNeW75DnwTr8rofTp86zHEd2_O73dxmLyTL3kjnDHQL1F_GdgnFAFNkomI5Ubx/pub",
    "Taolu Team Trials - Men´s Gunshu": "https://docs.google.com/document/d/e/2PACX-1vQi1-1amBdIskkRXKC0FZHKXCbpCvcZXZhlM9pCz1lo9gvSQ_pvJa0C29kFx_FbvonhWoi_MKsWsZly/pub",
    "Taolu Team Trials - Men´s Jianshu": "https://docs.google.com/document/d/e/2PACX-1vS2n0ALo6JZ-MoUopy6uYDi3H8GzBeQXfzqm_fVE5svYvTqVrVQepZW7M_uo1qKKR55_B5-blGk7SG4/pub",
    "Taolu Team Trials - Men´s Nandao": "https://docs.google.com/document/d/e/2PACX-1vRk3tSxF5aMV9Z77gXmEg77Q8-2F9bGKjIm6NQGN7TAUk8RYoDQ5UGjD1ViYXwpewUKwDGElxAYZGe-/pub",
    "Taolu Team Trials - Men´s Nangun": "https://docs.google.com/document/d/e/2PACX-1vT6lts-bZ018Cfjw0N8cMOqt9J0EJWix9z76JB31EY8YbrKgKsoV-BsoSR1qkLO_A5JPbxq4Vi6h_zq/pub",
    "Taolu Team Trials - Men´s Nanquan": "https://docs.google.com/document/d/e/2PACX-1vQusC_k3ZnNxFVqy9T-yyxlHETdp8YwlJC6I14qiAMxIjDPGUJItygaWrP5YX8A0yDZree3mZq0_p1A/pub",
    "Taolu Team Trials - Men´s Qiangshu": "https://docs.google.com/document/d/e/2PACX-1vQnbFJU2VslzZ-2JeNYhr_8eEbFZ5X-vxu0Jk3UZGI9oqWxq3CHbA7W0mSmawwRJn2lu822k9_9zAZX/pub",
    "Taolu Team Trials - Men´s Taijijian": "https://docs.google.com/document/d/e/2PACX-1vT2pdOKOoTjzqMU6SWHkCACM6uNrGbZ-DeiOBBjWockz52MTGQdIIqtY-lYrzdUpTCi50goPXhsKmDx/pub",
    "Taolu Team Trials - Men´s Taijiquan": "https://docs.google.com/document/d/e/2PACX-1vRyZzLzM_LH3Ko731LPV1e9klGUz1V9pOUttyVHu318YgKcZjee-lij1cd3F5_LmB9hHYSkqpkPPQBk/pub",
    "Taolu Team Trials - Women´s Changquan": "https://docs.google.com/document/d/e/2PACX-1vTFUFIgmEMSTNyQBpwCCTshV4MuAI-XX31k27IVGwUKeXTUoiuIJtaf2tgTpEv4QgevoOHzltRNXINU/pub",
    "Taolu Team Trials - Women´s Daoshu": "https://docs.google.com/document/d/e/2PACX-1vQGE1HCK0MkiJMj3GjLiLlP6al5qNH93TyL14fKVCGGggFcP0RkK-Q56Q470wPilfM1oShEIhr4RzsB/pub",
    "Taolu Team Trials - Women´s Gunshu": "https://docs.google.com/document/d/e/2PACX-1vRdSHNumUmgmLz-D9tK-rxajM7ItnO6M8ikpKpknlfBs3yZx87VmtjZi9I2cbCGkspjmWp3paF41MYh/pub",
    "Taolu Team Trials - Women´s Jianshu": "https://docs.google.com/document/d/e/2PACX-1vTtvMw2MrnMhNi_d4yovZx6_z-UCDmBWUSqhy4S5Uqh8bn8KO4Fwxddp-UU4kok79UMRsC0GAjEQIa4/pub",
    "Taolu Team Trials - Women´s Nandao": "https://docs.google.com/document/d/e/2PACX-1vT2f6Qo-wEtqMG72eIaGjHpOzglksN4KZzWW_xW4aP4qgFohOq4d_mgGpVK39-iTLSFzhKjEYQAl-pK/pub",
    "Taolu Team Trials - Women´s Nangun": "https://docs.google.com/document/d/e/2PACX-1vTqO_QhEB0Lmgf90ed4icl1OJOMIgHWWICbbgPBPqVP3O6K9w4tXnYBLe_wfC9S9dt6L3OmV8StbWqF/pub",
    "Taolu Team Trials - Women´s Nanquan": "https://docs.google.com/document/d/e/2PACX-1vTJ4l5vJrO75GmiO5qA9JCj7TKlx1dW8vaqEfQQuJ4rXI3w7czsLN0kJ132HSLGvXX5soy5isnKXAlh/pub",
    "Taolu Team Trials - Women´s Qiangshu": "https://docs.google.com/document/d/e/2PACX-1vSvJhbYy6r9Dqsr6TidTESyTGWEAluPbvYy1CkYmTgTO2BDg7P7xA5jjIESydIN0RNE5VZg56HwVCRJ/pub",
    "Taolu Team Trials - Women´s Taijijian": "https://docs.google.com/document/d/e/2PACX-1vQglErXNsM5G7klaRD969zjDlJMa32bSDyJY5HciTP8jUOMagJHtr1HYaxmiReh3Hq7dzpq3dPJVmKt/pub",
    "Taolu Team Trials - Women´s Taijiquan": "https://docs.google.com/document/d/e/2PACX-1vTEip61C6n4BdiegxtwD3kz7JDlXkLe_bwP1mAOVAawSBeXVkrxeplneXAbLc-he8DSsxAxgJXtYzN0/pub",
}

const TEMP_DATA = {
    "Taolu Team Trials - Women´s Gunshu": {
        "Chand Tara": 7.743,
        "Diaz Brooklyn": 7.06,
        "Hung Charisse": 9.253,
        "Tran Audrey": 8.45,
        "Nguyen Chloe": 8.483,
        "Kooc Kolette": 8.133,
        "Chew Allison": 8.616,
        "Zhou Julia": 8.48,
        "Chow Elena": 9.47,
        "Huang LanHong": 8.826,
        "Folk Hannah": 8.33,
        "Wu-Inouye Michiko": 9.14,
        "Jian Emily": 9.066,
        "Cheng Maggie": 8.93
    },
    "Taolu Team Trials - Men´s Gunshu": {
        "Bitner Owen": 8.31,
        "Ma Jake": 8.46,
        "Tjhin Joshua": 8.393,
        "Fung Josiah Christian": 9.143,
        "Wang Tony": 9.32,
        "Ye Brian": 8.73,
        "Zheng Lin": 8.286,
        "Yim Ashton": 9.456,
        "Thio Julian": 8.616,
        "Yu Elijah Jordan Dizon": 9.01,
        "Sun Nicholas": 9.39,
        "Chao Nathan": 9.03,
        "Lu Dazhi": 9.05,
        "Wang Derek": 9.26,
        "Ambrose Elijah": 9,
        "Land Preston": 9.27,
        "Gao Bryan": 9.043,
        "Wu Ashton": 9.42,
        "Yang Nianjin": 8.47,
        "Wong Brendan": 9.0666,
        "Kono Shoma": 8.736,
        "Lee Ryan": 9.406,
        "Sahertian Paul": 8.533,
        "Ly Nathan": 8.883,
        "Lou Justin": 8.09,
        "Liu Shangshang": 9.166,
        "Yang Chien-Mu": 9.316,
        "Chen Shaun": 9.316,
        "Chen Kevin": 8.35,
        "Che Ethan": 9.103,
        "Candra Jayden": 8.563,
        "Payumo Jonathan": 9.306,
        "Emmert Alex": 8.603,
        "Shultz Ball Sage": 8.323,
        "Gao Sen": 9.376,
        "Huang Ryan": 9.316,
        "Zhou Zheng": 9.36,
        "Zheng Nathan": 8.59,
        "Briones Zachary": 8.75,
        "Burns Seth": 9.34
    },
    "Taolu Team Trials - Women´s Qiangshu": {
        "Wong Amy": 8.82,
        "Oshiba Ashley": 9.26,
        "Jian Emily": 8.89,
        "Shen Joy": 8.593,
        "Shao Sophia": 0,
        "Fung Rylee Kate": 9.083,
        "Zhao Hailey": 8.303,
        "Ding Victoria": 8.84,
        "Wang Katherine": 7.88,
        "Schmidt Dusty": 7.656
    },
    "Taolu Team Trials - Men´s Qiangshu": {
        "Shen Justin": 9.093,
        "Imanverdi Kayvon": 7.69,
        "Zhuang Evan": 8.733,
        "Gao Sen": 9.396,
        "Vo William": 9.123,
        "Wong Matthew Yum Ping": 7.013,
        "Liang Kong": 7,
        "Hirahara Kai": 8.736,
        "Signore Jacopo": 9.3,
        "Guo Trevor": 8.83,
        "Zhang Alex": 9.12,
        "Wang Benjamin": 8.573,
        "Chen Shaun": 9.413,
        "Wu Ashton": 9.436,
        "Liu Bruce": 8.57,
        "Yeager Blake": 7.536,
        "Fung Josiah Christian": 9.073,
        "Tran Ryan": 8.686
    },
    "Taolu Team Trials - Women´s Nangun": {
        "Lee Lucy": 9.516,
        "Thenuwara Riyana": 9.276,
        "Yuen Leianna": 9.46,
        "Franco Luna": 7.603,
        "Li Queenie": 8.76,
        "Meenakshisundaram Shakthimeena": 8.35,
        "Kooc Kolette": 9.153,
        "Fung Rylee Kate": 9.253,
        "Meng Elina": 8.47
    },
    "Taolu Team Trials - Men´s Nangun": {
        "Candra Jayden": 9.13,
        "Che Ethan": 8.926,
        "Yang Aaron": 9.413,
        "Meng Stanley": 9.443,
        "Chow Justin": 8.046,
        "Li William": 9.233,
        "Zheng Lin": 8.753,
        "Payumo Jonathan": 9.34,
        "Yang Kevin": 7.996,
        "Yim Augustin": 8.609,
        "Deng Darren": 9.133,
        "Wong Marcus": 9.106,
        "Burns Seth": 9.413,
        "Ly Nathan": 9.463,
        "Kwan Antony": 8.723,
        "Tu Danny": 9.08,
        "Chao Nathan": 9.373
    }

}

const fetchScorecardsByEvent = async (eventName, googleDocUrl) => {
    try {
        const response = await fetch(`${apiUrl}/parse-google-doc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ doc_url: googleDocUrl }),
        });

        if (!response.ok) {
            // If the response is not OK (e.g., 400, 500 status)
            const errorData = await response.json();
            throw new Error(`API Error for '${eventName}': ${errorData.error || 'Unknown error'}`);
        }

        const data = await response.json();
        return { [eventName]: data.data };

    } catch (error) {
        console.error(`Failed to fetch scorecards for event '${eventName}':`, error);
        // Return an empty object or a specific error indicator for this event
        return { [eventName]: { error: error.message } };
    }
};

const fetchAllScorecards = async () => {
    const promises = Object.entries(GOOGLE_DOCS_MAPPING).map(([event, url]) =>
        fetchScorecardsByEvent(event, url)
    );

    const results = await Promise.all(promises);
    return results;
};

export async function getAdults2025(config) {
    try {
        const { competition, searchTerm, mensLookupTerm, showWaitingList } = config;

        let scorecardData;

        // await fetchAllScorecards().then((scorecards) => {
        //     scorecardData = Object.assign({}, ...scorecards);
        // });


        const ATHLETE_DATA = registrationData

        Object.entries(ATHLETE_DATA).forEach(([gender, categories]) => {
            Object.entries(categories).forEach(([category, registrations]) => {
                Object.entries(registrations).forEach(([athleteName, registration]) => {
                    registration.events = registration.events.map((event) => {
                        const eventName = event.event;
                        const lowerAthleteName = athleteName.toLowerCase();

                        const tempFinalScore =
                            TEMP_DATA?.[eventName]?.[athleteName] ?? "0.000";

                        const athleteEventScorecard =
                            scorecardData?.[eventName]?.[lowerAthleteName] ?? {
                                finalScore: tempFinalScore,
                            };

                        return {
                            ...event,
                            ...athleteEventScorecard,
                        };
                    });

                })

            })
        })

        Object.entries(ATHLETE_DATA).forEach(([gender, categories]) => {
            Object.entries(categories).forEach(([category, registrations]) => {
                // Convert registrations object to an array of [athleteName, registration]
                const athletesArray = Object.entries(registrations).map(([athleteName, registration]) => {
                    const averageFinalScoreRaw = registration.events.reduce(
                        (sum, item) => sum + parseFloat(item.finalScore || 0),
                        0
                    ) / registration.events.length;

                    const averageFinalScore = Number(averageFinalScoreRaw.toFixed(3));

                    // const aTeamEligible = registration.events.some(event => {
                    //     return event.C && Array.isArray(event.C.isNotMissed) &&
                    //         event.C.isNotMissed.length > 0 &&
                    //         event.C.isNotMissed.every(val => val === true);
                    // });

                    const aTeamEligible = true;


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
    } catch (err) {
        console.log(err)
    }
}