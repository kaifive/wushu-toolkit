import registrationData from "../../2025-junior-team-trials/scripts/Juniors2025.json"

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
    "Taolu Children Female Elementary Changquan": "https://docs.google.com/document/d/e/2PACX-1vToRP3Ikf4PUhg0Akx20ZPqc3-paep6SaI43HInVlTAbc_O1lZoWcWo_F1YFv6rzVTjA7lt6ebKI3bA/pub",
    "Taolu Children Female Elementary Daoshu": "https://docs.google.com/document/d/e/2PACX-1vRrqQz7SlUtjXMDYukixRXnkOPNMefixHbi83TciuJfv2k-EUL_AfJn6N4cWjr9-uHH5ku8JLyqGiqm/pub",
    "Taolu Children Female Elementary Gunshu": "https://docs.google.com/document/d/e/2PACX-1vQZLe5TB61I8lL0yCfdNTLpJ16rBBIMjEh19Mn5fvFu1xZHHEoaSRU2-SZ4jOcLbFRbe4heTJX3Ym2o/pub",
    "Taolu Children Female Elementary Jianshu": "https://docs.google.com/document/d/e/2PACX-1vTPZrkf0l4WtZPnyiMdbffYsxRkln7esIh6dKZBjteb9xxkFaZNU5nSZRS245--ubqy5zHaYsmSTwFo/pub",
    "Taolu Children Female Elementary Nandao": "https://docs.google.com/document/d/e/2PACX-1vRb236PXOXpaeGA8Ff75uP1izqftHAmb_QY1WHYf_b9oYh1zODEToo3C0VHTY1QnMtZq8QCL78TzBdi/pub",
    "Taolu Children Female Elementary Nangun": "https://docs.google.com/document/d/e/2PACX-1vQMu-YLYZ0kHlLL1c5aWG8XYLLDVDTYod0YvjbKogO3LspT3BqJzXtV1zMUjJbiXCwn0VZxwjmPWb0d/pub",
    "Taolu Children Female Elementary Nanquan": "https://docs.google.com/document/d/e/2PACX-1vQYa60c7dRKVqU4CmLSYm2Z5RwMwsVixZHlKOs-8h4P14VVYIRi7TDbt9n6yQtanFiM2XIdn4CzEMA0/pub",
    "Taolu Children Female Elementary Qiangshu": "https://docs.google.com/document/d/e/2PACX-1vQo_ZtOR4rJMYymMBk4wmssZpgH5SzbnMLM5yTGvEmN4nwSX3nW79rEsNjzeW9K5WMVMJfAyiBx0Sr1/pub",
    "Taolu Children Female Elementary Taijijian": "https://docs.google.com/document/d/e/2PACX-1vRpPEQpo1Zdwevn2wZneiWt17j62pHlGxRcQWP01yqBXzWDTbXNPpn--aRwhAROsJJwFC_kCZetqudw/pub",
    "Taolu Children Female Elementary Taijiquan": "https://docs.google.com/document/d/e/2PACX-1vTVGEwnOXj0YYKVRyhKLD4BmL4kOQ9YBDvmD-DbTs39snqrFXWBzJ0nXPMyKxmAZGbI3Z_ZxH8rRe6j/pub",
    "Taolu Children Male Elementary Changquan": "https://docs.google.com/document/d/e/2PACX-1vRtCYobIxPKe7v4mo7l7rOTUv6GXsuxQW9-GJaOszLTA6nYsK9CgbCSMbZNHcO4I1Gye6CeL1aAC0Oy/pub",
    "Taolu Children Male Elementary Daoshu": "https://docs.google.com/document/d/e/2PACX-1vQrfdDxFkLVPcjcLsiAFCZypI_oUIpaH0dzjkN6Z8KrvI3alrT-OprX-1gz3lhtiTPkTPnB8q3DdO2a/pub",
    "Taolu Children Male Elementary Gunshu": "https://docs.google.com/document/d/e/2PACX-1vRaTdlqm6Ve6NmKQyRk6RdWMp4GcL4PhEPGopYG6twxzKJNMllNJCLXFzHOZGgJxofalLmP1Q7yhwJ9/pub",
    "Taolu Children Male Elementary Jianshu": "https://docs.google.com/document/d/e/2PACX-1vQLC1SsS7qh5If494rsX3cKjYKCZpF-ONEfF6f0qvHRjvfDbGGotym1UaAMoJo30enoqGgQccjz0u6W/pub",
    "Taolu Children Male Elementary Nandao": "https://docs.google.com/document/d/e/2PACX-1vQPWcTEib-N5MQXgxhwpPNVolqjLcpY_n7cjeXGHr-nGSqHExhLIrL6DlzOJxjfVO60NMo636Q86mTK/pub",
    "Taolu Children Male Elementary Nangun": "https://docs.google.com/document/d/e/2PACX-1vTWYQUqSQS_t2kz_6bPI-7WJA5QR9fL0UdT0tbA0pIwxcj065p5_eR_i8MLG4ivv9kWxktMX3VOIGeJ/pub",
    "Taolu Children Male Elementary Nanquan": "https://docs.google.com/document/d/e/2PACX-1vQlYdNFEyg3MF825tOXvLEJfNDaCJZz4KrSzVF5q8jZGXZ2-_ytdIIVFt8I_FBd6n7oUw_OuLq0RCVa/pub",
    "Taolu Children Male Elementary Qiangshu": "https://docs.google.com/document/d/e/2PACX-1vRlX4h7eT3bmjVaQrzc0yx1A8idJ2r_nKTAvffwsyrDuQ2niaPeZnYQk7wfXw1FFwVm4dVJce4wv8F7/pub",
    "Taolu Junior Female 1st Set Changquan": "https://docs.google.com/document/d/e/2PACX-1vQj90dFSEtzpy1oEH6f7uEf2WnaMT_2TqqGR_jvRuO7GglxyyO0ykffMmTwzaKkpaEa4uQWgTbE4Z85/pub",
    "Taolu Junior Female 1st Set Daoshu": "https://docs.google.com/document/d/e/2PACX-1vSn-cChSciYi91AU8T-upArdoRgPoL7JZUoCC2j_rHzuZTXdN9Gntq63MjchzGYSR0ma3U58-EGGvo0/pub",
    "Taolu Junior Female 1st Set Gunshu": "https://docs.google.com/document/d/e/2PACX-1vRFPSFQ0N0imCE3DS6BNH2QnHdpkFH8xCWu-r07GuOoikxG3VhelM4wt7LkTzonhg41fqnec9s0G_fx/pub",
    "Taolu Junior Female 1st Set Jianshu": "https://docs.google.com/document/d/e/2PACX-1vTKEX2seEtB397abDTsXAzagYB0GkR8jeZDgLz9F4FpKGtQCX4yzxahBDCmoBNkBiyDvxbjz4D0DTE0/pub",
    "Taolu Junior Female 1st Set Nandao": "https://docs.google.com/document/d/e/2PACX-1vT0wdlNglLxU_ZpLpyuiaoL2Q_Ivuj8C7NNMl1sxsnTMxP95ApJZ08iquIG1z_rliHuvJftuvnZUhIu/pub",
    "Taolu Junior Female 1st Set Nangun": "https://docs.google.com/document/d/e/2PACX-1vRfQBiU4J5x28hgCWRkaKz_k1ynvEMdmQeys973koCa4d2XIa32ei5KVyWY-ks0RDVjm_OdekdSaTOq/pub",
    "Taolu Junior Female 1st Set Nanquan": "https://docs.google.com/document/d/e/2PACX-1vRAETJppKANF4nkcHS29izkc8GaBUd0sM79t993EcjSQzEug93k8VUSYUVnBXra1smu8_rbAns-3eHc/pub",
    "Taolu Junior Female 1st Set Qiangshu": "https://docs.google.com/document/d/e/2PACX-1vRnOoSTQdSdaoy0d59zmDLlyqEWs_3CNRySxPt92QfABcKzJSngCeL9BxK0xlKrrsDmRu1QRcloWccs/pub",
    "Taolu Junior Female 1st Set Taijijian": "https://docs.google.com/document/d/e/2PACX-1vQ1DXY-J9B194swUDR1QAPxDWf6lC1h35B7HNqUMz_hiKXN8jd-L2TU4CCXrAcxH-KNgr9f3jCDfqkX/pub",
    "Taolu Junior Female 1st Set Taijiquan": "https://docs.google.com/document/d/e/2PACX-1vT6mmdh63J-8kxCSiGDt8aJXSS68ODIYC6dVpf3bTz8Mo1q8_ZkqGTvkNliY9U3WKYHUWUud67oXv1O/pub",
    "Taolu Junior Male 1st Set Changquan": "https://docs.google.com/document/d/e/2PACX-1vSrYosHlzY3iVx3yM8EOejRAv3qNiHBQ5WtVgME7vBdmeHFlgh-MkGQE1ucvFj-Wb1l_znyJ8aBkSdJ/pub",
    "Taolu Junior Male 1st Set Daoshu": "https://docs.google.com/document/d/e/2PACX-1vQTmyvEex45TshjbgFLsOoU9IkXUcKncpG22aUYU6aBBpro0FQ_9Na5wgis7jgJFQlDzmnT3BQOmglQ/pub",
    "Taolu Junior Male 1st Set Gunshu": "https://docs.google.com/document/d/e/2PACX-1vTvtLhOB6Z6sCR0Aya0RCVv9PgrcVCBBOZLgjfsgSh8-TP6oRKhVwhxirlxEchORHCcwH4EzhNF4jRa/pub",
    "Taolu Junior Male 1st Set Jianshu": "https://docs.google.com/document/d/e/2PACX-1vRNZv2nprGD8a-30kEpK2fvLCB9rnuDKC6rLSMuWjq4KMNMJb1TyPtvz1n7K3VRVfW0e6ga2BEjx1Hm/pub",
    "Taolu Junior Male 1st Set Nandao": "https://docs.google.com/document/d/e/2PACX-1vR_DrAxdsNpQPkYvGZ6qTW-TclnuGsygpM4aXRVLH1PbxKeDGs5kHeg_VnW1jNg-uvgefCF6HBlQJnF/pub",
    "Taolu Junior Male 1st Set Nangun": "https://docs.google.com/document/d/e/2PACX-1vTfloF1ef-UiKa48KX6zcjDbUTLsUsA0__ra7h3WIWp172aoVLyUGu5eH5F5olFYEGupYSxqmJ3rs94/pub",
    "Taolu Junior Male 1st Set Nanquan": "https://docs.google.com/document/d/e/2PACX-1vTVIXkqAiEz4kBuJlk9hQcCon-q5AmXES_6z8heFRFmnqqzdlcOj3_h-izkasdg9bl0r6ge4oCPJd5t/pub",
    "Taolu Junior Male 1st Set Qiangshu": "https://docs.google.com/document/d/e/2PACX-1vSeZTyTtUNHn391KOvRA8S1b-YGXAAuYBEFvoF3xK5frdh8I60Foh3nS-qwgrMaJba91W3MWwVx5rrt/pub",
    "Taolu Youth Female 3rd Set Changquan": "https://docs.google.com/document/d/e/2PACX-1vSwczj2nxULmXGmBZ4NO62dLt4_cqRwglxalTLJskpljSqddM98i77olwHHk2zZ80C2wGa5tkMnnTVu/pub",
    "Taolu Youth Female 3rd Set Daoshu": "https://docs.google.com/document/d/e/2PACX-1vRNjX7XJI3yjiHZvtgZRwPnguXa-9iS_1K1sYPpFCTYJIUv-ejgQZmd_B04YK-MZR7wcZMG-waJGyEL/pub",
    "Taolu Youth Female 3rd Set Gunshu": "https://docs.google.com/document/d/e/2PACX-1vTMMH18aWEZDw57rFBqsrLO2pVryV6S4vpD9ordM1BGWS81ckJHy6rXOnoHK9G3GZFtHcuTxoPaM8q-/pub",
    "Taolu Youth Female 3rd Set Jianshu": "https://docs.google.com/document/d/e/2PACX-1vSZhhD3FuhuCM9nY7XoszenZsKh_vX7ABL2fKj69J2qGuneXSNvmUqGpcgNu3R7MNSRj0a0T9XnkXxj/pub",
    "Taolu Youth Female 3rd Set Nandao": "https://docs.google.com/document/d/e/2PACX-1vTF-Mr5nokkrKaJuQyK0DFSj0L4xIPyqtLmFpJmkHM05CdBtFun7QJWfXg4V0X8pM62xEewwVXhuWgG/pub",
    "Taolu Youth Female 3rd Set Nangun": "https://docs.google.com/document/d/e/2PACX-1vQt_bFcjqizbhrAhhHWY-AKh7cqjNVfTYS2jWLFuyz3BlkOAYvBEhMXRwDpU64bmFkieKyrzk5BfW83/pub",
    "Taolu Youth Female 3rd Set Nanquan": "https://docs.google.com/document/d/e/2PACX-1vR5OAJ1oDvdF2zVhhzigsg4BV99YVqfJMzLJsA9reg_z-1fikEiwA5PQfPs5R_TQGMF0bbI7rK7c7N-/pub",
    "Taolu Youth Female 3rd Set Qiangshu": "https://docs.google.com/document/d/e/2PACX-1vRkmvY_3XDJD2GeqiFDlkoYrL2f0TTRcdCOufvJyhibqST5Q9Xc70dbyAdedQOpOEprLu6XRP26UfZs/pub",
    "Taolu Youth Female 3rd Set Taijijian": "https://docs.google.com/document/d/e/2PACX-1vROiYHcYItyTr8imHN62sgsESOwlZet8F-IvijZE1Op12sfoA0Xwpt6sEM0JusGLq85gNQvt49nI69B/pub",
    "Taolu Youth Female 3rd Set Taijiquan": "https://docs.google.com/document/d/e/2PACX-1vTWHr045TuhxCL1ZFuaE1uBBabUqyeNwRVhp7FjU2rjkykKH5NAmkbyeEG2CLUvkkuy95rlH_D_gGnY/pub",
    "Taolu Youth Female 3rd Set Taijishan": "https://docs.google.com/document/d/e/2PACX-1vSu3Au5SCJ683ABVt2d8j3cq_qU3gGnxR9Ft5CoWmBiGJ36i0GD1Zi0rtNlx4kOL_60XXadJ0CR8T4S/pub",
    "Taolu Youth Male 3rd Set Changquan": "https://docs.google.com/document/d/e/2PACX-1vQeS2JpXQM5SY3x8K-LvBktAmlxrGVlrbUazS4WTYA4UofLbLIREwQ-U0FBZ2CEjg9Z0OCWCe7cS_i2/pub",
    "Taolu Youth Male 3rd Set Daoshu": "https://docs.google.com/document/d/e/2PACX-1vQdkuUe4JZjOJw7UvJ35jsk-wnx9BUHg4pnk87aEhDbrjc-3am9ICQrLYgAM-K7FmRh7hFScFjv20M3/pub",
    "Taolu Youth Male 3rd Set Gunshu": "https://docs.google.com/document/d/e/2PACX-1vThVUJDtOccSOwJF4BxG-gCSzXg4BTUUhqN8MnM1H2uiXQSrAaHJ6MhKO1Gu3rxcq6IQdNUdqGA_SBE/pub",
    "Taolu Youth Male 3rd Set Jianshu": "https://docs.google.com/document/d/e/2PACX-1vQeuvPOQajMee0ZXD6rZcA1Fq2v4rQMRJfD3CSQG1oqQhWbeCC1cZFF9Qr11kj8HGXwiZffJyWN7ACY/pub",
    "Taolu Youth Male 3rd Set Nandao": "https://docs.google.com/document/d/e/2PACX-1vQ-J6ZdhOs-FD7NVKvopFgQXFJIkjbYjb4szHCqlrHnFSxt-TSmAQPJ8dOqx6G3dJJJ_yHBv42Kidy1/pub",
    "Taolu Youth Male 3rd Set Nangun": "https://docs.google.com/document/d/e/2PACX-1vRQZclQ_FUKK1OxVWVVnKmENiCpCC8f9s4jkRAerJ5ftkE5K_RX2jdSaux3AzFGfSvub8ZlkT9f9Pll/pub",
    "Taolu Youth Male 3rd Set Nanquan": "https://docs.google.com/document/d/e/2PACX-1vTlrjAoUFPXJiIDmfEJioiv_WzslTWIccJID16ZmnW_2nVJskOLrAx4D4eNXoLD6i6eMNauaj_Xo_TT/pub",
    "Taolu Youth Male 3rd Set Qiangshu": "https://docs.google.com/document/d/e/2PACX-1vQmHTVhMKlunLMRyWBOLw0ohDH-LdhnTXZWFcw2phohX81e6IcV1R8RsScbt9O4V22pm5XKbEhHPW1s/pub",
    "Taolu Youth Male 3rd Set Taijijian": "https://docs.google.com/document/d/e/2PACX-1vSMjdbZH47RvMz6Nx0oO6sxpR9R-X8C2JoaHkV8DRH6H7RiRatyI0K3WXUu06FY0y24PFqj74k7TxFM/pub",
    "Taolu Youth Male 3rd Set Taijiquan": "https://docs.google.com/document/d/e/2PACX-1vRV2ut1jo0gpbqCbsqEBuyNRw2lCQCn3iz05hAqZ6WWA8jJ5V_HlSeG29DB3L_UfkHytAPULEwNRyk0/pub",
    "Taolu Youth Male 3rd Set Taijishan": "https://docs.google.com/document/d/e/2PACX-1vQdjBX7iUIqVRkW6MHhBrnB5NfdoBLAR-sc7XlY2xsVEgDH6CDOG7LFeorxkf4weh4cdnqK8pv4UJzD/pub",
};


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

