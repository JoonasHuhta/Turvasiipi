export type TrainingLevel = 'easy' | 'medium' | 'hard';

export interface TrainingScenario {
    id: string;
    level: TrainingLevel;
    tacticId?: string; // Links to tactics.ts if applicable
    // Text content is now in translation files (en.json, fi.json) under simulation.scenarios.[id]
    // scenario: string;
    // question: string;
    // hint: string;
    options: {
        id: string;
        isCorrect: boolean;
        // text and feedback are in translation files
    }[];
}

export const trainingScenarios: TrainingScenario[] = [
    // --- EASY ---
    {
        id: 'e1',
        level: 'easy',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'e2',
        level: 'easy',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'e3',
        level: 'easy',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'e4',
        level: 'easy',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'e5',
        level: 'easy',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'e6',
        level: 'easy',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'e7',
        level: 'easy',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'e8',
        level: 'easy',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'e9',
        level: 'easy',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'e10',
        level: 'easy',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },

    // --- MEDIUM ---
    {
        id: 'm1',
        level: 'medium',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'm2',
        level: 'medium',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'm3',
        level: 'medium',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'm4',
        level: 'medium',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'm5',
        level: 'medium',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'm6',
        level: 'medium',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'm7',
        level: 'medium',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'm8',
        level: 'medium',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'm9',
        level: 'medium',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'm10',
        level: 'medium',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },

    // --- HARD ---
    {
        id: 'h1',
        level: 'hard',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'h2',
        level: 'hard',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'h3',
        level: 'hard',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'h4',
        level: 'hard',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'h5',
        level: 'hard',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'h6',
        level: 'hard',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'h7',
        level: 'hard',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'h8',
        level: 'hard',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'h9',
        level: 'hard',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    },
    {
        id: 'h10',
        level: 'hard',
        options: [
            { id: 'a', isCorrect: true },
            { id: 'b', isCorrect: false },
            { id: 'c', isCorrect: false },
            { id: 'd', isCorrect: false }
        ]
    }
];
