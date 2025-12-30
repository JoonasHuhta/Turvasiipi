"use client";

import { useState, useEffect } from "react";
import { TimelineEvent } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileText, Printer, ArrowLeft, Wand2, Loader2 } from "lucide-react";
import Link from "next/link";
import { generateReportAction } from "@/actions/generateReport";

export default function ReportPage() {
    const [events] = useLocalStorage<TimelineEvent[]>("suojasiipi_events", []);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [generatedEvents, setGeneratedEvents] = useState<TimelineEvent[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [reportGenerated, setReportGenerated] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Select all by default
        if (events.length > 0) {
            setSelectedIds(new Set(events.map(e => e.id)));
        }
    }, [events]);

    const toggleSelection = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const generateReport = async () => {
        setIsLoading(true);
        try {
            const selected = events.filter(e => selectedIds.has(e.id)).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

            const result = await generateReportAction(selected);
            setGeneratedEvents(result);
            setReportGenerated(true);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
        } catch (error) {
            console.error(error);
            alert("Raportin luonti epäonnistui. Yritä myöhemmin uudelleen.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (!mounted) return null;

    if (reportGenerated) {
        return (
            <div className="space-y-8 pb-20">
                <div className="print:hidden flex justify-between items-center bg-secondary/20 p-4 rounded-lg">
                    <Button variant="ghost" onClick={() => setReportGenerated(false)} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Takaisin valintaan
                    </Button>
                    <Button onClick={handlePrint} className="gap-2">
                        <Printer className="w-4 h-4" /> Tulosta / Tallenna PDF
                    </Button>
                </div>

                <div className="max-w-3xl mx-auto bg-white text-black p-12 shadow-lg min-h-[29.7cm] print:shadow-none print:p-0 print:w-full">
                    <div className="space-y-8">
                        <div className="text-center border-b-2 border-black pb-8">
                            <h1 className="text-2xl font-bold uppercase tracking-wider mb-4">
                                Ilmoitus työturvallisuuslain mukaisesta epäasiallisesta kohtelusta
                            </h1>
                            <p className="text-sm">
                                Luottamuksellinen
                            </p>
                            <p className="text-sm">
                                Päiväys: {new Date().toLocaleDateString("fi-FI")}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-2">1. Lainsäädäntöviittaus</h2>
                            <p className="text-sm leading-relaxed text-justify">
                                Tämä ilmoitus koskee Työturvallisuuslain (738/2002) 28 §:n mukaista häirintää ja epäasiallista kohtelua.
                                Lain mukaan työnantajan on saatuaan tiedon työntekijään kohdistuvasta häirinnästä ryhdyttävä toimiin epäkohdan poistamiseksi.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-2">2. Tapahtumakuvaus</h2>
                            <div className="space-y-6">
                                {generatedEvents.map((event, index) => (
                                    <div key={event.id} className="grid grid-cols-[120px_1fr] gap-4 text-sm">
                                        <div className="font-semibold text-gray-600">
                                            {new Date(event.timestamp).toLocaleDateString("fi-FI")}
                                            <br />
                                            <span className="text-xs font-normal">klo {new Date(event.timestamp).toLocaleTimeString("fi-FI", { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="whitespace-pre-wrap">{event.description}</p>
                                            {event.peopleInvolved && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Osalliset: {event.peopleInvolved}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-12 mt-12 border-t border-gray-300">
                            <div className="flex justify-between items-end h-20">
                                <div className="w-1/3 border-t border-black pt-2 text-center text-sm">
                                    Allekirjoitus
                                </div>
                                <div className="w-1/3 border-t border-black pt-2 text-center text-sm">
                                    Nimenselvennys
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Luo raportti</h2>
                <p className="text-muted-foreground">Valitse tapahtumat, jotka haluat sisällyttää viralliseen raporttiin.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Valitut merkinnät ({selectedIds.size})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {events.length === 0 ? (
                        <p className="text-sm text-muted-foreground p-4">Ei merkintöjä. Lisää tapahtumia aikajanalle ensin.</p>
                    ) : (
                        <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
                            {events.map((event) => (
                                <div key={event.id} className="flex items-start space-x-3 p-3 bg-secondary/10 rounded-md border">
                                    <Checkbox
                                        id={event.id}
                                        checked={selectedIds.has(event.id)}
                                        onCheckedChange={() => toggleSelection(event.id)}
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <Label htmlFor={event.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            {new Date(event.timestamp).toLocaleDateString("fi-FI")} - {event.description.slice(0, 50)}...
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            {event.peopleInvolved || "Ei muita"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Button
                        className="w-full gap-2 mt-4"
                        size="lg"
                        onClick={generateReport}
                        disabled={selectedIds.size === 0 || isLoading}
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                        {isLoading ? "Generoidaan..." : "Generoi raportti (AI)"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        Tekoäly muotoilee tekstin neutraaliksi virallista käyttöä varten.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
