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
    profession?: 'nurse' | 'teacher' | 'manager' | 'neuro';
    statConfig?: StatConfigItem[];
}

export interface StatConfigItem {
    id: keyof GameState['stats'];
    label: string;
    description: string;
    icon: any;
    color: string;
}

export function GameEngine({ scenario, initialPhaseId, onExit, profession = 'nurse', statConfig }: GameEngineProps) {
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
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const currentPhase = scenario[state.currentPhaseId];

    // Check for Endings
    if (state.currentPhaseId.startsWith('END_')) {

        // --- NEURO ENDING ---
        if (profession === 'neuro') {
            const isBurnout = state.currentPhaseId === 'END_BURNOUT';
            const isNewStart = state.currentPhaseId === 'END_NEW_START';

            return (
                <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
                    <Card className="max-w-3xl w-full bg-slate-900 border-indigo-900/30 p-6 md:p-12 text-center space-y-8 shadow-2xl shadow-indigo-900/10">
                        <div className="text-6xl mb-4 animate-in zoom-in spin-in-3 duration-700">
                            {isBurnout ? '🔋' : (isNewStart ? '🌟' : '🧩')}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                            {isBurnout ? "Päivä päättyi uupumiseen" : (isNewStart ? "Uusi alku" : "Päivä pulkassa")}
                        </h1>

                        <div className="prose prose-invert prose-lg mx-auto text-slate-300 leading-relaxed">
                            <p>
                                {isBurnout
                                    ? "Lopulta maski putosi. Jatkuva yrittäminen sopeutua muuttiin joka ei jousta, vei voimasi. Tämä ei ole epäonnistuminen, vaan merkki siitä, että ympäristön on muututtava."
                                    : "Selvisit päivästä. Olet tehnyt lukemattomia näkymättömiä valintoja säästääksesi energiaasi ja tullaksesi ymmärretyksi."}
                            </p>
                        </div>

                        {/* FINAL STATS GRID */}
                        <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center justify-center gap-2">
                                <Brain className="w-4 h-4" />
                                Päivän saldot
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {statConfig?.map(stat => (
                                    <div key={stat.id} className="flex flex-col items-center gap-2">
                                        <div className={cn("p-2 rounded-lg bg-opacity-20 mb-1", stat.color.replace('bg-', 'bg-').replace('500', '900'), stat.color.replace('bg-', 'text-').replace('500', '400'))}>
                                            <stat.icon className="w-5 h-5" />
                                        </div>
                                        <div className="text-2xl font-mono font-bold">{state.stats[stat.id] || 0}%</div>
                                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Button size="lg" variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold" onClick={onExit}>
                                Palaa Neuromoninaisuus-sivulle
                            </Button>
                            <Button size="lg" variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800" onClick={() => window.location.reload()}>
                                Yritä uudelleen
                            </Button>
                        </div>
                    </Card>
                </div>
            );
        }

        // --- MANAGER ENDING ---
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

        // --- GENERIC ENDING (Nurse/Teacher) ---
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

    // Dynamic button text size
    const getButtonTextSize = (length: number) => {
        if (length > 100) return "text-xs";
        if (length > 60) return "text-[13px]";
        return "text-sm";
    };

    // Calculate theme based on Day
    const getTheme = (day: number) => {
        if (day <= 10) return "bg-slate-50";
        if (day <= 30) return "bg-slate-100";
        return "bg-slate-100";
    };

    const isComplexPhase = currentPhase.content.includes("**Sinun näkökulmasi:**");
    const textSizeClass = getContentTextSize(currentPhase.content.length, true);

    // FIX: Added z-[100] to cover global layout elements (Navbar) completely.
    return (
        <div className={cn("fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-slate-50 font-sans", getTheme(currentPhase.day))}>

            {/* HEADER: Fixed top bar with App Name & Stats */}
            <header className="shrink-0 h-14 bg-white border-b px-4 flex items-center justify-between z-30 shadow-sm relative select-none">
                <div className="flex items-center gap-2">
                    <span className="font-black text-slate-800 tracking-tight text-base">Simulaatio</span>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 px-1.5 py-0.5 text-[10px] font-mono border border-slate-200">
                        Päivä {currentPhase.day}
                    </Badge>
                </div>

                <div className="flex items-center gap-3">
                    {/* Compact Stat Bars (Clickable for Help) */}
                    <div
                        className="flex gap-2 cursor-pointer active:scale-95 transition-transform p-1 rounded-md hover:bg-slate-50"
                        onClick={() => setIsHelpOpen(true)}
                    >
                        {statConfig ? (
                            statConfig.map(stat => (
                                <MiniStatBar key={stat.id} icon={stat.icon} value={state.stats[stat.id]} color={stat.color} />
                            ))
                        ) : (
                            <>
                                <MiniStatBar icon={Brain} value={state.stats.selfEsteem} color="bg-indigo-500" />
                                <MiniStatBar icon={Users} value={state.stats.teamAcceptance} color="bg-blue-500" />
                                <MiniStatBar icon={Heart} value={state.stats.hope} color="bg-rose-500" />
                            </>
                        )}
                    </div>

                    <Button variant="ghost" size="icon" onClick={() => setIsHelpOpen(true)} className="text-slate-400 hover:text-indigo-600 w-8 h-8 -mr-1">
                        <span className="sr-only">Ohje</span>
                        <div className="border-2 border-slate-300 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-slate-500">?</div>
                    </Button>

                    <Button variant="ghost" size="icon" onClick={onExit} className="text-slate-400 hover:text-red-500 w-8 h-8 -mr-2">
                        <span className="sr-only">Lopeta</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </Button>
                </div>
            </header>

            {/* HELP MODAL */}
            {isHelpOpen && (
                <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setIsHelpOpen(false)}>
                    <div className="bg-white w-full max-w-xs rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        <div className="bg-slate-50 border-b p-4 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900">Mitä mittarit tarkoittavat?</h3>
                            <Button variant="ghost" size="sm" onClick={() => setIsHelpOpen(false)} className="h-6 w-6 p-0 rounded-full">✕</Button>
                        </div>
                        <div className="p-4 space-y-4">
                            {statConfig ? (
                                statConfig.map(stat => (
                                    <div key={stat.id} className="flex items-center gap-3">
                                        <div className={cn("p-2 rounded-lg bg-opacity-20", stat.color.replace('bg-', 'text-').replace('500', '600'), stat.color.replace('bg-', 'bg-').replace('500', '100'))}>
                                            <stat.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-800">{stat.label}</div>
                                            <div className="text-xs text-slate-500">{stat.description}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Brain className="w-5 h-5" /></div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-800">Itseluottamus</div>
                                            <div className="text-xs text-slate-500">Sinun uskosi omiin kykyihisi johtajana.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Users className="w-5 h-5" /></div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-800">Tiimihenki & Hyväksyntä</div>
                                            <div className="text-xs text-slate-500">Miten tiimi ja Antti suhtautuvat sinuun.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Heart className="w-5 h-5" /></div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-800">Toivo & Jaksaminen</div>
                                            <div className="text-xs text-slate-500">Antin ja työyhteisön henkinen jaksaminen.</div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 border border-slate-100 mt-2">
                                💡 <strong>Vinkki:</strong> Valintasi vaikuttavat mittareihin. Yritä tasapainoilla tulosten ja inhimillisyyden välillä.
                            </div>
                        </div>
                        <div className="p-3 bg-slate-50 border-t">
                            <Button onClick={() => setIsHelpOpen(false)} className="w-full">Ymmärretty</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* NOTIFICATION TOAST */}
            {notification && (
                <div className="absolute top-16 left-0 right-0 z-40 animate-in slide-in-from-top-2 fade-in duration-300 pointer-events-none flex justify-center px-4 pt-2">
                    <div className="bg-slate-800/95 backdrop-blur text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-medium border border-slate-700">
                        <span className="text-emerald-400">ℹ️</span>
                        <span>{notification}</span>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT: Centered Vertically */}
            <main className="flex-1 overflow-y-auto w-full max-w-lg mx-auto relative overscroll-contain no-scrollbar">
                <div className="min-h-full flex flex-col justify-center p-5 pb-8 transition-all">

                    {/* Scene Meta Info */}
                    {(currentPhase.time || currentPhase.location) && (
                        <div className="flex items-center justify-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest opacity-80 mb-3">
                            {currentPhase.time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {currentPhase.time}</span>}
                            {currentPhase.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {currentPhase.location}</span>}
                        </div>
                    )}

                    {/* Title */}
                    <h2 className="text-lg md:text-xl font-black text-slate-900 text-center leading-tight mb-4">
                        {currentPhase.title}
                    </h2>

                    {/* Content Block */}
                    <div className={cn("prose prose-slate max-w-none text-slate-700 text-center mx-auto transition-all", textSizeClass)}>
                        {isComplexPhase ? (
                            <div className="space-y-3 text-left">
                                {currentPhase.content.split('\n\n').map((section, idx) => {
                                    if (section.includes("**Sinun näkökulmasi:**")) {
                                        return (
                                            <div key={idx} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                                <div className="flex items-center gap-1.5 mb-1 font-bold text-slate-900 uppercase tracking-wide text-[10px]">
                                                    <Briefcase className="w-3 h-3" /> Sinun näkökulmasi
                                                </div>
                                                <p className="m-0 text-slate-800">{section.replace(/\*\*Sinun näkökulmasi:\*\*/, "").trim()}</p>
                                            </div>
                                        );
                                    }
                                    if (section.includes("**Antin näkökulma")) {
                                        return (
                                            <div key={idx} className="bg-white p-3 rounded-lg border-l-2 border-indigo-400 shadow-sm">
                                                <div className="flex items-center gap-1.5 mb-1 font-bold text-indigo-900 uppercase tracking-wide text-[10px]">
                                                    <User className="w-3 h-3" /> Antin näkökulma
                                                </div>
                                                <p className="italic text-indigo-800 m-0">"{section.replace(/\*\*Antin.+?\*\*:/, "").replace(/"/g, "").trim()}"</p>
                                            </div>
                                        );
                                    }
                                    if (section.includes("**Psykologinen analyysi:**")) {
                                        return (
                                            <div key={idx} className="bg-white p-3 rounded-lg border-l-2 border-emerald-400 shadow-sm">
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
                            // Simple text content
                            <p className="whitespace-pre-line">{currentPhase.content}</p>
                        )}

                        {currentPhase.isCrisis && (
                            <div className="mt-4 p-2.5 bg-red-50/80 border border-red-100 rounded-lg flex items-center justify-center gap-2 text-red-800 text-xs font-bold">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <span>Kriisi merkitty logiin</span>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* FOOTER: Fixed Actions */}
            <footer className="shrink-0 bg-white border-t border-slate-100 p-3 pb-6 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                <div className="max-w-lg mx-auto w-full flex flex-col gap-2">
                    {currentPhase.choices.map((choice) => (
                        <Button
                            key={choice.id}
                            onClick={() => handleChoice(choice)}
                            disabled={choice.variant === 'crossed-out'}
                            variant={choice.variant === 'crossed-out' ? "ghost" : "default"}
                            className={cn(
                                "w-full min-h-[56px] h-auto py-3 px-3 justify-between text-left transition-all active:scale-[0.99] group",
                                // Wrappings and alignment
                                "whitespace-normal break-words items-center",
                                choice.variant === 'crossed-out'
                                    ? "bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 cursor-not-allowed"
                                    : "bg-white border-2 border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-[0_2px_0_#e2e8f0] active:translate-y-[2px] active:shadow-none"
                            )}
                        >
                            <span className={cn(
                                "font-bold leading-tight tracking-tight flex-1 mr-2",
                                getButtonTextSize(choice.text.length)
                            )}>
                                {choice.text}
                            </span>

                            {choice.variant === 'crossed-out' ? (
                                <span className="text-lg opacity-50 grayscale shrink-0">🔒</span>
                            ) : (
                                <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all text-indigo-500 font-bold">➜</span>
                            )}
                        </Button>
                    ))}
                </div>
            </footer>

        </div>
    );
}

// Compact Stat Bar for Header
function MiniStatBar({ icon: Icon, value, color }: any) {
    return (
        <div className="flex flex-col gap-0.5 items-center justify-center w-8 group relative">
            <Icon className="w-3 h-3 text-slate-400 mb-0.5" />
            <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={cn("absolute inset-y-0 left-0 transition-all duration-500", color)}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

// Original StatBar kept just in case but likely unused now
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

