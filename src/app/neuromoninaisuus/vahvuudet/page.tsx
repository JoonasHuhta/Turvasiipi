"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Award, Sparkles, Users, Lightbulb, Plus, Trash2, Info, X
} from "lucide-react";
import Link from "next/link";

// Strength categories
type StrengthCategory = 'skill' | 'trait' | 'achievement' | 'relationship';

interface Strength {
    id: string;
    category: StrengthCategory;
    text: string;
    date: string;
}

const CATEGORY_CONFIG: Record<StrengthCategory, {
    icon: any;
    label: string;
    color: string;
    bgColor: string;
    placeholder: string;
    examples: string[];
}> = {
    skill: {
        icon: Lightbulb,
        label: "Taidot",
        color: "text-blue-700",
        bgColor: "bg-blue-50",
        placeholder: "Esim: 'Osaan selittää monimutkaisia asioita yksinkertaisesti'",
        examples: [
            "Kyky nähdä yhteyksiä eri asioiden välillä",
            "Syväsukellus kiinnostaviin aiheisiin",
            "Nopea ongelmanratkaisu"
        ]
    },
    trait: {
        icon: Sparkles,
        label: "Ominaisuudet",
        color: "text-purple-700",
        bgColor: "bg-purple-50",
        placeholder: "Esim: 'Olen luotettava ja pidän lupaukseni'",
        examples: [
            "Rehellisyys ja suoruus",
            "Empatia ja ymmärrys",
            "Sinnikkyys vaikeuksissa"
        ]
    },
    achievement: {
        icon: Award,
        label: "Saavutukset",
        color: "text-amber-700",
        bgColor: "bg-amber-50",
        placeholder: "Esim: 'Sain projektin valmiiksi määräajassa'",
        examples: [
            "Autoin kollegaa hankalassa tilanteessa",
            "Opin uuden taidon itsenäisesti",
            "Onnistuin haastavassa tehtävässä"
        ]
    },
    relationship: {
        icon: Users,
        label: "Suhteet",
        color: "text-emerald-700",
        bgColor: "bg-emerald-50",
        placeholder: "Esim: 'Kollegat luottavat minuun'",
        examples: [
            "Ystävä sanoi arvostavansa rehellisyyttäni",
            "Tiimi kysyy mielipidettäni päätöksissä",
            "Mentorin tuki on ollut tärkeää"
        ]
    }
};

