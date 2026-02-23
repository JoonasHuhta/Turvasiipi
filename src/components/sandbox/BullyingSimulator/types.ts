/**
 * TypeScript type definitions for the Workplace Bullying Simulator
 * Isolated sandbox - does not interact with main application
 */

export type Emotion = 'neutral' | 'sad' | 'angry' | 'fearful' | 'happy' | 'smug';
export type Position = 'standing' | 'sitting' | 'leaning';
export type Perspective = 'target' | 'bystander' | 'supervisor';

export interface Character {
    id: string;
    name: string;
    role: string; // "Uusi työntekijä", "Kollega", "Esihenkilö"
    color: string; // Hex color for visual distinction
}

export interface CharacterState {
    characterId: string;
    position: Position;
    emotion: Emotion;
    x: number; // Position on screen (0-100%)
    y: number; // Position on screen (0-100%)
}

export interface DialogueLine {
    characterId: string;
    text: string;
    style?: 'normal' | 'aggressive' | 'whisper'; // Affects bubble shape
}

export interface DecisionOption {
    id: string;
    text: string;
    response: FeedbackResponse;
}

export interface FeedbackResponse {
    immediate: string; // "Valitsit: X"
    consequences: string; // What happened next
    analysis: {
        whatWorked: string;
        risks: string;
        improvement: string;
    };
    educational: {
        concept: string; // Is this bullying/conflict?
        legalContext: string; // Law and guidelines in plain language
        nextSteps: string[]; // Concrete actions
    };
    learningPoint: string; // One new thing learned
}

export interface Decision {
    prompt: string; // "Mitä teet?"
    perspective: Perspective;
    options: DecisionOption[];
}

export interface Scene {
    id: string;
    background: string; // CSS color or gradient
    backgroundType: 'office' | 'breakroom' | 'meeting' | 'generic';
    characters: CharacterState[];
    dialogue: DialogueLine[];
    narration?: string; // Explanatory text
    decision?: Decision; // Optional decision point
    pauseForReflection?: boolean; // Show "Jatka" button
}

export interface Scenario {
    id: string;
    title: string;
    context: string; // Work environment description
    characters: Character[];
    scenes: Scene[];
    learningGoal: string; // What will be learned?
}

export interface SimulatorState {
    currentScenario: Scenario | null;
    currentSceneIndex: number;
    isShowingFeedback: boolean;
    currentFeedback: FeedbackResponse | null;
    userChoices: Array<{
        sceneId: string;
        optionId: string;
        timestamp: Date;
    }>;
    completedScenarios: string[];
    learningPoints: string[];
}
