export interface PollQuestion {
    id: number;
    question: string;
    yesPercentage: number; // Simulated base percentage for "Yes" to validate user
}

export const weeklyPolls: PollQuestion[] = [
    {
        id: 1,
        question: "Oletko nukkunut huonosti viimeisen viikon aikana työasioiden takia?",
        yesPercentage: 82
    },
    {
        id: 2,
        question: "Tuntuuko sinusta, että kollegasi välttelevät sinua?",
        yesPercentage: 65
    },
    {
        id: 3,
        question: "Oletko harkinnut työpaikan vaihtoa kiusaamisen takia?",
        yesPercentage: 91
    },
    {
        id: 4,
        question: "Koetko fyysisiä oireita (päänsärkyä, vatsakipua) työpäivisin?",
        yesPercentage: 74
    },
    {
        id: 5,
        question: "Onko sinulla vaikeuksia rentoutua vapaa-ajalla?",
        yesPercentage: 88
    },
    {
        id: 6,
        question: "Pelkäätkö aamulla töihin lähtöä?",
        yesPercentage: 60
    },
    {
        id: 7,
        question: "Oletko puhunut tilanteestasi jollekulle?",
        yesPercentage: 55 // Encourages talking if NO, Validates if YES
    }
];

export const getDailyPoll = (): PollQuestion => {
    // Rotates based on day of week (0-6)
    const day = new Date().getDay();
    // Mapped to ensure index exists
    return weeklyPolls[day % weeklyPolls.length];
};
