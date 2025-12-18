import { JSDOM } from "jsdom";
import * as fs from 'fs/promises';
import * as path from 'path'; // Import path module for handling file paths

const REGISTRATION_FILE_PATH = "2025juniorsHTMLBody.html";
const WAITING_LIST_FILE_PATH = "2025juniorsHTMLBodyWaitingList.html";
const OUTPUT_DIR = "backup/registration";
const OUTPUT_FILE_NAME = "Juniors2025.json";

// Function to create a file-system safe timestamp string
const createTimestamp = () => {
    // Generates a string like '2025-10-09T22-12-00Z'
    return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
};

// Define the two output paths:
// 1. The main file (in the current directory)
const REGISTRATION_DATA_FILE_PATH = OUTPUT_FILE_NAME;
// 2. The timestamped backup file (in the 'backup' directory)
const BACKUP_FILE_PATH = path.join(OUTPUT_DIR, `${path.parse(OUTPUT_FILE_NAME).name}_${createTimestamp()}.json`);

const REGISTRATIONS = {};

const getRegistrationsFromFile = async () => {
    let htmlText = "";

    try {
        htmlText = await fs.readFile(REGISTRATION_FILE_PATH, { encoding: 'utf8' });

        // The remaining logic for parsing is now file-agnostic
        const dom = new JSDOM(htmlText);
        const document = dom.window.document;

        const tables = document.querySelectorAll("table");

        if (tables.length === 0) {
            console.error("Error: No <table> elements found in the HTML file.");
            return REGISTRATIONS;
        }

        const tableToUse = tables[0];
        const rows = tableToUse.querySelectorAll("tr");

        rows.forEach((row, i) => {
            if (i === 0) return; // Skip the first row (Header)

            const cells = Array.from(row.querySelectorAll("td")).map(cell => cell.textContent.trim());

            // Ensure the row has enough cells (assuming 7 cells minimum based on your logic)
            if (cells.length < 7) {
                //console.warn(`Skipping row ${i}: only found ${cells.length} cells. Expected at least 7.`);
                return;
            }

            const athleteName = cells[2].toLowerCase();
            const eventInfo = cells[6];
            const eventInfoLower = eventInfo.toLowerCase();

            let ageGroup = "";
            if (eventInfoLower.includes("youth")) {
                ageGroup = "A";
            } else if (eventInfoLower.includes("junior")) {
                ageGroup = "B";
            } else if (eventInfoLower.includes("child")) {
                ageGroup = "C";
            }

            const registrationKey = `${athleteName}_${ageGroup}`;
            if (eventInfoLower.includes("taolu")) {
                if (!REGISTRATIONS[registrationKey]) {
                    REGISTRATIONS[registrationKey] = {
                        athleteName: cells[2],
                        ageGroup: "",
                        gender: "",
                        events: {},
                    };
                }

                if (ageGroup) {
                    REGISTRATIONS[registrationKey].ageGroup = ageGroup;
                }

                let gender = "";
                if (eventInfoLower.includes("female")) {
                    gender = "Female"
                } else if (eventInfoLower.includes("male")) {
                    gender = "Male"
                }

                if (gender) {
                    REGISTRATIONS[registrationKey].gender = gender;
                }

                const eventArr = eventInfo.split(" ");
                // Extract the last word as the event name
                const eventName = eventArr[eventArr.length - 1];

                const EVENT_ABBREVIATIONS = {
                    Changquan: "CQ",
                    Daoshu: "DS",
                    Jianshu: "JS",
                    Gunshu: "GS",
                    Qiangshu: "QS",
                    Nanquan: "NQ",
                    Nandao: "ND",
                    Nangun: "NG",
                    Taijiquan: "TQ",
                    Taijijian: "TJ",
                    Taijishan: "TS",
                }

                const eventAbbreviation = EVENT_ABBREVIATIONS[eventName];

                REGISTRATIONS[registrationKey].events[eventAbbreviation] = {
                    name: eventName,
                    eventInfo: eventInfo,
                    abbreviation: eventAbbreviation,
                    finalScore: 0.000,
                    deductions: [],
                    adjustment: 0,
                };
            }
        });
    } catch (error) {
        // Catches file read errors or JSDOM parsing errors
        console.error(`Error processing file ${REGISTRATION_FILE_PATH}:`, error);
    }
};


