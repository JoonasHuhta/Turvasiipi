"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
    Shield, AlertTriangle, Copy, Check, ArrowRight, Save, CheckCircle2
} from "lucide-react";
import Link from "next/link";

const GRAY_ROCK_EXAMPLES = [
    { toxic: "Kuulitko mitä X sanoi sinusta?", response: "En." },
    { toxic: "Miksi olet niin hiljainen tänään?", response: "Vähän väsynyt." },
    { toxic: "Näytät pahoittaneen mielesi, mikä on?", response: "Olen ok." },
    { toxic: "Kerro lisää tuosta projekterista!", response: "Ei hirveästi kerrottavaa." },
    { toxic: "Vaikutat stressaantuneelta...", response: "Vaan tavallinen päivä." }
];

const BIFF_EXAMPLES = [
    {
        hostile: "Sinun pitäisi jo tietää miten tämä tehdään! Tämä on peruskamaa!",
        biff: "Kiitos viestistäsi. Tarkistan ohjeet ja varmistan että teen tämän oikein. Toimitan raportin perjantaina klo 16 mennessä."
    },
    {
        hostile: "Koko tiimi kärsii sun hitaudesta. Kaikki odottavat sua!",
        biff: "Ymmärrän aikataulun tärkeyden. Valmistan materiaalin huomiseksi palaveriin kuten sovittiin. Kerron jos ilmenee viivästyksiä."
    },
    {
        hostile: "Taas virheitä! Eikö kukaan tarkista sun töitä?",
        biff: "Kiitos palautteesta. Korjaan kohdat 2 ja 5 ja lähetän päivitetyn version tänään klo 15."
    }
];

interface ExitPlanState {
    phase1_log: boolean;
    phase1_emails: boolean;
    phase1_performance: boolean;
    phase2_fund: boolean;
    phase2_cv: boolean;
    phase2_refs: boolean;
    phase3_apps: boolean;
    phase3_network: boolean;
    phase3_offer: boolean;
    phase4_resign: boolean;
    phase4_professional: boolean;
    phase4_bridges: boolean;
}

