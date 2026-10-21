export function sortStandings(data) {
    const sortedStandings = Object.values(data).sort((a, b) => b.finalScore - a.finalScore);

    return sortedStandings;
}