"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Save, Clock, MapPin, User, Quote, Users, ShieldCheck, CheckCircle2 } from "lucide-react";
import { bullyingTactics, Tactic } from "@/data/tactics";
import { useSecureLocalStorage } from "@/hooks/useSecureLocalStorage";
import { TimelineEvent } from "@/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function LogPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const { data: events, setData: setEvents } = useSecureLocalStorage<TimelineEvent[]>("suojasiipi_events_secure", []);

    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [selectedTactic, setSelectedTactic] = useState<Tactic | null>(null);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        location: "",
        person: "",
        description: "",
        intensity: [3],
        witnesses: "",
        evidenceType: [] as string[]
    });

    const [meterScore, setMeterScore] = useState(0);

    // Calculate Evidence Meter Score
    useEffect(() => {
        let score = 0;
        if (selectedTactic) score += 20;
        if (formData.date && formData.time) score += 10;
        if (formData.location) score += 10;
        if (formData.person) score += 10;
        if (formData.description.length > 10) score += 10;
        if (formData.description.includes('"')) score += 10; // Simple quote check
        if (formData.witnesses) score += 20;
        if (formData.evidenceType.length > 0) score += 10;

        setMeterScore(Math.min(100, score));
    }, [formData, selectedTactic]);

    const handleNext = () => setStep(prev => Math.min(4, prev + 1) as any);
    const handleBack = () => setStep(prev => Math.max(1, prev - 1) as any);

    const handleSave = () => {
        if (!selectedTactic) return;

        const newEvent: TimelineEvent = {
            id: crypto.randomUUID(),
            timestamp: new Date(`${formData.date}T${formData.time}`).toISOString(),
            type: selectedTactic.category, // Simply mapping category to event type for now
            title: selectedTactic.name,
            description: formData.description,
            intensity: formData.intensity[0],
            emotion: "neutral", // Default
            notes: `Paikka: ${formData.location}\nHenkilöt: ${formData.person}\nTodistajat: ${formData.witnesses}\nTodisteet: ${formData.evidenceType.join(", ")}`,
            peopleInvolved: formData.person
        };

        setEvents([newEvent, ...events]);
        router.push("/timeline");
    };

    const toggleEvidenceType = (type: string) => {
        setFormData(prev => ({
            ...prev,
            evidenceType: prev.evidenceType.includes(type)
                ? prev.evidenceType.filter(t => t !== type)
                : [...prev.evidenceType, type]
        }));
    };

    const getMeterColor = (score: number) => {
        if (score < 40) return "bg-red-500";
        if (score < 70) return "bg-yellow-500";
        return "bg-emerald-500";
    };

    const getMeterFeedback = (score: number) => {
        if (score < 40) return "Alustava havainto. Lisää aika ja paikka vahvistaaksesi merkintää.";
        if (score < 70) return "Hyvä alku! Onko sinulla sitaatteja tai todistajia?";
        return "Erinomainen, vahva dokumentaatio.";
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header with Evidence Meter */}
            <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm px-6 py-4">
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-6">
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Keskeytä
                    </Button>

                    <div className="flex-1">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                            <span>Todistusvoima</span>
                            <span className={cn("transition-colors", meterScore > 70 ? "text-emerald-600" : "text-slate-500")}>
                                {meterScore}%
                            </span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full transition-all duration-500 ease-out", getMeterColor(meterScore))}
                                style={{ width: `${meterScore}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
                {/* Step 1: Tactic Selection */}
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold text-slate-900">Mitä tapahtui?</h1>
                            <p className="text-slate-500">Valitse tilannetta parhaiten kuvaava palikka.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {bullyingTactics.map(tactic => (
                                <Card
                                    key={tactic.id}
                                    className={cn(
                                        "cursor-pointer transition-all hover:shadow-md border-2",
                                        selectedTactic?.id === tactic.id ? "border-indigo-600 bg-indigo-50 shadow-md" : "border-transparent hover:border-slate-200"
                                    )}
                                    onClick={() => setSelectedTactic(tactic)}
                                >
                                    <CardContent className="p-4 flex items-start gap-3">
                                        <div className="mt-1 p-2 bg-white rounded-lg shadow-sm">
                                            {/* Ideally dynamic icons, mapped by category for now */}
                                            {tactic.category === 'verbal' && <Quote className="w-5 h-5 text-indigo-500" />}
                                            {tactic.category === 'social' && <Users className="w-5 h-5 text-pink-500" />}
                                            {tactic.category === 'power' && <ShieldCheck className="w-5 h-5 text-orange-500" />}
                                            {!['verbal', 'social', 'power'].includes(tactic.category) && <User className="w-5 h-5 text-slate-500" />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">{tactic.name}</h3>
                                            <p className="text-sm text-slate-500 line-clamp-2">{tactic.definition}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Context */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold text-slate-900">Milloin ja missä?</h1>
                            <p className="text-slate-500">Tarkat tiedot lisäävät uskottavuutta.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Päivämäärä</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                        <Input
                                            type="date"
                                            className="pl-10"
                                            value={formData.date}
                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Kellonaika</Label>
                                    <Input
                                        type="time"
                                        value={formData.time}
                                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Paikka / Tilanne</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="Esim. Kahvihuone, Teams-palaveri..."
                                        className="pl-10"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Kuka oli osallisena?</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="Henkilön nimi tai titteli"
                                        className="pl-10"
                                        value={formData.person}
                                        onChange={e => setFormData({ ...formData, person: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Evidence & Impact */}
                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold text-slate-900">Mitä tapahtui?</h1>
                            <p className="text-slate-500">Kuvaile omin sanoin tai lainaa suoraan.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                            <div className="space-y-2">
                                <Label className="flex justify-between">
                                    Kuvaus
                                    <span className="text-xs text-slate-400 font-normal">Sitaatit nostavat todistusarvoa</span>
                                </Label>
                                <Textarea
                                    placeholder="Kerro mitä sanottiin tai tehtiin. Jos muistat tarkan lauseen, laita se lainausmerkkeihin."
                                    className="min-h-[120px]"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <Label>Intensiteetti (1-5)</Label>
                                <div className="px-2">
                                    <Slider
                                        min={1}
                                        max={5}
                                        step={1}
                                        value={formData.intensity}
                                        onValueChange={val => setFormData({ ...formData, intensity: val })}
                                        className="py-4"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 uppercase font-bold tracking-wider">
                                        <span>Lievä</span>
                                        <span>Kohtalainen</span>
                                        <span className="text-rose-500">Vakava</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Oliko todistajia?</Label>
                                <Input
                                    placeholder="Nimet tai 'Ei todistajia'"
                                    value={formData.witnesses}
                                    onChange={e => setFormData({ ...formData, witnesses: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="block mb-2">Onko muuta todistusaineistoa?</Label>
                                <div className="flex flex-wrap gap-2">
                                    {['Sähköposti', 'Teams/Slack', 'SMS', 'Äänite'].map(type => (
                                        <Badge
                                            key={type}
                                            variant={formData.evidenceType.includes(type) ? "default" : "outline"}
                                            className="cursor-pointer py-2 px-3 hover:bg-slate-100"
                                            onClick={() => toggleEvidenceType(type)}
                                        >
                                            {formData.evidenceType.includes(type) && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                            {type}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Summary */}
                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold text-slate-900">Yhteenveto</h1>
                            <p className="text-slate-500">Tarkista tiedot ennen tallennusta.</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className={cn("p-4 text-white flex items-center justify-between", getMeterColor(meterScore))}>
                                <div className="font-bold flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5" />
                                    Todistusvoima: {meterScore}%
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <p className="text-sm font-medium text-slate-600 italic">
                                    "{getMeterFeedback(meterScore)}"
                                </p>

                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-slate-400 block text-xs uppercase">Tapahtuma</span>
                                            <span className="font-bold text-slate-900">{selectedTactic?.name}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 block text-xs uppercase">Aika</span>
                                            <span className="font-bold text-slate-900">{formData.date} klo {formData.time}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 block text-xs uppercase">Paikka</span>
                                            <span className="font-bold text-slate-900">{formData.location || "-"}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 block text-xs uppercase">Henkilöt</span>
                                            <span className="font-bold text-slate-900">{formData.person || "-"}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-xs uppercase mb-1">Kuvaus</span>
                                        <p className="text-slate-700 bg-slate-50 p-3 rounded-lg text-sm">
                                            {formData.description || "Ei kuvausta."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                    {step > 1 ? (
                        <Button variant="outline" onClick={handleBack} className="w-32">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Takaisin
                        </Button>
                    ) : (
                        <div /> // Spacer
                    )}

                    {step < 4 ? (
                        <Button
                            onClick={handleNext}
                            disabled={step === 1 && !selectedTactic}
                            className="w-32 bg-indigo-600 hover:bg-indigo-700 font-bold"
                        >
                            Seuraava <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSave}
                            className="w-40 bg-emerald-600 hover:bg-emerald-700 font-bold text-white shadow-lg shadow-emerald-200"
                        >
                            Tallenna <Save className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                </div>
            </main>
        </div>
    );
}
