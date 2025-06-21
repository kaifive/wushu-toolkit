/**
 * Counts the occurrences of each deduction code across the entire dataset
 * and returns them as a sorted array of objects.
 *
 * @param {Object} dataset The raw competition data in the specified nested format.
 * @returns {Array<Object>} An array of objects, where each object has 'code' (string)
 * and 'count' (number), sorted by count in descending order.
 * Returns an empty array if no deductions are found or data is invalid.
 */
export function countAndSortDeductionCodes(dataset) {
    const deductionCounts = {}; // This will be our hashmap to store counts

    // Check if the dataset is valid and iterable
    if (!dataset || typeof dataset !== 'object') {
        console.warn("Invalid dataset provided. Expected an object.");
        return [];
    }

    // Iterate through gender categories (e.g., "MALES", "FEMALES")
    for (const genderKey in dataset) {
        if (Object.hasOwnProperty.call(dataset, genderKey) && typeof dataset[genderKey] === 'object') {
            const genderCategory = dataset[genderKey];

            // Iterate through event categories (e.g., "CQ_DS_GS")
            for (const eventCategoryKey in genderCategory) {
                if (Object.hasOwnProperty.call(genderCategory, eventCategoryKey) && typeof genderCategory[eventCategoryKey] === 'object') {
                    const eventCategory = genderCategory[eventCategoryKey];

                    // Iterate through each competitor within this event category
                    for (const competitorName in eventCategory) {
                        if (Object.hasOwnProperty.call(eventCategory, competitorName) && typeof eventCategory[competitorName] === 'object') {
                            const competitorData = eventCategory[competitorName];

                            // Check if the competitor has an 'events' array
                            if (competitorData.events && Array.isArray(competitorData.events)) {
                                // Iterate through each event for the current competitor
                                competitorData.events.forEach(event => {
                                    // Ensure 'A' and 'A.deductions' exist and are an array
                                    if (event.A && event.A.deductions && Array.isArray(event.A.deductions)) {
                                        event.A.deductions.forEach(deductionCode => {
                                            // Ensure the deductionCode is a string and not empty
                                            if (typeof deductionCode === 'string' && deductionCode.trim() !== '') {
                                                const code = deductionCode.trim();

                                                if (code.includes(".") || code === "0") {
                                                    return
                                                }
                                                // Increment count for the deduction code
                                                deductionCounts[code] = (deductionCounts[code] || 0) + 1;
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }
    }

    // Convert the hashmap to an array of objects
    const sortedDeductions = Object.entries(deductionCounts).map(([code, count]) => ({
        code,
        count
    }));

    // Sort the array by count in descending order
    sortedDeductions.sort((a, b) => b.count - a.count);

    return sortedDeductions;
}

/**
 * Calculates the average A, B, C, and Final scores for each unique event
 * across the entire dataset.
 *
 * @param {Object} dataset The raw competition data in the specified nested format.
 * @returns {Array<Object>} An array of objects, where each object represents an event
 * with its average scores (averageA, averageB, averageC, averageFinal).
 * Scores are rounded to 3 decimal places.
 * Returns an empty array if no events or valid scores are found.
 */
export function calculateAverageEventScores(dataset) {
    // Using a Map to store sums and counts for each event
    const eventStats = new Map(); // Key: eventName, Value: { sumA, countA, sumB, countB, sumC, countC, sumFinal, countFinal }

    if (!dataset || typeof dataset !== 'object') {
        console.warn("Invalid dataset provided. Expected an object.");
        return [];
    }

    // Traverse the nested dataset
    for (const genderKey in dataset) {
        if (Object.hasOwnProperty.call(dataset, genderKey) && typeof dataset[genderKey] === 'object') {
            const genderCategory = dataset[genderKey];

            for (const eventCategoryKey in genderCategory) {
                if (Object.hasOwnProperty.call(genderCategory, eventCategoryKey) && typeof genderCategory[eventCategoryKey] === 'object') {
                    const eventCategory = genderCategory[eventCategoryKey];

                    for (const competitorName in eventCategory) {
                        if (Object.hasOwnProperty.call(eventCategory, competitorName) && typeof eventCategory[competitorName] === 'object') {
                            const competitorData = eventCategory[competitorName];

                            if (competitorData.events && Array.isArray(competitorData.events)) {
                                competitorData.events.forEach(event => {
                                    const eventName = event.event;

                                    if (eventName) {
                                        // Initialize event stats if not already present
                                        if (!eventStats.has(eventName)) {
                                            eventStats.set(eventName, {
                                                sumA: 0, countA: 0,
                                                sumB: 0, countB: 0,
                                                sumC: 0, countC: 0,
                                                sumFinal: 0, countFinal: 0
                                            });
                                        }
                                        const stats = eventStats.get(eventName);

                                        // Accumulate A score
                                        if (event.A && event.A.score) {
                                            const scoreA = parseFloat(event.A.score);
                                            if (!isNaN(scoreA)) {
                                                stats.sumA += scoreA;
                                                stats.countA += 1;
                                            }
                                        }

                                        // Accumulate B score
                                        if (event.B && event.B.score) {
                                            const scoreB = parseFloat(event.B.score);
                                            if (!isNaN(scoreB)) {
                                                stats.sumB += scoreB;
                                                stats.countB += 1;
                                            }
                                        }

                                        // Accumulate C score
                                        if (event.C && event.C.score) {
                                            const scoreC = parseFloat(event.C.score);
                                            if (!isNaN(scoreC)) {
                                                stats.sumC += scoreC;
                                                stats.countC += 1;
                                            }
                                        }

                                        // Accumulate Final score
                                        if (event.finalScore) {
                                            const finalScore = parseFloat(event.finalScore);
                                            if (!isNaN(finalScore)) {
                                                stats.sumFinal += finalScore;
                                                stats.countFinal += 1;
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }
    }

    // Calculate averages and format the results
    const averageScoresTable = [];
    eventStats.forEach((stats, eventName) => {
        const averageA = stats.countA > 0 ? (stats.sumA / stats.countA).toFixed(3) : 'N/A';
        const averageB = stats.countB > 0 ? (stats.sumB / stats.countB).toFixed(3) : 'N/A';
        const averageC = stats.countC > 0 ? (stats.sumC / stats.countC).toFixed(3) : 'N/A';
        const averageFinal = stats.countFinal > 0 ? (stats.sumFinal / stats.countFinal).toFixed(3) : 'N/A';

        averageScoresTable.push({
            event: eventName,
            averageA: averageA,
            averageB: averageB,
            averageC: averageC,
            averageFinal: averageFinal
        });
    });

    // Sort the table by averageFinal score in descending order (high to low)
    averageScoresTable.sort((a, b) => {
        // Handle 'N/A' values by treating them as 0 for sorting purposes,
        // or a very small number if you want them to always appear at the end.
        // Here, parseFloat will convert 'N/A' to NaN, so we handle that.
        const finalA = parseFloat(a.averageFinal) || 0; // Convert to number, or 0 if N/A
        const finalB = parseFloat(b.averageFinal) || 0; // Convert to number, or 0 if N/A

        return finalB - finalA; // Descending order
    });

    return averageScoresTable;
}