export default function StrengthsPortfolioPage() {
    const { t, loadNamespace } = useLanguage();
    const { completeModule, isModuleCompleted } = useProgress();

    const [strengths, setStrengths] = useState<Strength[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<StrengthCategory>('skill');
    const [newStrengthText, setNewStrengthText] = useState('');

    // Load from localStorage
    useEffect(() => {
        loadNamespace('neuromoninaisuus');
        const saved = localStorage.getItem('neuro_strengths');
        if (saved) {
            setStrengths(JSON.parse(saved));
        }
    }, [loadNamespace]);

    // Save to localStorage
    useEffect(() => {
        if (strengths.length > 0) {
            localStorage.setItem('neuro_strengths', JSON.stringify(strengths));
        }
    }, [strengths]);

    const addStrength = () => {
        if (!newStrengthText.trim()) return;

        const newStrength: Strength = {
            id: Date.now().toString(),
            category: selectedCategory,
            text: newStrengthText.trim(),
            date: new Date().toISOString()
        };

        setStrengths([newStrength, ...strengths]);
        setNewStrengthText('');
        setShowAddForm(false);

        // Gamification
        if (!isModuleCompleted('neuro_strength_first')) {
            completeModule('neuro_strength_first'); // +10 points
        }
        if (strengths.length + 1 >= 10 && !isModuleCompleted('neuro_strength_10')) {
            completeModule('neuro_strength_10'); // +50 points
        }
    };

    const deleteStrength = (id: string) => {
        setStrengths(strengths.filter(s => s.id !== id));
    };

    const getStatsByCategory = () => {
        return {
            skill: strengths.filter(s => s.category === 'skill').length,
            trait: strengths.filter(s => s.category === 'trait').length,
            achievement: strengths.filter(s => s.category === 'achievement').length,
            relationship: strengths.filter(s => s.category === 'relationship').length
        };
    };

    const stats = getStatsByCategory();

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
                            Asset Mapping
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B]">
                            💪 Vahvuussalkku
                        </h1>
                        <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                            Dokumentoi vahvuutesi, taitosi ja saavutuksesi
                        </p>
                    </div>
                </div>

                {/* Why Card */}
                <Alert className="bg-emerald-50 border-2 border-emerald-200">
                    <Info className="h-5 w-5 text-emerald-600" />
                    <AlertDescription className="text-emerald-800 space-y-2">
                        <p className="font-semibold">
                            RSD saa aivot muistamaan vain negatiiviset asiat.
                        </p>
                        <p>
                            Vahvuussalkku on <strong>objektiivinen luettelo</strong> siitä mitä osaat ja
                            kuka olet. Kun RSD iskee, voit lukea tämän listan ja muistaa totuuden.
                        </p>
                    </AlertDescription>
                </Alert>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(Object.keys(CATEGORY_CONFIG) as StrengthCategory[]).map(cat => {
                        const config = CATEGORY_CONFIG[cat];
                        const Icon = config.icon;
                        return (
                            <Card key={cat} className={`${config.bgColor} border-2 border-${cat === 'skill' ? 'blue' : cat === 'trait' ? 'purple' : cat === 'achievement' ? 'amber' : 'emerald'}-200`}>
                                <CardContent className="p-4 text-center">
                                    <Icon className={`w-8 h-8 mx-auto mb-2 ${config.color}`} />
                                    <div className="text-3xl font-bold text-[#2B2B2B]">{stats[cat]}</div>
                                    <div className={`text-sm ${config.color} font-semibold`}>{config.label}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Add Button */}
                {!showAddForm && (
                    <Button
                        onClick={() => setShowAddForm(true)}
                        className="w-full bg-[#5B4B8A] hover:bg-[#4A3A7A] text-white py-6 text-lg"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Lisää vahvuus
                    </Button>
                )}

                {/* Add Form */}
                {showAddForm && (
                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-[#5B4B8A]">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Lisää uusi vahvuus</span>
                                <Button
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setNewStrengthText('');
                                    }}
                                    variant="ghost"
                                    size="sm"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            {/* Category selector */}
                            <div>
                                <label className="text-sm font-semibold text-[#2B2B2B] mb-3 block">
                                    Valitse kategoria:
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {(Object.keys(CATEGORY_CONFIG) as StrengthCategory[]).map(cat => {
                                        const config = CATEGORY_CONFIG[cat];
                                        const Icon = config.icon;
                                        return (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`p-4 rounded-lg border-2 transition-all ${selectedCategory === cat
                                                    ? `border-[#5B4B8A] ${config.bgColor}`
                                                    : 'border-slate-200 bg-white hover:border-slate-300'
                                                    }`}
                                            >
                                                <Icon className={`w-6 h-6 mx-auto mb-1 ${selectedCategory === cat ? config.color : 'text-slate-400'}`} />
                                                <div className="text-sm font-medium">{config.label}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Examples */}
                            <div className={`p-4 rounded-lg ${CATEGORY_CONFIG[selectedCategory].bgColor}`}>
                                <h4 className={`font-semibold mb-2 ${CATEGORY_CONFIG[selectedCategory].color}`}>
                                    Esimerkkejä:
                                </h4>
                                <ul className="text-sm space-y-1">
                                    {CATEGORY_CONFIG[selectedCategory].examples.map((ex, idx) => (
                                        <li key={idx} className="text-slate-700">• {ex}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Text input */}
                            <div>
                                <Textarea
                                    value={newStrengthText}
                                    onChange={(e) => setNewStrengthText(e.target.value)}
                                    placeholder={CATEGORY_CONFIG[selectedCategory].placeholder}
                                    className="min-h-[100px] bg-white"
                                />
                            </div>

                            {/* Add button */}
                            <Button
                                onClick={addStrength}
                                disabled={!newStrengthText.trim()}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Tallenna vahvuus
                            </Button>

                        </CardContent>
                    </Card>
                )}

                {/* Strengths List */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">
                        Sinun vahvuutesi ({strengths.length})
                    </h2>

                    {strengths.length === 0 && !showAddForm && (
                        <Card className="bg-white border-[#E8DDD0]">
                            <CardContent className="py-12 text-center text-slate-500">
                                <Sparkles className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                                <p>Ei vielä vahvuuksia. Lisää ensimmäinen!</p>
                            </CardContent>
                        </Card>
                    )}

                    {strengths.map((strength) => {
                        const config = CATEGORY_CONFIG[strength.category];
                        const Icon = config.icon;
                        return (
                            <Card key={strength.id} className={`${config.bgColor} border-2 border-${strength.category === 'skill' ? 'blue' : strength.category === 'trait' ? 'purple' : strength.category === 'achievement' ? 'amber' : 'emerald'}-200 hover:shadow-md transition-shadow`}>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <Icon className={`w-8 h-8 ${config.color}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Badge className={`mb-2 ${config.bgColor} ${config.color}`}>
                                                {config.label}
                                            </Badge>
                                            <p className="text-base text-[#2B2B2B] leading-relaxed whitespace-pre-wrap">
                                                {strength.text}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-2">
                                                {new Date(strength.date).toLocaleDateString('fi-FI')}
                                            </p>
                                        </div>
                                        <Button
                                            onClick={() => deleteStrength(strength.id)}
                                            variant="ghost"
                                            size="sm"
                                            className="flex-shrink-0 text-slate-400 hover:text-rose-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
