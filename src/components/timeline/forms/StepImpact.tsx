import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertCircle, Frown, Meh, Angry, Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Emotion } from "@/types";

interface StepImpactProps {
    subjectiveEffect: string;
    setSubjectiveEffect: (value: string) => void;
    selectedEmotion: Emotion;
    setSelectedEmotion: (value: Emotion) => void;
    severity: number;
    setSeverity: (value: number) => void;
    onPrev: () => void;
    onSubmit: (e: React.FormEvent) => void;
    isActive: boolean;
}

export const StepImpact: React.FC<StepImpactProps> = ({
    subjectiveEffect,
    setSubjectiveEffect,
    selectedEmotion,
    setSelectedEmotion,
    severity,
    setSeverity,
    onPrev,
    onSubmit,
    isActive
}) => {
    const { t } = useLanguage();

    const emotions: { value: Emotion; label: string; icon: React.ReactNode; color: string }[] = [
        { value: "neutral", label: t('timeline.emotions.neutral'), icon: <Meh className="w-5 h-5" />, color: "bg-gray-100 hover:bg-gray-200 border-gray-200" },
        { value: "sad", label: t('timeline.emotions.sad'), icon: <Frown className="w-5 h-5" />, color: "bg-blue-100 hover:bg-blue-200 border-blue-200" },
        { value: "anxious", label: t('timeline.emotions.anxious'), icon: <AlertCircle className="w-5 h-5" />, color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-200" },
        { value: "fearful", label: t('timeline.emotions.fearful'), icon: <AlertCircle className="w-5 h-5" />, color: "bg-purple-100 hover:bg-purple-200 border-purple-200 dashed" },
        { value: "angry", label: t('timeline.emotions.angry'), icon: <Angry className="w-5 h-5" />, color: "bg-red-100 hover:bg-red-200 border-red-200" },
    ];

    if (!isActive) return null;

    return (
        <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 text-rose-900 text-sm flex gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                <div>
                    <span className="font-bold block mb-1">{t('timeline.form.step3.title')}</span>
                    {t('timeline.form.step3.description')}
                </div>
            </div>

            <div className="grid gap-2">
                <Label>{t('timeline.form.step3.effect_label')}</Label>
                <Textarea
                    placeholder={t('timeline.form.step3.effect_placeholder')}
                    value={subjectiveEffect}
                    onChange={(e) => setSubjectiveEffect(e.target.value)}
                    className="min-h-[100px] border-slate-200"
                />
            </div>

            <div className="grid gap-2">
                <Label>{t('timeline.form.step3.emotion_label')}</Label>
                <div className="flex flex-wrap gap-2">
                    {emotions.map((emo) => (
                        <button
                            key={emo.value}
                            type="button"
                            onClick={() => setSelectedEmotion(emo.value)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${selectedEmotion === emo.value ? "border-rose-300 bg-rose-50" : "border-slate-200 bg-white"}`}
                        >
                            {emo.icon}
                            <span className="text-xs">{emo.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-2">
                <Label className="flex justify-between">
                    <span>{t('timeline.form.step3.severity_label')}</span>
                    <span className="font-bold text-indigo-600">{severity}/10</span>
                </Label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={severity}
                    onChange={(e) => setSeverity(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
            </div>

            <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onPrev} className="flex-1 h-12">{t('timeline.form.step2.back_button')}</Button>
                <Button type="submit" onClick={onSubmit} className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200">
                    <Plus className="w-5 h-5 mr-2" /> {t('timeline.form.step3.save_button')}
                </Button>
            </div>
        </div>
    );
};
