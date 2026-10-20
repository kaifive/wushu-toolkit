export function getAthletesByGender(athleteData, gender) {
    const genderAthleteArray = Object.entries(athleteData).filter(([athleteName, info]) => {
        return info.gender === gender;
    });

    const genderAthleteObject = Object.fromEntries(genderAthleteArray);

    return genderAthleteObject;
}

export function divideAthletesByGroup(athleteData) {
    const aGroup = {};
    const bGroup = {};
    const cGroup = {};

    Object.entries(athleteData).forEach(([athleteName, info]) => {
        switch (info.ageGroup) {
            case "A":
                aGroup[athleteName] = info;
                break;
            case "B":
                bGroup[athleteName] = info;
                break;
            case "C":
                cGroup[athleteName] = info;
                break;
            default:
                break;
        }
    });
    
    return { aGroup, bGroup, cGroup };
}