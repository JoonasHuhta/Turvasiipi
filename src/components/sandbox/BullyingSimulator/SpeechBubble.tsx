import React from 'react';
import type { DialogueLine } from './types';

interface SpeechBubbleProps {
    dialogue: DialogueLine;
    characterName: string;
    characterColor: string;
}

/**
 * Speech bubble component with style variations
 */
export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
    dialogue,
    characterName,
    characterColor,
}) => {
    const getBubbleStyle = (style?: 'normal' | 'aggressive' | 'whisper') => {
        switch (style) {
            case 'aggressive':
                return {
                    borderColor: '#ef4444',
                    borderWidth: '3px',
                    borderStyle: 'solid',
                    backgroundColor: '#fee2e2',
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 90% 100%, 80% 70%, 0% 70%)',
                };
            case 'whisper':
                return {
                    borderColor: '#d1d5db',
                    borderWidth: '1px',
                    borderStyle: 'dashed',
                    backgroundColor: '#f9fafb',
                    opacity: 0.8,
                };
            case 'normal':
            default:
                return {
                    borderColor: characterColor,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    backgroundColor: '#ffffff',
                };
        }
    };

    const style = getBubbleStyle(dialogue.style);

    return (
        <div className="mb-3 max-w-md">
            {/* Character name */}
            <div
                className="text-xs font-semibold mb-1"
                style={{ color: characterColor }}
            >
                {characterName}
            </div>

            {/* Speech bubble */}
            <div
                className="px-4 py-3 rounded-2xl shadow-sm transition-all"
                style={style}
            >
                <p className="text-sm leading-relaxed">{dialogue.text}</p>
            </div>
        </div>
    );
};
