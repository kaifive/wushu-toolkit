function determineUSTeam(genderGroupData, group) {
    // 1. Sort all athletes by total score descending
    let pool = Object.values(genderGroupData).sort((a, b) => b.totalScores - a.totalScores);

    // 2. Define capacity: Group A needs 3 per team, Groups B & C need 2 per team
    const spotsPerTeam = (group === 'A' || group === 'Youth') ? 3 : 2;
    const teamLevels = ['A', 'B', 'C'];
    const results = { 'A': [], 'B': [], 'C': [] };

    // 3. Process each team level sequentially
    teamLevels.forEach(level => {
        const currentTeam = [];
        const usedDisciplines = new Set();

        // Find athletes for this specific team level
        for (let i = 0; i < pool.length; i++) {
            if (currentTeam.length >= spotsPerTeam) break;

            const athlete = pool[i];
            const discipline = athlete.topDiscipline;

            if (!usedDisciplines.has(discipline)) {
                currentTeam.push(athlete);
                usedDisciplines.add(discipline);

                // Remove this athlete from the pool so they aren't picked for the next team level
                pool.splice(i, 1);
                i--; // Adjust index because we removed an item
            }
        }
        results[level] = currentTeam;
    });

    return results;
}

export { determineUSTeam }