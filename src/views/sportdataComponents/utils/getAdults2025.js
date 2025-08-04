import registrationData from "./snapshots/2025-adults-2025-06-13T20-55-51-605Z.json"
import hardcodedScores from "./snapshots/2025hardcoded"

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

        
        const temp = await fetch(`${apiUrl}/get-temp-2025-adults-data`);

        const data = await temp.json();


        const ATHLETE_DATA = registrationData

        Object.entries(ATHLETE_DATA).forEach(([gender, categories]) => {
            Object.entries(categories).forEach(([category, registrations]) => {
                Object.entries(registrations).forEach(([athleteName, registration]) => {
                    registration.events = registration.events.map((event) => {
                        const eventName = event.event;
                        const lowerAthleteName = athleteName.toLowerCase();

                        const tempFinalScore =
                            data.data?.[eventName]?.[athleteName] ?? "0.000";

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
                    const validScores = registration.events
                        .map(event => parseFloat(event.finalScore))
                        .filter(score => !isNaN(score) && score > 0); // filter only meaningful scores

                    const averageFinalScoreRaw = validScores.length > 0
                        ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length
                        : 0;

                    const averageFinalScore = Number(averageFinalScoreRaw.toFixed(3));

                    // const aTeamEligible = registration.events.some(event => {
                    //     return event.C && Array.isArray(event.C.isNotMissed) &&
                    //         event.C.isNotMissed.length > 0 &&
                    //         event.C.isNotMissed.every(val => val === true);
                    // }); 

                    const aTeamEligible = registration.events.every(event => {
                        if (event.event !== "Taolu Team Trials - Women´s Taijijian") {
                            return true;
                        }
                        return false;
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

        //return ATHLETE_DATA;
        return hardcodedScores
    } catch (err) {
        console.log(err)
    }
}