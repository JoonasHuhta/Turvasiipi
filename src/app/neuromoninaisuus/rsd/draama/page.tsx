"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
    Heart, AlertTriangle, AlertCircle, ArrowRight, Save, CheckCircle2, FileText
} from "lucide-react";
import Link from "next/link";

interface Question {
    id: string;
    text: string;
    options: Array<{
        value: string;
        label: string;
        rsdPoints?: number;
        toxicPoints?: number;
    }>;
}

const QUESTIONS: Question[] = [
    {
        id: 'frequency',
        text: 'Kuinka usein tämä on tapahtunut?',
        options: [
            { value: 'once', label: 'Kerran', rsdPoints: 2 },
            { value: 'few', label: '2-3 kertaa', rsdPoints: 0, toxicPoints: 0 },
            { value: 'regular', label: 'Säännöllisesti (viikoittain)', toxicPoints: 2 }
        ]
    },
    {
        id: 'targeting',
        text: 'Kohdellaanko muita samoin?',
        options: [
            { value: 'yes_all', label: 'Kyllä, kaikkia', rsdPoints: 2 },
            { value: 'yes_some', label: 'Joitain muita', rsdPoints: 0, toxicPoints: 0 },
            { value: 'only_me', label: 'Vain minua', toxicPoints: 2 }
        ]
    },
    {
        id: 'witnesses',
        text: 'Onko todistajia tai dokumentteja?',
        options: [
            { value: 'none', label: 'Ei todistajia eikä dokumentteja', rsdPoints: 1 },
            { value: 'unclear', label: 'Epäselvä tilanne', rsdPoints: 0, toxicPoints: 0 },
            { value: 'yes', label: 'Kyllä (sähköpostit, viestit, todistajat)', toxicPoints: 2 }
        ]
    },
    {
        id: 'physical',
        text: 'Fyysiset oireet?',
        options: [
            { value: 'none', label: 'Ei oireita', rsdPoints: 0, toxicPoints: 0 },
            { value: 'mild', label: 'Lievää ahdistusta hetken', rsdPoints: 1 },
            { value: 'severe', label: 'Unihäiriöt, paniikkikohtaukset, jatkuva stressi', toxicPoints: 2 }
        ]
    },
    {
        id: 'validation',
        text: 'Mitä luotetut ihmiset sanovat, kun kerrot tilanteesta?',
        options: [
            { value: 'says_normal', label: '"Kuulostaa ihan normaalilta"', rsdPoints: 2 },
            { value: 'unsure', label: 'Epävarmoja tai eivät ota kantaa', rsdPoints: 0, toxicPoints: 0 },
            { value: 'confirms', label: '"Minäkin olen huomannut" tai "Tuo ei ole ok"', toxicPoints: 2 }
        ]
    },
    {
        id: 'duration',
        text: 'Kuinka kauan tilanne on kestänyt?',
        options: [
            { value: 'today', label: 'Tänään', rsdPoints: 2 },
            { value: 'week', label: 'Viikko', rsdPoints: 0, toxicPoints: 0 },
            { value: 'months', label: 'Kuukausia', toxicPoints: 2 }
        ]
    }
];

