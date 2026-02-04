"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    Sparkles, Heart, Trophy, Calendar, TrendingUp, Copy, Check,
    Plus, Trash2, Edit3, Save, X
} from "lucide-react";
import Link from "next/link";

interface Glimmer {
    id: string;
    timestamp: number;
    text: string;
    category: 'praise' | 'achievement' | 'hyperfocus' | 'gratitude' | 'connection';
    emotionLevel: number; // 1-10
    source?: string;
    context?: string;
}

const CATEGORY_CONFIG = {
    praise: { label: 'Kehu', icon: '💝', color: 'rose' },
    achievement: { label: 'Onnistuminen', icon: '🏆', color: 'amber' },
    hyperfocus: { label: 'Hyperfokus', icon: '🎯', color: 'blue' },
    gratitude: { label: 'Kiitollisuus', icon: '🙏', color: 'emerald' },
    connection: { label: 'Yhteys', icon: '🤝', color: 'purple' }
};

export default function GlimmerBankPage() {
    const { t, loadNamespace } = useLanguage();
    const { completeModule, isModuleCompleted } = useProgress();

    const [glimmers, setGlimmers] = useState<Glimmer[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newGlimmer, setNewGlimmer] = useState({
        text: '',
        category: 'praise' as Glimmer['category'],
        emotionLevel: 7,
        source: '',
        context: ''
    });
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        loadNamespace('neuromoninaisuus');
        loadGlimmers();
    }, [loadNamespace]);

    const loadGlimmers = () => {
        const saved = localStorage.getItem('neuro_glimmers');
        if (saved) {
            const parsed = JSON.parse(saved);
            setGlimmers(parsed.sort((a: Glimmer, b: Glimmer) => b.timestamp - a.timestamp));
        }
    };

    const saveGlimmers = (updated: Glimmer[]) => {
        localStorage.setItem('neuro_glimmers', JSON.stringify(updated));
        setGlimmers(updated.sort((a, b) => b.timestamp - a.timestamp));
    };

    const addGlimmer = () => {
        if (!newGlimmer.text.trim()) return;

        const glimmer: Glimmer = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            text: newGlimmer.text.trim(),
            category: newGlimmer.category,
            emotionLevel: newGlimmer.emotionLevel,
            source: newGlimmer.source.trim() || undefined,
            context: newGlimmer.context.trim() || undefined
        };

        const updated = [...glimmers, glimmer];
        saveGlimmers(updated);

        // Gamification
        if (updated.length === 1 && !isModuleCompleted('neuro_glimmer_first')) {
            completeModule('neuro_glimmer_first'); // +10 points
        }
        if (updated.length === 10 && !isModuleCompleted('neuro_glimmer_10')) {
            completeModule('neuro_glimmer_10'); // +50 points
        }

        // Check 7-day streak
        const lastWeek = updated.filter(g => g.timestamp > Date.now() - 7 * 24 * 60 * 60 * 1000);
        const uniqueDays = new Set(lastWeek.map(g => new Date(g.timestamp).toDateString())).size;
        if (uniqueDays >= 7 && !isModuleCompleted('neuro_glimmer_streak')) {
            completeModule('neuro_glimmer_streak'); // +100 points
        }

        // Reset form
        setNewGlimmer({
            text: '',
            category: 'praise',
            emotionLevel: 7,
            source: '',
            context: ''
        });
        setShowAddForm(false);
    };

    const deleteGlimmer = (id: string) => {
        const updated = glimmers.filter(g => g.id !== id);
        saveGlimmers(updated);
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const getStreak = () => {
        if (glimmers.length === 0) return 0;

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        while (true) {
            const dayStart = currentDate.getTime();
            const dayEnd = dayStart + 24 * 60 * 60 * 1000;

            const hasGlimmerToday = glimmers.some(g =>
                g.timestamp >= dayStart && g.timestamp < dayEnd
            );

            if (!hasGlimmerToday) break;

            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        }

        return streak;
    };

    const thisMonthCount = glimmers.filter(g => {
        const glimmerDate = new Date(g.timestamp);
        const now = new Date();
        return glimmerDate.getMonth() === now.getMonth() &&
            glimmerDate.getFullYear() === now.getFullYear();
    }).length;

    const streak = getStreak();

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    <Link href="/neuromoninaisuus" className="inline-block">
                        <span className="text-sm text-[#5B4B8A] hover:underline">← Neuromoninaisuus</span>
                    </Link>

                    <div className="space-y-2">
                        <span className="text-[11px] font-mono text-emerald-700 uppercase tracking-widest border-b border-emerald-600 pb-1 inline-block">
                            Positiivinen ankkuri
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B]">
                            🌟 Glimmer-pankki
                        </h1>
                        <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                            Tallenna kimallukset – pienet hetket jotka muistuttavat että olet pystyvä
                        </p>
                    </div>
                </div>

                {/* Why Card */}
                <Alert className="bg-purple-50 border-2 border-purple-200">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <AlertTitle className="text-purple-900">Miksi Glimmer-pankki?</AlertTitle>
                    <AlertDescription className="text-purple-800 space-y-2">
                        <p>
                            RSD-aivot ovat <strong>tarranauhaa negatiiviselle, teflonia positiiviselle</strong>.
                            Kun kiusaaminen alkaa, unohdat helposti kaikki vahvuutesi ja onnistumisesi.
                        </p>
                        <p className="font-semibold">
                            Glimmer-pankki on objektiivinen muistutus: sinä OLET pystyvä, vaikka juuri nyt tuntuu muulta.
                        </p>
                    </AlertDescription>
                </Alert>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-white border-[#E8DDD0] text-center">
                        <CardContent className="pt-6">
                            <div className="text-4xl font-bold text-[#5B4B8A]">{glimmers.length}</div>
                            <div className="text-sm text-slate-600 mt-1">Yhteensä</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-[#E8DDD0] text-center">
                        <CardContent className="pt-6">
                            <div className="text-4xl font-bold text-emerald-600">{thisMonthCount}</div>
                            <div className="text-sm text-slate-600 mt-1">Tässä kuussa</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-[#E8DDD0] text-center">
                        <CardContent className="pt-6">
                            <div className="text-4xl font-bold text-amber-600">{streak}</div>
                            <div className="text-sm text-slate-600 mt-1">Päivän putki</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Add Glimmer Button */}
                {!showAddForm && (
                    <Button
                        onClick={() => setShowAddForm(true)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 text-lg"
                        size="lg"
                    >
                        <Plus className="mr-2 w-5 h-5" />
                        Lisää uusi kimaltelus
                    </Button>
                )}

                {/* Add Form */}
                {showAddForm && (
                    <Card className="bg-white border-[#E8DDD0] shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Lisää kimaltelus</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold mb-2 block">Mitä tapahtui?</label>
                                <Textarea
                                    value={newGlimmer.text}
                                    onChange={e => setNewGlimmer({ ...newGlimmer, text: e.target.value })}
                                    placeholder="Esim: 'Kollega kiitti minua huolellisesta työstäni' tai 'Sain projektin valmiiksi hyperfokuksessa'"
                                    rows={3}
                                    className="resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-2 block">Kategoria</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {(Object.keys(CATEGORY_CONFIG) as Array<keyof typeof CATEGORY_CONFIG>).map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setNewGlimmer({ ...newGlimmer, category: cat })}
                                            className={`p-3 rounded-lg border-2 transition-all text-center ${newGlimmer.category === cat
                                                ? `border-${CATEGORY_CONFIG[cat].color}-500 bg-${CATEGORY_CONFIG[cat].color}-50`
                                                : 'border-slate-200 hover:border-slate-300'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">{CATEGORY_CONFIG[cat].icon}</div>
                                            <div className="text-xs">{CATEGORY_CONFIG[cat].label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-2 block">
                                    Miltä tuntui? ({newGlimmer.emotionLevel}/10)
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={newGlimmer.emotionLevel}
                                    onChange={e => setNewGlimmer({ ...newGlimmer, emotionLevel: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">Keltä/mistä? (valinnainen)</label>
                                    <input
                                        type="text"
                                        value={newGlimmer.source}
                                        onChange={e => setNewGlimmer({ ...newGlimmer, source: e.target.value })}
                                        placeholder="Esim: 'Projektimanageri'"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">Yhteys/projekti (valinnainen)</label>
                                    <input
                                        type="text"
                                        value={newGlimmer.context}
                                        onChange={e => setNewGlimmer({ ...newGlimmer, context: e.target.value })}
                                        placeholder="Esim: 'Q4 raportti'"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={addGlimmer}
                                className="w-full bg-emerald-600 hover:bg-emerald-700"
                                disabled={!newGlimmer.text.trim()}
                            >
                                <Sparkles className="mr-2 w-4 h-4" />
                                Tallenna kimaltelus
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Glimmers List */}
                {glimmers.length === 0 && !showAddForm && (
                    <Card className="bg-white border-[#E8DDD0]">
                        <CardContent className="py-12 text-center text-slate-500">
                            <Sparkles className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                            <p>Ei vielä kimalluksia. Lisää ensimmäinen!</p>
                        </CardContent>
                    </Card>
                )}

                <div className="space-y-4">
                    {glimmers.map(glimmer => {
                        const config = CATEGORY_CONFIG[glimmer.category];
                        const date = new Date(glimmer.timestamp);

                        return (
                            <Card
                                key={glimmer.id}
                                className="bg-white border-[#E8DDD0] hover:shadow-md transition-shadow"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="text-4xl">{config.icon}</div>

                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-start justify-between gap-4">
                                                <p className="text-lg leading-relaxed">{glimmer.text}</p>

                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => copyToClipboard(glimmer.text, glimmer.id)}
                                                    >
                                                        {copiedId === glimmer.id ? (
                                                            <Check className="w-4 h-4 text-emerald-600" />
                                                        ) : (
                                                            <Copy className="w-4 h-4" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => deleteGlimmer(glimmer.id)}
                                                        className="text-rose-600 hover:text-rose-700"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                                                <Badge variant="outline" className="font-normal">
                                                    {config.label}
                                                </Badge>

                                                <span className="flex items-center gap-1">
                                                    <Heart className="w-3 h-3" />
                                                    {glimmer.emotionLevel}/10
                                                </span>

                                                {glimmer.source && (
                                                    <span className="italic">
                                                        – {glimmer.source}
                                                    </span>
                                                )}

                                                {glimmer.context && (
                                                    <Badge variant="secondary" className="font-normal">
                                                        {glimmer.context}
                                                    </Badge>
                                                )}

                                                <span className="ml-auto text-xs">
                                                    {date.toLocaleDateString('fi-FI')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Bottom Info */}
                {glimmers.length > 0 && (
                    <Alert className="bg-emerald-50 border-emerald-200">
                        <Trophy className="h-4 w-4 text-emerald-600" />
                        <AlertDescription className="text-sm">
                            <strong>Muista:</strong> Kun RSD-mittari huutaa punaista tai teet Dramasuodatin-testiä,
                            sovellus voi pyytää sinua lukemaan 3 satunnaista kimallusta ennen jatkamista.
                            Tämä ei ole "toxic positivity" – se on muistutus että sinä OLET pystyvä.
                        </AlertDescription>
                    </Alert>
                )}

            </div>
        </div>
    );
}
