"use client";

import React, { useState, useEffect } from 'react';
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
    Clipboard,
    Clock,
    UserPlus,
    CornerDownRight,
    HandHelping,
    Scale
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// --- TYPES ---

interface ScenarioStep {
    id: string;
    text: string;
    speaker: string;
    type: 'narrative' | 'dialogue' | 'action';
    choices?: Choice[];
    contextInfo?: string;
}

interface Choice {
    text: string;
    nextStep: string;
    impact: {
        solidarity: number;
        safety: number;
    };
    feedback: string;
    strategyType: 'direct_support' | 'collective' | 'internal' | 'passive';
}

// --- DATA ---

const PELASTUSLIIVIT_SCENARIO: ScenarioStep[] = [
    {
        id: 'start',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Näet, kuinka kollegaasi Marjaa arvostellaan perusteettomasti ja ivallisesti tiimipalaverissa. Marja näyttää lamaantuneelta ja tuijottaa pöytää.',
        choices: [
            {
                text: 'Siirry istumaan Marjan viereen ja kysy hiljaa: "Oletko ok?"',
                nextStep: 'direct_support_action',
                impact: { solidarity: 30, safety: 10 },
                feedback: 'Tutkimus: Pelkkä fyysinen läsnäolo ja "Oletko ok?" -kysymys vähentää uhrin ahdistusta jopa 40%.',
                strategyType: 'direct_support'
            },
            {
                text: 'Haasta kiusaaja suoraan palaverissa: "Lopeta tuo heti!"',
                nextStep: 'direct_confrontation',
                impact: { solidarity: 20, safety: -10 },
                feedback: 'Suora konfrontaatio voi eskaloitua ja lisätä omaa riskiäsi, vaikka se on rohkeaa.',
                strategyType: 'passive'
            }
        ]
    },
    {
        id: 'direct_support_action',
        speaker: 'Marja',
        type: 'dialogue',
        text: 'Marja vilkaisee sinua kiitollisena ja vetää syvään henkeä. Kiusaaja hidastaa puhettaan huomatessaan, ettei Marja ole enää yksin.',
        choices: [
            {
                text: 'Nimeä tilanne asiallisesti: "Jatketaanko asialistalla, Marjan panos oli tässä tärkeä."',
                nextStep: 'success_direct',
                impact: { solidarity: 20, safety: 20 },
                feedback: 'Solidaarisuuden osoittaminen julkisesti vakauttaa tilanteen ilman riitaa.',
                strategyType: 'direct_support'
            }
        ]
    },
    {
        id: 'direct_confrontation',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Kiusaaja kääntyy sinua kohti: "No katsos, täällähän ollaan herkkänä tänään! Onko teillä joku kerho meneillään?" Ilmapiiri kiristyy.',
        choices: [
            {
                text: 'Pysy rauhallisena: "Kyse on työpaikan pelisäännöistä, ei herkkydestä."',
                nextStep: 'success_direct',
                impact: { solidarity: 10, safety: 15 },
                feedback: 'Rauhallisuus on paras ase, kun vastapuoli yrittää henkilökohtaistaa konfliktia.',
                strategyType: 'internal'
            }
        ]
    },
    {
        id: 'success_direct',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Palaveri päättyy. Marja tulee kiittämään sinua myöhemmin. Hän sanoo, että ilman tukeasi hän olisi saattanut purskahtaa itkuun tai poistua paikalta.',
        choices: [
            {
                text: 'Viimeistele harjoitus',
                nextStep: 'finish',
                impact: { solidarity: 10, safety: 10 },
                feedback: 'Hienoa! Olet aktiivinen todistaja, joka murtaa eristämisen kierteen.',
                strategyType: 'direct_support'
            }
        ]
    }
];

