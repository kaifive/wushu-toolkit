import { eventTypes, eventClasses } from "./eventTypes.js";

import snapshot from "./snapshot.json"

export function getData() {
    return fetch("https://bowuu.com/v1/eventParticipation/results/24")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data.eventParticipation) {
                throw new Error('Athlete data not found');
            }

            throw new Error("Database changed.");

            return processEventData(data);
        })
        .catch(error => {
            console.error('Fetch failed, using snapshot data:', error);
            return processEventData(snapshot);
        });
}

function processEventData(data) {
    const athleteData = {}
    const schools = []
    const athletes = []

    data.eventParticipation.map((event) => {
        const school = event.teamName ? event.teamName : "Individual"

        if (!schools.includes(school)) {
            schools.push(school)
        }

        schools.sort();

        const athlete = {
            name: event.participantName,
            school: school
        }

        if (!athletes.some(item => JSON.stringify(item) === JSON.stringify(athlete))) {
            athletes.push(athlete)
        }

        athletes.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        if (athleteData[event.participantId] == null) {
            athleteData[event.participantId] = {
                group: event.ageGroup,
                gender: event.gender,
                athlete: event.participantName,
                school: school,
                events: [],
                finalScore: 0,
                topEvents: {
                    Barehand: {
                        form: "",
                        score: 0,
                        type: "",
                        class: "",
                    },
                    Weapon: {
                        form: "",
                        score: 0,
                        type: "",
                        class: "",
                    },
                }
            }
        }

        athleteData[event.participantId].events.push({
            form: event.eventName,
            score: event.score ? (event.score !== "-DNS-" ? event.score : 0) : 0,
            type: eventTypes[event.eventName],
            class: eventClasses[eventTypes[event.eventName]]
        })
    })

    Object.values(athleteData).forEach((athlete) => {
        athlete.events.map((event) => {
            let type = event.class;

            if (type === "Short Weapon" || type === "Long Weapon") {
                type = "Weapon";
            }

            if (event.score > athlete.topEvents[type].score) {
                athlete.topEvents[type] = event
            }
        })

        athlete.finalScore = Math.round((athlete.topEvents.Barehand.score + athlete.topEvents.Weapon.score) * 1000) / 1000;
    })


    const date = new Date();
    const californiaTime = date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }) + " (PDT)"

    return {
        athleteData: athleteData,
        schools: schools,
        athletes: athletes,
        loading: false,
        error: null,
        syncDate: californiaTime,
    };
}
