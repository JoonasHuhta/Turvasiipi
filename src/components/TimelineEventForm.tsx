import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TimelineEvent, Emotion } from "@/types";
import { Frown, Meh, AlertCircle, Angry, Plus, MapPin, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useLanguage } from "@/context/LanguageContext";

interface TimelineEventFormProps {
    onAdd: (event: Omit<TimelineEvent, "id">) => void;
}

export function TimelineEventForm({ onAdd }: TimelineEventFormProps) {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);

    const emotions: { value: Emotion; label: string; icon: React.ReactNode; color: string }[] = [
        { value: "neutral", label: t('timeline.emotions.neutral'), icon: <Meh className="w-5 h-5" />, color: "bg-gray-100 hover:bg-gray-200 border-gray-200" },
        { value: "sad", label: t('timeline.emotions.sad'), icon: <Frown className="w-5 h-5" />, color: "bg-blue-100 hover:bg-blue-200 border-blue-200" },
        { value: "anxious", label: t('timeline.emotions.anxious'), icon: <AlertCircle className="w-5 h-5" />, color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-200" },
        { value: "fearful", label: t('timeline.emotions.fearful'), icon: <AlertCircle className="w-5 h-5" />, color: "bg-purple-100 hover:bg-purple-200 border-purple-200 dashed" },
        { value: "angry", label: t('timeline.emotions.angry'), icon: <Angry className="w-5 h-5" />, color: "bg-red-100 hover:bg-red-200 border-red-200" },
    ];

    // Step 1: Perusfaktat
    const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
    const [people, setPeople] = useState("");

    // Step 2: Tapahtumakuvaus (Objektiivinen)
    const [objectiveDescription, setObjectiveDescription] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [evidence, setEvidence] = useState("");

    // Step 3: Vaikutus (Subjektiivinen)
    const [subjectiveEffect, setSubjectiveEffect] = useState("");
    const [selectedEmotion, setSelectedEmotion] = useState<Emotion>("neutral");
    const [severity, setSeverity] = useState(5);

    const [showSuccess, setShowSuccess] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onAdd({
            timestamp: new Date(date).toISOString(),
            date: new Date(date).toLocaleDateString("fi-FI"),
            objectiveDescription,
            subjectiveEffect,
            description: objectiveDescription,
            evidence,
            peopleInvolved: people,
            emotion: selectedEmotion,
            severity,
            bullyingTypes: selectedTypes,
            title: "Uusi merkintä", // Default title
            type: selectedTypes[0] || "general",
            intensity: severity,
        });

        // Reset form
        setStep(1);
        setObjectiveDescription("");
        setSubjectiveEffect("");
        setPeople("");
        setDate(new Date().toISOString().slice(0, 16));
        setSelectedEmotion("neutral");
        setSeverity(5);
        setSelectedTypes([]);
        setEvidence("");

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 8000);
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    return (
        <Card className="border-indigo-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-indigo-50/50 pb-6">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-slate-800">{t('timeline.form.title')}</CardTitle>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`h-2 w-8 rounded-full transition-all ${step >= s ? 'bg-indigo-500' : 'bg-slate-200'}`} />
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* STEP 1: FAKTAT */}
                    {step === 1 && (
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

                            <Button type="button" onClick={nextStep} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl mt-4">
                                {t('timeline.form.step1.next_button')}
                            </Button>
                        </div>
                    )}

                    {/* STEP 2: OBJEKTIIVINEN KUVAUS */}
                    {step === 2 && (
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
                                                setSelectedTypes(prev => prev.includes(type.key) ? prev.filter(t => t !== type.key) : [...prev, type.key]);
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
                                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12">{t('timeline.form.step2.back_button')}</Button>
                                <Button type="button" onClick={nextStep} className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
                                    {t('timeline.form.step2.next_button')}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: SUBJEKTIIVINEN VAIKUTUS */}
                    {step === 3 && (
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
                                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12">{t('timeline.form.step2.back_button')}</Button>
                                <Button type="submit" className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200">
                                    <Plus className="w-5 h-5 mr-2" /> {t('timeline.form.step3.save_button')}
                                </Button>
                            </div>
                        </div>
                    )}

                    {showSuccess && (
                        <div className="fixed bottom-4 right-4 z-50 bg-emerald-900/90 backdrop-blur text-white p-6 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10 flex gap-4 max-w-sm border border-emerald-500/20">
                            <div className="bg-emerald-500/20 p-2 rounded-full h-fit">
                                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{t('timeline.form.success.title')}</h3>
                                <p className="text-emerald-100/80 text-sm leading-relaxed">
                                    {t('timeline.form.success.description')}
                                </p>
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