const BYSTANDER_EFFECT_SCENARIO: ScenarioStep[] = [
    {
        id: 'start',
        speaker: 'WhatsApp-ryhmä',
        type: 'dialogue',
        text: 'Ryhmässä alkaa levitä pilkallisia meemejä uusimmasta harrastajasta. Kukaan ei kommentoi mitään, vaikka 20 ihmistä on nähnyt viestit.',
        choices: [
            {
                text: 'Kirjoita ryhmään: "Tämä ei kuulu tänne, oletteko muut samaa mieltä?"',
                nextStep: 'collective_intervention',
                impact: { solidarity: 20, safety: 25 },
                feedback: 'Kysymällä muiden mielipidettä murrat "pluralistisen ignoranssin" ja jaat vastuuta.',
                strategyType: 'collective'
            },
            {
                text: 'Poistu ryhmästä hiljaisuudessa',
                nextStep: 'passive_exit',
                impact: { solidarity: -10, safety: 0 },
                feedback: 'Poistuminen on merkki, mutta se jättää uhrin yksin. Kokeile puuttua ryhmässä.',
                strategyType: 'passive'
            }
        ]
    },
    {
        id: 'collective_intervention',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Hetken on hiljaista, mutta sitten kaksi muuta jäsentä peukuttaa viestiäsi ja kirjoittaa: "Totta, pysytään asiassa." Bystander-efekti murtuu.',
        choices: [
            {
                text: 'Ehdota ylläpitäjälle sääntöjen kertaamista',
                nextStep: 'success_collective',
                impact: { solidarity: 15, safety: 20 },
                feedback: 'Rakenteellinen puuttuminen (säännöt) estää tilanteen toistumisen.',
                strategyType: 'collective'
            }
        ]
    },
    {
        id: 'passive_exit',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Olet poissa ryhmästä, mutta tiedät pilkkaamisen jatkuvan. Tunnet olosi syylliseksi ja irralliseksi yhteisöstä.',
        choices: [
            {
                text: 'Laita uhrille yksityisviesti: "Näin ryhmän viestit, ne eivät ole ok."',
                nextStep: 'success_collective',
                impact: { solidarity: 25, safety: 10 },
                feedback: 'Vaikka et puuttunut julkisesti, yksityinen tuki on uhrille elintärkeää.',
                strategyType: 'direct_support'
            }
        ]
    },
    {
        id: 'success_collective',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Toimintasi rohkaisi muitakin puuttumaan. Yhdistyksen WhatsApp-kulttuuri on nyt selkeämpi ja turvallisempi kaikille. Olet murtanut pluralistisen ignoranssin.',
        choices: [
            {
                text: 'Lopeta harjoitus',
                nextStep: 'finish',
                impact: { solidarity: 20, safety: 10 },
                feedback: 'Aktiivinen bystander on terveellisen yhteisön selkäranka. Kun yksi puhuu, "hiljainen paheksunta" muuttuu yhteiseksi toiminnaksi.',
                strategyType: 'collective'
            }
        ]
    }
];

const PSYCHOLOGICAL_SAFETY_SCENARIO: ScenarioStep[] = [
    {
        id: 'start',
        speaker: 'Sisäinen ääni',
        type: 'dialogue',
        text: '"Pitäisikö minun sanoa jotain? Mutta mitä jos he kääntyvät minua vastaan? Olenko liian kokematon puuttumaan?"',
        choices: [
            {
                text: 'Tunnista pelko ja muistuta itseäsi: "Minä voin vaikuttaa ja suojella."',
                nextStep: 'internal_ready',
                impact: { solidarity: 10, safety: 20 },
                feedback: 'CBT-pohjainen sisäinen puhe vahvistaa kykyäsi toimia paineen alla.',
                strategyType: 'internal'
            },
            {
                text: 'Ajattele: "Joku muu varmasti puuttuu pian."',
                nextStep: 'bystander_trap',
                impact: { solidarity: -5, safety: -5 },
                feedback: 'Tämä on klassinen bystander-ansa (vastuun hajautuminen).',
                strategyType: 'passive'
            }
        ]
    },
    {
        id: 'internal_ready',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Tunnet itsesi varmemmaksi. Arvioit tilanteen: Kiusaaja on yksin, sinulla on kolme kollegaa vierelläsi. Riski on matala.',
        choices: [
            {
                text: 'Kutsu muut koolle: "Hei, katsotaanko tätä yhdessä?"',
                nextStep: 'safety_success',
                impact: { solidarity: 20, safety: 25 },
                feedback: 'Ryhmäpuuttuminen nostaa onnistumisen todennäköisyyttä 3-4 kertaiseksi.',
                strategyType: 'collective'
            }
        ]
    },
    {
        id: 'bystander_trap',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Kukaan ei puutu. Tilanne jatkuu tuskallisen kauan. Jälkeenpäin kaikki ovat hiljaa ja välttävät katsekontaktia.',
        choices: [
            {
                text: 'Puhu asiasta ääneen nyt: "Toivoisin että olisimme puuttuneet."',
                nextStep: 'safety_success',
                impact: { solidarity: 15, safety: 10 },
                feedback: 'Jälkikäteen puuttuminen on parempi kuin ei puuttumista ollenkaan.',
                strategyType: 'internal'
            }
        ]
    },
    {
        id: 'safety_success',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Olet vahvistanut omaa ja muiden psykologista turvallisuutta. Harjoitus tekee puuttumisesta jatkossa helpompaa.',
        choices: [
            {
                text: 'Viimeistele harjoitus',
                nextStep: 'finish',
                impact: { solidarity: 10, safety: 10 },
                feedback: 'Puuttumisen taito kehittyy harjoittelemalla.',
                strategyType: 'internal'
            }
        ]
    }
];

