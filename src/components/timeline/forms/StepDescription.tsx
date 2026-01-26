import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface StepDescriptionProps {
    objectiveDescription: string;
    setObjectiveDescription: (value: string) => void;
    selectedTypes: string[];
    setSelectedTypes: (callback: (prev: string[]) => string[]) => void;
    evidence: string;
    setEvidence: (value: string) => void;
    onNext: () => void;
    onPrev: () => void;
    isActive: boolean;
}

export const StepDescription: React.FC<StepDescriptionProps> = ({
    objectiveDescription,
    setObjectiveDescription,
    selectedTypes,
    setSelectedTypes,
    evidence,
    setEvidence,
    onNext,
    onPrev,
    isActive
}) => {
    const { t } = useLanguage();

    const bullyingTypes = [
        { key: 'isolation', label: t('timeline.types.isolation') },
        { key: 'inappropriate_speech', label: t('timeline.types.inappropriate_speech') },
        { key: 'work_limitation', label: t('timeline.types.work_limitation') },
        { key: 'abuse_of_power', label: t('timeline.types.abuse_of_power') },
        { key: 'digital_harassment', label: t('timeline.types.digital_harassment') }
    ];

    const evidenceOptions = [
        { label: t('timeline.evidence.none'), value: "" },
        { label: t('timeline.evidence.email'), value: "email" },
        { label: t('timeline.evidence.teams_slack'), value: "teams_slack" },
        { label: t('timeline.evidence.sms_whatsapp'), value: "sms_whatsapp" },
        { label: t('timeline.evidence.photo_screenshot'), value: "photo_screenshot" },
        { label: t('timeline.evidence.audio'), value: "audio" },
        { label: t('timeline.evidence.eyewitness'), value: "eyewitness" }
    ];

    if (!isActive) return null;

    return (
        <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 text-amber-900 text-sm flex gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0 text-amber-500" />
                <div>
                    <span className="font-bold block mb-1">{t('timeline.form.step2.title')}</span>
                    {t('timeline.form.step2.description')}
                    <br /><i className="text-xs text-amber-700/80">{t('timeline.form.step2.example')}</i>
                </div>
            </div>

            <div className="grid gap-2">
                <Label>{t('timeline.form.step2.type_label')}</Label>
                <div className="flex flex-wrap gap-2">
                    {bullyingTypes.map(type => (
                        <button
                            key={type.key}
                            type="button"
                            onClick={() => {
                                setSelectedTypes((prev: string[]) => prev.includes(type.key) ? prev.filter(t => t !== type.key) : [...prev, type.key]);
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedTypes.includes(type.key)
                                ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                                : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="objective">{t('timeline.form.step2.description_label')}</Label>
                <Textarea
                    id="objective"
                    placeholder={t('timeline.form.step2.description_placeholder')}
                    value={objectiveDescription}
                    onChange={(e) => setObjectiveDescription(e.target.value)}
                    required
                    className="min-h-[120px] border-slate-200 text-base"
                />
            </div>

            <div className="grid gap-2">
                <Label>{t('timeline.form.step2.evidence_label')}</Label>
                <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={evidence}
                    onChange={(e) => setEvidence(e.target.value)}
                >
                    {evidenceOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
            </div>

            <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={onPrev} className="flex-1 h-12">{t('timeline.form.step2.back_button')}</Button>
                <Button type="button" onClick={onNext} className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
                    {t('timeline.form.step2.next_button')}
                </Button>
            </div>
        </div>
    );
};
