import dynamic from "next/dynamic";
import { ComponentType } from "react";

// Lazy load components to improve performance
const RTWWizard = dynamic(() => import("@/components/training/RTWWizard").then(m => m.RTWWizard));
const AssociationSimulation = dynamic(() => import("@/components/training/AssociationSimulation"));
const BystanderSimulation = dynamic(() => import("@/components/training/BystanderSimulation"));
const BystanderMasterclass = dynamic(() => import("@/components/training/BystanderMasterclass")); // New 4-stage module
const OstracismToolkit = dynamic(() => import("@/components/training/OstracismToolkit"));
const ExitStrategy = dynamic(() => import("@/components/training/ExitStrategy").then(m => m.ExitStrategy));
const SafetyRestoration = dynamic(() => import("@/components/training/SafetyRestoration").then(m => m.SafetyRestoration));
const ActionProtocols = dynamic(() => import("@/components/training/ActionProtocols").then(m => m.ActionProtocols));
const DifficultConversations = dynamic(() => import("@/components/training/DifficultConversations").then(m => m.DifficultConversations));
const MoralLabyrinth = dynamic(() => import("@/components/training/MoralLabyrinth").then(m => m.MoralLabyrinth));
const RecoveryWellbeing = dynamic(() => import("@/components/training/RecoveryWellbeing").then(m => m.RecoveryWellbeing));
const OrganizationResources = dynamic(() => import("@/components/training/OrganizationResources").then(m => m.OrganizationResources));
const CertificatesModule = dynamic(() => import("@/components/training/CertificatesModule").then(m => m.CertificatesModule));

// Common props that every module receives
export interface ModuleProps {
    moduleId: string;
    onComplete: () => void;
    onExit: () => void;
}

// Registry mapping module IDs to Components
export const ModuleRegistry: Record<string, ComponentType<any>> = {
    // Return & Re-orientation
    'path_12_week': RTWWizard,
    'association_basics': AssociationSimulation,
    'hobby_boundaries': AssociationSimulation,
    'transferable_skills': AssociationSimulation,

    // Interactive Skills
    'empathy': BystanderSimulation, // Classic scenario-based simulation
    'bystander': BystanderMasterclass, // New 4-stage 5D masterclass
    'labyrinth': MoralLabyrinth,

    // Acute Help
    'exit_strategy': ExitStrategy,
    'safety': SafetyRestoration,
    'action_protocols': ActionProtocols,
    'conversations': DifficultConversations,

    // Understand
    'ostrakismi_toolkit': OstracismToolkit,
    // Note: 'basic' (Literacy) is handled separately currently, but could be added here if componentized

    // Recovery
    'recovery_main': RecoveryWellbeing,

    // Organization
    'org_knowledge': OrganizationResources,

    // Progress
    'cert_view': CertificatesModule
};

export function getModuleComponent(moduleId: string): ComponentType<any> | null {
    return ModuleRegistry[moduleId] || null;
}
