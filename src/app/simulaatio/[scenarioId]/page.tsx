"use client";

import { notFound, useRouter, useParams } from "next/navigation";
import { GameEngine } from "@/components/simulator/GameEngine";
import { getSimulationConfig } from "@/lib/simulator/registry";

export default function SimulationPage() {
    const params = useParams();
    const router = useRouter();

    const scenarioId = params.scenarioId as string;
    const config = getSimulationConfig(scenarioId);

    if (!config) {
        notFound();
    }

    return (
        <GameEngine
            scenario={config.scenario}
            initialPhaseId="START"
            onExit={() => router.push(config.exitPath)}
            profession={config.profession}
            statLabels={config.statLabels}
        />
    );
}
