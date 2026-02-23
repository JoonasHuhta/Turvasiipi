import { DialogueSimulatorPage } from '@/components/simulators/DialogueSimulatorPage';
import { biffEmailScenario } from '@/components/sandbox/BullyingSimulator/scenarios/scenario4-biff-demo';

export default function BiffSimulatorPage() {
    return <DialogueSimulatorPage scenario={biffEmailScenario} />;
}
