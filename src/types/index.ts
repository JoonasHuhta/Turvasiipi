export type Emotion = "neutral" | "sad" | "anxious" | "angry" | "fearful";

export type TimelineEvent = {
    id: string;
    timestamp: string; // ISO string
    date: string; // Formatting helper
    description?: string; // Legacy field, kept for backward compatibility
    objectiveDescription: string; // "Mitä tapahtui?" (Fakta)
    subjectiveEffect: string; // "Miltä se tuntui / vaikutus työkykyyn?"
    evidence?: string; // "Onko todisteita?" (esim. "Screenshot", "Sähköposti")
    peopleInvolved: string;
    emotion: Emotion;
    // Metadata for Sääkartta (Weather Map)
    city?: string;
    industry?: string;
    bullyingTypes?: string[];
    severity?: number; // 1-10
};
