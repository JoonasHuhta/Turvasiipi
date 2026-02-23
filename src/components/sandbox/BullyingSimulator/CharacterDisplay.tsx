import React from 'react';
import type { Character, Emotion, Position } from './types';

interface CharacterDisplayProps {
    character: Character;
    emotion: Emotion;
    position: Position;
    x: number;
    y: number;
}

/**
 * Simple character representation - COMPACT for mobile
 */
export const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
    character,
    emotion,
    position,
    x,
    y,
}) => {
    const getEmotionFace = (emotion: Emotion): string => {
        switch (emotion) {
            case 'happy':
                return '😊';
            case 'sad':
                return '😔';
            case 'angry':
                return '😠';
            case 'fearful':
                return '😰';
            case 'smug':
                return '😏';
            case 'neutral':
            default:
                return '😐';
        }
    };

    const height = position === 'sitting' ? 50 : 70; // Reduced significantly

    return (
        <div
            className="absolute transition-all duration-500 ease-in-out"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
            }}
        >
            {/* Character figure - SMALLER */}
            <div className="flex flex-col items-center gap-0.5">
                {/* Emotion face - smaller */}
                <div className="text-2xl md:text-3xl">{getEmotionFace(emotion)}</div>

                {/* Body - smaller */}
                <div
                    className="rounded-full transition-all"
                    style={{
                        width: '35px', // Reduced from 60px
                        height: `${height}px`,
                        backgroundColor: character.color,
                        opacity: 0.7,
                    }}
                />

                {/* Name label - smaller */}
                <div
                    className="text-xs px-2 py-0.5 rounded-full text-white shadow-sm"
                    style={{ backgroundColor: character.color }}
                >
                    {character.name}
                </div>
            </div>
        </div>
    );
};
