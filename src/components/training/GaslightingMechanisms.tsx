"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertCircle,
    MessageCircle,
    Eye,
    EyeOff,
    Zap,
    Search,
    FileText,
    ArrowRight,
    X,
    ShieldCheck,
    HelpCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- TYPES ---
type ViewState = 'intro' | 'tactics' | 'stages' | 'reclaim' | 'summary';

interface Tactic {
    phrase: string;
    translation: string;
    tacticName: string;
    description: string;
}

// --- DATA ---
const TACTICS: Tactic[] = [
    {
        phrase: "Olet aivan liian herkkä, se oli vain vitsi.",
        translation: "Hän yrittää vähätellä kokemustasi ja siirtää huomion pois teostaan.",
        tacticName: "Vähättely (Trivializing)",
        description: "Tekee tunteistasi 'vääränlaisia', jolloin alat epäillä omaa reagointikykyäsi."
    },
    {
        phrase: "Ei noin ole koskaan tapahtunut. Muistat väärin.",
        translation: "Hän valehtelee suoraan muuttaakseen historian kulkua.",
        tacticName: "Kieltäminen (Denial)",
        description: "Vaarallisin muoto. Kun tätä toistetaan riittävän usein, alat luottaa hänen muistiinsa omasi sijasta."
    },
    {
        phrase: "Miksi aina aloitat riidan? Sinulla on selvästi vaikea kausi.",
        translation: "Hän tekee sinusta ongelman välttyäkseen vastuulta.",
        tacticName: "Kääntäminen (Diversion)",
        description: "Vaihtaa puheenaihetta hyökkäämällä luonnettasi vastaan ('ad hominem')."
    }
];

