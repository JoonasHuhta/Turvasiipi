import { DialogueSimulatorPage } from '@/components/simulators/DialogueSimulatorPage';
import { bystanderDialogueTree } from '@/components/sandbox/BullyingSimulator/scenarios/scenario3-dialogue-tree';

export default function BystanderSimulatorPage() {
    return <DialogueSimulatorPage scenario={bystanderDialogueTree} />;
}
