export function getTeamStatus(athleteName, category, allTeamsData) {
    // Check A Team
    const foundInATeam = allTeamsData.aTeam.find(athlete => athlete.name === athleteName && athlete.representingCategory === category);
    if (foundInATeam) {
        return `A Team`;
    }

    // Check B Team
    const foundInBTeam = allTeamsData.bTeam.find(athlete => athlete.name === athleteName && athlete.representingCategory === category);
    if (foundInBTeam) {
        return `B Team`;
    }

    // Check C Team
    const foundInCTeam = allTeamsData.cTeam.find(athlete => athlete.name === athleteName && athlete.representingCategory === category);
    if (foundInCTeam) {
        return `C Team`;
    }

    // If not found in any team
    return "Not Assigned"; // Or whatever default you prefer
}
