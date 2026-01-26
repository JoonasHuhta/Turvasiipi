"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSecureLocalStorage } from "@/hooks/useSecureLocalStorage";
import { TimelineEvent } from "@/types";
import { useProgress } from "@/context/ProgressContext";
import { Tactic } from "@/types/domain";

export interface LogFormData {
    date: string;
    time: string;
    location: string;
    person: string;
    description: string;
    intensity: number[];
    witnesses: string;
    evidenceType: string[];
}

export function useLogWizard() {
    const searchParams = useSearchParams();
    const { awardBadge, addPoints } = useProgress();
    const { data: events, setData: setEvents } = useSecureLocalStorage<TimelineEvent[]>("suojasiipi_events_secure", []);

    const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
    const [selectedTactic, setSelectedTactic] = useState<Tactic | null>(null);
    const [quickLogId, setQuickLogId] = useState<string | null>(null);

    const [formData, setFormData] = useState<LogFormData>({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        location: "",
        person: "",
        description: "",
        intensity: [3],
        witnesses: "",
        evidenceType: []
    });

    const [meterScore, setMeterScore] = useState(0);

    // Initialize from Quick Log
    useEffect(() => {
        const quickLogIdParam = searchParams.get('quickLogId');
        if (quickLogIdParam && events.length > 0) {
            const quickLog = events.find(e => e.id === quickLogIdParam && e.isQuickLog);
            if (quickLog) {
                setQuickLogId(quickLogIdParam);
                setFormData(prev => ({
                    ...prev,
                    description: quickLog.quickLogText || quickLog.description,
                    date: new Date(quickLog.timestamp).toISOString().split('T')[0],
                    time: new Date(quickLog.timestamp).toTimeString().slice(0, 5)
                }));
            }
        }
    }, [searchParams, events]);

    // Calculate Evidence Score
    useEffect(() => {
        let score = 0;
        if (selectedTactic) score += 20;
        if (formData.date && formData.time) score += 10;
        if (formData.location) score += 10;
        if (formData.person) score += 10;
        if (formData.description.length > 10) score += 10;
        if (formData.description.includes('"')) score += 10;
        if (formData.witnesses) score += 20;
        if (formData.evidenceType.length > 0) score += 10;

        setMeterScore(Math.min(100, score));
    }, [formData, selectedTactic]);

    // Navigation Handlers
    const nextStep = () => setStep(prev => Math.min(4, prev + 1) as any);
    const prevStep = () => setStep(prev => Math.max(0, prev - 1) as any);
    const goToStep = (s: number) => setStep(s as any);

    const updateFormData = (updates: Partial<LogFormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
    };

    const toggleEvidenceType = (type: string) => {
        setFormData(prev => ({
            ...prev,
            evidenceType: prev.evidenceType.includes(type)
                ? prev.evidenceType.filter(t => t !== type)
                : [...prev.evidenceType, type]
        }));
    };

    const saveLog = () => {
        if (!selectedTactic) return;

        const commonData = {
            type: selectedTactic.category,
            title: selectedTactic.name,
            description: formData.description,
            intensity: formData.intensity[0],
            notes: `Paikka: ${formData.location}\nHenkilöt: ${formData.person}\nTodistajat: ${formData.witnesses}\nTodisteet: ${formData.evidenceType.join(", ")}`,
            peopleInvolved: formData.person,
        };

        if (quickLogId) {
            // Update existing quick log
            const updatedEvents = events.map(e => {
                if (e.id === quickLogId) {
                    return {
                        ...e,
                        ...commonData,
                        isQuickLog: false,
                        completedAt: new Date().toISOString()
                    };
                }
                return e;
            });
            setEvents(updatedEvents);
        } else {
            // Create new event
            const newEvent: TimelineEvent = {
                id: crypto.randomUUID(),
                timestamp: new Date(`${formData.date}T${formData.time}`).toISOString(),
                ...commonData as any, // casting because commonData is partial match
                emotion: "neutral",
            };
            setEvents([newEvent, ...events]);
        }

        // Gamification
        awardBadge('doc_start');
        addPoints(20);

        setStep(5); // Move to advice step
    };

    return {
        step,
        formData,
        selectedTactic,
        meterScore,
        quickLogId,
        nextStep,
        prevStep,
        goToStep,
        updateFormData,
        setSelectedTactic,
        toggleEvidenceType,
        saveLog
    };
}
