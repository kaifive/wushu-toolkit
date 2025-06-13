export function determineAdultWushuTeam(genderedAthleteDataByCategory) {
    const aTeam = [];
    const bTeam = [];
    const cTeam = [];
    const assignedAthletes = new Set(); // Stores athlete names already assigned to any team

    // Define the specific categories that provide initial slots for A, B, and C teams
    const primaryCategories = ["CQ_DS_GS", "CQ_JS_QS", "NQ_ND_NG", "TQ_TJ"];

    // Step 1: Consolidate all unique athletes with their overall best score, eligibility, and all categories they are in.
    // This consolidated view helps for overall sorting for "next X highest scores" phases.
    const consolidatedAthletes = {}; // athleteName -> {name, score, aTeamEligible, allCategories: Set}
    for (const categoryKey in genderedAthleteDataByCategory) {
        if (!primaryCategories.includes(categoryKey)) {
            // Optionally handle other categories not explicitly listed in primaryCategories,
            // or just ignore them for the purpose of team selection based on these rules.
            // For this problem, we only care about the athletes in the specified primaryCategories.
            continue;
        }
        const categoryAthletes = genderedAthleteDataByCategory[categoryKey];
        for (const athleteName in categoryAthletes) {
            const data = categoryAthletes[athleteName];
            const currentScore = parseFloat(data.calculations.averageFinalScore);
            const currentEligible = data.calculations.aTeamEligible;

            if (currentScore <= 0) {
                continue; // Skip this athlete if their score is 0 or less
            }

            if (!consolidatedAthletes[athleteName]) {
                consolidatedAthletes[athleteName] = {
                    name: athleteName,
                    score: currentScore,
                    aTeamEligible: currentEligible,
                    allCategories: new Set(), // To keep track of all categories the athlete is part of
                    // Store the first category they were found in, as a fallback for 'representingCategory'
                    // if they are selected as an 'overall highest' athlete.
                    firstCategory: categoryKey
                };
            }
            // Add the current category to the athlete's list of categories
            consolidatedAthletes[athleteName].allCategories.add(categoryKey);

            // Assuming `averageFinalScore` and `aTeamEligible` are athlete-global and consistent.
            // If an athlete *could* have different scores/eligibility per category, more complex logic is needed here
            // to store the best score/eligibility across all categories or per category.
        }
    }

    // Helper function to get an athlete's comprehensive info (name, score, eligibility, all categories)
    // Converts the `allCategories` Set to an Array for the output.
    const getAthleteComprehensiveInfo = (name) => {
        const info = consolidatedAthletes[name];
        if (!info) return null;
        return {
            name: info.name,
            score: info.score,
            aTeamEligible: info.aTeamEligible,
            allCategories: Array.from(info.allCategories),
            firstCategory: info.firstCategory // For fallback representingCategory
        };
    };

    // Helper to add an athlete to a team and mark them as assigned
    const addAthleteToTeam = (team, athlete, representingCategory) => {
        team.push({
            name: athlete.name,
            score: athlete.score,
            representingCategory: representingCategory
        });
        assignedAthletes.add(athlete.name);
    };

    // --- Team Selection Logic ---

    // A-Team Selection: 4 members total. Highest score, aTeamEligible, 1 from each primary category first.
    // If fewer than 4 are chosen via categories, fill remaining slots from overall eligible unassigned.
    for (const categoryKey of primaryCategories) {
        if (aTeam.length >= 4) break; // A-Team is full

        // Get eligible unassigned athletes specific to this category, sorted by score
        const categoryAthletesInInput = genderedAthleteDataByCategory[categoryKey] || {};
        const eligibleUnassignedCandidates = Object.values(categoryAthletesInInput)
            .map(athlete => getAthleteComprehensiveInfo(athlete.competitor.name)) // Get comprehensive info
            .filter(athlete => athlete && athlete.aTeamEligible && !assignedAthletes.has(athlete.name))
            .sort((a, b) => b.score - a.score);

        if (eligibleUnassignedCandidates.length > 0) {
            const chosenAthlete = eligibleUnassignedCandidates[0];
            addAthleteToTeam(aTeam, chosenAthlete, categoryKey);
        }
    }

    // If A-Team isn't full, fill remaining slots with the highest eligible unassigned athletes overall
    let overallEligibleUnassigned = Object.values(consolidatedAthletes)
        .filter(athlete => athlete.aTeamEligible && !assignedAthletes.has(athlete.name))
        .sort((a, b) => b.score - a.score);

    for (let i = 0; aTeam.length < 4 && i < overallEligibleUnassigned.length; i++) {
        const athlete = overallEligibleUnassigned[i];
        // For these 'wildcard' slots, the representingCategory can be their 'firstCategory' or 'Overall'
        addAthleteToTeam(aTeam, athlete, athlete.firstCategory);
    }


    // B-Team Selection: 6 members total. Next 4 from categories, then next 2 highest overall.
    // Phase 1: Try to get one from each primary category (up to 4 members)
    for (const categoryKey of primaryCategories) {
        if (bTeam.length >= 4) break; // Filled target category slots for B-Team

        const categoryAthletesInInput = genderedAthleteDataByCategory[categoryKey] || {};
        const unassignedCandidates = Object.values(categoryAthletesInInput)
            .map(athlete => getAthleteComprehensiveInfo(athlete.competitor.name))
            .filter(athlete => athlete && !assignedAthletes.has(athlete.name))
            .sort((a, b) => b.score - a.score);

        if (unassignedCandidates.length > 0) {
            const chosenAthlete = unassignedCandidates[0];
            addAthleteToTeam(bTeam, chosenAthlete, categoryKey);
        }
    }

    // Phase 2: Fill remaining B-Team slots (up to 6 total) with the highest overall unassigned athletes
    let overallUnassignedForB = Object.values(consolidatedAthletes)
        .filter(athlete => !assignedAthletes.has(athlete.name))
        .sort((a, b) => b.score - a.score);

    for (let i = 0; bTeam.length < 6 && i < overallUnassignedForB.length; i++) {
        const athlete = overallUnassignedForB[i];
        // For these 'wildcard' slots, use their first category as representing
        addAthleteToTeam(bTeam, athlete, athlete.firstCategory);
    }


    // C-Team Selection: 6 members total. Same logic as B-Team.
    // Phase 1: Try to get one from each primary category (up to 4 members)
    for (const categoryKey of primaryCategories) {
        if (cTeam.length >= 4) break; // Filled target category slots for C-Team

        const categoryAthletesInInput = genderedAthleteDataByCategory[categoryKey] || {};
        const unassignedCandidates = Object.values(categoryAthletesInInput)
            .map(athlete => getAthleteComprehensiveInfo(athlete.competitor.name))
            .filter(athlete => athlete && !assignedAthletes.has(athlete.name))
            .sort((a, b) => b.score - a.score);

        if (unassignedCandidates.length > 0) {
            const chosenAthlete = unassignedCandidates[0];
            addAthleteToTeam(cTeam, chosenAthlete, categoryKey);
        }
    }

    // Phase 2: Fill remaining C-Team slots (up to 6 total) with the highest overall unassigned athletes
    let overallUnassignedForC = Object.values(consolidatedAthletes)
        .filter(athlete => !assignedAthletes.has(athlete.name))
        .sort((a, b) => b.score - a.score);

    for (let i = 0; cTeam.length < 6 && i < overallUnassignedForC.length; i++) {
        const athlete = overallUnassignedForC[i];
        addAthleteToTeam(cTeam, athlete, athlete.firstCategory);
    }

    return {
        aTeam,
        bTeam,
        cTeam
    };
}