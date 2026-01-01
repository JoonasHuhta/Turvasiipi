export type Emotion = "neutral" | "sad" | "anxious" | "angry" | "fearful";

export type TimelineEvent = {
    id: string;
    timestamp: string; // ISO string
    date: string; // Formatting helper
    description: string;
    peopleInvolved: string;
    emotion: Emotion;
    // Metadata for Sääkartta (Weather Map)
    city?: string;
    industry?: string;
    bullyingTypes?: string[];
    severity?: number; // 1-10
};
