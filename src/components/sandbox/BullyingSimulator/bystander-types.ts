/**
 * Bystander Simulator Types
 * 5-part training system: Tunnista → Säädä → Valitse → Sano → Suojaa
 * Based on Hollaback's 5D model (Distract, Delegate, Document, Delay, Direct)
 */

import type { Emotion } from './types';

// ─── Phase types ────────────────────────────────────────────────────────────

export type BystanderPhase =
    | 'intro'
    | 'recognition'   // Osa 1: Tunnista
    | 'arousal'       // Osa 2: Säädä
    | 'intervention'  // Osa 3: Valitse (5D)
    | 'words'         // Osa 4: Sano
    | 'safety'        // Osa 5: Suojaa
    | 'card';         // Henkilökohtainen kortti

export type InterventionType5D = 'distract' | 'delegate' | 'document' | 'delay' | 'direct';

export type ArousalState = 'heart_racing' | 'tense' | 'frozen' | 'numb' | 'calm';

export type RiskLevel = 1 | 2 | 3; // 1=matala, 2=kohtalainen, 3=korkea

// ─── Scene Description ──────────────────────────────────────────────────────

export interface BystanderCharacter {
    id: string;
    name: string;
    role: string;
    color: string;
}

export interface SceneReply {
    characterId: string;
    text: string;
    /** Brief non-verbal cue for bystanders ("katsoo puhelintaan") */
    action?: string;
    style: 'normal' | 'aggressive' | 'whisper' | 'thought' | 'laugh';
}

export interface BystanderScene {
    id: string;
    /** Background CSS or gradient */
    background: string;
    /** Key actor committing the act */
    perpetratorId: string;
    /** Person being targeted */
    victimId: string;
    /** Other bystanders present */
    bystanderIds: string[];
    /** What the others are doing—makes bystander effect visible */
    bystanderReactions: Array<{
        characterId: string;
        behavior: 'laughs_awkwardly' | 'looks_at_phone' | 'avoids_eye_contact' | 'looks_uncomfortable';
        label: string; // shown as caption like "Jarkko hymähtää"
    }>;
    /** Dialogue played out before user must act */
    dialogue: SceneReply[];
    /** Seconds the user has to act; 0 = no limit */
    timeWindowSeconds: number;
    /** What happens if user does nothing */
    silenceOutcome: {
        text: string;
        learningPoint: string;
    };
}

// ─── Osa 1: Recognition ─────────────────────────────────────────────────────

export interface RecognitionOption {
    id: string;
    label: string;
    isCorrect: boolean;
    explanation: string;
}

export interface RecognitionPhaseData {
    question: string;
    options: RecognitionOption[];
    certaintyQuestion: string; // "Kuinka varma olet?"
    feedback: {
        correct: string;
        partial: string;
        normalize: string; // "On ok ettet ole 100% varma..."
    };
    educationalNote: string; // names the pattern being shown
}

// ─── Osa 2: Arousal regulation ──────────────────────────────────────────────

export interface GroundingExercise {
    type: 'breathing' | '5senses';
    promptText: string;
    durationSeconds: number;
    afterwardQuestion: string; // "Tuntuuko nyt helpommalta?"
}

export interface ArousalPhaseData {
    question: string;
    options: Array<{ id: ArousalState; label: string; icon: string; description: string }>;
    groundingExercise: GroundingExercise;
    polyvagalNote: string; // connects to science
}

// ─── Osa 3: Intervention (5D) ────────────────────────────────────────────────

export interface PhraseExample {
    text: string;
    context?: string;
}

export interface Intervention5D {
    type: InterventionType5D;
    label: string;             // "Häiritse"
    icon: string;
    riskLevel: RiskLevel;
    riskLabel: string;         // "Matala" etc.
    tagline: string;           // Brief description
    whenBestUsed: string;
    whenRiskHigh: string;
    examples: PhraseExample[];
    /** After user selects a specific phrase/action */
    feedback: string;
    skillTag: string;
    /** Optional: emotion changes on characters */
    emotionChanges?: Record<string, Emotion>;
}

