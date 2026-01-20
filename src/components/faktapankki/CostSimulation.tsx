"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Euro, Heart, Users, ArrowRight, RotateCcw, TrendingUp, CheckCircle, AlertCircle, Clock, History, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProgress } from "@/context/ProgressContext";

type GameState = 'intro' | 'role_selection' | 'playing' | 'summary';
type Role = 'member' | 'manager' | 'hr';

interface Metrics {
    money: number;  // Concrete EUROS
    health: number; // 0-100 (wellbeing)
    trust: number;  // 0-100 (trust)
}

interface Choice {
    id: 'A' | 'B' | 'C';
    label: string;
    feedback: {
        title: string;
        text: string;
        info: string;
        cost: number; // Cost impact in Euros for this specific choice
        costLabel?: string; // e.g. "Sairauspoissaolo (2 pv)"
        metrics: { health: number; trust: number }; // Changes relative to current
    };
    nextRoundId: number;
}

interface Round {
    id: number;
    timeline: string;
    title: string;
    situation: string;
    choices: Choice[];
}

const INITIAL_METRICS: Metrics = { money: 0, health: 100, trust: 100 };

// Helper to format currency
const formatEuro = (amount: number) =>
    new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);

const ROUNDS: Round[] = [
    {
        id: 1,
        timeline: "Viikko 1",
        title: "Hiljainen signaali",
        situation: "Tiimipalaverissa kokenut asiantuntija nolaa toistuvasti uudemman työntekijän. 'Eihän tässä ole mitään järkeä', hän tuhähtää ja pyörittelee silmiään. Muut vaikenevat.",
        choices: [
            {
                id: 'A',
                label: "En reagoi. Ajattelen, että tämä on vain 'hänen tapansa'.",
                feedback: {
                    title: "Tilanne normalisoituu",
                    text: "Palaveri jatkuu, mutta ilmapiiri on jäätävä. Uusi työntekijä vetäytyy kuoreensa.",
                    info: "Vaikeaan käytökseen tottuminen on ensimmäinen askel kulttuurin rapautumisessa.",
                    cost: 350,
                    costLabel: "Tehottomuus palaverissa",
                    metrics: { health: -5, trust: -10 }
                },
                nextRoundId: 2
            },
            {
                id: 'B',
                label: "Mainitsen asiasta myöhemmin kahden kesken.",
                feedback: {
                    title: "Lyhyt helpotus",
                    text: "Henkilö lupaa yrittää, mutta tiimi ei nähnyt puuttumista. Epävarmuus jää leijumaan.",
                    info: "Kahdenkeskinen keskustelu on hyvä alku, mutta se ei korjaa ryhmän kokemaa turvattomuutta.",
                    cost: 0,
                    metrics: { health: 0, trust: -5 }
                },
                nextRoundId: 2
            },
            {
                id: 'C',
                label: "Keskeytän tilanteen: 'Pidetään keskustelu asiallisena.'",
                feedback: {
                    title: "Raja on asetettu",
                    text: "Hetki on jännittynyt, mutta viesti on selvä kaikille: epäasiallisuutta ei hyväksytä.",
                    info: "Varhainen, julkinen mutta rauhallinen puuttuminen luo turvaa koko ryhmälle.",
                    cost: 0,
                    metrics: { health: 5, trust: 10 }
                },
                nextRoundId: 2 // Improved path logic could branch here, keeping linear for MVP robustness
            }
        ]
    },
    {
        id: 2,
        timeline: "Kuukausi 1",
        title: "Kierre syvenee",
        situation: "Uusi työntekijä on alkanut tehdä virheitä ja varmistelee asioita jatkuvasti. Hän vaikuttaa hajamieliseltä. Tiimin yhteistyö takkuaa.",
        choices: [
            {
                id: 'A',
                label: "Kehotan häntä tarkkaavaisuuteen.",
                feedback: {
                    title: "Paine kasvaa",
                    text: "Virheet eivät johdu osaamattomuudesta, vaan pelosta. Huomautus vain lisää stressiä.",
                    info: "Kun aivot ovat hälytystilassa, kognitiivinen suorituskyky laskee merkittävästi.",
                    cost: 2500,
                    costLabel: "Virheiden korjaus & hidastelu",
                    metrics: { health: -15, trust: -15 }
                },
                nextRoundId: 3
            },
            {
                id: 'B',
                label: "Kysyn tiimiltä, miten meillä menee.",
                feedback: {
                    title: "Varovainen avaus",
                    text: "Keskustelu on tahmeaa. Kukaan ei uskalla nostaa kissaa pöydälle.",
                    info: "Ilman psykologista turvallisuutta 'avoimet kysymykset' eivät tuota rehellisiä vastauksia.",
                    cost: 1200,
                    costLabel: "Tehoton kehityspäivä",
                    metrics: { health: -5, trust: -5 }
                },
                nextRoundId: 3
            },
            {
                id: 'C',
                label: "Aloitan säännölliset 1-on-1 keskustelut kaikkien kanssa.",
                feedback: {
                    title: "Juuriin pääseminen",
                    text: "Alat saada kuvan tilanteesta. Tämä vie aikaasi, mutta luottamus alkaa palautua.",
                    info: "Ajan investointi kuunteluun on tehokkainta ennaltaehkäisyä.",
                    cost: 500, // Time cost
                    costLabel: "Esihenkilötyön aikainvestointi",
                    metrics: { health: 5, trust: 15 }
                },
                nextRoundId: 3
            }
        ]
    },
    {
        id: 3,
        timeline: "Kuukausi 3",
        title: "Kriisipiste",
        situation: "Uusi työntekijä jää kahden viikon sairauslomalle 'uupumuksen oireiden' vuoksi. Projekti on myöhässä. Asiakas on tyytymätön.",
        choices: [
            {
                id: 'A',
                label: "Jaetaan työt muille ja painetaan päälle.",
                feedback: {
                    title: "Kylmä suihku",
                    text: "Muu tiimi kuormittuu ylitöistä. Turhautuminen purkautuu käytäväpuheina.",
                    info: "Oireen hoitaminen (työn jako) ilman juurisyyn hoitamista vain levittää ongelmaa.",
                    cost: 8500,
                    costLabel: "Sairausloma + Ylityöt + Sakot",
                    metrics: { health: -30, trust: -30 }
                },
                nextRoundId: 4
            },
            {
                id: 'B',
                label: "Otan yhteyttä työterveyteen ja HR:ään.",
                feedback: {
                    title: "Prosessi käynnistyy",
                    text: "Virallinen selvittely alkaa. Se on raskasta, mutta välttämätöntä.",
                    info: "Korjaavat toimenpiteet maksavat, mutta pysäyttävät syöksykierteen.",
                    cost: 4000,
                    costLabel: "HR-prosessit & Sijaisjärjestelyt",
                    metrics: { health: -10, trust: 5 }
                },
                nextRoundId: 4
            },
            {
                id: 'C',
                label: "Pysäytän projektin hetkeksi ja pidämme kriisipalaverin.",
                feedback: {
                    title: "Radikaali rehellisyys",
                    text: "Myönnätte, että näin ei voi jatkua. Teette uudet pelisäännöt. Projekti myöhästyy, mutta tiimi eheytyy.",
                    info: "Joskus on hidastettava päästäkseen perille.",
                    cost: 6000,
                    costLabel: "Projektiviive & Konsultointi",
                    metrics: { health: 10, trust: 25 }
                },
                nextRoundId: 4
            }
        ]
    },
    {
        id: 4,
        timeline: "Kuukausi 6",
        title: "Tilinteon hetki",
        situation: "Sairauslomalainen ei palaa. Hän irtisanoutuu. Tiimin kokenut asiantuntija (kiusaaja) on loukkaantunut ilmapiiristä ja uhkaa myös lähteä.",
        choices: [
            {
                id: 'A',
                label: "Annan asian olla. Parempi aloittaa puhtaalta pöydältä.",
                feedback: {
                    title: "Kallis nollaus",
                    text: "Menetättekö molemmat? Mainehaitta alkaa näkyä rekrytoinnissa.",
                    info: "Kiusaamisen salliminen johtaa usein osaajakatoon – ei vain uhrin, vaan sivustaseuraajien osalta.",
                    cost: 25000,
                    costLabel: "Rekrytointi x2 + Perehdytys + Mainehaitta",
                    metrics: { health: -20, trust: -40 }
                },
                nextRoundId: -1
            },
            {
                id: 'B',
                label: "Käynnistän sovitteluprosessin.",
                feedback: {
                    title: "Vaikea tie",
                    text: "Ulkopuolinen sovittelija auttaa avaamaan solmuja. Osaava asiantuntija jää, mutta tiimin luottamus vaatii kuukausien työn.",
                    info: "Sovittelu on investointi tulevaisuuteen, vaikka se maksaa tässä hetkessä.",
                    cost: 8000,
                    costLabel: "Sovittelu & Valmennus",
                    metrics: { health: 5, trust: 10 }
                },
                nextRoundId: -1
            }
        ]
    }
];

