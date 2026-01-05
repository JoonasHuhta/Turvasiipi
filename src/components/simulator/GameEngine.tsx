"use client";

import { useState, useEffect } from "react";
import { Phase, GameState, INITIAL_STATS, Choice } from "@/lib/simulator/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Assuming shadcn progress exists, or I'll use standard
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, Calendar, Clock, MapPin, AlertTriangle, FileText, Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameEngineProps {
    scenario: Record<string, Phase>;
    initialPhaseId: string;
    onExit: () => void;
    profession?: 'nurse' | 'teacher' | 'manager';
}

export function GameEngine({ scenario, initialPhaseId, onExit, profession = 'nurse' }: GameEngineProps) {
    const [state, setState] = useState<GameState>({
        currentPhaseId: initialPhaseId,
        profession: profession,
        stats: { ...INITIAL_STATS },
        logEntries: [],
        allies: [],
        history: [],
        isGameOver: false
    });

    const [notification, setNotification] = useState<string | null>(null);

    const [changedStat, setChangedStat] = useState<string | null>(null);

    const currentPhase = scenario[state.currentPhaseId];

    // Check for Endings
    if (state.currentPhaseId.startsWith('END_')) {
        // ... (keep existing ending logic, assuming no changes needed here for now or user didn't complain about ending screen layout specifically, but I should probably check width there too?)
        // Actually user complained about "simulaation käyttämisen kanssa" (using simulation), implying the main game loop.
        // Let's keep ending logic as is for now to minimize risk, but maybe update container widths later if needed.
        if (profession === 'manager' || state.currentPhaseId === 'END_MANAGER') {
            return (
                <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
                    <Card className="max-w-3xl w-full bg-slate-900 border-red-900/30 p-6 md:p-12 text-center space-y-6 shadow-2xl shadow-red-900/10">
                        {/* ... (rest of manager ending content) - minor padding tweak p-8->p-6 */}
                        <div className="text-6xl mb-4 grayscale opacity-50">
                            📉
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                            Simulaatio päättynyt
                        </h1>

                        <div className="prose prose-invert prose-lg mx-auto text-slate-400">
                            <p>
                                Olet nähnyt, miten "tehokas" johtaminen voi tuhota työyhteisön.
                                Pienet, rationalisoidut valinnat kasautuivat järjestelmäviaksi.
                            </p>
                        </div>

                        <div className="bg-red-950/30 p-4 md:p-6 rounded-xl text-left space-y-6 border border-red-900/30">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                Tuhon Anatomia
                            </h3>

                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Inhimillinen */}
                                <div className="space-y-2">
                                    <div className="text-xs text-red-300/60 uppercase font-semibold">Inhimillinen romahdus</div>
                                    <div className="text-lg font-medium text-red-200">Vakava työuupumus</div>
                                    <p className="text-xs text-red-300/70 leading-relaxed">
                                        Antti jäi 6 kk sairauslomalle. Kaksi muuta tiimiläistä on irtisanoutunut pelon ilmapiirin takia.
                                    </p>
                                </div>

                                {/* Taloudellinen */}
                                <div className="space-y-2">
                                    <div className="text-xs text-red-300/60 uppercase font-semibold">Taloudellinen isku</div>
                                    <div className="text-2xl font-mono text-white">~112 000 €</div>
                                    <div className="text-xs text-slate-500 space-y-1 bg-black/20 p-2 rounded">
                                        <div className="flex justify-between"><span>Sairauspoissaolot:</span> <span className="text-slate-400">35 000€</span></div>
                                        <div className="flex justify-between"><span>Rekrytointi (2 hlö):</span> <span className="text-slate-400">25 000€</span></div>
                                        <div className="flex justify-between"><span>Tuottavuusvaje:</span> <span className="text-slate-400">52 000€</span></div>
                                    </div>
                                </div>

                                {/* Mainehaitta */}
                                <div className="space-y-2">
                                    <div className="text-xs text-red-300/60 uppercase font-semibold">Mainehaitta</div>
                                    <div className="text-lg font-medium text-red-200">Korjaamaton vahinko</div>
                                    <p className="text-xs text-red-300/70 leading-relaxed">
                                        Sisäpiirin tiedot huonosta johtamisesta ovat levinneet. Rekrytointi on vaikeutunut ja brändimielikuva on romahtanut.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Button size="lg" variant="default" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700" onClick={onExit}>
                                Palaa etusivulle
                            </Button>
                            <Button size="lg" variant="outline" className="border-red-900/30 text-red-400 hover:bg-red-950/30 hover:text-red-300" onClick={() => window.location.reload()}>
                                Yritä uudelleen
                            </Button>
                        </div>
                    </Card>
                </div>
            );
        }

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
        // 0. Check for Crossed Out (Blocked) Choices
        if (choice.variant === 'crossed-out') {
            showNotification(choice.blockedReason || "Tämä valinta ei ole mahdollinen nykyisessä tilanteessa.");
            return;
        }

        // 1. Update Stats
        const newStats = { ...state.stats };
        let statChangedKey: string | null = null;

        if (choice.effect?.stats) {
            Object.keys(choice.effect.stats).forEach((key) => {
                const k = key as keyof typeof newStats;
                const val = choice.effect!.stats![k] || 0;
                if (val !== 0) {
                    newStats[k] = Math.max(0, Math.min(100, newStats[k] + val));
                    statChangedKey = k;
                }
            });
        }

        // Trigger animation if stat changed
        if (statChangedKey) {
            setChangedStat(statChangedKey);
            setTimeout(() => setChangedStat(null), 1000); // Reset after 1s
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

    // Calculate dynamic text size based on content length
    const getContentTextSize = (length: number, isMobile: boolean) => {
        if (length > 600) return isMobile ? "text-[13px] leading-tight" : "text-sm";
        if (length > 300) return isMobile ? "text-[14px] leading-snug" : "text-base";
        return isMobile ? "text-[16px] leading-normal" : "text-lg";
    };

    // Calculate theme based on Day
    const getTheme = (day: number) => {
        if (day <= 10) return "bg-blue-50/50";
        if (day <= 30) return "bg-slate-100";
        if (day <= 60) return "bg-slate-200 grayscale-[0.3]";
        return "bg-slate-900 text-slate-200 grayscale-[0.8]";
    };

    const isComplexPhase = currentPhase.content.includes("**Sinun näkökulmasi:**");
    const textSizeClass = getContentTextSize(currentPhase.content.length, true);

    return (
        <div className={cn("fixed inset-0 flex flex-col bg-white overflow-hidden transition-colors duration-1000", getTheme(currentPhase.day))}>

            {/* HUD - Fixed Top */}
            <header className="shrink-0 bg-white/95 backdrop-blur border-b z-20 shadow-sm px-3 py-2 flex items-center gap-2 h-14">
                <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar snap-x flex gap-3 pr-10 items-center">
                    <StatBar icon={Brain} value={state.stats.selfEsteem} label="Itseluottamus" color="bg-indigo-500" isAnimating={changedStat === 'selfEsteem'} />
                    <StatBar icon={Users} value={state.stats.teamAcceptance} label="Hyväksyntä" color="bg-blue-500" isAnimating={changedStat === 'teamAcceptance'} />
                    <StatBar icon={Heart} value={state.stats.hope} label="Toivo" color="bg-rose-500" isAnimating={changedStat === 'hope'} />
                </div>

                <Button variant="ghost" size="icon" onClick={onExit} className="absolute right-1 top-2 text-slate-400 hover:text-red-500 w-10 h-10">
                    <span className="sr-only">Lopeta</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </Button>
            </header>

            {/* Notification Toast */}
            {notification && (
                <div className="fixed top-16 left-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in pointer-events-none">
                    <div className="bg-slate-900/90 backdrop-blur text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 justify-center shadow-black/20">
                        <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span className="text-sm font-medium">{notification}</span>
                    </div>
                </div>
            )}

            {/* Main Layout: Flex Column */}
            <main className="flex-1 flex flex-col min-h-0 relative w-full max-w-lg mx-auto bg-white">

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto px-4 py-3 scale-text-container overscroll-contain">
                    {/* Scene Meta */}
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 px-1.5 py-0.5 h-5 text-[10px]">Päivä {currentPhase.day}</Badge>
                        {currentPhase.time && <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {currentPhase.time}</span>}
                    </div>

                    <h2 className="text-lg font-black text-slate-900 mb-3 leading-tight">{currentPhase.title}</h2>

                    <div className={cn("prose prose-slate max-w-none text-slate-800 pb-2", textSizeClass)}>
                        {isComplexPhase ? (
                            <div className="space-y-3">
                                {currentPhase.content.split('\n\n').map((section, idx) => {
                                    if (section.includes("**Sinun näkökulmasi:**")) {
                                        return (
                                            <div key={idx} className="bg-slate-50 p-3 rounded-lg border-l-2 border-slate-900">
                                                <div className="flex items-center gap-1.5 mb-1 font-bold text-slate-900 uppercase tracking-wide text-[10px]">
                                                    <Briefcase className="w-3 h-3" /> Sinun näkökulmasi
                                                </div>
                                                <p className="m-0">{section.replace(/\*\*Sinun näkökulmasi:\*\*/, "").trim()}</p>
                                            </div>
                                        );
                                    }
                                    if (section.includes("**Antin näkökulma")) {
                                        return (
                                            <div key={idx} className="bg-indigo-50 p-3 rounded-lg border-l-2 border-indigo-500">
                                                <div className="flex items-center gap-1.5 mb-1 font-bold text-indigo-900 uppercase tracking-wide text-[10px]">
                                                    <User className="w-3 h-3" /> Antin näkökulma
                                                </div>
                                                <p className="italic text-indigo-800 m-0">"{section.replace(/\*\*Antin.+?\*\*:/, "").replace(/"/g, "").trim()}"</p>
                                            </div>
                                        );
                                    }
                                    if (section.includes("**Psykologinen analyysi:**")) {
                                        return (
                                            <div key={idx} className="bg-emerald-50 p-3 rounded-lg border-l-2 border-emerald-500">
                                                <div className="flex items-center gap-1.5 mb-1 font-bold text-emerald-900 uppercase tracking-wide text-[10px]">
                                                    <Brain className="w-3 h-3" /> Psykologinen analyysi
                                                </div>
                                                <p className="text-emerald-800 m-0">{section.replace("**Psykologinen analyysi:**", "").trim()}</p>
                                            </div>
                                        );
                                    }
                                    return <p key={idx} className="mb-2 last:mb-0">{section}</p>;
                                })}
                            </div>
                        ) : (
                            currentPhase.content
                        )}

                        {currentPhase.isCrisis && (
                            <div className="mt-3 p-2 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-800 text-xs font-bold">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <p>Automaattinen logimerkintä: Kriisi</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Always Visible Choices - Fixed Bottom Container */}
                <div className="shrink-0 bg-white border-t border-slate-100 p-3 pb-safe z-10 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] w-full">
                    <div className={cn("grid gap-2", currentPhase.choices.length > 2 ? "grid-cols-1" : "grid-cols-1")}>
                        {currentPhase.choices.map((choice) => (
                            <Button
                                key={choice.id}
                                onClick={() => handleChoice(choice)}
                                variant={choice.variant === 'crossed-out' ? "ghost" : "default"}
                                className={cn(
                                    "w-full h-auto py-3 px-3 justify-start text-left bg-white text-slate-800 border-2 border-slate-200 shadow-[0_2px_0_theme(colors.slate.200)] hover:transform-none hover:bg-slate-50",
                                    "active:translate-y-[1px] active:shadow-none transition-all rounded-xl",
                                    choice.variant === 'crossed-out'
                                        ? "opacity-50 cursor-not-allowed shadow-none border-dashed bg-slate-50"
                                        : "hover:border-slate-300"
                                )}
                            >
                                <div className="flex items-center gap-3 w-full">
                                    <span className={cn(
                                        "flex items-center justify-center w-6 h-6 rounded-md shrink-0 font-bold border-2 text-xs",
                                        choice.variant === 'crossed-out' ? "bg-slate-100 border-slate-300 text-slate-400" : "bg-indigo-50 border-indigo-100 text-indigo-600"
                                    )}>
                                        {choice.variant === 'crossed-out' ? "🔒" : "➜"}
                                    </span>
                                    <span className="font-semibold text-sm leading-snug break-words line-clamp-2">
                                        {choice.text}
                                    </span>
                                </div>
                            </Button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatBar({ icon: Icon, value, label, color, isAnimating }: any) {
    return (
        <div className={cn("flex items-center gap-2 min-w-[100px] snap-center transition-all px-2 py-1 rounded-lg", isAnimating && "bg-slate-100 animate-pulse")}>
            <div className={cn("p-1.5 rounded-md shrink-0", color.replace('bg-', 'text-').replace('500', '600'), "bg-opacity-10 bg-current")}>
                <Icon className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-0.5">{label}</span>
                <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={cn("h-full rounded-full transition-all duration-500", color)}
                        style={{ width: `${value}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
