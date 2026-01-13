"use client";

import { useState } from "react";
import { INDIVIDUAL_ASSESSMENT, ORGANIZATIONAL_ASSESSMENT, INDIVIDUAL_LABELS, ORGANIZATIONAL_LABELS, Category, Question } from "@/data/assessment-data";
import { LikertSlider } from "@/components/assessment/LikertSlider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, User, Users, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AssessmentSandboxPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" /> Hiekkalaatikko
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900">Itsearviointityökalut</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Kokeile uusia arviointityökaluja. Data ei tallennu pysyvästi mihinkään tietokantaan, vaan toimii tässä istunnossa.
                    </p>
                </div>

                <Tabs defaultValue="individual" className="space-y-8">
                    <div className="flex justify-center">
                        <TabsList className="bg-white p-1 rounded-full border border-slate-200 shadow-sm h-14">
                            <TabsTrigger value="individual" className="rounded-full px-6 h-full text-sm font-bold uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                                <User className="w-4 h-4 mr-2" /> Tunnista tilanteesi
                            </TabsTrigger>
                            <TabsTrigger value="organizational" className="rounded-full px-6 h-full text-sm font-bold uppercase tracking-widest data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                                <Users className="w-4 h-4 mr-2" /> Työkulttuuri
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="individual">
                        <AssessmentRunner
                            categories={INDIVIDUAL_ASSESSMENT}
                            mode="individual"
                            labels={INDIVIDUAL_LABELS}
                        />
                    </TabsContent>

                    <TabsContent value="organizational">
                        <AssessmentRunner
                            categories={ORGANIZATIONAL_ASSESSMENT}
                            mode="organizational"
                            labels={ORGANIZATIONAL_LABELS}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function AssessmentRunner({ categories, mode, labels }: { categories: Category[], mode: 'individual' | 'organizational', labels: any }) {
    const [started, setStarted] = useState(false);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [finished, setFinished] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    // Flatten questions for sequential progress
    const allQuestions = categories.flatMap(c => c.questions);

    // Simple state to track "current category" view or "all at once"?
    // Let's do a scrolling view with categories for better UX in "sandbox" to see it all.
    // Actually, distinct steps per category is often better. Let's do All-in-one scrollable form for organization, but maybe stepped for individual?
    // User plan suggested "Kesto 3-5min", let's try a stepped approach by Category to keep it manageable.

    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const currentCategory = categories[currentCategoryIndex];

    const handleAnswer = (qId: string, val: any) => {
        setAnswers(prev => ({ ...prev, [qId]: val }));
    };

    const nextCategory = () => {
        if (currentCategoryIndex < categories.length - 1) {
            setCurrentCategoryIndex(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setFinished(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const calculateResults = () => {
        // Simple scoring for demo
        // Individual: 1=Good, 5=Bad (mostly). 
        // Wait, individual questions like "Työkaverini vitsailevat..." -> 5 (Jatkuvasti) is BAD.

        // Organizational: 1=Bad, 5=Good.

        let totalScore = 0;
        let maxScore = 0;

        Object.entries(answers).forEach(([qId, val]) => {
            const q = allQuestions.find(q => q.id === qId);
            if (!q) return;

            // Assuming val is number 1-5
            if (typeof val === 'number') {
                if (mode === 'individual') {
                    // 1=Good (Ei koskaan), 5=Bad (Jatkuvasti)
                    // We want "Risk Score". Higher is worse.
                    totalScore += val;
                } else {
                    // 1=Bad, 5=Good.
                    // We want "Health Score". Higher is better.
                    totalScore += val;
                }
                maxScore += 5;
            }
        });

        const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
        return { totalScore, maxScore, percentage };
    };

    if (finished) {
        const results = calculateResults();

        const getFeedback = (percentage: number, mode: 'individual' | 'organizational') => {
            if (mode === 'individual') {
                // Risk Score: Higher is worse
                if (percentage < 25) return {
                    title: "🟢 Tilanne vaikuttaa rauhalliselta",
                    desc: "Tulosten perusteella et koe merkittävää kiusaamista tai epäasiallista kohtelua. Satunnaiset ristiriidat kuuluvat työelämään, mutta ne ratkeavat yleensä puhumalla.",
                    level: "Matala riski"
                };
                if (percentage < 50) return {
                    title: "🟡 Huolestuttavia merkkejä",
                    desc: "Koet joitakin kuormittavia tekijöitä. Tilanne ei ehkä ole vielä kriittinen, mutta se vaatii huomiota. Kannattaa ottaa asiat puheeksi varhaisessa vaiheessa.",
                    level: "Kohonnut riski"
                };
                if (percentage < 75) return {
                    title: "🟠 Vakavia ongelmia havaittavissa",
                    desc: "Työhyvinvointisi on vaarassa. Kokemuksesi viittaavat toistuvaan epäasialliseen kohteluun. Suosittelemme aloittamaan tilanteiden dokumentoinnin ja puhumaan luottamushenkilölle.",
                    level: "Vakava riski"
                };
                return {
                    title: "🔴 Kriittinen tilanne",
                    desc: "Tulokset viittaavat vakavaan ja mahdollisesti pitkään jatkuneeseen kiusaamiseen tai häirintään. Terveytesi voi olla vaarassa. Hae apua välittömästi työterveydestä tai työsuojelusta.",
                    level: "Akuutti vaara"
                };
            } else {
                // Health Score: Higher is better
                if (percentage > 80) return {
                    title: "🟢 Erinomainen työkulttuuri",
                    desc: "Yhteisönne toimii esimerkillisesti. Vuorovaikutus on avointa ja rakenteet tukevat hyvinvointia. Pitäkää tästä kiinni!",
                    level: "Erinomainen"
                };
                if (percentage > 60) return {
                    title: "🟢 Hyvä perustaso",
                    desc: "Asiat ovat pääosin hyvin, mutta kehitettävää löytyy. Kiinnittäkää huomiota matalampiin osa-alueisiin, jotta hyvä vire säilyy.",
                    level: "Hyvä"
                };
                if (percentage > 40) return {
                    title: "🟡 Kehitettävää löytyy",
                    desc: "Työyhteisössä on haasteita, jotka vaikuttavat ilmapiiriin ja jaksamiseen. Avoimempi keskustelu ja pelisääntöjen selkeyttäminen olisi tarpeen.",
                    level: "Välttävä"
                };
                return {
                    title: "🔴 Huolestuttava tilanne",
                    desc: "Työyhteisön rakenteissa ja ilmapiirissä on vakavia puutteita. Tämä riskeeraa työntekijöiden jaksamisen ja turvallisuuden. Tarvitaan nopeita korjausliikkeitä.",
                    level: "Heikko"
                };
            }
        };

        const feedback = getFeedback(results.percentage, mode);

        return (
            <Card className="p-8 border-none shadow-xl bg-white animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center space-y-8">

                    {/* Header Summary */}
                    <div className={cn("p-8 rounded-3xl text-white shadow-lg",
                        mode === 'individual'
                            ? (results.percentage < 50 ? "bg-emerald-600" : results.percentage < 75 ? "bg-amber-500" : "bg-red-600")
                            : (results.percentage > 60 ? "bg-emerald-600" : results.percentage > 40 ? "bg-amber-500" : "bg-red-600")
                    )}>
                        <h2 className="text-3xl font-black uppercase tracking-tight mb-2">{feedback.title}</h2>
                        <p className="text-lg opacity-90 font-medium max-w-2xl mx-auto leading-relaxed">{feedback.desc}</p>

                        <div className="mt-8 inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                            <span className="font-bold uppercase tracking-widest text-sm mr-2 opacity-80">{feedback.level}</span>
                            <span className="text-3xl font-black">{Math.round(results.percentage)}%</span>
                        </div>
                    </div>

                    <div className="space-y-4 text-left">
                        <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 ml-1">Osa-alueiden analyysi</h3>
                        <p className="text-sm text-slate-500 ml-1 mb-4">Klikkaa osa-aluetta nähdäksesi tarkemman analyysin.</p>

                        <div className="grid gap-3">
                            {categories.map((cat, index) => {
                                // Calc category score
                                const catQuestions = cat.questions;
                                let cScore = 0;
                                let cMax = 0;
                                catQuestions.forEach(q => {
                                    if (answers[q.id] && typeof answers[q.id] === 'number') {
                                        cScore += answers[q.id];
                                        cMax += 5;
                                    }
                                });
                                const cPct = cMax > 0 ? (cScore / cMax) * 100 : 0;

                                // Category specific feedback text generator
                                const getCatAnalysis = (pct: number) => {
                                    if (mode === 'individual') {
                                        if (pct < 30) return "Tällä alueella ei ilmene merkittäviä ongelmia.";
                                        if (pct < 60) return "Tällä alueella on havaittavissa lievää kuormitusta.";
                                        return "Tämä on merkittävä kuormitustekijä. Kiinnitä tähän erityistä huomiota.";
                                    } else {
                                        if (pct > 70) return "Tämä osa-alue toimii teillä vahvuutena.";
                                        if (pct > 40) return "Tässä on parantamisen varaa, ottakaa asia puheeksi tiimissä.";
                                        return "Tämä osa-alue vaatii pikaista kehittämistä ja toimenpiteitä.";
                                    }
                                };

                                const isOpen = expandedCategories[cat.id];

                                return (
                                    <div key={cat.id} className="border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white">
                                        <button
                                            onClick={() => setExpandedCategories(prev => ({ ...prev, [cat.id]: !prev[cat.id] }))}
                                            className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={cn("w-2 h-8 rounded-full",
                                                    mode === 'individual'
                                                        ? (cPct > 50 ? "bg-red-500" : "bg-emerald-500")
                                                        : (cPct > 60 ? "bg-emerald-500" : "bg-red-500")
                                                )} />
                                                <span className="font-bold text-slate-700">{cat.title}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={cn("font-black text-lg",
                                                    mode === 'individual'
                                                        ? (cPct > 50 ? "text-red-500" : "text-emerald-500")
                                                        : (cPct > 60 ? "text-emerald-500" : "text-red-500")
                                                )}>
                                                    {Math.round(cPct)}%
                                                </span>
                                                <ArrowRight className={cn("w-5 h-5 text-slate-300 transition-transform duration-300", isOpen && "rotate-90")} />
                                            </div>
                                        </button>

                                        <div className={cn(
                                            "grid transition-all duration-300 ease-in-out",
                                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        )}>
                                            <div className="overflow-hidden">
                                                <div className="p-6 bg-white space-y-4 border-t border-slate-100">
                                                    <p className="text-slate-600 font-medium leading-relaxed">
                                                        {getCatAnalysis(cPct)}
                                                    </p>
                                                    <div className="pt-4 border-t border-slate-50">
                                                        <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Vastaukset osiossa</h5>
                                                        <div className="space-y-2">
                                                            {catQuestions.map(q => (
                                                                <div key={q.id} className="flex justify-between text-sm py-1">
                                                                    <span className="text-slate-600 pr-4 w-2/3">{q.text}</span>
                                                                    <span className="font-bold text-slate-800 whitespace-nowrap text-right w-1/3">
                                                                        {q.type === 'single-choice'
                                                                            ? q.options?.find(o => o.value === answers[q.id])?.label
                                                                            : (labels[answers[q.id]] || answers[q.id])
                                                                        }
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <Button onClick={() => { setFinished(false); setStarted(false); setAnswers({}); setCurrentCategoryIndex(0); setExpandedCategories({}); }} size="lg" className="rounded-full w-full h-14 text-lg font-bold bg-slate-900 hover:bg-slate-800 mt-8">
                        <RefreshCw className="mr-2 w-5 h-5" /> Tee uudelleen
                    </Button>
                </div>
            </Card>
        );
    }

    if (!started) {
        return (
            <Card className="p-12 border-none shadow-xl bg-white text-center space-y-8 animate-in fade-in duration-500">
                <div className={cn("w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-white text-4xl shadow-lg transform rotate-3", mode === 'individual' ? "bg-indigo-600" : "bg-emerald-600")}>
                    {mode === 'individual' ? <ShieldCheck className="w-12 h-12" /> : <Users className="w-12 h-12" />}
                </div>
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
                        {mode === 'individual' ? "Tunnista tilanteesi" : "Työkulttuurin itsearviointi"}
                    </h2>
                    <p className="text-slate-600 text-lg max-w-md mx-auto">
                        {mode === 'individual'
                            ? "Anonyymi työkalu omien kokemusten jäsentämiseen. Tunnista onko kyse kiusaamisesta."
                            : "Arvioi tiimisi tilaa. Miten johtaminen, vuorovaikutus ja turvallisuus toteutuvat?"
                        }
                    </p>
                </div>
                <div className="flex items-center justify-center gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 100% Anonyymi</span>
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> ~5 min</span>
                </div>
                <Button onClick={() => setStarted(true)} size="lg" className={cn("rounded-full px-12 py-8 text-xl font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all", mode === 'individual' ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200")}>
                    Aloita <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
            </Card>
        );
    }

    const progress = ((Object.keys(answers).length) / allQuestions.length) * 100;

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                    {currentCategory.title}
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-300">
                    {Math.round(progress)}% Valmis
                </span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-200" />

            <Card className="border-none shadow-xl overflow-hidden">
                <div className="bg-slate-50 p-6 border-b border-slate-100">
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-sm border border-slate-100">
                            {currentCategoryIndex + 1}
                        </span>
                        {currentCategory.title}
                    </h3>
                </div>
                <div className="p-6 md:p-8 space-y-12 bg-white">
                    {currentCategory.questions.map((q) => (
                        <div key={q.id} className="space-y-4">
                            <h4 className="font-bold text-lg text-slate-800 leading-tight">
                                {q.text}
                            </h4>

                            {q.type === 'single-choice' ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {q.options?.map(opt => (
                                        <div
                                            key={opt.value}
                                            onClick={() => handleAnswer(q.id, opt.value)}
                                            className={cn(
                                                "cursor-pointer p-4 rounded-xl border-2 text-sm font-bold text-center transition-all",
                                                answers[q.id] === opt.value
                                                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                                                    : "border-slate-100 bg-white text-slate-500 hover:border-slate-200"
                                            )}
                                        >
                                            {opt.label}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <LikertSlider
                                    value={answers[q.id] || 3}
                                    onChange={(val) => handleAnswer(q.id, val)}
                                    labels={labels}
                                    reverseColors={mode === 'organizational'}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <Button
                        onClick={nextCategory}
                        disabled={currentCategory.questions.some(q => q.type === 'single-choice' && !answers[q.id])}
                        size="lg"
                        className="rounded-full px-8 font-bold bg-slate-900 hover:bg-slate-800 disabled:opacity-50"
                    >
                        {currentCategoryIndex < categories.length - 1 ? "Seuraava osio" : "Näytä tulokset"} <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </Card>
        </div>
    );
}
