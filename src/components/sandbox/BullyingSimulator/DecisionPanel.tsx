import React from 'react';
import type { Decision } from './types';

interface DecisionPanelProps {
    decision: Decision;
    onChoose: (optionId: string) => void;
}

/**
 * Decision panel - COMPACT for mobile
 */
export const DecisionPanel: React.FC<DecisionPanelProps> = ({
    decision,
    onChoose,
}) => {
    return (
        <div className="mt-3 p-4 bg-white rounded-lg shadow-md border border-indigo-200">
            {/* Prompt - compact */}
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                {decision.prompt}
            </h3>

            {/* Perspective indicator - smaller */}
            <div className="mb-3 inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                {decision.perspective === 'target' && '👤 Kiusatun näkökulma'}
                {decision.perspective === 'bystander' && '👥 Sivustaseuraajan näkökulma'}
                {decision.perspective === 'supervisor' && '👔 Esihenkilön näkökulma'}
            </div>

            {/* Options - compact */}
            <div className="space-y-2">
                {decision.options.map((option, index) => (
                    <button
                        key={option.id}
                        onClick={() => onChoose(option.id)}
                        className="w-full text-left p-3 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 hover:shadow-sm group"
                    >
                        <div className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 group-hover:bg-indigo-400 flex items-center justify-center text-xs font-bold text-gray-600 group-hover:text-white transition-colors">
                                {index + 1}
                            </div>
                            <div className="flex-1 text-xs md:text-sm text-gray-700 group-hover:text-gray-900 leading-snug">
                                {option.text}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