// --- COMPONENT ---
export default function GaslightingMechanisms({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number) => void;
    onExit: () => void;
}) {
    const [view, setView] = useState<ViewState>('intro');
    const [activeTactic, setActiveTactic] = useState<number | null>(null);

    const finishModule = () => {
        onComplete(100);
    };

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700">
                        <EyeOff className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">Gaslightingin Mekanismit</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Todellisuuden Suojaaminen</span>
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
                            <h1 className="text-4xl font-serif font-black text-[#292524]">Se ei johdu muististasi.</h1>
                            <p className="text-lg text-[#57534E] leading-relaxed">
                                <strong>Gaslighting</strong> on manipulointia, jossa tavoitteena on saada kohde epäilemään omaa havaintokykyään, muistiaan tai mielenterveyttään.
                                <br /><br />
                                Se on hienovarainen prosessi, joka nakertaa itsetuntoa pala palalta. Mutta kun opit tunnistamaan koodin, se menettää valtansa.
                            </p>
                            <Button onClick={() => setView('tactics')} size="lg" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                                Tunnista taktiikat <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* TACTICS REVEAL */}
                    {view === 'tactics' && (
                        <motion.div
                            key="tactics"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center">
                                <Badge variant="outline" className="text-orange-600 border-orange-200">Vaihe 1/3: Käännöstyökalut</Badge>
                                <h2 className="text-3xl font-bold mt-2">Mitä he sanovat vs. Mitä tapahtuu</h2>
                                <p className="text-[#57534E]">Klikkaa kortteja katsoaksesi kulissien taakse.</p>
                            </div>

                            <div className="grid gap-4">
                                {TACTICS.map((t, i) => (
                                    <Card
                                        key={i}
                                        onClick={() => setActiveTactic(activeTactic === i ? null : i)}
                                        className={cn(
                                            "p-6 cursor-pointer transition-all border-[#E7E5E4] overflow-hidden",
                                            activeTactic === i ? "ring-2 ring-orange-500 bg-orange-50/30" : "hover:border-orange-200"
                                        )}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-black uppercase text-orange-400 tracking-widest">Kuultu lause</span>
                                            {activeTactic === i && <Badge className="bg-orange-600 text-white border-0">{t.tacticName}</Badge>}
                                        </div>
                                        <div className="text-xl font-medium text-[#292524] italic mb-4">
                                            "{t.phrase}"
                                        </div>

                                        <AnimatePresence>
                                            {activeTactic === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    className="border-t border-orange-100 pt-4"
                                                >
                                                    <p className="text-[#44403C] font-bold mb-2">💡 Totuus:</p>
                                                    <p className="text-[#57534E] mb-4">{t.translation}</p>
                                                    <div className="bg-white p-4 rounded-xl text-sm border border-orange-100 italic text-[#78716C]">
                                                        {t.description}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Card>
                                ))}
                            </div>

                            <Button onClick={() => setView('stages')} className="w-full py-6 bg-[#292524] hover:bg-[#44403C] text-white">
                                Kuinka ilmiö etenee? <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* STAGES OF GASLIGHTING */}
                    {view === 'stages' && (
                        <motion.div
                            key="stages"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-orange-600 border-orange-200">Vaihe 2/3: Prosessi</Badge>
                                <h2 className="text-3xl font-bold">Laskeutuminen sumuun</h2>
                                <p className="text-[#57534E]">Gaslighting ei tapahdu kerralla, vaan se on hidas prosessi.</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 relative">
                                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-orange-100 -translate-y-1/2 hidden md:block" />

                                {[
                                    { step: 1, name: "Epäusko", text: "Ajattelet, että hän on varmaan erehtynyt tai sekaisin. Et ota sitä vielä henkilökohtaisesti." },
                                    { step: 2, name: "Puolustautuminen", text: "Yrität väitellä ja todistaa olevasi oikeassa. Käytät valtavasti energiaa puolusteluun." },
                                    { step: 3, name: "Masennus", text: "Alat uskoa, että olet itse viallinen. Epäilet jokaista ajatustasi ja tunnetta." }
                                ].map((s, i) => (
                                    <Card key={i} className="relative z-10 p-6 border-[#E7E5E4] bg-white flex flex-col items-center text-center space-y-4">
                                        <div className="w-10 h-10 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold">
                                            {s.step}
                                        </div>
                                        <h3 className="font-bold text-[#292524]">{s.name}</h3>
                                        <p className="text-xs text-[#78716C]">{s.text}</p>
                                    </Card>
                                ))}
                            </div>

                            <Button onClick={() => setView('reclaim')} className="w-full py-6 bg-orange-600 hover:bg-orange-700 text-white rounded-full">
                                Kuinka palautat todellisuuden? <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* RECLAIMING REALITY */}
                    {view === 'reclaim' && (
                        <motion.div
                            key="reclaim"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-emerald-600 border-emerald-200">Vaihe 3/3: Toiminta</Badge>
                                <h2 className="text-3xl font-bold">Ota todellisuus haltuun</h2>
                                <p className="text-[#57534E]">Manipulointi murtuu, kun sitä tarkastellaan valossa.</p>
                            </div>

                            <div className="grid gap-4">
                                <Card className="p-6 border-emerald-100 bg-emerald-50/20 flex gap-4">
                                    <div className="shrink-0 w-12 h-12 bg-white rounded-xl border border-emerald-100 flex items-center justify-center text-emerald-600">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#292524]">Kirjoita asiat ylös heti</h4>
                                        <p className="text-sm text-[#78716C]">Lauseet, kellonajat ja omat tunteesi. Dokumentaatio on ankkuri, joka pitää sinut todellisuudessa.</p>
                                    </div>
                                </Card>
                                <Card className="p-6 border-emerald-100 bg-emerald-50/20 flex gap-4">
                                    <div className="shrink-0 w-12 h-12 bg-white rounded-xl border border-emerald-100 flex items-center justify-center text-emerald-600">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#292524]">Luota 'todellisuustarkistajiin'</h4>
                                        <p className="text-sm text-[#78716C]">Puhu ystäville tai kollegoille, jotka tuntevat sinut. He auttavat näkemään, että et ole sekoamassa.</p>
                                    </div>
                                </Card>
                                <Card className="p-6 border-orange-100 bg-orange-50/20 flex gap-4">
                                    <div className="shrink-0 w-12 h-12 bg-white rounded-xl border border-orange-100 flex items-center justify-center text-orange-600">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#292524]">Lopeta väittely</h4>
                                        <p className="text-sm text-[#78716C]">Gaslighting-tekijä ei pyydä anteeksi. Tärkeintä on, että TIEDÄT totuuden itse. Sitä ei tarvitse todistaa hänelle.</p>
                                    </div>
                                </Card>
                            </div>

                            <Button onClick={() => setView('summary')} className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
                                Olen valmis <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* SUMMARY */}
                    {view === 'summary' && (
                        <motion.div
                            key="summary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center space-y-12 max-w-xl"
                        >
                            <div className="w-24 h-24 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-orange-50/50">
                                <ShieldCheck className="w-12 h-12" />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-serif font-black text-[#292524]">Totuus on vahva.</h1>
                                <p className="text-lg text-[#57534E]">
                                    Nyt kun tiedät nämä taktiikat, olet vaikeampi kohde.
                                    Älä anna kenenkään kirjoittaa historiaasi puolestasi.
                                    Sinun havaintosi on arvokas ja tosi.
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

