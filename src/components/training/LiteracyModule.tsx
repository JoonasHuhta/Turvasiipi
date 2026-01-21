"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    CheckCircle2,
    ArrowRight,
    X,
    Trophy,
    GraduationCap,
    Lightbulb
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LiteracyTest } from "@/components/lukutaito/LiteracyTest";
import { TeamChecklist } from "@/components/lukutaito/TeamChecklist";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- TYPES ---
type ViewState = 'intro' | 'content' | 'test' | 'summary';

// --- COMPONENT ---
export default function LiteracyModule({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number) => void;
    onExit: () => void;
}) {
    const [view, setView] = useState<ViewState>('intro');

    const handleTestComplete = () => {
        setView('summary');
    };

    const finishModule = () => {
        onComplete(100);
    };

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">Kiusaamisen Lukutaito</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Sertifikaatti-moduuli</span>
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
                            <h1 className="text-4xl font-serif font-black text-[#292524]">Tunnista peruskuviot.</h1>
                            <p className="text-lg text-[#57534E] leading-relaxed">
                                Kiusaaminen ei ole sattumaa, vaan usein toistuva kaava.
                                Tässä moduulissa opit erottamaan normaalin työyhteisön särön järjestelmällisestä kiusaamisesta.
                                <br /><br />
                                🏆 <strong>Suorita testi lopuksi saadaksesi merkinnän sertifikaattiin.</strong>
                            </p>
                            <Button onClick={() => setView('content')} size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                                Aloita oppiminen <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* CONTENT (Tabs) */}
                    {view === 'content' && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-8"
                        >
                            <Tabs defaultValue="theory" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 bg-[#F5F5F4]">
                                    <TabsTrigger value="theory">Tunnusmerkit</TabsTrigger>
                                    <TabsTrigger value="checklist">Tarkistuslista</TabsTrigger>
                                </TabsList>
                                <TabsContent value="theory" className="p-6 bg-white border border-[#E7E5E4] rounded-b-xl space-y-6">
                                    <div className="grid gap-4">
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-1">1</div>
                                            <p className="text-sm"><strong>Järjestelmällisyys:</strong> Kiusaaminen ei ole kertaluonteinen riita, vaan viikkoja tai kuukausia kestävä prosessi.</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-1">2</div>
                                            <p className="text-sm"><strong>Voimasuhteet:</strong> Kohteella on vaikeuksia puolustautua (esim. esimies-alaissuhde tai ryhmä vastassa).</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-1">3</div>
                                            <p className="text-sm"><strong>Tarkoituksellisuus:</strong> Teot tähtäävät kohteen eristämiseen, nöyryyttämiseen tai työssä epäonnistumiseen.</p>
                                        </div>
                                    </div>
                                    <Button onClick={() => setView('test')} className="w-full bg-[#292524] hover:bg-[#44403C] text-white">
                                        Siirry testiin <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </TabsContent>
                                <TabsContent value="checklist" className="mt-4">
                                    <TeamChecklist />
                                    <Button onClick={() => setView('test')} className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white">
                                        Olen tutustunut, siirry testiin <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </TabsContent>
                            </Tabs>
                        </motion.div>
                    )}

                    {/* TEST INTERFACE */}
                    {view === 'test' && (
                        <motion.div
                            key="test"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full"
                        >
                            <div className="mb-6 text-center">
                                <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-2">Sertifikaatti-testi</Badge>
                                <h3 className="text-2xl font-bold">Lue skenaariot huolella</h3>
                            </div>
                            {/* We wrap the existing LiteracyTest. 
                                Note: LiteracyTest calls completeModule('literacy_test'). 
                                We might need to handle the 'summary' view locally here or let LiteracyTest finish.
                            */}
                            <div className="max-w-2xl mx-auto">
                                <LiteracyTest />
                                <div className="mt-8 flex justify-center">
                                    <Button variant="ghost" onClick={() => setView('summary')} className="text-[#A8A29E]">
                                        Ohita ja jatka yhteenvetoon (vain jos testi ei lataudu)
                                    </Button>
                                </div>
                            </div>
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
                            <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                                <Trophy className="w-12 h-12" />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-serif font-black text-[#292524]">Hienoa työtä!</h1>
                                <p className="text-lg text-[#57534E]">
                                    Olet suorittanut perusmoduulin. Tämä antaa pohjan kaikelle muulle oppimiselle.
                                    Tunnistaminen on ensimmäinen askel kohti muutosta.
                                </p>
                            </div>

                            <Button onClick={finishModule} size="lg" className="bg-[#292524] hover:bg-[#44403C] text-white rounded-2xl px-12 py-8 text-xl shadow-xl">
                                Valmis
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

