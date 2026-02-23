/**
 * Dialogue Tree System Types
 * Based on point-and-click adventure game dialogue systems
 */

import type { Character, Emotion, Position } from './types';

/**
 * Visual state - represents the static scene background and characters
 * This stays the same throughout a dialogue sequence
 */
export interface VisualState {
    background: string;
    backgroundType?: 'office' | 'meeting' | 'break-room' | 'hallway';
    characters: CharacterState[];
}

export interface CharacterState {
    characterId: string;
    position: Position;
    emotion: Emotion;
    x: number; // percentage
    y: number; // percentage
}

/**
 * Dialogue line - a single line of dialogue from a character
 * Displayed progressively in the dialogue panel (chat-style)
 */
export interface DialogueLine {
    characterId: string;
    text: string;
    style: 'normal' | 'aggressive' | 'whisper' | 'thought';
    delay?: number; // ms delay before showing (for pacing)
}

/**
 * Feedback shown after a choice
 */
export interface Feedback {
    immediate: string; // First reaction ("You spoke up!")
    analysis: string; // Deeper explanation
    learningPoint: string; // Key takeaway

    // NEW: Transferable skill - how to use this in real life
    transferableSkill?: {
        template: string; // "[Opening] + [Core message]"
        realWorldExamples: string[]; // Concrete examples
        whenNotToUse?: string; // Warning about context
    };

    // NEW: Skill tag linked to this specific feedback (overrides choice skillTag)
    skillTag?: string;

    // NEW: Emotion change triggered by this feedback
    emotionChange?: Record<string, Emotion>; // characterId -> emotion
}

/**
 * A choice the player can make
 */
export interface Choice {
    id: string;
    text: string; // Display text (e.g., "A) Say something")
    feedback?: Feedback; // Optional because sentence builder has its own feedback map
    nextNodeId: string; // Where to go next

    // NEW: Skill tag for tracking what player practiced
    skillTag?: string; // e.g., "fact-reference", "low-threshold-intervention"

    // NEW: Emotion change triggered by this choice
    emotionChange?: Record<string, Emotion>; // characterId -> emotion

    // Optional: Sentence builder (alternative to static choice)
    sentenceBuilder?: {
        openingOptions: string[];
        coreOptions: string[];
        guidanceText?: string;
        // Feedback shown inline after choice (for standard choices)
        // Feedback map based on combination (opening_core -> feedback)
        feedbackMap: Record<string, Feedback>;

        // Which node to go to next
        nextNodeId: string;
    }
}

/**
 * Dialogue Node - a single step in the dialogue tree
 * 
 * Flow:
 * 1. Show visual state (if changed)
 * 2. Show narration (if any)
 * 3. Show dialogue lines progressively
 * 4. Show choices (if any) OR auto-advance to next node
 */
export interface DialogueNode {
    id: string;

    // Visual state (static scene)
    visualState: VisualState;

    // Optional narration/context shown above dialogue
    narration?: string;

    // Dialogue lines shown progressively
    dialogueLines: DialogueLine[];

    // Choices (if any) - if no choices, auto-advance
    choices?: Choice[];

    // Auto-advance to next node (if no choices)
    nextNodeId?: string;

    // Pause for reflection before continuing
    pauseForReflection?: boolean;

    // Is this the end of the scenario?
    isEnd?: boolean;

    // NEW: Documentation feature
    allowDocumentation?: boolean; // Can player record this moment?

    // NEW: Time-out feature (safe exit)
    allowTimeOut?: boolean; // Can player pause for validation?
    timeOutMessage?: string; // Validating message shown on time-out
}

/**
 * Dialogue Tree Scenario
 */
export interface DialogueTreeScenario {
    id: string;
    title: string;
    context: string;
    learningGoal: string;

    // Characters used in this scenario
    characters: Character[];

    // Dialogue tree structure
    startNodeId: string;
    nodes: Record<string, DialogueNode>; // nodeId -> node
}

/**
 * Dialogue Engine State
 */
export interface DialogueEngineState {
    currentNodeId: string;
    dialogueHistory: DialogueLine[]; // All dialogue shown so far
    choices: { nodeId: string; choiceText: string }[]; // Choices made
    learningPoints: string[]; // Collected learning points
    showingFeedback: boolean;
    currentFeedback?: {
        immediate: string;
        analysis: string;
        learningPoint: string;
    };
    lastChoiceText?: string; // For "You chose X" confirmation
    nextNodeId?: string; // For sentence builder: stores next node to transition to

    // NEW: Skill tracking for summary
    skillsUsed: Record<string, number>; // skillTag -> count

    // NEW: Dynamic emotion overrides (characterId -> emotion)
    emotionOverrides?: Record<string, Emotion>; // characterId -> emotion ('sad', 'happy', etc.)

    // NEW: Documentation log
    documentationLog?: Array<{
        timestamp: string; // When documented
        nodeId: string; // Where in scenario
        description: string; // What was recorded
    }>;
}