const getWaitingListRegistration = async () => {
    let htmlText = "";

    try {
        htmlText = await fs.readFile(WAITING_LIST_FILE_PATH, { encoding: 'utf8' });

        // The remaining logic for parsing is now file-agnostic
        const dom = new JSDOM(htmlText);
        const document = dom.window.document;

        const tables = document.querySelectorAll("table");

        if (tables.length === 0) {
            console.error("Error: No <table> elements found in the HTML file.");
            return REGISTRATIONS;
        }

        const tableToUse = tables[0];
        const rows = tableToUse.querySelectorAll("tr");

        rows.forEach((row, i) => {
            const cells = Array.from(row.querySelectorAll("td")).map(cell => cell.textContent.trim());

            // Ensure the row has enough cells (assuming 7 cells minimum based on your logic)
            if (cells.length < 8) {
                //console.warn(`Skipping row ${i}: only found ${cells.length} cells. Expected at least 7.`);
                return;
            }



            const athleteName = cells[1];

            if (athleteName.length === 0) {
                return;
            }

            const eventInfo = cells[4];
            const eventInfoLower = eventInfo.toLowerCase();

            if (eventInfoLower.includes("taolu")) {
                if (!REGISTRATIONS[athleteName]) {
                    REGISTRATIONS[athleteName] = {
                        athleteName: athleteName,
                        ageGroup: "",
                        gender: "",
                        events: {},
                    };
                }

                let ageGroup = "";
                if (eventInfoLower.includes("youth")) {
                    ageGroup = "A";
                } else if (eventInfoLower.includes("junior")) {
                    ageGroup = "B";
                } else if (eventInfoLower.includes("child")) {
                    ageGroup = "C";
                }

                if (ageGroup) {
                    REGISTRATIONS[athleteName].ageGroup = ageGroup;
                }

                let gender = "";
                if (eventInfoLower.includes("female")) {
                    gender = "Female"
                } else if (eventInfoLower.includes("male")) {
                    gender = "Male"
                }

                if (gender) {
                    REGISTRATIONS[athleteName].gender = gender;
                }

                const eventArr = eventInfo.split(" ");
                // Extract the last word as the event name
                const eventName = eventArr[eventArr.length - 1];

                const EVENT_ABBREVIATIONS = {
                    Changquan: "CQ",
                    Daoshu: "DS",
                    Jianshu: "JS",
                    Gunshu: "GS",
                    Qiangshu: "QS",
                    Nanquan: "NQ",
                    Nandao: "ND",
                    Nangun: "NG",
                    Taijiquan: "TQ",
                    Taijijian: "TJ",
                    Taijishan: "TS",
                }

                const eventAbbreviation = EVENT_ABBREVIATIONS[eventName];

                REGISTRATIONS[athleteName].events[eventAbbreviation] = {
                    name: eventName,
                    abbreviation: eventAbbreviation,
                    score: 0.000,
                    deductions: [],
                    adjustment: 0,
                };
            }
        });
    } catch (error) {
        // Catches file read errors or JSDOM parsing errors
        console.error(`Error processing file ${REGISTRATION_FILE_PATH}:`, error);
    }
};



// --- Execution and File Output Logic ---
console.log("Starting HTML file processing...");

await getRegistrationsFromFile()
//await getWaitingListRegistration()

const jsonData = JSON.stringify(REGISTRATIONS, null, 2);

// 1. Create the backup directory if it doesn't exist (if it exists, it does nothing)
await fs.mkdir(OUTPUT_DIR, { recursive: true });

// 2. Write the JSON data to the MAIN file (in the current directory)
await fs.writeFile(REGISTRATION_DATA_FILE_PATH, jsonData, 'utf-8');
console.log(`✅ Main data successfully written to: ${REGISTRATION_DATA_FILE_PATH}`);

// 3. Write the JSON data to the BACKUP file (in the 'backup' folder with a timestamp)
await fs.writeFile(BACKUP_FILE_PATH, jsonData, 'utf8');
console.log(`✅ Backup data successfully written to: ${BACKUP_FILE_PATH}`);
