import React, { useState } from 'react';
import type { DialogueLine, Choice } from './dialogue-types';
import type { Character } from './types';
import { SentenceBuilder } from './SentenceBuilder';

interface DialoguePanelProps {
    narration?: string;
    dialogueHistory: DialogueLine[];
    characters: Character[];
    choices?: Choice[];
    onChoose?: (choiceId: string) => void;
    showingFeedback: boolean;
    currentFeedback?: Choice['feedback'];
    lastChoiceText?: string;
    onContinueAfterFeedback?: () => void;
    // Auto-advance (when no choices)
    showAutoAdvance?: boolean;
    onAutoAdvance?: () => void;
    // Dialogue progression (when more lines available)
    showDialogueAdvance?: boolean;
    onDialogueAdvance?: () => void;
    // NEW: Documentation
    allowDocumentation?: boolean;
    onDocumentScene?: () => void;
    // NEW: Time-out (safe exit)
    allowTimeOut?: boolean;
    onTimeOut?: () => void;
}

/**
 * Dialogue Panel - Sliding dialogue style (no scrolling)
 * Only shows last 4 lines, old lines fade out
 */
export const DialoguePanel: React.FC<DialoguePanelProps> = ({
    narration,
    dialogueHistory,
    characters,
    choices,
    onChoose,
    showingFeedback,
    currentFeedback,
    lastChoiceText,
    onContinueAfterFeedback,
    showAutoAdvance,
    onAutoAdvance,
    showDialogueAdvance,
    onDialogueAdvance,
    allowDocumentation,
    onDocumentScene,
    allowTimeOut,
    onTimeOut,
}) => {
    const getCharacterById = (id: string) =>
        characters.find((c) => c.id === id);

    return (
        <div className="flex flex-col bg-white border-t-2 border-gray-300 shadow-lg h-full overflow-hidden">
            {/* Narration bar (if any) */}
            {narration && (
                <div className="px-3 py-2 bg-gray-800 text-white text-xs border-b border-gray-600">
                    <span>{narration}</span>
                </div>
            )}

            {/* Dialogue history - sliding style (no scroll, fade old lines) */}
            <div className="relative px-3 py-2 bg-gray-50 overflow-hidden" style={{ minHeight: '200px', maxHeight: '200px' }}>
                <div className="space-y-1.5">
                    {dialogueHistory.slice(-4).map((line, index) => {
                        const character = getCharacterById(line.characterId);
                        if (!character) return null;

                        const isThought = line.style === 'thought';
                        const isAggressive = line.style === 'aggressive';

                        // Calculate opacity: older lines fade out
                        const totalVisible = Math.min(dialogueHistory.length, 4);
                        const positionFromEnd = totalVisible - index - 1; // 0 = newest, 3 = oldest
                        const opacity = positionFromEnd === 3 ? 0.4 : positionFromEnd === 2 ? 0.6 : 1;

                        return (
                            <div
                                key={`${line.characterId}-${dialogueHistory.indexOf(line)}`}
                                className={`flex items-start gap-2 animate-slide-up transition-opacity duration-500 ${isThought ? 'opacity-75' : ''
                                    }`}
                                style={{ opacity }}
                            >
                                {/* Character indicator */}
                                <div
                                    className="flex-shrink-0 w-1 rounded-full self-stretch min-h-[20px]"
                                    style={{ backgroundColor: character.color }}
                                />

                                <div className="flex-1 min-w-0">
                                    {/* Character name */}
                                    <div
                                        className={`text-xs font-semibold mb-0.5 ${isThought ? 'italic' : ''
                                            }`}
                                        style={{ color: character.color }}
                                    >
                                        {isThought ? `💭 ${character.name}` : character.name}
                                    </div>

                                    {/* Dialogue text */}
                                    <p
                                        className={`text-xs leading-snug ${isAggressive
                                            ? 'text-red-900 font-medium'
                                            : isThought
                                                ? 'text-gray-600 italic'
                                                : 'text-gray-800'
                                            }`}
                                    >
                                        {line.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Auto-advance button (when no choices) - right after dialogue */}
            {showAutoAdvance && (
                <div className="px-3 py-2 bg-white border-t border-gray-200 flex justify-center flex-shrink-0">
                    <button
                        onClick={onAutoAdvance}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        Jatka →
                    </button>
                </div>
            )}

            {/* Dialogue advance button (when more lines available) - NEW */}
            {showDialogueAdvance && (
                <div className="px-3 py-2 bg-white border-t border-gray-200 flex justify-center flex-shrink-0">
                    <button
                        onClick={onDialogueAdvance}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg shadow-md hover:shadow-lg transition-all animate-pulse"
                    >
                        Jatka... ▼
                    </button>
                </div>
            )}

            {/* Feedback (if showing) - Compact inline */}
            {showingFeedback && currentFeedback && (
                <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-200 space-y-2 flex-1 overflow-y-auto min-h-0">
                    {/* Choice confirmation */}
                    {lastChoiceText && (
                        <div className="text-xs text-blue-700 italic">
                            ✓ Valitsit: "{lastChoiceText}"
                        </div>
                    )}

                    {/* Compact feedback */}
                    <div className="space-y-1.5">
                        <div className="text-xs text-gray-800">
                            {currentFeedback.immediate}
                        </div>
                        <div className="text-xs text-gray-700">
                            {currentFeedback.analysis}
                        </div>
                    </div>

                    {/* Inline learning box - compact */}
                    <div className="space-y-2">
                        <div className="px-2.5 py-1.5 bg-indigo-100 rounded border-l-2 border-indigo-400">
                            <div className="text-xs text-indigo-900 font-medium leading-snug">
                                💡 {currentFeedback.learningPoint}
                            </div>
                        </div>

                        {/* Transferable Skill (if present) */}
                        {currentFeedback.transferableSkill && (
                            <div className="px-2.5 py-2 bg-green-50 rounded border border-green-200">
                                <div className="text-xs font-bold text-green-800 mb-1">
                                    🧩 Käytä tätä oikeassa elämässä:
                                </div>
                                <div className="text-xs font-mono bg-white px-1.5 py-0.5 rounded border border-green-100 text-green-700 mb-1.5 inline-block">
                                    {currentFeedback.transferableSkill.template}
                                </div>
                                <div className="space-y-1">
                                    {currentFeedback.transferableSkill.realWorldExamples.map((ex, i) => (
                                        <div key={i} className="text-[10px] text-green-700 flex items-start gap-1">
                                            <span>👉</span>
                                            <span>{ex}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Continue button */}
                    <div className="flex justify-end pt-1">
                        <button
                            onClick={onContinueAfterFeedback}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-lg shadow-sm hover:shadow-md transition-all"
                        >
                            Jatka →
                        </button>
                    </div>
                </div>
            )}

            {/* Choices (if any and not showing feedback) */}
            {!showingFeedback && choices && choices.length > 0 && (
                <div className="px-3 py-2 bg-white border-t border-gray-200 space-y-1.5 flex-1 overflow-y-auto min-h-[50%]">
                    {/* Check if first choice has sentence builder */}
                    {choices[0].sentenceBuilder ? (
                        <>
                            <div className="text-xs font-semibold text-gray-700 mb-2">
                                🗣️ Rakenna lause osista:
                            </div>
                            <SentenceBuilder
                                openingOptions={choices[0].sentenceBuilder.openingOptions}
                                coreOptions={choices[0].sentenceBuilder.coreOptions}
                                guidanceText={choices[0].sentenceBuilder.guidanceText}
                                onComplete={(sentence) => {
                                    // Pass selected sentence as choice ID in format "opening_core"
                                    const choiceId = `${sentence.opening}_${sentence.core}`;
                                    onChoose?.(choiceId);
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <div className="text-xs font-semibold text-gray-700 mb-1">
                                Mitä teet?
                            </div>
                            {choices.map((choice, index) => (
                                <button
                                    key={choice.id}
                                    onClick={() => onChoose?.(choice.id)}
                                    className="w-full text-left px-2.5 py-2 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
                                >
                                    <div className="flex items-start gap-2">
                                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gray-200 group-hover:bg-indigo-400 flex items-center justify-center text-xs font-bold text-gray-600 group-hover:text-white transition-colors">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 text-xs text-gray-700 group-hover:text-gray-900 leading-tight">
                                            {choice.text}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
