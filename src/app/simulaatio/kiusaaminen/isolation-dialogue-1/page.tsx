import { DialogueSimulatorPage } from '@/components/simulators/DialogueSimulatorPage';
import { isolationDialogueTree } from '@/components/sandbox/BullyingSimulator/scenarios/scenario1-dialogue-tree';

export default function IsolationSimulatorPage() {
    return <DialogueSimulatorPage scenario={isolationDialogueTree} />;
}
