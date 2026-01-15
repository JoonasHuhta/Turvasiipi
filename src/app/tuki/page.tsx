"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Phone, Wind, HeartHandshake, AlertTriangle, BookOpen, Scale, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

export default function SupportPage() {
    const { t } = useLanguage();

    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-16">

            <div className="space-y-6 text-center max-w-2xl mx-auto">
                <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border border-[#5B4B8A] px-3 py-1 rounded-sm inline-block">
                    {t('support.hero.badge')}
                </span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B] leading-tight text-balance">
                    {t('support.hero.title')}
                </h1>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                    {t('support.hero.subtitle')}
                </p>
            </div>

            <Tabs defaultValue="plan" className="w-full">
                <TabsList className="flex flex-col sm:flex-row w-full sm:w-auto bg-transparent border-b border-[#E8DDD0] p-0 mb-12 gap-6 sm:gap-12 justify-center h-auto">
                    <TabsTrigger value="plan" className="px-0 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#5B4B8A] data-[state=active]:text-[#5B4B8A] text-[#4A4A4A] font-bold uppercase tracking-widest text-xs bg-transparent shadow-none transition-all hover:text-[#2B2B2B]">
                        {t('support.tabs.plan')}
                    </TabsTrigger>
                    <TabsTrigger value="exercises" className="px-0 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#5B4B8A] data-[state=active]:text-[#5B4B8A] text-[#4A4A4A] font-bold uppercase tracking-widest text-xs bg-transparent shadow-none transition-all hover:text-[#2B2B2B]">
                        {t('support.tabs.exercises')}
                    </TabsTrigger>
                    <TabsTrigger value="contacts" className="px-0 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#5B4B8A] data-[state=active]:text-[#5B4B8A] text-[#4A4A4A] font-bold uppercase tracking-widest text-xs bg-transparent shadow-none transition-all hover:text-[#2B2B2B]">
                        {t('support.tabs.contacts')}
                    </TabsTrigger>
                </TabsList>

                {/* --- TAB 1: ACTION PLAN --- */}
                <TabsContent value="plan" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* PHASE 1 */}
                    <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm hover:border-[#5B4B8A] transition-colors group">
                        <div className="flex items-center gap-2 text-[#5B4B8A] font-bold text-xs uppercase tracking-widest mb-4">
                            <AlertTriangle className="w-4 h-4" /> {t('support.plan_tab.phase1.label')}
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-[#2B2B2B] mb-2">{t('support.plan_tab.phase1.title')}</h3>
                        <p className="text-[#4A4A4A] mb-8 leading-relaxed max-w-2xl">{t('support.plan_tab.phase1.description')}</p>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="p1-1" className="border-[#E8DDD0]">
                                <AccordionTrigger className="text-[#2B2B2B] hover:text-[#5B4B8A] font-bold text-left">{t('support.plan_tab.phase1.steps.step1.trigger')}</AccordionTrigger>
                                <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-4">
                                    {t('support.plan_tab.phase1.steps.step1.content')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="p1-2" className="border-[#E8DDD0]">
                                <AccordionTrigger className="text-[#5B4B8A] font-bold text-left">{t('support.plan_tab.phase1.steps.step2.trigger')}</AccordionTrigger>
                                <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-4">
                                    {t('support.plan_tab.phase1.steps.step2.content')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="p1-3" className="border-none">
                                <AccordionTrigger className="text-[#2B2B2B] hover:text-[#5B4B8A] font-bold text-left">{t('support.plan_tab.phase1.steps.step3.trigger')}</AccordionTrigger>
                                <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-4">
                                    {t('support.plan_tab.phase1.steps.step3.content')}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* PHASE 2 */}
                    <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm hover:border-[#5B4B8A] transition-colors group">
                        <div className="flex items-center gap-2 text-[#2B2B2B] font-bold text-xs uppercase tracking-widest mb-4">
                            <AlertTriangle className="w-4 h-4" /> {t('support.plan_tab.phase2.label')}
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-[#2B2B2B] mb-2">{t('support.plan_tab.phase2.title')}</h3>
                        <p className="text-[#4A4A4A] mb-8 leading-relaxed max-w-2xl">{t('support.plan_tab.phase2.description')}</p>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="p2-1" className="border-[#E8DDD0]">
                                <AccordionTrigger className="text-[#2B2B2B] hover:text-[#5B4B8A] font-bold text-left">{t('support.plan_tab.phase2.steps.step1.trigger')}</AccordionTrigger>
                                <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-4">
                                    {t('support.plan_tab.phase2.steps.step1.content')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="p2-2" className="border-[#E8DDD0]">
                                <AccordionTrigger className="text-[#2B2B2B] hover:text-[#5B4B8A] font-bold text-left">{t('support.plan_tab.phase2.steps.step2.trigger')}</AccordionTrigger>
                                <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-4">
                                    {t('support.plan_tab.phase2.steps.step2.content')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="p2-3" className="border-none">
                                <AccordionTrigger className="text-[#2B2B2B] hover:text-[#5B4B8A] font-bold text-left">{t('support.plan_tab.phase2.steps.step3.trigger')}</AccordionTrigger>
                                <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-4">
                                    {t('support.plan_tab.phase2.steps.step3.content')}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* PHASE 3 */}
                    <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm hover:border-[#5B4B8A] transition-colors group">
                        <div className="flex items-center gap-2 text-[#2B2B2B] font-bold text-xs uppercase tracking-widest mb-4">
                            <HeartHandshake className="w-4 h-4" /> {t('support.plan_tab.phase3.label')}
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-[#2B2B2B] mb-2">{t('support.plan_tab.phase3.title')}</h3>
                        <p className="text-[#4A4A4A] mb-8 leading-relaxed max-w-2xl">{t('support.plan_tab.phase3.description')}</p>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="p3-1" className="border-[#E8DDD0]">
                                <AccordionTrigger className="text-[#2B2B2B] hover:text-[#5B4B8A] font-bold text-left">{t('support.plan_tab.phase3.steps.step1.trigger')}</AccordionTrigger>
                                <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-4">
                                    {t('support.plan_tab.phase3.steps.step1.content')}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="p3-2" className="border-none">
                                <AccordionTrigger className="text-[#2B2B2B] hover:text-[#5B4B8A] font-bold text-left">{t('support.plan_tab.phase3.steps.step2.trigger')}</AccordionTrigger>
                                <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-4">
                                    {t('support.plan_tab.phase3.steps.step2.content')}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </TabsContent>

                {/* --- TAB 2: EXERCISES --- */}
                <TabsContent value="exercises" className="grid gap-8 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* BREATHING */}
                    <div className="md:col-span-2 bg-[#FDFBF7] border border-[#E8DDD0] p-8 rounded-sm">
                        <div className="flex items-center gap-2 text-[#5B4B8A] font-bold text-xs uppercase tracking-widest mb-4">
                            <Wind className="w-4 h-4" /> {t('support.exercises_tab.breathing.title')}
                        </div>
                        <p className="text-[#4A4A4A] mb-8 max-w-xl">{t('support.exercises_tab.breathing.description')}</p>
                        <BreathingExercise555 />
                    </div>

                    {/* GROUNDING */}
                    <div className="bg-white border border-[#E8DDD0] p-6 rounded-sm">
                        <h3 className="font-serif font-bold text-xl text-[#2B2B2B] mb-2">{t('support.exercises_tab.grounding.title')}</h3>
                        <p className="text-sm text-[#4A4A4A] mb-6">{t('support.exercises_tab.grounding.description')}</p>
                        <ul className="space-y-4 text-sm text-[#2B2B2B]">
                            <li className="flex items-center gap-3"><span className="font-mono font-bold text-[#5B4B8A]">5</span> {t('support.exercises_tab.grounding.items.see')}</li>
                            <li className="flex items-center gap-3"><span className="font-mono font-bold text-[#5B4B8A]">4</span> {t('support.exercises_tab.grounding.items.touch')}</li>
                            <li className="flex items-center gap-3"><span className="font-mono font-bold text-[#5B4B8A]">3</span> {t('support.exercises_tab.grounding.items.hear')}</li>
                            <li className="flex items-center gap-3"><span className="font-mono font-bold text-[#5B4B8A]">2</span> {t('support.exercises_tab.grounding.items.smell')}</li>
                            <li className="flex items-center gap-3"><span className="font-mono font-bold text-[#5B4B8A]">1</span> {t('support.exercises_tab.grounding.items.taste')}</li>
                        </ul>
                    </div>

                    {/* BOUNDARIES */}
                    <div className="bg-white border border-[#E8DDD0] p-6 rounded-sm">
                        <h3 className="font-serif font-bold text-xl text-[#2B2B2B] mb-2">{t('support.exercises_tab.boundaries.title')}</h3>
                        <p className="text-sm text-[#4A4A4A] mb-6">{t('support.exercises_tab.boundaries.description')}</p>
                        <div className="space-y-3">
                            <QuoteBox>{t('support.exercises_tab.boundaries.quotes.not_accept')}</QuoteBox>
                            <QuoteBox>{t('support.exercises_tab.boundaries.quotes.speak_properly')}</QuoteBox>
                            <QuoteBox>{t('support.exercises_tab.boundaries.quotes.not_continue')}</QuoteBox>
                        </div>
                    </div>

                    {/* DARVO */}
                    <div className="md:col-span-2 bg-white border border-[#E8DDD0] p-8 rounded-sm">
                        <div className="flex items-center gap-2 text-[#2B2B2B] font-bold text-xs uppercase tracking-widest mb-4">
                            <Shield className="w-4 h-4" /> {t('support.exercises_tab.darvo.title')}
                        </div>
                        <p className="text-[#4A4A4A] mb-8">{t('support.exercises_tab.darvo.description')}</p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-[#FAFAFA] p-6 border border-[#E8DDD0] rounded-sm">
                                <h4 className="font-bold text-[#2B2B2B] mb-2 uppercase tracking-wide text-xs">{t('support.exercises_tab.darvo.attack')}</h4>
                                <p className="italic text-[#4A4A4A] leading-relaxed">"{t('support.exercises_tab.darvo.attack_text')}"</p>
                            </div>
                            <div className="bg-[#FDFBF7] p-6 border border-[#5B4B8A] rounded-sm">
                                <h4 className="font-bold text-[#5B4B8A] mb-2 uppercase tracking-wide text-xs">{t('support.exercises_tab.darvo.response')}</h4>
                                <p className="font-bold text-[#2B2B2B] leading-relaxed">"{t('support.exercises_tab.darvo.response_text')}"</p>
                            </div>
                        </div>
                    </div>
                </TabsContent>


                {/* --- TAB 3: CONTACT INFO --- */}
                <TabsContent value="contacts" className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm hover:border-[#5B4B8A] transition-colors group">
                        <div className="flex items-center gap-2 text-[#5B4B8A] font-bold text-xs uppercase tracking-widest mb-4">
                            <Phone className="w-4 h-4" /> {t('support.contacts_tab.acute.title')}
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-serif font-bold text-xl text-[#2B2B2B] mb-1">{t('support.contacts_tab.acute.mieli.title')}</h3>
                                <div className="text-3xl font-bold text-[#2B2B2B] font-mono tracking-tight group-hover:text-[#5B4B8A] transition-colors">09 2525 0111</div>
                                <p className="text-sm text-[#4A4A4A] mt-2">{t('support.contacts_tab.acute.mieli.hours')}</p>
                            </div>
                            <div className="pt-8 border-t border-[#FAFAFA]">
                                <h3 className="font-serif font-bold text-xl text-[#2B2B2B] mb-1">{t('support.contacts_tab.acute.riku.title')}</h3>
                                <div className="text-3xl font-bold text-[#2B2B2B] font-mono tracking-tight group-hover:text-[#5B4B8A] transition-colors">116 006</div>
                                <p className="text-sm text-[#4A4A4A] mt-2">{t('support.contacts_tab.acute.riku.text')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm hover:border-[#5B4B8A] transition-colors">
                        <div className="flex items-center gap-2 text-[#2B2B2B] font-bold text-xs uppercase tracking-widest mb-4">
                            <Scale className="w-4 h-4" /> {t('support.contacts_tab.authorities.title')}
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold text-[#2B2B2B] mb-1">{t('support.contacts_tab.authorities.avi.label')}</h3>
                                <p className="text-sm text-[#4A4A4A] mb-2 leading-relaxed">{t('support.contacts_tab.authorities.avi.sub')}</p>
                                <a href="https://avi.fi" target="_blank" rel="noopener noreferrer" className="text-[#5B4B8A] text-sm font-bold hover:underline flex items-center gap-1">
                                    Siirry sivustolle <ArrowRight className="w-3 h-3" />
                                </a>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#2B2B2B] mb-1">{t('support.contacts_tab.authorities.unions.label')}</h3>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{t('support.contacts_tab.authorities.unions.sub')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm hover:border-[#5B4B8A] transition-colors">
                        <div className="flex items-center gap-2 text-[#2B2B2B] font-bold text-xs uppercase tracking-widest mb-4">
                            <Users className="w-4 h-4" /> {t('support.contacts_tab.peer_support.title')}
                        </div>
                        <div className="space-y-4">
                            <a href="#" className="flex items-center gap-3 text-[#4A4A4A] hover:text-[#5B4B8A] hover:underline font-medium p-2 hover:bg-[#FAFAFA] rounded-sm transition-all">
                                <Users className="w-4 h-4" /> {t('support.contacts_tab.peer_support.items.fb')}
                            </a>
                            <a href="https://mieli.fi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#4A4A4A] hover:text-[#5B4B8A] hover:underline font-medium p-2 hover:bg-[#FAFAFA] rounded-sm transition-all">
                                <HeartHandshake className="w-4 h-4" /> {t('support.contacts_tab.peer_support.items.mieli')}
                            </a>
                            <a href="https://discord.gg/2pwqw8Rhtu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#4A4A4A] hover:text-[#5B4B8A] hover:underline font-medium p-2 hover:bg-[#FAFAFA] rounded-sm transition-all">
                                <div className="w-4 h-4 flex items-center justify-center font-bold text-[10px]">D</div> {t('support.contacts_tab.peer_support.items.discord')}
                            </a>
                        </div>
                    </div>

                    <div className="bg-[#2B2B2B] text-white p-8 rounded-sm">
                        <div className="flex items-center gap-2 text-white/70 font-bold text-xs uppercase tracking-widest mb-4">
                            <BookOpen className="w-4 h-4" /> {t('support.contacts_tab.knowledge.title')}
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-white text-lg mb-1">{t('support.contacts_tab.knowledge.ttl.label')}</h3>
                                <p className="text-sm text-white/60 mb-1">{t('support.contacts_tab.knowledge.ttl.sub')}</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg mb-1">{t('support.contacts_tab.knowledge.ttk.label')}</h3>
                                <p className="text-sm text-white/60 mb-1">{t('support.contacts_tab.knowledge.ttk.sub')}</p>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="text-center pt-12 border-t border-[#E8DDD0]">
                <p className="text-[#2B2B2B] font-serif font-bold text-lg">
                    {t('support.footer.remember')}
                </p>
                <p className="text-[#4A4A4A] text-xs mt-2 uppercase tracking-wide">
                    {t('support.footer.disclaimer')}
                </p>
            </div>
        </div>
    );
}

// --- SUBCOMPONENTS ---

function QuoteBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#FAFAFA] px-4 py-3 border-l-2 border-[#5B4B8A] text-[#2B2B2B] italic text-sm">
            "{children}"
        </div>
    );
}

function BreathingExercise555() {
    const { t } = useLanguage();
    const [status, setStatus] = useState(t('support.exercises_tab.breathing.start'));
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const phases = [
            { text: t('support.exercises_tab.breathing.phases.inhale'), duration: 5000 },
            { text: t('support.exercises_tab.breathing.phases.hold'), duration: 5000 },
            { text: t('support.exercises_tab.breathing.phases.exhale'), duration: 5000 },
        ];

        let phaseIndex = 0;

        const runPhase = () => {
            if (!isRunning) return;
            setStatus(phases[phaseIndex].text);
            phaseIndex = (phaseIndex + 1) % phases.length;
        };

        runPhase();
        const interval = setInterval(runPhase, 5000);

        return () => clearInterval(interval);
    }, [isRunning, t]);

    return (
        <div className="flex flex-col items-center justify-center py-8 gap-8">
            <div className="relative flex items-center justify-center h-48 w-48">
                <motion.div
                    animate={isRunning ? {
                        scale: [1, 1.3, 1.3, 1, 1],
                        opacity: [0.3, 0.6, 0.6, 0.3, 0.3],
                    } : { scale: 1, opacity: 0.1 }}
                    transition={isRunning ? {
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.33, 0.66, 1]
                    } : {}}
                    className="w-full h-full rounded-full bg-[#5B4B8A] absolute blur-3xl"
                />
                <motion.div
                    animate={isRunning ? {
                        scale: [1, 1.1, 1.1, 1, 1],
                    } : { scale: 1 }}
                    transition={isRunning ? {
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.33, 0.66, 1]
                    } : {}}
                    className="w-32 h-32 rounded-full border border-[#5B4B8A] bg-white flex items-center justify-center relative z-10 shadow-sm"
                >
                    <span className="font-bold text-[#5B4B8A] uppercase tracking-widest text-xs text-center px-2">{status}</span>
                </motion.div>
            </div>

            <Button
                onClick={() => {
                    setIsRunning(!isRunning);
                    if (isRunning) setStatus(t('support.exercises_tab.breathing.start'));
                }}
                variant={isRunning ? "outline" : "default"}
                size="lg"
                className={`rounded-full px-8 uppercase font-bold tracking-widest text-xs transition-all ${isRunning
                        ? "border-[#E8DDD0] text-[#4A4A4A] hover:bg-[#FAFAFA]"
                        : "bg-[#2B2B2B] text-white hover:bg-[#4A4A4A]"
                    }`}
            >
                {isRunning ? t('support.exercises_tab.breathing.stop') : t('support.exercises_tab.breathing.start_exercise')}
            </Button>
        </div>
    );
}
