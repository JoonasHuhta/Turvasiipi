'use client';

import React from 'react';
import { Eye, Clock, TrendingDown } from 'lucide-react';
import type {
    PerpetratorAction,
    ActionConsequences,
    ActionSeverity,
} from '../perpetrator-types';
import { ACTION_SEVERITY_LABELS } from '../perpetrator-types';

interface ConsequencePhaseProps {
    prompt: string;
    actions: PerpetratorAction[];
    onComplete: (actionId: string, severity: ActionSeverity) => void;
}

function SplitScreenConsequences({ consequences, actionText, severity }: {
    consequences: ActionConsequences;
    actionText: string;
    severity: ActionSeverity;
}) {
    const [view, setView] = React.useState<'split' | 'timeline'>('split');
    const severityInfo = ACTION_SEVERITY_LABELS[severity];

    return (
        <div className="space-y-4">
            {/* What you said */}
            <div className="bg-slate-800 rounded-2xl p-4">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">Sinä sanoit / teit</p>
                <p className="text-white text-sm italic">"{actionText}"</p>
                <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded" style={{ color: severityInfo.color, backgroundColor: `${severityInfo.color}20` }}>
                    {severityInfo.label}
                </span>
            </div>

            {/* Intent vs Impact */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <p className="text-[10px] font-mono text-blue-400 uppercase mb-1">Halusit</p>
                    <p className="text-xs text-blue-800">{consequences.intentVsImpact.intent}</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-[10px] font-mono text-red-400 uppercase mb-1">Vaikutus</p>
                    <p className="text-xs text-red-800">{consequences.intentVsImpact.impact}</p>
                </div>
            </div>

            {/* View toggle */}
            <div className="flex gap-2">
                <button
                    onClick={() => setView('split')}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${view === 'split' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                    <Eye className="w-3 h-3 inline mr-1" />
                    Kolme näkökulmaa
                </button>
                <button
                    onClick={() => setView('timeline')}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${view === 'timeline' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                    <Clock className="w-3 h-3 inline mr-1" />
                    Ajassa eteenpäin
                </button>
            </div>

            {view === 'split' && (
                <div className="grid grid-cols-1 gap-3">
                    {/* Victim */}
                    <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4">
                        <p className="text-[10px] font-mono text-pink-400 uppercase tracking-widest mb-2">👤 Kohteen kokemus</p>
                        <p className="text-sm font-medium text-pink-900 mb-1">"{consequences.victimExperience.immediateThought}"</p>
                        <p className="text-xs text-pink-700 italic">{consequences.victimExperience.bodyReaction}</p>
                        <div className="mt-3 pt-3 border-t border-pink-200">
                            <p className="text-[10px] text-pink-500 uppercase font-mono">Myöhemmin</p>
                            <p className="text-xs text-pink-700">{consequences.victimExperience.longTermEffect}</p>
                        </div>
                    </div>

                    {/* Group */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                        <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest mb-2">👥 Ryhmän ilmapiiri</p>
                        <p className="text-sm text-amber-900">{consequences.groupAtmosphere.immediate}</p>
                        <div className="mt-3 pt-3 border-t border-amber-200">
                            <p className="text-[10px] text-amber-500 uppercase font-mono">Myöhemmin</p>
                            <p className="text-xs text-amber-700">{consequences.groupAtmosphere.longTerm}</p>
                        </div>
                    </div>

                    {/* Self */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">🪞 Sinun jälkitunteesi</p>
                        <p className="text-sm text-slate-800">{consequences.selfAftermath.immediate}</p>
                        <p className="text-xs text-slate-500 italic mt-1">{consequences.selfAftermath.physical}</p>
                        <div className="mt-3 pt-3 border-t border-slate-200">
                            <p className="text-[10px] text-slate-400 uppercase font-mono">Myöhemmin</p>
                            <p className="text-xs text-slate-600">{consequences.selfAftermath.longTerm}</p>
                        </div>
                    </div>
                </div>
            )}

            {view === 'timeline' && (
                <div className="space-y-3">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-mono text-yellow-600 uppercase">Heti nyt</span>
                            <span className="text-yellow-500">✔</span>
                        </div>
                        <p className="text-sm text-yellow-900">{consequences.selfAftermath.immediate}</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="w-3 h-3 text-orange-500" />
                            <span className="text-[10px] font-mono text-orange-600 uppercase">Seuraavana päivänä</span>
                        </div>
                        <p className="text-sm text-orange-900">{consequences.nextDay}</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="w-3 h-3 text-red-500" />
                            <span className="text-[10px] font-mono text-red-600 uppercase">Viikon kuluttua</span>
                        </div>
                        <p className="text-sm text-red-900">{consequences.nextWeek}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export function ConsequencePhase({ prompt, actions, onComplete }: ConsequencePhaseProps) {
    const [selectedAction, setSelectedAction] = React.useState<PerpetratorAction | null>(null);
    const [showConsequences, setShowConsequences] = React.useState(false);

    const handleSelectAction = (action: PerpetratorAction) => {
        setSelectedAction(action);
        setShowConsequences(false);
        setTimeout(() => setShowConsequences(true), 300);
    };

    return (
        <div className="space-y-5 px-1">
            <div className="bg-slate-100 rounded-2xl p-5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 block mb-2">Osa 3 — Teko</span>
                <p className="text-slate-800 font-medium text-sm">{prompt}</p>
                {!selectedAction && (
                    <p className="text-xs text-slate-500 mt-2 italic">Ei ole väärää vastausta — tämä on materiaalia.</p>
                )}
            </div>

            {!selectedAction ? (
                <div className="space-y-3">
                    {actions.map(action => {
                        const sev = ACTION_SEVERITY_LABELS[action.severity];
                        return (
                            <button
                                key={action.id}
                                onClick={() => handleSelectAction(action)}
                                className="w-full group text-left bg-white border-2 border-slate-200 hover:border-slate-400 rounded-2xl p-4 transition-all"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-xl mt-0.5">{action.icon}</span>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-800 font-medium">{action.text}</p>
                                        <span
                                            className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded"
                                            style={{ color: sev.color, backgroundColor: `${sev.color}18` }}
                                        >
                                            {sev.label}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-5">
                    {showConsequences && (
                        <SplitScreenConsequences
                            consequences={selectedAction.consequences}
                            actionText={selectedAction.text}
                            severity={selectedAction.severity}
                        />
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={() => setSelectedAction(null)}
                            className="flex-1 border-2 border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-medium"
                        >
                            ← Valitse toisin
                        </button>
                        <button
                            onClick={() => onComplete(selectedAction.id, selectedAction.severity)}
                            className="flex-1 bg-slate-800 text-white py-3 rounded-xl text-sm font-semibold"
                        >
                            Jatka → Rewind
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
