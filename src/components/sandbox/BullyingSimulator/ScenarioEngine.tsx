import React, { useState } from 'react';
import type { Scenario, Scene, DecisionOption, SimulatorState } from './types';
import { VisualScene } from './VisualScene';
import { DecisionPanel } from './DecisionPanel';
import { FeedbackView } from './FeedbackView';
import { ScenarioSummary } from './ScenarioSummary';

interface ScenarioEngineProps {
    scenario: Scenario;
    onComplete: () => void;
}

/**
 * Scenario engine - manages flow through scenes and decisions
 */
export const ScenarioEngine: React.FC<ScenarioEngineProps> = ({
    scenario,
    onComplete,
}) => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isShowingFeedback, setIsShowingFeedback] = useState(false);
    const [currentFeedback, setCurrentFeedback] = useState<DecisionOption['response'] | null>(null);
    const [learningPoints, setLearningPoints] = useState<string[]>([]);
    const [choices, setChoices] = useState<Array<{ sceneDescription: string; choiceText: string }>>([]);
    const [showSummary, setShowSummary] = useState(false);

    const currentScene = scenario.scenes[currentSceneIndex];
    const isLastScene = currentSceneIndex === scenario.scenes.length - 1;

    const handleContinue = () => {
        if (isLastScene) {
            setShowSummary(true);
        } else {
            setCurrentSceneIndex((prev) => prev + 1);
        }
    };

    const handleDecision = (optionId: string) => {
        const decision = currentScene.decision;
        if (!decision) return;

        const selectedOption = decision.options.find((opt) => opt.id === optionId);
        if (!selectedOption) return;

        // Track learning point
        setLearningPoints((prev) => [...prev, selectedOption.response.learningPoint]);

        // Track choice
        setChoices((prev) => [
            ...prev,
            {
                sceneDescription: currentScene.narration || `Kohtaus ${currentSceneIndex + 1}`,
                choiceText: selectedOption.text,
            },
        ]);

        setCurrentFeedback(selectedOption.response);
        setIsShowingFeedback(true);
    };

    const handleFeedbackContinue = () => {
        setIsShowingFeedback(false);
        setCurrentFeedback(null);
        handleContinue();
    };

    const handleSummaryClose = () => {
        onComplete();
    };

    // Show summary at the end
    if (showSummary) {
        return (
            <ScenarioSummary
                learningPoints={learningPoints}
                choices={choices}
                onClose={handleSummaryClose}
            />
        );
    }

    return (
        <div className="space-y-3">
            {/* Progress indicator - compact */}
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <div className="font-medium">
                    {currentSceneIndex + 1}/{scenario.scenes.length}
                </div>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-1.5">
                    <div
                        className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                        style={{
                            width: `${((currentSceneIndex + 1) / scenario.scenes.length) * 100}%`,
                        }}
                    />
                </div>
                <div className="text-xs">
                    {learningPoints.length} 🌟
                </div>
            </div>

            {/* Show either scene or feedback */}
            {isShowingFeedback && currentFeedback ? (
                <FeedbackView feedback={currentFeedback} onContinue={handleFeedbackContinue} />
            ) : (
                <>
                    <VisualScene
                        scene={currentScene}
                        characters={scenario.characters}
                        onContinue={currentScene.pauseForReflection && !currentScene.decision ? handleContinue : undefined}
                    />

                    {/* Show decision panel if scene has a decision */}
                    {currentScene.decision && (
                        <DecisionPanel decision={currentScene.decision} onChoose={handleDecision} />
                    )}

                    {/* If no decision and no pause, auto-continue button */}
                    {!currentScene.decision && !currentScene.pauseForReflection && (
                        <div className="flex justify-center">
                            <button
                                onClick={handleContinue}
                                className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                {isLastScene ? 'Valmis' : 'Jatka →'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
