"use client";

import { useRouter } from "next/navigation";
import { GameEngine } from "@/components/simulator/GameEngine";
import { NEURO_SCENARIO } from "@/lib/simulator/scenarios/neurodivergent";
import { Battery, Target, Heart, Users } from "lucide-react";

export default function NeuroSimulationPage() {
    const router = useRouter();

    return (
        <GameEngine
            scenario={NEURO_SCENARIO}
            initialPhaseId="START"
            onExit={() => router.push('/neuromoninaisuus')}
            profession="neuro" // Using 'neuro' theme for custom ending
            statLabels={{
                physicalHealth: {
                    label: 'Energia',
                    description: 'Aloitus: 80/100. Masking ja aistiyliherkkyys kuluttavat tätä nopeasti.'
                },
                selfEsteem: {
                    label: 'Keskittyminen',
                    description: 'Aloitus: 80/100. Melu ja keskeytykset tuhoavat flow-tilan.'
                },
                hope: {
                    label: 'Hyvinvointi',
                    description: 'Aloitus: 80/100. Koetko olevasi oma itsesi vai esitätkö roolia?'
                },
                teamAcceptance: {
                    label: 'Ymmärrys',
                    description: 'Aloitus: 60/100. Miten kollegat tulkitsevat käytöksesi?'
                }
            }}
        />
    );
}
