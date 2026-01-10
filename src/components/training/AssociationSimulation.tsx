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
    FileText,
    Heart,
    Zap,
    X,
    Clipboard,
    Clock,
    UserPlus,
    CornerDownRight
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
    outcome?: string;
}

interface Choice {
    text: string;
    nextStep: string;
    impact: {
        wellbeing: number;
        safety: number;
    };
    feedback: string;
    strategyType: 'warning' | 'boundary' | 'document' | 'passive';
}

interface LogEntry {
    time: string;
    event: string;
    note: string;
}

// --- DATA ---

const ASSOCIATION_BASICS_SCENARIO: ScenarioStep[] = [
    {
        id: 'start',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Olet mukana harrastusyhdistyksen hallituksessa. Huomaat WhatsApp-ryhmässä outoa dynamiikkaa: PJ ja pari muuta tekevät päätöksiä muiden ohi ja vitsailevat muiden kustannuksella.',
        choices: [
            {
                text: 'Aloita tapahtumien dokumentointi todistepankkiin',
                nextStep: 'doc_start',
                impact: { wellbeing: 0, safety: 15 },
                feedback: 'Viisasta. Faktat auttavat sinua pysymään todellisuudessa, vaikka muut yrittäisivät vähätellä.',
                strategyType: 'document'
            },
            {
                text: 'Kysy ryhmässä: "Miten tämä päätös tehtiin?"',
                nextStep: 'direct_question',
                impact: { wellbeing: 5, safety: 10 },
                feedback: 'Suora kysymys pakottaa klikin selittämään toimintaansa julkisesti.',
                strategyType: 'warning'
            }
        ]
    },
    {
        id: 'doc_start',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Avaat todistepankin. PJ kirjoittaa: "Päätettiin Teron kanssa, että siirretään tapahtumaa. Te muut voitte hoitaa roudauksen."',
        choices: [
            {
                text: 'Kirjaa: "PJ ja Tero päättivät hallituksen ohi 12.05."',
                nextStep: 'doc_success',
                impact: { wellbeing: 5, safety: 25 },
                feedback: 'Dokumentointi muuttaa subjektiivisen tunteen objektiiviseksi todisteeksi.',
                strategyType: 'document'
            }
        ]
    },
    {
        id: 'direct_question',
        speaker: 'PJ',
        type: 'dialogue',
        text: 'PJ: "No me vaan Teron kanssa nopeasti katsottiin tämä alta pois. Ei tästä nyt kannata numeroa tehdä, ollaanhan me kavereita! 😉"',
        choices: [
            {
                text: 'Käytä varoitusfraasia: "Sääntöjen noudattaminen on kaikkien etu."',
                nextStep: 'resolution',
                impact: { wellbeing: 15, safety: 20 },
                feedback: 'Varoitusfraasit (Warning Phrases) ovat lyhyitä ja asiallisia. Ne pysäyttävät manipulaation.',
                strategyType: 'warning'
            }
        ]
    },
    {
        id: 'doc_success',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Sinulla on nyt lista tilanteista, joissa sääntöjä on rikottu. Päätät ottaa asian esille seuraavassa kokouksessa liittolaisten kanssa.',
        choices: [
            {
                text: 'Viimeistele harjoitus',
                nextStep: 'finish',
                impact: { wellbeing: 10, safety: 20 },
                feedback: 'Hienoa! Tiedon kerääminen on ensimmäinen askel muutokseen.',
                strategyType: 'boundary'
            }
        ]
    },
    {
        id: 'resolution',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'PJ hämmentyy hetkeksi, mutta alkaa selitellä. Tilanne vakautuu ja muutkin alkavat vaatia avoimempaa päätöksentekoa.',
        choices: [
            {
                text: 'Viimeistele harjoitus',
                nextStep: 'finish',
                impact: { wellbeing: 20, safety: 10 },
                feedback: 'Rajojen veto vapaa-ajalla on välttämätöntä jaksamisen kannalta.',
                strategyType: 'boundary'
            }
        ]
    }
];

