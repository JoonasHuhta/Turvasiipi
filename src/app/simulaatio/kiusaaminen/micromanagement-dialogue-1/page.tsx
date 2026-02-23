import { DialogueSimulatorPage } from '@/components/simulators/DialogueSimulatorPage';
import { micromanagementDialogueTree } from '@/components/sandbox/BullyingSimulator/scenarios/scenario2-dialogue-tree';

export default function MicromanagementSimulatorPage() {
    return <DialogueSimulatorPage scenario={micromanagementDialogueTree} />;
}
