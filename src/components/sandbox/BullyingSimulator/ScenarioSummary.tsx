import React from 'react';
import { SkillCardSummary } from './SkillCardSummary';

interface ScenarioSummaryProps {
    learningPoints: string[];
    choices: Array<{
        sceneDescription: string;
        choiceText: string;
    }>;
    skillsUsed: Record<string, number>; // NEW: Passed from engine
    onClose: () => void;
}

/**
 * Summary view shown after completing a scenario
 * Shows learning points and choices made
 */
export const ScenarioSummary: React.FC<ScenarioSummaryProps> = ({
    learningPoints,
    choices,
    skillsUsed,
    onClose,
}) => {
    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            {/* Completion banner */}
            <div className="text-center bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl p-8 shadow-xl">
                <div className="text-6xl mb-4">🎓</div>
                <h2 className="text-3xl font-bold mb-2">Skenaario suoritettu!</h2>
                <p className="text-green-50">Olet oppinut jotain uutta työpaikkakiusaamisesta</p>
            </div>

            {/* NEW: Skill Cards */}
            <SkillCardSummary skillsUsed={skillsUsed} />

            {/* Learning points */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-indigo-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🌟</span> Oppimispisteet
                </h3>
                <div className="space-y-3">
                    {learningPoints.map((point, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200"
                        >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold">
                                {index + 1}
                            </div>
                            <p className="text-gray-800 flex-1">{point}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Choices recap */}
            <div className="bg-gray-50 rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🔍</span> Valintasi
                </h3>
                <div className="space-y-3">
                    {choices.map((choice, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-gray-300">
                            <div className="text-xs font-semibold text-gray-500 mb-1">
                                {choice.sceneDescription}
                            </div>
                            <div className="text-sm text-gray-800">{choice.choiceText}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3">💡 Suositukset jatkoon</h3>
                <ul className="space-y-2 text-sm text-blue-900">
                    <li className="flex items-start gap-2">
                        <span className="flex-shrink-0">✓</span>
                        <span>
                            Jos koet kiusaamista oikeasti, ota yhteyttä esihenkilöön, HR:ään tai
                            työsuojeluvaltuutettuun
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="flex-shrink-0">✓</span>
                        <span>Dokumentoi aina: päivämäärät, kellonajat, todistajat, tarkat tapahtumat</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="flex-shrink-0">✓</span>
                        <span>
                            Muista: kiusaaminen ei ole koskaan uhrin syy. Apua on saatavilla.
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="flex-shrink-0">✓</span>
                        <span>Pelaa lisää skenaarioita päästäksesi harjoittelemaan erilaisia tilanteita</span>
                    </li>
                </ul>
            </div>

            {/* Back button */}
            <div className="flex justify-center pt-4">
                <button
                    onClick={onClose}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                    Takaisin skenaarioihin →
                </button>
            </div>
        </div>
    );
};
