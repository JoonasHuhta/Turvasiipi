"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    MessageSquare,
    Shield,
    AlertTriangle,
    CheckCircle2,
    ArrowRight,
    Info,
    Heart,
    Zap,
    X,
    Eye,
    HandHelping,
    Scale,
    Brain,
    Lock,
    Search
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// --- TYPES ---

type Stage = 'intro' | 'identify' | 'responsibility' | '5d_model' | 'boundaries' | 'summary';

interface QuizItem {
    id: string;
    scenario: string;
    isBullying: boolean;
    explanation: string;
}

interface ScenarioStep {
    id: string;
    text: string;
    speaker: string;
    type: 'narrative' | 'dialogue';
    choices: Choice[];
}

interface Choice {
    text: string;
    nextStep: string;
    dType?: 'distract' | 'delegate' | 'document' | 'delay' | 'direct';
    feedback: string;
}

// --- DATA ---

const IDENTIFY_QUIZ: QuizItem[] = [
    {
        id: 'q1',
        scenario: "Tiimipalaverissa esihenkilö huokaisee raskaasti ja pyörittelee silmiään aina, kun Matti avaa suunsa. Muut alkavat naureskella.",
        isBullying: true,
        explanation: "Toistuva, sanaton nöyryyttäminen ja ryhmäpaineen luominen on kiusaamista, ei 'huumoria'."
    },
    {
        id: 'q2',
        scenario: "Työkaveri on eri mieltä projektin suunnasta ja perustelee kantansa voimakkaasti mutta asiallisesti kokouksessa.",
        isBullying: false,
        explanation: "Asioista eri mieltä oleminen ja debatti kuuluvat työhön, kunhan se ei mene henkilökohtaisuuksiin."
    },
    {
        id: 'q3',
        scenario: "Kollega 'unohtaa' jatkuvasti kutsua Liisan lounaalle ja tiimin yhteisiin kahvihetkiin, vaikka muut kutsutaan.",
        isBullying: true,
        explanation: "Sosiaalinen eristäminen (ostrakismi) on yksi yleisimmistä ja vahingoittavimmista kiusaamisen muodoista."
    }
];

const SCENARIO_5D: ScenarioStep[] = [
    {
        id: 'start',
        speaker: 'Tilanne',
        type: 'narrative',
        text: 'Olet kahvihuoneessa. Kuulet, kuinka kaksi kollegaa puhuu kovalla äänellä: "Kuulitteko, mitä se uus tyyppi taas mokasi? Ihan käsittämätöntä tunarointia." Uusi työntekijä istuu viereisessä pöydässä ja kuulee kaiken.',
        choices: [
            {
                text: 'Mene istumaan uuden työntekijän viereen ja kysy: "Hei, miten sun projekti etenee?"',
                nextStep: 'distract_success',
                dType: 'distract',
                feedback: 'Hienoa! Veit huomion pois kiusaajista (Distract) ja tarjosit tukea ilman konfrontaatiota. Tämä on usein turvallisin tapa puuttua.'
            },
            {
                text: 'Sano kovaan ääneen: "Hei, meillä ei puhuta työkavereista noin."',
                nextStep: 'direct_success',
                dType: 'direct',
                feedback: 'Rohkeaa! Suora puuttuminen (Direct) tekee rajan selväksi. Muista kuitenkin aina arvioida oma turvallisuutesi ennen konfrontaatiota.'
            },
            {
                text: 'Mene myöhemmin uuden työntekijän luo: "Olen pahoillani heidän käytöksestään, se ei ollut ok."',
                nextStep: 'delay_success',
                dType: 'delay',
                feedback: 'Tärkeää! Jälkikäteinen tuki (Delay) on elintärkeää. Se poistaa uhrilta epäilyksen siitä, että hän olisi kuvitellut tilanteen.'
            }
        ]
    },
    {
        id: 'distract_success',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Uusi työntekijä hymyilee helpottuneena ja alkaa jutella kanssasi. Kiusaajat hiljenevät hetkeksi ja vaihtavat sitten aihetta, kun "yleisö" katosi.',
        choices: [
            { text: 'Jatka seuraavaan', nextStep: 'finish', feedback: '' }
        ]
    },
    {
        id: 'direct_success',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Huoneeseen tulee hiljaista. Toinen puhujista mumisee "vitsihän se vaan oli", mutta keskustelu loppuu. Uusi työntekijä luo sinuun kiitollisen katseen.',
        choices: [
            { text: 'Jatka seuraavaan', nextStep: 'finish', feedback: '' }
        ]
    },
    {
        id: 'delay_success',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Uusi työntekijä huokaisee: "Kiitos kun sanoit. Luulin jo, että kuvittelin kaiken." Olet validioinut hänen kokemuksensa, mikä on toipumisen kannalta kriittistä.',
        choices: [
            { text: 'Jatka seuraavaan', nextStep: 'finish', feedback: '' }
        ]
    },
    {
        id: 'finish',
        speaker: '',
        type: 'narrative',
        text: '',
        choices: []
    }

];

