"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Battery, BatteryLow, BatteryMedium, BatteryFull,
    AlertTriangle, Heart, ArrowLeft, Save, CheckCircle2, Zap
} from "lucide-react";
import Link from "next/link";

interface DailyEnergy {
    date: string;
    morningSpoons: number;
    currentSpoons: number;
    warnings: {
        yellow: number[];
        orange: number[];
        red: number[];
    };
}

const YELLOW_WARNINGS = [
    "Lisääntynyt herkkyys äänille",
    "Silmien rasittuneisuus / valonarkuus",
    "Vaikeus keskittyä",
    "Sosiaalinen akkku tyhjenemässä"
];

const ORANGE_WARNINGS = [
    "Ärtyisyys nousee",
    "Toiminnanohjaus heikkenee",
    "Yksinkertaiset tehtävät tuntuvat vaikeilta",
    "Viestejä täytyy lukea monta kertaa"
];

const RED_WARNINGS = [
    "En pysty käsittelemään puhetta",
    "Ympäristö yliarjalöyttää",
    "Tunnen oloni loukkuun",
    "Sulkeudun emotionaalisesti"
];

export default function MeltdownProtocolsPage() {
    const { t, loadNamespace } = useLanguage();
    const { completeModule, isModuleCompleted } = useProgress();

    const [morningSpoons, setMorningSpoons] = useState(10);
    const [currentSpoons, setCurrentSpoons] = useState(10);
    const [yellowChecked, setYellowChecked] = useState<number[]>([]);
    const [orangeChecked, setOrangeChecked] = useState<number[]>([]);
    const [redChecked, setRedChecked] = useState<number[]>([]);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        loadNamespace('rsd');
        loadToday();
    }, [loadNamespace]);

    const loadToday = () => {
        const today = new Date().toISOString().split('T')[0];
        const history = JSON.parse(localStorage.getItem('rsd_energy_history') || '[]');
        const todayData = history.find((d: DailyEnergy) => d.date === today);

        if (todayData) {
            setMorningSpoons(todayData.morningSpoons);
            setCurrentSpoons(todayData.currentSpoons);
            setYellowChecked(todayData.warnings.yellow || []);
            setOrangeChecked(todayData.warnings.orange || []);
            setRedChecked(todayData.warnings.red || []);
        }
    };

    const saveToday = () => {
        const today = new Date().toISOString().split('T')[0];
        const history = JSON.parse(localStorage.getItem('rsd_energy_history') || '[]');

        const newData: DailyEnergy = {
            date: today,
            morningSpoons,
            currentSpoons,
            warnings: {
                yellow: yellowChecked,
                orange: orangeChecked,
                red: redChecked
            }
        };

        const filtered = history.filter((d: DailyEnergy) => d.date !== today);
        filtered.push(newData);

        localStorage.setItem('rsd_energy_history', JSON.stringify(filtered));

        if (!isModuleCompleted('rsd_meltdown_tracker')) {
            completeModule('rsd_meltdown_tracker');
        }

        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const totalWarnings = yellowChecked.length + orangeChecked.length + redChecked.length;
    const warningLevel =
        redChecked.length > 0 ? 'red' :
            orangeChecked.length > 1 ? 'orange' :
                yellowChecked.length > 2 ? 'yellow' :
                    'green';

    const getBatteryIcon = (spoons: number) => {
        if (spoons >= 9) return <BatteryFull className="w-8 h-8 text-emerald-600" />;
        if (spoons >= 6) return <BatteryMedium className="w-8 h-8 text-amber-600" />;
        if (spoons >= 3) return <BatteryLow className="w-8 h-8 text-orange-600" />;
        return <Battery className="w-8 h-8 text-rose-600" />;
    };

    const getWarningColor = () => {
        if (warningLevel === 'red') return 'bg-rose-100 border-rose-300';
        if (warningLevel === 'orange') return 'bg-orange-100 border-orange-300';
        if (warningLevel === 'yellow') return 'bg-yellow-100 border-yellow-300';
        return 'bg-emerald-100 border-emerald-300';
    };

    const getRecoveryProtocols = () => {
        if (warningLevel === 'red') {
            return [
                { icon: '🛑', title: 'PYSÄHDY', text: 'Lopeta kaikki ei-välttämätön' },
                { icon: '🤫', title: 'Hiljainen tila', text: 'Etsi rauhallinen paikka' },
                { icon: '⏰', title: 'Minimi 1h tauko', text: 'Pakollinen palautumisaika' },
                { icon: '🏥', title: 'Harkitse saikua', text: 'Huomenna kotona?' }
            ];
        }
        if (warningLevel === 'orange') {
            return [
                { icon: '🗓️', title: 'Peruu tapaamisia', text: 'Ei-välttämättömät pois' },
                { icon: '🏠', title: 'Etätyö', text: 'Jos mahdollista' },
                { icon: '🧘', title: '30min tauko', text: 'Täydellinen lepo' },
                { icon: '👂', title: 'Vähennä aistiärsykkeitä', text: 'Kuulokkeet, himmennä näyttö' }
            ];
        }
        if (warningLevel === 'yellow') {
            return [
                { icon: '🎧', title: 'Vastamelukuulokkeet', text: 'Laita päälle nyt' },
                { icon: '⏸️', title: '15min tauko', text: 'Varaa kalenterista' },
                { icon: '🚶', title: 'Siirrä rauhallisempaan', text: 'Jos mahdollista' },
                { icon: '🌙', title: 'Himmennä näyttö', text: 'Vähennä silmien rasitusta' }
            ];
        }
        return [
            { icon: '✅', title: 'Tilanne hyvä', text: 'Jatka normaalist i' },
            { icon: '👀', title: 'Seuraa merkkejä', text: 'Tarkista uudelleen 2h kuluttua' }
        ];
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    <Link href="/neuromoninaisuus/rsd" className="inline-block">
                        <span className="text-sm text-[#5B4B8A] hover:underline">← RSD-työkalut</span>
                    </Link>

                    <div className="space-y-2">
                        <span className="text-[11px] font-mono text-amber-700 uppercase tracking-widest border-b border-amber-600 pb-1 inline-block">
                            Ennaltaehkäisy
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B]">
                            ⚡ Meltdown-protokollat
                        </h1>
                        <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                            Seuraa energiatasoja ja tunnista varoitusmerkit ajoissa
                        </p>
                    </div>
                </div>

                {/* Battery Display */}
                <Card className="bg-white border-[#E8DDD0] shadow-lg">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-serif flex items-center gap-2">
                                {getBatteryIcon(currentSpoons)}
                                Energiataso
                            </CardTitle>
                            <Badge className="bg-[#5B4B8A] text-white">
                                {currentSpoons}/12 lusikkaa
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <label className="text-sm font-bold mb-2 block">
                                Lusikoita aamulla (baseline)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="1"
                                    max="12"
                                    value={morningSpoons}
                                    onChange={(e) => setMorningSpoons(Number(e.target.value))}
                                    className="flex-1"
                                />
                                <span className="text-2xl font-bold font-mono w-12 text-center">{morningSpoons}</span>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold mb-2 block">
                                Lusikoita nyt
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="12"
                                    value={currentSpoons}
                                    onChange={(e) => setCurrentSpoons(Number(e.target.value))}
                                    className="flex-1"
                                />
                                <span className="text-2xl font-bold font-mono w-12 text-center">{currentSpoons}</span>
                            </div>
                        </div>

                        <div className="bg-[#FDFBF7] p-4 rounded-lg border border-[#E8DDD0]">
                            <p className="text-sm text-[#4A4A4A]">
                                <strong>Lusikkateoria:</strong> Jokainen toiminto vie energiaa. Neurokirjolle tavalliset arjen asiat (suihku, avokonttorin hälina) vievät enemmän lusikoita kuin neurotyyppilisille.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Warning Signs */}
                <Card className={`border-2 ${getWarningColor()}`}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-serif flex items-center gap-2">
                                <AlertTriangle className="w-6 h-6" />
                                Varoitusmerkit
                            </CardTitle>
                            <Badge variant={warningLevel === 'green' ? 'default' : 'destructive'}>
                                {totalWarnings}/12 aktiivista
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Yellow */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-yellow-800 flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
                                Varhaiset merkit ({yellowChecked.length}/4)
                            </h3>
                            <div className="space-y-2">
                                {YELLOW_WARNINGS.map((warning, i) => (
                                    <label key={i} className="flex items-start gap-2 cursor-pointer">
                                        <Checkbox
                                            checked={yellowChecked.includes(i)}
                                            onCheckedChange={(checked) => {
                                                setYellowChecked(checked
                                                    ? [...yellowChecked, i]
                                                    : yellowChecked.filter(idx => idx !== i)
                                                );
                                            }}
                                        />
                                        <span className="text-sm">{warning}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Orange */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-orange-800 flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-orange-500"></span>
                                Kohtalaiset merkit ({orangeChecked.length}/4)
                            </h3>
                            <div className="space-y-2">
                                {ORANGE_WARNINGS.map((warning, i) => (
                                    <label key={i} className="flex items-start gap-2 cursor-pointer">
                                        <Checkbox
                                            checked={orangeChecked.includes(i)}
                                            onCheckedChange={(checked) => {
                                                setOrangeChecked(checked
                                                    ? [...orangeChecked, i]
                                                    : orangeChecked.filter(idx => idx !== i)
                                                );
                                            }}
                                        />
                                        <span className="text-sm">{warning}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Red */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-rose-800 flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-rose-500"></span>
                                Kriittiset merkit ({redChecked.length}/4)
                            </h3>
                            <div className="space-y-2">
                                {RED_WARNINGS.map((warning, i) => (
                                    <label key={i} className="flex items-start gap-2 cursor-pointer">
                                        <Checkbox
                                            checked={redChecked.includes(i)}
                                            onCheckedChange={(checked) => {
                                                setRedChecked(checked
                                                    ? [...redChecked, i]
                                                    : redChecked.filter(idx => idx !== i)
                                                );
                                            }}
                                        />
                                        <span className="text-sm font-bold">{warning}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recovery Protocols */}
                <Card className="bg-white border-[#E8DDD0]">
                    <CardHeader>
                        <CardTitle className="text-2xl font-serif flex items-center gap-2">
                            <Heart className="w-6 h-6 text-rose-600" />
                            🛡️ Suositellut toimet
                        </CardTitle>
                        <CardDescription>
                            Varotaso: <strong>{warningLevel === 'red' ? 'KRIITTINEN' : warningLevel === 'orange' ? 'KOHTALAINEN' : warningLevel === 'yellow' ? 'VAROITTAVA' : 'HYVÄ'}</strong>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                            {getRecoveryProtocols().map((protocol, i) => (
                                <div key={i} className="p-4 bg-[#FDFBF7] rounded-lg border border-[#E8DDD0]">
                                    <div className="text-3xl mb-2">{protocol.icon}</div>
                                    <h4 className="font-bold text-sm mb-1">{protocol.title}</h4>
                                    <p className="text-xs text-[#4A4A4A]">{protocol.text}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Save */}
                <div className="flex gap-3">
                    <Button
                        onClick={saveToday}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        size="lg"
                    >
                        <Save className="mr-2 w-4 h-4" />
                        {saved ? 'Tallennettu!' : 'Tallenna päivä'}
                    </Button>
                </div>

                {saved && (
                    <Alert className="bg-emerald-50 border-emerald-200">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <AlertTitle>Tallennettu!</AlertTitle>
                        <AlertDescription>
                            Päivän energiatilanne tallennettu. Seuraa kehitystä päivittäin.
                            <span className="block mt-1 font-bold text-emerald-700">+20 pistettä</span>
                        </AlertDescription>
                    </Alert>
                )}

            </div>
        </div>
    );
}
