
import { Phase } from "../types";

// NEUROSCENARIO: Day as Neurodivergent
// Focus: Energy Management, Sensory Overload, Misunderstandings
export const NEURO_SCENARIO_EN: Record<string, Phase> = {
    START: {
        id: 'START',
        day: 1,
        time: '08:00',
        title: "Breakfast: Sensory Assault",
        content: `
You arrive at the office. The open-plan office is already crowded. The coffee machine hisses, colleagues chatter, a phone rings, someone is listening to music too loudly. The lights are bright fluorescent tubes. You already feel sensory overload beginning.

**Your thoughts:**
"The headache is already starting. How will I survive this day? Should I say something or just try to endure?"

*(This simulation illustrates the daily life of a neurodivergent person, such as someone on the autism spectrum or with ADHD (AuDHD), in working life. Your goal is to survive the day without burnout.)*
`,
        choices: [
            {
                id: 'masking',
                text: "Smile and greet everyone (Masking)",
                nextPhaseId: 'MEETING',
                effect: {
                    stats: {
                        physicalHealth: -15, // Energy loss
                        selfEsteem: -10, // Focus loss
                        teamAcceptance: 0 // Colleagues like it
                    },
                    logNote: "I masked socially in the morning, even though I was overloaded. Energy dropped immediately.",
                    customFeedback: "Colleagues find you nice, but your energy crashed immediately."
                }
            },
            {
                id: 'protect',
                text: "Go straight to your desk and put on headphones",
                nextPhaseId: 'MEETING',
                effect: {
                    stats: {
                        physicalHealth: +5, // Energy saved
                        selfEsteem: +10, // Focus gain
                        teamAcceptance: -10 // Misunderstood
                    },
                    logNote: "I protected myself with headphones. Colleagues seemed annoyed.",
                    customFeedback: "You saved energy, but colleagues consider you distant."
                }
            },
            {
                id: 'ask_quiet',
                text: "Ask for a quiet space: 'Headache, could I retreat?'",
                nextPhaseId: 'MEETING',
                effect: {
                    stats: {
                        physicalHealth: +10,
                        teamAcceptance: -5 // Some might think you complain
                    },
                    logNote: "I asked for a quiet space using a headache as a reason.",
                    customFeedback: "You got peace, but someone might have thought you were complaining."
                }
            },
            {
                id: 'truth',
                text: "Talk about sensory challenges openly",
                nextPhaseId: 'MEETING',
                effect: {
                    stats: {
                        physicalHealth: +20,
                        teamAcceptance: +15, // Initial respect for honesty (if lucky)
                        hope: +10
                    },
                    logNote: "I spoke openly about my sensory challenges.",
                    customFeedback: "Brave move! Some understood, and you felt relieved."
                }
            }
        ]
    },

    MEETING: {
        id: 'MEETING',
        day: 1,
        time: '09:30',
        title: "Morning Meeting: Surprise!",
        content: `
The project manager calls a spontaneous meeting. You didn't get an agenda beforehand. In the meeting, the boss asks *"what do you think of the campaign?"* but you haven't had time to process the information. You need time to think, but everyone is staring at you.

**Your thoughts:**
"I'm not ready. I needed that agenda beforehand. Why can't they just send an email?"

**Colleague's misunderstanding:**
"Alex doesn't participate. Maybe they don't have opinions. Maybe they don't care about the work."
`,
        choices: [
            {
                id: 'honest_delay',
                text: "Say: 'I need a moment to think. Can I answer by email?'",
                nextPhaseId: 'LUNCH',
                effect: {
                    stats: {
                        hope: +10,
                        selfEsteem: +5, // Focus
                        teamAcceptance: -10 // Misunderstood
                    },
                    logNote: "I asked for time to answer via email. The boss looked confused.",
                    customFeedback: "You protected yourself, but the boss might have interpreted it as lack of preparation."
                }
            },
            {
                id: 'masking_fake',
                text: "Try to come up with something smart immediately (Masking)",
                nextPhaseId: 'LUNCH',
                effect: {
                    stats: {
                        teamAcceptance: +5,
                        physicalHealth: -10, // Stress
                        hope: -5 // Fake feeling
                    },
                    logNote: "I forced myself to speak in the meeting without preparation.",
                    customFeedback: "You survived the situation, but you feel like a fraud and are stressed."
                }
            },
            {
                id: 'ask_agenda',
                text: "Demand change: 'Could you send an agenda beforehand in the future?'",
                nextPhaseId: 'LUNCH',
                effect: {
                    stats: {
                        teamAcceptance: +10, // Professional request actually
                        hope: +10 // Taking control
                    },
                    logNote: "I asked for agendas beforehand to support processing.",
                    customFeedback: "Good request! Many others sighed in relief too."
                }
            }
        ]
    },

    LUNCH: {
        id: 'LUNCH',
        day: 1,
        time: '12:00',
        title: "Lunch Time: Social Minefield",
        content: `
Colleagues ask you to join for lunch. The cafeteria is noisy and full of people. You know that **social situation + sensory overload = perfect recipe for an afternoon crash.**

**Your thoughts:**
"I want to be a nice colleague, but I know burnout is coming if I go."

**Colleague's misunderstanding:**
"Alex doesn't want to spend time with us. Maybe they don't like us."
`,
        choices: [
            {
                id: 'masking_lunch',
                text: "Join and try to smile (Masking)",
                nextPhaseId: 'DEADLINE',
                effect: {
                    stats: {
                        teamAcceptance: +10,
                        physicalHealth: -25, // HUGE DROP
                        selfEsteem: -20 // Focus ruined for afternoon
                    },
                    logNote: "I went to a noisy lunch to please others.",
                    customFeedback: "Colleagues liked it, but you are exhausted. The afternoon is in danger."
                }
            },
            {
                id: 'refuse',
                text: "Refuse directly: 'Thanks, I'm eating alone.'",
                nextPhaseId: 'DEADLINE',
                effect: {
                    stats: {
                        physicalHealth: +15, // Recovery
                        selfEsteem: +10,
                        teamAcceptance: -15
                    },
                    logNote: "I refused lunch to recover.",
                    customFeedback: "You got to rest, but colleagues now consider you a hermit."
                }
            },
            {
                id: 'explain_quiet',
                text: "Explain: 'I need a quiet moment to recover.'",
                nextPhaseId: 'DEADLINE',
                effect: {
                    stats: {
                        physicalHealth: +15,
                        teamAcceptance: +5 // Understanding slightly up
                    },
                    logNote: "I explained my need for a quiet moment.",
                    customFeedback: "Honesty paid off. Some understood, and you get to rest."
                }
            }
        ]
    },

    DEADLINE: {
        id: 'DEADLINE',
        day: 1,
        time: '14:00',
        title: "Afternoon Deadline: Hyperfocus in Danger",
        content: `
You have a deadline at 16:00. You are in **hyperfocus** and doing your best work. Suddenly a colleague comes to ask something "small" for "a moment".

You know that an interruption destroys your focus and it takes 20 minutes to get back to the same state.

**Your thoughts:**
"Not now! I was just in flow state."
`,
        choices: [
            {
                id: 'allow_interrupt',
                text: "Take headphones off and help (Masking)",
                nextPhaseId: 'FEEDBACK',
                effect: {
                    stats: {
                        teamAcceptance: +10,
                        selfEsteem: -30, // Focus destroyed
                        hope: -15 // Stress about deadline
                    },
                    logNote: "I let myself be interrupted in flow state.",
                    customFeedback: "You helped a friend, but your own work suffers badly. The deadline scares you."
                }
            },
            {
                id: 'block',
                text: "Say: 'I have a deadline, I can't now.'",
                nextPhaseId: 'FEEDBACK',
                effect: {
                    stats: {
                        selfEsteem: +10, // Focus kept
                        hope: +5,
                        teamAcceptance: -20
                    },
                    logNote: "I refused help because of the deadline.",
                    customFeedback: "Your work is progressing famously, but the colleague was offended by your bluntness."
                }
            },
            {
                id: 'negotiate',
                text: "Negotiate: 'I am focused, I'll come after 16:00.'",
                nextPhaseId: 'FEEDBACK',
                effect: {
                    stats: {
                        selfEsteem: +10,
                        teamAcceptance: +5,
                        hope: +5
                    },
                    logNote: "I postponed helping until after the deadline.",
                    customFeedback: "Perfect solution! You kept your focus and didn't burn bridges."
                }
            }
        ]
    },

    FEEDBACK: {
        id: 'FEEDBACK',
        day: 1,
        time: '15:30',
        title: "Feedback Discussion",
        content: `
The manager says: *"Alex, you are talented, but sometimes you seem... distant. Maybe you could be more 'part of the team'."*

**Manager's misunderstanding:**
"Alex doesn't smile enough. They don't participate in small talk. Maybe they have an attitude problem."

**Truth:**
You focus on work, not social rituals. This is neurology, not attitude.
`,
        choices: [
            {
                id: 'apologize',
                text: "Apologize and promise to try harder (Masking)",
                nextPhaseId: 'EVENING',
                effect: {
                    stats: {
                        physicalHealth: -20,
                        hope: -20 // Not authentic
                    },
                    logNote: "I promised to be more social, even though it exhausts me.",
                    customFeedback: "The manager is satisfied, but you are on your way to burnout."
                }
            },
            {
                id: 'defend',
                text: "Defend: 'I do my work well, socializing is secondary.'",
                nextPhaseId: 'EVENING',
                effect: {
                    stats: {
                        hope: +10, // Authentic
                        teamAcceptance: -20 // Conflict
                    },
                    logNote: "I defended my work performance, but seemed aggressive.",
                    customFeedback: "You were honest, but the manager might have labeled you 'difficult'."
                }
            },
            {
                id: 'reveal',
                text: "Tell the truth: 'I am neurodivergent. Socializing loads me.'",
                nextPhaseId: 'EVENING',
                effect: {
                    stats: {
                        teamAcceptance: +20, // If understood (simulating success here mostly)
                        hope: +20,
                        physicalHealth: +10
                    },
                    logNote: "I told the manager about my neurodivergence.",
                    customFeedback: "Risky move, but now the manager understands why you are 'distant'. A turning point!"
                }
            }
        ]
    },

    EVENING: {
        id: 'EVENING',
        day: 1,
        time: '17:00',
        title: "Evening",
        content: `
You survived the day. Check your meters.

If your **Energy** (Battery) is low, you are in danger of burning out.
If **Team Acceptance** is low, you are in danger of being excluded.

How do you continue from here?

**Truth:**
Masking and sensory stimuli consume a neurodivergent employee 2-3x more.

Choose your path to the future:
`,
        choices: [
            {
                id: 'continue',
                text: "Continue the same way ('I'll be fine')",
                nextPhaseId: 'END_BURNOUT',
                effect: {
                    stats: { physicalHealth: -100 } // Total crash
                }
            },
            {
                id: 'occupational_health',
                text: "Contact Occupational Health and ask for accommodations",
                nextPhaseId: 'END_SUCCESS',
                effect: {
                    stats: { physicalHealth: +50, hope: +50 }
                }
            },
            {
                id: 'quit',
                text: "Find a new, better workplace",
                nextPhaseId: 'END_NEWJOB',
                effect: {
                    stats: { hope: +20 }
                }
            }
        ]
    },

    // ENDINGS
    END_BURNOUT: {
        id: 'END_A', // Mapping to GameEngine types
        day: 30,
        title: "Outcome: Burnout",
        content: "Burnout", // Placeholder, content rendered by GameEngine special handling
        choices: []
    },
    END_SUCCESS: {
        id: 'END_C',
        day: 30,
        title: "Outcome: Balance",
        content: "Success",
        choices: []
    },
    END_NEWJOB: {
        id: 'END_B',
        day: 30,
        title: "Outcome: New Beginning",
        content: "New Job",
        choices: []
    }
};