export default function SurvivalStrategiesPage() {
    const { t, loadNamespace } = useLanguage();
    const { completeModule, isModuleCompleted } = useProgress();

    const [activeTab, setActiveTab] = useState<'gray-rock' | 'biff' | 'exit'>('gray-rock');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [saved, setSaved] = useState(false);

    const [exitPlan, setExitPlan] = useState<ExitPlanState>({
        phase1_log: false,
        phase1_emails: false,
        phase1_performance: false,
        phase2_fund: false,
        phase2_cv: false,
        phase2_refs: false,
        phase3_apps: false,
        phase3_network: false,
        phase3_offer: false,
        phase4_resign: false,
        phase4_professional: false,
        phase4_bridges: false
    });

    useEffect(() => {
        loadNamespace('rsd');
        loadExitPlan();
    }, [loadNamespace]);

    const loadExitPlan = () => {
        const saved = localStorage.getItem('rsd_exit_plan');
        if (saved) {
            setExitPlan(JSON.parse(saved));
        }
    };

    const saveExitPlan = () => {
        localStorage.setItem('rsd_exit_plan', JSON.stringify(exitPlan));

        if (!isModuleCompleted('rsd_survival_strategies')) {
            completeModule('rsd_survival_strategies');
        }

        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const toggleExitItem = (key: keyof ExitPlanState) => {
        setExitPlan({ ...exitPlan, [key]: !exitPlan[key] });
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const calculateProgress = () => {
        const total = Object.keys(exitPlan).length;
        const completed = Object.values(exitPlan).filter(Boolean).length;
        return Math.round((completed / total) * 100);
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
                        <span className="text-[11px] font-mono text-emerald-700 uppercase tracking-widest border-b border-emerald-600 pb-1 inline-block">
                            Käytännön taktiikat
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B]">
                            🛡️ Selviytymisstrategiat
                        </h1>
                        <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                            Gray Rock, BIFF, Exit Plan - kun et voi välittömästi lähteä
                        </p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 justify-center flex-wrap">
                    <Button
                        onClick={() => setActiveTab('gray-rock')}
                        variant={activeTab === 'gray-rock' ? 'default' : 'outline'}
                        className={activeTab === 'gray-rock' ? 'bg-[#5B4B8A]' : ''}
                    >
                        🪨 Gray Rock
                    </Button>
                    <Button
                        onClick={() => setActiveTab('biff')}
                        variant={activeTab === 'biff' ? 'default' : 'outline'}
                        className={activeTab === 'biff' ? 'bg-[#5B4B8A]' : ''}
                    >
                        📝 BIFF
                    </Button>
                    <Button
                        onClick={() => setActiveTab('exit')}
                        variant={activeTab === 'exit' ? 'default' : 'outline'}
                        className={activeTab === 'exit' ? 'bg-[#5B4B8A]' : ''}
                    >
                        🚪 Exit Plan
                    </Button>
                </div>

                {/* Gray Rock Tab */}
                {activeTab === 'gray-rock' && (
                    <div className="space-y-6">
                        <Card className="bg-white border-[#E8DDD0] shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif">🪨 Gray Rock -menetelmä</CardTitle>
                                <CardDescription>Tule tylsäksi kuin harmaa kivi</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Alert className="bg-slate-50 border-slate-200">
                                    <Shield className="h-5 w-5 text-slate-600" />
                                    <AlertTitle>Mikä tämä on?</AlertTitle>
                                    <AlertDescription>
                                        Kun et voi välttää toksista ihmistä, voit viedä häneltä sen mitä hän haluaa: <strong>emotionaalisia reaktioita</strong>. Tule tylsäksi, ennustettavaksi, reagoimattomaksi kuin harmaa kivi.
                                    </AlertDescription>
                                </Alert>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                                        <h3 className="font-bold text-emerald-800 mb-2">✓ Milloin käyttää?</h3>
                                        <ul className="text-sm space-y-1">
                                            <li>• Henkilö ruokkii draamalla</li>
                                            <li>• Et voi välttää heitä (sama tiimi)</li>
                                            <li>• Viralliset kanavat eivät toimi</li>
                                            <li>• Tarvitset lyhyen aikavälin selviytymisen</li>
                                        </ul>
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <h3 className="font-bold text-blue-800 mb-2">🎯 Käytännössä:</h3>
                                        <ol className="text-sm space-y-1 list-decimal list-inside">
                                            <li>Anna lyhyitä, tylsiä vastauksia</li>
                                            <li>Älä jaa henkilökohtaista</li>
                                            <li>Näytä nollareaktiota</li>
                                            <li>Vaihda aihe tai poistu</li>
                                        </ol>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold mb-3">Esimerkkivastaukset:</h3>
                                    <div className="space-y-3">
                                        {GRAY_ROCK_EXAMPLES.map((ex, i) => (
                                            <div key={i} className="p-4 bg-[#FDFBF7] rounded-lg border border-[#E8DDD0]">
                                                <p className="text-rose-600 text-sm mb-2">
                                                    <strong>Toksinen:</strong> "{ex.toxic}"
                                                </p>
                                                <p className="text-slate-700 text-sm">
                                                    <strong>Gray Rock:</strong> "{ex.response}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Alert className="bg-amber-50 border-amber-200">
                                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                                    <AlertTitle>Huom!</AlertTitle>
                                    <AlertDescription className="text-sm">
                                        Tämä on <strong>lyhyen aikavälin selviytymistaktiikka</strong>, ei pysyvä ratkaisu. Jos tilanne jatkuu kuukausia, tarvitset Exit Planin.
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* BIFF Tab */}
                {activeTab === 'biff' && (
                    <div className="space-y-6">
                        <Card className="bg-white border-[#E8DDD0] shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif">📝 BIFF-vastausmalli</CardTitle>
                                <CardDescription>Brief, Informative, Friendly, Firm</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Alert className="bg-blue-50 border-blue-200">
                                    <Shield className="h-5 w-5 text-blue-600" />
                                    <AlertTitle>Mikä tämä on?</AlertTitle>
                                    <AlertDescription>
                                        Vastausmalli vihamielisiin sähköposteihin. Suojaa itseäsi ammatillisesti ja luo dokumentaatiota ilman eskaloitumista.
                                    </AlertDescription>
                                </Alert>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="p-3 bg-slate-50 rounded-lg text-center">
                                        <Badge className="mb-2">Brief</Badge>
                                        <p className="text-xs">2-3 lausetta max</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg text-center">
                                        <Badge className="mb-2">Informative</Badge>
                                        <p className="text-xs">Vain faktoja, ei mielipiteitä</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg text-center">
                                        <Badge className="mb-2">Friendly</Badge>
                                        <p className="text-xs">Ammatillinen sävy</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg text-center">
                                        <Badge className="mb-2">Firm</Badge>
                                        <p className="text-xs">Selkeä raja</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold mb-3">Esimerkkejä:</h3>
                                    <div className="space-y-4">
                                        {BIFF_EXAMPLES.map((ex, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                                                    <p className="text-xs text-rose-600 font-mono mb-1">HOSTILE:</p>
                                                    <p className="text-sm text-rose-800">"{ex.hostile}"</p>
                                                </div>
                                                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 relative">
                                                    <p className="text-xs text-emerald-600 font-mono mb-1">BIFF:</p>
                                                    <p className="text-sm text-emerald-900">"{ex.biff}"</p>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="absolute top-2 right-2"
                                                        onClick={() => copyToClipboard(ex.biff, i)}
                                                    >
                                                        {copiedIndex === i ? (
                                                            <><Check className="w-3 h-3 mr-1" /> Kopioitu!</>
                                                        ) : (
                                                            <><Copy className="w-3 h-3 mr-1" /> Kopioi</>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Alert className="bg-purple-50 border-purple-200">
                                    <AlertTitle>💡 Pro tip</AlertTitle>
                                    <AlertDescription className="text-sm">
                                        Tallenna BIFF-vastaukset. Ne toimivat dokumentaationa että yritit kommunikoida ammatillisesti, vaikka toinen osapuoli ei.
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Exit Plan Tab */}
                {activeTab === 'exit' && (
                    <div className="space-y-6">
                        <Card className="bg-white border-[#E8DDD0] shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif">🚪 Poistumissuunnitelma</CardTitle>
                                <CardDescription>Lähde turvallisesti ja suunnitellusti</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Alert className="bg-amber-50 border-2 border-amber-300">
                                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                                    <AlertTitle>⚠️ RSD-varoitus</AlertTitle>
                                    <AlertDescription>
                                        RSD tekee äkkilähdöstä houkuttelevan. <strong>Älä irtisanoudu impulsiivisesti.</strong> Seuraa tätä suunnitelmaa vaihe vaiheelta.
                                    </AlertDescription>
                                </Alert>

                                {/* Phase 1 */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-slate-700">Vaihe 1</Badge>
                                        <h3 className="font-bold">Dokumentointi (1-3kk)</h3>
                                    </div>
                                    <div className="space-y-2 ml-6">
                                        <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded">
                                            <Checkbox
                                                checked={exitPlan.phase1_log}
                                                onCheckedChange={() => toggleExitItem('phase1_log')}
                                            />
                                            <span className="text-sm">Tapahtumaloki (päivämäärä, aika, paikka, todistajat)</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded">
                                            <Checkbox
                                                checked={exitPlan.phase1_emails}
                                                onCheckedChange={() => toggleExitItem('phase1_emails')}
                                            />
                                            <span className="text-sm">Tallenna kaikki sähköpostit ja viestit</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded">
                                            <Checkbox
                                                checked={exitPlan.phase1_performance}
                                                onCheckedChange={() => toggleExitItem('phase1_performance')}
                                            />
                                            <span className="text-sm">Kopio suoritusarvioinneista ja palauttesta</span>
                                        </label>
                                    </div>
                                </div>

                                <Separator />

                                {/* Phase 2 */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-blue-700">Vaihe 2</Badge>
                                        <h3 className="font-bold">Valmistelu (3-6kk)</h3>
                                    </div>
                                    <div className="space-y-2 ml-6">
                                        <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded">
                                            <Checkbox
                                                checked={exitPlan.phase2_fund}
                                                onCheckedChange={() => toggleExitItem('phase2_fund')}
                                            />
                                            <span className="text-sm">Säästä 3-6kk elinkustannukset</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded">
                                            <Checkbox
                                                checked={exitPlan.phase2_cv}
                                                onCheckedChange={() => toggleExitItem('phase2_cv')}
                                            />
                                            <span className="text-sm">Päivitä CV ja LinkedIn-profiili</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded">
                                            <Checkbox
                                                checked={exitPlan.phase2_refs}
                                                onCheckedChange={() => toggleExitItem('phase2_refs')}
                                            />
                                            <span className="text-sm">Varmista referenssit (muualta kuin toksiselta henkilöltä)</span>
                                        </label>
                                    </div>
                                </div>

                                <Separator />

                                {/* Phase 3 */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-emerald-700">Vaihe 3</Badge>
                                        <h3 className="font-bold">Työhaku (jatkuva)</h3>
                                    </div>
                                    <div className="space-y-2 ml-6">
                                        <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded">
                                            <Checkbox
                                                checked={exitPlan.phase3_apps}
                                                onCheckedChange={() => toggleExitItem('phase3_apps')}
                                            />
                                            <span className="text-sm">Lähetä 5-10 hakemusta viikossa</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded">
                                            <Checkbox
                                                checked={exitPlan.phase3_network}
                                                onCheckedChange={() => toggleExitItem('phase3_network')}
                                            />
                                            <span className="text-sm">Verkostoidu (LinkedIn, alan tapahtumat)</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded">
                                            <Checkbox
                                                checked={exitPlan.phase3_offer}
                                                onCheckedChange={() => toggleExitItem('phase3_offer')}
                                            />
                                            <span className="text-sm font-bold">SAANUT kirjallisen työtarjouksen ✓</span>
                                        </label>
                                    </div>
                                </div>

                                <Separator />

                                {/* Phase 4 */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-rose-700">Vaihe 4</Badge>
                                        <h3 className="font-bold">Poistuminen (2 viikkoa)</h3>
                                    </div>
                                    <div className="space-y-2 ml-6">
                                        <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded">
                                            <Checkbox
                                                checked={exitPlan.phase4_resign}
                                                onCheckedChange={() => toggleExitItem('phase4_resign')}
                                            />
                                            <span className="text-sm">Kirjallinen irtisanoutuminen (lyhyt, neutraali)</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded">
                                            <Checkbox
                                                checked={exitPlan.phase4_professional}
                                                onCheckedChange={() => toggleExitItem('phase4_professional')}
                                            />
                                            <span className="text-sm">Pysy ammativ maisena viimeiseen päivään</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded">
                                            <Checkbox
                                                checked={exitPlan.phase4_bridges}
                                                onCheckedChange={() => toggleExitItem('phase4_bridges')}
                                            />
                                            <span className="text-sm">Älä polta siltoja (vaikka haluaisit)</span>
                                        </label>
                                    </div>
                                </div>

                                <Separator />

                                {/* Progress */}
                                <div className="space-y-3 p-4 bg-[#FDFBF7] rounded-lg border border-[#E8DDD0]">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold">Kokonaisprogress:</h4>
                                        <Badge>{calculateProgress()}%</Badge>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-3">
                                        <div
                                            className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
                                            style={{ width: `${calculateProgress()}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-600">
                                        {Object.values(exitPlan).filter(Boolean).length}/{Object.keys(exitPlan).length} kohtaa valmiina
                                    </p>
                                </div>

                                <Button
                                    onClick={saveExitPlan}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                                    size="lg"
                                >
                                    <Save className="mr-2 w-4 h-4" />
                                    {saved ? 'Tallennettu!' : 'Tallenna poistumissuunnitelma'}
                                </Button>

                                {saved && (
                                    <Alert className="bg-emerald-50 border-emerald-200">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                        <AlertTitle>Suunnitelma tallennettu!</AlertTitle>
                                        <AlertDescription>
                                            Palaa tälle sivulle säännöllisesti ja päivitä progressi.
                                            <span className="block mt-1 font-bold text-emerald-700">+20 pistettä</span>
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}

            </div>
        </div>
    );
}