// --- COMPONENT ---

export default function BystanderSimulation({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number, passed: boolean) => void;
    onExit: () => void;
}) {
    const [currentStepId, setCurrentStepId] = useState('start');
    const [solidarity, setSolidarity] = useState(50);
    const [safety, setSafety] = useState(50);
    const [history, setHistory] = useState<string[]>(['start']);

    // Get the correct scenario based on moduleId
    const getScenario = () => {
        switch (moduleId) {
            case 'empathy': return PELASTUSLIIVIT_SCENARIO;
            case 'bystander':
            default: return BYSTANDER_EFFECT_SCENARIO;
        }
    };

    const scenario = getScenario();
    const currentStep = scenario.find(s => s.id === currentStepId) || scenario[0];

    // Reset when module changes
    useEffect(() => {
        setCurrentStepId('start');
        setSolidarity(50);
        setSafety(50);
    }, [moduleId]);

    const handleChoice = (choice: Choice) => {
        setSolidarity(prev => Math.min(100, Math.max(0, prev + choice.impact.solidarity)));
        setSafety(prev => Math.min(100, Math.max(0, prev + choice.impact.safety)));

        if (choice.nextStep === 'finish') {
            const finalSolidarity = solidarity + choice.impact.solidarity;
            const finalSafety = safety + choice.impact.safety;
            const totalScore = finalSolidarity + finalSafety;
            const passed = totalScore >= 100;

            onComplete(totalScore, passed);
            return;
        }

        setCurrentStepId(choice.nextStep);
    };

    return (
        <div className="relative min-h-[500px] md:min-h-[600px] w-full bg-slate-950 rounded-[2rem] md:rounded-[3rem] p-4 md:p-10 flex flex-col gap-6 md:gap-8 border border-white/10 shadow-2xl">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <HandHelping className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-white leading-none">Bystander-Herättäjä</h2>
                        <p className="text-cyan-500/60 text-[10px] font-black uppercase tracking-widest mt-1">Interaktiivinen simulaattori</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto bg-white/5 p-3 md:p-4 px-4 md:px-6 rounded-2xl border border-white/5 backdrop-blur-md justify-between">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex flex-col gap-1 w-24">
                            <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
                                <span>Solidaarisuus</span>
                                <span className="text-cyan-400">{solidarity}%</span>
                            </div>
                            <Progress value={solidarity} className="h-1 bg-white/10" indicatorClassName="bg-cyan-500" />
                        </div>
                        <div className="flex flex-col gap-1 w-24">
                            <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
                                <span>Turvallisuus</span>
                                <span className="text-emerald-400">{safety}%</span>
                            </div>
                            <Progress value={safety} className="h-1 bg-white/10" indicatorClassName="bg-emerald-500" />
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-white/10 text-white/40 hover:text-white transition-colors shrink-0">
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 flex-1">
                {/* GAME AREA */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <Card className="bg-white/5 border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex-1 flex flex-col justify-center relative overflow-hidden backdrop-blur-sm shadow-xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStepId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4 md:space-y-8"
                            >
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[8px] font-black uppercase tracking-widest px-3 h-6">
                                        {currentStep.speaker}
                                    </Badge>
                                </div>
                                <h3 className={cn(
                                    "text-xl md:text-3xl font-black leading-tight text-white tracking-tight",
                                    currentStep.type === 'dialogue' ? "italic text-indigo-100" : ""
                                )}>
                                    {currentStep.type === 'dialogue' && '"'}
                                    {currentStep.text}
                                    {currentStep.type === 'dialogue' && '"'}
                                </h3>

                                <div className="grid gap-3 pt-2 md:pt-4">
                                    {currentStep.choices?.map((choice, i) => (
                                        <Button
                                            key={i}
                                            onClick={() => handleChoice(choice)}
                                            className="h-auto py-4 md:py-5 px-5 md:px-8 justify-between text-left bg-white text-slate-950 hover:bg-cyan-500 hover:text-white rounded-[1.2rem] md:rounded-[1.5rem] flex items-center group transition-all duration-300 shadow-lg"
                                        >
                                            <span className="font-bold text-sm tracking-tight leading-snug flex-1">{choice.text}</span>
                                            <ArrowRight className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </Button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Background subtle decoration */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
                    </Card>

                    {/* DEBRIEFING / TIPS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-cyan-600 p-8 rounded-[2rem] text-white shadow-2xl shadow-cyan-900/40 relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <Scale className="w-4 h-4 text-cyan-200" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-100">Pluralistinen ignoranssi</span>
                                </div>
                                <p className="text-xs font-medium leading-relaxed">
                                    Kaikki voivat yksityisesti paheksua kiusaamista, mutta kukaan ei puhu, koska luulee olevansa ainoa. Puhuminen murtaa tämän harhan heti.
                                </p>
                            </div>
                            <Zap className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform" />
                        </Card>
                        <Card className="bg-white/5 border-white/10 p-8 rounded-[2rem] flex flex-col gap-3 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Turvallisuus ensin</span>
                            </div>
                            <p className="text-xs font-medium leading-relaxed text-slate-300">
                                Arvioi aina psykologinen turvallisuus ennen konfrontaatiota. Usein matalan kynnyksen tuki uhrille on tehokkaampaa kuin huutaminen.
                            </p>
                        </Card>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card className="bg-white/5 border-white/10 p-8 rounded-[2.5rem] shadow-sm flex flex-col gap-6 backdrop-blur-md">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                            <Info className="w-5 h-5 text-cyan-400" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Tutkimuspohjainen analyysi</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                    <span className="text-xs font-bold">1</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-white uppercase tracking-tight">Tunnista</p>
                                    <p className="text-[10px] leading-relaxed text-slate-400 font-medium">Älä ohita vitsailua pelkkänä huumorina, jos se tuntuu kiusaamiselta.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                    <span className="text-xs font-bold">2</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-white uppercase tracking-tight">Arvioi turva</p>
                                    <p className="text-[10px] leading-relaxed text-slate-400 font-medium">Tarkista ryhmän tuki ja oma riskisi ennen puuttumista.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                    <span className="text-xs font-bold">3</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-white uppercase tracking-tight">Toimi kollektiivisesti</p>
                                    <p className="text-[10px] leading-relaxed text-slate-400 font-medium">Bystander-efekti murtuu, kun joku sanoo sen ääneen muiden puolesta.</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-indigo-900/50 to-slate-900 border-indigo-500/20 p-8 rounded-[2.5rem] text-white shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-cyan-500 hover:bg-cyan-600 text-[8px] font-black">NEUROTIP</Badge>
                        </div>
                        <p className="text-[11px] leading-relaxed opacity-80 font-medium italic">
                            Neuroepätyypillisille suositellaan "Chat-valmistelua": kirjoita kommentti etukäteen luonnokseen. Visuaalinen "turvallisuusmittari" auttaa arvioimaan, milloin on liian kuluttavaa puuttua itse ja milloin kannattaa hakea liittolaisia.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
