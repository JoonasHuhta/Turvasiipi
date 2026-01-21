"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Thermometer,
    CheckCircle2,
    ArrowRight,
    X,
    ShieldCheck,
    AlertTriangle,
    Users,
    MessageCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- TYPES ---
interface Question {
    id: number;
    text: string;
    category: 'safety' | 'risk';
}

// --- DATA ---
const QUESTIONS: Question[] = [
    { id: 1, text: "Voin tuoda esiin huoleni työkäyttäytymisestä pelkäämättä kielteisiä seurauksia itselleni.", category: 'safety' },
    { id: 2, text: "Esihenkilöni reagoi johdonmukaisesti, kun joku käyttäytyy epäasiallisesti.", category: 'risk' },
    { id: 3, text: "Tiimissämme vaikeista asioista voidaan puhua avoimesti ilman vaikenemisen normia.", category: 'safety' },
    { id: 4, text: "Koen, että minua kohdellaan oikeudenmukaisesti tehtävien jaossa ja palautteessa.", category: 'risk' },
    { id: 5, text: "Tiedän selkeästi, miten voin ilmoittaa kiusaamisepäilystä ja luotan prosessiin.", category: 'risk' },
    { id: 6, text: "Olen nähnyt tilanteen (12kk sisällä), jossa epäasialliseen käytökseen puututtiin nopeasti.", category: 'risk' },
    { id: 7, text: "Tiimissämme ei ole 'koskemattomia' henkilöitä heidän asemansa vuoksi.", category: 'risk' },
    { id: 8, text: "Jos tekisin virheen, en odottaisi tulevani nolatun tai eristetyn.", category: 'safety' },
    { id: 9, text: "Työpaikallani on selkeä ero jämäkän palautteen ja kiusaamisen välillä.", category: 'safety' },
    { id: 10, text: "Johdon teot osoittavat, että kiusaamisella on todellisia seurauksia.", category: 'risk' }
];