// --- COMPONENT ---

export default function BystanderMasterclass({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number, passed: boolean) => void;
    onExit: () => void;
}) {
    const [stage, setStage] = useState<Stage>('intro');
    const [score, setScore] = useState(0);

    // Stage 1 State
    const [quizIndex, setQuizIndex] = useState(0);
    const [showQuizFeedback, setShowQuizFeedback] = useState(false);
    const [lastQuizCorrect, setLastQuizCorrect] = useState(false);

    // Stage 2 State
    const [bystanderCount, setBystanderCount] = useState(1);

    // Stage 3 State
    const [scenarioStepId, setScenarioStepId] = useState('start');
    const [lastFeedback, setLastFeedback] = useState<string | null>(null);

    // --- HANDLERS ---

    const handleIntroNext = () => setStage('identify');

    const handleQuizAnswer = (isTrue: boolean) => {
        const correct = isTrue === IDENTIFY_QUIZ[quizIndex].isBullying;
        setLastQuizCorrect(correct);
        setShowQuizFeedback(true);
        if (correct) setScore(s => s + 20);
    };

    const nextQuiz = () => {
        setShowQuizFeedback(false);
        if (quizIndex < IDENTIFY_QUIZ.length - 1) {
            setQuizIndex(i => i + 1);
        } else {
            setStage('responsibility');
        }
    };

    const handleResponsibilityNext = () => setStage('5d_model');

    const handleScenarioChoice = (choice: Choice) => {
        setLastFeedback(choice.feedback);
        if (choice.dType) setScore(s => s + 30); // Points for action

        if (choice.nextStep === 'finish') {
            setTimeout(() => setStage('boundaries'), 2000);
        } else {
            setScenarioStepId(choice.nextStep);
        }
    };

    const finishModule = () => {
        onComplete(score, true);
    };

    // --- RENDERERS ---

    const currentScenarioStep = SCENARIO_5D.find(s => s.id === scenarioStepId) || SCENARIO_5D[0];

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden text-[#44403C]">
            {/* PROGRESS HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F4] flex items-center justify-center text-[#57534E]">
                        <Eye className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">Bystander-Herättäjä</h2>
                        <div className="flex gap-2 text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">
                            <span className={stage === 'identify' ? 'text-[#0EA5E9]' : ''}>1. Tunnista</span>
                            <span>•</span>
                            <span className={stage === 'responsibility' ? 'text-[#0EA5E9]' : ''}>2. Vastuu</span>
                            <span>•</span>
                            <span className={stage === '5d_model' ? 'text-[#0EA5E9]' : ''}>3. Toimi</span>
                            <span>•</span>
                            <span className={stage === 'boundaries' ? 'text-[#0EA5E9]' : ''}>4. Rajat</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-white rounded-lg border border-[#E7E5E4]">
                        <span className="text-xs font-bold text-[#0EA5E9]">{score} XP</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 relative">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {stage === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="flex flex-col items-center justify-center h-full text-center space-y-8 max-w-2xl mx-auto"
                        >
                            <div className="w-24 h-24 bg-[#E0F2FE] rounded-full flex items-center justify-center shadow-lg shadow-[#0EA5E9]/10">
                                <HandHelping className="w-10 h-10 text-[#0284C7]" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-serif font-black text-[#292524] mb-4">Oletko hiljainen todistaja?</h1>
                                <p className="text-lg text-[#57534E] leading-relaxed">
                                    Suurin osa työpaikkakiusaamisesta tapahtuu muiden nähden.
                                    Sivullisten reaktio – tai reagoimattomuus – ratkaisee, jatkuuko kiusaaminen.
                                    Tässä moduulissa opit 5 turvallista tapaa puuttua.
                                </p>
                            </div>
                            <Button onClick={handleIntroNext} size="lg" className="bg-[#292524] hover:bg-[#44403C] text-white font-bold px-8 py-6 rounded-2xl text-lg shadow-lg">
                                Aloita harjoitus <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* STAGE 1: IDENTIFY */}
                    {stage === 'identify' && (
                        <motion.div
                            key="identify"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full flex flex-col justify-center max-w-3xl mx-auto w-full"
                        >
                            <div className="mb-8 text-center">
                                <Badge variant="outline" className="mb-4 border-[#0EA5E9]/30 bg-[#E0F2FE] text-[#0284C7]">Vaihe 1/4: Näen ja nimeän</Badge>
                                <h2 className="text-2xl font-bold text-[#292524]">Onko tämä kiusaamista?</h2>
                            </div>

                            <Card className="bg-white border-[#E7E5E4] p-8 rounded-3xl shadow-sm min-h-[300px] flex flex-col justify-center">
                                {showQuizFeedback ? (
                                    <div className="text-center space-y-6 animate-in zoom-in-95 fade-in duration-300">
                                        <div className={cn("w-16 h-16 mx-auto rounded-full flex items-center justify-center", lastQuizCorrect ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600")}>
                                            {lastQuizCorrect ? <CheckCircle2 className="w-8 h-8" /> : <X className="w-8 h-8" />}
                                        </div>
                                        <div>
                                            <h3 className={cn("text-xl font-black mb-2", lastQuizCorrect ? "text-emerald-700" : "text-rose-700")}>
                                                {lastQuizCorrect ? "Oikein!" : "Ei aivan."}
                                            </h3>
                                            <p className="text-[#57534E] text-lg leading-relaxed">{IDENTIFY_QUIZ[quizIndex].explanation}</p>
                                        </div>
                                        <Button onClick={nextQuiz} className="bg-[#292524] hover:bg-[#44403C] text-white">
                                            Seuraava <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <p className="text-xl text-center leading-relaxed font-serif text-[#292524]">"{IDENTIFY_QUIZ[quizIndex].scenario}"</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button onClick={() => handleQuizAnswer(true)} variant="outline" className="py-8 border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100 hover:text-rose-900 hover:border-rose-300 text-lg">
                                                <AlertTriangle className="mr-2 w-5 h-5" /> Kyllä, on
                                            </Button>
                                            <Button onClick={() => handleQuizAnswer(false)} variant="outline" className="py-8 border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-900 hover:border-emerald-300 text-lg">
                                                <CheckCircle2 className="mr-2 w-5 h-5" /> Ei, normaalia
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    )}

                    {/* STAGE 2: RESPONSIBILITY */}
                    {stage === 'responsibility' && (
                        <motion.div
                            key="responsibility"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col justify-center max-w-3xl mx-auto w-full space-y-8"
                        >
                            <div className="text-center">
                                <Badge variant="outline" className="mb-4 border-[#0EA5E9]/30 bg-[#E0F2FE] text-[#0284C7]">Vaihe 2/4: Vastuu</Badge>
                                <h2 className="text-2xl font-bold text-[#292524] mb-2">Bystander-efekti & Vastuun jakautuminen</h2>
                                <p className="text-[#57534E]">Kokeile mitä tapahtuu todennäköisyydelle puuttua, kun todistajia on enemmän.</p>
                            </div>

                            <Card className="bg-white border-[#E7E5E4] p-8 rounded-3xl shadow-sm">
                                <div className="space-y-8">
                                    <div className="flex justify-between text-sm uppercase font-bold tracking-widest text-[#A8A29E]">
                                        <span>Sinä yksin</span>
                                        <span>Iso ryhmä</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        step="1"
                                        value={bystanderCount}
                                        onChange={(e) => setBystanderCount(Number(e.target.value))}
                                        className="w-full h-2 bg-[#F5F5F4] rounded-lg appearance-none cursor-pointer accent-[#0EA5E9]"
                                    />
                                    <div className="flex justify-center items-center gap-4">
                                        {Array.from({ length: bystanderCount }).map((_, i) => (
                                            <Users key={i} className={cn("w-8 h-8 transition-all", i === 0 ? "text-[#0EA5E9] scale-110" : "text-[#D6D3D1]")} />
                                        ))}
                                    </div>

                                    <div className="bg-[#F5F5F4] p-6 rounded-2xl text-center">
                                        <p className="text-[#78716C] text-sm mb-2 uppercase tracking-widest">Todennäköisyys että joku auttaa:</p>
                                        <div className={cn("text-4xl font-black transition-colors duration-500", bystanderCount === 1 ? "text-emerald-600" : "text-rose-500")}>
                                            {Math.round(100 / bystanderCount)}%
                                        </div>
                                        <p className="text-[#57534E] text-sm mt-4 max-w-md mx-auto leading-relaxed">
                                            {bystanderCount === 1
                                                ? "Kun olet ainoa todistaja, tunnet 100% vastuun ja toimit todennäköisesti."
                                                : "Mitä enemmän ihmisiä, sitä enemmän oletamme, että 'joku muu' hoitaa sen. Tätä kutsutaan vastuun hajautumiseksi."}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <div className="text-center">
                                <Button onClick={handleResponsibilityNext} className="bg-[#292524] hover:bg-[#44403C] text-white font-bold px-8 py-6 rounded-2xl shadow-lg">
                                    Ymmärrän – Siirry harjoitteluun <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* STAGE 3: 5D MODEL */}
                    {stage === '5d_model' && (
                        <motion.div
                            key="5d_model"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="h-full flex flex-col md:flex-row gap-8 max-w-5xl mx-auto w-full"
                        >
                            <div className="flex-1 space-y-6">
                                <Badge variant="outline" className="border-[#0EA5E9]/30 bg-[#E0F2FE] text-[#0284C7]">Vaihe 3/4: 5D-malli</Badge>

                                <Card className="bg-white border-[#E7E5E4] p-6 md:p-8 rounded-[2rem] relative overflow-hidden min-h-[400px] shadow-sm">
                                    {lastFeedback ? (
                                        <div className="h-full flex flex-col justify-center items-center text-center space-y-6 animate-in fade-in zoom-in-95">
                                            <div className="w-16 h-16 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                                                <Brain className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold text-[#292524]">Miksi se toimi?</h3>
                                            <p className="text-[#57534E] leading-relaxed text-lg">{lastFeedback}</p>
                                            <Button onClick={() => setLastFeedback(null)} variant="outline" className="border-[#E7E5E4] hover:bg-[#F5F5F4] text-[#292524]">
                                                Jatka
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-3 mb-6">
                                                <Badge className="bg-[#F5F5F4] text-[#57534E] border-[#E7E5E4]">{currentScenarioStep.speaker}</Badge>
                                            </div>
                                            <p className="text-xl text-[#292524] leading-relaxed mb-8 font-medium font-serif">
                                                {currentScenarioStep.text}
                                            </p>

                                            <div className="space-y-3">
                                                {currentScenarioStep.choices.map((choice, i) => (
                                                    <Button
                                                        key={i}
                                                        onClick={() => handleScenarioChoice(choice)}
                                                        className="w-full py-6 px-6 justify-between text-left bg-[#F5F5F4] hover:bg-[#E0F2FE] hover:border-[#0EA5E9]/30 hover:text-[#0284C7] border border-[#E7E5E4] text-[#44403C] rounded-xl group transition-all shadow-sm"
                                                    >
                                                        <span className="font-medium">{choice.text}</span>
                                                        {choice.dType && (
                                                            <Badge className="ml-2 bg-white text-[#78716C] border border-[#E7E5E4] text-[10px] uppercase">{choice.dType}</Badge>
                                                        )}
                                                    </Button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </Card>
                            </div>

                            {/* SIDEBAR: 5D CHEAT SHEET */}
                            <div className="w-full md:w-80 space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-[#A8A29E]">5 tapaa puuttua (Hollaback!)</h3>
                                <div className="space-y-2">
                                    {[
                                        { title: 'Distract (Häiritse)', desc: 'Keskeytä huomaamatta ("Paljon kello on?")' },
                                        { title: 'Delegate (Siirrä)', desc: 'Pyydä apua muilta tai esihenkilöltä.' },
                                        { title: 'Document (Dokumentoi)', desc: 'Kirjaa ylös: aika, paikka, sanat.' },
                                        { title: 'Delay (Viivytä)', desc: 'Tue uhria tilanteen jälkeen.' },
                                        { title: 'Direct (Suora)', desc: 'Puhu suoraan (jos turvallista).' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white p-4 rounded-xl border border-[#E7E5E4] shadow-sm">
                                            <div className="font-bold text-[#0284C7] text-sm mb-1">{item.title}</div>
                                            <div className="text-xs text-[#78716C]">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STAGE 4: BOUNDARIES & FINISH */}
                    {stage === 'boundaries' && (
                        <motion.div
                            key="boundaries"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center space-y-8"
                        >
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                                <Shield className="w-10 h-10" />
                            </div>

                            <h2 className="text-3xl font-bold text-[#292524]">Ennen kuin puutut...</h2>
                            <p className="text-[#57534E]">
                                Sankariteot eivät auta, jos palat itse loppuun. Muista turvallisuuden tarkistuslista:
                            </p>

                            <div className="text-left bg-white p-6 rounded-2xl w-full space-y-4 border border-[#E7E5E4] shadow-sm">
                                {[
                                    "Onko fyysinen turvallisuuteni uhattuna?",
                                    "Onko minulla liittolaisia lähellä?",
                                    "Onko minulla valtaa/asemaa tässä tilanteessa?",
                                    "Voinko pahentaa tilannetta puuttumalla nyt?"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <MyCheckbox />
                                        <span className="text-[#44403C]">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Button onClick={finishModule} className="bg-[#059669] hover:bg-[#047857] text-white font-bold px-12 py-6 rounded-2xl text-lg shadow-lg shadow-emerald-900/10">
                                Olen valmis - Lopeta harjoitus
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

function MyCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
        <div
            onClick={() => setChecked(!checked)}
            className={cn(
                "w-6 h-6 rounded-md border flex items-center justify-center cursor-pointer transition-colors",
                checked ? "bg-[#059669] border-[#059669]" : "border-[#D6D3D1] bg-white"
            )}
        >
            {checked && <CheckCircle2 className="w-4 h-4 text-white" />}
        </div>
    )
}
