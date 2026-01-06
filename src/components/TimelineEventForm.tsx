import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TimelineEvent, Emotion } from "@/types";
import { Frown, Meh, AlertCircle, Angry, Plus, MapPin, ShieldCheck, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineEventFormProps {
    onAdd: (event: Omit<TimelineEvent, "id">) => void;
}

const emotions: { value: Emotion; label: string; icon: React.ReactNode; color: string }[] = [
    { value: "neutral", label: "Neutraali", icon: <Meh className="w-5 h-5" />, color: "bg-gray-100 hover:bg-gray-200 border-gray-200" },
    { value: "sad", label: "Surullinen", icon: <Frown className="w-5 h-5" />, color: "bg-blue-100 hover:bg-blue-200 border-blue-200" },
    { value: "anxious", label: "Ahdistunut", icon: <AlertCircle className="w-5 h-5" />, color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-200" },
    { value: "fearful", label: "Pelokas", icon: <AlertCircle className="w-5 h-5" />, color: "bg-purple-100 hover:bg-purple-200 border-purple-200 dashed" },
    { value: "angry", label: "Vihainen", icon: <Angry className="w-5 h-5" />, color: "bg-red-100 hover:bg-red-200 border-red-200" },
];

export function TimelineEventForm({ onAdd }: TimelineEventFormProps) {
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

    const bullyingTypes = [
        "Ulkopuolelle jättäminen",
        "Epäasiallinen puhe",
        "Työn haitallinen rajoittaminen",
        "Aseman väärinkäyttö",
        "Digitaalinen häirintä"
    ];

    const evidenceOptions = [
        "Ei todisteita",
        "Sähköposti",
        "Teams/Slack-viesti",
        "SMS/WhatsApp",
        "Valokuva/Screenshot",
        "Äänite",
        "Silminnäkijä"
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
                    <CardTitle className="text-xl text-slate-800">Kirjaa uusi tapahtuma</CardTitle>
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
                                    <span className="font-bold block mb-1">Vaihe 1/3: Faktat</span>
                                    Kirjaa milloin ja missä tilanne tapahtui. Tämä on tärkeää juridisesta näkökulmasta.
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="date">Ajankohta</Label>
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
                                <Label htmlFor="people">Keitä oli paikalla? (Todistajat)</Label>
                                <Input
                                    id="people"
                                    placeholder="Nimet tai tittelit"
                                    value={people}
                                    onChange={(e) => setPeople(e.target.value)}
                                    className="h-12 border-slate-200"
                                />
                            </div>

                            <Button type="button" onClick={nextStep} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl mt-4">
                                Seuraava: Mitä tapahtui?
                            </Button>
                        </div>
                    )}

                    {/* STEP 2: OBJEKTIIVINEN KUVAUS */}
                    {step === 2 && (
                        <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 text-amber-900 text-sm flex gap-3">
                                <ShieldCheck className="w-5 h-5 shrink-0 text-amber-500" />
                                <div>
                                    <span className="font-bold block mb-1">Vaihe 2/3: Objektiivinen havainto</span>
                                    Kirjaa vain se, mitä näit tai kuulit. Vältä tulkintoja ("Hän vihaa minua").
                                    <br /><i className="text-xs text-amber-700/80">Esimerkki: "X korotti ääntään" (ei "X raivosi").</i>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label>Tapahtuman tyyppi</Label>
                                <div className="flex flex-wrap gap-2">
                                    {bullyingTypes.map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => {
                                                setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
                                            }}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedTypes.includes(type)
                                                ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                                                : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="objective">Mitä tapahtui?</Label>
                                <Textarea
                                    id="objective"
                                    placeholder="Kuvaile tilanne mahdollisimman tarkasti..."
                                    value={objectiveDescription}
                                    onChange={(e) => setObjectiveDescription(e.target.value)}
                                    required
                                    className="min-h-[120px] border-slate-200 text-base"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Onko tilanteesta todistusaineistoa?</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={evidence}
                                    onChange={(e) => setEvidence(e.target.value)}
                                >
                                    <option value="">Ei todisteita</option>
                                    {evidenceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12">Takaisin</Button>
                                <Button type="button" onClick={nextStep} className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
                                    Seuraava: Vaikutus
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
                                    <span className="font-bold block mb-1">Vaihe 3/3: Vaikutus sinuun</span>
                                    Miltä tämä tuntui? Miten se vaikutti työkykyysi? Tämä tieto on tärkeää työterveydelle.
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label>Vaikutus ja tuntemukset</Label>
                                <Textarea
                                    placeholder="Esim. Ahdisti, en pystynyt keskittymään, univaikeudet..."
                                    value={subjectiveEffect}
                                    onChange={(e) => setSubjectiveEffect(e.target.value)}
                                    className="min-h-[100px] border-slate-200"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Tunnetila (Pikavalinta)</Label>
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
                                    <span>Koettu kuormittavuus</span>
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
                                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12">Takaisin</Button>
                                <Button type="submit" className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200">
                                    <Plus className="w-5 h-5 mr-2" /> Tallenna merkintä
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
                                <h3 className="font-bold text-lg mb-1">Tallennettu turvaan.</h3>
                                <p className="text-emerald-100/80 text-sm leading-relaxed">
                                    Olet ottanut askeleen kohti selkeyttä. Tämä tieto on nyt sinun hallinnassasi, eikä kukaan voi vääristellä sitä.
                                </p>
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
