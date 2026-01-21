"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
    Building2,
    ArrowRight,
    ShieldAlert,
    PieChart,
    Network,
    HeartHandshake,
    Landmark,
    CheckCircle2,
    Users,
    Search,
    FileText
} from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";

interface HRMasterclassProps {
    onExit: () => void;
    onComplete: () => void;
}

export const HRMasterclass: React.FC<HRMasterclassProps> = ({ onExit, onComplete }) => {
    const [currentStage, setCurrentStage] = useState(0);
    const { completeModule } = useProgress();
    const [completedStages, setCompletedStages] = useState<number[]>([]);

    // Stage 1: Institutional Betrayal
    const [courageScore, setCourageScore] = useState(0);

    const stages = [
        {
            id: "betrayal",
            title: "1. Institutionaalinen Rohkeus",
            subtitle: "Maineenhallinnasta totuuteen",
            icon: ShieldAlert,
            color: "text-slate-800",
            bg: "bg-slate-100",
            borderColor: "border-slate-300"
        },
        {
            id: "heatmap",
            title: "2. Heat Map -analytiikka",
            subtitle: "Ennustava riskienhallinta",
            icon: PieChart,
            color: "text-rose-900",
            bg: "bg-rose-50",
            borderColor: "border-rose-200"
        },
        {
            id: "hierarchy",
            title: "3. Epävirallinen valta",
            subtitle: "Toksiset solmukohdat",
            icon: Network,
            color: "text-indigo-900",
            bg: "bg-indigo-50",
            borderColor: "border-indigo-200"
        },
        {
            id: "recovery",
            title: "4. Kollektiivinen toipuminen",
            subtitle: "Trauma-informoitu johtaminen",
            icon: HeartHandshake,
            color: "text-emerald-900",
            bg: "bg-emerald-50",
            borderColor: "border-emerald-200"
        },
        {
            id: "governance",
            title: "5. Hallitus & ESG",
            subtitle: "Strateginen vastuu",
            icon: Landmark,
            color: "text-amber-900",
            bg: "bg-amber-50",
            borderColor: "border-amber-200"
        }
    ];

    const handleComplete = (stageIndex: number) => {
        if (!completedStages.includes(stageIndex)) {
            setCompletedStages([...completedStages, stageIndex]);
        }
        if (stageIndex < stages.length - 1) {
            setCurrentStage(stageIndex + 1);
        } else {
            completeModule("hr");
            onComplete();
        }
    };

    const renderStage1_Courage = () => {
        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-xl mb-4 text-slate-900">Institutionaalinen Petos vs. Rohkeus</h3>
                    <p className="text-slate-700 mb-6 font-serif leading-relaxed">
                        Jennifer Freydin tutkimus osoittaa: Institutionaalinen petos tapahtuu, kun organisaatio peittelee vääryyttä suojellakseen mainettaan. Tämä syventää uhrin traumaa enemmän kuin itse kiusaaminen.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="p-4 border border-red-200 bg-red-50 rounded-lg opacity-80">
                            <h4 className="font-bold text-red-900 mb-2">Reaktio A: Petos</h4>
                            <ul className="text-sm text-red-800 space-y-2 list-disc list-inside">
                                <li>"Älä tee tästä isoa numeroa."</li>
                                <li>Uhrin siirtäminen, tekijän suojelu.</li>
                                <li>NDA-sopimukset hiljentämiseen.</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-lg shadow-sm ring-1 ring-emerald-100">
                            <h4 className="font-bold text-emerald-900 mb-2">Reaktio B: Rohkeus</h4>
                            <ul className="text-sm text-emerald-800 space-y-2 list-disc list-inside">
                                <li>Totuuden tunnustaminen julkisesti.</li>
                                <li>Puolueeton tutkinta.</li>
                                <li>Uhrin tukeminen prosessin läpi.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 text-slate-100 p-6 rounded-xl">
                    <h4 className="font-bold mb-2">Johdon Mandaatti</h4>
                    <p className="text-sm text-slate-300 font-mono">
                        "HR ei ole enää yrityksen kilpi, vaan oikeudenmukaisuuden vartija. Tämä vaatii hallituksen tuen, jotta HR voi haastaa myös johdon."
                    </p>
                </div>

                <Button onClick={() => handleComplete(0)} className="w-full bg-slate-800 hover:bg-slate-900">
                    Ymmärrän vastuun <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    };

    const renderStage2_Heatmap = () => {
        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-white p-6 rounded-xl border border-rose-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-xl text-rose-950">Behavioral Risk Audit</h3>
                        <Badge variant="outline" className="border-rose-200 text-rose-700">Ennustava Analytiikka</Badge>
                    </div>

                    <p className="text-slate-600 mb-6 text-sm">
                        Kiusaaminen jättää jälkiä dataan kauan ennen ilmoitusta. Etsi näitä signaaleja:
                    </p>

                    <div className="space-y-4">
                        {[
                            { label: "Vaihtuvuuspiikit (12-18kk)", desc: "Myrkyllinen johtaja polttaa tiimin loppuun sykleissä.", val: "KORKEA RISKI" },
                            { label: "Maanantaisairastelu", desc: "Psykosomaattinen oireilu; pelko palata töihin.", val: "INDIKAATTORI" },
                            { label: "Exit-haastattelujen kieli", desc: "Toistuvat sanat: 'epäreilu', 'klikki', 'suosiminen'.", val: "LAADULLINEN DATA" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-rose-50 rounded-lg border border-rose-100">
                                <div>
                                    <p className="font-bold text-rose-900 text-sm">{item.label}</p>
                                    <p className="text-xs text-rose-800">{item.desc}</p>
                                </div>
                                <span className="text-xs font-mono font-bold text-rose-600 bg-white px-2 py-1 rounded border border-rose-200">{item.val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-rose-900 text-white rounded-lg text-center font-medium shadow-md">
                    "Interventio tehdään dataan perustuen, ennen kuin kriisi on sylissä."
                </div>

                <Button onClick={() => handleComplete(1)} className="w-full bg-rose-700 hover:bg-rose-800 text-white">
                    Ota Heat Map käyttöön <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    };

    const renderStage3_Hierarchy = () => {
        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
                    <h3 className="font-bold text-xl text-indigo-950 mb-4">The Informal Power Structure</h3>

                    <div className="relative h-48 bg-white rounded-lg border border-indigo-100 mb-6 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white opacity-50"></div>

                        {/* Mock Network Graph */}
                        <div className="relative z-10 w-full max-w-xs aspect-square">
                            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-indigo-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg ring-4 ring-indigo-100 z-20"></div> {/* The Hub */}
                            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-slate-300 rounded-full"></div>
                            <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-slate-300 rounded-full"></div>
                            <div className="absolute top-1/4 left-3/4 w-3 h-3 bg-slate-300 rounded-full"></div>
                            <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-slate-300 rounded-full"></div>

                            {/* Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-indigo-200">
                                <line x1="50%" y1="50%" x2="25%" y2="25%" strokeWidth="2" />
                                <line x1="50%" y1="50%" x2="75%" y2="75%" strokeWidth="2" />
                                <line x1="50%" y1="50%" x2="75%" y2="25%" strokeWidth="2" />
                                <line x1="50%" y1="50%" x2="25%" y2="75%" strokeWidth="2" />
                            </svg>
                        </div>

                        <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded text-xs font-mono text-indigo-900 border border-indigo-100">
                            HUOM: Solmukohta ei ole aina esimies.
                        </div>
                    </div>

                    <div className="prose prose-sm text-indigo-900">
                        <p><strong>Koskemattomat:</strong> Pitkäaikaiset asiantuntijat tai siilojen vartijat, joilla on enemmän valtaa kuin organisaatiokaavio näyttää. He hallitsevat tiedonkulkua ja eristävät uhreja.</p>
                        <p><strong>Ratkaisu:</strong> Vallan hajauttaminen. Ristiinohjautuvat tiimit ja läpinäkyvä päätöksenteko vievät myrkyllisiltä vaikuttajilta heidän tärkeimmän aseensa: tiedon panttaamisen.</p>
                    </div>
                </div>

                <Button onClick={() => handleComplete(2)} className="w-full bg-indigo-700 hover:bg-indigo-800">
                    Pura varjorakenteet <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    };

    const renderStage4_Recovery = () => {
        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                    <h3 className="font-bold text-xl text-emerald-950 mb-4">Trauma-informoitu Johtaminen</h3>
                    <p className="text-emerald-800 text-sm mb-6">
                        Kun myrkky on poistettu, potilas on yhä sairas. Tiimi on "selviytymismoodissa". Tarvitaan kulttuurinen detox.
                    </p>

                    <div className="space-y-3">
                        <Card className="border-emerald-200 bg-white">
                            <CardContent className="p-4 flex gap-4 items-start">
                                <div className="p-2 bg-emerald-100 rounded-full text-emerald-700 font-bold shrink-0">1</div>
                                <div>
                                    <h5 className="font-bold text-emerald-950">Validointi</h5>
                                    <p className="text-xs text-emerald-800">Tunnustetaan tapahtunut vääryys. "Tämä tapahtui, ja se oli väärin." Ei vähättelyä.</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-emerald-200 bg-white">
                            <CardContent className="p-4 flex gap-4 items-start">
                                <div className="p-2 bg-emerald-100 rounded-full text-emerald-700 font-bold shrink-0">2</div>
                                <div>
                                    <h5 className="font-bold text-emerald-950">Puhdistus</h5>
                                    <p className="text-xs text-emerald-800">Korjataan rakenteet, jotka mahdollistivat kiusaamisen. Näkyvät muutokset prosesseihin.</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-emerald-200 bg-white">
                            <CardContent className="p-4 flex gap-4 items-start">
                                <div className="p-2 bg-emerald-100 rounded-full text-emerald-700 font-bold shrink-0">3</div>
                                <div>
                                    <h5 className="font-bold text-emerald-950">Uusi luku</h5>
                                    <p className="text-xs text-emerald-800">Legitimoiva anteeksipyyntö ja uuden suunnan konkreettiset takuut.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Button onClick={() => handleComplete(3)} className="w-full bg-emerald-700 hover:bg-emerald-800">
                    Aloita toipumisprosessi <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    };

    const renderStage5_Governance = () => {
        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 text-center">
                    <Landmark className="w-16 h-16 text-amber-800 mx-auto mb-4 opacity-80" />
                    <h3 className="font-bold text-2xl text-amber-950 mb-2 font-serif">Governance & ESG</h3>
                    <p className="text-amber-900 mb-8 max-w-md mx-auto">
                        Kiusaaminen ei lopu sillä, että "koulutamme esimiehiä". Se loppuu sillä, että rakennamme organisaation, jossa se ei ole kannattavaa.
                    </p>

                    <div className="bg-white p-6 rounded-lg border border-amber-100 text-left space-y-4 mb-8 shadow-sm">
                        <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Hallituksen KPI:t</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold">Psychological Safety Index</p>
                                <p className="text-2xl font-black text-slate-800">8.4 <span className="text-sm font-normal text-green-600">▲</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold">Case Resolution Time</p>
                                <p className="text-2xl font-black text-slate-800">14d <span className="text-sm font-normal text-green-600">▼</span></p>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-amber-800 italic mb-6">
                        "Jos hallitus kysyy vain tulosta, mutta ei sitä miten se on tehty, hallitus on osasyyllinen."
                    </p>
                </div>

                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStage(0)} className="flx-1 border-amber-200 text-amber-900">
                        Kertaa
                    </Button>
                    <Button onClick={() => handleComplete(4)} className="flex-1 bg-amber-800 hover:bg-amber-900 text-white">
                        Vahvista Strategia & Kuittaa
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
            <div className="mb-8 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-500 uppercase tracking-widest font-mono">
                    <Building2 className="w-4 h-4" />
                    <span>Masterclass: HR & Johto</span>
                </div>
                <div className="flex justify-between items-end">
                    <h2 className="text-2xl font-bold font-serif text-slate-900">{stages[currentStage].title}</h2>
                    <span className="text-sm font-mono text-slate-400">{currentStage + 1}/{stages.length}</span>
                </div>
                <Progress value={((currentStage) / stages.length) * 100} className="h-1 bg-slate-100" />
            </div>

            <Card className={cn("border-t-4 shadow-lg overflow-hidden transition-all duration-500", stages[currentStage].borderColor)}>
                <CardContent className="p-6 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStage}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentStage === 0 && renderStage1_Courage()}
                            {currentStage === 1 && renderStage2_Heatmap()}
                            {currentStage === 2 && renderStage3_Hierarchy()}
                            {currentStage === 3 && renderStage4_Recovery()}
                            {currentStage === 4 && renderStage5_Governance()}
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
};
