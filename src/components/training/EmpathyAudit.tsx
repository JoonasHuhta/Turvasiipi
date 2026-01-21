"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Fingerprint,
    CheckCircle2,
    ArrowRight,
    X,
    Eye,
    MessageSquare,
    ClipboardCheck,
    AlertCircle,
    Star
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- TYPES ---
type ViewState = 'intro' | 'scenario' | 'checklist' | 'summary';

interface Scenario {
    id: string;
    title: string;
    description: string;
    icon: any;
    choiceA: string; // Pysäyttää
    choiceB: string; // Mahdollistaa
    feedbackA: string;
    feedbackB: string;
}

// --- DATA ---
const SCENARIOS: Scenario[] = [
    {
        id: 'signal',
        title: "Ratkaiseva hetki 1: Ensimmäinen signaali",
        icon: Eye,
        description: "Huomaat tiimipalaverissa 'vitsin', josta yksi jäsen selvästi hämmentyy ja vaimistuu. Muut nauravat.",
        choiceA: "Pysäytä: Ota asia selkeästi puheeksi heti tai heti perään: 'Huomasin tämän, haluan varmistaa ettei se toistu.'",
        choiceB: "Ohita: 'Se on vain heidän huumoriaan', ajattelet. Jos puutun, pilaan hyvän tunnelman.",
        feedbackA: "Oikein. Pysäyttämällä pienetkin asiat viestit, että kulttuuriin ei kuulu kenenkään kustannuksella nauraminen.",
        feedbackB: "Riskialtista. Reagoimattomuus normalisoi käytöksen ja viestii, että tällainen peli kuuluu asiaan."
    },
    {
        id: 'report',
        title: "Ratkaiseva hetki 2: Virallinen ilmoitus",
        icon: MessageSquare,
        description: "Työntekijä tulee luoksesi ja sanoo: 'Minusta tuntuu, että minua kohdellaan epäasiallisesti.'",
        choiceA: "Ota vakavasti: Kiitä luottamuksesta, dokumentoi, selitä prosessi ja sovi aikataulu selvitykselle.",
        choiceB: "Vähättele: 'Olet ehkä vähän herkkä, tiedäthän että Liisalla on vain sellainen tyyli.'",
        feedbackA: "Hienoa. Psykologinen sopimus säilyy, kun organisaatio reagoi luvatusti ja asiallisesti.",
        feedbackB: "Vaarallista. Ilmoittaja kokee jäävänsä yksin ja kynnys kertoa jatkossa kasvaa. Psykologinen sopimus murtuu."
    },
    {
        id: 'followup',
        title: "Ratkaiseva hetki 3: Seuranta",
        icon: ClipboardCheck,
        description: "Asia on selvitetty ja rajat sovittu. Viikkoja on kulunut ja tilanne näyttää rauhoittuneen pinnalta.",
        choiceA: "Aktiivinen seuranta: Varmista sovitut toimet, pidä säännölliset tsekinit molempien osapuolten kanssa.",
        choiceB: "Oletus: Oletat asian olevan ohi, koska kukaan ei enää tule valittamaan.",
        feedbackA: "Välttämätöntä. Kiusaajat usein vain vaihtavat kohdetta tai taktiikkaa. Jatkuva seuranta takaa muutoksen.",
        feedbackB: "Virhe. Hiljaisuus ei tarkoita ratkaisua. Usein se tarkoittaa vain luovuttamista tai pelkoa ilmoittaa uudestaan."
    }
];

