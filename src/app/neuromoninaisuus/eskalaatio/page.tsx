"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp, AlertTriangle, CheckCircle2, Clock, BookOpen
} from "lucide-react";
import Link from "next/link";

// Escalation levels from 1 (green/ok) to 5 (red/critical)
type EscalationLevel = 1 | 2 | 3 | 4 | 5;

interface LevelData {
    level: EscalationLevel;
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: any;
    description: string;
    signs: string[];
    actions: string[];
}

const LEVEL_CONFIG: Record<EscalationLevel, LevelData> = {
    1: {
        level: 1,
        label: "Vihreä - Turvallinen",
        color: "text-emerald-700",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-300",
        icon: CheckCircle2,
        description: "Työympäristö tuntuu turvalliselta. Ei merkittäviä huolia.",
        signs: [
            "Tulen mielelläni töihin",
            "Kommunikaatio on sujuvaa",
            "Tunnen olevani arvostettu",
            "Voin keskittyä työhön"
        ],
        actions: [
            "Jatka normaalisti",
            "Dokumentoi positiivisia hetkiä Glimmer-pankkiin",
            "Ylläpidä hyviä rajoja"
        ]
    },
    2: {
        level: 2,
        label: "Keltainen - Valpas",
        color: "text-yellow-700",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-300",
        icon: Clock,
        description: "Pieniä merkkejä jotka kannattaa seurata. Ei vielä hälyttävää.",
        signs: [
            "Satunnaisia kielteisiä kommentteja",
            "Pieniä kommunikaatio-ongelmia",
            "Työt kasaantuvat välillä epäreilusti",
            "Ajoittaista väsymystä"
        ],
        actions: [
            "Aloita päiväkirjan pito (päivämäärät, faktat)",
            "Aseta selkeät rajat työmäärille",
            "Keskustele huolista luotettavan henkilön kanssa"
        ]
    },
    3: {
        level: 3,
        label: "Oranssi - Huolestuttava",
        color: "text-orange-700",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-300",
        icon: AlertTriangle,
        description: "Toistuvaa epäasiallista käytöstä. Tilanne vaatii toimenpiteitä.",
        signs: [
            "Toistuvat negatiiviset kommentit",
            "Tiedon panttaaminen tai eristäminen",
            "Työtehtävien epäreilu jako",
            "Unen tai ruokahalun muutoksia"
        ],
        actions: [
            "Dokumentoi systemaattisesti (kuka, mitä, milloin, todistajat)",
            "Käytä Pre-Game Prep -työkalua vaikeisiin keskusteluihin",
            "Harkitse keskustelua esimiehen kanssa",
            "Ota yhteyttä työterveyshuoltoon"
        ]
    },
    4: {
        level: 4,
        label: "Punainen - Vakava",
        color: "text-rose-700",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-300",
        icon: TrendingUp,
        description: "Jatkuvaa kiusaamista. Vaikuttaa terveyteen ja työkykyyn.",
        signs: [
            "Päivittäistä epäasiallista kohtelua",
            "Sosiaalinen eristäminen",
            "Työn sabotointi tai mustamaalaus",
            "Fyysiset oireet (päänsärky, vatsakivut, unettomuus)"
        ],
        actions: [
            "Ota välittömästi yhteyttä esimieheen tai HR:ään",
            "Toimita dokumentaatio kirjallisesti",
            "Hae tukea työterveyshuollosta",
            "Harkitse sairauslomaa tarvittaessa",
            "Ota yhteyttä luottamusmieheen/työsuojeluvaltuutettuun"
        ]
    },
    5: {
        level: 5,
        label: "Musta - Kriittinen",
        color: "text-slate-700",
        bgColor: "bg-slate-100",
        borderColor: "border-slate-400",
        icon: BookOpen,
        description: "Akuutti kriisi. Välitön toiminta tarpeen.",
        signs: [
            "Itsetuhoajatukset tai vakavat psyykkiset oireet",
            "Täydellinen työky vyttömyys",
            "Uhkaava tai vaarallinen tilanne",
            "Kokemus täydellisestä avuttomuudesta"
        ],
        actions: [
            "🆘 Käytä SOS-tilaa välittömästi",
            "📞 Soita kriisipuhelimeen (09 2525 0111) tai hätänumeroon 112",
            "🏥 Ota yhteyttä päivystykseen tai työterveyshuoltoon SAMANA PÄIVÄNÄ",
            "🚫 Älä palaa työpaikalle ennen lääkärin lupaa",
            "📋 Ilmoita tilanteesta työsuojeluviranomaiselle"
        ]
    }
};

