"use client";

import { GameEngine } from "@/components/simulator/GameEngine";
import { YOUTH_SCENARIO } from "@/lib/simulator/scenarios/youth";
import { useLanguage } from "@/context/LanguageContext";

export default function YouthSimulationPage() {
    const { t } = useLanguage();

    return (
        <GameEngine
            scenario={YOUTH_SCENARIO}
            initialPhaseId="START"
            onExit={() => window.location.href = '/nuoret'}
            profession="youth"
            statLabels={{
                selfEsteem: {
                    label: t('simulation_youth.stats.self_esteem.label'),
                    description: t('simulation_youth.stats.self_esteem.desc')
                },
                hope: {
                    label: t('simulation_youth.stats.hope.label'),
                    description: t('simulation_youth.stats.hope.desc')
                },
                physicalHealth: {
                    label: t('simulation_youth.stats.health.label'),
                    description: t('simulation_youth.stats.health.desc')
                },
                teamAcceptance: {
                    label: t('simulation_youth.stats.acceptance.label'),
                    description: t('simulation_youth.stats.acceptance.desc')
                },
            }}
        />
    );
}