// --- COMPONENT ---
export default function EmpathyAudit({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number) => void;
    onExit: () => void;
}) {
    const [view, setView] = useState<ViewState>('intro');
    const [scenarioIdx, setScenarioIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [lastChoice, setLastChoice] = useState<'A' | 'B' | null>(null);

    const handleChoice = (choice: 'A' | 'B') => {
        setLastChoice(choice);
        if (choice === 'A') setScore(prev => prev + 1);
        setShowFeedback(true);
    };

    const nextScenario = () => {
        if (scenarioIdx < SCENARIOS.length - 1) {
            setScenarioIdx(prev => prev + 1);
            setShowFeedback(false);
            setLastChoice(null);
        } else {
            setView('checklist');
        }
    };

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                        <Fingerprint className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">Empatia-audit</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Esihenkilön Interventiokyky</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-center max-w-4xl mx-auto w-full py-4">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {view === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="text-center space-y-8 max-w-2xl"
                        >
                            <h1 className="text-4xl font-serif font-black text-[#292524]">Johdon sokeat pisteet.</h1>
                            <p className="text-lg text-[#57534E] leading-relaxed">
                                Esihenkilö on portinvartija: sinun valintasi ratkaisevissa käännekohdissa joko katkaisevat kiusaamisen tai tekevät siitä osan arkea.
                                <br /><br />
                                Testaa kykysi tunnistaa ja puuttua <strong>kolmessa ratkaisevassa hetkessä</strong>.
                            </p>
                            <Button onClick={() => setView('scenario')} size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                                Aloita auditointi <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* SCENARIOS */}
                    {view === 'scenario' && (
                        <motion.div
                            key="scenario"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <Badge variant="outline" className="text-purple-600 border-purple-200 uppercase text-[10px] font-black tracking-widest">Hetki {scenarioIdx + 1}/3</Badge>
                                <h3 className="text-2xl font-bold">{SCENARIOS[scenarioIdx].title}</h3>
                            </div>

                            <Card className="p-8 bg-white border-[#E7E5E4] shadow-sm space-y-8">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                                        {React.createElement(SCENARIOS[scenarioIdx].icon, { className: 'w-6 h-6' })}
                                    </div>
                                    <p className="text-lg text-[#44403C] leading-relaxed pt-1">
                                        {SCENARIOS[scenarioIdx].description}
                                    </p>
                                </div>

                                {!showFeedback ? (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => handleChoice('A')}
                                            className="p-6 text-left border-2 border-[#E7E5E4] rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
                                        >
                                            <h4 className="font-bold text-sm mb-2 group-hover:text-purple-700">Vaihtoehto A</h4>
                                            <p className="text-xs text-[#78716C]">{SCENARIOS[scenarioIdx].choiceA}</p>
                                        </button>
                                        <button
                                            onClick={() => handleChoice('B')}
                                            className="p-6 text-left border-2 border-[#E7E5E4] rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
                                        >
                                            <h4 className="font-bold text-sm mb-2 group-hover:text-purple-700">Vaihtoehto B</h4>
                                            <p className="text-xs text-[#78716C]">{SCENARIOS[scenarioIdx].choiceB}</p>
                                        </button>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={cn(
                                            "p-6 rounded-2xl border-l-4 space-y-2",
                                            lastChoice === 'A' ? "bg-emerald-50 border-emerald-500" : "bg-orange-50 border-orange-500"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            {lastChoice === 'A' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-orange-600" />}
                                            <h4 className="font-bold text-sm">{lastChoice === 'A' ? "Vaikuttava valinta" : "Riski kulttuurille"}</h4>
                                        </div>
                                        <p className="text-sm text-[#57534E]">
                                            {lastChoice === 'A' ? SCENARIOS[scenarioIdx].feedbackA : SCENARIOS[scenarioIdx].feedbackB}
                                        </p>
                                        <Button onClick={nextScenario} variant="ghost" className="mt-4 text-purple-700 font-bold p-0 hover:bg-transparent">
                                            Jatka <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </motion.div>
                                )}
                            </Card>
                        </motion.div>
                    )}

                    {/* CHECKLIST */}
                    {view === 'checklist' && (
                        <motion.div
                            key="checklist"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge className="bg-purple-100 text-purple-700 border-0">Loppuarvio</Badge>
                                <h1 className="text-4xl font-serif font-black text-[#292524]">
                                    {score === 3 ? "Portinvartija mitalilla" : "Kehitettävää tunnistamisessa"}
                                </h1>
                                <p className="text-lg text-[#57534E]">Interventiokykysi pisteet: {score}/3</p>
                            </div>

                            <Card className="p-8 bg-white border-[#E7E5E4] shadow-sm">
                                <h4 className="text-xs font-black uppercase tracking-widest text-[#A8A29E] mb-6 border-b pb-4">Johdon 3 r:n muistisääntö</h4>
                                <div className="grid gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-bold">1</div>
                                        <div>
                                            <h5 className="font-bold">Reagoi (Signaali)</h5>
                                            <p className="text-xs text-[#78716C]">Älä vähättele pientäkään epäasiallisuutta. Se on siemen, joka juurtuu jos se saa vettä hiljaisuudesta.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-bold">2</div>
                                        <div>
                                            <h5 className="font-bold">Rekisteröi (Ilmoitus)</h5>
                                            <p className="text-xs text-[#78716C]">Dokumentoi kaikki. Objektiivinen tieto on esihenkilön paras ystävä kun asioita aletaan perata.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-bold">3</div>
                                        <div>
                                            <h5 className="font-bold">Ratkaise & Seuraa</h5>
                                            <p className="text-xs text-[#78716C]">Varmista, että toimet purevat. Seuraa 1kk, 3kk ja 6kk välein. Kiusaaminen poistuu vain sitkeydellä.</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Button onClick={() => onComplete(100)} size="lg" className="w-full bg-[#292524] hover:bg-[#44403C] text-white rounded-2xl py-8 text-xl shadow-xl">
                                Valmis
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

