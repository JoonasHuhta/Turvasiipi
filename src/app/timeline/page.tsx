"use client";

import { useState, useEffect } from "react";
import { TimelineEventForm } from "@/components/TimelineEventForm";
import { TimelineList } from "@/components/TimelineList";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TimelineEvent } from "@/types";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function TimelinePage() {
    const [events, setEvents] = useLocalStorage<TimelineEvent[]>("suojasiipi_events", []);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAddEvent = (newEvent: Omit<TimelineEvent, "id">) => {
        const eventWithId = { ...newEvent, id: crypto.randomUUID() };
        setEvents([eventWithId, ...events]);
    };

    const handleDeleteEvent = (id: string) => {
        if (confirm("Haluatko varmasti poistaa tämän merkinnän?")) {
            setEvents(events.filter(e => e.id !== id));
        }
    };

    if (!mounted) return <div className="p-10 text-center">Ladataan...</div>;

    return (
        <div className="grid lg:grid-cols-3 gap-8 pb-20">
            <div className="lg:col-span-1 space-y-6">
                <section className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Dokumentointi</h2>
                        <p className="text-muted-foreground">Kirjaa tapahtumat yksityiseen aikajanaan.</p>
                    </div>

                    <TimelineEventForm onAdd={handleAddEvent} />

                    <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="pt-6">
                            <div className="text-center space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Merkintöjä yhteensä</p>
                                <p className="text-4xl font-bold text-primary">{events.length}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Link href="/raportti" className={events.length === 0 ? "pointer-events-none opacity-50" : ""}>
                        <Button className="w-full gap-2" variant="secondary" size="lg" disabled={events.length === 0}>
                            <FileText className="w-4 h-4" /> Luo virallinen raportti
                        </Button>
                    </Link>
                </section>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-semibold">Aikajana</h3>
                <TimelineList events={events} onDelete={handleDeleteEvent} />
            </div>
        </div>
    );
}
