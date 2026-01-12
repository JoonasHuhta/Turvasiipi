"use client";

import { GameEngine } from "@/components/simulator/GameEngine";
import { INFORMATION_SHADOW_SCENARIO } from "@/lib/simulator/scenarios/information_shadow";

export default function InformationShadowPage() {
    return (
        <GameEngine
            scenario={INFORMATION_SHADOW_SCENARIO}
            profession="information_shadow"
            initialPhaseId="START"
            onExit={() => window.location.href = '/simulaatio'}
            statLabels={{
                physicalHealth: {
                    label: "Energia",
                    description: "Sosiaalinen ja kognitiivinen jaksaminen."
                },
                selfEsteem: {
                    label: "Itsevarmuus",
                    description: "Tunne ammatillisesta osaamisesta."
                },
                teamAcceptance: {
                    label: "Informaatiovirta",
                    description: "Kuinka hyvin olet perillä asioista."
                },
                hope: {
                    label: "Toivo",
                    description: "Uskosi oikeudenmukaiseen kohteluun."
                }
            }}
        />
    );
}
