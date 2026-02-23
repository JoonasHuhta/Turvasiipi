'use client';

import React, { useState } from 'react';
import type { DialogueTreeScenario } from './dialogue-types';
import { DialogueTreeEngine } from './DialogueTreeEngine';
import { simulatorRegistry } from '@/lib/simulator-registry';

interface SimulatorCoreProps {
    scenarios: DialogueTreeScenario[];
}

/**
 * Main simulator component - landing page and scenario selection
 * Using Dialogue Tree System
 */
export const SimulatorCore: React.FC<SimulatorCoreProps> = ({ scenarios }) => {
    const [currentScenario, setCurrentScenario] = useState<DialogueTreeScenario | null>(null);
    const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);

    const handleStartScenario = (scenario: DialogueTreeScenario) => {
        setCurrentScenario(scenario);
    };

    const handleScenarioComplete = () => {
        if (currentScenario && !completedScenarios.includes(currentScenario.id)) {
            setCompletedScenarios([...completedScenarios, currentScenario.id]);
        }
        setCurrentScenario(null);
    };

    // If a scenario is active, show the dialogue tree engine
    if (currentScenario) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
                <div className="max-w-4xl mx-auto h-screen flex flex-col">
                    {/* Only back button - compact */}
                    <div className="p-2 flex-shrink-0">
                        <button
                            onClick={handleScenarioComplete}
                            className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm"
                        >
                            ← Takaisin
                        </button>
                    </div>

                    {/* Dialogue Tree Engine - fills remaining space, locked */}
                    <div className="flex-1 bg-white shadow-lg overflow-hidden flex flex-col min-h-0">
                        <DialogueTreeEngine scenario={currentScenario} onComplete={handleScenarioComplete} />
                    </div>
                </div>
            </div>
        );
    }

    // Landing page - scenario selection
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 md:p-6">
            <div className="max-w-3xl mx-auto">
                {/* Header - compact */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Työpaikkakiusaamissimulaattori
                    </h1>
                    <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                        Opettele tunnistamaan kiusaamisen eri muodot ja harjoittele puuttumista.
                    </p>
                </div>

                {/* Safety disclaimer - compact */}
                <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded text-xs md:text-sm">
                    <p className="text-yellow-800">
                        <strong>Huom:</strong> Tämä on harjoitusympäristö. Jos koet akuuttia kiusaamista, ota yhteyttä esihenkilöön tai työterveyshuoltoon.
                    </p>
                </div>

                {/* Scenario cards - compact */}
                <div className="grid gap-4 md:grid-cols-2">
                    {scenarios.map((scenario) => {
                        const isCompleted = completedScenarios.includes(scenario.id);
                        const meta = simulatorRegistry.find((r) => r.id === scenario.id);

                        return (
                            <div
                                key={scenario.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
                            >
                                <div className="p-4">
                                    {/* Type + arc row */}
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {meta && (
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-sm">
                                                    🎮 Simulaattori
                                                </span>
                                            )}
                                            {meta && (
                                                <span className="text-[10px] font-mono text-gray-500">
                                                    Taso {meta.learningArcLevel} · {meta.arcLabel}
                                                </span>
                                            )}
                                        </div>
                                        {isCompleted && (
                                            <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0">
                                                ✓
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">{scenario.title}</h3>

                                    <p className="text-xs md:text-sm text-gray-600 mb-3">{scenario.context}</p>

                                    <div className="mb-3 p-2 bg-indigo-50 rounded-lg">
                                        <div className="text-xs font-semibold text-indigo-700 mb-0.5">
                                            Tavoite
                                        </div>
                                        <div className="text-xs text-indigo-900">{scenario.learningGoal}</div>
                                    </div>

                                    {/* Meta row */}
                                    {meta && (
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-[11px] text-gray-500">👁 {meta.persona === 'victim' ? 'Uhrin rooli' : meta.persona === 'bystander' ? 'Sivustakatsojan rooli' : meta.persona}</span>
                                            <span className="text-[11px] text-gray-500">🕐 ~{meta.durationMinutes} min</span>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => handleStartScenario(scenario)}
                                        className="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                        {isCompleted ? 'Pelaa uudelleen' : 'Aloita'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* Completion status - compact */}
            {completedScenarios.length > 0 && (
                <div className="mt-6 text-center">
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-lg">
                        <p className="text-green-800 font-semibold text-sm">
                            🌟 {completedScenarios.length}/{scenarios.length} suoritettu!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
