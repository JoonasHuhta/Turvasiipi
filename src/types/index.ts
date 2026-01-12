export type Emotion = "neutral" | "sad" | "anxious" | "angry" | "fearful";

export type TimelineEvent = {
    id: string;
    timestamp: string; // ISO string
    date?: string; // Formatting helper (Legacy)
    type: string; // e.g., 'verbal', 'social'
    title: string; // e.g., "Mitätöinti"
    description: string; // Main description
    intensity: number; // 1-5
    peopleInvolved?: string;
    witnesses?: string;
    evidence?: string; // e.g. "Email, SMS"
    emotion: Emotion;
    notes?: string;

    // Legacy / Extended fields
    objectiveDescription?: string;
    subjectiveEffect?: string;
    city?: string;
    industry?: string;
    bullyingTypes?: string[];
    severity?: number;
    consequences?: string;

    // Quick Log fields
    isQuickLog?: boolean;        // Flag for incomplete entries
    quickLogText?: string;        // Original quick text
    completedAt?: string;         // ISO timestamp when user finished it
};
