"use client";

import { GameEngine } from "@/components/simulator/GameEngine";
import { YOUTH_SCENARIO } from "@/lib/simulator/scenarios/youth";
import { Brain, Heart, Briefcase, Smile, Battery, Zap, Shield, User } from "lucide-react";

export default function YouthSimulationPage() {
    return (
        <GameEngine
            scenario={YOUTH_SCENARIO}
            initialPhaseId="START"
            onExit={() => window.location.href = '/nuoret'}
            profession="youth"
            statLabels={{
                selfEsteem: { label: "Ammatillinen itsetunto", description: "Oma kokemus pystyvyydestä ja arvosta." },
                hope: { label: "Tulevaisuususko", description: "Luottamus siihen, että asiat järjestyvät." },
                physicalHealth: { label: "Fyysinen jaksaminen", description: "Unen ja palautumisen taso." },
                teamAcceptance: { label: "Tiimin hyväksyntä", description: "Kuulumisen tunne työyhteisöön." },
            }}
        />
    );
}
