import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';
import { COMPETITION_CONFIG } from "./competitionConfig.js";
import snapshot from "./snapshots/2025AdultsSnapshot.js"

async function getAdults2025() {
    const response = await fetch("https://usawkf.org/SportData/TeamTrialResult.php");
    const html = await response.text();
    const $ = cheerio.load(html);

    const scrapedData = {};
    $('table').each((i, table) => {
        const eventName = $(table).find('th').text().trim();
        if (eventName) {
            $(table).find('tr:not(:first-child)').each((j, row) => {
                const cells = $(row).find('td');
                if (cells.length >= 7) {
                    const athleteInfo = $(cells[1]).text().trim();
                    const athleteNameMatch = athleteInfo.match(/^([a-zA-Z\s]+)/);
                    const athleteName = athleteNameMatch ? athleteNameMatch[1].trim() : 'Unknown';

                    if (!scrapedData[athleteName]) {
                        scrapedData[athleteName] = {
                            competitor: { name: athleteName },
                            events: {},
                            calculations: { averageFinalScore: 0, aTeamEligible: false }
                        };
                    }
                    
                    scrapedData[athleteName].events[eventName] = {
                        event: eventName,
                        A: { score: $(cells[2]).text().trim(), deductions: [] },
                        B: { score: $(cells[3]).text().trim(), scores: [], isNotDropped: [] },
                        C: { score: $(cells[4]).text().trim(), counts: [], isNotMissed: [] },
                        athleteName: athleteName,
                        schoolName: "",
                        adjustment: $(cells[5]).text().trim(),
                        finalScore: $(cells[6]).text().trim()
                    };
                }
            });
        }
    });

    const finalData = {
        MALES: {
            CQ_DS_GS: {},
            CQ_JS_QS: {},
            NQ_ND_NG: {},
            TJ_TQ: {},
            CQ: {}
        },
        FEMALES: {
            CQ_DS_GS: {},
            CQ_JS_QS: {},
            NQ_ND_NG: {},
            TJ_TQ: {},
            CQ: {}
        },
    };

    const categoryEventMap = {
        'CQ_DS_GS': ['Daoshu', 'Gunshu'],
        'CQ_JS_QS': ['Jianshu', 'Qiangshu'],
        'NQ_ND_NG': ['Nanquan', 'Nandao', 'Nangun'],
        'TJ_TQ': ['Taijiquan', 'Taijijian']
    };

    Object.entries(scrapedData).forEach(([scrapedName, data]) => {
        let gender = null;
        for (const eventName of Object.keys(data.events)) {
            if (eventName.includes('Men�s')) {
                gender = 'MALES';
                break;
            } else if (eventName.includes('Women�s')) {
                gender = 'FEMALES';
                break;
            }
        }
        if (!gender) return;

        // Find the athlete in the snapshot to get the canonical name and events
        let athleteSnapshot = null;
        let snapshotName = scrapedName;
        Object.values(snapshot[gender] || {}).forEach(category => {
            Object.values(category).forEach(reg => {
                if (reg.competitor.name === scrapedName) {
                    athleteSnapshot = reg;
                    snapshotName = reg.competitor.name; // Use the name from the snapshot
                }
            });
        });

        // Continue with the rest of the logic using the snapshotName
        let hasSpecificCategory = false;
        
        Object.values(data.events).forEach(scrapedEvent => {
            const lastWord = scrapedEvent.event.split(' ').pop();
            Object.entries(categoryEventMap).forEach(([category, events]) => {
                if (events.includes(lastWord)) {
                    hasSpecificCategory = true;
                    if (!finalData[gender][category][snapshotName]) {
                        finalData[gender][category][snapshotName] = {
                            ...data,
                            competitor: { name: snapshotName },
                            events: []
                        };
                    }
                    finalData[gender][category][snapshotName].events.push(scrapedEvent);
                }
            });
        });

        const changquanEvents = Object.values(data.events).filter(e => e.event.split(' ').pop() === 'Changquan');
        if (changquanEvents.length > 0) {
            if (!finalData[gender].CQ[snapshotName]) {
                 finalData[gender].CQ[snapshotName] = {
                    ...data,
                    competitor: { name: snapshotName },
                    events: []
                 };
            }
            finalData[gender].CQ[snapshotName].events.push(...changquanEvents);
        }
    });

    Object.entries(finalData.MALES.CQ).forEach(([athleteName, registration]) => {
        if (finalData.MALES.CQ_DS_GS[athleteName]) {
            finalData.MALES.CQ_DS_GS[athleteName].events.push(...registration.events);
        }
        if (finalData.MALES.CQ_JS_QS[athleteName]) {
            finalData.MALES.CQ_JS_QS[athleteName].events.push(...registration.events);
        }
    });
    Object.entries(finalData.FEMALES.CQ).forEach(([athleteName, registration]) => {
        if (finalData.FEMALES.CQ_DS_GS[athleteName]) {
            finalData.FEMALES.CQ_DS_GS[athleteName].events.push(...registration.events);
        }
        if (finalData.FEMALES.CQ_JS_QS[athleteName]) {
            finalData.FEMALES.CQ_JS_QS[athleteName].events.push(...registration.events);
        }
    });

    delete finalData.MALES.CQ;
    delete finalData.FEMALES.CQ;

    Object.entries(finalData).forEach(([gender, categories]) => {
        Object.entries(categories).forEach(([category, registrations]) => {
            const registrationsArray = Object.entries(registrations).map(([athleteName, registration]) => {
                const athleteSnapshot = snapshot[gender]?.[category]?.[athleteName];
                if (athleteSnapshot) {
                    registration.events = registration.events.map(scrapedEvent => {
                        const lastWordScraped = scrapedEvent.event.split(' ').pop();
                        const snapshotEvent = athleteSnapshot.events.find(e => {
                            const lastWordSnapshot = e.event.split(' ').pop();
                            return lastWordScraped === lastWordSnapshot;
                        });
                        return { ...scrapedEvent, nandu: snapshotEvent?.nandu || [] };
                    });
                    registration.competitor = athleteSnapshot.competitor;
                }
                
                const totalFinalScore = registration.events.reduce((sum, item) => sum + parseFloat(item.finalScore || 0), 0);
                const eventsWithScores = registration.events.length;
                const averageFinalScore = eventsWithScores > 0 ? (totalFinalScore / eventsWithScores) : 0;
                
                const aTeamEligible = registration.events.some(event => event.C && parseFloat(event.C.score) >= 2.0);

                return {
                    athleteName,
                    registration,
                    averageFinalScore,
                    aTeamEligible,
                };
            });

            registrationsArray.sort((a, b) => b.averageFinalScore - a.averageFinalScore);

            const sortedRegistrations = {};
            registrationsArray.forEach(({ athleteName, registration, averageFinalScore, aTeamEligible }) => {
                registration.calculations = { averageFinalScore: averageFinalScore.toFixed(3), aTeamEligible };
                sortedRegistrations[athleteName] = registration;
            });
            categories[category] = sortedRegistrations;
        });
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `tempadults2025-${timestamp}.json`;
    const snapshotDir = path.resolve('snapshots');
    await fs.mkdir(snapshotDir, { recursive: true });
    const filepath = path.join(snapshotDir, filename);
    await fs.writeFile(filepath, JSON.stringify(finalData, null, 2), 'utf-8');

    console.log("...snapshot succeeded!");
}

console.log("Snapshotting data...");
await getAdults2025();