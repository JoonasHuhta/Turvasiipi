import React from 'react';
import type { Scene, Character } from './types';
import { CharacterDisplay } from './CharacterDisplay';
import { SpeechBubble } from './SpeechBubble';

interface VisualSceneProps {
    scene: Scene;
    characters: Character[];
    onContinue?: () => void;
}

/**
 * Visual scene renderer - COMPACT LAYOUT
 * Everything fits on one screen, optimized for mobile
 */
export const VisualScene: React.FC<VisualSceneProps> = ({
    scene,
    characters,
    onContinue,
}) => {
    const getCharacterById = (id: string) =>
        characters.find((c) => c.id === id);

    return (
        <div className="w-full space-y-3 animate-fade-in">
            {/* Narration - compact */}
            {scene.narration && (
                <div className="text-center animate-slide-down">
                    <div className="inline-block px-4 py-2 bg-gray-800 text-white rounded-full text-xs md:text-sm font-medium shadow-md">
                        {scene.narration}
                    </div>
                </div>
            )}

            {/* Visual scene area - COMPACT, fits on screen */}
            <div
                className="relative w-full rounded-lg shadow-lg overflow-hidden transition-all duration-700 animate-scale-in"
                style={{
                    background: scene.background,
                    height: '35vh', // Reduced from 50vh
                    minHeight: '250px',
                    maxHeight: '350px',
                }}
            >
                {/* Characters - smaller */}
                {scene.characters.map((charState) => {
                    const character = getCharacterById(charState.characterId);
                    if (!character) return null;

                    return (
                        <CharacterDisplay
                            key={charState.characterId}
                            character={character}
                            emotion={charState.emotion}
                            position={charState.position}
                            x={charState.x}
                            y={charState.y}
                        />
                    );
                })}

                {/* Dialogue bubbles OVERLAY on the scene - no separate box */}
                {scene.dialogue.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                        <div className="space-y-2 max-h-32 md:max-h-40 overflow-y-auto">
                            {scene.dialogue.map((line, index) => {
                                const character = getCharacterById(line.characterId);
                                if (!character) return null;

                                return (
                                    <div
                                        key={index}
                                        className="animate-fade-in bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-sm"
                                        style={{ animationDelay: `${index * 150}ms` }}
                                    >
                                        <div className="flex items-start gap-2">
                                            <div
                                                className="flex-shrink-0 w-1.5 h-full rounded-full"
                                                style={{ backgroundColor: character.color }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div
                                                    className="text-xs font-semibold mb-0.5"
                                                    style={{ color: character.color }}
                                                >
                                                    {character.name}
                                                </div>
                                                <p className="text-xs md:text-sm text-gray-800 leading-snug">
                                                    {line.text}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Continue button for scenes with pause - compact */}
            {scene.pauseForReflection && onContinue && (
                <div className="flex justify-center animate-bounce-subtle">
                    <button
                        onClick={onContinue}
                        className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        Jatka →
                    </button>
                </div>
            )}
        </div>
    );
};
