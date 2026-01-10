"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Shield,
    Users,
    ClipboardCheck,
    Heart,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Clock,
    Monitor,
    FileText,
    Info,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Step {
    id: string;
    title: string;
    description: string;
    icon: any;
    tasks: { id: string; text: string; description?: string }[];
}

const STEPS: Step[] = [
    {
        id: 'prep',
        title: '1. Ennen paluuta',
        description: 'Valmistelut ja turvatoimet ennen ensimmäistä työpäivää.',
        icon: Calendar,
        tasks: [
            { id: 'negotiation', text: 'Paluuneuvottelu pidetty (HR, esihenkilö, työterveys)', description: 'Varmista että kaikki osapuolet ovat samalla sivulla.' },
            { id: 'investigation', text: 'Kiusaamistapaus selvitetty ja päätökset tehty', description: 'Mitkä ovat konkreettiset muutokset kiusaajan tai tapojen suhteen?' },
            { id: 'safety_measures', text: 'Konkreettiset turvatoimet sovittu', description: 'Työpisteen vaihto, kontaktin minimointi, ohjeet häirintään.' },
            { id: 'phased_plan', text: 'Porrastettu paluu sovittu (esim. 40-60%)', description: 'Määritellään tarkastusviikot (2, 4 ja 8 viikkoa).' }
        ]
    },
    {
        id: 'first_week',
        title: '2. Paluuviikko',
        description: 'Ensimmäiset päivät ja välitön tuki.',
        icon: Clock,
        tasks: [
            { id: 'welcome', text: 'Henkilökohtainen vastaanotto esihenkilöltä', description: 'Käydään läpi päivän kulku ja turvatoimet.' },
            { id: 'safety_person', text: 'Nimetty turvahenkilö käytettävissä', description: 'Henkilö jolle voi kertoa huolista matalalla kynnyksellä.' },
            { id: 'load_management', text: 'Työtehtävien keventäminen', description: 'Ei kriittisimpiä projekteja tai raskaita tilanteita heti.' }
        ]
    },
    {
        id: 'monitoring',
        title: '3. Seuranta (4-6 vk)',
        description: 'Jatkuva tuki ja jaksamisen tarkkailu.',
        icon: ClipboardCheck,
        tasks: [
            { id: 'checkins', text: 'Säännölliset check-init sovittu', description: 'Viikoittainen lyhyt keskustelu esihenkilön kanssa.' },
            { id: 'capacity_check', text: 'Kuormituksen ja jaksamisen arviointi', description: 'Uni, oireet ja turvallisuuden kokemus.' },
            { id: 'psych_support', text: 'Työterveyden tai psykologin tuki jatkuu', description: 'Traumatiedon soveltaminen ja itseluottamuksen vahvistaminen.' }
        ]
    },
    {
        id: 'structures',
        title: '4. Rakenteet',
        description: 'Työn ja ympäristön muokkaus.',
        icon: Shield,
        tasks: [
            { id: 'task_customization', text: 'Tehtävien räätälöinti tarvittaessa', description: 'Väliaikaisesti erilainen rooli tai painotus.' },
            { id: 'collaboration', text: 'Yhteistyökuvioiden selkiyttäminen', description: 'Miten palaverit ja viestintä hoidetaan jatkossa.' },
            { id: 'org_actions', text: 'Organisaatiotason toimet', description: 'Koulutus tiimille, päivitetyt ohjeet ja selkeä nollalinja.' }
        ]
    },
    {
        id: 'longer_term',
        title: '5. Pitkä seuranta',
        description: 'Toimivuuden arviointi (3-12 kk).',
        icon: Heart,
        tasks: [
            { id: 'long_term_check', text: 'Tapaaminen 3-6kk kohdalla', description: 'Pysymishalukkuus ja oireiden tilanne.' },
            { id: 'feedback_loop', text: 'Mahdollisuus vaikuttaa prosessiin', description: 'Mitä organisaatio on oppinut tapauksesta?' },
            { id: 'org_culture', text: 'Kulttuurin seuranta', description: 'Varmistetaan ettei vastaava toistu.' }
        ]
    }
];

export function RTWWizard({ onComplete, onExit }: { onComplete: () => void; onExit: () => void }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

    const currentStep = STEPS[currentStepIndex];
    const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

    const toggleTask = (taskId: string) => {
        const newCompleted = new Set(completedTasks);
        if (newCompleted.has(taskId)) {
            newCompleted.delete(taskId);
        } else {
            newCompleted.add(taskId);
        }
        setCompletedTasks(newCompleted);
    };

    const nextStep = () => {
        if (currentStepIndex < STEPS.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const prevStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        } else {
            onExit();
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <Badge className="bg-emerald-500/10 text-emerald-600 border-none px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                    Työhön paluun opas
                </Badge>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 uppercase tracking-tight break-words">
                    Paluusuunnitelman <br />
                    <span className="text-emerald-500">rakentaminen</span>
                </h1>
                <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
                    Vaiheittainen tutkimustietoon perustuva malli turvalliseen ja kestävyyteen tähtäävään työhön paluuseen.
                </p>
            </div>

            {/* Progress */}
            <div className="mb-12 space-y-4">
                <div className="flex justify-between text-sm font-black text-slate-400 uppercase tracking-widest px-1">
                    <span>Vaihe {currentStepIndex + 1} / {STEPS.length}</span>
                    <span>{Math.round(progress)}% suoritettu</span>
                </div>
                <Progress value={progress} className="h-3 bg-slate-100" indicatorClassName="bg-emerald-500" />
            </div>

            {/* Stepper Wizard Content */}
            <div className="relative min-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white border border-slate-200 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl shadow-emerald-500/5"
                    >
                        <div className="flex items-start gap-6 mb-10">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                                <currentStep.icon className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight break-words">{currentStep.title}</h2>
                                <p className="text-slate-500 text-lg">{currentStep.description}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {currentStep.tasks.map((task) => (
                                <motion.div
                                    key={task.id}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => toggleTask(task.id)}
                                    className={cn(
                                        "group p-6 rounded-2xl border transition-all cursor-pointer flex items-start gap-4",
                                        completedTasks.has(task.id)
                                            ? "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                                            : "bg-white border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5"
                                    )}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                                        completedTasks.has(task.id)
                                            ? "bg-emerald-500 border-emerald-500 text-white"
                                            : "border-slate-200 text-transparent group-hover:border-emerald-500"
                                    )}>
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg mb-1 leading-tight">{task.text}</p>
                                        {task.description && (
                                            <p className={cn(
                                                "text-sm",
                                                completedTasks.has(task.id) ? "text-emerald-700/80" : "text-slate-400"
                                            )}>{task.description}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Research Note */}
                        <div className="mt-12 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                            <Info className="w-6 h-6 text-slate-400 shrink-0" />
                            <p className="text-sm text-slate-500 italic leading-relaxed">
                                Tutkimukset osoittavat, että pelkkä tunnepuhe koetaan riittämättömäksi, jos rakenteita ja riskejä ei aidosti korjata. Tämä lomake auttaa varmistamaan riittävät toimenpiteet.
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 px-4">
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={prevStep}
                    className="gap-2 text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-xs"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Takaisin
                </Button>

                <Button
                    size="lg"
                    onClick={nextStep}
                    className="bg-slate-900 hover:bg-black text-white px-8 rounded-full font-black uppercase tracking-widest text-xs h-12 gap-2 shadow-xl shadow-slate-900/10 transition-all hover:scale-105"
                >
                    {currentStepIndex === STEPS.length - 1 ? 'Valmis' : 'Seuraava vaihe'}
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