export default function EscalationMeterPage() {
    const { t, loadNamespace } = useLanguage();
    const { completeModule, isModuleCompleted } = useProgress();

    const [currentLevel, setCurrentLevel] = useState<EscalationLevel>(1);
    const [history, setHistory] = useState<Array<{ level: EscalationLevel; date: string }>>([]);

    // Load from localStorage
    useEffect(() => {
        loadNamespace('neuromoninaisuus');
        const savedLevel = localStorage.getItem('neuro_escalation_level');
        const savedHistory = localStorage.getItem('neuro_escalation_history');

        if (savedLevel) {
            setCurrentLevel(parseInt(savedLevel) as EscalationLevel);
        }
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, [loadNamespace]);

    const updateLevel = (level: EscalationLevel) => {
        setCurrentLevel(level);
        localStorage.setItem('neuro_escalation_level', level.toString());

        // Add to history
        const newEntry = { level, date: new Date().toISOString() };
        const updatedHistory = [newEntry, ...history].slice(0, 30); // Keep last 30
        setHistory(updatedHistory);
        localStorage.setItem('neuro_escalation_history', JSON.stringify(updatedHistory));

        // Gamification
        if (!isModuleCompleted('neuro_escalation_used')) {
            completeModule('neuro_escalation_used'); // +20 points
        }
        if (level >= 3 && !isModuleCompleted('neuro_escalation_action')) {
            completeModule('neuro_escalation_action'); // +30 points for recognizing serious situation
        }
    };

    const levelData = LEVEL_CONFIG[currentLevel];
    const Icon = levelData.icon;

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    <Link href="/neuromoninaisuus" className="inline-block">
                        <span className="text-sm text-[#5B4B8A] hover:underline">← Neuromoninaisuus</span>
                    </Link>

                    <div className="space-y-2">
                        <span className="text-[11px] font-mono text-rose-700 uppercase tracking-widest border-b border-rose-600 pb-1 inline-block">
                            Threshold Analysis
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B]">
                            📊 Eskalaatiomittari
                        </h1>
                        <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                            Tunnista varoitusmerkit ja toimi ajoissa
                        </p>
                    </div>
                </div>

                {/* Explainer */}
                <Alert className="bg-blue-50 border-2 border-blue-200">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                        <p className="font-semibold mb-2">Miksi seurata eskalaatiota?</p>
                        <p>
                            Workplace bullying ei ala yhtäkkiä. Se <strong>eskaloituu vähitellen</strong>.
                            Tunnistamalla varoitusmerkit varhain voit toimia ennen kuin tilanne muuttuu kriittiseksi.
                        </p>
                    </AlertDescription>
                </Alert>

                {/* Level Selector */}
                <Card className={`${levelData.bgColor} border-2 ${levelData.borderColor} shadow-lg`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Icon className={`w-8 h-8 ${levelData.color}`} />
                            <span className={levelData.color}>Nykyinen taso: {levelData.label}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Slider */}
                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-[#2B2B2B]">
                                Valitse nykyinen tilanne:
                            </label>
                            <div className="flex items-center gap-4">
                                {[1, 2, 3, 4, 5].map((level) => {
                                    const config = LEVEL_CONFIG[level as EscalationLevel];
                                    return (
                                        <button
                                            key={level}
                                            onClick={() => updateLevel(level as EscalationLevel)}
                                            className={`flex-1 h-16 rounded-lg border-2 transition-all font-semibold ${currentLevel === level
                                                    ? `${config.borderColor} ${config.bgColor} ${config.color} scale-105 shadow-md`
                                                    : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300'
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="flex justify-between text-xs text-slate-600 px-2">
                                <span>Turvallinen</span>
                                <span>Kriittinen</span>
                            </div>
                        </div>

                        {/* Description */}
                        <Alert className={`${levelData.bgColor} border ${levelData.borderColor}`}>
                            <AlertTitle className={`${levelData.color} font-bold`}>
                                {levelData.description}
                            </AlertTitle>
                        </Alert>

                    </CardContent>
                </Card>

                {/* Signs */}
                <Card className="bg-white border-[#E8DDD0] shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-[#2B2B2B]">Tunnusmerkit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {levelData.signs.map((sign, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-[#5B4B8A] mt-1">•</span>
                                    <span className="text-[#4A4A4A]">{sign}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Actions */}
                <Card className={`${levelData.bgColor} border-2 ${levelData.borderColor}`}>
                    <CardHeader>
                        <CardTitle className={levelData.color}>Suositellut toimenpiteet</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {levelData.actions.map((action, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <Badge className={`${levelData.bgColor} ${levelData.color} flex-shrink-0`}>
                                        {idx + 1}
                                    </Badge>
                                    <span className={`${levelData.color} font-medium`}>{action}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* History */}
                {history.length > 0 && (
                    <Card className="bg-white border-[#E8DDD0] shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-[#2B2B2B]">Historia (viim. 30 merkintää)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {history.slice(0, 10).map((entry, idx) => {
                                    const config = LEVEL_CONFIG[entry.level];
                                    return (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Badge className={`${config.bgColor} ${config.color}`}>
                                                    Taso {entry.level}
                                                </Badge>
                                                <span className="text-sm text-slate-600">
                                                    {new Date(entry.date).toLocaleDateString('fi-FI')} {new Date(entry.date).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                )}

            </div>
        </div>
    );
}
