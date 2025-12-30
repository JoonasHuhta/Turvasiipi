import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TimelineEvent, Emotion } from "@/types";
import { Frown, Meh, AlertCircle, Angry, Plus } from "lucide-react";
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description) return;

        onAdd({
            timestamp: new Date(date).toISOString(),
            date: new Date(date).toLocaleDateString("fi-FI"),
            description,
            peopleInvolved: people,
            emotion: selectedEmotion,
        });

        setDescription("");
        setPeople("");
        setDate(new Date().toISOString().slice(0, 16));
        setSelectedEmotion("neutral");
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

                    <Button type="submit" className="w-full gap-2">
                        <Plus className="w-4 h-4" /> Tallenna merkintä
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
