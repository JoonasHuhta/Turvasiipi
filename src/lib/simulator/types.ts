export type Profession = 'nurse' | 'teacher' | 'developer' | 'manager';

export interface GameStats {
    selfEsteem: number; // 0-100
    teamAcceptance: number; // 0-100
    physicalHealth: number; // 0-100
    hope: number; // 0-100
    shame: number; // 0-100
    isolation: number; // 0-100
}

export interface ChoiceEffect {
    stats?: Partial<GameStats>;
    logNote?: string; // The text that gets "automatically documented"
    addAlly?: string; // Name of ally gained
    removeAlly?: string;
    triggerCrisis?: boolean;
    customFeedback?: string; // Immediate feedback text shown after choice
}

export interface Choice {
    id: string;
    text: string;
    nextPhaseId: string | 'END_A' | 'END_B' | 'END_C';
    effect?: ChoiceEffect;
    variant?: 'default' | 'crossed-out';
    blockedReason?: string; // Message shown when clicking a crossed-out choice
}

export interface Phase {
    id: string;
    day: number;
    location?: string; // e.g. "Osasto 4B"
    time?: string; // e.g. "07:00"
    title: string;
    content: string; // The main narrative text
    choices: Choice[];
    backgroundImage?: string; // Optional for visual vibe
    isCrisis?: boolean; // Triggers visual warning style
}

export interface GameState {
    currentPhaseId: string;
    profession: Profession;
    stats: GameStats;
    logEntries: { day: number; note: string; timestamp: string }[];
    allies: string[];
    history: string[]; // Phase IDs
    isGameOver: boolean;
    endingType?: 'A' | 'B' | 'C';
}

export const INITIAL_STATS: GameStats = {
    selfEsteem: 80,
    teamAcceptance: 60,
    physicalHealth: 80,
    hope: 80,
    shame: 0,
    isolation: 0,
};
