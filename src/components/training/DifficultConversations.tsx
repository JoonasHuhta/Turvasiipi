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
import { useLanguage } from "@/context/LanguageContext";

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

interface DialogOption {
    text: string;
    reply: string;
    effect: { auth: number; emp: number };
    outcome: 'good' | 'bad' | 'neutral' | 'fail';
}

interface DialogRound {
    opponent: string;
    options: DialogOption[];
}

interface OpponentData {
    title: string;
    description: string;
    intro: string;
    dialogs: DialogRound[];
}

export const DifficultConversations: React.FC<DifficultConversationsProps> = ({ onComplete, onExit }) => {
    const { t } = useLanguage();
    const [selectedOpponent, setSelectedOpponent] = useState<OpponentType | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [turn, setTurn] = useState(0);
    const [authorityScore, setAuthorityScore] = useState(50);
    const [empathyScore, setEmpathyScore] = useState(50);
    const [isThinking, setIsThinking] = useState(false);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'won' | 'lost'>('intro');
    const bottomRef = useRef<HTMLDivElement>(null);
    const [opponentsData, setOpponentsData] = useState<Record<string, OpponentData>>({});

    useEffect(() => {
        // Load data dynamically
        const rawData = t('training.difficult_conversations.opponents', { returnObjects: true });
        if (rawData && typeof rawData === 'object' && !Array.isArray(rawData)) {
            // Need to cast the options because outcome might be string, but TS expects union
            // But since 'good' | 'bad' etc are simple strings, this usually works if JSON matches.
            setOpponentsData(rawData as any);
        }
    }, [t]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isThinking]);

    const opponentsMetadata = {
        aggro: {
            icon: Zap,
            color: "text-amber-500",
            bg: "bg-amber-100",
        },
        victim: {
            icon: Heart,
            color: "text-rose-500",
            bg: "bg-rose-100",
        },
        gaslight: {
            icon: Brain,
            color: "text-indigo-500",
            bg: "bg-indigo-100",
        }
    };

    const startGame = (opponentKey: OpponentType) => {
        if (!opponentsData[opponentKey]) return;

        setGameState('playing');
        setSelectedOpponent(opponentKey);
        setMessages([{ id: 'init', sender: 'opponent', text: opponentsData[opponentKey].intro }]);
        setTurn(0);
        setAuthorityScore(50);
        setEmpathyScore(50);

        setTimeout(() => {
            const firstMsg = opponentsData[opponentKey].dialogs?.[0]?.opponent;
            if (firstMsg) addMessage('opponent', firstMsg);
        }, 1500);
    };

    const addMessage = (sender: 'user' | 'opponent', text: string, type: 'normal' | 'error' | 'success' = 'normal') => {
        setMessages(prev => [...prev, { id: Math.random().toString(), sender, text, type }]);
    };

    const handleOptionClick = (option: DialogOption) => {
        addMessage('user', option.text);

        setAuthorityScore(prev => Math.min(100, Math.max(0, prev + option.effect.auth)));
        setEmpathyScore(prev => Math.min(100, Math.max(0, prev + option.effect.emp)));

        setIsThinking(true);
        setTimeout(() => {
            setIsThinking(false);
            if (option.outcome === 'fail') {
                addMessage('opponent', option.reply, 'error');
                setGameState('lost');
            } else if (turn >= 2) { // End after 3 rounds roughly, assuming 0 indexed
                addMessage('opponent', option.reply);
                setTimeout(() => setGameState('won'), 1000);
            } else {
                addMessage('opponent', option.reply);
                setTimeout(() => {
                    // Check if next round exists 
                    if (selectedOpponent && opponentsData[selectedOpponent]) {
                        const nextRound = opponentsData[selectedOpponent].dialogs?.[turn + 1];
                        if (nextRound) {
                            setTurn(prev => prev + 1);
                            addMessage('opponent', nextRound.opponent);
                        } else {
                            // If no next round, we win!
                            setTimeout(() => setGameState('won'), 1000);
                        }
                    }
                }, 1500);
            }
        }, 1000);
    };

    const getCurrentOptions = () => {
        if (!selectedOpponent || !opponentsData[selectedOpponent]) return [];
        return opponentsData[selectedOpponent].dialogs?.[turn]?.options || [];
    };

    // If data isn't loaded yet, show loading or empty
    if (Object.keys(opponentsData).length === 0) return (
        <div className="min-h-full flex items-center justify-center">
            <p className="text-slate-400 animate-pulse">Loading scenarios...</p>
        </div>
    );

    return (
        <div className="min-h-full p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500 font-sans text-[#44403C]">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-[#78716C] hover:text-[#292524] gap-2">
                    <ArrowLeft className="w-4 h-4" /> {t('training.difficult_conversations.ui.cancel')}
                </Button>
                <div className="flex gap-4">
                    {gameState !== 'intro' && (
                        <>
                            <div className="flex items-center gap-2" title="Authority Score">
                                <ShieldAlert className={cn("w-4 h-4", authorityScore < 30 ? "text-rose-500" : "text-[#78716C]")} />
                                <div className="w-20 h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#292524] transition-all duration-500" style={{ width: `${authorityScore}%` }} />
                                </div>
                            </div>
                            <div className="flex items-center gap-2" title="Empathy Score">
                                <Heart className={cn("w-4 h-4", empathyScore < 30 ? "text-rose-500" : "text-[#78716C]")} />
                                <div className="w-20 h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-400 transition-all duration-500" style={{ width: `${empathyScore}%` }} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {gameState === 'intro' && (
                <div className="space-y-8 text-center pt-8">
                    <h1 className="text-3xl md:text-5xl font-black text-[#292524] uppercase tracking-tight"
                        dangerouslySetInnerHTML={{ __html: t('training.difficult_conversations.title') }}
                    />
                    <p className="text-[#57534E] max-w-lg mx-auto">
                        {t('training.difficult_conversations.subtitle')}
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {(Object.keys(opponentsMetadata) as OpponentType[]).map((key) => {
                            const meta = opponentsMetadata[key];
                            const data = opponentsData[key];
                            if (!data) return null;

                            return (
                                <Card
                                    key={key}
                                    onClick={() => startGame(key)}
                                    className="p-6 cursor-pointer hover:scale-105 transition-transform border-[#E7E5E4] hover:shadow-xl group bg-white"
                                >
                                    <div className={cn("w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 transition-colors", meta.bg)}>
                                        <meta.icon className={cn("w-8 h-8", meta.color)} />
                                    </div>
                                    <h3 className="font-black text-xl text-[#292524] uppercase mb-2">{data.title}</h3>
                                    <p className="text-sm text-[#78716C]">{data.description}</p>
                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold uppercase tracking-widest text-[#292524]">
                                        {t('training.difficult_conversations.ui.start_challenge')}
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            )}

            {(gameState === 'playing' || gameState === 'won' || gameState === 'lost') && (
                <Card className="flex-1 flex flex-col overflow-hidden border-[#E7E5E4] shadow-2xl h-[600px] bg-white">
                    {/* Chat Area */}
                    <div className="flex-1 bg-[#FAFAF9] p-4 md:p-6 overflow-y-auto space-y-4">
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
                                    msg.sender === 'user' ? "bg-[#292524] text-white" : opponentsMetadata[selectedOpponent!].bg
                                )}>
                                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : selectedOpponent === 'aggro' ? <Zap className="w-4 h-4 text-amber-600" /> : selectedOpponent === 'victim' ? <Heart className="w-4 h-4 text-rose-600" /> : <Brain className="w-4 h-4 text-indigo-600" />}
                                </div>
                                <div className={cn(
                                    "p-3 rounded-2xl text-sm",
                                    msg.sender === 'user' ? "bg-[#292524] text-white rounded-tr-sm" :
                                        msg.type === 'error' ? "bg-rose-100 text-rose-800 border-rose-200 border rounded-tl-sm" :
                                            "bg-white border border-[#E7E5E4] text-[#44403C] rounded-tl-sm shadow-sm"
                                )}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                        {isThinking && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 text-[#A8A29E] text-xs ml-12">
                                <span>{t('training.difficult_conversations.ui.typing')}</span>
                            </motion.div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Controls */}
                    <div className="p-4 bg-white border-t border-[#E7E5E4]">
                        {gameState === 'playing' && !isThinking ? (
                            <div className="grid gap-2">
                                {getCurrentOptions().map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleOptionClick(opt)}
                                        className="text-left p-3 rounded-xl border border-[#E7E5E4] hover:bg-[#F5F5F4] hover:border-[#D6D3D1] hover:text-[#292524] transition-all text-sm font-medium text-[#44403C]"
                                    >
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        ) : gameState === 'won' ? (
                            <div className="text-center space-y-4 py-4 animate-in zoom-in">
                                <h3 className="text-2xl font-black text-emerald-600 uppercase">{t('training.difficult_conversations.ui.won_title')}</h3>
                                <p className="text-[#57534E]">{t('training.difficult_conversations.ui.won_desc')}</p>
                                <Button onClick={onComplete} className="bg-emerald-600 rounded-full px-8 hover:bg-emerald-700 shadow-lg">{t('training.difficult_conversations.ui.back_menu')}</Button>
                            </div>
                        ) : gameState === 'lost' ? (
                            <div className="text-center space-y-4 py-4 animate-in zoom-in">
                                <h3 className="text-2xl font-black text-rose-600 uppercase">{t('training.difficult_conversations.ui.lost_title')}</h3>
                                <p className="text-[#57534E]">{t('training.difficult_conversations.ui.lost_desc')}</p>
                                <Button onClick={() => startGame(selectedOpponent!)} variant="outline" className="rounded-full px-8 border-[#D6D3D1] hover:bg-[#FAFAF9]">{t('training.difficult_conversations.ui.retry')}</Button>
                            </div>
                        ) : null}
                    </div>
                </Card>
            )}
        </div>
    );
};
