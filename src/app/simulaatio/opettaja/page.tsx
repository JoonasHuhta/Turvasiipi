"use client";

import { GameEngine } from "@/components/simulator/GameEngine";
import { TEACHER_SCENARIO } from "@/lib/simulator/scenarios/teacher";
import { useRouter } from "next/navigation";

export default function TeacherGamePage() {
    const router = useRouter();

    return (
        <GameEngine
            scenario={TEACHER_SCENARIO}
            initialPhaseId="start"
            onExit={() => router.push('/simulaatio')}
        />
    );
}
