"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, BookOpen, PenTool, Shield, AlertTriangle, FileText, History, Brain } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

type Level = "facts" | "exercises" | "reflection" | "simulation";

interface SafetyRecommendationsProps {
    selectedLevel: Level | null;
    isContractLocked: boolean;
}

export function SafetyRecommendations({ selectedLevel, isContractLocked }: SafetyRecommendationsProps) {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    // If no level selected or contract not locked, show nothing (Choice & Control)
    if (!selectedLevel || !isContractLocked) return null;

    const getRecommendations = (level: Level) => {
        switch (level) {
            case "facts":
                return [
                    {
                        href: "/tietovisa",
                        title: t("start_here.recommendations.links.tietovisa"),
                        icon: BookOpen,
                        desc: t("start_here.recommendations.descs.tietovisa"),
                        color: "bg-emerald-100 text-emerald-800"
                    },
                    {
                        href: "/taktiikat",
                        title: t("nav.tactics"), // Reuse existing nav key
                        icon: FileText,
                        desc: t("start_here.recommendations.descs.taktiikat"),
                        color: "bg-emerald-100/50 text-emerald-800"
                    }
                ];
            case "exercises":
                return [
                    {
                        href: "/quiz",
                        title: t("start_here.recommendations.links.quiz"),
                        icon: PenTool,
                        desc: t("start_here.recommendations.descs.quiz"),
                        color: "bg-blue-100 text-blue-800"
                    },
                    {
                        href: "/lukutaito-testi",
                        title: t("nav.literacy_test"), // Reuse existing nav key
                        icon: PenTool,
                        desc: t("start_here.recommendations.descs.lukutaito"),
                        color: "bg-blue-100/50 text-blue-800"
                    }
                ];
            case "reflection":
                return [
                    {
                        href: "/loki",
                        title: t("start_here.recommendations.links.loki"),
                        icon: Shield,
                        desc: t("start_here.recommendations.descs.loki"),
                        color: "bg-amber-100 text-amber-800"
                    },
                    {
                        href: "/timeline",
                        title: t("nav.timeline"), // Reuse nav key
                        icon: History,
                        desc: t("start_here.recommendations.descs.timeline"),
                        color: "bg-amber-100/50 text-amber-800"
                    }
                ];
            case "simulation":
                return [
                    {
                        href: "/simulaatio",
                        title: t("start_here.recommendations.links.simulaatio"),
                        icon: AlertTriangle,
                        desc: t("start_here.recommendations.descs.simulaatio"),
                        color: "bg-red-100 text-red-800"
                    },
                    {
                        href: "/neuromoninaisuus",
                        title: t("nav.neuromoninaisuus"), // Reuse nav key
                        icon: Brain,
                        desc: t("start_here.recommendations.descs.neuro"),
                        color: "bg-red-100/50 text-red-800"
                    }
                ];
        }
    };

    const items = getRecommendations(selectedLevel);

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-700 fade-in fill-mode-both">
            {!isOpen ? (
                <div className="flex justify-center pt-8">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="group px-8 py-4 bg-[#5B4B8A] text-white rounded-full font-bold shadow-lg shadow-[#5B4B8A]/20 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3"
                    >
                        <span>{t("start_here.recommendations.show_button")}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            ) : (
                <div className="bg-white border border-[#E8DDD0] rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-[#FDFBF7] p-6 border-b border-[#E8DDD0]">
                        <h3 className="font-serif font-bold text-xl text-[#2B2B2B]">
                            {t("start_here.recommendations.title")}
                        </h3>
                    </div>

                    <div className="divide-y divide-[#E8DDD0]">
                        {items.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className="flex items-center gap-4 p-6 hover:bg-[#FDFBF7] transition-colors group"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-[#2B2B2B] group-hover:text-[#5B4B8A] transition-colors flex items-center gap-2">
                                        {item.title}
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                    </h4>
                                    <p className="text-sm text-[#4A4A4A] mt-1">{item.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
