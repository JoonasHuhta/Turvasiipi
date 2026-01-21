"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    MessageSquare,
    Clock,
    Hand,
    ArrowRight,
    X,
    CheckCircle2,
    Lock,
    Unlock,
    UserCircle2,
    Briefcase
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- TYPES ---
type ViewState = 'intro' | 'categories' | 'script' | 'summary';

interface BoundaryCategory {
    id: string;
    title: string;
    description: string;
    icon: any;
    examples: string[];
}

// --- DATA ---
const BOUNDARY_CATEGORIES: BoundaryCategory[] = [
    {
        id: 'professional',
        title: 'Työlliset rajat',
        description: 'Mitä teet ja milloin teet. Vastuun rajat.',
        icon: Briefcase,
        examples: [
            "En vastaa sähköposteihin klo 17 jälkeen.",
            "Tämä tehtävä ei kuulu työnkuvaani juuri nyt.",
            "Tarvitsen 3h keskeytyksettömiä aikoja päivittäin."
        ]
    },
    {
        id: 'emotional',
        title: 'Emotionaaliset rajat',
        description: 'Kenen taakkaa kannat ja mihin käytät energiasi.',
        icon: UserCircle2,
        examples: [
            "En voi kuunnella tätä juuri nyt, minulla ei ole tilaa.",
            "Minun ei tarvitse selitellä päätöksiäni sinulle.",
            "Voin keskustella tästä ammattimaisesti, mutta en ota vastaan huutamista."
        ]
    },
    {
        id: 'physical',
        title: 'Fyysiset & Viestintärajat',
        description: 'Oma tila, kosketus ja tapa tulla lähestytyksi.',
        icon: Hand,
        examples: [
            "Haluaisin että emme käytä vapaa-ajan kanavia työasioihin.",
            "Arvostaisin jos pitäisit pienen etäisyyden puhuessasi.",
            "Älä kosketa minua ilman lupaa."
        ]
    }
];

