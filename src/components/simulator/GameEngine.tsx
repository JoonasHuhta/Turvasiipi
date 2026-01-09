"use client";

import { useState, useEffect } from "react";
import { Phase, GameState, INITIAL_STATS, Choice } from "@/lib/simulator/types";
import { useProgress } from "@/context/ProgressContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Assuming shadcn progress exists, or I'll use standard
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, Calendar, Clock, MapPin, AlertTriangle, FileText, Briefcase, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface GameEngineProps {
    scenario: Record<string, Phase>;
    initialPhaseId: string;
    onExit: () => void;
    profession?: 'nurse' | 'teacher' | 'manager' | 'neuro' | 'youth';
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
    const { completeModule } = useProgress();
    const { t } = useLanguage();
    const [state, setState] = useState<GameState>({
        currentPhaseId: initialPhaseId,
        profession: profession,
        stats: { ...INITIAL_STATS },
        logEntries: [],
        allies: [],
        history: [],
        isGameOver: false
    });

    useEffect(() => {
        if (state.currentPhaseId.startsWith('END_')) {
            const moduleId = `sim_${state.profession}`;
            completeModule(moduleId);
        }
    }, [state.currentPhaseId, state.profession, completeModule]);

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
                <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
                    <Card className="max-w-3xl w-full bg-slate-900 border-indigo-900/30 p-6 md:p-12 text-center space-y-8 shadow-2xl shadow-indigo-900/10 relative">
                        <div className="text-6xl mb-4 animate-in zoom-in spin-in-3 duration-700">
                            {isBurnout ? '🔋' : (isNewStart ? '🌟' : '🧩')}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
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
                                        <div className="text-2xl font-mono font-bold text-white">{state.stats[stat.id] || 0}%</div>
                                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Button size="lg" variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-full px-8" onClick={onExit}>
                                Palaa Neuromoninaisuus-sivulle
                            </Button>
                            <Button size="lg" variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800 h-12 rounded-full px-8" onClick={() => window.location.reload()}>
                                Yritä uudelleen
                            </Button>
                        </div>
                    </Card>
                </div>
            );
        }


        // --- YOUTH ENDING (New) ---
        if (profession === 'youth') {
            const isGrowth = state.currentPhaseId === 'END_GROWTH';
            const isBurnout = state.currentPhaseId === 'END_BURNOUT';

            return (
                <div className="fixed inset-0 z-[100] bg-slate-50 text-slate-900 flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
                    <Card className="max-w-2xl w-full border-0 shadow-2xl overflow-hidden bg-white relative">
                        <div className={cn("h-3 w-full", isGrowth ? "bg-emerald-500" : "bg-rose-500")} />

                        <div className="p-8 md:p-12 text-center space-y-8">
                            <div className="text-6xl mb-4 animate-in zoom-in duration-500">
                                {isGrowth ? '🌱' : '📉'}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                                {isGrowth ? "Toimijuus palautettu" : (isBurnout ? "Lopputulos: Uupumus" : "Lopputulos: Leimautuminen")}
                            </h1>

                            <div className="prose prose-slate prose-lg mx-auto text-slate-600 leading-relaxed">
                                {isGrowth && (
                                    <p>
                                        <strong>Onneksi olkoon.</strong> Tämä oli vaikein mahdollinen valinta. Kieltäydyit ottamasta syytä niskoillesi asiasta,
                                        joka kuului johdon vastuulle. Vaikka tilanne oli epämukava, säilytit itsekunnioituksesi.
                                        Tämä taito suojaa sinua koko loppu-urasi ajan.
                                    </p>
                                )}
                                {isBurnout && (
                                    <p>
                                        Jäit odottamaan, että tilanne paranisi itsestään. Valitettavasti myrkyllisessä ympäristössä hiljaisuus tulkitaan luvaksi jatkaa.
                                        Moni nuori uupuu juuri näin. Muista: sinulla on lupa lähteä.
                                    </p>
                                )}
                                {!isGrowth && !isBurnout && (
                                    <p>
                                        Annoit tunteiden viedä. Se on inhimillistä, mutta valitettavasti tässä ympäristössä se antoi heille aseen sinua vastaan.
                                        Seuraavalla kerralla: kirjaa faktat, ja puhu rakenteista.
                                    </p>
                                )}
                            </div>

                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-left">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                                    <Brain className="w-4 h-4" />
                                    Oppimiskokemus
                                </h3>
                                <div className="space-y-3 text-sm text-slate-700">
                                    <p>✅ <strong>Tärkein oppi:</strong> Jos työpaikka vaatii sinua kestämään huonoa kohtelua, vika ei ole sinussa.</p>
                                    <p>🛡️ <strong>Suojakeino:</strong> Dokumentoi aina perehdytyksen puutteet sähköpostiin ("Varmistan vain, että ymmärsin oikein...").</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-full px-8" onClick={onExit}>
                                    Palaa Nuoret-sivulle
                                </Button>
                                <Button size="lg" variant="outline" className="h-12 rounded-full px-8" onClick={() => window.location.reload()}>
                                    Kokeile toisella valinnalla
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            );
        }

        // --- MANAGER ENDING ---
        if (profession === 'manager' || state.currentPhaseId === 'END_MANAGER') {
            return (
                <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
                    <Card className="max-w-3xl w-full bg-slate-900 border-red-900/30 p-6 md:p-12 text-center space-y-6 shadow-2xl shadow-red-900/10 relative">
                        <div className="text-6xl mb-4 grayscale opacity-50">
                            📉
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
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
                            <Button size="lg" variant="default" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 h-12 rounded-full px-8" onClick={onExit}>
                                Palaa etusivulle
                            </Button>
                            <Button size="lg" variant="outline" className="border-red-900/30 text-red-400 hover:bg-red-950/30 hover:text-red-300 h-12 rounded-full px-8" onClick={() => window.location.reload()}>
                                Yritä uudelleen
                            </Button>
                        </div>
                    </Card>
                </div>
            );
        }

        // --- GENERIC ENDING (Nurse/Teacher) ---
        return (
            <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
                <Card className="max-w-2xl w-full bg-slate-900 border-white/10 p-8 md:p-12 text-center space-y-8 shadow-2xl relative">
                    <div className="text-6xl mb-4 animate-in zoom-in duration-700">
                        {state.currentPhaseId === 'END_C' ? '🛡️' : '💔'}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                        {state.currentPhaseId === 'END_A' && "Lopputulos: Uupumus"}
                        {state.currentPhaseId === 'END_B' && "Lopputulos: Irtisanoutuminen"}
                        {state.currentPhaseId === 'END_C' && "Lopputulos: Selviytyminen"}
                    </h1>

                    <div className="prose prose-invert prose-lg mx-auto text-slate-300">
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

                    <div className="bg-white/5 p-6 rounded-2xl text-left space-y-2 border border-white/5 backdrop-blur-sm shadow-inner">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Sinun tarinasi tilastot
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Logimerkintöjä</div>
                                <div className="text-4xl font-black text-white">{state.logEntries.length}<span className="text-lg text-slate-700 ml-2">kpl</span></div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Liittolaisia</div>
                                <div className="text-4xl font-black text-white">{state.allies.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Button size="lg" variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-full px-8 font-bold" onClick={onExit}>
                            Palaa etusivulle
                        </Button>
                        <Button size="lg" variant="outline" className="border-white/10 text-slate-400 hover:bg-white/5 h-12 rounded-full px-8" onClick={() => window.location.reload()}>
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

    // Calculate theme based on Day and stats
    const getBgColor = (day: number) => {
        if (state.currentPhaseId.startsWith('END_')) return "bg-slate-950";
        if (day <= 10) return "bg-slate-50";
        if (day <= 30) return "bg-slate-100";
        return "bg-slate-200";
    };

    const isComplexPhase = currentPhase.content.includes("**Sinun näkökulmasi:**");
    const textSizeClass = getContentTextSize(currentPhase.content.length, true);

    // Stress level calculation (0-1)
    const selfEsteem = state.stats.selfEsteem || 50;
    const stressLevel = Math.max(0, (100 - selfEsteem) / 100);

    return (
        <div className={cn("fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden font-sans transition-colors duration-1000", getBgColor(currentPhase.day))}>

            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-0 left-1/4 w-full h-full bg-indigo-500/5 rounded-full blur-[120px] transition-all duration-1000"
                    style={{ opacity: 0.1 + stressLevel * 0.2, transform: `scale(${1 + stressLevel})` }}
                />
                <div
                    className="absolute bottom-0 right-1/4 w-full h-full bg-rose-500/5 rounded-full blur-[120px] transition-all duration-1000"
                    style={{ opacity: stressLevel * 0.3 }}
                />

                {/* Stress Vignette */}
                <div
                    className="absolute inset-0 transition-opacity duration-1000 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.1)] md:shadow-[inset_0_0_300px_rgba(0,0,0,0.1)]"
                    style={{ opacity: stressLevel, boxShadow: `inset 0 0 ${100 + stressLevel * 200}px rgba(190, 18, 60, ${0.1 * stressLevel})` }}
                />
            </div>

            {/* HEADER: Glassmorphic top bar */}
            <header className="shrink-0 h-16 bg-white/70 backdrop-blur-xl border-b border-white/20 px-4 flex items-center justify-between z-30 shadow-sm relative select-none">
                <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 tracking-tighter text-lg uppercase">{t('nav.simulation')}</span>
                    <div className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        Päivä {currentPhase.day}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Compact Stat Bars */}
                    <div
                        className="flex gap-2.5 cursor-pointer active:scale-95 transition-transform p-1.5 rounded-xl hover:bg-white/50"
                        onClick={() => setIsHelpOpen(true)}
                    >
                        {statConfig ? (
                            statConfig.map(stat => (
                                <MiniStatBar key={stat.id} icon={stat.icon} value={state.stats[stat.id]} color={stat.color} />
                            ))
                        ) : (
                            <>
                                <MiniStatBar icon={Brain} value={state.stats.selfEsteem} color="bg-indigo-500" />
                                <MiniStatBar icon={Users} value={state.stats.teamAcceptance} color="bg-cyan-500" />
                                <MiniStatBar icon={Heart} value={state.stats.hope} color="bg-rose-500" />
                            </>
                        )}
                    </div>

                    <Button variant="ghost" size="icon" onClick={onExit} className="text-slate-400 hover:text-red-500 w-8 h-8 transition-colors">
                        <span className="sr-only">Lopeta</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </Button>
                </div>
            </header>

            {/* HELP MODAL (kept same logic but styled better) */}
            {isHelpOpen && (
                <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setIsHelpOpen(false)}>
                    <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                        <div className="bg-slate-50 border-b p-6">
                            <h3 className="font-black text-slate-900 uppercase tracking-tight">Voimavarat</h3>
                        </div>
                        <div className="p-6 space-y-5">
                            {statConfig ? (
                                statConfig.map(stat => (
                                    <div key={stat.id} className="flex items-center gap-4">
                                        <div className={cn("p-3 rounded-xl", stat.color.replace('bg-', 'text-').replace('500', '600'), stat.color.replace('bg-', 'bg-').replace('500', '100'))}>
                                            <stat.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-black text-sm text-slate-900 uppercase tracking-tight">{stat.label}</div>
                                            <div className="text-xs text-slate-500 leading-relaxed font-medium">{stat.description}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl"><Brain className="w-6 h-6" /></div>
                                        <div>
                                            <div className="font-black text-sm text-slate-900 uppercase tracking-tight">Itseluottamus</div>
                                            <div className="text-xs text-slate-500 leading-relaxed font-medium">Uskosi omiin kykyihisi ja oikeuksiisi.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl"><Users className="w-6 h-6" /></div>
                                        <div>
                                            <div className="font-black text-sm text-slate-900 uppercase tracking-tight">Hyväksyntä</div>
                                            <div className="text-xs text-slate-500 leading-relaxed font-medium">Miten työyhteisö suhtautuu sinuun.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-rose-100 text-rose-600 rounded-xl"><Heart className="w-6 h-6" /></div>
                                        <div>
                                            <div className="font-black text-sm text-slate-900 uppercase tracking-tight">Jaksaminen</div>
                                            <div className="text-xs text-slate-500 leading-relaxed font-medium">Henkinen ja fyysinen kestävyytesi.</div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="p-4 bg-slate-50 border-t">
                            <Button onClick={() => setIsHelpOpen(false)} className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-xs">Jatka simulaatiota</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* NOTIFICATION TOAST */}
            {notification && (
                <div className="absolute top-20 left-0 right-0 z-40 animate-in slide-in-from-top-4 fade-in duration-500 pointer-events-none flex justify-center px-4">
                    <div className="bg-slate-900/90 backdrop-blur text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-black uppercase tracking-widest border border-white/10">
                        <span className="text-indigo-400">⚡</span>
                        <span>{notification}</span>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto w-full max-w-lg mx-auto relative overscroll-contain no-scrollbar z-10">
                <div className="min-h-full flex flex-col justify-center p-6 pb-12 transition-all">

                    {/* Scene Meta Info */}
                    {(currentPhase.time || currentPhase.location) && (
                        <div className="flex items-center justify-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-60">
                            {currentPhase.time && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {currentPhase.time}</span>}
                            {currentPhase.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {currentPhase.location}</span>}
                        </div>
                    )}

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center leading-[1.1] mb-8 uppercase tracking-tighter">
                        {currentPhase.title}
                    </h2>

                    {/* Content Block */}
                    <div className={cn("prose prose-slate max-w-none text-slate-800 text-center mx-auto transition-all", textSizeClass)}>
                        {isComplexPhase ? (
                            <div className="space-y-4 text-left">
                                {currentPhase.content.split('\n\n').map((section, idx) => {
                                    if (section.includes("**Sinun näkökulmasi:**")) {
                                        return (
                                            <div key={idx} className="bg-white/60 backdrop-blur-sm p-5 rounded-3xl border border-white shadow-sm">
                                                <div className="flex items-center gap-2 mb-2 font-black text-slate-900 uppercase tracking-widest text-[10px]">
                                                    <Briefcase className="w-3.5 h-3.5 text-indigo-500" /> Sinun näkökulmasi
                                                </div>
                                                <p className="m-0 text-slate-900 font-medium leading-relaxed">{section.replace(/\*\*Sinun näkökulmasi:\*\*/, "").trim()}</p>
                                            </div>
                                        );
                                    }
                                    if (section.includes("**Antin näkökulma")) {
                                        return (
                                            <div key={idx} className="bg-white/40 backdrop-blur-sm p-5 rounded-3xl border-l-4 border-indigo-500 shadow-sm">
                                                <div className="flex items-center gap-2 mb-2 font-black text-indigo-900 uppercase tracking-widest text-[10px]">
                                                    <User className="w-3.5 h-3.5 text-indigo-500" /> Antin näkökulma
                                                </div>
                                                <p className="italic text-indigo-900 m-0 font-medium leading-relaxed">"{section.replace(/\*\*Antin.+?\*\*:/, "").replace(/"/g, "").trim()}"</p>
                                            </div>
                                        );
                                    }
                                    if (section.includes("**Psykologinen analyysi:**")) {
                                        return (
                                            <div key={idx} className="bg-emerald-50/50 backdrop-blur-sm p-5 rounded-3xl border-l-4 border-emerald-500 shadow-sm">
                                                <div className="flex items-center gap-2 mb-2 font-black text-emerald-900 uppercase tracking-widest text-[10px]">
                                                    <Brain className="w-3.5 h-3.5 text-emerald-500" /> Psykologinen analyysi
                                                </div>
                                                <p className="text-emerald-900 m-0 font-medium leading-relaxed">{section.replace("**Psykologinen analyysi:**", "").trim()}</p>
                                            </div>
                                        );
                                    }
                                    return <p key={idx} className="mb-4 last:mb-0 leading-relaxed font-medium">{section}</p>;
                                })}
                            </div>
                        ) : (
                            // Simple text content
                            <p className="whitespace-pre-line leading-relaxed font-medium text-lg">{currentPhase.content}</p>
                        )}

                        {currentPhase.isCrisis && (
                            <div className="mt-8 p-4 bg-red-600 text-white rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest animate-pulse shadow-lg shadow-red-500/20">
                                <AlertTriangle className="w-5 h-5 shrink-0" />
                                <span>KRIISI MERKITTY RAporttiin</span>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* FOOTER: Fixed Actions */}
            <footer className="shrink-0 bg-white/80 backdrop-blur-2xl border-t border-white/20 p-4 pb-8 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="max-w-lg mx-auto w-full flex flex-col gap-3">
                    {currentPhase.choices.map((choice) => (
                        <Button
                            key={choice.id}
                            onClick={() => handleChoice(choice)}
                            disabled={choice.variant === 'crossed-out'}
                            variant={choice.variant === 'crossed-out' ? "ghost" : "default"}
                            className={cn(
                                "w-full min-h-[64px] h-auto py-4 px-6 justify-between text-left transition-all active:scale-[0.98] group rounded-2xl relative overflow-hidden",
                                "whitespace-normal break-words items-center",
                                choice.variant === 'crossed-out'
                                    ? "bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                                    : "bg-white border-2 border-slate-200 text-slate-900 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 active:translate-y-[2px] active:shadow-none"
                            )}
                        >
                            <span className={cn(
                                "font-black leading-tight tracking-tight flex-1 mr-4 uppercase",
                                getButtonTextSize(choice.text.length)
                            )}>
                                {choice.text}
                            </span>

                            {choice.variant === 'crossed-out' ? (
                                <span className="text-xl opacity-50 grayscale shrink-0">🔒</span>
                            ) : (
                                <ArrowRight className="w-5 h-5 text-indigo-500 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            )}

                            {/* Subtle hover background highlight */}
                            <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors pointer-events-none" />
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

