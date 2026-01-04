"use client";

import { GameEngine } from "@/components/simulator/GameEngine";
import { NURSE_SCENARIO } from "@/lib/simulator/scenarios/nurse";
import { useRouter } from "next/navigation";

export default function NurseGamePage() {
    const router = useRouter();

    return (
        <GameEngine
            scenario={NURSE_SCENARIO}
            initialPhaseId="start"
            onExit={() => router.push('/simulaatio')}
        />
    );
}