// --- COMPONENT ---
export default function BoundariesModule({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number) => void;
    onExit: () => void;
}) {
    const [view, setView] = useState<ViewState>('intro');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [scriptSteps, setScriptSteps] = useState({
        action: "",
        reason: "",
        alternative: ""
    });

    const finishModule = () => {
        onComplete(100);
    };

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">Rajojen Asettaminen</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Oman Tilan Palauttaminen</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-start max-w-4xl mx-auto w-full py-4">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {view === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="text-center space-y-8 max-w-2xl mt-12"
                        >
                            <h1 className="text-4xl font-serif font-black text-[#292524]">Rajat eivät ole seiniä.<br />Ne ovat portteja.</h1>
                            <p className="text-lg text-[#57534E] leading-relaxed">
                                Kiusaamistilanteessa rajasi on usein jyrätty matalaksi. Toipumisen kannalta on tärkeää oppia taas sanomaan <strong>"ei"</strong>, jotta voit sanoa <strong>"kyllä"</strong> omalle hyvinvoinnillesi.
                                <br /><br />
                                Raja ei ole hyökkäys toista kohtaan, vaan rakkauden osoitus itseäsi kohtaan.
                            </p>
                            <Button onClick={() => setView('categories')} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                                Tutki eri rajatyyppejä <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* CATEGORIES */}
                    {view === 'categories' && (
                        <motion.div
                            key="categories"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center">
                                <Badge variant="outline" className="text-blue-600 border-blue-200">Vaihe 1/2: Tunnistaminen</Badge>
                                <h2 className="text-3xl font-bold mt-2 text-[#292524]">Minkä rajan tarvitset eniten?</h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {BOUNDARY_CATEGORIES.map((cat) => (
                                    <Card
                                        key={cat.id}
                                        className={cn(
                                            "p-6 cursor-pointer transition-all border-[#E7E5E4] flex flex-col h-full",
                                            selectedCategory === cat.id ? "ring-2 ring-blue-500 bg-blue-50/20" : "hover:border-blue-200 hover:bg-white"
                                        )}
                                        onClick={() => setSelectedCategory(cat.id)}
                                    >
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                            <cat.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[#292524] mb-2">{cat.title}</h3>
                                        <p className="text-sm text-[#78716C] mb-4 flex-1">{cat.description}</p>

                                        {selectedCategory === cat.id && (
                                            <motion.ul
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-xs space-y-2 text-blue-800 italic border-t border-blue-100 pt-4"
                                            >
                                                {cat.examples.map((ex, i) => (
                                                    <li key={i}>• "{ex}"</li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </Card>
                                ))}
                            </div>

                            <Button
                                disabled={!selectedCategory}
                                onClick={() => setView('script')}
                                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                            >
                                Seuraava: Harjoittele auki sanomista <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* SCRIPT LAB */}
                    {view === 'script' && (
                        <motion.div
                            key="script"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-blue-600 border-blue-200">Vaihe 2/2: Harjoittelu</Badge>
                                <h2 className="text-3xl font-bold">Boundary Lab: Rakenna viesti</h2>
                                <p className="text-[#57534E]">Tämä on "Peilitekniikka". Se ei ole aggressiivinen, mutta se on selkeä.</p>
                            </div>

                            <Card className="p-8 border-[#E7E5E4] bg-white shadow-inner">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black uppercase text-[#A8A29E] tracking-widest">1. Mikä on teko/pyyntö, jonka estät?</label>
                                        <input
                                            placeholder="Esim: Ylitöiden tekeminen ilman ennakkovaroitusta..."
                                            className="w-full p-4 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl focus:ring-2 ring-blue-500 outline-none"
                                            value={scriptSteps.action}
                                            onChange={(e) => setScriptSteps({ ...scriptSteps, action: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-black uppercase text-[#A8A29E] tracking-widest">2. Mikä on selkeä syy (lyhyesti)?</label>
                                        <input
                                            placeholder="Esim: Minulla on harrastus / tarvitsen lepoa..."
                                            className="w-full p-4 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl focus:ring-2 ring-blue-500 outline-none"
                                            value={scriptSteps.reason}
                                            onChange={(e) => setScriptSteps({ ...scriptSteps, reason: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="mt-12 p-8 bg-blue-50/50 rounded-2xl border border-blue-100 text-center relative overflow-hidden">
                                    <MessageSquare className="absolute -bottom-4 -right-4 w-24 h-24 text-blue-100/50" />
                                    <h4 className="text-xs font-black uppercase text-blue-600 tracking-widest mb-4">Lopputulos:</h4>
                                    <p className="text-xl font-serif text-[#292524] leading-relaxed">
                                        "En valitettavasti pysty <strong>{scriptSteps.action || '[toiminta]'}</strong>, koska <strong>{scriptSteps.reason || '[syy]'}</strong>. Sovitaan tästä ensi kerralla aiemmin."
                                    </p>
                                </div>
                            </Card>

                            <Button
                                disabled={!scriptSteps.action || !scriptSteps.reason}
                                onClick={() => setView('summary')}
                                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white shadow-xl disabled:opacity-50"
                            >
                                Valmis <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* SUMMARY */}
                    {view === 'summary' && (
                        <motion.div
                            key="summary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center space-y-12 max-w-xl mt-12"
                        >
                            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-blue-50/50">
                                <CheckCircle2 className="w-12 h-12" />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-serif font-black text-[#292524]">Seisominen omilla jaloilla.</h1>
                                <p className="text-lg text-[#57534E]">
                                    Rajojen asettaminen voi tuntua aluksi syyllistävältä, mutta se on ainoa tapa säilyttää työkyky ja mielenterveys pitkällä aikavälillä.
                                    <br /><br />
                                    Olet ottanut ison askeleen takaisin kohti omaa voimaasi.
                                </p>
                            </div>

                            <Button onClick={finishModule} size="lg" className="bg-[#292524] hover:bg-[#44403C] text-white rounded-2xl px-12 py-8 text-xl shadow-xl">
                                Palaa valmennukseen
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

