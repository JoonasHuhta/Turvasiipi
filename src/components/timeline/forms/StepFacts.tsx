import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface StepFactsProps {
    date: string;
    setDate: (value: string) => void;
    people: string;
    setPeople: (value: string) => void;
    onNext: () => void;
    isActive: boolean;
}

export const StepFacts: React.FC<StepFactsProps> = ({
    date,
    setDate,
    people,
    setPeople,
    onNext,
    isActive
}) => {
    const { t } = useLanguage();

    if (!isActive) return null;

    return (
        <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-indigo-900 text-sm flex gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-indigo-500" />
                <div>
                    <span className="font-bold block mb-1">{t('timeline.form.step1.title')}</span>
                    {t('timeline.form.step1.description')}
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="date">{t('timeline.form.step1.date_label')}</Label>
                <Input
                    id="date"
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="h-12 border-slate-200"
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="people">{t('timeline.form.step1.witnesses_label')}</Label>
                <Input
                    id="people"
                    placeholder={t('timeline.form.step1.witnesses_placeholder')}
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    className="h-12 border-slate-200"
                />
            </div>

            <Button
                type="button"
                onClick={onNext}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl mt-4"
            >
                {t('timeline.form.step1.next_button')}
            </Button>
        </div>
    );
};
