import axios from 'axios';
import * as cheerio from 'cheerio';

const parseGoogleDoc = async (doc_url) => {
    try {
        const response = await axios.get(doc_url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $$ = cheerio.load(response.data);

        const textBlocks = [];

        $$('p, h1, h2, h3, h4, h5, h6').each((i, elem) => {
            const text = $$(elem).text().trim();
            if (text) textBlocks.push(text);
        });

        const fullText = textBlocks.join('');

        let sourceCode = fullText;
        if (fullText.substring(0, 9) === "html code") {
            sourceCode = sourceCode.slice(9)
        }

        const $ = cheerio.load(sourceCode);

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
    } catch (err) {
        console.error("Error fetching or parsing Google Doc:", err.message);
        return null;
    }
}

export default parseGoogleDoc
