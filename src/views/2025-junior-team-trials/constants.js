const novaWushuAthleteNames = [
    "Chloe Nguyen",
    "Alexander Lieu",
    "Ryan Tran",
    "Joshua Le",
    "Elizabeth Le",
    "Aivy Stone",
    "Joshua Dai",
    "Benjamin Le",
    "Daniel Sinor"
]

export const NOVA_WUSHU_ATHLETES = [
    ...novaWushuAthleteNames,
    ...novaWushuAthleteNames.map(name => name.split(' ').reverse().join(' '))
]

