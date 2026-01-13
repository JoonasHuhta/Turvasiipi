"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    MessageSquare,
    ArrowLeft,
    Send,
    User,
    Zap,
    ShieldAlert,
    Heart,
    Brain,
    HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DifficultConversationsProps {
    onComplete: () => void;
    onExit: () => void;
}

type OpponentType = 'aggro' | 'victim' | 'gaslight';

interface Message {
    id: string;
    sender: 'user' | 'opponent';
    text: string;
    type?: 'normal' | 'error' | 'success';
}

export const DifficultConversations: React.FC<DifficultConversationsProps> = ({ onComplete, onExit }) => {
    const [selectedOpponent, setSelectedOpponent] = useState<OpponentType | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [turn, setTurn] = useState(0);
    const [authorityScore, setAuthorityScore] = useState(50);
    const [empathyScore, setEmpathyScore] = useState(50);
    const [isThinking, setIsThinking] = useState(false);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'won' | 'lost'>('intro');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isThinking]);

    const opponents = {
        aggro: {
            title: "Höyryjyrä",
            description: "Aggressiivinen, keskeyttää, korottaa ääntä.",
            icon: Zap,
            color: "text-amber-500",
            bg: "bg-amber-100",
            intro: "Höyryjyrä tulee huoneeseen ovet paukkuen."
        },
        victim: {
            title: "Uhriutuja",
            description: "Itkee, syyttää sinua julmuudesta.",
            icon: Heart,
            color: "text-rose-500",
            bg: "bg-rose-100",
            intro: "Uhriutuja istuu alas nenäliina kädessä, kyyneleet silmissä."
        },
        gaslight: {
            title: "Gaslighter",
            description: "Kieltää kaiken, kyseenalaistaa muistisi.",
            icon: Brain,
            color: "text-indigo-500",
            bg: "bg-indigo-100",
            intro: "Gaslighter katsoo sinua hymyillen, täysin rauhallisena."
        }
    };

    const dialogs = {
        aggro: [
            {
                opponent: "MITÄ NYT TAAS?! Minulla on oikeita töitä tehtävänä, eikä aikaa kuunnella sun kitinää!",
                options: [
                    { text: "Älä huuda minulle! En kuuntele tuollaista!", effect: { auth: -10, emp: -10 }, reply: "ÄLÄ SINÄ KOMENTELE MINUA!!", outcome: 'bad' },
                    { text: "Huomaan että olet kiihtynyt. Odotan hetken.", effect: { auth: +10, emp: +5 }, reply: "... (Huokaa raskaasti) No?! Sano asiasi nopeasti.", outcome: 'good' },
                    { text: "(Hiljaisuus) ...", effect: { auth: -5, emp: 0 }, reply: "Onko sulla mitään asiaa vai voinko lähteä?", outcome: 'neutral' }
                ]
            },
            {
                opponent: "Tämä projekti on myöhässä SINUN takiasi! Älä yritä vierittää syytä minun niskoilleni!",
                options: [
                    { text: "En vieritä syytä, vaan yritän ratkaista ongelman. Puhutaan faktoista.", effect: { auth: +15, emp: +5 }, reply: "Faktoista?! Hah! No katsotaan sun 'faktoja'.", outcome: 'good' },
                    { text: "Ei se ole minun syyni!! Sinä et toimittanut niitä lukuja!", effect: { auth: -20, emp: -5 }, reply: "Nyt riitti! En kuuntele tuota valehtelua!", outcome: 'bad' },
                    { text: "Anteeksi, yritän parhaani...", effect: { auth: -20, emp: +10 }, reply: "Sun parhaasi ei selvästikään riitä!", outcome: 'bad' }
                ]
            },
            {
                opponent: "Minä olen tehnyt tätä työtä 20 vuotta! Älä tule neuvomaan minua!",
                options: [
                    { text: "Arvostan kokemustasi. Siksi haluankin yhteistyön toimivan.", effect: { auth: +10, emp: +15 }, reply: "Hmmh. No... kokemus on kyllä valttia.", outcome: 'good' },
                    { text: "Maailma muuttuu, papka.", effect: { auth: -30, emp: -20 }, reply: "ULOS MUN TOIMISTOSTA!", outcome: 'fail' },
                    { text: "En neuvo, vaan kerran pelisäännöt.", effect: { auth: +5, emp: -5 }, reply: "Pelisäännöt... sinä ja sun säännöt.", outcome: 'neutral' }
                ]
            }
        ],
        victim: [
            {
                opponent: "Miksi sä kutsuit mut tänne? (Niisk) Olenko mä tehnyt jotain väärin? Mä teen aina kaikkeni...",
                options: [
                    { text: "Ei hätää, ota nenäliina. Ei tämä ole vakavaa.", effect: { auth: -15, emp: +20 }, reply: "Mä pelkään niin kauheasti että mä saan potkut! (Itku yltyy)", outcome: 'bad' },
                    { text: "Haluaisin keskustella tiimin ilmapiiristä ja sinun roolistasi siinä.", effect: { auth: +10, emp: +5 }, reply: "Mun roolista? Eli mä olen syyllinen? Kaikki vihaa mua...", outcome: 'good' },
                    { text: "Lopeta tuo pillitys.", effect: { auth: +10, emp: -30 }, reply: "Sä olet julma! Hirviö!", outcome: 'fail' }
                ]
            },
            {
                opponent: "Mä en vaan jaksa enää... kukaan ei ymmärrä mua. Säkin olet aina mua vastaan.",
                options: [
                    { text: "En ole sinua vastaan. Haluan tukea sinua, mutta meidän pitää muuttaa tapaa kommunikoida.", effect: { auth: +10, emp: +10 }, reply: "Tukea? Tarkoitatko sitä oikeasti?", outcome: 'good' },
                    { text: "No voi raukkaa. Ehkä sun pitäisi levätä.", effect: { auth: -10, emp: +15 }, reply: "Niin pitäisi... mä lähden kotiin. (Lähtee kesken)", outcome: 'bad' },
                    { text: "Tuo uhriutuminen ei toimi minuun.", effect: { auth: +15, emp: -10 }, reply: "Uhriutuminen?! Mä olen uhri tässä!", outcome: 'neutral' }
                ]
            },
            {
                opponent: "Jos sä kirjaat tästä merkinnän, mun elämä on pilalla! Miten sä voit tehdä tän mulle?",
                options: [
                    { text: "Tämä on normaali kehityskeskustelu. Kirjaan sovitut asiat.", effect: { auth: +15, emp: +5 }, reply: "...okei. Jos sä lupaat kirjata rehellisesti.", outcome: 'good' },
                    { text: "En kirjaa jos lupaat parantaa tapasi.", effect: { auth: -20, emp: +10 }, reply: "Lupaan! Lupaan mitä vaan! (Ei muuta käytöstään)", outcome: 'bad' },
                    { text: "Se on sinun valintojesi seuraus.", effect: { auth: +10, emp: -10 }, reply: "(Tuijottaa hiljaa, mutta lopettaa itkun)", outcome: 'good' }
                ]
            }
        ],
        gaslight: [
            {
                opponent: "Hei. Mikäs nyt on hätänä? Näytät stressaantuneelta. Onko kotona kaikki hyvin?",
                options: [
                    { text: "Älä vaihda aihetta. Puhutaan eilisestä palaverista.", effect: { auth: +15, emp: 0 }, reply: "Eilisestä? Ai siitä missä sä korotit ääntäsi?", outcome: 'good' },
                    { text: "Ihan hyvin... vähän väsynyt vain.", effect: { auth: -15, emp: -5 }, reply: "Niin minä ajattelinkin. Sä olet ylirasittunut, kuvittelet asioita.", outcome: 'bad' },
                    { text: "Se ei kuulu tähän.", effect: { auth: +5, emp: 0 }, reply: "Tietenkin kuuluu. Me ollaan ihmisiä. Mä olen huolissani susta.", outcome: 'neutral' }
                ]
            },
            {
                opponent: "Mä en koskaan sanonut noin. Sä olet ymmärtänyt väärin. Taas.",
                options: [
                    { text: "Minulla on sähköposti tässä, jossa lukee juuri niin.", effect: { auth: +20, emp: 0 }, reply: "Sähköposti? Näytä. ... Hah, sä tulkitset tuon aivan väärin.", outcome: 'good' },
                    { text: "Ehkä mä sitten muistan väärin...?", effect: { auth: -20, emp: -10 }, reply: "Niin muistat. Sä olet viime aikoina ollut tosi hajamielinen.", outcome: 'bad' },
                    { text: "Kuulin sen omin korvin, ja Pekka kuuli myös.", effect: { auth: +15, emp: 5 }, reply: "Pekka? Pekka sanoo mitä vaan miellyttääkseen sua.", outcome: 'good' }
                ]
            },
            {
                opponent: "Oletko sä varma että olet sopiva tähän rooliin? Vaikutat... epävakaalta.",
                options: [
                    { text: "Minun pätevyyteni ei ole keskustelun aihe. Aihe on sinun käytöksesi.", effect: { auth: +20, emp: 0 }, reply: "... (Hymy hyytyy). Selvä. Puhutaan sitten.", outcome: 'good' },
                    { text: "Mitä?! Minä olen täysin vakaa!", effect: { auth: -10, emp: -10 }, reply: "No ei tuo reaktio kovin vakaalta vaikuta. Rauhoitu nyt.", outcome: 'bad' }
                ]
            }
        ]
    };

    const startGame = (opponent: OpponentType) => {
        setGameState('playing');
        setSelectedOpponent(opponent);
        setMessages([{ id: 'init', sender: 'opponent', text: opponents[opponent].intro }]);
        setTurn(0);
        setAuthorityScore(50);
        setEmpathyScore(50);

        setTimeout(() => {
            const firstMsg = dialogs[opponent][0].opponent;
            addMessage('opponent', firstMsg);
        }, 1500);
    };

    const addMessage = (sender: 'user' | 'opponent', text: string, type: 'normal' | 'error' | 'success' = 'normal') => {
        setMessages(prev => [...prev, { id: Math.random().toString(), sender, text, type }]);
    };

    const handleOptionClick = (option: any) => {
        addMessage('user', option.text);

        setAuthorityScore(prev => Math.min(100, Math.max(0, prev + option.effect.auth)));
        setEmpathyScore(prev => Math.min(100, Math.max(0, prev + option.effect.emp)));

        setIsThinking(true);
        setTimeout(() => {
            setIsThinking(false);
            if (option.outcome === 'fail') {
                addMessage('opponent', option.reply, 'error');
                setGameState('lost');
            } else if (turn >= 2) {
                addMessage('opponent', option.reply);
                setTimeout(() => setGameState('won'), 1000);
            } else {
                addMessage('opponent', option.reply);
                setTimeout(() => {
                    setTurn(prev => prev + 1);
                    const nextRound = dialogs[selectedOpponent!][turn + 1];
                    if (nextRound) {
                        addMessage('opponent', nextRound.opponent);
                    }
                }, 1500);
            }
        }, 1000);
    };

    const getCurrentOptions = () => {
        if (!selectedOpponent) return [];
        return dialogs[selectedOpponent][turn]?.options || [];
    };

    return (
        <div className="min-h-full p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Keskeytä
                </Button>
                <div className="flex gap-4">
                    {gameState !== 'intro' && (
                        <>
                            <div className="flex items-center gap-2" title="Authority Score">
                                <ShieldAlert className={cn("w-4 h-4", authorityScore < 30 ? "text-rose-500" : "text-slate-400")} />
                                <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-800 transition-all duration-500" style={{ width: `${authorityScore}%` }} />
                                </div>
                            </div>
                            <div className="flex items-center gap-2" title="Empathy Score">
                                <Heart className={cn("w-4 h-4", empathyScore < 30 ? "text-rose-500" : "text-slate-400")} />
                                <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-400 transition-all duration-500" style={{ width: `${empathyScore}%` }} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {gameState === 'intro' && (
                <div className="space-y-8 text-center pt-8">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
                        Valitse <span className="text-indigo-600">Vastustajasi</span>
                    </h1>
                    <p className="text-slate-500 max-w-lg mx-auto">
                        Kenet kohtaat tänään? Harjoittele erilaisia persoonallisuuksia vastaan.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {(Object.keys(opponents) as OpponentType[]).map((key) => {
                            const opp = opponents[key];
                            return (
                                <Card
                                    key={key}
                                    onClick={() => startGame(key)}
                                    className="p-6 cursor-pointer hover:scale-105 transition-transform border-slate-200 hover:shadow-xl group"
                                >
                                    <div className={cn("w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 transition-colors", opp.bg)}>
                                        <opp.icon className={cn("w-8 h-8", opp.color)} />
                                    </div>
                                    <h3 className="font-black text-xl text-slate-900 uppercase mb-2">{opp.title}</h3>
                                    <p className="text-sm text-slate-500">{opp.description}</p>
                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold uppercase tracking-widest text-indigo-600">
                                        Aloita haaste
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            )}

            {(gameState === 'playing' || gameState === 'won' || gameState === 'lost') && (
                <Card className="flex-1 flex flex-col overflow-hidden border-slate-200 shadow-2xl h-[600px]">
                    {/* Chat Area */}
                    <div className="flex-1 bg-slate-50 p-4 md:p-6 overflow-y-auto space-y-4">
                        {messages.map((msg, i) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex gap-3 max-w-[80%]",
                                    msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    msg.sender === 'user' ? "bg-slate-900 text-white" : opponents[selectedOpponent!].bg
                                )}>
                                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : selectedOpponent === 'aggro' ? <Zap className="w-4 h-4 text-amber-600" /> : selectedOpponent === 'victim' ? <Heart className="w-4 h-4 text-rose-600" /> : <Brain className="w-4 h-4 text-indigo-600" />}
                                </div>
                                <div className={cn(
                                    "p-3 rounded-2xl text-sm",
                                    msg.sender === 'user' ? "bg-slate-900 text-white rounded-tr-sm" :
                                        msg.type === 'error' ? "bg-rose-100 text-rose-800 border-rose-200 border rounded-tl-sm" :
                                            "bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm"
                                )}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                        {isThinking && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 text-slate-400 text-xs ml-12">
                                <span>kirjoittaa...</span>
                            </motion.div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Controls */}
                    <div className="p-4 bg-white border-t border-slate-200">
                        {gameState === 'playing' && !isThinking ? (
                            <div className="grid gap-2">
                                {getCurrentOptions().map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleOptionClick(opt)}
                                        className="text-left p-3 rounded-xl border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-900 transition-all text-sm font-medium"
                                    >
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        ) : gameState === 'won' ? (
                            <div className="text-center space-y-4 py-4 animate-in zoom-in">
                                <h3 className="text-2xl font-black text-emerald-600 uppercase">Keskustelu hallinnassa!</h3>
                                <p className="text-slate-600">Säilytit malttisi ja auktoriteettisi hienosti.</p>
                                <Button onClick={onComplete} className="bg-emerald-600 rounded-full px-8">Palaa valikkoon</Button>
                            </div>
                        ) : gameState === 'lost' ? (
                            <div className="text-center space-y-4 py-4 animate-in zoom-in">
                                <h3 className="text-2xl font-black text-rose-600 uppercase">Tilanne eskaloitui</h3>
                                <p className="text-slate-600">Menetit joko malttisi tai auktoriteettisi. Yritä uudelleen.</p>
                                <Button onClick={() => startGame(selectedOpponent!)} variant="outline" className="rounded-full px-8">Yritä uudelleen</Button>
                            </div>
                        ) : null}
                    </div>
                </Card>
            )}
        </div>
    );
};
