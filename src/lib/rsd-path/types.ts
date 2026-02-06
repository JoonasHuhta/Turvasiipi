export type RSDLevel = 1 | 2 | 3 | 4 | 5;
export type UserState = 'overloaded' | 'questioning' | 'regulating' | 'reflecting' | 'integrating';
export type EscalationState = 'vakaa' | 'kuormittunut' | 'ylikuormittunut' | 'kriittinen';

export interface RSDScenario {
    description: string;
    automaticThought: string;
    alternatives: string[];
}

export interface BodyRegulationOption {
    id: string;
    icon: string;
    label: string;
    action: 'hapticTimer' | 'shakeAnimation' | 'groundingList';
    duration?: number;
    hapticPattern?: number[];
    instructions?: string[];
    prompt?: string;
    minItems?: number;
}

export interface VulnerabilityChecklistItem {
    id: string;
    label: string;
    weight: number;
}

export interface LensSliderConfig {
    title: string;
    min: number;
    max: number;
    defaultValue: number;
    labels: {
        left: string;
        right: string;
    };
    revealAtThreshold: number;
    revealContent: {
        title: string;
        items: string[];
    };
}

export interface PredictionTrackerConfig {
    title: string;
    predictionTypes: string[];
    confidenceSlider: {
        label: string;
        min: number;
        max: number;
    };
    followUpOptions: Array<{
        label: string;
        hours: number;
    }>;
    outcomePrompt: string;
    outcomeOptions: string[];
}

export interface StrengthOption {
    id: string;
    label: string;
    cardTemplate: string;
}

export interface RSDModuleConfig {
    level: RSDLevel;
    id: string;
    title: string;
    subtitle: string;
    teaching: {
        main: string;
        keyPoint: string;
        reassurance: string;
    };
    scenario: RSDScenario;
    powerStatement: string;
    reflectionPrompt: string;
    entryConditions: string[];
    exitConditions: string[];
    fallbackTo?: RSDLevel;
    fallbackTrigger?: string;
    estimatedDuration: string;
    requiredRegulation?: boolean;

    // Level-specific features
    vulnerabilityWidget?: {
        title: string;
        checklist: VulnerabilityChecklistItem[];
        feedback: {
            low: string;
            medium: string;
            high: string;
        };
    };
    lensSlider?: LensSliderConfig;
    bodyRegulation?: {
        title: string;
        options: BodyRegulationOption[];
    };
    predictionTracker?: PredictionTrackerConfig;
    strengthGenerator?: {
        title: string;
        strengthOptions: StrengthOption[];
        customOption: {
            enabled: boolean;
            prompt: string;
        };
        cardOutput: {
            private: boolean;
            shareable: boolean;
            exportFormats: string[];
        };
    };
}

export interface ProgressData {
    currentLevel: RSDLevel | null;
    completedLevels: RSDLevel[];
    intensityHistory: IntensityRecord[];
    powerStatements: string[];
    lastAccessedLevelData: Record<RSDLevel, number>; // timestamp
    predictions: Prediction[];
    strengthCards: StrengthCard[];
}

export interface IntensityRecord {
    timestamp: number;
    level: RSDLevel;
    before: number;
    after: number;
    drop: number;
    scenario: string;
}

export interface Prediction {
    id: string;
    timestamp: number;
    fear: string;
    confidence: number;
    followUpHours: number;
    followUpTimestamp: number;
    outcome: 'not_realized' | 'partial' | 'realized' | null;
    outcomeTimestamp?: number;
}

export interface StrengthCard {
    id: string;
    timestamp: number;
    strengthId: string;
    customText?: string;
    cardText: string;
}

export interface WeeklyStats {
    completedSessions: number;
    averageIntensityDrop: number;
    fearRealizationRate: number; // 0-1
    totalPredictions: number;
    realizedPredictions: number;
    mostUsedLevel: RSDLevel | null;
    powerStatementsCollected: number;
}

export interface StateTransition {
    from: UserState;
    recommendLevel: RSDLevel;
    reason: string;
}

export interface FallbackRule {
    from: RSDLevel;
    to: RSDLevel;
    trigger: string;
    message: string;
}
