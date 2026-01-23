
import { Phase } from "../types";

export const YOUTH_SCENARIO_EN: Record<string, Phase> = {
    START: {
        id: "START",
        day: 0,
        title: "Job Interview",
        time: "14:00",
        location: "Office",
        content: `You are a 22-year-old fresh graduate. You are applying for your first "real" job.
        
        The interviewer leans back and smiles slightly forcedly:
        "We have quite a hard pace here, but you learn. We don't watch the clock, because we are like one family here."`,
        choices: [
            {
                id: "accept",
                text: "Get excited and accept the challenge.",
                nextPhaseId: "ONBOARDING_BAD",
                effect: {
                    stats: { hope: 10, selfEsteem: -5 },
                    logNote: "I accepted the 'family-like' culture without questioning."
                }
            },
            {
                id: "ask",
                text: "Ask about onboarding.",
                nextPhaseId: "ONBOARDING_REALISTIC",
                effect: {
                    stats: { selfEsteem: 10, physicalHealth: 5 },
                    logNote: "I asked about onboarding and handling mistakes."
                }
            }
        ]
    },
    ONBOARDING_BAD: {
        id: "ONBOARDING_BAD",
        day: 7,
        title: "Week 1: Chaos",
        time: "09:00",
        location: "Open Office",
        content: `The first week has been a rush. No one is really responsible for you. You get conflicting instructions from different people.
        
        You ask your supervisor: "How is this entry made?"
        
        He sighs: "You should know this already if you are in the field."`,
        choices: [
            {
                id: "blame_self",
                text: "Blame yourself and try harder.",
                nextPhaseId: "SILENT_TREATMENT",
                effect: {
                    stats: { selfEsteem: -20, physicalHealth: -10 },
                    logNote: "I started overachieving to patch my 'incompetence'."
                }
            },
            {
                id: "document",
                text: "Record the lack of instructions.",
                nextPhaseId: "SILENT_TREATMENT",
                effect: {
                    stats: { selfEsteem: 5 },
                    logNote: "I documented the lack of onboarding."
                }
            }
        ]
    },
    ONBOARDING_REALISTIC: {
        id: "ONBOARDING_REALISTIC",
        day: 7,
        title: "Week 1: Vague",
        time: "09:00",
        location: "Open Office",
        content: `Even though you asked about onboarding, the reality is different. The "mentor" is always busy.
        
        You notice that other team members go to lunch without asking you along.
        When you ask for advice, you are told: "Check the intranet, it should be there." (It isn't).`,
        choices: [
            {
                id: "work_through_lunch",
                text: "Skip lunch and search for information.",
                nextPhaseId: "SILENT_TREATMENT",
                effect: {
                    stats: { physicalHealth: -15, isolation: 20 },
                    logNote: "I skipped breaks to cope."
                }
            },
            {
                id: "insist",
                text: "Demand a moment of mentor's time.",
                nextPhaseId: "SILENT_TREATMENT",
                effect: {
                    stats: { selfEsteem: 10, teamAcceptance: -10 },
                    logNote: "I demanded guidance, even though it annoyed others."
                }
            }
        ]
    },
    SILENT_TREATMENT: {
        id: "SILENT_TREATMENT",
        day: 25,
        title: "Week 4: Silent Treatment",
        time: "14:30",
        location: "Meeting",
        content: `You have been in the house for a month. You notice that important emails are "forgotten" to be sent to you.
        
        In a meeting, you present an idea. It is ignored. Five minutes later, a colleague presents the same idea and gets praised.
        
        In the break room, you hear whispering: "Well, one is so new, doesn't understand the house ways."`,
        choices: [
            {
                id: "emotional",
                text: "Get offended and withdraw.",
                nextPhaseId: "CRITICAL_POINT",
                effect: {
                    stats: { isolation: 30, hope: -20 },
                    logNote: "I withdrew into my own shell."
                }
            },
            {
                id: "neutral",
                text: "Stay professional and record what happened.",
                nextPhaseId: "CRITICAL_POINT",
                effect: {
                    stats: { selfEsteem: 5 },
                    logNote: "I observed idea theft and exclusion."
                }
            }
        ]
    },
    CRITICAL_POINT: {
        id: "CRITICAL_POINT",
        day: 45,
        title: "Critical Point",
        time: "16:45",
        location: "Supervisor's Room",
        isCrisis: true,
        content: `You are accused of a mistake that resulted from insufficient instructions.
        
        Supervisor: "This is a serious matter. We need to think about if you are suitable for this house if basics don't work."
        
        You feel tears in your eyes. This is the moment.`,
        choices: [
            {
                id: "breakdown",
                text: "Break down and apologize. (Endure)",
                nextPhaseId: "END_BURNOUT",
                effect: {
                    stats: { selfEsteem: -50, hope: -50 },
                    triggerCrisis: true,
                    logNote: "I took the blame for someone else's mistake."
                }
            },
            {
                id: "anger",
                text: "Yell back about unfairness. (Emotion)",
                nextPhaseId: "END_LABEL",
                effect: {
                    stats: { teamAcceptance: -100 },
                    logNote: "I lost my temper and was labeled difficult."
                }
            },
            {
                id: "boundaries",
                text: "Set a professional boundary. (Structure)",
                nextPhaseId: "END_GROWTH",
                effect: {
                    stats: { selfEsteem: 50, hope: 50 },
                    logNote: "I refused the scapegoat role calmly."
                }
            }
        ]
    },
    // ENDINGS
    END_BURNOUT: {
        id: "END_BURNOUT",
        day: 90,
        title: "Outcome: Burnout",
        time: "---",
        content: "You continued trying without support. The load increased, mistakes increased. Finally, you went on long sick leave. You learned to fear work life.",
        choices: []
    },
    END_LABEL: {
        id: "END_LABEL",
        day: 46,
        title: "Outcome: Labeling",
        time: "---",
        content: "Your outburst was dismissed as 'youthful tantrums'. You became the team's eyesore and black sheep. Your contract was not renewed.",
        choices: []
    },
    END_GROWTH: {
        id: "END_GROWTH",
        day: 46,
        title: "Outcome: Agency",
        time: "---",
        content: "You said calmly: 'To take responsibility, I must have the prerequisites to do the work right. Instructions were missing.'\n\nThe situation might not have resolved immediately, but you saved your self-esteem. You understood that the fault was not in you.",
        choices: []
    }
};
