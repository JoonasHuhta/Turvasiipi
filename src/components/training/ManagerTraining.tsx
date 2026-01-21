"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
    Briefcase,
    ArrowRight,
    CheckCircle2,
    AlertTriangle,
    Scale,
    Users,
    Shield,
    Activity,
    Brain,
    HeartHandshake,
    Gavel,
    TrendingUp,
    Lock
} from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";

interface ManagerTrainingProps {
    onExit: () => void;
    onComplete: () => void;
}

export const ManagerTraining: React.FC<ManagerTrainingProps> = ({ onExit, onComplete }) => {
    const [currentStage, setCurrentStage] = useState(0);
    const { completeModule } = useProgress();
    const [completedStages, setCompletedStages] = useState<number[]>([]);

    // Stage 1 State: Toxic Star Matrix
    const [starResults, setStarResults] = useState(3);
    const [starValues, setStarValues] = useState(3);
    const [matrixFeedback, setMatrixFeedback] = useState<string | null>(null);

    // Stage 3 State: Conflict Avoidance
    const [heartRate, setHeartRate] = useState(80);
    const [anxietyLevel, setAnxietyLevel] = useState(0);

    const stages = [
        {
            id: "toxic-star",
            title: "1. 'Toxic Star' -dilemma",
            icon: AlertTriangle,
            color: "text-amber-600",
            bg: "bg-amber-50",
            borderColor: "border-amber-200"
        },
        {
            id: "legal",
            title: "2. Juridinen selkänoja",
            icon: Scale,
            color: "text-slate-800",
            bg: "bg-slate-50",
            borderColor: "border-slate-200"
        },
        {
            id: "conflict",
            title: "3. Konfliktien välttely",
            icon: Activity,
            color: "text-rose-600",
            bg: "bg-rose-50",
            borderColor: "border-rose-200"
        },
        {
            id: "restorative",
            title: "4. Korjaava oikeudenmukaisuus",
            icon: HeartHandshake,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            borderColor: "border-emerald-200"
        },
        {
            id: "accountability",
            title: "5. Vastuullisuus & Tuki",
            icon: Shield,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            borderColor: "border-indigo-200"
        }
    ];

    const handleComplete = (stageIndex: number) => {
        if (!completedStages.includes(stageIndex)) {
            setCompletedStages([...completedStages, stageIndex]);
        }
        if (stageIndex < stages.length - 1) {
            setCurrentStage(stageIndex + 1);
        } else {
            completeModule("manager");
            onComplete();
        }
    };

    const renderStage1_ToxicStar = () => {
        const getMatrixAnalysis = () => {
            if (starValues < 3 && starResults > 3) return "TOXIC STAR: Tuhoaa tiimin moraalin. Vaihtuvuus maksaa enemmän kuin hänen tuloksensa.";
            if (starValues > 3 && starResults > 3) return "STAR: Todellinen huippuosaaja. Pidä kiinni!";
            if (starValues > 3 && starResults < 3) return "POTENTIAL: Tarvitsee tukea tulokseen, mutta asenne on kunnossa.";
            if (starValues < 3 && starResults < 3) return "UNDERPERFORMER: Väärä rekrytointi tai väärä rooli.";
            return "KESKITASO: Normaali suoritus.";
        };

        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                    <h3 className="font-bold text-lg mb-2 text-amber-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Arvot vs. Tulokset -matriisi
                    </h3>
                    <p className="text-amber-800 mb-6 text-sm">
                        Harvardin tutkimus (Housman & Minor, 2015) osoittaa: Yksi "myrkyllinen tähti" maksaa talolle 2x enemmän kuin tuottaa.
                        Arvioi tiimisi jäseniä tällä työkalulla.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-700">Tulosvastuu & Osaaminen (1-5)</label>
                            <Slider
                                value={[starResults]}
                                onValueChange={(v) => setStarResults(v[0])}
                                max={5}
                                min={1}
                                step={1}
                                className="py-2"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Aloittelija</span>
                                <span>Huippuosaaja</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-700">Arvot & Käytös (1-5)</label>
                            <Slider
                                value={[starValues]}
                                onValueChange={(v) => setStarValues(v[0])}
                                max={5}
                                min={1}
                                step={1}
                                className="py-2"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Myrkyllinen</span>
                                <span>Esimerkillinen</span>
                            </div>
                        </div>
                    </div>

                    <div className={cn(
                        "p-4 rounded-lg border text-center font-bold text-lg transition-all",
                        starValues < 3 && starResults > 3 ? "bg-red-100 border-red-200 text-red-800" :
                            starValues > 3 && starResults > 3 ? "bg-emerald-100 border-emerald-200 text-emerald-800" :
                                "bg-white border-slate-200 text-slate-700"
                    )}>
                        {getMatrixAnalysis()}
                    </div>
                </div>

                <div className="prose prose-slate max-w-none text-slate-600">
                    <p><strong>Johtopäätös:</strong> Esimiehellä on velvollisuus puuttua myös "tähtien" käytökseen. Jos annat myrkyllisen käytöksen jatkua tulosten nimissä, ajat viisi muuta asiantuntijaa pois talosta.</p>
                </div>

                <Button onClick={() => handleComplete(0)} className="w-full">
                    Kyllä, ymmärrän riskin <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    };

    const renderStage2_Legal = () => {
        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-lg mb-4 text-slate-900 flex items-center gap-2">
                        <Gavel className="w-5 h-5" />
                        Laki on puolellasi
                    </h3>

                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <div className="flex items-start gap-3">
                                <Scale className="w-5 h-5 text-indigo-600 mt-1" />
                                <div>
                                    <h4 className="font-bold text-slate-900">Työturvallisuuslaki 28 §</h4>
                                    <p className="text-sm text-slate-600 mt-1">"Työnantajan on saatuaan tiedon häirinnästä ryhdyttävä käytettävissään olevin keinoin toimiin epäkohdan poistamiseksi."</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 text-indigo-600 mt-1" />
                                <div>
                                    <h4 className="font-bold text-slate-900">Direktio-oikeus</h4>
                                    <p className="text-sm text-slate-600 mt-1">Esimiehellä on oikeus ja velvollisuus määritellä, mikä on hyväksyttävää käytöstä. Et tarvitse konsensusta puuttumiseen.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-50 text-indigo-900 rounded-lg text-center font-medium">
                        "Et ole ilkeä, kun puutut – olet ammattimainen ja noudatat lakia."
                    </div>
                </div>

                <Button onClick={() => handleComplete(1)} className="w-full">
                    Hyväksyn velvollisuuteni <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    };

    const renderStage3_Conflict = () => {
        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
                    <h3 className="font-bold text-lg mb-2 text-rose-900 flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Konfliktien välttelyn hinta
                    </h3>
                    <p className="text-rose-800 mb-6 text-sm">
                        Tutkimusten mukaan "Laissez-faire" (antaa mennä) -johtaminen on työntekijöille kaikkein stressaavinta. Puuttumattomuus on aktiivinen teko.
                    </p>

                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-700">Altistusharjoitus: Sano se ääneen</h4>
                        <p className="text-sm text-slate-600">Lue lauseet ääneen. Jos syke nousee, toista kunnes se tasaantuu.</p>

                        <div className="space-y-2">
                            {["Huomasin eilen kokouksessa, että keskeytit Liisan kolme kertaa.", "Tämä käytös ei vastaa meidän arvojamme, ja sen on loputtava.", "Haluan keskustella tavastasi antaa palautetta."].map((sentence, i) => (
                                <div key={i} className="bg-white p-3 rounded border border-rose-200 text-slate-800 font-medium hover:bg-rose-100 transition-colors cursor-pointer group flex items-center justify-between">
                                    "{sentence}"
                                    <CheckCircle2 className="w-4 h-4 text-rose-300 group-hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Button onClick={() => handleComplete(2)} className="w-full bg-rose-600 hover:bg-rose-700">
                    Olen valmis puhumaan suoraan <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    };

    const renderStage4_Restorative = () => {
        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                    <h3 className="font-bold text-lg mb-4 text-emerald-900 flex items-center gap-2">
                        <HeartHandshake className="w-5 h-5" />
                        Jälkihoito & Korjaava oikeudenmukaisuus
                    </h3>

                    <div className="prose prose-sm text-emerald-900 mb-6">
                        <p>Kiusaamistapaus ei pääty varoitukseen. Tiimi on usein traumatisoitunut ja "syntipukin" paikka on auki.</p>
                    </div>

                    <div className="space-y-4">
                        <Card className="border-emerald-200">
                            <CardContent className="pt-6">
                                <h4 className="font-bold text-slate-900 mb-2">1. Palauta luottamus</h4>
                                <p className="text-sm text-slate-600">Puhu tiimille yleisellä tasolla tapahtuneesta (ilman nimiä), mutta vahvista että prosessi on käyty ja normeja on tarkennettu.</p>
                            </CardContent>
                        </Card>
                        <Card className="border-emerald-200">
                            <CardContent className="pt-6">
                                <h4 className="font-bold text-slate-900 mb-2">2. Suojaa uhria leimautumiselta</h4>
                                <p className="text-sm text-slate-600">Varmista, ettei ilmoittaja jää yksin tai tule kohdelluksi "kantelijana". Seuraa tilannetta aktiivisesti 3kk ajan.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Button onClick={() => handleComplete(3)} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Sitoudun jälkihoitoon <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    };

    const renderStage5_Accountability = () => {
        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Shield className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-xl text-indigo-900 mb-2">
                        Johtajuus on tekoja
                    </h3>
                    <p className="text-indigo-700 max-w-md mx-auto mb-8">
                        Organisaation immuunijärjestelmä vahvistuu vain, jos johto uskaltaa toimia. Sinulla on tuki, laki ja oikeutus puolellasi.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div className="bg-white p-4 rounded-lg border border-indigo-100">
                            <h4 className="font-bold text-slate-900 text-sm mb-1">Palkitseminen</h4>
                            <p className="text-xs text-slate-600">Psykologinen turvallisuus on tulosmittari. Hyvästä ilmapiiristä palkitaan.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-indigo-100">
                            <h4 className="font-bold text-slate-900 text-sm mb-1">Tukiverkko</h4>
                            <p className="text-xs text-slate-600">Suora linja HR:ään. Älä jää yksin vaikeiden tapausten kanssa.</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStage(0)} className="flx-1">
                        Kertaa alusta
                    </Button>
                    <Button onClick={() => handleComplete(4)} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                        Valmis & Kuittaa
                    </Button>
                </div>
            </div>
        );
    };

    const getIcon = () => {
        const Icon = stages[currentStage].icon;
        return <Icon className="w-6 h-6" />;
    };

    return (
        <div className="max-w-2xl mx-auto pb-20">
            <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-500 uppercase tracking-widest font-mono">
                    <span>Esimieskoulutus</span>
                    <span>Vaihe {currentStage + 1} / {stages.length}</span>
                </div>
                <Progress value={((currentStage) / stages.length) * 100} className="h-2" />
            </div>

            <Card className={cn("border-t-4 shadow-sm overflow-hidden transition-colors duration-500", stages[currentStage].borderColor)}>
                <CardHeader className={stages[currentStage].bg}>
                    <div className="flex items-center gap-4">
                        <div className={cn("p-3 bg-white rounded-lg shadow-sm border border-slate-100", stages[currentStage].color)}>
                            {getIcon()}
                        </div>
                        <div>
                            <CardTitle className={cn("text-xl", stages[currentStage].color)}>
                                {stages[currentStage].title}
                            </CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStage}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentStage === 0 && renderStage1_ToxicStar()}
                            {currentStage === 1 && renderStage2_Legal()}
                            {currentStage === 2 && renderStage3_Conflict()}
                            {currentStage === 3 && renderStage4_Restorative()}
                            {currentStage === 4 && renderStage5_Accountability()}
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
};
