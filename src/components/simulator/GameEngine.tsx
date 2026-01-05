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

    // Calculate theme based on Day
    const getTheme = (day: number) => {
        if (day <= 10) return "bg-blue-50/50";
        if (day <= 30) return "bg-slate-100";
        if (day <= 60) return "bg-slate-200 grayscale-[0.3]";
        return "bg-slate-900 text-slate-200 grayscale-[0.8]";
    };

    return (
        <div className={cn("min-h-screen flex flex-col transition-colors duration-1000", getTheme(currentPhase.day))}>

            {/* HUD / Verify accessible */}
            <header className="bg-white/95 backdrop-blur border-b sticky top-0 z-20 shadow-sm p-2 sm:p-4">
                <div className="container mx-auto max-w-6xl flex flex-wrap gap-2 md:gap-4 justify-between items-center">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <Badge variant="outline" className="bg-white/50 backdrop-blur gap-1.5 px-2.5 py-1 border-slate-200 text-xs sm:text-sm">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                            <span>Päivä {currentPhase.day}</span>
                            <span className="text-slate-300 mx-1">/</span>
                            <span className="text-slate-400">90</span>
                        </Badge>
                    </div>

                    <div className="flex flex-1 justify-start md:justify-end gap-2 min-w-0 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar snap-x items-center">
                        <StatBar icon={Brain} value={state.stats.selfEsteem} label="Itseluottamus" color="bg-indigo-500" isAnimating={changedStat === 'selfEsteem'} />
                        <StatBar icon={Users} value={state.stats.teamAcceptance} label="Hyväksyntä" color="bg-blue-500" isAnimating={changedStat === 'teamAcceptance'} />
                        <StatBar icon={Heart} value={state.stats.hope} label="Toivo" color="bg-rose-500" isAnimating={changedStat === 'hope'} />
                    </div>

                    <Button variant="ghost" size="icon" onClick={onExit} className="ml-0 sm:ml-2 shrink-0 text-slate-400 hover:text-red-500 w-10 h-10 sm:w-11 sm:h-11">
                        <span className="sr-only">Lopeta</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </Button>
                </div>
            </header>

            {/* Notification Toast */}
            {notification && (
                <div className="fixed bottom-4 left-4 right-4 md:auto md:bottom-8 md:right-8 z-50 animate-in slide-in-from-bottom-5 fade-in pointer-events-none">
                    <div className="bg-slate-900/90 backdrop-blur text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 justify-center md:justify-start">
                        <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span className="text-sm font-medium">{notification}</span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 container mx-auto max-w-5xl md:p-4 flex flex-col justify-start md:justify-center min-h-[calc(100vh-80px)]">
                <Card className="rounded-none md:rounded-xl border-x-0 md:border-x border-y-0 md:border-y border-slate-200/60 bg-white/95 backdrop-blur shadow-none md:shadow-xl p-4 sm:p-6 md:p-10 mb-0 md:mb-12 min-h-[calc(100vh-60px)] md:min-h-0">
                    {/* Scene Header */}
                    <div className="flex flex-wrap items-center gap-3 text-slate-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-4 md:mb-6">
                        {currentPhase.time && <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {currentPhase.time}</span>}
                        <span className="hidden md:inline">•</span>
                        {currentPhase.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {currentPhase.location}</span>}
                    </div>

                    {/* Narrative */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 mb-4 sm:mb-6 leading-tight">{currentPhase.title}</h2>

                    <div className="prose prose-base md:prose-lg text-slate-700 leading-relaxed whitespace-pre-line mb-6 md:mb-10 [&_p]:text-[17px] sm:[&_p]:text-lg max-w-none">
                        {currentPhase.content.includes("**Sinun näkökulmasi:**") ? (
                            <div className="space-y-4 sm:space-y-6">
                                {currentPhase.content.split('\n\n').map((section, idx) => {
                                    if (section.includes("**Sinun näkökulmasi:**")) {
                                        return (
                                            <div key={idx} className="bg-slate-50 p-4 sm:p-5 rounded-xl border-l-4 border-slate-900 shadow-sm">
                                                <div className="flex items-center gap-2 sm:gap-3 mb-2 font-bold text-slate-900 uppercase tracking-wide text-xs sm:text-sm">
                                                    <div className="p-1.5 sm:p-2 bg-slate-200 rounded-lg">
                                                        <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </div>
                                                    Sinun näkökulmasi
                                                </div>
                                                <p className="text-slate-800 text-base sm:text-lg">{section.replace(/\*\*Sinun näkökulmasi:\*\*/, "").trim()}</p>
                                            </div>
                                        );
                                    }
                                    if (section.includes("**Antin näkökulma")) {
                                        return (
                                            <div key={idx} className="bg-indigo-50 p-4 sm:p-5 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                                                <div className="flex items-center gap-2 sm:gap-3 mb-2 font-bold text-indigo-900 uppercase tracking-wide text-xs sm:text-sm">
                                                    <div className="p-1.5 sm:p-2 bg-indigo-200 rounded-lg">
                                                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </div>
                                                    Antin näkökulma (Uhrin ääni)
                                                </div>
                                                <p className="italic text-indigo-800 font-medium text-base sm:text-lg">"{section.replace(/\*\*Antin.+?\*\*:/, "").replace(/"/g, "").trim()}"</p>
                                            </div>
                                        );
                                    }
                                    if (section.includes("**Psykologinen analyysi:**")) {
                                        return (
                                            <div key={idx} className="bg-emerald-50 p-4 sm:p-5 rounded-xl border-l-4 border-emerald-500 shadow-sm">
                                                <div className="flex items-center gap-2 sm:gap-3 mb-2 font-bold text-emerald-900 uppercase tracking-wide text-xs sm:text-sm">
                                                    <div className="p-1.5 sm:p-2 bg-emerald-200 rounded-lg">
                                                        <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </div>
                                                    Psykologinen analyysi
                                                </div>
                                                <p className="text-emerald-800 text-base sm:text-lg">{section.replace("**Psykologinen analyysi:**", "").trim()}</p>
                                            </div>
                                        );
                                    }
                                    return <p key={idx} className="text-slate-700">{section}</p>;
                                })}
                            </div>
                        ) : (
                            currentPhase.content
                        )}
                    </div>

                    {/* Crisis Warning */}
                    {currentPhase.isCrisis && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 sm:gap-4 text-red-800">
                            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                            <p className="font-medium text-sm sm:text-base">Tilanne on eskaloitunut kriittiseksi. Tämä tallennetaan automaattisesti logiin.</p>
                        </div>
                    )}

                    {/* Choices */}
                    <div className="grid gap-3 pt-2">
                        {currentPhase.choices.map((choice) => (
                            <Button
                                key={choice.id}
                                onClick={() => handleChoice(choice)}
                                variant={choice.variant === 'crossed-out' ? "ghost" : "outline"}
                                className={cn(
                                    "h-auto py-3 sm:py-5 px-4 sm:px-6 justify-start text-left text-[15px] sm:text-lg transition-all group whitespace-normal break-words leading-snug shadow-sm active:scale-[0.98]",
                                    choice.variant === 'crossed-out'
                                        ? "opacity-60 bg-slate-100 hover:bg-slate-100 cursor-not-allowed line-through decoration-slate-400 decoration-2"
                                        : "hover:bg-slate-50 hover:border-slate-400/50 border-slate-200"
                                )}
                            >
                                <span className={cn(
                                    "hidden sm:flex w-8 h-8 rounded-full items-center justify-center mr-4 transition-colors text-sm font-bold shrink-0",
                                    choice.variant === 'crossed-out' ? "bg-slate-200 text-slate-400" : "bg-slate-100 group-hover:bg-slate-200 text-slate-500"
                                )}>
                                    {choice.variant === 'crossed-out' ? "🔒" : "➜"}
                                </span>
                                <span className="flex-1">
                                    {choice.text}
                                </span>
                            </Button>
                        ))}
                    </div>
                </Card>

                {/* Log Preview (Small) */}
                {state.logEntries.length > 0 && (
                    <div className="hidden md:block mt-8 text-center text-slate-400 text-xs text-mono px-4 pb-8">
                        Viimeisin merkintä: "{state.logEntries[state.logEntries.length - 1].note}"
                    </div>
                )}
            </main>
        </div>
    );
}

function StatBar({ icon: Icon, value, label, color, isAnimating }: any) {
    return (
        <div className={cn("flex flex-col gap-1.5 min-w-[120px] md:min-w-[100px] snap-center transition-transform", isAnimating && "animate-bounce")}>
            <div className="flex justify-between items-center text-[10px] md:text-xs text-slate-600 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                    <Icon className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-70" />
                    <span className="truncate">{label}</span>
                </span>
                <span className="opacity-50 font-mono hidden sm:inline">{value}%</span>
            </div>
            <div className="h-2 md:h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
                <div
                    className={cn("h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]", color, isAnimating && "brightness-125")}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
