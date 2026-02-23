import React from 'react';
import type { FeedbackResponse } from './types';

interface FeedbackViewProps {
    feedback: FeedbackResponse;
    onContinue: () => void;
}

/**
 * Feedback view showing analysis and educational content
 */
export const FeedbackView: React.FC<FeedbackViewProps> = ({
    feedback,
    onContinue,
}) => {
    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            {/* Immediate response */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">Valintasi</h3>
                <p className="text-blue-800">{feedback.immediate}</p>
            </div>

            {/* Consequences */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Mitä tapahtui seuraavaksi</h3>
                <p className="text-gray-700">{feedback.consequences}</p>
            </div>

            {/* Analysis */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-5 space-y-4">
                <h3 className="font-bold text-lg text-gray-900">Analyysi</h3>

                <div>
                    <h4 className="font-semibold text-green-700 mb-1 flex items-center gap-2">
                        <span>✅</span> Mikä toimi
                    </h4>
                    <p className="text-gray-700 text-sm">{feedback.analysis.whatWorked}</p>
                </div>

                <div>
                    <h4 className="font-semibold text-orange-700 mb-1 flex items-center gap-2">
                        <span>⚠️</span> Riskit
                    </h4>
                    <p className="text-gray-700 text-sm">{feedback.analysis.risks}</p>
                </div>

                <div>
                    <h4 className="font-semibold text-blue-700 mb-1 flex items-center gap-2">
                        <span>💡</span> Miten parantaa
                    </h4>
                    <p className="text-gray-700 text-sm">{feedback.analysis.improvement}</p>
                </div>
            </div>

            {/* Educational content */}
            <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-5 space-y-4">
                <h3 className="font-bold text-lg text-indigo-900">Oppimateriaali</h3>

                <div>
                    <h4 className="font-semibold text-indigo-800 mb-1">Käsite</h4>
                    <p className="text-indigo-900 text-sm">{feedback.educational.concept}</p>
                </div>

                <div>
                    <h4 className="font-semibold text-indigo-800 mb-1">Laki ja ohjeet</h4>
                    <p className="text-indigo-900 text-sm">{feedback.educational.legalContext}</p>
                </div>

                <div>
                    <h4 className="font-semibold text-indigo-800 mb-2">Seuraavat askeleet</h4>
                    <ul className="list-disc list-inside space-y-1 text-indigo-900 text-sm">
                        {feedback.educational.nextSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Learning point highlight */}
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-400 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <div className="text-2xl">🌟</div>
                    <div>
                        <h4 className="font-bold text-amber-900 mb-1">Opit jotain uutta!</h4>
                        <p className="text-amber-800 font-medium">{feedback.learningPoint}</p>
                    </div>
                </div>
            </div>

            {/* Continue button */}
            <div className="flex justify-center pt-4">
                <button
                    onClick={onContinue}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                    Jatka →
                </button>
            </div>
        </div>
    );
};
