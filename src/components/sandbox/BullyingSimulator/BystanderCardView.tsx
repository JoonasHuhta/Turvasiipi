'use client';

import React, { useState } from 'react';
import type { BystanderCard, BystanderScenario, InterventionType5D } from './bystander-types';

interface BystanderCardViewProps {
    card: BystanderCard;
    scenario: BystanderScenario;
    onClose: () => void;
}

const D_LABELS: Record<InterventionType5D, { label: string; icon: string; color: string }> = {
    distract: { label: 'Häiritse', icon: '🔀', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    delegate: { label: 'Delegoi', icon: '👋', color: 'bg-teal-100 text-teal-800 border-teal-300' },
    document: { label: 'Dokumentoi', icon: '📋', color: 'bg-slate-100 text-slate-800 border-slate-300' },
    delay: { label: 'Tue myöhemmin', icon: '💙', color: 'bg-pink-100 text-pink-800 border-pink-300' },
    direct: { label: 'Suora puuttuminen', icon: '🗣', color: 'bg-purple-100 text-purple-800 border-purple-300' },
};

const PROTECTION_ICONS: Record<string, string> = {
    'document-start': '📝',
    'tell-trusted': '🤝',
    'check-in-meri': '💬',
    'adjust-strategy': '🔄',
    'peer-support': '❤️',
};

export const BystanderCardView: React.FC<BystanderCardViewProps> = ({
    card,
    scenario,
    onClose,
}) => {
    const [copied, setCopied] = useState(false);
    const dInfo = D_LABELS[card.chosenD];

    const allProtections = [...card.selfProtection, ...card.victimSupport];
    const protectionActions = allProtections
        .map(id => scenario.safetyPlan.protectionActions.find(a => a.id === id))
        .filter(Boolean);

    const handleCopy = async () => {
        const text = [
            '🛡 OMA BYSTANDER-KORTTINI',
            `Strategia: ${dInfo.icon} ${dInfo.label}`,
            card.savedPhrase ? `Lauseeni: "${card.savedPhrase}"` : '',
            `Suojaudun: ${protectionActions.map(a => a?.label).join(', ')}`,
            `Harjoiteltu: ${scenario.title}`,
        ].filter(Boolean).join('\n');
        await navigator.clipboard.writeText(text).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="text-5xl">🎉</div>
                <h2 className="text-xl font-bold text-slate-900">Loistavaa suoritusta!</h2>
                <p className="text-sm text-slate-500">
                    Suoritit kaikki 5 osaa: <strong>{scenario.title}</strong>
                </p>
            </div>

            {/* The card */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 right-2 text-8xl">🛡</div>
                </div>

                <div className="relative space-y-5">
                    {/* Title */}
                    <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-indigo-200 mb-1">
                            OMA BYSTANDER-KORTTINI
                        </p>
                        <h3 className="text-lg font-bold">{scenario.title}</h3>
                    </div>

                    {/* Chosen strategy */}
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 space-y-1">
                        <p className="text-[10px] text-indigo-200 uppercase tracking-wide font-mono">Valitsin strategia</p>
                        <p className="text-lg font-bold">
                            {dInfo.icon} {dInfo.label}
                        </p>
                    </div>

                    {/* Saved phrase */}
                    {card.savedPhrase && (
                        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 space-y-1">
                            <p className="text-[10px] text-indigo-200 uppercase tracking-wide font-mono">Oma turvalauseeni</p>
                            <p className="text-sm italic">&ldquo;{card.savedPhrase}&rdquo;</p>
                        </div>
                    )}

                    {/* Protection actions */}
                    {protectionActions.length > 0 && (
                        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 space-y-2">
                            <p className="text-[10px] text-indigo-200 uppercase tracking-wide font-mono">Suojaan itseni & uhrin</p>
                            {protectionActions.map((action, i) => action && (
                                <div key={i} className="flex items-start gap-2">
                                    <span className="text-base flex-shrink-0">
                                        {PROTECTION_ICONS[action.id] ?? '✓'}
                                    </span>
                                    <p className="text-sm">{action.label}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Timestamp */}
                    <p className="text-[10px] text-indigo-300 text-right font-mono">
                        {new Date(card.completedAt).toLocaleDateString('fi-FI', {
                            day: 'numeric', month: 'long', year: 'numeric'
                        })}
                    </p>
                </div>
            </div>

            {/* Learning arc reminder */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Mitä harjoittelit</p>
                <div className="flex flex-wrap gap-2">
                    {['Tunnista', 'Säädä', 'Valitse', 'Sano', 'Suojaa'].map(step => (
                        <span key={step} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                            ✓ {step}
                        </span>
                    ))}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                    Jokainen harjoittelukerta madaltaa kynnystä puuttua oikeassa tilanteessa.
                    Korttisi on tallennettu automaattisesti.
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={handleCopy}
                    className="flex-1 py-2.5 border-2 border-slate-200 hover:border-slate-300 rounded-xl text-sm text-slate-700 font-medium transition-colors"
                >
                    {copied ? '✓ Kopioitu!' : '📋 Kopioi kortti'}
                </button>
                <button
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm text-white font-semibold transition-colors"
                >
                    Aloita uusi skenaario →
                </button>
            </div>
        </div>
    );
};
