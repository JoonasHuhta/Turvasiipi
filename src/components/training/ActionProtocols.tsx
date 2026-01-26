"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Shield,
    MessageSquare,
    FileText,
    ArrowRight,
    ArrowLeft,
    Zap,
    UserX,
    Lock,
    CheckCircle2,
    AlertTriangle,
    Save
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface ActionProtocolsProps {
    onComplete: () => void;
    onExit: () => void;
}

export const ActionProtocols: React.FC<ActionProtocolsProps> = ({ onComplete, onExit }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("acute");

    return (
        <div className="min-h-full p-6 md:p-12 max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500 font-sans text-[#44403C]">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-[#78716C] hover:text-[#292524] gap-2">
                    <ArrowLeft className="w-4 h-4" /> {t('common.back') || 'Takaisin'}
                </Button>
                <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
                    <Shield className="w-4 h-4" /> {t('training.action_protocols.subtitle')}
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-black text-[#292524] uppercase tracking-tight">
                    <span className="text-rose-600">{t('training.action_protocols.title')}</span>
                </h1>
                <p className="text-[#57534E] max-w-2xl">
                    {t('training.action_protocols.description')}
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl">
                    <TabsTrigger value="acute" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-sm data-[state=active]:font-bold text-[#78716C]">
                        <Zap className="w-4 h-4 mr-2" /> {t('training.action_protocols.tabs.acute')}
                    </TabsTrigger>
                    <TabsTrigger value="conversation" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-sm data-[state=active]:font-bold text-[#78716C]">
                        <MessageSquare className="w-4 h-4 mr-2" /> {t('training.action_protocols.tabs.conversation')}
                    </TabsTrigger>
                    <TabsTrigger value="manager" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-sm data-[state=active]:font-bold text-[#78716C]">
                        <UserX className="w-4 h-4 mr-2" /> {t('training.action_protocols.tabs.manager')}
                    </TabsTrigger>
                    <TabsTrigger value="safety-plan" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm data-[state=active]:font-bold text-[#78716C]">
                        <Lock className="w-4 h-4 mr-2" /> {t('training.action_protocols.tabs.safety_plan')}
                    </TabsTrigger>
                </TabsList>

                {/* 1. ACUTE SCRIPTS */}
                <TabsContent value="acute" className="space-y-6 outline-none">
                    <AcuteScripts />
                </TabsContent>

                {/* 2. DIFFICULT CONVERSATION */}
                <TabsContent value="conversation" className="space-y-6 outline-none">
                    <DifficultConversation />
                </TabsContent>

                {/* 3. MANAGER CHAIN */}
                <TabsContent value="manager" className="space-y-6 outline-none">
                    <ManagerChain />
                </TabsContent>

                {/* 4. SAFETY PLAN */}
                <TabsContent value="safety-plan" className="space-y-6 outline-none">
                    <SafetyPlanBuilder onComplete={onComplete} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const AcuteScripts = () => {
    const { t } = useLanguage();

    // Helper to safely get nested translation objects
    const getScript = (key: string) => {
        return {
            title: t(`training.action_protocols.acute_scripts.scripts.${key}.title`),
            script: t(`training.action_protocols.acute_scripts.scripts.${key}.script`),
            nuance: t(`training.action_protocols.acute_scripts.scripts.${key}.nuance`),
            next: t(`training.action_protocols.acute_scripts.scripts.${key}.next`)
        };
    };

    const scripts = [
        { ...getScript('public_mockery'), icon: MessageSquare },
        { ...getScript('withholding_info'), icon: FileText },
        { ...getScript('isolation'), icon: UserX }
    ];

    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-3 bg-rose-50 border border-rose-100 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-3xl font-black text-rose-600">3</span>
                </div>
                <div className="space-y-2 text-center md:text-left">
                    <h3
                        className="text-xl font-bold text-rose-900 uppercase"
                        dangerouslySetInnerHTML={{ __html: t('training.action_protocols.acute_scripts.intro_title') }}
                    />
                    <p
                        className="text-rose-800"
                        dangerouslySetInnerHTML={{ __html: t('training.action_protocols.acute_scripts.intro_text') }}
                    />
                </div>
            </div>

            {scripts.map((s, i) => (
                <Card key={i} className="p-6 border-[#E7E5E4] hover:border-rose-300 transition-colors group">
                    <div className="w-10 h-10 bg-[#FAFAF9] rounded-lg flex items-center justify-center text-[#A8A29E] mb-4 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors">
                        <s.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-[#292524] mb-4">{s.title}</h3>
                    <div className="bg-[#292524] text-white p-4 rounded-xl relative mb-4">
                        <div className="absolute -top-3 left-4 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{t('training.action_protocols.acute_scripts.labels.say_this')}</div>
                        <p className="font-medium italic">"{s.script}"</p>
                    </div>
                    <div className="space-y-3 text-sm">
                        <p className="text-[#57534E]"><strong className="text-[#292524]">{t('training.action_protocols.acute_scripts.labels.style')}</strong> {s.nuance}</p>
                        <p className="text-[#57534E]"><strong className="text-[#292524]">{t('training.action_protocols.acute_scripts.labels.next_step')}</strong> {s.next}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

const DifficultConversation = () => {
    const { t } = useLanguage();
    const [step, setStep] = useState(0);

    // Get steps from translation
    const stepsData = t('training.action_protocols.difficult_conversation.steps', { returnObjects: true }) as any[];

    // Fallback if translation fails or returns string
    const steps = Array.isArray(stepsData) ? stepsData : [];

    return (
        <Card className="p-8 max-w-2xl mx-auto border-[#E7E5E4]">
            <h2 className="text-2xl font-black uppercase text-[#292524] mb-2">{t('training.action_protocols.difficult_conversation.title')}</h2>
            <p className="text-[#57534E] mb-8">
                {t('training.action_protocols.difficult_conversation.intro')}
            </p>

            <div className="space-y-8">
                {steps.map((s, i) => (
                    <div key={i} className={cn("flex gap-4 transition-opacity duration-500", i === step ? "opacity-100" : "opacity-40 grayscale")}>
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0",
                            i === step ? "bg-amber-600 text-white shadow-lg shadow-amber-200" : "bg-[#F5F5F4] text-[#A8A29E]"
                        )}>
                            {i + 1}
                        </div>
                        <div className="flex-1 space-y-2 pt-1">
                            <h3 className="font-bold text-[#292524]">{s.title}</h3>
                            <div className="bg-[#FAFAF9] p-4 rounded-xl border-l-4 border-amber-400">
                                <p className="font-medium text-[#44403C] italic">"{s.script}"</p>
                            </div>
                            <p className="text-sm text-[#78716C] flex items-center gap-2">
                                <Zap className="w-3 h-3 text-amber-500" /> {s.tip}
                            </p>
                            {i === step && i < steps.length - 1 && (
                                <Button onClick={() => setStep(i + 1)} size="sm" className="mt-2 bg-[#292524] text-white rounded-full hover:bg-[#44403C]">
                                    {s.action}
                                </Button>
                            )}
                            {i === step && i === steps.length - 1 && (
                                <Button onClick={() => setStep(0)} variant="outline" size="sm" className="mt-2 rounded-full border-[#E7E5E4] hover:bg-[#F5F5F4]">
                                    {s.action}
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const ManagerChain = () => {
    const { t } = useLanguage();

    // Get steps from translation
    const stepsData = t('training.action_protocols.manager_chain.steps', { returnObjects: true }) as any[];
    const steps = Array.isArray(stepsData) ? stepsData : [];

    return (
        <div className="space-y-8">
            <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-rose-900 uppercase mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" /> {t('training.action_protocols.manager_chain.title')}
                </h3>
                <p className="text-rose-800 text-sm">
                    {t('training.action_protocols.manager_chain.intro')}
                </p>
            </div>

            <div className="relative border-l-2 border-[#E7E5E4] ml-6 space-y-12">
                {steps.map((item, i) => (
                    <div key={i} className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#292524] border-4 border-white shadow-sm" />
                        <div className="bg-white border border-[#E7E5E4] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-[#292524]">{item.step}</h3>
                                <span className="text-xs font-bold bg-[#F5F5F4] text-[#57534E] px-2 py-1 rounded uppercase tracking-wider">{item.time}</span>
                            </div>
                            <p className="text-sm text-[#78716C] mb-3">{t('training.action_protocols.manager_chain.labels.target')} <span className="font-medium text-amber-600">{item.target}</span></p>
                            <div className="bg-[#FAFAF9] p-3 rounded border-l-2 border-[#D6D3D1] text-sm italic text-[#44403C]">
                                "{item.script}"
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SafetyPlanBuilder = ({ onComplete }: { onComplete: () => void }) => {
    const { t } = useLanguage();
    const [plan, setPlan] = useState({
        reaction: '',
        support: '',
        phrase: t('training.action_protocols.safety_plan.form.phrase_value'),
        exit: '',
        place: ''
    });

    return (
        <Card className="p-8 max-w-2xl mx-auto border-[#E7E5E4]">
            <h2 className="text-2xl font-black uppercase text-[#292524] mb-2">{t('training.action_protocols.safety_plan.title')}</h2>
            <p className="text-[#57534E] mb-8">
                {t('training.action_protocols.safety_plan.intro')}
            </p>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase text-[#57534E]">{t('training.action_protocols.safety_plan.form.reaction_label')}</label>
                    <input
                        type="text"
                        placeholder={t('training.action_protocols.safety_plan.form.reaction_placeholder')}
                        className="w-full p-3 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={plan.reaction}
                        onChange={e => setPlan({ ...plan, reaction: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase text-[#57534E]">{t('training.action_protocols.safety_plan.form.support_label')}</label>
                    <input
                        type="text"
                        placeholder={t('training.action_protocols.safety_plan.form.support_placeholder')}
                        className="w-full p-3 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={plan.support}
                        onChange={e => setPlan({ ...plan, support: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase text-[#57534E]">{t('training.action_protocols.safety_plan.form.phrase_label')}</label>
                    <div className="w-full p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 font-medium">
                        "{plan.phrase}"
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase text-[#57534E]">{t('training.action_protocols.safety_plan.form.exit_label')}</label>
                    <input
                        type="text"
                        placeholder={t('training.action_protocols.safety_plan.form.exit_placeholder')}
                        className="w-full p-3 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={plan.exit}
                        onChange={e => setPlan({ ...plan, exit: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase text-[#57534E]">{t('training.action_protocols.safety_plan.form.place_label')}</label>
                    <input
                        type="text"
                        placeholder={t('training.action_protocols.safety_plan.form.place_placeholder')}
                        className="w-full p-3 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={plan.place}
                        onChange={e => setPlan({ ...plan, place: e.target.value })}
                    />
                </div>

                <div className="pt-6">
                    <Button onClick={onComplete} className="w-full h-14 bg-[#292524] hover:bg-[#44403C] text-white rounded-xl font-bold uppercase tracking-widest text-lg shadow-xl">
                        <Save className="w-5 h-5 mr-3" /> {t('training.action_protocols.safety_plan.form.save_btn')}
                    </Button>
                    <p className="text-xs text-center text-[#A8A29E] mt-3">
                        {t('training.action_protocols.safety_plan.form.disclaimer')}
                    </p>
                </div>
            </div>
        </Card>
    );
};
