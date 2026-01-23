export type QuizCategory = 'itsetunto' | 'todellisuus' | 'eristyksissä' | 'fyysiset' | 'käyttäytyminen' | 'identiteetti' | 'pelko';

export type Question = {
    id: number;
    category: QuizCategory;
    positive?: boolean;
};

export type LikertAnswer = 1 | 2 | 3 | 4 | 5;

export const likertOptions = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 }
] as const;

export const quizQuestions: Question[] = [
    // BLOKKI A: Itsetunnon mureneminen
    { id: 1, category: 'itsetunto' },
    { id: 2, category: 'itsetunto' },
    { id: 3, category: 'itsetunto' },
    { id: 4, category: 'itsetunto' },
    { id: 5, category: 'itsetunto' },

    // BLOKKI B: Todellisuuden vääristyminen
    { id: 6, category: 'todellisuus' },
    { id: 7, category: 'todellisuus' },
    { id: 8, category: 'todellisuus' },
    { id: 9, category: 'todellisuus' },
    { id: 10, category: 'todellisuus' },

    // BLOKKI C: Eristyneisyys
    { id: 11, category: 'eristyksissä' },
    { id: 12, category: 'eristyksissä' },
    { id: 13, category: 'eristyksissä' },
    { id: 14, category: 'eristyksissä' },
    { id: 15, category: 'eristyksissä' },

    // BLOKKI D: Fyysiset oireet
    { id: 16, category: 'fyysiset' },
    { id: 17, category: 'fyysiset' },
    { id: 18, category: 'fyysiset' },
    { id: 19, category: 'fyysiset' },
    { id: 20, category: 'fyysiset' },

    // BLOKKI E: Käyttäytyminen
    { id: 21, category: 'käyttäytyminen' },
    { id: 22, category: 'käyttäytyminen' },
    { id: 23, category: 'käyttäytyminen' },
    { id: 24, category: 'käyttäytyminen' },
    { id: 25, category: 'käyttäytyminen' },

    // UUDET POSITIIVISET KYSYMYKSET
    { id: 31, category: 'itsetunto', positive: true },
    { id: 32, category: 'itsetunto', positive: true },
    { id: 33, category: 'todellisuus', positive: true },
    { id: 34, category: 'todellisuus', positive: true },
    { id: 35, category: 'eristyksissä', positive: true },
    { id: 36, category: 'eristyksissä', positive: true },
    { id: 37, category: 'fyysiset', positive: true },
    { id: 38, category: 'fyysiset', positive: true },
    { id: 39, category: 'käyttäytyminen', positive: true },
    { id: 40, category: 'identiteetti', positive: true },
];

export const calculateScore = (answers: Record<number, LikertAnswer>) => {
    let totalScore = 0;

    quizQuestions.forEach(question => {
        const answer = answers[question.id];
        if (!answer) return;

        if (question.positive) {
            totalScore += (6 - answer);
        } else {
            totalScore += answer;
        }
    });

    return totalScore;
};

export const getRiskLevel = (score: number) => {
    const maxScore = quizQuestions.length * 5;
    const percentage = (score / maxScore) * 100;

    if (percentage < 25) return {
        key: 'green',
        color: "text-green-600",
        percentage
    };

    if (percentage < 50) return {
        key: 'yellow',
        color: "text-yellow-600",
        percentage
    };

    if (percentage < 70) return {
        key: 'orange',
        color: "text-orange-600",
        percentage
    };

    return {
        key: 'red',
        color: "text-red-600",
        percentage
    };
};
