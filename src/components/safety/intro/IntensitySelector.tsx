"use client";

import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, PenTool, Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

type Level = "facts" | "exercises" | "reflection" | "simulation";

interface IntensitySelectorProps {
    selectedLevel: Level | null;
    onSelect: (level: Level) => void;
}

export function IntensitySelector({ selectedLevel, onSelect }: IntensitySelectorProps) {
    const { t } = useLanguage();

    const options: { id: Level; icon: any; color: string }[] = [
        { id: "facts", icon: BookOpen, color: "text-emerald-600 border-emerald-200 bg-emerald-50" },
        { id: "exercises", icon: PenTool, color: "text-blue-600 border-blue-200 bg-blue-50" },
        { id: "reflection", icon: Shield, color: "text-amber-600 border-amber-200 bg-amber-50" },
        { id: "simulation", icon: AlertTriangle, color: "text-red-600 border-red-200 bg-red-50" },
    ];

    return (
        <div id="intensity-selector" className="space-y-8 py-12 scroll-mt-20">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">
                    {t("start_here.selector.title")}
                </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {options.map((option) => {
                    const isSelected = selectedLevel === option.id;
                    const Icon = option.icon;

                    return (
                        <button
                            key={option.id}
                            onClick={() => onSelect(option.id)}
                            className={`
                relative p-6 rounded-lg text-left transition-all duration-300 border-2
                flex flex-col gap-4 h-full
                ${isSelected
                                    ? `border-current ${option.color} ring-2 ring-offset-2 ring-current transform scale-[1.02]`
                                    : "border-[#E8DDD0] bg-white hover:border-[#5B4B8A]/30 hover:bg-[#FDFBF7]"
                                }
              `}
                        >
                            <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${isSelected ? "bg-white/50" : "bg-[#F5F5F0]"}
              `}>
                                <Icon className={`w-6 h-6 ${isSelected ? "text-current" : "text-[#4A4A4A]"}`} />
                            </div>

                            <div className="space-y-2">
                                <h3 className={`font-bold text-lg ${isSelected ? "text-current" : "text-[#2B2B2B]"}`}>
                                    {t(`start_here.selector.levels.${option.id}.label`)}
                                </h3>

                                {/* Always show preview text for clarity, or show it differently when selected? Plan said "Preview Text". */}
                                <p className={`text-xs leading-relaxed ${isSelected ? "text-current/80 font-medium" : "text-[#4A4A4A]/70"}`}>
                                    {t(`start_here.selector.levels.${option.id}.preview`)}
                                </p>
                            </div>

                            {isSelected && (
                                <div className="absolute top-4 right-4">
                                    <CheckCircle2 className="w-5 h-5 animate-in fade-in zoom-in duration-300" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
