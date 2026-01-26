"use client";

import { notFound, useRouter, useParams } from "next/navigation";
import { GameEngine } from "@/components/simulator/GameEngine";
// LOCKED: DO NOT EDIT WITHOUT EXPLICIT PERMISSION
import { getSimulationConfig } from "@/lib/simulator/registry";
import { useLanguage } from "@/context/LanguageContext";

export default function SimulationPage() {
    const params = useParams();
    const router = useRouter();
    const { language } = useLanguage();

    const scenarioId = params.scenarioId as string;
    const config = getSimulationConfig(scenarioId, language);

    if (!config) {
        notFound();
    }

    return (
        <GameEngine
            scenario={config.scenario}
            initialPhaseId="start"
            onExit={() => router.push(config.exitPath)}
            profession={config.profession}
            statLabels={config.statLabels}
        />
    );
}