export async function getJuniors2025(config) {
    try {
        const { competition, searchTerm, mensLookupTerm, showWaitingList } = config;

        let scorecardData;

        await fetchAllScorecards().then((scorecards) => {
            scorecardData = Object.assign({}, ...scorecards);
        });

        const ATHLETE_DATA = registrationData

        Object.entries(ATHLETE_DATA).forEach(([athleteDataKey, details]) => {
            const athleteName = athleteDataKey.split('_')[0]
            Object.entries(details.events).forEach(([eventKey, event]) => {
                const eventInfo = event.eventInfo;

                if (scorecardData?.[eventInfo]?.[athleteName.toLowerCase()]) {
                    ATHLETE_DATA[athleteDataKey].events[eventKey] = {
                        ...ATHLETE_DATA[athleteDataKey].events[eventKey],
                        ...scorecardData?.[eventInfo]?.[athleteName.toLowerCase()]
                    };
                }
            });
        });

        const barehandEvents = ["Changquan", "Nanquan", "Taijiquan"];

        const weaponOptions = {
            "Changquan": ["Daoshu", "Gunshu", "Jianshu", "Qiangshu"],
            "Nanquan": ["Nandao", "Nangun"],
            "Taijiquan": ["Taijijian", "Taijishan"],
        };

        const weaponToDisciplineMap = {};
        Object.entries(weaponOptions).forEach(([discipline, weapons]) => {
            weapons.forEach(weapon => {
                weaponToDisciplineMap[weapon] = discipline;
            });
        });

        Object.entries(ATHLETE_DATA).forEach(([athleteName, details]) => {
            let maxScores = {}

            Object.entries(details.events).forEach(([eventKey, event]) => {
                const eventName = event.name;
                const eventScore = parseFloat(event.finalScore) || 0;

                if (barehandEvents.includes(eventName)) {
                    const discipline = eventName; 
                    if (!maxScores[discipline]) {
                        maxScores[discipline] = { barehand: 0, weapon: 0 };
                    }

                    if (eventScore > maxScores[discipline].barehand) {
                        maxScores[discipline].barehand = eventScore;
                    }
                } else if (weaponToDisciplineMap[eventName]) {
                    const discipline = weaponToDisciplineMap[eventName];
                    if (!maxScores[discipline]) {
                        maxScores[discipline] = { barehand: 0, weapon: 0 };
                    }

                    if (eventScore > maxScores[discipline].weapon) {
                        maxScores[discipline].weapon = eventScore;
                    }
                }
            });

            // combine barehand and weapon scores to determine top discipline
            Object.entries(maxScores).forEach(([discipline, scores]) => {
                const totalScore = scores.barehand + scores.weapon;
                if (!details.topDiscipline || totalScore > details.totalScores) {
                    details.topDiscipline = discipline;
                    details.totalScores = totalScore;
                }
            });



            // let totalCombinedChangquan = maxScores["Changquan"].barehand + maxScores["Changquan"].weapon;
            // let totalCombinedNanquan = maxScores["Nanquan"].barehand + maxScores["Nanquan"].weapon;
            // let totalCombinedTaijiquan = maxScores["Taijiquan"].barehand + maxScores["Taijiquan"].weapon;

            // if (totalCombinedChangquan >= totalCombinedNanquan && totalCombinedChangquan >= totalCombinedTaijiquan) {
            //     details.topDiscipline = "Changquan";
            //     details.totalScores = totalCombinedChangquan;
            // } else if (totalCombinedNanquan >= totalCombinedChangquan && totalCombinedNanquan >= totalCombinedTaijiquan) {
            //     details.topDiscipline = "Nanquan";
            //     details.totalScores = totalCombinedNanquan;
            // } else {
            //     details.topDiscipline = "Taijiquan";
            //     details.totalScores = totalCombinedTaijiquan;
            // }
        });

        return ATHLETE_DATA;
    } catch (err) {
        console.log(err)
    }
}