"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Zap, Save } from "lucide-react";
import { useSecureLocalStorage } from "@/hooks/useSecureLocalStorage";
import { TimelineEvent } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export function QuickLogButton() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [quickText, setQuickText] = useState("");
    const { data: events, setData: setEvents } = useSecureLocalStorage<TimelineEvent[]>("suojasiipi_events_secure", []);

    const handleSave = () => {
        if (!quickText.trim()) return;

        const newEvent: TimelineEvent = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            type: "quick_log",
            title: "Pikamerkintä",
            description: quickText,
            intensity: 3,
            emotion: "neutral",
            isQuickLog: true,
            quickLogText: quickText
        };

        setEvents([newEvent, ...events]);
        setQuickText("");
        setIsOpen(false);
    };

    const charCount = quickText.length;
    const maxChars = 280;

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-600 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 active:scale-95 group"
                aria-label="Pikamerkintä - Tallenna tapahtuma nopeasti"
            >
                <Zap className="w-6 h-6 fill-white" />
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    ⚡ Pikamerkintä
                </span>
            </button>

            {/* Quick Log Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl">
                            <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
                            Pikamerkintä
                        </DialogTitle>
                        <DialogDescription>
                            Tallenna nopea muistiinpano. Voit täydentää sen myöhemmin.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 pt-4">
                        {/* Auto timestamp */}
                        <div className="text-sm text-slate-500 flex items-center gap-2">
                            📅 {new Date().toLocaleDateString("fi-FI")} klo {new Date().toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}
                        </div>

                        {/* Quick text input */}
                        <div className="space-y-2">
                            <Label htmlFor="quick-text">Mitä tapahtui?</Label>
                            <Textarea
                                id="quick-text"
                                placeholder="Kirjoita lyhyt muistiinpano..."
                                value={quickText}
                                onChange={(e) => setQuickText(e.target.value)}
                                className="min-h-[120px] resize-none"
                                maxLength={maxChars}
                                autoFocus
                            />
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500">
                                    💡 Voit täydentää myöhemmin
                                </span>
                                <span className={`font-mono ${charCount > maxChars * 0.9 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                                    {charCount} / {maxChars}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsOpen(false);
                                    setQuickText("");
                                }}
                                className="flex-1"
                            >
                                Peruuta
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={!quickText.trim()}
                                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Tallenna pikana
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
