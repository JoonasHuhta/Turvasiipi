"use client";

import { useState, useEffect } from "react";
import { Phase, GameState, INITIAL_STATS, Choice } from "@/lib/simulator/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Assuming shadcn progress exists, or I'll use standard
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, Calendar, Clock, MapPin, AlertTriangle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameEngineProps {
    scenario: Record<string, Phase>;
    initialPhaseId: string;
    onExit: () => void;
}

export function GameEngine({ scenario, initialPhaseId, onExit }: GameEngineProps) {
    const [state, setState] = useState<GameState>({
        currentPhaseId: initialPhaseId,
        profession: 'nurse',
        stats: { ...INITIAL_STATS },
        logEntries: [],
        allies: [],
        history: [],
        isGameOver: false
    });

    const [notification, setNotification] = useState<string | null>(null);

    const currentPhase = scenario[state.currentPhaseId];

    // Check for Endings
    if (state.currentPhaseId.startsWith('END_')) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
                <Card className="max-w-2xl w-full bg-slate-800 border-slate-700 p-8 md:p-12 text-center space-y-8">
                    <div className="text-6xl mb-4">
                        {state.currentPhaseId === 'END_C' ? '🛡️' : '💔'}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        {state.currentPhaseId === 'END_A' && "Lopputulos: Uupumus"}
                        {state.currentPhaseId === 'END_B' && "Lopputulos: Irtisanoutuminen"}
                        {state.currentPhaseId === 'END_C' && "Lopputulos: Selviytyminen"}
                    </h1>

                    <div className="prose prose-invert prose-lg mx-auto">
                        {state.currentPhaseId === 'END_A' && (
                            <p>Jatkoit sinnittelyä ilman tukea. Terveytesi petti ennen kuin ehdit reagoida. Tämä on valitettavan yleinen tarina hoitoalalla.</p>
                        )}
                        {state.currentPhaseId === 'END_B' && (
                            <p>Päätit suojella itseäsi poistumalla tilanteesta. Se on rohkea teko, mutta samalla menetys alalle.</p>
                        )}
                        {state.currentPhaseId === 'END_C' && (
                            <p>Otit Turvasiiven käyttöösi. Dokumentointi antoi sinulle faktatietoa, ja yhteisön tuki voimaa. Taistelu ei ole ohi, mutta et ole enää yksin.</p>
                        )}
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl text-left space-y-2 border border-slate-700">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Sinun tarinasi tilastot</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-slate-500">Logimerkintöjä</div>
                                <div className="text-2xl font-mono">{state.logEntries.length} kpl</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500">Liittolaisia</div>
                                <div className="text-2xl font-mono">{state.allies.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Button size="lg" variant="default" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onExit}>
                            Palaa etusivulle
                        </Button>
                        <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700" onClick={() => window.location.reload()}>
                            Yritä uudelleen
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    if (!currentPhase) {
        return <div>Virhe: Vaihetta {state.currentPhaseId} ei löytynyt.</div>;
    }

    const handleChoice = (choice: Choice) => {
        // 1. Update Stats
        const newStats = { ...state.stats };
        if (choice.effect?.stats) {
            Object.keys(choice.effect.stats).forEach((key) => {
                const k = key as keyof typeof newStats;
                const val = choice.effect!.stats![k] || 0;
                newStats[k] = Math.max(0, Math.min(100, newStats[k] + val));
            });
        }

        // 2. Add Allies
        const newAllies = [...state.allies];
        if (choice.effect?.addAlly && !newAllies.includes(choice.effect.addAlly)) {
            newAllies.push(choice.effect.addAlly);
            showNotification(`Liittolainen löydetty: ${choice.effect.addAlly}`);
        }

        // 3. Log Entry
        const newLogEntries = [...state.logEntries];
        if (choice.effect?.logNote) {
            newLogEntries.push({
                day: currentPhase.day,
                timestamp: currentPhase.time || '12:00',
                note: choice.effect.logNote
            });
            showNotification("📝 Tapahtuma dokumentoitu automaattisesti");
        }

        // 4. Update State
        setState(prev => ({
            ...prev,
            stats: newStats,
            allies: newAllies,
            logEntries: newLogEntries,
            currentPhaseId: choice.nextPhaseId,
            history: [...prev.history, currentPhase.id]
        }));
    };

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    // Calculate theme based on Day
    const getTheme = (day: number) => {
        if (day <= 10) return "bg-blue-50/50";
        if (day <= 30) return "bg-slate-100";
        if (day <= 60) return "bg-slate-200 grayscale-[0.3]";
        return "bg-slate-900 text-slate-200 grayscale-[0.8]";
    };

    // Check for Endings
    if (state.currentPhaseId.startsWith('END_')) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
                <Card className="max-w-2xl w-full bg-slate-800 border-slate-700 p-8 md:p-12 text-center space-y-8">
                    <div className="text-6xl mb-4">
                        {state.currentPhaseId === 'END_C' ? '🛡️' : '💔'}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        {state.currentPhaseId === 'END_A' && "Lopputulos: Uupumus"}
                        {state.currentPhaseId === 'END_B' && "Lopputulos: Irtisanoutuminen"}
                        {state.currentPhaseId === 'END_C' && "Lopputulos: Selviytyminen"}
                    </h1>

                    <div className="prose prose-invert prose-lg mx-auto">
                        {state.currentPhaseId === 'END_A' && (
                            <p>Jatkoit sinnittelyä ilman tukea. Terveytesi petti ennen kuin ehdit reagoida. Tämä on valitettavan yleinen tarina hoitoalalla.</p>
                        )}
                        {state.currentPhaseId === 'END_B' && (
                            <p>Päätit suojella itseäsi poistumalla tilanteesta. Se on rohkea teko, mutta samalla menetys alalle.</p>
                        )}
                        {state.currentPhaseId === 'END_C' && (
                            <p>Otit Turvasiiven käyttöösi. Dokumentointi antoi sinulle faktatietoa, ja yhteisön tuki voimaa. Taistelu ei ole ohi, mutta et ole enää yksin.</p>
                        )}
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl text-left space-y-2 border border-slate-700">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Sinun tarinasi tilastot</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-slate-500">Logimerkintöjä</div>
                                <div className="text-2xl font-mono">{state.logEntries.length} kpl</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500">Liittolaisia</div>
                                <div className="text-2xl font-mono">{state.allies.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Button size="lg" variant="default" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onExit}>
                            Palaa etusivulle
                        </Button>
                        <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700" onClick={() => window.location.reload()}>
                            Yritä uudelleen
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    // Fallback for missing phase
    if (!currentPhase) {
        return <div>Virhe: Vaihetta {state.currentPhaseId} ei löytynyt.</div>;
    }

    return (
        <div className={cn("min-h-screen flex flex-col transition-colors duration-1000", getTheme(currentPhase.day))}>

            {/* HUD / Verify accessible */}
            <header className="bg-white/90 backdrop-blur border-b sticky top-0 z-10 shadow-sm p-4">
                <div className="container mx-auto max-w-5xl flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-500" />
                            Päivä {currentPhase.day} / 90
                        </div>
                        {currentPhase.day > 1 && (
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-emerald-500" />
                                {state.logEntries.length} merkintää
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-6 flex-1 justify-end max-w-xl">
                        <StatBar icon={Brain} value={state.stats.selfEsteem} label="Itseluottamus" color="bg-indigo-500" />
                        <StatBar icon={Users} value={state.stats.teamAcceptance} label="Hyväksyntä" color="bg-blue-500" />
                        <StatBar icon={Heart} value={state.stats.hope} label="Toivo" color="bg-rose-500" />
                    </div>

                    <Button variant="ghost" size="sm" onClick={onExit}>Lopeta</Button>
                </div>
            </header>

            {/* Notification Toast */}
            {notification && (
                <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-5 fade-in">
                    <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        {notification}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 container mx-auto max-w-4xl p-4 md:py-12 flex flex-col justify-center">
                <Card className="p-8 md:p-12 shadow-xl border-slate-200/60 bg-white/95 backdrop-blur">
                    {/* Scene Header */}
                    <div className="flex items-center gap-3 text-slate-400 text-sm font-medium uppercase tracking-wider mb-6">
                        {currentPhase.time && <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {currentPhase.time}</span>}
                        <span>•</span>
                        {currentPhase.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {currentPhase.location}</span>}
                    </div>

                    {/* Narrative */}
                    <h2 className="text-3xl font-black text-slate-800 mb-6">{currentPhase.title}</h2>

                    <div className="prose prose-lg text-slate-600 leading-relaxed whitespace-pre-line mb-12">
                        {currentPhase.content}
                    </div>

                    {/* Crisis Warning */}
                    {currentPhase.isCrisis && (
                        <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-4 text-red-800">
                            <AlertTriangle className="w-6 h-6 shrink-0" />
                            <p className="font-medium text-sm">Tilanne on eskaloitunut kriittiseksi. Tämä tallennetaan automaattisesti logiin.</p>
                        </div>
                    )}

                    {/* Choices */}
                    <div className="grid gap-4">
                        {currentPhase.choices.map((choice) => (
                            <Button
                                key={choice.id}
                                onClick={() => handleChoice(choice)}
                                variant="outline"
                                className="h-auto py-6 px-6 justify-start text-left text-lg hover:bg-slate-50 hover:border-slate-300 transition-all group"
                            >
                                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-4 group-hover:bg-slate-200 transition-colors text-sm font-bold text-slate-500">
                                    {/* A/B/C logic could go here */}
                                    ➜
                                </span>
                                {choice.text}
                            </Button>
                        ))}
                    </div>
                </Card>

                {/* Log Preview (Small) */}
                {state.logEntries.length > 0 && (
                    <div className="mt-8 text-center text-slate-400 text-xs text-mono">
                        Viimeisin merkintä: "{state.logEntries[state.logEntries.length - 1].note}"
                    </div>
                )}
            </main>
        </div>
    );
}

function StatBar({ icon: Icon, value, label, color }: any) {
    return (
        <div className="flex flex-col gap-1 w-24 md:w-32">
            <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1"><Icon className="w-3 h-3" /> {label}</span>
                <span>{value}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={cn("h-full transition-all duration-500", color)}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
