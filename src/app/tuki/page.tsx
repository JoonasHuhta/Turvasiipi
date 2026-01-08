"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Lock, Server, Mail, HeartHandshake, Phone, Wind, BrainCircuit, Activity, AlertTriangle, BookOpen, Scale, Landmark, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

export default function SupportPage() {
    const { t } = useLanguage();

    return (
        <div className="space-y-8 pb-20 animate-in fade-in max-w-5xl mx-auto pt-8 px-4">

            <div className="text-center space-y-4 mb-8">
                <div className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {t('support.hero.badge')}
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{t('support.hero.title')}</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    {t('support.hero.subtitle')}
                </p>
            </div>

            <Tabs defaultValue="plan" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-slate-100 rounded-2xl mb-8 gap-1">
                    <TabsTrigger value="plan" className="rounded-xl py-3 text-sm md:text-md font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500">
                        {t('support.tabs.plan')}
                    </TabsTrigger>
                    <TabsTrigger value="exercises" className="rounded-xl py-3 text-sm md:text-md font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500">
                        {t('support.tabs.exercises')}
                    </TabsTrigger>
                    <TabsTrigger value="contacts" className="rounded-xl py-3 text-sm md:text-md font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500">
                        {t('support.tabs.contacts')}
                    </TabsTrigger>
                </TabsList>

                {/* --- TAB 1: ACTION PLAN --- */}
                <TabsContent value="plan" className="space-y-6">
                    {/* PHASE 1 */}
                    <Card className="border-l-4 border-l-yellow-400">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-yellow-600 font-bold text-xs uppercase tracking-widest mb-1">
                                <AlertTriangle className="w-4 h-4" /> {t('support.plan_tab.phase1.label')}
                            </div>
                            <CardTitle>{t('support.plan_tab.phase1.title')}</CardTitle>
                            <CardDescription>{t('support.plan_tab.phase1.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="p1-1">
                                    <AccordionTrigger>{t('support.plan_tab.phase1.steps.step1.trigger')}</AccordionTrigger>
                                    <AccordionContent>
                                        {t('support.plan_tab.phase1.steps.step1.content')}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="p1-2">
                                    <AccordionTrigger className="font-bold text-indigo-600">{t('support.plan_tab.phase1.steps.step2.trigger')}</AccordionTrigger>
                                    <AccordionContent>
                                        {t('support.plan_tab.phase1.steps.step2.content')}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="p1-3">
                                    <AccordionTrigger>{t('support.plan_tab.phase1.steps.step3.trigger')}</AccordionTrigger>
                                    <AccordionContent>
                                        {t('support.plan_tab.phase1.steps.step3.content')}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>

                    {/* PHASE 2 */}
                    <Card className="border-l-4 border-l-orange-500">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-1">
                                <AlertTriangle className="w-4 h-4" /> {t('support.plan_tab.phase2.label')}
                            </div>
                            <CardTitle>{t('support.plan_tab.phase2.title')}</CardTitle>
                            <CardDescription>{t('support.plan_tab.phase2.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="p2-1">
                                    <AccordionTrigger>{t('support.plan_tab.phase2.steps.step1.trigger')}</AccordionTrigger>
                                    <AccordionContent>
                                        {t('support.plan_tab.phase2.steps.step1.content')}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="p2-2">
                                    <AccordionTrigger>{t('support.plan_tab.phase2.steps.step2.trigger')}</AccordionTrigger>
                                    <AccordionContent>
                                        {t('support.plan_tab.phase2.steps.step2.content')}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="p2-3">
                                    <AccordionTrigger>{t('support.plan_tab.phase2.steps.step3.trigger')}</AccordionTrigger>
                                    <AccordionContent>
                                        {t('support.plan_tab.phase2.steps.step3.content')}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>

                    {/* PHASE 3 */}
                    <Card className="border-l-4 border-l-emerald-500">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-1">
                                <HeartHandshake className="w-4 h-4" /> {t('support.plan_tab.phase3.label')}
                            </div>
                            <CardTitle>{t('support.plan_tab.phase3.title')}</CardTitle>
                            <CardDescription>{t('support.plan_tab.phase3.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="p3-1">
                                    <AccordionTrigger>{t('support.plan_tab.phase3.steps.step1.trigger')}</AccordionTrigger>
                                    <AccordionContent>
                                        {t('support.plan_tab.phase3.steps.step1.content')}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="p3-2">
                                    <AccordionTrigger>{t('support.plan_tab.phase3.steps.step2.trigger')}</AccordionTrigger>
                                    <AccordionContent>
                                        {t('support.plan_tab.phase3.steps.step2.content')}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- TAB 2: EXERCISES --- */}
                <TabsContent value="exercises" className="grid gap-8 md:grid-cols-2">

                    {/* BREATHING */}
                    <Card className="md:col-span-2 border-indigo-100 bg-indigo-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-indigo-800">
                                <Wind className="w-6 h-6" /> {t('support.exercises_tab.breathing.title')}
                            </CardTitle>
                            <CardDescription>{t('support.exercises_tab.breathing.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <BreathingExercise555 />
                        </CardContent>
                    </Card>

                    {/* GROUNDING */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">{t('support.exercises_tab.grounding.title')}</CardTitle>
                            <CardDescription>{t('support.exercises_tab.grounding.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-slate-700">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3"><span className="text-xl">👀</span> <strong>5</strong> {t('support.exercises_tab.grounding.items.see')}</li>
                                <li className="flex items-center gap-3"><span className="text-xl">✋</span> <strong>4</strong> {t('support.exercises_tab.grounding.items.touch')}</li>
                                <li className="flex items-center gap-3"><span className="text-xl">👂</span> <strong>3</strong> {t('support.exercises_tab.grounding.items.hear')}</li>
                                <li className="flex items-center gap-3"><span className="text-xl">👃</span> <strong>2</strong> {t('support.exercises_tab.grounding.items.smell')}</li>
                                <li className="flex items-center gap-3"><span className="text-xl">👄</span> <strong>1</strong> {t('support.exercises_tab.grounding.items.taste')}</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* BOUNDARIES */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">{t('support.exercises_tab.boundaries.title')}</CardTitle>
                            <CardDescription>{t('support.exercises_tab.boundaries.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <QuoteBox>{t('support.exercises_tab.boundaries.quotes.not_accept')}</QuoteBox>
                            <QuoteBox>{t('support.exercises_tab.boundaries.quotes.speak_properly')}</QuoteBox>
                            <QuoteBox>{t('support.exercises_tab.boundaries.quotes.not_continue')}</QuoteBox>
                        </CardContent>
                    </Card>

                    {/* DARVO */}
                    <Card className="md:col-span-2 border-slate-200 bg-slate-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5" /> {t('support.exercises_tab.darvo.title')}
                            </CardTitle>
                            <CardDescription>{t('support.exercises_tab.darvo.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                <h4 className="font-bold text-red-800 mb-2">{t('support.exercises_tab.darvo.attack')}</h4>
                                <p className="italic text-red-700">{t('support.exercises_tab.darvo.attack_text')}</p>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                                <h4 className="font-bold text-emerald-800 mb-2">{t('support.exercises_tab.darvo.response')}</h4>
                                <p className="font-medium text-emerald-900">{t('support.exercises_tab.darvo.response_text')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* STRENGTH LIST */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">{t('support.exercises_tab.strengths.title')}</CardTitle>
                            <CardDescription>{t('support.exercises_tab.strengths.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-slate-500">{t('support.exercises_tab.strengths.instruction')}</p>
                            <div className="space-y-2">
                                <input className="w-full border-b border-slate-200 focus:outline-none focus:border-indigo-500 py-1 bg-transparent" placeholder={`1. ${t('support.exercises_tab.strengths.placeholder')}`} />
                                <input className="w-full border-b border-slate-200 focus:outline-none focus:border-indigo-500 py-1 bg-transparent" placeholder={`2. ${t('support.exercises_tab.strengths.placeholder')}`} />
                                <input className="w-full border-b border-slate-200 focus:outline-none focus:border-indigo-500 py-1 bg-transparent" placeholder={`3. ${t('support.exercises_tab.strengths.placeholder')}`} />
                            </div>
                            <p className="text-center italic text-indigo-600 font-medium pt-2">{t('support.exercises_tab.strengths.footer')}</p>
                        </CardContent>
                    </Card>

                    {/* EMERGENCY KIT */}
                    <Card className="bg-rose-50 border-rose-100">
                        <CardHeader>
                            <CardTitle className="text-lg text-rose-900">{t('support.exercises_tab.emergency_kit.title')}</CardTitle>
                            <CardDescription className="text-rose-700">{t('support.exercises_tab.emergency_kit.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 accent-rose-600" /> <span>{t('support.exercises_tab.emergency_kit.items.playlist')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 accent-rose-600" /> <span>{t('support.exercises_tab.emergency_kit.items.friend')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 accent-rose-600" checked readOnly /> <span className="font-bold">{t('support.exercises_tab.emergency_kit.items.crisis_line')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 accent-rose-600" /> <span>{t('support.exercises_tab.emergency_kit.items.movie')}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* CONFLICT SIMULATION */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">{t('support.exercises_tab.simulation.title')}</CardTitle>
                            <CardDescription>{t('support.exercises_tab.simulation.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="font-bold text-slate-700 text-sm mb-1">{t('support.exercises_tab.simulation.q1.label')}</p>
                                <p className="italic mb-2">{t('support.exercises_tab.simulation.q1.text')}</p>
                                <p className="font-bold text-indigo-700 text-sm mb-1">{t('support.exercises_tab.simulation.q1.ans_label')}</p>
                                <p className="text-indigo-900 font-medium">{t('support.exercises_tab.simulation.q1.ans_text')}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="font-bold text-slate-700 text-sm mb-1">{t('support.exercises_tab.simulation.q2.label')}</p>
                                <p className="italic mb-2">{t('support.exercises_tab.simulation.q2.text')}</p>
                                <p className="font-bold text-indigo-700 text-sm mb-1">{t('support.exercises_tab.simulation.q2.ans_label')}</p>
                                <p className="text-indigo-900 font-medium">{t('support.exercises_tab.simulation.q2.ans_text')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* FUTURE PLANNING */}
                    <Card className="md:col-span-2 bg-gradient-to-r from-indigo-50 to-purple-50 border-none">
                        <CardHeader>
                            <CardTitle className="text-lg">{t('support.exercises_tab.future.title')}</CardTitle>
                            <CardDescription>{t('support.exercises_tab.future.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="font-medium text-slate-700">{t('support.exercises_tab.future.subtitle')}</p>
                            <div className="space-y-3">
                                <CheckItem time={t('support.exercises_tab.future.times.1wk')}>{t('support.exercises_tab.future.steps.cv')}</CheckItem>
                                <CheckItem time={t('support.exercises_tab.future.times.2wk')}>{t('support.exercises_tab.future.steps.search')}</CheckItem>
                                <CheckItem time={t('support.exercises_tab.future.times.continuous')}>{t('support.exercises_tab.future.steps.rest')}</CheckItem>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>


                {/* --- TAB 3: CONTACT INFO --- */}
                <TabsContent value="contacts" className="grid gap-6 md:grid-cols-2">
                    <Card className="border-l-4 border-l-rose-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-rose-700">
                                <Phone className="w-5 h-5" /> {t('support.contacts_tab.acute.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-bold text-lg">{t('support.contacts_tab.acute.mieli.title')}</h3>
                                <div className="text-3xl font-black text-slate-900 my-1">09 2525 0111</div>
                                <p className="text-sm text-slate-500">{t('support.contacts_tab.acute.mieli.hours')}</p>
                            </div>
                            <div className="pt-4 border-t">
                                <h3 className="font-bold text-lg">{t('support.contacts_tab.acute.riku.title')}</h3>
                                <div className="text-3xl font-black text-slate-900 my-1">116 006</div>
                                <p className="text-sm text-slate-500">{t('support.contacts_tab.acute.riku.text')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-700">
                                <Scale className="w-5 h-5" /> {t('support.contacts_tab.authorities.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-bold text-base">{t('support.contacts_tab.authorities.avi.label')}</h3>
                                <p className="text-sm text-slate-600 mb-1">{t('support.contacts_tab.authorities.avi.sub')}</p>
                                <a href="https://avi.fi" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">{t('support.contacts_tab.authorities.avi.link')}</a>
                            </div>
                            <div>
                                <h3 className="font-bold text-base">{t('support.contacts_tab.authorities.unions.label')}</h3>
                                <p className="text-sm text-slate-600">{t('support.contacts_tab.authorities.unions.sub')}</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base">{t('support.contacts_tab.authorities.legal.label')}</h3>
                                <p className="text-sm text-slate-600">{t('support.contacts_tab.authorities.legal.sub')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-emerald-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-emerald-700">
                                <Users className="w-5 h-5" /> {t('support.contacts_tab.peer_support.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <a href="#" className="flex items-center gap-2 text-slate-700 hover:text-emerald-700">
                                <span>☺</span> {t('support.contacts_tab.peer_support.items.fb')}
                            </a>
                            <a href="https://mieli.fi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 hover:text-emerald-700">
                                <span>☺</span> {t('support.contacts_tab.peer_support.items.mieli')}
                            </a>
                            <a href="#" className="flex items-center gap-2 text-slate-700 hover:text-emerald-700">
                                <span>☺</span> {t('support.contacts_tab.peer_support.items.local')}
                            </a>
                            <a href="https://discord.gg/2pwqw8Rhtu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 hover:text-emerald-700">
                                <span>💬</span> {t('support.contacts_tab.peer_support.items.discord')}
                            </a>
                        </CardContent>
                    </Card>

                    <Card className="border-none bg-slate-900 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-yellow-400">
                                <BookOpen className="w-5 h-5" /> {t('support.contacts_tab.knowledge.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-bold text-base text-blue-200">{t('support.contacts_tab.knowledge.ttl.label')}</h3>
                                <p className="text-sm text-slate-400">{t('support.contacts_tab.knowledge.ttl.sub')}</p>
                                <p className="text-xs text-slate-500 mt-1">ttl.fi</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-blue-200">{t('support.contacts_tab.knowledge.ttk.label')}</h3>
                                <p className="text-sm text-slate-400">{t('support.contacts_tab.knowledge.ttk.sub')}</p>
                                <p className="text-xs text-slate-500 mt-1">ttk.fi</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="text-center pt-8 border-t border-slate-100">
                <p className="text-emerald-600 font-bold text-lg flex items-center justify-center gap-2">
                    {t('support.footer.remember')}
                </p>
                <p className="text-slate-400 text-xs mt-2 italic">
                    {t('support.footer.disclaimer')}
                </p>
            </div>
        </div>
    );
}

// --- SUBCOMPONENTS ---

function QuoteBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-indigo-50 px-4 py-3 rounded-tr-xl rounded-bl-xl rounded-br-xl border-l-4 border-l-indigo-400 text-indigo-900 font-medium italic">
            {children}
        </div>
    );
}

function CheckItem({ time, children }: { time: string, children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
            <div className="w-6 h-6 rounded-full border-2 border-indigo-200 flex items-center justify-center text-transparent hover:text-indigo-600 cursor-pointer transition-colors">
                ✓
            </div>
            <div className="flex-1">
                <p className="text-slate-800 font-medium">{children}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">{time}</p>
            </div>
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
            if (!isRunning) return; // Safety check
            setStatus(phases[phaseIndex].text);
            phaseIndex = (phaseIndex + 1) % phases.length;
        };

        runPhase();
        const interval = setInterval(runPhase, 5000);

        return () => clearInterval(interval);
    }, [isRunning, t]);

    return (
        <div className="flex flex-col items-center justify-center py-6 gap-6">
            <div className="relative flex items-center justify-center">
                <motion.div
                    animate={isRunning ? {
                        scale: [1, 1.3, 1.3, 1, 1], // In(1->1.3), Hold(1.3), Out(1.3->1)
                        opacity: [0.6, 1, 1, 0.6, 0.6],
                    } : { scale: 1, opacity: 0.6 }}
                    transition={isRunning ? {
                        duration: 15, // 5+5+5
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.33, 0.66, 1]
                    } : {}}
                    className="w-40 h-40 rounded-full bg-indigo-300/30 absolute blur-xl"
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
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative z-10 shadow-xl text-white font-bold text-center px-4"
                >
                    {status}
                </motion.div>
            </div>

            <Button
                onClick={() => {
                    setIsRunning(!isRunning);
                    if (isRunning) setStatus(t('support.exercises_tab.breathing.start'));
                }}
                variant={isRunning ? "outline" : "default"}
                size="sm"
                className="rounded-full px-6"
            >
                {isRunning ? t('support.exercises_tab.breathing.stop') : t('support.exercises_tab.breathing.start_exercise')}
            </Button>
        </div>
    );
}
