'use client';

import React from 'react';
import { PauseCircle, X } from 'lucide-react';
import type {
    PerpetratorScenario,
    PerpetratorEngineState,
    PerpetratorPhase,
    PerpetratorCard,
    StressLevel,
    MoralJustification,
    ActionSeverity,
} from './perpetrator-types';
import { STRESS_LABELS } from './perpetrator-types';
import { useProgress } from '@/context/ProgressContext';
import { PressurePhase } from './perpetrator-phases/PressurePhase';
import { DangerZonePhase } from './perpetrator-phases/DangerZonePhase';
import { ConsequencePhase } from './perpetrator-phases/ConsequencePhase';
import { RewindPhase } from './perpetrator-phases/RewindPhase';
import { RepairPhase } from './perpetrator-phases/RepairPhase';

/** Maps a scenario.id to its gamification module ID */
const SCENARIO_MODULE_IDS: Record<string, string> = {
    's1-kpi-pressure': 'sim_perpetrator_s1',
    's2-inherited': 'sim_perpetrator_s2',
    's3-nepsy': 'sim_perpetrator_s3',
    's4-group-pressure': 'sim_perpetrator_s4',
    's5-helper-burnout': 'sim_perpetrator_s5',
};

interface Props {
    scenario: PerpetratorScenario;
    onComplete: () => void;
}

const PHASE_ORDER: PerpetratorPhase[] = [
    'intro',
    'pressure',
    'dangerzone',
    'consequence',
    'rewind',
    'repair',
    'card',
];

const PHASE_LABELS: Partial<Record<PerpetratorPhase, string>> = {
    intro: 'Johdanto',
    pressure: '1 — Paine',
    dangerzone: '2 — Vaaravyöhyke',
    consequence: '3 — Teko',
    rewind: '4 — Rewind',
    repair: '5 — Korjaus',
    card: 'Kortti',
};

