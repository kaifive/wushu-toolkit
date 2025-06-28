export function determineAdultWushuTeam(genderedAthleteDataByCategory) {
    const aTeam = [];
    const bTeam = [];
    const cTeam = [];
    const assignedAthletes = new Set(); // Stores athlete names already assigned to any team (global)

    // Define the specific categories that provide initial slots for A, B, and C teams
    const primaryCategories = ["CQ_DS_GS", "CQ_JS_QS", "NQ_ND_NG", "TQ_TJ"];

    // Step 1: Consolidate athletes' performances PER CATEGORY.
    // This structure will be:
    // {
    //   "athleteName": {
    //     "categoryKey1": { name, score, aTeamEligible, representingCategory: categoryKey1 },
    //     "categoryKey2": { name, score, aTeamEligible, representingCategory: categoryKey2 },
    //     ...
    //   }
    // }
    const athletesPerformanceByCategory = {};

    for (const categoryKey in genderedAthleteDataByCategory) {
        // We only process primary categories for team selection as per the rules
        // If an athlete from a non-primary category is needed for "overall highest",
        // they'd need to be explicitly included or rules adjusted.
        // For now, we stick to selecting from primary categories and then overall highest from these.
        if (Object.hasOwnProperty.call(genderedAthleteDataByCategory, categoryKey) && typeof genderedAthleteDataByCategory[categoryKey] === 'object') {
            const categoryAthletes = genderedAthleteDataByCategory[categoryKey];

            for (const athleteName in categoryAthletes) {
                if (Object.hasOwnProperty.call(categoryAthletes, athleteName) && typeof categoryAthletes[athleteName] === 'object') {
                    const data = categoryAthletes[athleteName];
                    const averageFinalScore = parseFloat(data.calculations.averageFinalScore);
                    const aTeamEligible = data.calculations.aTeamEligible;

                    // Skip this athlete/event if their score is invalid or 0
                    if (isNaN(averageFinalScore) || averageFinalScore <= 0) {
                        continue;
                    }

                    if (!athletesPerformanceByCategory[athleteName]) {
                        athletesPerformanceByCategory[athleteName] = {};
                    }

                    // Store performance for this athlete within this specific category
                    athletesPerformanceByCategory[athleteName][categoryKey] = {
                        name: athleteName,
                        score: averageFinalScore,
                        aTeamEligible: aTeamEligible,
                        representingCategory: categoryKey // This is the score for THIS category
                    };
                }
            }
        }
    }

    // --- Helper to filter and sort candidates for a given category or overall ---
    // This function now expects the full `athletesPerformanceByCategory` map
    // and a specific `targetCategory` if we're looking for category-specific candidates.
    // If `targetCategory` is null, it means we're looking at overall candidates.
    const getCandidates = (targetCategory = null, filterAssigned = true, filterATeamEligible = false) => {
        const candidates = [];
        for (const athleteName in athletesPerformanceByCategory) {
            const athleteCategories = athletesPerformanceByCategory[athleteName];

            if (targetCategory) {
                // Look for performance in a specific category
                if (athleteCategories[targetCategory]) {
                    const performance = athleteCategories[targetCategory];
                    if (filterAssigned && assignedAthletes.has(performance.name)) continue;
                    if (filterATeamEligible && !performance.aTeamEligible) continue;
                    candidates.push(performance);
                }
            } else {
                // Look at overall best performance across all primary categories they competed in
                // This is for the 'overall highest unassigned' slots
                let bestPerformance = null;
                for (const catKey in athleteCategories) {
                    // Only consider performances from primary categories for overall selection,
                    // unless a specific rule dictates otherwise.
                    // If you want to include athletes from *any* category for overall, remove this check.
                    if (primaryCategories.includes(catKey)) {
                        const performance = athleteCategories[catKey];
                        if (filterAssigned && assignedAthletes.has(performance.name)) continue;
                        if (filterATeamEligible && !performance.aTeamEligible) continue;

                        if (!bestPerformance || performance.score > bestPerformance.score) {
                            bestPerformance = performance;
                        }
                    }
                }
                if (bestPerformance) {
                    candidates.push(bestPerformance);
                }
            }
        }
        return candidates.sort((a, b) => b.score - a.score);
    };

    // Helper to add an athlete to a team and mark them as assigned
    const addAthleteToTeam = (team, athlete) => {
        team.push({
            name: athlete.name,
            score: athlete.score,
            representingCategory: athlete.representingCategory
        });
        assignedAthletes.add(athlete.name);
    };

    // --- Team Selection Logic ---

    // A-Team Selection: 4 members total.
    // Phase 1: Try to get one from each primary category (up to 4 members)
    // with `aTeamEligible` criteria
    for (const categoryKey of primaryCategories) {
        if (aTeam.length >= 4) break; // A-Team is full

        const eligibleUnassignedCandidates = getCandidates(categoryKey, true, true); // Category-specific, unassigned, eligible

        if (eligibleUnassignedCandidates.length > 0) {
            addAthleteToTeam(aTeam, eligibleUnassignedCandidates[0]);
        }
    }

    // Phase 2: If A-Team isn't full, fill remaining slots with the highest eligible unassigned athletes overall.
    // For these, we pick the highest score regardless of category, but ensure they are eligible.
    let overallEligibleUnassigned = getCandidates(null, true, true); // Overall best, unassigned, eligible

    for (let i = 0; aTeam.length < 4 && i < overallEligibleUnassigned.length; i++) {
        const athlete = overallEligibleUnassigned[i];
        addAthleteToTeam(aTeam, athlete);
    }


    // B-Team Selection: 6 members total.
    // Phase 1: Try to get one from each primary category (up to 4 members)
    for (const categoryKey of primaryCategories) {
        if (bTeam.length >= 4) break; // Filled target category slots for B-Team

        const unassignedCandidates = getCandidates(categoryKey, true, false); // Category-specific, unassigned (eligibility not required for B/C)

        if (unassignedCandidates.length > 0) {
            addAthleteToTeam(bTeam, unassignedCandidates[0]);
        }
    }

    // Phase 2: Fill remaining B-Team slots (up to 6 total) with the highest overall unassigned athletes.
    let overallUnassignedForB = getCandidates(null, true, false); // Overall best, unassigned (eligibility not required for B/C)

    for (let i = 0; bTeam.length < 6 && i < overallUnassignedForB.length; i++) {
        const athlete = overallUnassignedForB[i];
        addAthleteToTeam(bTeam, athlete);
    }


    // C-Team Selection: 6 members total.
    // Phase 1: Try to get one from each primary category (up to 4 members)
    for (const categoryKey of primaryCategories) {
        if (cTeam.length >= 4) break; // Filled target category slots for C-Team

        const unassignedCandidates = getCandidates(categoryKey, true, false); // Category-specific, unassigned

        if (unassignedCandidates.length > 0) {
            addAthleteToTeam(cTeam, unassignedCandidates[0]);
        }
    }

    // Phase 2: Fill remaining C-Team slots (up to 6 total) with the highest overall unassigned athletes.
    let overallUnassignedForC = getCandidates(null, true, false); // Overall best, unassigned

    for (let i = 0; cTeam.length < 6 && i < overallUnassignedForC.length; i++) {
        const athlete = overallUnassignedForC[i];
        addAthleteToTeam(cTeam, athlete);
    }

    return {
        aTeam,
        bTeam,
        cTeam
    };
}