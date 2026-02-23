import React, { useState, useEffect } from 'react';
import type {
    DialogueTreeScenario,
    DialogueNode,
    DialogueLine,
    DialogueEngineState,
} from './dialogue-types';
import { StaticVisualArea } from './StaticVisualArea';
import { DialoguePanel } from './DialoguePanel';
import { ScenarioSummary } from './ScenarioSummary';

interface DialogueTreeEngineProps {
    scenario: DialogueTreeScenario;
    onComplete: () => void;
}

/**
 * Dialogue Tree Engine - manages progression through dialogue nodes
 * Inspired by Phoenix Wright: Ace Attorney and Disco Elysium
 */
export const DialogueTreeEngine: React.FC<DialogueTreeEngineProps> = ({
    scenario,
    onComplete,
}) => {
    const [state, setState] = useState<DialogueEngineState>({
        currentNodeId: scenario.startNodeId,
        dialogueHistory: [],
        learningPoints: [],
        choices: [],
        showingFeedback: false,
        skillsUsed: {}, // Initialize empty
        // NEW: Dynamic emotion overrides (characterId -> emotion)
        emotionOverrides: {},
    });

    const [showSummary, setShowSummary] = useState(false);
    const [displayedLinesCount, setDisplayedLinesCount] = useState(0);

    const currentNode = scenario.nodes[state.currentNodeId];

    // Manual dialogue progression - user clicks to advance each line
    const handleAdvanceDialogue = () => {
        if (displayedLinesCount < currentNode.dialogueLines.length) {
            const nextLine = currentNode.dialogueLines[displayedLinesCount];
            setState((prev) => ({
                ...prev,
                dialogueHistory: [...prev.dialogueHistory, nextLine],
            }));
            setDisplayedLinesCount((prev) => prev + 1);
        }
    };

    // Initialize first line when node changes
    useEffect(() => {
        if (!currentNode || state.showingFeedback) return;

        // Reset and show first line automatically
        if (displayedLinesCount === 0 && currentNode.dialogueLines.length > 0) {
            setState((prev) => ({
                ...prev,
                dialogueHistory: [currentNode.dialogueLines[0]],
            }));
            setDisplayedLinesCount(1);
        }
    }, [currentNode?.id, state.showingFeedback]);

    const handleChoice = (choiceId: string) => {
        // Find the choice - could be standard or sentence builder
        const choice = currentNode.choices?.find((c) => c.id === choiceId || c.id === 'build-phrase');
        if (!choice) return;

        // Get feedback - either direct or from sentenceBuilder feedbackMap
        let feedback;
        let choiceText: string;
        let builtSentence = ''; // For sentence builder, the full sentence

        if (choice.sentenceBuilder) {
            // Sentence builder: choiceId is "opening_core" format
            feedback = choice.sentenceBuilder.feedbackMap[choiceId];
            const parts = choiceId.split('_');
            builtSentence = `${parts[0]}, ${parts[1]}`; // "Anteeksi että keskeytän, Laura teki..."
            choiceText = builtSentence;

            if (!feedback) {
                console.error(`No feedback found for sentence combination: ${choiceId}`);
                return;
            }

            // ADD PLAYER'S SENTENCE TO DIALOGUE HISTORY FIRST
            setState((prev) => ({
                ...prev,
                dialogueHistory: [
                    ...prev.dialogueHistory,
                    {
                        characterId: 'player',
                        text: builtSentence,
                        style: 'normal' as const,
                    },
                ],
            }));

            // THEN show feedback after short delay (so player sees their sentence first)
            setTimeout(() => {
                setState((prev) => ({
                    ...prev,
                    choices: [
                        ...prev.choices,
                        {
                            nodeId: state.currentNodeId,
                            choiceText,
                        },
                    ],
                    learningPoints: [...prev.learningPoints, feedback!.learningPoint],
                    showingFeedback: true,
                    currentFeedback: feedback!,
                    lastChoiceText: choiceText,
                    nextNodeId: choice.nextNodeId, // CRITICAL: Store nextNodeId for continue button
                }));
            }, 800); // Delay to let player see their sentence

            return; // Exit early for sentence builder
        } else {
            // Standard choice
            feedback = choice.feedback;
            choiceText = choice.text;

            if (!feedback) {
                console.error(`No feedback found for choice: ${choiceId}`);
                return;
            }
        }

        // Track choice
        setState((prev) => {
            // Update skill usage
            const currentSkills = { ...prev.skillsUsed } || {};

            // Priority: Feedback skill tag (specific) > Choice skill tag (generic)
            const skillTag = feedback.skillTag || choice.skillTag;

            if (skillTag) {
                currentSkills[skillTag] = (currentSkills[skillTag] || 0) + 1;
            }

            // Update emotions if triggered
            const emotionUpdates = {
                ...(choice.emotionChange || {}),
                ...(feedback.emotionChange || {})
            };

            const newEmotionOverrides = {
                ...prev.emotionOverrides,
                ...emotionUpdates
            };

            return {
                ...prev,
                choices: [
                    ...prev.choices,
                    {
                        nodeId: state.currentNodeId,
                        choiceText,
                    },
                ],
                learningPoints: [...prev.learningPoints, feedback.learningPoint],
                showingFeedback: true,
                currentFeedback: feedback,
                lastChoiceText: choiceText, // Store for confirmation
                skillsUsed: currentSkills,
                emotionOverrides: newEmotionOverrides,
            };
        });
    };

    const handleContinueAfterFeedback = () => {
        // For sentence builder, nextNodeId is stored in state
        let nextNodeId: string | undefined = state.nextNodeId;

        // For standard choices, find it from the choice
        if (!nextNodeId) {
            const choice = currentNode.choices?.find(
                (c) => c.feedback === state.currentFeedback
            );
            if (!choice) return;
            nextNodeId = choice.nextNodeId;
        }

        const nextNode = scenario.nodes[nextNodeId];

        if (!nextNode || nextNode.isEnd) {
            // End of scenario
            setShowSummary(true);
            return;
        }

        // Move to next node
        setState((prev) => ({
            ...prev,
            currentNodeId: nextNodeId!,
            showingFeedback: false,
            currentFeedback: undefined,
            nextNodeId: undefined, // Clear stored nextNodeId
        }));
        setDisplayedLinesCount(0);
    };

    const handleAutoAdvance = () => {
        if (!currentNode.nextNodeId) return;

        const nextNode = scenario.nodes[currentNode.nextNodeId];

        if (!nextNode || nextNode.isEnd) {
            setShowSummary(true);
            return;
        }

        setState((prev) => ({
            ...prev,
            currentNodeId: currentNode.nextNodeId!,
        }));
        setDisplayedLinesCount(0);
    };

    // NEW: Documentation handler
    const handleDocumentScene = () => {
        const timestamp = new Date().toLocaleString('fi-FI');
        const note = `Node: ${currentNode.id} - ${currentNode.narration || 'Tapahtuma'}`;

        setState((prev) => ({
            ...prev,
            documentationLog: [
                ...(prev.documentationLog || []),
                {
                    timestamp,
                    nodeId: currentNode.id,
                    description: note,
                },
            ],
        }));

        // Show brief confirmation (could be a toast notification)
        alert(`📋 Kirjattu: ${timestamp}\n${note}`);
    };

    // NEW: Time-out handler (validating pause)
    const [showTimeOutModal, setShowTimeOutModal] = useState(false);

    const handleTimeOut = () => {
        setShowTimeOutModal(true);
    };

    const handleCloseTimeOut = () => {
        setShowTimeOutModal(false);
    };

    // Show summary at end
    if (showSummary) {
        return (
            <ScenarioSummary
                learningPoints={state.learningPoints}
                choices={state.choices.map((c) => ({
                    sceneDescription: `Node: ${c.nodeId}`,
                    choiceText: c.choiceText,
                }))}
                skillsUsed={state.skillsUsed}
                onClose={onComplete}
            />
        );
    }

    const allLinesDisplayed = displayedLinesCount >= currentNode.dialogueLines.length;
    const showChoices = allLinesDisplayed && currentNode.choices;
    const showAutoAdvance =
        allLinesDisplayed &&
        !currentNode.choices &&
        currentNode.nextNodeId &&
        !currentNode.pauseForReflection;
    const showDialogueAdvance = !allLinesDisplayed && !state.showingFeedback;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Time-out Modal (validating pause) - NEW */}
            {showTimeOutModal && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">⏸️ Tauko</h3>
                        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                            {currentNode.timeOutMessage || 'Tämä on vaikea tilanne. Et ole vastuussa tästä. Ota hetki aikaa hengähtää.'}
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                            <p className="text-xs text-blue-900">
                                💙 <strong>Muista:</strong> Simulaattori on turvallinen ympäristö harjoitella. Oikea tilanne olisi voinut tuntua vielä vaikeammalta.
                            </p>
                        </div>
                        <button
                            onClick={handleCloseTimeOut}
                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all"
                        >
                            Jatka kun olet valmis
                        </button>
                    </div>
                </div>
            )}

            {/* Progress header - shows where user is */}
            <div className="flex-shrink-0 px-3 py-2 bg-gray-900 text-white border-b border-gray-700">
                <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">{scenario.title}</span>
                    <span className="text-gray-400">Vaihe 1/3</span>
                </div>
            </div>

            {/* Static Visual Area - dynamic emotions */}
            <div className="flex-shrink-0">
                <StaticVisualArea
                    visualState={currentNode.visualState}
                    characters={scenario.characters}
                    emotionOverrides={state.emotionOverrides}
                />
            </div>

            {/* Dialogue Panel - all interaction, fills remaining space */}
            <div className="flex-1 overflow-hidden min-h-0">
                <DialoguePanel
                    narration={currentNode.narration}
                    dialogueHistory={state.dialogueHistory}
                    characters={scenario.characters}
                    choices={showChoices ? currentNode.choices : undefined}
                    onChoose={handleChoice}
                    showingFeedback={state.showingFeedback}
                    currentFeedback={state.currentFeedback}
                    lastChoiceText={state.lastChoiceText}
                    onContinueAfterFeedback={handleContinueAfterFeedback}
                    showAutoAdvance={showAutoAdvance}
                    onAutoAdvance={handleAutoAdvance}
                    showDialogueAdvance={showDialogueAdvance}
                    onDialogueAdvance={handleAdvanceDialogue}
                    allowDocumentation={currentNode.allowDocumentation}
                    onDocumentScene={handleDocumentScene}
                    allowTimeOut={currentNode.allowTimeOut}
                    onTimeOut={handleTimeOut}
                />
            </div>
        </div>
    );
};
