"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { bullyingTactics, Tactic, TacticCategory } from "@/data/tactics";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    Zap,
    Info,
    TrendingUp,
    Activity,
    Quote,
    ShieldCheck,
    CheckCircle2,
    ArrowRight,
    BookOpen,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

export default function TacticsPage() {
    const { t } = useLanguage();
    const [selectedTactic, setSelectedTactic] = useState<Tactic | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const tacticScrollRef = useRef<HTMLDivElement>(null);

    // Image carousel data
    const carouselImages = [
        {
            src: "/images/tactics/social-isolation.png",
            alt: "Sosiaalinen eristäminen - uhri leikataan pois yhteisöstä",
            caption: "Yksi yleisimmistä kiusaamisen muodoista on sosiaalinen eristäminen – uhri leikataan pois yhteisöstä."
        },
        {
            src: "/images/tactics/manipulation.png",
            alt: "Manipulaatio - kädet solmussa",
            caption: "Manipulaatio ja gaslighting ovat hienovaraisia mutta erittäin vahingollisia taktiikoita."
        },
        {
            src: "/images/tactics/mockery.png",
            alt: "Pilkkaaminen ja nöyryyttäminen",
            caption: "Verbaalinen kiusaaminen ja pilkkaaminen voi olla yhtä vahingollista kuin fyysinen väkivalta."
        }
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    // Reset tactic modal scroll when opening
    const handleTacticOpenChange = (open: boolean) => {
        if (!open) {
            setSelectedTactic(null);
        } else if (open) {
            setTimeout(() => {
                if (tacticScrollRef.current) {
                    tacticScrollRef.current.scrollTop = 0;
                }
            }, 50);
        }
    };

    // Secondary reset when selectedTactic changes
    useEffect(() => {
        if (selectedTactic) {
            setTimeout(() => {
                if (tacticScrollRef.current) {
                    tacticScrollRef.current.scrollTop = 0;
                }
            }, 50);
        }
    }, [selectedTactic]);

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-4 duration-700 pb-20">
                <section className="text-center space-y-4">
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
                        {t('quiz.tactics_page.title_start')} <span className="text-primary italic">{t('quiz.tactics_page.title_highlight')}</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                        {t('quiz.tactics_page.description')}
                    </p>
                </section>

                {/* Image Carousel */}
                <Card className="bg-gradient-to-br from-indigo-50 to-slate-50 border-indigo-100 overflow-hidden">
                    <CardContent className="p-0">
                        <div className="relative group">
                            {/* Navigation Overlay - Placed outside image container to ensure visibility */}
                            {carouselImages.length > 1 && (
                                <div className="absolute top-0 left-0 right-0 aspect-video md:aspect-[21/9] z-20 flex items-center justify-between px-2 md:px-4 pointer-events-none">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={prevImage}
                                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-900/90 hover:bg-slate-800 shadow-2xl transition-all border-2 border-white pointer-events-auto cursor-pointer"
                                        aria-label="Edellinen kuva"
                                    >
                                        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={nextImage}
                                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-900/90 hover:bg-slate-800 shadow-2xl transition-all border-2 border-white pointer-events-auto cursor-pointer"
                                        aria-label="Seuraava kuva"
                                    >
                                        <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
                                    </Button>
                                </div>
                            )}

                            {/* Main Image */}
                            <div className="relative aspect-video md:aspect-[21/9] bg-white flex items-center justify-center overflow-hidden">
                                <motion.img
                                    key={currentImageIndex}
                                    src={carouselImages[currentImageIndex].src}
                                    alt={carouselImages[currentImageIndex].alt}
                                    className="w-full h-full object-contain p-8 md:p-12 relative z-0"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            {/* Caption and Indicators */}
                            <div className="bg-white border-t border-indigo-100 p-6">
                                <p className="text-center text-sm text-slate-600 font-medium italic mb-4">
                                    {carouselImages[currentImageIndex].caption}
                                </p>

                                {/* Indicators */}
                                {carouselImages.length > 1 && (
                                    <div className="flex justify-center gap-2">
                                        {carouselImages.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={cn(
                                                    "w-2 h-2 rounded-full transition-all",
                                                    index === currentImageIndex
                                                        ? "bg-indigo-600 w-8"
                                                        : "bg-slate-300 hover:bg-slate-400"
                                                )}
                                                aria-label={`Siirry kuvaan ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-indigo-950 text-white border-none overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                        <div className="space-y-2 text-center md:text-left">
                            <Badge className="bg-indigo-500 text-white border-none uppercase font-black text-[10px] mb-2">Uutta</Badge>
                            <h3 className="text-2xl font-black uppercase tracking-tight">Valmennusmoduuli</h3>
                            <p className="text-indigo-200 font-light text-sm max-w-md">
                                Testaa taitosi skenaarioiden avulla. Opi tunnistamaan "näkymätön väkivalta" ja hienovaraiset taktiikat.
                            </p>
                        </div>
                        <Link href="/valmennus">
                            <Button className="bg-white text-indigo-950 hover:bg-indigo-50 rounded-full px-8 h-12 uppercase font-black tracking-widest text-xs shadow-xl shadow-indigo-950/20">
                                Aloita valmennus <Zap className="w-4 h-4 ml-2 fill-indigo-500 text-indigo-500" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <div className="space-y-12 pb-20">
                    {(['verbal', 'social', 'passive', 'power', 'manipulative', 'structural'] as TacticCategory[]).map((catId) => {
                        const tacticsInCategory = bullyingTactics.filter(t => t.category === catId);
                        if (tacticsInCategory.length === 0) return null;

                        return (
                            <div key={catId} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-1px flex-1 bg-slate-200" />
                                    <h3 className="text-xl font-black uppercase tracking-widest text-slate-400">
                                        {t(`quiz.tactic_categories.${catId}`)}
                                    </h3>
                                    <div className="h-1px flex-1 bg-slate-200" />
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {tacticsInCategory.map((tactic) => (
                                        <Card
                                            key={tactic.id}
                                            className={`cursor-pointer transition-all hover:border-primary/50 group hover:shadow-lg rounded-2xl overflow-hidden ${selectedTactic?.id === tactic.id ? 'border-primary ring-2 ring-primary/20' : ''}`}
                                            onClick={() => setSelectedTactic(tactic)}
                                        >
                                            <CardHeader className="p-5">
                                                <CardTitle className="text-lg font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                                                    {t(`quiz.tactics.${tactic.id}.name`)}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-2 text-xs">
                                                    {t(`quiz.tactics.${tactic.id}.definition`)}
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Dialog open={!!selectedTactic} onOpenChange={handleTacticOpenChange}>
                    <DialogContent className="max-w-3xl p-0 overflow-hidden border-none bg-white text-slate-900 rounded-[2rem] shadow-2xl">
                        {selectedTactic && (
                            <div className="flex flex-col max-h-[90vh]">
                                <DialogHeader className="bg-slate-900 text-white p-6 sm:p-10 pb-12 sm:pb-20 space-y-0 text-left relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                        <Zap className="w-48 h-48" />
                                    </div>
                                    <DialogTitle className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight relative z-10 break-words max-w-full">
                                        {t(`quiz.tactics.${selectedTactic.id}.name`)}
                                    </DialogTitle>
                                    <DialogDescription className="hidden">Taktinen analyysi</DialogDescription>
                                </DialogHeader>

                                <div ref={tacticScrollRef} className="p-4 sm:p-8 space-y-10 overflow-y-auto overflow-x-hidden custom-scrollbar bg-slate-50/50">
                                    {/* Enrichment: Definition & Goal */}
                                    <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                                    <Info className="w-4 h-4 text-primary" /> {t('quiz.tactics_page.modal.definition')}
                                                </h4>
                                                <p className="text-slate-700 leading-relaxed font-medium">
                                                    {t(`quiz.tactics.${selectedTactic.id}.definition`)}
                                                </p>
                                            </div>
                                            <div className="pt-4 border-t border-slate-100 space-y-2">
                                                <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4 text-primary" /> {t('quiz.tactics_page.modal.goal')}
                                                </h4>
                                                <p className="text-slate-700 leading-relaxed font-medium">
                                                    {t(`quiz.tactics.${selectedTactic.id}.goal`)}
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Impact Visualization */}
                                    <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
                                        <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-primary" /> {t('quiz.tactics_page.modal.impact.title')}
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {[
                                                { label: t('quiz.tactics_page.modal.impact.stress'), value: selectedTactic.impact.stress, color: 'bg-rose-500' },
                                                { label: t('quiz.tactics_page.modal.impact.burnout'), value: selectedTactic.impact.burnout, color: 'bg-orange-500' },
                                                { label: t('quiz.tactics_page.modal.impact.selfEsteem'), value: selectedTactic.impact.selfEsteem, color: 'bg-indigo-500' }
                                            ].map((stat, i) => (
                                                <div key={i} className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                                        <span>{stat.label}</span>
                                                        <span>{stat.value}%</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${stat.value}%` }}
                                                            className={cn("h-full rounded-full", stat.color)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        <section className="space-y-4">
                                            <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                                <Quote className="w-4 h-4 text-primary" /> {t('quiz.tactics_page.modal.phrases')}
                                            </h4>
                                            <div className="space-y-2">
                                                {(Array.isArray(t(`quiz.tactics.${selectedTactic.id}.phrases`, { returnObjects: true }))
                                                    ? (t(`quiz.tactics.${selectedTactic.id}.phrases`, { returnObjects: true }) as string[])
                                                    : selectedTactic.phrases).map((phrase, i) => (
                                                        <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 italic text-sm text-slate-600 shadow-sm">
                                                            &quot;{phrase}&quot;
                                                        </div>
                                                    ))}
                                            </div>
                                        </section>

                                        <section className="space-y-4">
                                            <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-primary" /> {t('quiz.tactics_page.modal.strategy')}
                                            </h4>
                                            <div className="space-y-3">
                                                {(Array.isArray(t(`quiz.tactics.${selectedTactic.id}.strategy`, { returnObjects: true }))
                                                    ? (t(`quiz.tactics.${selectedTactic.id}.strategy`, { returnObjects: true }) as string[])
                                                    : selectedTactic.strategy).map((item, i) => (
                                                        <div key={i} className="flex items-start gap-3 text-sm text-slate-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                                            <span className="font-medium">{item}</span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </section>
                                    </div>

                                    {/* Role Based Advice */}
                                    <section className="space-y-6">
                                        <Tabs defaultValue="victim" className="w-full">
                                            <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-2xl h-12">
                                                <TabsTrigger value="victim" className="rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                                    {t('quiz.tactics_page.modal.roles.victim')}
                                                </TabsTrigger>
                                                <TabsTrigger value="witness" className="rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                                    {t('quiz.tactics_page.modal.roles.witness')}
                                                </TabsTrigger>
                                                <TabsTrigger value="manager" className="rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                                    {t('quiz.tactics_page.modal.roles.manager')}
                                                </TabsTrigger>
                                            </TabsList>
                                            {(['victim', 'witness', 'manager'] as const).map((role) => (
                                                <TabsContent key={role} value={role} className="mt-6">
                                                    <div className="bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100 space-y-4">
                                                        <div className="space-y-1">
                                                            <h5 className="font-black uppercase text-indigo-900">{selectedTactic.advice[role].title}</h5>
                                                            <p className="text-sm text-indigo-700 font-medium">{selectedTactic.advice[role].description}</p>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            {selectedTactic.advice[role].actions.map((action, i) => (
                                                                <div key={i} className="flex items-center gap-3 text-xs font-bold text-indigo-950 bg-white/60 p-3 rounded-xl">
                                                                    <ArrowRight className="w-4 h-4 text-indigo-500" />
                                                                    {action}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </TabsContent>
                                            ))}
                                        </Tabs>
                                    </section>

                                    <section className="bg-slate-900 p-8 rounded-[2rem] text-white space-y-3 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                            <BookOpen className="w-20 h-20" />
                                        </div>
                                        <h4 className="text-primary font-black uppercase tracking-widest text-[10px]">{t('quiz.tactics_page.modal.log_instruction')}</h4>
                                        <p className="font-mono text-sm leading-relaxed text-indigo-200">&quot;{t(`quiz.tactics.${selectedTactic.id}.logExample`)}&quot;</p>
                                    </section>
                                </div>

                                <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex justify-center sm:justify-end">
                                    <Button
                                        className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 rounded-full px-10 h-14 uppercase font-black tracking-widest text-xs shadow-xl shadow-slate-900/10 transition-transform active:scale-95"
                                        onClick={() => setSelectedTactic(null)}
                                    >
                                        Sulje analyysi
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
