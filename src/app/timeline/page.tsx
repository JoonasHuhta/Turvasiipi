"use client";

import { useState, useEffect } from "react";
import { TimelineEventForm } from "@/components/TimelineEventForm";
import { TimelineList } from "@/components/TimelineList";
import { useSecureLocalStorage } from "@/hooks/useSecureLocalStorage";
import { VaultWrapper } from "@/components/VaultWrapper";
import { TimelineEvent } from "@/types";
import { Button } from "@/components/ui/button";
import { FileText, Shield } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

export default function TimelinePage() {
    const { t } = useLanguage();
    const { data: events, setData: setEvents, isLocked, hasData, unlock } = useSecureLocalStorage<TimelineEvent[]>("suojasiipi_events_secure", []);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAddEvent = (newEvent: Omit<TimelineEvent, "id">) => {
        const eventWithId = { ...newEvent, id: crypto.randomUUID() };
        setEvents([eventWithId, ...events]);
    };

    const handleDeleteEvent = (id: string) => {
        if (confirm(t('timeline.page.confirm_delete'))) {
            setEvents(events.filter(e => e.id !== id));
        }
    };

    if (!mounted) return <div className="p-10 text-center animate-pulse">{t('timeline.page.loading')}</div>;

    return (
        <div className="w-full max-w-6xl mx-auto px-6">
            <VaultWrapper isLocked={isLocked} hasData={hasData} onUnlock={unlock}>
                <div className="grid lg:grid-cols-3 gap-8 pb-20 animate-in fade-in duration-500">
                    <div className="lg:col-span-1 space-y-6">
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">{t('timeline.page.title')}</h2>
                                    <p className="text-slate-500 text-sm">{t('timeline.page.subtitle')}</p>
                                </div>
                                <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                    <Shield className="w-3 h-3" /> {t('timeline.page.status_open')}
                                </div>
                            </div>

                            <TimelineEventForm onAdd={handleAddEvent} />

                            <Card className="bg-slate-900 text-white border-none overflow-hidden rounded-3xl group shadow-xl">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl">🧩</span>
                                        <div className="space-y-1">
                                            <h4 className="font-bold leading-tight">{t('timeline.page.ai_help_title')}</h4>
                                            <p className="text-slate-400 text-sm">{t('timeline.page.ai_help_text')}</p>
                                        </div>
                                    </div>
                                    <Link href="/raportti">
                                        <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 text-white border-0">
                                            <FileText className="mr-2 h-4 w-4" /> {t('timeline.page.ai_button')}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </section>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-800">{t('timeline.page.list_title')}</h3>
                            <div className="text-sm text-slate-500">
                                {t('timeline.page.entry_count', { count: events.length })}
                            </div>
                        </div>

                        <TimelineList
                            events={events}
                            onDelete={handleDeleteEvent}
                        />
                    </div>
                </div>
            </VaultWrapper>
        </div>
    );
}
