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
const SomaticRelease = dynamic(() => import("@/components/training/SomaticRelease"));
const BystanderTheory = dynamic(() => import("@/components/training/BystanderTheory"));
const GaslightingMechanisms = dynamic(() => import("@/components/training/GaslightingMechanisms")); // New module
const ActionProtocols = dynamic(() => import("@/components/training/ActionProtocols").then(m => m.ActionProtocols));
const DifficultConversations = dynamic(() => import("@/components/training/DifficultConversations").then(m => m.DifficultConversations));
const MoralLabyrinth = dynamic(() => import("@/components/training/MoralLabyrinth").then(m => m.MoralLabyrinth));
const RecoveryWellbeing = dynamic(() => import("@/components/training/RecoveryWellbeing").then(m => m.RecoveryWellbeing));
const TraumaBrain = dynamic(() => import("@/components/training/TraumaBrain")); // New module
const DefaultModeNetwork = dynamic(() => import("@/components/training/DefaultModeNetwork")); // New module
const LiteracyModule = dynamic(() => import("@/components/training/LiteracyModule")); // New module
const MindfulnessGrounding = dynamic(() => import("@/components/training/MindfulnessGrounding")); // New module
const BoundariesModule = dynamic(() => import("@/components/training/BoundariesModule")); // New module
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
    'boundaries': BoundariesModule,
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
    'somatic': SomaticRelease,
    'action_protocols': ActionProtocols,
    'conversations': DifficultConversations,

    // Understand
    'basic': LiteracyModule,
    'ostrakismi_toolkit': OstracismToolkit,
    'bystander_effect': BystanderTheory,
    'pluralistic_ignorance': BystanderTheory,
    'gaslighting_mechanisms': GaslightingMechanisms,

    // Recovery
    'recovery_main': RecoveryWellbeing,
    'trauma_brain': TraumaBrain,
    'dmn': DefaultModeNetwork,
    'mindfulness': MindfulnessGrounding,

    // Organization
    'org_knowledge': OrganizationResources,

    // Progress
    'cert_view': CertificatesModule
};

export function getModuleComponent(moduleId: string): ComponentType<any> | null {
    return ModuleRegistry[moduleId] || null;
}