function PhaseProgress({ current }: { current: PerpetratorPhase }) {
    const phases: PerpetratorPhase[] = ['pressure', 'dangerzone', 'consequence', 'rewind', 'repair'];
    const currentIdx = phases.indexOf(current);
    return (
        <div className="flex gap-1">
            {phases.map((ph, i) => (
                <div
                    key={ph}
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${i < currentIdx ? 'bg-purple-500' :
                        i === currentIdx ? 'bg-purple-300' :
                            'bg-slate-200'
                        }`}
                />
            ))}
        </div>
    );
}

function IntroPhase({ scenario, onStart }: { scenario: PerpetratorScenario; onStart: () => void }) {
    return (
        <div className="space-y-6 px-1">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-4">
                    {scenario.role === 'manager' ? '👔 Esihenkilörooli' :
                        scenario.role === 'colleague' ? '👥 Kollega' :
                            scenario.role === 'group_member' ? '🫂 Ryhmässä' : '🤝 Auttaja'}
                </span>
                <h2 className="text-2xl font-bold mb-2">{scenario.title}</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{scenario.context}</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-xs font-semibold text-amber-700 mb-1">🎯 Oppimisen tavoite</p>
                <p className="text-sm text-amber-800">{scenario.learningGoal}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-600 mb-2">Systemaattinen paine taustalla:</p>
                <p className="text-sm text-slate-700 italic">"{scenario.systemicPressure}"</p>
            </div>

            {scenario.triggerWarning && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                    <p className="text-xs font-semibold text-rose-700 mb-1">⚠ Sisältövaroitus</p>
                    <p className="text-xs text-rose-600">{scenario.triggerWarning}</p>
                </div>
            )}

            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <p className="text-xs text-indigo-700 leading-relaxed">
                    <span className="font-semibold">Tämä on oppimisympäristö.</span>{' '}
                    Havainnot ovat vain sinun. Et voi epäonnistua — jokainen valinta on materiaalia.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white border border-slate-200 rounded-xl p-3">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Kesto</p>
                    <p className="text-sm font-bold text-slate-800">~{scenario.durationMinutes} min</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-3">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Vaikeus</p>
                    <p className="text-sm font-bold text-slate-800">
                        {'⭐'.repeat(scenario.difficulty)} {scenario.difficultyLabel}
                    </p>
                </div>
            </div>

            <button
                onClick={onStart}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-semibold text-sm transition-colors"
            >
                Aloita skenaario →
            </button>
        </div>
    );
}

function PauseOverlay({ onResume, onExit }: { onResume: () => void; onExit: () => void }) {
    return (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center px-6">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-5">
                <div className="text-4xl">⏸</div>
                <h3 className="text-lg font-bold text-slate-900">Tauko</h3>
                <p className="text-sm text-slate-600">
                    Voit pitää hetken. Simulaattori odottaa.
                </p>
                <div className="space-y-3">
                    <button
                        onClick={onResume}
                        className="w-full bg-slate-800 text-white py-3 rounded-xl text-sm font-medium"
                    >
                        Jatka
                    </button>
                    <button
                        onClick={onExit}
                        className="w-full border border-slate-200 text-slate-600 py-3 rounded-xl text-sm"
                    >
                        Lopeta ja poistu
                    </button>
                </div>
            </div>
        </div>
    );
}

function saveProgress(card: PerpetratorCard) {
    try {
        const raw = localStorage.getItem('perpetratorProgress');
        const progress = raw ? JSON.parse(raw) : {
            sessionsCompleted: 0,
            scenariosAttempted: [],
            constructiveChoices: 0,
            repairActionsTotal: 0,
            savedCards: [],
        };
        progress.sessionsCompleted += 1;
        if (!progress.scenariosAttempted.includes(card.scenarioId)) {
            progress.scenariosAttempted.push(card.scenarioId);
        }
        if (card.chosenActionSeverity === 'constructive') progress.constructiveChoices += 1;
        progress.repairActionsTotal += card.repairActions.length;
        progress.savedCards.push(card);
        localStorage.setItem('perpetratorProgress', JSON.stringify(progress));
    } catch { /* ignore */ }
}

export function PerpetratorEngine({ scenario, onComplete }: Props) {
    const { completeModule } = useProgress();
    const [state, setState] = React.useState<PerpetratorEngineState>({
        phase: 'intro',
        stressLevel: scenario.pressurePhase.stressStartLevel,
        selectedStressFactors: [],
        repairActionsChosen: [],
        paused: false,
    });

    const setPhase = (phase: PerpetratorPhase) =>
        setState(prev => ({ ...prev, phase }));

    const handlePressureComplete = (stressLevel: StressLevel, factors: string[]) => {
        setState(prev => ({ ...prev, stressLevel, selectedStressFactors: factors, phase: 'dangerzone' }));
    };

    const handleDangerZoneComplete = (justification: MoralJustification, interpretationId: string) => {
        setState(prev => ({
            ...prev,
            selectedJustification: justification,
            selectedInterpretation: interpretationId,
            phase: 'consequence',
        }));
    };

    const handleConsequenceComplete = (actionId: string, severity: ActionSeverity) => {
        setState(prev => ({
            ...prev,
            chosenAction: actionId,
            chosenActionSeverity: severity,
            phase: 'rewind',
        }));
    };

    const handleRewindComplete = (savedPhrase: string) => {
        setState(prev => ({ ...prev, savedPhrase, phase: 'repair' }));
    };

    const handleRepairComplete = (chosen: string[], learned: string, nextStep: string) => {
        const action = scenario.consequencePhase.actions.find(a => a.id === state.chosenAction);
        const card: PerpetratorCard = {
            scenarioId: scenario.id,
            scenarioTitle: scenario.title,
            chosenActionSeverity: state.chosenActionSeverity ?? 'avoidant',
            alternativePhrase: state.savedPhrase ?? '',
            repairActions: chosen,
            learned,
            nextStep,
            completedAt: new Date().toISOString(),
        };
        saveProgress(card);
        // Grant XP for this specific scenario
        const moduleId = SCENARIO_MODULE_IDS[scenario.id];
        if (moduleId) completeModule(moduleId);
        setState(prev => ({
            ...prev,
            repairActionsChosen: chosen,
            cardContent: { learned, nextStep },
            phase: 'card',
        }));
        onComplete();
    };

    const chosenActionData = scenario.consequencePhase.actions.find(a => a.id === state.chosenAction);
    const stressInfo = STRESS_LABELS[state.stressLevel];

    return (
        <div className="relative">
            {state.paused && (
                <PauseOverlay
                    onResume={() => setState(prev => ({ ...prev, paused: false }))}
                    onExit={onComplete}
                />
            )}

            {/* Header strip */}
            {state.phase !== 'intro' && (
                <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-500">{scenario.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded font-bold" style={{ color: stressInfo.color, backgroundColor: `${stressInfo.color}18` }}>
                                {stressInfo.label}
                            </span>
                        </div>
                        <button
                            onClick={() => setState(prev => ({ ...prev, paused: true }))}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <PauseCircle className="w-5 h-5" />
                        </button>
                    </div>
                    {state.phase !== 'card' && <PhaseProgress current={state.phase} />}
                </div>
            )}

            {/* Phase content */}
            <div className="px-4 py-6">
                {state.phase === 'intro' && (
                    <IntroPhase scenario={scenario} onStart={() => setPhase('pressure')} />
                )}
                {state.phase === 'pressure' && (
                    <PressurePhase data={scenario.pressurePhase} onComplete={handlePressureComplete} />
                )}
                {state.phase === 'dangerzone' && (
                    <DangerZonePhase
                        data={scenario.dangerZonePhase}
                        stressLevel={state.stressLevel}
                        onComplete={handleDangerZoneComplete}
                    />
                )}
                {state.phase === 'consequence' && (
                    <ConsequencePhase
                        prompt={scenario.consequencePhase.prompt}
                        actions={scenario.consequencePhase.actions}
                        onComplete={handleConsequenceComplete}
                    />
                )}
                {state.phase === 'rewind' && chosenActionData && (
                    <RewindPhase
                        data={scenario.rewindPhase}
                        originalActionText={chosenActionData.text}
                        onComplete={handleRewindComplete}
                    />
                )}
                {state.phase === 'repair' && (
                    <RepairPhase
                        data={scenario.repairPhase}
                        onComplete={handleRepairComplete}
                    />
                )}
            </div>
        </div>
    );
}
