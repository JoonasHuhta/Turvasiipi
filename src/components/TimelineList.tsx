import { TimelineEvent } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Frown, Meh, AlertCircle, Angry, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface TimelineListProps {
    events: TimelineEvent[];
    onDelete: (id: string) => void;
}

export function TimelineList({ events, onDelete }: TimelineListProps) {
    if (events.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground bg-secondary/20 rounded-lg">
                <p>Ei merkintöjä vielä. Aloita kirjaamalla ensimmäinen tapahtuma.</p>
            </div>
        );
    }

    // Helper for emotion icon
    const getIcon = (emotion: string) => {
        switch (emotion) {
            case "sad": return <Frown className="w-5 h-5 text-blue-500" />;
            case "anxious": return <AlertCircle className="w-5 h-5 text-yellow-500" />;
            case "fearful": return <AlertCircle className="w-5 h-5 text-purple-500" />;
            case "angry": return <Angry className="w-5 h-5 text-red-500" />;
            default: return <Meh className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-4">
            {events.map((event) => (
                <Card key={event.id} className="relative overflow-hidden transition-all hover:shadow-md">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${event.emotion === 'angry' ? 'bg-red-400' :
                        event.emotion === 'sad' ? 'bg-blue-400' :
                            event.emotion === 'anxious' ? 'bg-yellow-400' :
                                event.emotion === 'fearful' ? 'bg-purple-400' : 'bg-gray-400'
                        }`} />
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-medium flex items-center gap-2">
                                    {getIcon(event.emotion)}
                                    {new Date(event.timestamp).toLocaleString("fi-FI", {
                                        weekday: 'short',
                                        day: 'numeric',
                                        month: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">Paikalla: {event.peopleInvolved || "Ei muita"}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => onDelete(event.id)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{event.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
