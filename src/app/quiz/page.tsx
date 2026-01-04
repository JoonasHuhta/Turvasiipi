"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quizQuestions, getRiskLevel, QuizCategory } from "@/data/questions";
import { bullyingTactics, Tactic } from "@/data/tactics";
import {
    ArrowRight,
    RotateCcw,
    ShieldCheck,
    AlertTriangle,
    Brain,
    Info,
    Search,
    ChevronRight,
    MessageCircle,
    EyeOff,
    HeartPulse,
    UserX,
    TrendingUp,
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function QuizPage() {
    const [activeTab, setActiveTab] = useState("quiz");
    const [hasStarted, setHasStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, boolean>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [selectedTactic, setSelectedTactic] = useState<Tactic | null>(null);

    const handleAnswer = (isYes: boolean) => {
        setAnswers(prev => ({ ...prev, [quizQuestions[currentIndex].id]: isYes }));

        if (currentIndex < quizQuestions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setIsFinished(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const resetQuiz = () => {
        setHasStarted(false);
        setCurrentIndex(0);
        setAnswers({});
        setIsFinished(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const score = Object.values(answers).filter(Boolean).length;
    const progress = ((currentIndex + 1) / quizQuestions.length) * 100;
    const currentQuestion = quizQuestions[currentIndex];
    const risk = getRiskLevel(score);

    // Calculate scores per category
    const categoryScores = useMemo(() => {
        const scores: Record<QuizCategory, { score: number; total: number }> = {
            itsetunto: { score: 0, total: 0 },
            todellisuus: { score: 0, total: 0 },
            eristyksissä: { score: 0, total: 0 },
            fyysiset: { score: 0, total: 0 },
            käyttäytyminen: { score: 0, total: 0 }
        };

        quizQuestions.forEach(q => {
            scores[q.category].total++;
            if (answers[q.id]) {
                scores[q.category].score++;
            }
        });

        return scores;
    }, [answers]);

    const categoryLabels: Record<QuizCategory, { label: string; icon: any; description: string }> = {
        itsetunto: {
            label: "Itsetunnon mureneminen",
            icon: HeartPulse,
            description: "Miltä sinusta tuntuu itsesi ja ammattitaitosi suhteen."
        },
        todellisuus: {
            label: "Gaslighting & Todellisuus",
            icon: EyeOff,
            description: "Epäiletkö omia havaintojasi tai muistiasi?"
        },
        eristyksissä: {
            label: "Eristyneisyys",
            icon: UserX,
            description: "Tunne ulkopuolisuudesta tai sosiaalisesta hyljeksinnästä."
        },
        fyysiset: {
            label: "Fyysiset oireet",
            icon: Brain,
            description: "Kehon reaktiot henkiseen paineeseen (uni, vatsa, sydän)."
        },
        käyttäytyminen: {
            label: "Käyttäytymisen muutos",
            icon: TrendingUp,
            description: "Miten tilanne vaikuttaa elämääsi työn ulkopuolella."
        }
    };

    if (!hasStarted && activeTab === "quiz") {
        return (
            <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
                <section className="text-center space-y-6">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 text-sm py-1 px-4 mb-2">
                        Syväanalyysi
                    </Badge>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-normal text-slate-900 uppercase leading-[0.9]">
                        Tunnista <br />
                        <span className="text-primary italic">näkymätön</span> väkivalta
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                        Henkinen kiusaaminen on hienovaraisempaa ja usein tuhoisampaa kuin fyysinen.
                        Tämä testi auttaa sinua nimeämään kokemuksesi.
                    </p>
                </section>

                <Tabs defaultValue="quiz" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 h-12 bg-slate-100 p-1 rounded-full">
                        <TabsTrigger value="quiz" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Pikatesti</TabsTrigger>
                        <TabsTrigger value="tactics" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Taktiikkapankki</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="grid gap-4">
                    <Card className="border-none shadow-sm bg-slate-50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                                <Search className="w-5 h-5 text-primary" /> Miksi tämä on tärkeää?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { icon: "🛡️", title: "Validointi", text: "Vahvistaa itsellesi, että et kuvittele asioita." },
                                    { icon: "📝", title: "Nimeäminen", text: "Opi oikeat termit, kuten gaslighting tai sabotaasi." },
                                    { icon: "🛑", title: "Rajojen veto", text: "Tunnista, missä normaali stressi loppuu ja kiusaaminen alkaa." },
                                    { icon: "⚖️", title: "Oikeusturva", text: "Ensimmäinen askel kohti virallista dokumentointia." }
                                ].map((item, i) => (
                                    <li key={i} className="bg-white p-4 rounded-2xl border border-slate-100 space-y-2 shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="font-bold text-slate-900">{item.title}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-tight">{item.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-center">
                    <Button
                        size="lg"
                        onClick={() => setHasStarted(true)}
                        className="rounded-full px-12 py-8 text-xl font-black uppercase tracking-widest bg-primary hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 gap-3"
                    >
                        Aloita analyysi <ArrowRight className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        );
    }

    if (activeTab === "tactics") {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
                <section className="text-center space-y-4">
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
                        Taktiikka<span className="text-primary italic">pankki</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Kiusaajilla on usein toistuvat strategiat. Kun tunnistat taktiikan,
                        se menettää osan vallastaan sinuun.
                    </p>
                </section>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bullyingTactics.map((tactic) => (
                        <Card
                            key={tactic.id}
                            className={`cursor-pointer transition-all hover:border-primary/50 group ${selectedTactic?.id === tactic.id ? 'border-primary ring-2 ring-primary/20' : ''}`}
                            onClick={() => setSelectedTactic(tactic)}
                        >
                            <CardHeader className="p-5">
                                <CardTitle className="text-lg font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                                    {tactic.name}
                                </CardTitle>
                                <CardDescription className="line-clamp-2 text-xs">
                                    {tactic.definition}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <Dialog open={!!selectedTactic} onOpenChange={(open: boolean) => !open && setSelectedTactic(null)}>
                    <DialogContent className="max-w-2xl p-0 overflow-hidden border-none bg-slate-900 text-white rounded-[2rem]">
                        {selectedTactic && (
                            <div className="flex flex-col">
                                <DialogHeader className="bg-primary text-white p-6 sm:p-8 space-y-0">
                                    <Badge className="bg-white/20 text-white mb-2 uppercase font-black text-[10px] w-fit">Taktinen analyysi</Badge>
                                    <DialogTitle className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none">{selectedTactic.name}</DialogTitle>
                                    <DialogDescription className="hidden">Taktinen analyysi valitusta kiusaamisen muodosta.</DialogDescription>
                                </DialogHeader>
                                <CardContent className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                    <section className="space-y-3">
                                        <h4 className="text-primary font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                            <Info className="w-4 h-4" /> Määritelmä
                                        </h4>
                                        <p className="text-lg font-light leading-relaxed">{selectedTactic.definition}</p>
                                    </section>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <section className="space-y-4">
                                            <h4 className="text-primary font-black uppercase tracking-widest text-xs">Klassiset lauseet</h4>
                                            <ul className="space-y-2">
                                                {selectedTactic.phrases.map((phrase, i) => (
                                                    <li key={i} className="bg-white/5 p-3 rounded-xl border border-white/10 italic text-sm text-white/80">
                                                        &quot;{phrase}&quot;
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                        <section className="space-y-4">
                                            <h4 className="text-primary font-black uppercase tracking-widest text-xs">Vastastrategia</h4>
                                            <ul className="space-y-3">
                                                {selectedTactic.strategy.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    </div>

                                    <section className="bg-white/10 p-6 rounded-2xl border border-white/20 space-y-3">
                                        <h4 className="text-primary font-black uppercase tracking-widest text-xs">Kirjaa näin:</h4>
                                        <p className="font-mono text-sm leading-relaxed opacity-80">{selectedTactic.logExample}</p>
                                    </section>
                                </CardContent>
                                <CardFooter className="p-6 bg-white/5 border-t border-white/10 flex justify-end">
                                    <Button variant="ghost" className="text-white hover:bg-white/10 uppercase font-black tracking-widest text-xs" onClick={() => setSelectedTactic(null)}>
                                        Sulje analyysi
                                    </Button>
                                </CardFooter>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                <div className="pt-8 text-center">
                    <Button variant="outline" onClick={() => setActiveTab("quiz")} className="rounded-full px-8 py-6 uppercase font-black tracking-widest gap-2">
                        Palaa testiin <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
                <Card className="border-none shadow-2xl overflow-hidden rounded-[2.5rem]">
                    <CardHeader className={`${risk.level.includes('Kriittinen') || risk.level.includes('Vakava') ? 'bg-red-50' : 'bg-slate-50'} p-8 border-b`}>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="space-y-2 text-center md:text-left">
                                <Badge className={`${risk.level.includes('Kriittinen') ? 'bg-red-600' : 'bg-primary'} text-white uppercase font-black px-4 py-1`}>Analyysi valmis</Badge>
                                <CardTitle className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
                                    Tuloksesi: <span className={risk.color}>{risk.level}</span>
                                </CardTitle>
                            </div>
                            <div className="bg-white shadow-xl rounded-full w-24 h-24 flex items-center justify-center border-4 border-slate-100">
                                <span className="text-3xl font-black text-slate-900">{score}<span className="text-sm opacity-30">/25</span></span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-8 space-y-12">
                        <section className="bg-slate-900 text-white p-6 rounded-2xl space-y-3 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <AlertTriangle className="w-32 h-32" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight relative z-10 flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-primary" /> Mitä tämä tarkoittaa?
                            </h3>
                            <p className="text-lg font-light leading-relaxed opacity-90 relative z-10">{risk.description}</p>
                            <p className="text-sm opacity-60 italic relative z-10">&quot;Tämä ei ole normaalia työstressiä. Tämä ei ole sinun vikasi.&quot;</p>
                        </section>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-black uppercase tracking-tighter">Vahvimmat signaalit</h3>
                            <div className="grid gap-4">
                                {(Object.entries(categoryScores) as [QuizCategory, { score: number; total: number }][])
                                    .sort((a, b) => b[1].score - a[1].score)
                                    .map(([key, data]) => (
                                        <div key={key} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center gap-6">
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${data.score > data.total / 2 ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'}`}>
                                                <div className="w-8 h-8">
                                                    {(() => {
                                                        const Icon = categoryLabels[key].icon;
                                                        return <Icon className="w-full h-full" />;
                                                    })()}
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-1 text-center md:text-left">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className="font-black uppercase tracking-tight text-slate-900">{categoryLabels[key].label}</h4>
                                                    <span className={`font-black text-sm px-2 py-0.5 rounded-full ${data.score > data.total / 2 ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                                        {data.score}/{data.total}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-500 font-light">{categoryLabels[key].description}</p>
                                                <Progress
                                                    value={(data.score / data.total) * 100}
                                                    className={`h-2 mt-2 ${data.score > data.total / 2 ? 'bg-red-100' : 'bg-slate-200'}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <section className="space-y-6">
                            <div className="p-8 bg-primary/5 rounded-[2rem] border-2 border-primary/10 space-y-6">
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-primary flex items-center gap-3">
                                    <ShieldCheck className="w-8 h-8" /> Suositellut jatkoaskeleet
                                </h3>
                                <ul className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { title: "Aloita dokumentointi", text: "Kirjaa ylös jokainen muistamasi tapahtuma Suojasiiven päiväkirjaan.", link: "/timeline" },
                                        { title: "Ota yhteyttä ammattiliittoon", text: "Älä jää yksin. Liittosi juristit ja asiantuntijat osaavat auttaa.", link: "/tuki" },
                                        { title: "Käy työterveydessä", text: "Henkinen kiusaaminen on traumaattista. Pyydä aikainen tuki.", link: "/tuki" },
                                        { title: "Lue taktiikoista", text: "Tutustu gaslightingiin ja muihin manipulaatiokeinoihin.", action: () => { setActiveTab("tactics"); setHasStarted(false); } }
                                    ].map((item, i) => (
                                        <li key={i} className="bg-white p-5 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all flex flex-col justify-between shadow-sm">
                                            <div className="space-y-2">
                                                <h4 className="font-bold text-slate-900">{item.title}</h4>
                                                <p className="text-xs text-slate-500 leading-relaxed">{item.text}</p>
                                            </div>
                                            {item.link ? (
                                                <Link href={item.link} className="mt-4">
                                                    <Button variant="ghost" size="sm" className="w-full text-xs font-black uppercase tracking-widest text-primary gap-1 p-0 justify-start hover:bg-transparent">
                                                        Toimi nyt <ChevronRight className="w-3 h-3" />
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="mt-4 w-full text-xs font-black uppercase tracking-widest text-primary gap-1 p-0 justify-start hover:bg-transparent"
                                                    onClick={item.action}
                                                >
                                                    Lue lisää <ChevronRight className="w-3 h-3" />
                                                </Button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </CardContent>

                    <CardFooter className="p-8 border-t bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between">
                        <Button variant="ghost" onClick={resetQuiz} className="uppercase font-black tracking-widest gap-2">
                            <RotateCcw className="w-4 h-4" /> Aloita alusta
                        </Button>
                        <Link href="/timeline">
                            <Button className="rounded-full px-10 py-6 uppercase font-black tracking-widest shadow-xl shadow-primary/30">
                                Kirjaa tapahtumia <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <Badge className="bg-slate-100 text-slate-500 uppercase font-black text-[10px] py-0">{categoryLabels[currentQuestion.category].label}</Badge>
                        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Kysymys {currentIndex + 1} / {quizQuestions.length}</div>
                    </div>
                    <div className="text-2xl font-black text-primary">{Math.round(progress)}%</div>
                </div>
                <Progress value={progress} className="h-4 rounded-full bg-slate-100" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card className="min-h-[300px] flex flex-col justify-center items-center text-center p-8 md:p-12 rounded-[3.5rem] border-2 shadow-2xl bg-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary/20" />

                        <CardHeader className="p-0 mb-10">
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary">
                                    {(() => {
                                        const Icon = categoryLabels[currentQuestion.category].icon;
                                        return <Icon className="w-10 h-10" />;
                                    })()}
                                </div>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight text-slate-900">
                                {currentQuestion.text}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="flex flex-col sm:flex-row gap-6 w-full max-w-sm pt-0">
                            <Button
                                size="lg"
                                className="flex-1 py-10 rounded-[2rem] text-2xl font-black uppercase tracking-widest bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
                                onClick={() => handleAnswer(true)}
                            >
                                Kyllä
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="flex-1 py-10 rounded-[2rem] text-2xl font-black uppercase tracking-widest border-2 hover:bg-slate-50 active:scale-95 transition-all text-slate-400 border-slate-200"
                                onClick={() => handleAnswer(false)}
                            >
                                Ei
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>

            <div className="text-center text-slate-400 text-sm font-light italic">
                &quot;Vastaa mahdollisimman rehellisesti tunteesi pohjalta.&quot;
            </div>
        </div>
    );
}
