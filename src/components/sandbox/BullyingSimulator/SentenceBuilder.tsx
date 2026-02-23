import React, { useState } from 'react';

interface FloatingWord {
    id: string;
    text: string;
    category: 'opening' | 'core';
}

interface SentenceBuilderProps {
    openingOptions: string[];
    coreOptions: string[];
    onComplete: (sentence: { opening: string; core: string }) => void;
    guidanceText?: string;
}

/**
 * Simplified Sentence Builder
 * Words float in dialogue area, player clicks to build phrase
 * When complete, shows as speech bubble and continues scenario
 */
export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
    openingOptions,
    coreOptions,
    onComplete,
    guidanceText,
}) => {
    const [selectedOpening, setSelectedOpening] = useState<string | null>(null);
    const [selectedCore, setSelectedCore] = useState<string | null>(null);

    const handleWordClick = (text: string, category: 'opening' | 'core') => {
        if (category === 'opening' && !selectedOpening) {
            setSelectedOpening(text);
        } else if (category === 'core' && selectedOpening && !selectedCore) {
            setSelectedCore(text);
            // Complete sentence after short delay for visual confirmation
            setTimeout(() => {
                onComplete({ opening: selectedOpening, core: text });
            }, 600);
        }
    };

    const currentPhase = !selectedOpening ? 'opening' : !selectedCore ? 'core' : 'complete';

    return (
        <div className="w-full py-3 px-2 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border-2 border-indigo-200 flex flex-col gap-3">
            {/* Guidance */}
            <div className="text-center mb-3">
                <p className="text-xs font-semibold text-indigo-900 mb-1">
                    {currentPhase === 'opening' && '1️⃣ Valitse aloitus'}
                    {currentPhase === 'core' && '2️⃣ Valitse ydinviesti'}
                    {currentPhase === 'complete' && '✅ Valmis!'}
                </p>
                {guidanceText && (
                    <p className="text-xs text-gray-600 italic">{guidanceText}</p>
                )}
            </div>

            {/* Opening options */}
            {!selectedOpening && (
                <div className="mb-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Aloitus:</p>
                    <div className="flex flex-wrap gap-2">
                        {openingOptions.map((text, index) => (
                            <button
                                key={index}
                                onClick={() => handleWordClick(text, 'opening')}
                                className="px-3 py-2 bg-white hover:bg-indigo-100 border-2 border-indigo-300 hover:border-indigo-500 rounded-lg text-xs font-medium text-gray-900 transition-all transform hover:scale-105 shadow-sm hover:shadow-md"
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Selected opening (green checkmark) */}
            {selectedOpening && !selectedCore && (
                <div className="mb-3 p-2 bg-green-100 border-l-4 border-green-500 rounded">
                    <p className="text-xs text-green-900">
                        ✅ <span className="font-semibold">{selectedOpening}</span>
                    </p>
                </div>
            )}

            {/* Core options (only show after opening selected) */}
            {selectedOpening && !selectedCore && (
                <div>
                    <p className="text-xs font-medium text-gray-700 mb-2">Ydinviesti:</p>
                    <div className="flex flex-wrap gap-2">
                        {coreOptions.map((text, index) => {
                            const isSelected = selectedCore === text;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleWordClick(text, 'core')}
                                    disabled={!!selectedCore}
                                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all transform shadow-sm 
                                    ${isSelected
                                            ? 'bg-blue-600 text-white scale-105 ring-2 ring-blue-300'
                                            : 'bg-white hover:bg-blue-100 border-2 border-blue-300 hover:border-blue-500 text-gray-900 hover:scale-105 hover:shadow-md'
                                        } ${!!selectedCore && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {text}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Preview of complete sentence */}
            {selectedOpening && selectedCore && (
                <div className="p-3 bg-gradient-to-r from-green-100 to-blue-100 border-2 border-indigo-400 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900">
                        💬 "{selectedOpening}, {selectedCore}"
                    </p>
                </div>
            )}
        </div>
    );
};
