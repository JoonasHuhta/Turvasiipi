export type CategoryId = 'CORE' | 'AWARENESS' | 'TOOLS' | 'SUPPORT' | 'INTERACTIVE' | 'ORGANIZATION' | 'LEARNING' | 'SPECIAL';

export interface Module {
    id: string;
    categoryId: CategoryId;
    title: string;
    points: number;
    path: string;
}

export interface Badge {
    id: string;
    title: string;
    icon: string;
    description: string;
    moduleId?: string; // If linked to a specific module
    isMastery?: boolean;
}

export interface UserProgress {
    completedModuleIds: string[];
    earnedBadgeIds: string[];
    points: number;
    simulationScores: Record<string, number>; // moduleId -> score (0-100)
    streak: number;
    lastVisit: string | null;
}

// --- TACTICS ---
export type TacticCategory = 'verbal' | 'social' | 'passive' | 'power' | 'manipulative' | 'structural';

export type RoleAdvice = {
    title: string;
    description: string;
    actions: string[];
};

export type Tactic = {
    id: string;
    category: TacticCategory;
    name: string;
    definition: string;
    phrases: string[];
    goal: string;
    strategy: string[];
    logExample: string;
    impact: {
        stress: number;
        burnout: number;
        selfEsteem: number;
    };
    neuroImpact?: {
        overload?: number;
        confusion?: number;
    };
    advice: {
        victim: RoleAdvice;
        witness: RoleAdvice;
        manager: RoleAdvice;
    };
};

// --- QUIZ (Risk Assessment) ---
export type QuizCategory = 'itsetunto' | 'todellisuus' | 'eristyksissä' | 'fyysiset' | 'käyttäytyminen' | 'identiteetti' | 'pelko';

export type Question = {
    id: number;
    category: QuizCategory;
    positive?: boolean;
};

export type LikertAnswer = 1 | 2 | 3 | 4 | 5;

// --- TIETOVISA (Knowledge Quiz) ---
export type QuizQuestion = {
    id: number;
    text: string;
    options: { label: string; value: string }[];
    correctAnswer: string; // The value of the correct option (e.g., 'B')
    explanation: string;
};

export type QuizPart = {
    id: number;
    title: string;
    questions: QuizQuestion[];
};

// --- I18N ---
export type Language = 'fi' | 'en';