const HOBBY_BOUNDARIES_SCENARIO: ScenarioStep[] = [
    {
        id: 'start',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Harrastusryhmässäsi yksi jäsen "vitsailee" jatkuvasti kustannuksellasi muiden edessä. Se tuntuu pahalta, mutta muut vain naurahtavat mukana.',
        choices: [
            {
                text: 'Käytä minä-viestiä heti tilanteessa',
                nextStep: 'i_message',
                impact: { wellbeing: 10, safety: 15 },
                feedback: 'Minä-viesti ("Minusta tuntuu...") on tutkimusten mukaan tehokkain tapa asettaa raja hyökkäämättä takaisin.',
                strategyType: 'boundary'
            },
            {
                text: 'Niele kiukkusi ja yritä nauraa mukana',
                nextStep: 'passive_path',
                impact: { wellbeing: -20, safety: -10 },
                feedback: 'Vaikeneminen tulkitaan usein hyväksynnäksi. Tämä kuluttaa voimavarojasi.',
                strategyType: 'passive'
            }
        ]
    },
    {
        id: 'i_message',
        speaker: 'Sinä',
        type: 'dialogue',
        text: '"Minusta tuntuu epämiellyttävältä, kun teet vitsejä suorituksestani muiden edessä. Toivoisin, että lopettaisit sen."',
        choices: [
            {
                text: 'Odota vastausta rauhallisesti',
                nextStep: 'reaction_positive',
                impact: { wellbeing: 15, safety: 10 },
                feedback: 'Rauhallinen odotus osoittaa, että seisot sanomasi takana.',
                strategyType: 'boundary'
            }
        ]
    },
    {
        id: 'reaction_positive',
        speaker: 'Toinen jäsen',
        type: 'dialogue',
        text: '"Oho, en mä tarkottanut mitään pahaa... sori jos otit sen noin. En tee sitä enää."',
        choices: [
            {
                text: 'Kiitä suoruudesta ja jatka harrastusta',
                nextStep: 'finish',
                impact: { wellbeing: 20, safety: 10 },
                feedback: 'Hienoa! Itsetuntosi kasvoi ja asetit selvän rajan.',
                strategyType: 'boundary'
            }
        ]
    },
    {
        id: 'passive_path',
        speaker: 'Kertoja',
        type: 'narrative',
        text: '"Vitsailu" jatkuu ja muuttuu entistä henkilökohtaisemmaksi. Alat harkita harrastuksen lopettamista, vaikka se on sinulle tärkeä.',
        choices: [
            {
                text: 'Pysäytä tilanne nyt: "Tämä ei ole enää hauskaa."',
                nextStep: 'i_message',
                impact: { wellbeing: 10, safety: 20 },
                feedback: 'Koskaan ei ole liian myöhäistä asettaa rajoja. Käytä suoraa viestintää.',
                strategyType: 'warning'
            },
            {
                text: 'Lopeta harrastus hiljaisuudessa',
                nextStep: 'finish',
                impact: { wellbeing: -30, safety: 0 },
                feedback: 'Pako on ratkaisu, mutta se jättää haavoja ja kiusaaja jatkaa seuraavaan kohteeseen.',
                strategyType: 'passive'
            }
        ]
    }
];

const TRANSFERABLE_SKILLS_SCENARIO: ScenarioStep[] = [
    {
        id: 'start',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Olet uuden harrastuksen parissa ja huomaat, että siellä käytetään samoja gaslighting-taktiikoita kuin vanhalla työpaikallasi. Tiedät jo miten toimia.',
        choices: [
            {
                text: 'Sovella työpaikan dokumentointiooppeja',
                nextStep: 'skills_doc',
                impact: { wellbeing: 5, safety: 25 },
                feedback: 'Taidot ovat todellakin siirrettäviä. Dokumentointi toimii kaikkialla.',
                strategyType: 'document'
            },
            {
                text: 'Puhu ohjaajalle suoraan taktiikoista',
                nextStep: 'skills_direct',
                impact: { wellbeing: 10, safety: 15 },
                feedback: 'Taktiikoiden nimeäminen poistaa niiltä vallan.',
                strategyType: 'warning'
            }
        ]
    },
    {
        id: 'skills_doc',
        speaker: 'Kertoja',
        type: 'narrative',
        text: 'Kirjaat ylös epäloogiset ohjeet ja muuttuvat säännöt. Kun sinua syytetään virheestä, sinulla on faktat valmiina.',
        choices: [
            {
                text: 'Esitä todisteet rauhallisesti',
                nextStep: 'finish',
                impact: { wellbeing: 20, safety: 30 },
                feedback: 'Faktat ovat paras suoja manipulaatiota vastaan.',
                strategyType: 'document'
            }
        ]
    },
    {
        id: 'skills_direct',
        speaker: 'Ohjaaja',
        type: 'dialogue',
        text: '"Eihän täällä mitään sellaista tapahdu, olet vain vähän herkkä..." (Klassinen gaslighting-yritys)',
        choices: [
            {
                text: 'Käytä varoitusfraasia: "Kyse ei ole herkkydestä, vaan säännöistä."',
                nextStep: 'finish',
                impact: { wellbeing: 15, safety: 20 },
                feedback: 'Hienoa! Tunnistit taktiikan ja torjuit sen heti.',
                strategyType: 'warning'
            }
        ]
    }
];

