"use client";

import { GameEngine } from "@/components/simulator/GameEngine";
import { PERFORMANCE_TRAP_SCENARIO } from "@/lib/simulator/scenarios/performance_trap";

export default function PerformanceTrapPage() {
    return (
        <GameEngine
            scenario={PERFORMANCE_TRAP_SCENARIO}
            profession="performance_trap"
            initialPhaseId="START"
            onExit={() => window.location.href = '/simulaatio'}
            statLabels={{
                physicalHealth: {
                    label: "Energia (Spoon Theory)",
                    description: "Hermoston säästötila. Jos tämä loppuu, uuvut."
                },
                selfEsteem: {
                    label: "Fokus / Luottamus",
                    description: "Kykysi keskittyä työhön paineen alla."
                },
                teamAcceptance: {
                    label: "Ulkopuolinen ymmärrys",
                    description: "Miten tiimi ja esimies tulkitsevat toimintaasi."
                },
                hope: {
                    label: "Toivo / Toimijuus",
                    description: "Uskosi siihen, että voit vaikuttaa tilanteeseen."
                }
            }}
        />
    );
}
