"use client";

import { GameEngine } from "@/components/simulator/GameEngine";
import { IT_EXPERT_SCENARIO } from "@/lib/simulator/scenarios/it_expert";
import { useRouter } from "next/navigation";

export default function ITExpertGamePage() {
    const router = useRouter();

    return (
        <GameEngine
            scenario={IT_EXPERT_SCENARIO}
            initialPhaseId="start"
            onExit={() => router.push('/simulaatio')}
        />
    );
}