export interface InterventionPhaseData {
    prompt: string;
    interventions: Intervention5D[];
    /** Reminder that no choice is also valid data */
    noChoiceText: string;
}

// ─── Osa 4: Word practice ────────────────────────────────────────────────────

export interface ReadyMadePhrase {
    text: string;
    tone: 'gentle' | 'assertive' | 'neutral';
    dModel: InterventionType5D;
    /** What happens in the scene after you say this */
    sceneReaction: {
        perpetratorReaction: string;
        victimReaction: string;
        bystanderReaction?: string;
    };
    analysis: string;
}

export interface EditableTemplate {
    template: string; // Use [___] for editable slots
    slots: Array<{ placeholder: string; suggestion: string; hint: string }>;
}

export interface PhraseAnalysisResult {
    strengths: string[];
    suggestions: string[];
    iMeFirstCheck: boolean; // "mä"/"mun mielestä" strengthens ownership
}

export interface WordPracticePhaseData {
    context: string; // reminder of scenario
    readyMadePhrases: ReadyMadePhrase[];
    editableTemplate: EditableTemplate;
    openTextLabel: string;
    openTextHint: string;
    phrasePrompt: string;
    savedPhraseLabel: string; // "Tallenna tämä turvalauseeksesi"
}

// ─── Osa 5: Safety plan ──────────────────────────────────────────────────────

export interface CostScenario {
    description: string; // "Viikon kuluttua huomaat..."
    options: Array<{ id: string; label: string; isCost: boolean }>;
    note: string;
}

export interface ProtectionAction {
    id: string;
    label: string;
    category: 'self' | 'victim' | 'systemic';
    description: string;
}

export interface SafetyPhaseData {
    intro: string;
    costScenario: CostScenario;
    protectionActions: ProtectionAction[];
    upstanderNote: string; // "85% jäi sivustakatsojiksi..."
}

// ─── Full Bystander Scenario ──────────────────────────────────────────────────

export interface BystanderScenario {
    id: string;
    title: string;
    context: string;
    powerDynamic: string;   // "Esimies → alainen"
    difficulty: 1 | 2 | 3 | 4 | 5;
    difficultyLabel: string;
    durationMinutes: number;
    learningGoal: string;
    characters: BystanderCharacter[];
    scene: BystanderScene;
    recognition: RecognitionPhaseData;
    arousal: ArousalPhaseData;
    intervention: InterventionPhaseData;
    wordPractice: WordPracticePhaseData;
    safetyPlan: SafetyPhaseData;
}

// ─── Engine State ─────────────────────────────────────────────────────────────

export interface BystanderCard {
    chosenD: InterventionType5D;
    savedPhrase: string;
    selfProtection: string[];
    victimSupport: string[];
    scenarioId: string;
    completedAt: string; // ISO string
}

export interface BystanderEngineState {
    phase: BystanderPhase;
    // Phase 1 results
    recognitionAnswer?: string;
    certaintyScore?: number; // 0–100
    // Phase 2 results
    arousalState?: ArousalState;
    groundingCompleted: boolean;
    // Phase 3 results
    chosen5D?: InterventionType5D;
    timedOut: boolean;
    // Phase 4 results
    chosenPhrase?: string;
    savedPhrase?: string;
    // Phase 5 results
    selectedProtections: string[];
    // Final card
    card?: BystanderCard;
}

// ─── Confidence bar (localStorage) ────────────────────────────────────────────

export interface BystanderProgress {
    sessionsCompleted: number;
    scenariosAttempted: string[];
    highestDifficulty: number;
    confidenceScore: number; // 0–100
    savedPhrases: string[];
    savedCards: BystanderCard[];
}

export type ConfidenceLevel = 'Tarkkailija' | 'Herätteillä' | 'Valmis puuttumaan' | 'Upstander';

export function getConfidenceLevel(score: number): ConfidenceLevel {
    if (score < 25) return 'Tarkkailija';
    if (score < 50) return 'Herätteillä';
    if (score < 75) return 'Valmis puuttumaan';
    return 'Upstander';
}
