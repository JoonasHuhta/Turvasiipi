import { Phase } from "../types";

export const IT_EXPERT_SCENARIO_EN: Record<string, Phase> = {
    // --- DAY 1: START ---
    'start': {
        id: 'start',
        day: 1,
        time: '09:00',
        location: 'Office',
        title: 'New Project',
        content: `You start a new project as a senior developer. The team is excited, but project manager Kari drops the news.

KARI: "The client wants this ready in three months. I know, it's tight, but we are a top team. Heroic deeds are expected of us now."

You calculate in your mind that it would require 12-hour days every day.`,
        choices: [
            {
                id: 'express_concern',
                text: 'Express your concern about the schedule immediately',
                nextPhaseId: 'day10_technical_debt',
                effect: {
                    stats: { hope: 80, teamAcceptance: 60 },
                    logNote: 'Day 1: Expressed concern about impossible schedule. Kari said "attitude decides".'
                }
            },
            {
                id: 'accept_challenge',
                text: '"Alright, sleeves up!" (Hero mode)',
                nextPhaseId: 'day10_technical_debt',
                effect: {
                    stats: { selfEsteem: 90, teamAcceptance: 80, hope: 95 },
                    logNote: 'Day 1: Decided to accept the challenge. Feels good to be important.'
                }
            }
        ]
    },

    // --- DAY 10: TECHNICAL DEBT ---
    'day10_technical_debt': {
        id: 'day10_technical_debt',
        day: 10,
        time: '14:00',
        location: 'Code Review',
        title: 'Shortcuts',
        content: `You suggest in project meeting that architecture must be done properly to avoid technical debt. Kari interrupts.

KARI: "We don't have time for fancy stuff. Just make it so it works. We'll clean up the traces later (sometime)."

You know that "later" means never.`,
        choices: [
            {
                id: 'insist_quality',
                text: 'Argue back for quality',
                nextPhaseId: 'day25_extra_hours',
                effect: {
                    stats: { teamAcceptance: -10, selfEsteem: 10 },
                    logNote: 'Day 10: Kari belittled technical quality. According to him speed is all that matters.'
                }
            },
            {
                id: 'just_do_it',
                text: 'Do as told, even if ashamed',
                nextPhaseId: 'day25_extra_hours',
                effect: {
                    stats: { selfEsteem: -15, shame: 20 },
                    logNote: 'Day 10: Crap code under pressure. My professional skill feels like it\'s suffering.'
                }
            }
        ]
    },

    // --- DAY 25: EXTRA HOURS ---
    'day25_extra_hours': {
        id: 'day25_extra_hours',
        day: 25,
        time: '20:30',
        location: 'Office (alone)',
        title: 'Night Shift',
        content: `You are at the office again at 8 PM. Kari comes by and looks over your shoulder.

KARI: "Looking good. Hey, did you notice Liisa already left home? She seems to lack that famous 'extra mile'. Luckily one can rely on you."

He pits you and your colleague against each other.`,
        choices: [
            {
                id: 'defend_liisa',
                text: 'Defend Liisa\'s adherence to working hours',
                nextPhaseId: 'day40_gaslighting',
                effect: {
                    stats: { isolation: 10, hope: -5 },
                    logNote: 'Day 25: Kari tried to make me compete with Liisa about overtime. Refused the game.'
                }
            },
            {
                id: 'stay_silent_hero',
                text: 'Smile tiredly and continue coding',
                nextPhaseId: 'day40_gaslighting',
                effect: {
                    stats: { physicalHealth: -10, teamAcceptance: 10, selfEsteem: -5 },
                    logNote: 'Day 25: Accepted "trusted player" role. Back aches already.'
                }
            }
        ]
    },

    // --- DAY 40: GASLIGHTING ---
    'day40_gaslighting': {
        id: 'day40_gaslighting',
        day: 40,
        time: '10:00',
        location: 'Meeting Room',
        title: 'Imaginary Deadline',
        content: `You tell Kari that the team is burning out and the order amount is unrealistic.

KARI: "Nah, you are just exaggerating things. You did really good pace last week too. Maybe you just have a bit of a bad day? Don't worry, I have everything under control."

You feel like you are losing your grip on reality.`,
        choices: [
            {
                id: 'show_metrics',
                text: 'Show data and done hours',
                nextPhaseId: 'day55_physical_symptoms',
                effect: {
                    stats: { teamAcceptance: -20, selfEsteem: 5 },
                    logNote: 'Day 40: Kari denied existence of burnout. Said I am "imagining" problems.'
                }
            },
            {
                id: 'question_self',
                text: 'Think, are you really just slow?',
                nextPhaseId: 'day55_physical_symptoms',
                effect: {
                    stats: { selfEsteem: -30, shame: 40 },
                    logNote: 'Day 40: Started thinking if fault is in me. Why can\'t I keep up?'
                }
            }
        ]
    },

    // --- DAY 55: SYMPTOMS ---
    'day55_physical_symptoms': {
        id: 'day55_physical_symptoms',
        day: 55,
        time: '04:00',
        location: 'Home',
        isCrisis: true,
        title: 'Code in Dreams',
        content: `You wake up early morning. A JavaScript loop spins in your head that you can't break. Eyes are dry and you gained 5 kilos because you eat only takeout at the computer.

Chest is tight. You fear tomorrow's demo will fail.`,
        choices: [
            {
                id: 'work_from_bed',
                text: 'Open laptop in bed to ensure fixes',
                nextPhaseId: 'day70_scapegoat',
                effect: {
                    stats: { physicalHealth: -30, hope: -20 },
                    logNote: 'Day 55: Work spilled into bed. Can\'t separate work and free time anymore.'
                }
            },
            {
                id: 'try_to_breathe',
                text: 'Try to breathe and leave machine closed',
                nextPhaseId: 'day70_scapegoat',
                effect: {
                    stats: { selfEsteem: -10, hope: 5 },
                    logNote: 'Day 55: Close to panic attack due to code. Decided not to open machine.'
                }
            }
        ]
    },

    // --- DAY 70: SCAPEGOAT ---
    'day70_scapegoat': {
        id: 'day70_scapegoat',
        day: 70,
        time: '15:00',
        location: 'Zoom Meeting',
        title: 'Scapegoat',
        content: `Client demo glitches because Kari forced publishing unfinished code. Principal (or CEO) demands answers.

KARI: "Well, the expert here was responsible for this section. I did say quality must be invested in, but here is the result."

Kari throws you under the bus in front of the whole team.`,
        choices: [
            {
                id: 'call_out_lie',
                text: 'Tell how things really went',
                nextPhaseId: 'day85_isolation',
                effect: {
                    stats: { hope: 10, teamAcceptance: -40, isolation: 40 },
                    logNote: 'Day 70: Kari lied and blamed me for failure. Defended myself, but atmosphere became toxic.'
                }
            },
            {
                id: 'take_the_heat',
                text: 'Apologize and promise to fix (Burnout deepens)',
                nextPhaseId: 'day85_isolation',
                effect: {
                    stats: { selfEsteem: -50, shame: 80, hope: -30 },
                    logNote: 'Day 70: Took the blame due to pressure from Kari. Can\'t fight anymore.'
                }
            }
        ]
    },

    // --- DAY 85: ISOLATION ---
    'day85_isolation': {
        id: 'day85_isolation',
        day: 85,
        time: '10:00',
        location: 'Slack',
        title: 'Silent Channels',
        content: `You notice important things are decided on Slack channels you are not in. Kari has started assigning new tasks directly to developers below you, bypassing you completely.

No one replies to your messages in "General" channel.`,
        choices: [
            {
                id: 'confront_kari',
                text: 'Ask Kari directly why you are bypassed',
                nextPhaseId: 'day90_peak_crisis',
                effect: {
                    stats: { isolation: 60, hope: -20 },
                    logNote: 'Day 85: Adult version of school bullying: social isolation and gatekeeping.'
                }
            },
            {
                id: 'ignore_slack',
                text: 'Stay in your own code (Invisibility)',
                nextPhaseId: 'day90_peak_crisis',
                effect: {
                    stats: { isolation: 80, selfEsteem: -20 },
                    logNote: 'Day 85: Feel like a ghost at the office.'
                }
            }
        ]
    },

    // --- DAY 90: PEAK ---
    'day90_peak_crisis': {
        id: 'day90_peak_crisis',
        day: 90,
        time: '08:55',
        location: 'Parking Hall',
        isCrisis: true,
        title: 'Threshold',
        content: `You sit in the car in the office parking hall. Hands shaking on the wheel. You know today is another new "emergency", which is self-inflicted.

In IT field 42% consider resigning due to burnout. Psychological safety is lost/forgotten.

Do you step out of the car?`,
        choices: [
            {
                id: 'end_suffer',
                text: 'Wipe tears and go in (Burnout)',
                nextPhaseId: 'END_A',
                effect: {
                    stats: { physicalHealth: 0, hope: 0, shame: 100 },
                    logNote: 'Day 90: Went in, but know I won\'t last another week.'
                }
            },
            {
                id: 'end_quit',
                text: 'Send message: "I\'m never coming back." (Rescue)',
                nextPhaseId: 'END_B',
                effect: {
                    stats: { hope: 50, selfEsteem: 60, isolation: -20 },
                    logNote: 'Day 90: Chose my own health instead of lines of code.'
                }
            },
            {
                id: 'end_fight_turvasiipi',
                text: 'Activate Turvasiipi report and message management',
                nextPhaseId: 'END_C',
                effect: {
                    stats: { hope: 100, selfEsteem: 80 },
                    logNote: 'Day 90: Reported structural bullying and crunch culture.'
                }
            }
        ]
    }
};
