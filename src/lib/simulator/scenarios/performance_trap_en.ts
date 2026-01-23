import { Phase } from "../types";

export const PERFORMANCE_TRAP_SCENARIO_EN: Record<string, Phase> = {
    START: {
        id: 'START',
        day: 1,
        time: '09:00',
        title: "Discussion with Manager",
        content: `
You have started in a new project. Your sensory sensitivity and need for clear instructions are important for your work ability. You decide to ask for reasonable accommodations, such as the right to work remotely or use noise-cancelling headphones.

**Manager (Sari):** "Of course Alex, we have an equal work community. Do what is best for you, as long as the job gets done."

**Your thoughts:**
"This went surprisingly easily. Maybe this is a safe place after all."
`,
        choices: [
            {
                id: 'log_agreement',
                text: "Record the agreement immediately (Nepsy Log)",
                nextPhaseId: 'THE_ADJUSTMENT',
                effect: {
                    stats: {
                        selfEsteem: +10, // Confidence in process
                        hope: +5
                    },
                    logNote: "I recorded the accommodations agreed with Sari (headphones, remote work) on 12.1. at 9:05.",
                    customFeedback: "Good! Documentation is your first line of defense. You got a verified foundation."
                }
            },
            {
                id: 'just_trust',
                text: "Trust the word and continue working",
                nextPhaseId: 'THE_ADJUSTMENT',
                effect: {
                    stats: {
                        selfEsteem: 0,
                        hope: +10
                    },
                    logNote: "Sari promised accommodations verbally. I trust it works.",
                    customFeedback: "Trust is great, but in work life memory is short without black on white."
                }
            }
        ]
    },

    THE_ADJUSTMENT: {
        id: 'THE_ADJUSTMENT',
        day: 15,
        time: '14:00',
        title: "The First Crack",
        content: `
You have worked two days a week remotely, as agreed. Today Sari invites you to a meeting.

**Sari:** "Alex, the team has noticed you are away a lot. Even though we agreed on remote work, it feels like information isn't flowing and you are a bit 'isolated'. Should you be present more to show your commitment?"

**Situation:**
You have performed excellently, but Sari starts to question your commitment based on social norms.
`,
        choices: [
            {
                id: 'give_in',
                text: "Give up remote work to show commitment",
                nextPhaseId: 'CRUNCH_TIME',
                effect: {
                    stats: {
                        physicalHealth: -20, // Health suffers
                        selfEsteem: -10,
                        teamAcceptance: +10
                    },
                    logNote: "I gave up remote work under Sari's pressure. I feel exhausted already.",
                    customFeedback: "You saved your 'face' in colleagues' eyes, but burned your candle from both ends."
                }
            },
            {
                id: 'refer_agreement',
                text: "Refer to the previous agreement and law",
                nextPhaseId: 'CRUNCH_TIME',
                effect: {
                    stats: {
                        selfEsteem: +20,
                        teamAcceptance: -10, // Some tension
                        hope: +10
                    },
                    logNote: "I reminded Sari of the agreement and the Equality Act. Sari seemed annoyed.",
                    customFeedback: "Brave! You set a boundary. Sari might not have liked it, but knew you aren't an 'easy target'."
                }
            }
        ]
    },

    CRUNCH_TIME: {
        id: 'CRUNCH_TIME',
        day: 45,
        time: '10:00',
        title: "Performance Review and the 'Trap'",
        content: `
The project is in the final stretch. Sari calls you for an interim review. She has a list in front of her.

**Sari:** "Alex, you have done good technical work, but we are worried about your 'team play'. Because you use those headphones, you aren't reachable when we talk about things. And those remote days... they look like you don't want to be part of the group. We have decided to put you on 'monitoring' due to performance."

**Trap:**
Accommodations that Sari herself approved are now turned into "weaknesses". This begins the 'Performance Trap'.
`,
        choices: [
            {
                id: 'ask_evidence',
                text: "Ask for concrete evidence of poor results",
                nextPhaseId: 'LEGAL_FIGHT',
                effect: {
                    stats: {
                        selfEsteem: +15,
                        hope: +5
                    },
                    logNote: "I demanded concreteness for the performance review. Sari went silent.",
                    customFeedback: "Great tactical move! A bully retreats when forced to facts instead of subjectivity."
                }
            },
            {
                id: 'mask_harder',
                text: "Promise to try 'more normally' (Masking)",
                nextPhaseId: 'END_BURNOUT',
                effect: {
                    stats: {
                        physicalHealth: -50,
                        selfEsteem: -30,
                        hope: -20
                    },
                    logNote: "I promised to mask more to keep the job. I don't think I can make it.",
                    customFeedback: "You try to adapt to the impossible. This road leads to burnout."
                }
            }
        ]
    },

    LEGAL_FIGHT: {
        id: 'LEGAL_FIGHT',
        day: 60,
        time: '11:00',
        title: "Counterattack",
        content: `
You have collected a log of all conversations. Sari sends a formal warning about "communication problems".

**Your move:**
You have evidence that the problems stem from Sari's unclear instructions and denial of agreed accommodations.
`,
        choices: [
            {
                id: 'union_contact',
                text: "Contact the union and present documentation",
                nextPhaseId: 'END_NEW_START',
                effect: {
                    stats: {
                        hope: +40,
                        selfEsteem: +30
                    },
                    logNote: "I took the matter to the union. Documentation played a decisive role.",
                    customFeedback: "Victory! When there are enough facts, arbitrary treatment doesn't stand up to scrutiny."
                }
            },
            {
                id: 'informal_threat',
                text: "Threaten Sari directly with legal action",
                nextPhaseId: 'END_CONFLICT',
                effect: {
                    stats: {
                        selfEsteem: +10,
                        teamAcceptance: -50
                    },
                    logNote: "Reckless move. Sari got scared, but the atmosphere is now toxic.",
                    customFeedback: "You got Sari to back off, but bridges were burned along the way."
                }
            }
        ]
    },

    // ENDINGS
    END_BURNOUT: {
        id: 'END_BURNOUT',
        day: 90,
        title: "Shadow of Burnout",
        content: "Burnout",
        choices: []
    },
    END_NEW_START: {
        id: 'END_NEW_START',
        day: 90,
        title: "Victory of Justice",
        content: "Success",
        choices: []
    },
    END_CONFLICT: {
        id: 'END_CONFLICT',
        day: 90,
        title: "Lonely Battle",
        content: "Conflict",
        choices: []
    }
};
