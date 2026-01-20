"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Check, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CriteriaCategory {
    title: string;
    items: string[];
}

export function TeamChecklist() {
    const { t } = useLanguage();
    const criteria = t('lukutaito_page.team_checklist.criteria', { returnObjects: true }) as Record<string, CriteriaCategory>;
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggle = (section: string, index: number) => {
        const key = `${section}-${index}`;
        setChecked(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const totalChecked = Object.values(checked).filter(Boolean).length;
    const isCrisis = totalChecked < 15;

    return (
        <div className="space-y-8">
            <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 sticky top-4 z-20">
                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">{t('lukutaito_page.team_checklist.title')}</h2>
                    <p className="text-[#4A4A4A]">{t('lukutaito_page.team_checklist.subtitle')}</p>
                </div>

                <div className={cn(
                    "px-8 py-4 rounded-sm border-2 flex items-center gap-6 transition-colors",
                    isCrisis ? "bg-red-50 border-red-100 text-red-900" : "bg-emerald-50 border-emerald-100 text-emerald-900"
                )}>
                    <div className="text-center">
                        <div className="text-3xl font-black">{totalChecked}</div>
                        <div className="text-[9px] uppercase font-bold tracking-widest opacity-70">{t('lukutaito_page.team_checklist.badges.checks')}</div>
                    </div>
                    <div className="h-10 w-px bg-current opacity-20" />
                    <div>
                        <div className="font-bold flex items-center gap-2 uppercase tracking-wide">
                            {isCrisis ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                            {isCrisis ? t('lukutaito_page.team_checklist.badges.crisis') : t('lukutaito_page.team_checklist.badges.healthy')}
                        </div>
                        <div className="text-xs opacity-90 max-w-[180px] leading-tight mt-1">
                            {isCrisis ? t('lukutaito_page.team_checklist.status.crisis_text') : t('lukutaito_page.team_checklist.status.healthy_text')}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(criteria).map(([key, category]) => {
                    const sectionCheckedCount = category.items.filter((_, idx) => checked[`${key}-${idx}`]).length;

                    return (
                        <Card key={key} className="border-suojasiipi-secondary bg-white rounded-sm shadow-sm">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex justify-between items-baseline border-b border-[#FAFAFA] pb-4">
                                    <h3 className="font-bold font-serif text-lg text-suojasiipi-text-main">{category.title}</h3>
                                    <Badge variant="secondary" className="bg-suojasiipi-bg text-suojasiipi-text-body border border-suojasiipi-secondary font-mono text-xs">
                                        {sectionCheckedCount} / {category.items.length}
                                    </Badge>
                                </div>
                                <div className="space-y-4">
                                    {category.items.map((item, index) => {
                                        const isChecked = checked[`${key}-${index}`];
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => toggle(key, index)}
                                                className="flex items-start gap-4 text-left w-full group"
                                            >
                                                <div className={cn(
                                                    "w-5 h-5 rounded-sm border mt-0.5 shrink-0 flex items-center justify-center transition-all",
                                                    isChecked ? "bg-suojasiipi-primary border-suojasiipi-primary" : "bg-white border-suojasiipi-secondary group-hover:border-suojasiipi-primary"
                                                )}>
                                                    {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                                                </div>
                                                <span className={cn(
                                                    "text-sm transition-colors",
                                                    isChecked ? "text-suojasiipi-text-main font-medium" : "text-suojasiipi-text-body group-hover:text-suojasiipi-text-main"
                                                )}>
                                                    {item}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
