"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Brain,
    ArrowRight,
    ArrowLeft,
    HelpCircle,
    RotateCcw,
    Eye,
    Zap,
    MessageCircle,
    CheckCircle2,
    Users,
    Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BullyingPatternsProps {
    onComplete: () => void;
    onExit: () => void;
}

export const BullyingPatterns: React.FC<BullyingPatternsProps> = ({ onComplete, onExit }) => {
    const [flipped, setFlipped] = useState<number | null>(null);
    const [completed, setCompleted] = useState<number[]>([]);

    const patterns = [
        {
            id: 1,
            title: "Gaslighting",
            icon: Brain,
            question: "Mitä se on?",
            answer: "Todellisuuden kieltämistä. 'Kuvittelet vain', 'Olet yliherkkä'. Saa uhrin epäilemään omaa mielenterveyttään.",
            tactic: "Psykologinen väkivalta"
        },
        {
            id: 2,
            title: "DARVO",
            icon: RotateCcw,
            question: "Lyhenne sanoista...",
            answer: "Deny, Attack, Reverse Victim and Offender. Kiusaaja kieltää teon, hyökkää syyttäjää vastaan ja kääntää roolit niin, että uhrista tehdään syyllinen.",
            tactic: "Syyllisyyden kääntäminen"
        },
        {
            id: 3,
            title: "Triangulation",
            icon: Users,
            question: "Miten se toimii?",
            answer: "Kolmansien osapuolten käyttö konfliktissa. 'Kaikki muutkin ovat sitä mieltä...' tai liittolaisten värvääminen uhria vastaan.",
            tactic: "Sosiaaliset pelit"
        },
        {
            id: 4,
            title: "Mykkäkoulu",
            icon: Eye,
            question: "Miksi se satuttaa?",
            answer: "Täydellinen huomioimattomuus. Ihminen on laumaeläin, ja sivuuttaminen aktivoi samoja aivoalueita kuin fyysinen kipu.",
            tactic: "Sosiaalinen eristäminen"
        },
        {
            id: 5,
            title: "Love Bombing",
            icon: Heart,
            question: "Kiusaamisessa?",
            answer: "Kyllä. Alussa ylenpalttista kehumista luottamuksen saamiseksi, jota seuraa äkillinen pudotus ja kritiikki. Saa uhrin janoamaan hyväksyntää.",
            tactic: "Manipulointi"
        },
        {
            id: 6,
            title: "Maalittaminen",
            icon: Zap,
            question: "Onko se vain netissä?",
            answer: "Ei. Työpaikalla se on systemaattista virheiden etsimistä ja suurennuslasilla tarkkailua, jotta saadaan peruste irtisanomiselle.",
            tactic: "Strateginen tuhoaminen"
        }
    ];



    const handleCardClick = (index: number) => {
        if (completed.includes(index)) return;

        if (flipped === index) {
            setFlipped(null);
        } else {
            setFlipped(index);
            if (!completed.includes(index)) {
                setTimeout(() => {
                    setCompleted(prev => [...prev, index]);
                }, 2000); // Mark as 'learned' after keeping it open for a bit? Or just immediately. Let's say user must read.
            }
        }
    };

    // Auto-complete logic better: User reads, then clicks "Ymmärretty" or simply flipping it marks it?
    // Let's create a "Mark read" button on the back of the card.

    const markRead = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCompleted(prev => [...prev, index]);
        setFlipped(null);
    };

    const allRead = completed.length === patterns.length;

    return (
        <div className="min-h-full p-6 md:p-12 max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Keskeytä
                </Button>
                <div className="text-right">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Opittu</div>
                    <div className="text-xl font-black text-amber-600">{completed.length} / {patterns.length}</div>
                </div>
            </div>

            <div className="text-center space-y-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
                    Tunnista <br /><span className="text-amber-600">Kuviot</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Käännä kortit oppiaksesi tunnistamaan yleisimmät manipuloinnin ja henkisen väkivallan strategiat.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patterns.map((p, i) => (
                    <div key={i} className="relative h-80 group perspective-1000 cursor-pointer" onClick={() => handleCardClick(i)}>
                        <motion.div
                            className="w-full h-full relative preserve-3d transition-all duration-500"
                            animate={{ rotateY: flipped === i ? 180 : 0 }}
                        >
                            {/* FRONT */}
                            <div className={cn(
                                "absolute inset-0 backface-hidden rounded-[2rem] p-8 flex flex-col items-center justify-center gap-6 shadow-xl border-2 transition-all",
                                completed.includes(i) ? "bg-slate-50 border-slate-200 opacity-50" : "bg-white border-white hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-500/10"
                            )}>
                                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-2",
                                    completed.includes(i) ? "bg-slate-200 text-slate-400" : "bg-amber-100 text-amber-600"
                                )}>
                                    <p.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black uppercase text-slate-900 text-center">{p.title}</h3>
                                <p className="text-slate-400 font-medium text-sm border-t pt-4 w-full text-center tracking-widest uppercase">
                                    {completed.includes(i) ? "Opittu" : "Klikkaa kääntääksesi"}
                                </p>
                            </div>

                            {/* BACK */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center gap-4 text-white shadow-xl">
                                <div className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2">{p.tactic}</div>
                                <h4 className="text-xl font-bold leading-tight">{p.question}</h4>
                                <p className="text-slate-300 text-sm leading-relaxed">{p.answer}</p>

                                {!completed.includes(i) && (
                                    <Button
                                        onClick={(e) => markRead(e, i)}
                                        size="sm"
                                        className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold uppercase tracking-widest text-[10px] rounded-full px-6"
                                    >
                                        Ymmärretty <CheckCircle2 className="ml-2 w-3 h-3" />
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {allRead && (
                <div className="flex justify-center pt-8 animate-in zoom-in duration-300">
                    <Button onClick={onComplete} className="rounded-full px-12 py-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg shadow-xl">
                        Kaikki opittu! Palaa takaisin <ArrowRight className="ml-2" />
                    </Button>
                </div>
            )}
        </div>
    );
};