// --- COMPONENT ---
export default function CultureThermometer({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number) => void;
    onExit: () => void;
}) {
    const [view, setView] = useState<'intro' | 'survey' | 'result'>('intro');
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [currentIdx, setCurrentIdx] = useState(0);

    const handleAnswer = (val: number) => {
        const newAnswers = { ...answers, [QUESTIONS[currentIdx].id]: val };
        setAnswers(newAnswers);

        if (currentIdx < QUESTIONS.length - 1) {
            setCurrentIdx(prev => prev + 1);
        } else {
            setView('result');
        }
    };

    const results = React.useMemo(() => {
        if (Object.keys(answers).length < 10) return { safety: 0, risk: 0 };

        const safetyIds = QUESTIONS.filter(q => q.category === 'safety').map(q => q.id);
        const riskIds = QUESTIONS.filter(q => q.category === 'risk').map(q => q.id);

        const avgSafety = (safetyIds.reduce((acc, id) => acc + (answers[id] || 0), 0) / safetyIds.length);
        const avgRisk = (riskIds.reduce((acc, id) => acc + (answers[id] || 0), 0) / riskIds.length);

        return {
            safety: (avgSafety / 5) * 100,
            risk: (avgRisk / 5) * 100 // Higher is "Better" (stronger structural protection)
        };
    }, [answers]);

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700">
                        <Thermometer className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">Kulttuuri-lämpömittari</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Organisaation terveystarkastus</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
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
                            <h1 className="text-4xl font-serif font-black text-[#292524]">Millaista ilmaa<br />teillä hengitetään?</h1>
                            <p className="text-lg text-[#57534E] leading-relaxed">
                                Kulttuuri ei muutu julisteilla, vaan päivittäisillä teoilla ja turvallisuuden tunteella.
                                Tämä lämpömittari mittaa <strong>psykologista turvallisuutta</strong> ja <strong>rakenteellista suojaa</strong> anonyymisti.
                                <br /><br />
                                Vastaa rehellisesti nykytilan mukaan.
                            </p>
                            <Button onClick={() => setView('survey')} size="lg" className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                                Aloita mittaus <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* SURVEY */}
                    {view === 'survey' && (
                        <motion.div
                            key="survey"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="w-full max-w-2xl space-y-12"
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-[#A8A29E]">
                                    <span>Kysymys {currentIdx + 1} / {QUESTIONS.length}</span>
                                    <span>{Math.round(((currentIdx) / QUESTIONS.length) * 100)}% valmis</span>
                                </div>
                                <div className="h-1 w-full bg-[#F5F5F4] rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-rose-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <Card className="p-8 md:p-12 bg-white border-[#E7E5E4] shadow-sm text-center space-y-8">
                                <h3 className="text-2xl md:text-3xl font-serif font-black text-[#292524] leading-tight px-4">
                                    "{QUESTIONS[currentIdx].text}"
                                </h3>

                                <div className="flex flex-col md:flex-row gap-2 justify-center">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <Button
                                            key={val}
                                            variant="outline"
                                            onClick={() => handleAnswer(val)}
                                            className="h-14 md:h-16 md:w-20 rounded-xl border-2 hover:border-rose-500 hover:bg-rose-50 font-black text-lg transition-all"
                                        >
                                            {val}
                                        </Button>
                                    ))}
                                </div>
                                <div className="flex justify-between px-4 text-[10px] font-black uppercase tracking-widest text-[#A8A29E]">
                                    <span>Täysin eri mieltä</span>
                                    <span>Täysin samaa mieltä</span>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* RESULT */}
                    {view === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge className="bg-rose-100 text-rose-700 border-0">Mittausraportti</Badge>
                                <h2 className="text-3xl font-bold">Kulttuurin tila</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <Card className="p-8 space-y-6">
                                    <div className="flex items-center gap-3 text-emerald-600">
                                        <ShieldCheck className="w-6 h-6" />
                                        <h4 className="font-bold uppercase tracking-widest text-xs">Psykologinen Turva</h4>
                                    </div>
                                    <div className="text-5xl font-black text-[#292524]">{Math.round(results.safety)}%</div>
                                    <p className="text-sm text-[#78716C]">
                                        Tämä luku kertoo, miten vapaasti työntekijät uskaltavat olla omia itsejään ja nostaa epäkohtia esiin ilman pelkoa nolaamisesta tai kostosta.
                                    </p>
                                </Card>

                                <Card className="p-8 space-y-6">
                                    <div className="flex items-center gap-3 text-indigo-600">
                                        <AlertTriangle className="w-6 h-6" />
                                        <h4 className="font-bold uppercase tracking-widest text-xs">Rakenteellinen Valmius</h4>
                                    </div>
                                    <div className="text-5xl font-black text-[#292524]">{Math.round(results.risk)}%</div>
                                    <p className="text-sm text-[#78716C]">
                                        Tämä luku kuvaa johdon, prosessien ja puuttumisen uskottavuutta. Mitä korkeampi luku, sitä vaikeampaa kiusaamisen on juurtua rakenteisiin.
                                    </p>
                                </Card>
                            </div>

                            <div className="p-8 bg-white border border-[#E7E5E4] rounded-3xl space-y-4">
                                <h4 className="font-bold flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5 text-rose-500" /> Havainto
                                </h4>
                                <p className="text-[#57534E]">
                                    {results.safety < 50 || results.risk < 50
                                        ? "Mittaus osoittaa kriittisiä puutteita joko turvallisuudentunteessa tai rakenteissa. Tämä tila altistaa organisaation pitkittyneille kiusaamistapauksille ja kalliille vaihdolle."
                                        : "Organisaatiollasi on vahva pohja. Jatkakaa avointa dialogia ja varmistakaa, ettei 'koskemattomia' suosikkeja pääse syntymään LMX-ilmiön myötä."}
                                </p>
                            </div>

                            <Button onClick={() => onComplete(100)} className="w-full py-8 bg-[#292524] hover:bg-[#44403C] text-white rounded-2xl text-xl font-black shadow-xl">
                                VALMIS
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

