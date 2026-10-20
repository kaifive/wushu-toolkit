import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = "https://www.sportdata.org/wushu/set-online/"

const scrapeScorecard = async (competitionId, categoryId) => {
    const url = `${BASE_URL}popup_mitschrift_main.php?popup_action=auslosungcatpunktexml&catid=${categoryId}&verid=${competitionId}`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const scorecards = {};

    const tables = $('table');
    const rows = $(tables[3]).children('tbody').children('tr');

    rows.each((_, row) => {
        const scorecardData = {
            A: {},
            B: {},
            C: {}
        };
        const cells = $(row).children('td').map((idx, cell) => {
            const $cell = $(cell);

            if ($cell.find('table').length > 0) {
                const nestedRows = $cell.find('table tr');

                nestedRows.each((idx, nestedRow) => {
                    const texts = [];
                    const isValid = [];

                    $(nestedRow).children('td').each((tdIdx, nestedCell) => {
                        const $cell = $(nestedCell);
                
                        // Use .contents() to get both text and HTML elements inside the cell
                        $cell.contents().each((_, el) => {
                            const $el = $(el);
                
                            // Get text from either text node or strike tag
                            const parts = $el.text().split('|').map(s => s.trim()).filter(Boolean);
                
                            parts.forEach((part) => {
                                if (part === '') return;
                
                                texts.push(part);
                                isValid.push(el.tagName !== 'strike'); // false if <strike>, true otherwise
                            });
                        });
                    });

                    if (idx === 0) {
                        scorecardData.A.score = texts[2]
                        scorecardData.A.deductions = texts[1].split(" ")
                    } else if (idx === 1) {
                        scorecardData.B.score = texts.pop()
                        scorecardData.B.scores = texts.slice(1);
                        scorecardData.B.isNotDropped = isValid.slice(1, -1);
                    } else if (idx === 2) {
                        scorecardData.C.score = texts.pop()
                        scorecardData.C.counts = texts.slice(1)
                        scorecardData.C.isNotMissed = isValid.slice(1, -1);
                    } else if (idx === 3) {
                        scorecardData.adjustment = texts[2]
                    }

                });
            } else {
                const text = $cell.text().trim();

                if (idx === 1) {
                    scorecardData.athleteName = text.split("(")[0].trim();
                    scorecardData.schoolName = text.split("(")[1]?.replace(")", "").trim() || "";
                } else if (idx === 4) {
                    scorecardData.finalScore = text;
                }
            }

        })

        if (scorecardData.athleteName) {
            const key = scorecardData.athleteName.toLowerCase()
            scorecards[key] = scorecardData
        }
    })

    delete scorecards.undefined

    return scorecards;
};

export default scrapeScorecard