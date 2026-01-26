import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimelineEvent, Emotion } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { StepFacts } from "./timeline/forms/StepFacts";
import { StepDescription } from "./timeline/forms/StepDescription";
import { StepImpact } from "./timeline/forms/StepImpact";
import { ShieldCheck } from "lucide-react";

interface TimelineEventFormProps {
    onAdd: (event: Omit<TimelineEvent, "id">) => void;
}

export function TimelineEventForm({ onAdd }: TimelineEventFormProps) {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);

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

                    <StepFacts
                        date={date}
                        setDate={setDate}
                        people={people}
                        setPeople={setPeople}
                        onNext={nextStep}
                        isActive={step === 1}
                    />

                    <StepDescription
                        objectiveDescription={objectiveDescription}
                        setObjectiveDescription={setObjectiveDescription}
                        selectedTypes={selectedTypes}
                        setSelectedTypes={setSelectedTypes}
                        evidence={evidence}
                        setEvidence={setEvidence}
                        onNext={nextStep}
                        onPrev={prevStep}
                        isActive={step === 2}
                    />

                    <StepImpact
                        subjectiveEffect={subjectiveEffect}
                        setSubjectiveEffect={setSubjectiveEffect}
                        selectedEmotion={selectedEmotion}
                        setSelectedEmotion={setSelectedEmotion}
                        severity={severity}
                        setSeverity={setSeverity}
                        onPrev={prevStep}
                        onSubmit={handleSubmit}
                        isActive={step === 3}
                    />

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
