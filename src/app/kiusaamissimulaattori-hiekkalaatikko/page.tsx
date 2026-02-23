'use client';

import React from 'react';
import { SimulatorCore } from '@/components/sandbox/BullyingSimulator/SimulatorCore';
import { isolationDialogueTree } from '@/components/sandbox/BullyingSimulator/scenarios/scenario1-dialogue-tree';
import { micromanagementDialogueTree } from '@/components/sandbox/BullyingSimulator/scenarios/scenario2-dialogue-tree';
import { bystanderDialogueTree } from '@/components/sandbox/BullyingSimulator/scenarios/scenario3-dialogue-tree';
import { biffEmailScenario } from '@/components/sandbox/BullyingSimulator/scenarios/scenario4-biff-demo';

/**
 * Workplace Bullying Simulator - Sandbox Page
 * Completely isolated from the main application
 * NOW WITH DIALOGUE TREE SYSTEM!
 */
export default function BullyingSimulatorSandbox() {
    const scenarios = [
        isolationDialogueTree,
        micromanagementDialogueTree,
        bystanderDialogueTree,
        biffEmailScenario
    ];

    return <SimulatorCore scenarios={scenarios} />;
}
