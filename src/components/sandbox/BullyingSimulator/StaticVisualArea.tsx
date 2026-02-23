import React from 'react';
import type { VisualState } from './dialogue-types';
import type { Character, Emotion } from './types';
import { CharacterDisplay } from './CharacterDisplay';

interface StaticVisualAreaProps {
    visualState: VisualState;
    characters: Character[];
    emotionOverrides?: Record<string, Emotion>; // NEW: Dynamic emotions
}

/**
 * Static Visual Area - Phoenix Wright style
 * Background and characters stay in place, only emotions/positions may change
 */
export const StaticVisualArea: React.FC<StaticVisualAreaProps> = ({
    visualState,
    characters,
    emotionOverrides,
}) => {
    const getCharacterById = (id: string) => characters.find((c) => c.id === id);

    return (
        <div
            className="relative w-full overflow-hidden transition-all duration-500"
            style={{
                background: visualState.background,
                height: '28vh',
                minHeight: '200px',
                maxHeight: '250px',
            }}
        >
            {/* Characters - static positions */}
            {visualState.characters.map((charState) => {
                const character = getCharacterById(charState.characterId);
                if (!character) return null;

                // Apply override if exists
                const currentEmotion = emotionOverrides?.[charState.characterId] || charState.emotion;

                return (
                    <CharacterDisplay
                        key={charState.characterId}
                        character={character}
                        emotion={currentEmotion}
                        position={charState.position}
                        x={charState.x}
                        y={charState.y}
                    />
                );
            })}
        </div>
    );
};