export function CostSimulation() {
    const [gameState, setGameState] = useState<GameState>('intro');
    const [currentRoundId, setCurrentRoundId] = useState(1);
    const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);
    const [history, setHistory] = useState<{ round: string, cost: number, item: string }[]>([]);

    // UI states
    const [showFeedback, setShowFeedback] = useState(false);
    const [lastChoice, setLastChoice] = useState<Choice | null>(null);
    const { completeModule } = useProgress();

    const currentRound = ROUNDS.find(r => r.id === currentRoundId) || ROUNDS[0];

    // Trigger completion when entering summary
    if (gameState === 'summary') {
        completeModule('cost_simulation_game');
    }

    const startGame = () => {
        setGameState('playing');
        setMetrics(INITIAL_METRICS);
        setHistory([]);
        setCurrentRoundId(1);
    };

    const handleChoice = (choice: Choice) => {
        setLastChoice(choice);

        // Add cost to history if > 0
        if (choice.feedback.cost > 0) {
            setHistory(prev => [...prev, {
                round: currentRound.timeline,
                cost: choice.feedback.cost,
                item: choice.feedback.costLabel || "Muu kustannus"
            }]);
        }

        // Update metrics
        setMetrics(prev => ({
            money: prev.money + choice.feedback.cost,
            health: Math.max(0, Math.min(100, prev.health + choice.feedback.metrics.health)),
            trust: Math.max(0, Math.min(100, prev.trust + choice.feedback.metrics.trust)),
        }));

        setShowFeedback(true);
    };

    const nextRound = () => {
        setShowFeedback(false);
        setLastChoice(null);

        if (lastChoice && lastChoice.nextRoundId === -1) {
            setGameState('summary');
        } else if (lastChoice) {
            setCurrentRoundId(lastChoice.nextRoundId);
        }
    };

    // --- VIEWS ---

    if (gameState === 'intro') {
        return (
            <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in duration-500 py-12">
                <div className="space-y-6 text-center">
                    <h2 className="text-4xl font-serif font-bold text-[#2B2B2B]">Hiljaisuuden hinta</h2>
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        Tällä kertaa emme puhu tunteista, vaan rahasta.
                        Työpaikkakiusaamisen hinta ei synny yhdestä hetkestä, vaan ketjureaktiosta.
                    </p>
                    <p className="text-lg text-[#4A4A4A] font-medium">
                        Tee valintoja puolen vuoden ajalta ja katso, mikä on loppulasku.
                    </p>
                </div>
                <div className="flex justify-center">
                    <Button onClick={startGame} className="bg-[#2B2B2B] text-white hover:bg-[#4A4A4A] px-8 py-6 text-lg rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        Aloita simulaatio <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>
        );
    }

    if (gameState === 'summary') {
        return (
            <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500 py-12">
                <div className="text-center space-y-4">
                    <div className="inline-block px-4 py-1 rounded-full bg-[#2B2B2B] text-white text-xs font-bold uppercase tracking-widest mb-4">
                        Simulaatio päättyi
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-[#2B2B2B]">Loppulasku</h2>
                    <div className="text-6xl font-bold text-[#5B4B8A] py-4">
                        {formatEuro(metrics.money)}
                    </div>
                    <p className="text-lg text-[#4A4A4A]">
                        {metrics.money < 5000
                            ? "Varhainen puuttuminen maksoi aikaa, mutta säästi kymmeniä tuhansia euroja."
                            : "Passiivisuus tuli kalliiksi. Tämä summa on suoraan pois tuloksesta."}
                    </p>
                </div>

                {/* Receipt */}
                <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm shadow-sm max-w-xl mx-auto space-y-6 font-mono text-sm">
                    <div className="flex justify-between border-b border-[#E8DDD0] pb-4 mb-4">
                        <span className="font-bold text-[#2B2B2B] uppercase">Kustannuserittely</span>
                        <span className="text-[#4A4A4A]">{new Date().toLocaleDateString('fi-FI')}</span>
                    </div>

                    {history.length === 0 && (
                        <div className="text-center text-[#4A4A4A] italic py-4">Ei merkittäviä lisäkuluja.</div>
                    )}

                    {history.map((entry, idx) => (
                        <div key={idx} className="flex justify-between items-baseline">
                            <div>
                                <span className="text-xs text-[#5B4B8A] uppercase tracking-wide mr-3">{entry.round}</span>
                                <span className="text-[#4A4A4A]">{entry.item}</span>
                            </div>
                            <span className="font-bold text-[#2B2B2B]">{formatEuro(entry.cost)}</span>
                        </div>
                    ))}

                    <div className="border-t-2 border-[#2B2B2B] pt-4 mt-4 flex justify-between items-baseline text-lg">
                        <span className="font-bold uppercase">Yhteensä</span>
                        <span className="font-bold">{formatEuro(metrics.money)}</span>
                    </div>
                </div>

                {/* Metrics Summary */}
                <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
                    <div className="bg-[#FDFBF7] p-6 rounded-sm text-center">
                        <Heart className="w-8 h-8 text-[#5B4B8A] mx-auto mb-2" />
                        <div className="text-2xl font-bold text-[#2B2B2B]">{metrics.health}%</div>
                        <div className="text-xs uppercase tracking-widest text-[#4A4A4A]">Työkyky</div>
                    </div>
                    <div className="bg-[#FDFBF7] p-6 rounded-sm text-center">
                        <Users className="w-8 h-8 text-[#5B4B8A] mx-auto mb-2" />
                        <div className="text-2xl font-bold text-[#2B2B2B]">{metrics.trust}%</div>
                        <div className="text-xs uppercase tracking-widest text-[#4A4A4A]">Luottamus</div>
                    </div>
                </div>

                <div className="flex justify-center pt-8">
                    <Button onClick={startGame} variant="outline" className="border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white uppercase font-bold tracking-widest px-8 py-6 rounded-sm">
                        <RotateCcw className="mr-2 w-4 h-4" /> Kokeile toista polkua
                    </Button>
                </div>
            </div>
        );
    }

    // --- PLAYING STATE ---

    return (
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_300px] gap-12 animate-in fade-in duration-500 py-8">

            {/* Main Game Area */}
            <div className="space-y-8">
                {/* Timeline Indicator */}
                <div className="flex items-center gap-2 text-[#5B4B8A] font-mono text-sm font-bold uppercase tracking-widest mb-8">
                    <Clock className="w-4 h-4" />
                    <span>{currentRound.timeline}</span>
                    <div className="h-px bg-[#E8DDD0] flex-1 ml-4"></div>
                </div>

                <AnimatePresence mode="wait">
                    {!showFeedback ? (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <h2 className="text-3xl font-serif font-bold text-[#2B2B2B] leading-tight">{currentRound.title}</h2>
                                <p className="text-xl text-[#4A4A4A] leading-relaxed bg-white border-l-4 border-[#E8DDD0] pl-6 py-2">
                                    {currentRound.situation}
                                </p>
                            </div>

                            <div className="space-y-4">
                                {currentRound.choices.map((choice) => (
                                    <button
                                        key={choice.id}
                                        onClick={() => handleChoice(choice)}
                                        className="w-full text-left p-6 bg-white border border-[#E8DDD0] hover:border-[#5B4B8A] hover:shadow-md rounded-sm transition-all group flex gap-4 items-baseline"
                                    >
                                        <span className="font-mono font-bold text-[#5B4B8A] text-lg bg-[#FDFBF7] w-8 h-8 flex items-center justify-center rounded-full border border-[#E8DDD0] group-hover:border-[#5B4B8A]">
                                            {choice.id}
                                        </span>
                                        <span className="text-lg text-[#2B2B2B] group-hover:text-[#5B4B8A] transition-colors pt-0.5">
                                            {choice.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="feedback"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#FDFBF7] border border-[#5B4B8A] p-8 rounded-sm space-y-8 shadow-sm"
                        >
                            <div className="space-y-4">
                                <span className="inline-block px-3 py-1 bg-[#5B4B8A] text-white text-xs font-bold uppercase tracking-widest rounded-sm mb-2">
                                    Vaikutukset
                                </span>
                                <h3 className="text-2xl font-serif font-bold text-[#2B2B2B]">{lastChoice?.feedback.title}</h3>
                                <p className="text-lg text-[#4A4A4A] leading-relaxed">{lastChoice?.feedback.text}</p>

                                {lastChoice?.feedback.cost! > 0 && (
                                    <div className="flex items-center gap-3 text-red-700 bg-red-50 p-4 rounded-sm border border-red-100">
                                        <TrendingUp className="w-5 h-5" />
                                        <span className="font-bold">Kustannusvaikutus: +{formatEuro(lastChoice?.feedback.cost!)}</span>
                                    </div>
                                )}

                                <div className="border-t border-[#5B4B8A]/20 pt-4 flex gap-3 text-[#5B4B8A]">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <p className="text-sm italic">{lastChoice?.feedback.info}</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={nextRound} className="bg-[#2B2B2B] text-white hover:bg-[#4A4A4A] uppercase font-bold tracking-widest rounded-sm px-8 py-6">
                                    Jatka <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Sidebar - Receipt & Metrics */}
            <div className="bg-white border border-[#E8DDD0] p-6 h-fit sticky top-8 shadow-sm rounded-sm">
                <h3 className="font-bold text-xs uppercase tracking-widest text-[#4A4A4A] border-b border-[#E8DDD0] pb-4 mb-6 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Kustannuskertymä
                </h3>

                <div className="space-y-6">
                    <div className="text-center py-4 bg-[#FDFBF7] border border-[#E8DDD0] rounded-sm mb-6">
                        <div className="text-sm text-[#4A4A4A] mb-1">Yhteensä</div>
                        <div className="text-3xl font-bold text-[#2B2B2B]">{formatEuro(metrics.money)}</div>
                    </div>

                    <div className="space-y-4">
                        <MetricBar icon={Heart} label="Työkyky" value={metrics.health} />
                        <MetricBar icon={Users} label="Luottamus" value={metrics.trust} />
                    </div>

                    {/* Mini Receipt History */}
                    {history.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-[#E8DDD0] space-y-3">
                            <span className="text-xs font-bold text-[#4A4A4A] uppercase tracking-wide block mb-2">Tapahtumat</span>
                            {history.slice().reverse().map((h, i) => (
                                <div key={i} className="text-xs flex justify-between text-[#4A4A4A] animate-in slide-in-from-left-2 fade-in">
                                    <span>{h.item}</span>
                                    <span className="font-mono font-bold text-[#5B4B8A]">+{h.cost}€</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function MetricBar({ icon: Icon, label, value }: { icon: any, label: string, value: number }) {
    return (
        <div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#4A4A4A] mb-2">
                <span className="flex items-center gap-2"><Icon className="w-3 h-3" /> {label}</span>
                <span>{value}%</span>
            </div>
            <div className="w-full bg-[#E8DDD0] h-1.5 rounded-full overflow-hidden">
                <div
                    className={cn("h-full transition-all duration-500",
                        value > 70 ? "bg-[#5B4B8A]" : value > 30 ? "bg-amber-500" : "bg-red-500"
                    )}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