// --- COMPONENT ---

export default function AssociationSimulation({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number, passed: boolean) => void;
    onExit: () => void;
}) {
    const [currentStepId, setCurrentStepId] = useState('start');
    const [wellbeing, setWellbeing] = useState(70);
    const [safety, setSafety] = useState(40);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [history, setHistory] = useState<string[]>(['start']);
    const [showHint, setShowHint] = useState(false);

    // Get the correct scenario based on moduleId
    const getScenario = () => {
        switch (moduleId) {
            case 'hobby_boundaries': return HOBBY_BOUNDARIES_SCENARIO;
            case 'transferable_skills': return TRANSFERABLE_SKILLS_SCENARIO;
            case 'association_basics':
            default: return ASSOCIATION_BASICS_SCENARIO;
        }
    };

    const scenario = getScenario();
    const currentStep = scenario.find(s => s.id === currentStepId) || scenario[0];

    // Reset step when moduleId changes
    useEffect(() => {
        setCurrentStepId('start');
        setWellbeing(70);
        setSafety(40);
        setLogs([]);
    }, [moduleId]);

    const handleChoice = (choice: Choice) => {
        // Update stats
        setWellbeing(prev => Math.min(100, Math.max(0, prev + choice.impact.wellbeing)));
        setSafety(prev => Math.min(100, Math.max(0, prev + choice.impact.safety)));

        // Add to logs if it's a documentation strategy
        if (choice.strategyType === 'document') {
            const newLog: LogEntry = {
                time: new Date().toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' }),
                event: 'Havainto kirjattu',
                note: choice.feedback
            };
            setLogs(prev => [newLog, ...prev]);
        }

        // Check for finish
        if (choice.nextStep === 'finish') {
            const finalWellbeing = wellbeing + choice.impact.wellbeing;
            const finalSafety = safety + choice.impact.safety;
            const totalScore = finalWellbeing + finalSafety;
            const passed = totalScore >= 100;

            onComplete(totalScore, passed);
            return;
        }

        // Navigate
        setCurrentStepId(choice.nextStep);
        setHistory(prev => [...prev, choice.nextStep]);
        setShowHint(false);
    };

    const getWellbeingColor = () => {
        if (wellbeing > 60) return "bg-emerald-500";
        if (wellbeing > 30) return "bg-amber-500";
        return "bg-rose-500";
    };

    return (
        <div className="relative min-h-[500px] md:min-h-[600px] w-full bg-slate-50/50 rounded-[2rem] md:rounded-[3rem] p-4 md:p-10 flex flex-col gap-6 md:gap-8 border border-slate-200">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-600">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 leading-none">Vapaa-aika & Yhdistykset</h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Interaktiivinen simulaattori</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto bg-white p-3 md:p-4 px-4 md:px-6 rounded-2xl shadow-sm border border-slate-100 justify-between">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex flex-col gap-1 w-24">
                            <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
                                <span>Hyvinvointi</span>
                                <span className={wellbeing < 30 ? "text-rose-500" : ""}>{wellbeing}%</span>
                            </div>
                            <Progress value={wellbeing} className="h-1" indicatorClassName={getWellbeingColor()} />
                        </div>
                        <div className="flex flex-col gap-1 w-24">
                            <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
                                <span>Turvallisuus</span>
                                <span>{safety}%</span>
                            </div>
                            <Progress value={safety} className="h-1" indicatorClassName="bg-indigo-500" />
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-slate-100 rounded-full shrink-0">
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 flex-1">
                {/* GAME AREA */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <Card className="bg-white border-slate-200 p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm flex-1 flex flex-col justify-center relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStepId}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                className="space-y-4 md:space-y-6"
                            >
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="border-indigo-100 bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase tracking-widest px-3 h-6">
                                        {currentStep.speaker}
                                    </Badge>
                                </div>
                                <h3 className={cn(
                                    "text-lg md:text-2xl font-black leading-tight text-slate-900 tracking-tight",
                                    currentStep.type === 'dialogue' ? "italic font-serif" : ""
                                )}>
                                    {currentStep.type === 'dialogue' && '"'}
                                    {currentStep.text}
                                    {currentStep.type === 'dialogue' && '"'}
                                </h3>

                                <div className="grid gap-2 md:gap-3 pt-2 md:pt-6">
                                    {currentStep.choices?.map((choice, i) => (
                                        <Button
                                            key={i}
                                            onClick={() => handleChoice(choice)}
                                            className="h-auto py-3 md:py-4 px-4 md:px-6 justify-between text-left bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl flex items-center group transition-all"
                                        >
                                            <span className="font-bold text-sm tracking-tight leading-snug flex-1 break-words">{choice.text}</span>
                                            <ArrowRight className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </Button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Background subtle decoration */}
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />
                    </Card>

                    {/* STRATEGY TIPS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-200 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-yellow-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Asiantuntijan vinkki</span>
                            </div>
                            <p className="text-xs font-medium leading-relaxed opacity-90">
                                Tutkimukset osoittavat, että itsevarma rajojen veto vähentää kiusaamistilanteita jopa 50%. Dokumentointi taas antaa uskottavuutta puuttujille.
                            </p>
                        </Card>
                        <Card className="bg-white border-slate-200 p-6 rounded-[2rem] flex flex-col gap-2 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Shield className="w-4 h-4 text-emerald-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none text-slate-500">Psykologinen turva</span>
                            </div>
                            <p className="text-xs font-medium leading-relaxed text-slate-600">
                                Käytä "Minä-viestejä" ("Minusta tuntuu...") poistaaksesi hyökkäävyyden, mutta pitääksesi silti huolta omasta tilastasi.
                            </p>
                        </Card>
                    </div>
                </div>

                {/* SIDEBAR / LOGS */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <Card className="bg-white border-slate-200 p-6 rounded-[2.5rem] shadow-sm flex flex-col gap-4 max-h-[400px]">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-indigo-500" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Todistepankki (Loki)</h4>
                            </div>
                            <Badge variant="outline" className="text-[8px] font-black border-slate-100">{logs.length} havaintoa</Badge>
                        </div>
                        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-2">
                            {logs.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                                        <Clipboard className="w-5 h-5 text-slate-200" />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Ei merkintöjä vielä</p>
                                </div>
                            ) : (
                                logs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-slate-50 p-4 rounded-2xl relative border-l-2 border-indigo-400"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[8px] font-black text-indigo-500 uppercase">{log.event}</span>
                                            <span className="text-[8px] text-slate-400 font-bold">{log.time}</span>
                                        </div>
                                        <p className="text-[11px] font-medium text-slate-600 leading-tight">{log.note}</p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </Card>

                    <Card className="bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-sm flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <CornerDownRight className="w-4 h-4 text-indigo-400" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest">Opetusala & Neuroepätyypilliset</h4>
                        </div>
                        <p className="text-[10px] leading-relaxed opacity-70 italic font-medium">
                            Neuroepätyypillisille visuaalinen dokumentointi (kuvakaappaukset, kuvat tiloista) voi olla helpompi tapa jäsentää tapahtumia kuin pelkkä teksti. Hallitustyöskentelyssä selkeät, kirjalliset pelisäännöt luovat kaivattua ennakoitavuutta.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