export default function DramaFilterPage() {
    const { t, loadNamespace } = useLanguage();
    const { completeModule, isModuleCompleted } = useProgress();

    const [situation, setSituation] = useState('');
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        loadNamespace('rsd');
    }, [loadNamespace]);

    const calculateScores = () => {
        let rsdScore = 0;
        let toxicScore = 0;

        QUESTIONS.forEach(q => {
            const answer = answers[q.id];
            if (answer) {
                const option = q.options.find(o => o.value === answer);
                if (option) {
                    rsdScore += option.rsdPoints || 0;
                    toxicScore += option.toxicPoints || 0;
                }
            }
        });

        return { rsdScore, toxicScore };
    };

    const getVerdict = () => {
        const { rsdScore, toxicScore } = calculateScores();

        if (rsdScore >= 8 && toxicScore <= 3) return 'RSD_LIKELY';
        if (toxicScore >= 8 && rsdScore <= 3) return 'TOXIC_LIKELY';
        if (rsdScore >= 5 && toxicScore >= 5) return 'BOTH';
        return 'UNCLEAR';
    };

    const saveAssessment = () => {
        const assessment = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            situation,
            answers,
            scores: calculateScores(),
            verdict: getVerdict()
        };

        const history = JSON.parse(localStorage.getItem('rsd_drama_assessments') || '[]');
        history.push(assessment);
        localStorage.setItem('rsd_drama_assessments', JSON.stringify(history));

        if (!isModuleCompleted('rsd_drama_filter')) {
            completeModule('rsd_drama_filter');
        }

        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const allAnswered = QUESTIONS.every(q => answers[q.id]);
    const verdict = getVerdict();
    const { rsdScore, toxicScore } = calculateScores();

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    <Link href="/neuromoninaisuus/rsd" className="inline-block">
                        <span className="text-sm text-[#5B4B8A] hover:underline">← RSD-työkalut</span>
                    </Link>

                    <div className="space-y-2">
                        <span className="text-[11px] font-mono text-purple-700 uppercase tracking-widest border-b border-purple-600 pb-1 inline-block">
                            Kriittinen turvallisuustyökalu
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B]">
                            🧠 Dramasuodatin
                        </h1>
                        <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                            RSD-reaktio vai toksinen käyttäytyminen?
                        </p>
                    </div>
                </div>

                {/* Safety Notice */}
                <Alert className="bg-purple-50 border-2 border-purple-300">
                    <AlertCircle className="h-5 w-5 text-purple-600" />
                    <AlertTitle className="text-base font-bold">⚠️ Tärkeä muistutus</AlertTitle>
                    <AlertDescription className="text-sm">
                        RSD JA toksinen käyttäytyminen voivat olla totta YHTÄ AIKAA. RSD ei tee sinusta "liian herkkää" huonoa kohtelua varten. Toksinen ihminen voi hyödyntää RSD:täsi manipuloidakseen ("olet vain yliherkkä").
                    </AlertDescription>
                </Alert>

                {/* Situation Description */}
                {!showResults && (
                    <>
                        <Card className="bg-white border-[#E8DDD0] shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif">Kuvaile tilanne</CardTitle>
                                <CardDescription>Mitä tapahtui? Kirjoita lyhyesti.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    value={situation}
                                    onChange={(e) => setSituation(e.target.value)}
                                    placeholder="Esim: Esihenkilö jätti minut pois projektista ilman selitystä..."
                                    className="min-h-[120px]"
                                />
                            </CardContent>
                        </Card>

                        {/* Questions */}
                        <Card className="bg-white border-[#E8DDD0]">
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif">Arviointikysymykset</CardTitle>
                                <CardDescription>Vastaa rehellisesti kaikkiin kysymyksiin</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {QUESTIONS.map((question, idx) => (
                                    <div key={question.id} className="space-y-3 p-4 bg-[#FDFBF7] rounded-lg border border-[#E8DDD0]">
                                        <h4 className="font-bold text-sm text-[#2B2B2B]">
                                            {idx + 1}. {question.text}
                                        </h4>
                                        <div className="space-y-2">
                                            {question.options.map((option) => (
                                                <label key={option.value} className="flex items-start gap-3 cursor-pointer hover:bg-white/50 p-2 rounded-lg transition-colors">
                                                    <input
                                                        type="radio"
                                                        name={question.id}
                                                        value={option.value}
                                                        checked={answers[question.id] === option.value}
                                                        onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                                                        className="mt-0.5 w-4 h-4"
                                                    />
                                                    <span className="text-sm flex-1">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Button
                            onClick={() => setShowResults(true)}
                            disabled={!situation.trim() || !allAnswered}
                            className="w-full bg-[#5B4B8A] hover:bg-[#4A3A7A] text-white"
                            size="lg"
                        >
                            Näytä arvio
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </>
                )}

                {/* Results */}
                {showResults && (
                    <>
                        {/* Scores */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <Card className="border-2 border-blue-200 bg-blue-50">
                                <CardHeader>
                                    <CardTitle className="text-blue-800 flex items-center gap-2">
                                        <Heart className="w-5 h-5" />
                                        RSD-pisteet
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold font-mono text-blue-900">{rsdScore}/12</div>
                                </CardContent>
                            </Card>

                            <Card className="border-2 border-rose-200 bg-rose-50">
                                <CardHeader>
                                    <CardTitle className="text-rose-800 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5" />
                                        Toksinen-pisteet
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold font-mono text-rose-900">{toxicScore}/12</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Verdict */}
                        {verdict === 'RSD_LIKELY' && (
                            <Alert className="bg-blue-50 border-2 border-blue-300">
                                <Heart className="h-5 w-5 text-blue-600" />
                                <AlertTitle className="text-lg font-bold">RSD-filtteri todennäköinen</AlertTitle>
                                <AlertDescription className="space-y-3 text-sm">
                                    <p>Vastausten perusteella tämä voi olla RSD-reaktio tavalliseen tilanteeseen.</p>
                                    <div className="bg-white p-3 rounded-lg">
                                        <p className="font-bold mb-2">Mitä tehdä:</p>
                                        <ul className="space-y-1 text-xs">
                                            <li>→ Käytä Tulkintasuodatinta (3 vaihtoehtoa)</li>
                                            <li>→ Anna 24h aikaa rauhoittua</li>
                                            <li>→ Keskustele luotetun ystävän kanssa</li>
                                            <li>→ Jos tunne jatkuu viikon → arvioi uudelleen</li>
                                        </ul>
                                    </div>
                                    <Link href="/neuromoninaisuus/rsd/tulkinta">
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                            → Tulkintasuodattimeen
                                        </Button>
                                    </Link>
                                </AlertDescription>
                            </Alert>
                        )}

                        {verdict === 'TOXIC_LIKELY' && (
                            <Alert className="bg-rose-50 border-2 border-rose-300">
                                <AlertTriangle className="h-5 w-5 text-rose-600" />
                                <AlertTitle className="text-lg font-bold">Mahdollinen toksinen tilanne</AlertTitle>
                                <AlertDescription className="space-y-3 text-sm">
                                    <p>Vastausten perusteella tämä voi olla oikeaa kiusaamista tai toksista käyttäytymistä.</p>
                                    <div className="bg-white p-3 rounded-lg">
                                        <p className="font-bold mb-2">Ota vakavasti:</p>
                                        <ul className="space-y-1 text-xs">
                                            <li>→ Dokumentoi KAIKKI tapahtumat (pvm, aika, paikka, todistajat)</li>
                                            <li>→ Säilytä kaikki sähköpostit ja viestit</li>
                                            <li>→ Kerro luotetulle kollegalle</li>
                                            <li>→ Harkitse virallista ilmoitusta</li>
                                        </ul>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Link href="/dokumentointi-opas">
                                            <Button variant="outline" size="sm" className="w-full text-xs">
                                                Dokumentointi
                                            </Button>
                                        </Link>
                                        <Link href="/raportti">
                                            <Button variant="outline" size="sm" className="w-full text-xs">
                                                Raportti
                                            </Button>
                                        </Link>
                                        <Link href="/tuki">
                                            <Button variant="outline" size="sm" className="w-full text-xs">
                                                Tuki
                                            </Button>
                                        </Link>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        )}

                        {verdict === 'BOTH' && (
                            <Alert className="bg-amber-50 border-2 border-amber-300">
                                <AlertCircle className="h-5 w-5 text-amber-600" />
                                <AlertTitle className="text-lg font-bold">Molemmat mahdollisia</AlertTitle>
                                <AlertDescription className="space-y-3 text-sm">
                                    <p>RSD voi vahvistaa oikeaa toksista käyttäytymistä - tai päinvastoin.</p>
                                    <div className="bg-white p-3 rounded-lg">
                                        <p className="font-bold mb-2">Dual-track approach:</p>
                                        <ol className="space-y-1 text-xs list-decimal list-inside">
                                            <li>Käsittele RSD (Tulkintasuodatin, terapia)</li>
                                            <li>JA dokumentoi objektiiviset faktat</li>
                                            <li>Pyydä ulkopuolinen arvio (HR, luottamusmies)</li>
                                        </ol>
                                    </div>
                                    <p className="font-bold text-amber-900">Tärkeää: Älä hylkää itseäsi. RSD ei tee kärsimyksestä vähemmän todellista.</p>
                                </AlertDescription>
                            </Alert>
                        )}

                        {verdict === 'UNCLEAR' && (
                            <Alert className="bg-slate-50 border-2 border-slate-300">
                                <AlertCircle className="h-5 w-5 text-slate-600" />
                                <AlertTitle className="text-lg font-bold">Epäselvä tilanne</AlertTitle>
                                <AlertDescription className="space-y-3 text-sm">
                                    <p>Tilanne ei ole selkeästi jompikumpi. Suositus:</p>
                                    <ul className="space-y-1 text-xs">
                                        <li>→ Aloita dokumentointi varmuuden vuoksi</li>
                                        <li>→ Seuraa tilannetta viikon</li>
                                        <li>→ Tee uusi arvio viikon kuluttua</li>
                                        <li>→ Keskustele luotetun henkilön kanssa</li>
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Comparison Chart */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border-blue-200 bg-blue-50">
                                <CardHeader>
                                    <CardTitle className="text-blue-800 text-lg">🧠 RSD-filtteri</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600">✓</span>
                                            <span>Yksittäinen tapahtuma</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600">✓</span>
                                            <span>Ei todisteita</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600">✓</span>
                                            <span>Muut eivät huomaa</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600">✓</span>
                                            <span>Tunne voimakas mutta lyhyt</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-rose-200 bg-rose-50">
                                <CardHeader>
                                    <CardTitle className="text-rose-800 text-lg">🚨 Toksinen käyttäytyminen</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2">
                                            <span className="text-rose-600">✓</span>
                                            <span>Toistuva kuvio</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-rose-600">✓</span>
                                            <span>Dokumentoitavissa</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-rose-600">✓</span>
                                            <span>Muutkin näkevät</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-rose-600">✓</span>
                                            <span>Pitkäkestoinen stressi</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                onClick={saveAssessment}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                            >
                                <Save className="mr-2 w-4 h-4" />
                                {saved ? 'Tallennettu!' : 'Tallenna arvio'}
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowResults(false);
                                    setSituation('');
                                    setAnswers({});
                                }}
                                variant="outline"
                                className="flex-1"
                            >
                                Uusi arvio
                            </Button>
                        </div>

                        {saved && (
                            <Alert className="bg-emerald-50 border-emerald-200">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                <AlertTitle>Arvio tallennettu!</AlertTitle>
                                <AlertDescription>
                                    Voit palata arvioon myöhemmin.
                                    <span className="block mt-1 font-bold text-emerald-700">+20 pistettä</span>
                                </AlertDescription>
                            </Alert>
                        )}
                    </>
                )}

            </div>
        </div>
    );
}
