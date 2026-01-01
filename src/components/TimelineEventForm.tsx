import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TimelineEvent, Emotion } from "@/types";
import { Frown, Meh, AlertCircle, Angry, Plus, MapPin, Building2, ShieldCheck, Info } from "lucide-react";
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
    const [description, setDescription] = useState("");
    const [people, setPeople] = useState("");
    const [date, setDate] = useState(new Date().toISOString().slice(0, 16)); // Default to now
    const [selectedEmotion, setSelectedEmotion] = useState<Emotion>("neutral");

    // Metadata state
    const [city, setCity] = useState("");
    const [industry, setIndustry] = useState("");
    const [severity, setSeverity] = useState(5);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const bullyingTypes = [
        "Ulkopuolelle jättäminen",
        "Epäasiallinen puhe",
        "Työn haitallinen rajoittaminen",
        "Aseman väärinkäyttö",
        "Digitaalinen häirintä"
    ];

    const industries = ["Sote", "IT", "Opetus", "Teollisuus", "Kauppa", "Hallinto", "Muu"];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description) return;

        onAdd({
            timestamp: new Date(date).toISOString(),
            date: new Date(date).toLocaleDateString("fi-FI"),
            description,
            peopleInvolved: people,
            emotion: selectedEmotion,
            city,
            industry,
            severity,
            bullyingTypes: selectedTypes,
        });

        setDescription("");
        setPeople("");
        setDate(new Date().toISOString().slice(0, 16));
        setSelectedEmotion("neutral");
        // Reset metadata
        setCity("");
        setIndustry("");
        setSeverity(5);
        setSelectedTypes([]);

        // Show success/impact message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 8000);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Kirjaa uusi tapahtuma</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="date">Ajankohta</Label>
                        <Input
                            id="date"
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="emotion">Tunnetila</Label>
                        <div className="flex flex-wrap gap-2">
                            {emotions.map((emo) => (
                                <button
                                    key={emo.value}
                                    type="button"
                                    onClick={() => setSelectedEmotion(emo.value)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${selectedEmotion === emo.value
                                        ? "border-primary ring-2 ring-primary/20"
                                        : "border-transparent " + emo.color
                                        }`}
                                >
                                    {emo.icon}
                                    <span className="text-sm font-medium">{emo.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Mitä tapahtui?</Label>
                        <Textarea
                            id="description"
                            placeholder="Kuvaile tilanne omin sanoin..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="people">Keitä oli paikalla?</Label>
                        <Input
                            id="people"
                            placeholder="Nimet, tittelit tai 'ei muita'"
                            value={people}
                            onChange={(e) => setPeople(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-dashed">
                        <div className="flex items-center gap-2 text-primary">
                            <Info className="w-4 h-4" />
                            <h3 className="font-semibold text-sm">Sääkartta-tiedot (Anonyymi tilastointi)</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="city" className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Kaupunki
                                </Label>
                                <Input
                                    id="city"
                                    placeholder="Esim. Helsinki"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="industry" className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" /> Toimiala
                                </Label>
                                <select
                                    id="industry"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                >
                                    <option value="">Valitse ala...</option>
                                    {industries.map(ind => (
                                        <option key={ind} value={ind}>{ind}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label className="flex justify-between">
                                <span>Tilanteen vakavuus</span>
                                <span className="font-bold text-primary">{severity}/10</span>
                            </Label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={severity}
                                onChange={(e) => setSeverity(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Kiusaamisen tyyppi (valitse vähintään yksi)</Label>
                            <div className="flex flex-wrap gap-2">
                                {bullyingTypes.map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => {
                                            setSelectedTypes(prev =>
                                                prev.includes(type)
                                                    ? prev.filter(t => t !== type)
                                                    : [...prev, type]
                                            );
                                        }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedTypes.includes(type)
                                                ? "bg-primary text-white"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {showSuccess && (
                        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl space-y-2 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center gap-2 text-emerald-700 font-bold">
                                <ShieldCheck className="w-5 h-5" />
                                <h3>Olet ollut rohkea.</h3>
                            </div>
                            <p className="text-emerald-600 text-sm leading-relaxed">
                                Merkintäsi on nyt tallennettu turvaan. Samalla olet auttanut tekemään epäkohdat näkyväksi anonyymisti. Et ole yksin – yhdessä teemme suomalaisesta työelämästä reilumpaa kaikille.
                            </p>
                        </div>
                    )}

                    <Button type="submit" className="w-full gap-2 h-12 text-lg shadow-lg shadow-primary/20">
                        <Plus className="w-5 h-5" /> Tallenna merkintä
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
