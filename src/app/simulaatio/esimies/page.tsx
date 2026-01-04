"use client";

import { useRouter } from "next/navigation";
import { GameEngine } from "@/components/simulator/GameEngine";
import { MANAGER_SCENARIO } from "@/lib/simulator/scenarios/manager";

export default function ManagerSimulationPage() {
    const router = useRouter();

    return (
        <GameEngine
            scenario={MANAGER_SCENARIO}
            initialPhaseId="START"
            onExit={() => router.push('/simulaatio')}
            profession="manager"
        />
    );
}
