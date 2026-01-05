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
            statConfig={[
                { id: "selfEsteem", label: "Ammatillinen itsetunto", description: "Oma kokemus pystyvyydestä ja arvosta.", icon: Shield, color: "bg-indigo-500" },
                { id: "hope", label: "Tulevaisuususko", description: "Luottamus siihen, että asiat järjestyvät.", icon: Smile, color: "bg-emerald-500" },
                { id: "physicalHealth", label: "Fyysinen jaksaminen", description: "Unen ja palautumisen taso.", icon: Battery, color: "bg-rose-500" },
                { id: "teamAcceptance", label: "Tiimin hyväksyntä", description: "Kuulumisen tunne työyhteisöön.", icon: User, color: "bg-amber-500" },
            ]}
        />
    );
}
