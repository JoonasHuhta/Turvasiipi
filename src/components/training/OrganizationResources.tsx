"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    Building2,
    ArrowLeft,
    ShieldAlert,
    Scale,
    Briefcase
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface OrganizationResourcesProps {
    onExit: () => void;
    onComplete: () => void;
}

export const OrganizationResources: React.FC<OrganizationResourcesProps> = ({ onExit, onComplete }) => {
    const { t } = useLanguage();

    const risksContent = t('training.organization_resources.resources.0.content', { returnObjects: true }) as any;

    // Safety check to prevent crash if translation is missing
    const safeRisksContent = risksContent && typeof risksContent === 'object' ? risksContent : {
        item1: "Content loading...",
        item2: "...",
        item3: "...",
        item4: "...",
        item5: "..."
    };

    const financialContent = t('training.organization_resources.resources.1.content', { returnObjects: true }) as any;
    const momentsContent = t('training.organization_resources.resources.2.content', { returnObjects: true }) as any;

    // We access titles via index for simplicity as array structure is fixed in translation
    const riskTitle = t('training.organization_resources.resources.0.title');
    const financialTitle = t('training.organization_resources.resources.1.title');
    const momentsTitle = t('training.organization_resources.resources.2.title');

    return (
        <div className="min-h-full p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500 font-sans text-slate-800">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> {t('training.organization_resources.ui.back')}
                </Button>
                <div className="flex items-center gap-2 text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
                    <Building2 className="w-4 h-4" /> {t('training.organization_resources.ui.org_label')}
                </div>
            </div>

            <div className="space-y-4 pb-4 border-b border-slate-200">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
                    {t('training.organization_resources.title')}
                </h1>
                <p className="text-slate-500 max-w-2xl text-lg">
                    {t('training.organization_resources.subtitle')}
                </p>
            </div>

            <Card className="p-0 border-slate-200 shadow-lg overflow-hidden">
                <Accordion type="single" collapsible className="w-full">

                    {/* 1. Risks */}
                    <AccordionItem value="systemic-risks" className="border-b border-slate-100 px-6">
                        <AccordionTrigger className="hover:no-underline py-6 group">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-colors">
                                    <ShieldAlert className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-800 text-lg group-hover:text-slate-900">{riskTitle}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 pl-[4.5rem] pr-4">
                            <div className="space-y-6 text-slate-700">
                                {['item1', 'item2', 'item3', 'item4', 'item5'].map((key) => (
                                    <div key={key} dangerouslySetInnerHTML={{ __html: safeRisksContent[key] }} className="space-y-2 [&>strong]:font-bold [&>strong]:text-slate-900 [&>strong]:italic [&>strong]:underline" />
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 2. Financial */}
                    <AccordionItem value="financial-impact" className="border-b border-slate-100 px-6">
                        <AccordionTrigger className="hover:no-underline py-6 group">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-colors">
                                    <Scale className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-800 text-lg group-hover:text-slate-900">{financialTitle}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 pl-[4.5rem] pr-4">
                            <div className="space-y-4 text-slate-700">
                                <p dangerouslySetInnerHTML={{ __html: financialContent.summary }} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {financialContent.cards?.map((card: any, i: number) => (
                                        <div key={i} className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                                            <h5 className="font-bold text-orange-950 text-sm mb-1">{card.title}</h5>
                                            <p className="text-xs">{card.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-slate-100 p-4 rounded-lg font-medium text-sm">
                                    {financialContent.formula}
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 3. Moments */}
                    <AccordionItem value="decisive-moments" className="border-b border-slate-100 px-6">
                        <AccordionTrigger className="hover:no-underline py-6 group">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-colors">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-800 text-lg group-hover:text-slate-900">{momentsTitle}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 pl-[4.5rem] pr-4">
                            <div className="space-y-6 text-slate-700">
                                {['item1', 'item2', 'item3'].map((key) => (
                                    <div key={key} dangerouslySetInnerHTML={{ __html: momentsContent[key] }} className="space-y-2" />
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </Card>

            <div className="bg-slate-50 p-8 rounded-2xl text-center space-y-4 mt-4 border border-slate-100">
                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm">{t('training.organization_resources.ui.footer_title')}</h3>
                <p className="text-slate-600 italic max-w-xl mx-auto">
                    {t('training.organization_resources.ui.footer_text')}
                </p>
            </div>
        </div>
    );
};
