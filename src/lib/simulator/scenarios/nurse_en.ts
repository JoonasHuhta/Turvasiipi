import { Phase } from "../types";

export const NURSE_SCENARIO_EN: Record<string, Phase> = {
    // --- DAY 1 ---
    'start': {
        id: 'start',
        day: 1,
        time: '07:00',
        location: 'Ward 4B, Locker Room',
        title: 'First Morning',
        content: `You put on your nurse's uniform. Your hands are shaking slightly from nervousness.
        
"First day as a real nurse."
        
You feel...`,
        choices: [
            {
                id: 'feeling_excited',
                text: 'Excited and ready',
                nextPhaseId: 'day1_veteran',
                effect: { stats: { hope: 85 } }
            },
            {
                id: 'feeling_nervous',
                text: 'Nervous',
                nextPhaseId: 'day1_veteran',
                effect: { stats: { selfEsteem: 75 } }
            }
        ]
    },

    'day1_veteran': {
        id: 'day1_veteran',
        day: 1,
        time: '07:15',
        location: 'Office',
        title: 'Meeting the Veteran',
        content: `Three nurses are standing in the ward.

VETERAN (55y, 30y experience): "Aha. Another new one."
She looks you up and down. "How many is this this year? Fourth? Fifth?"

A young nurse (Emma) smiles at you slightly, but turns away under the veteran's gaze.

VETERAN: "Well, don't expect me to teach everything. You learn by doing here."

What do you say?`,
        choices: [
            {
                id: 'response_polite',
                text: '"Thank you, I will do my best!"',
                nextPhaseId: 'day1_patient',
                effect: {
                    stats: { selfEsteem: -10, teamAcceptance: -15 },
                    logNote: 'Day 1: Veteran stated "everyone says that". No warm welcome.',
                    customFeedback: 'Veteran snorts: "Yeah. Everyone says that on the first day." She turns away.'
                }
            },
            {
                id: 'response_ask_help',
                text: '"Could you show me where the supplies are?"',
                nextPhaseId: 'day1_patient',
                effect: {
                    stats: { selfEsteem: -20, teamAcceptance: -30, shame: 30 },
                    logNote: 'Day 1: Asked for help. Veteran humiliated publicly: "Can\'t you look yourself?"',
                    customFeedback: 'Veteran sighs deeply: "Can\'t you even LOOK yourself? They are right there." She points at a cupboard.'
                }
            },
            {
                id: 'response_silent',
                text: '(Say nothing)',
                nextPhaseId: 'day1_emma_intro',
                effect: {
                    stats: { selfEsteem: -10, teamAcceptance: -5, hope: -5 },
                    logNote: 'Day 1: Veteran was cold. I didn\'t talk back.',
                    customFeedback: 'Veteran looks at you for a moment: "Well good. Less talk, more work."'
                }
            }
        ]
    },

    'day1_emma_intro': {
        id: 'day1_emma_intro',
        day: 1,
        time: '07:20',
        location: 'Corridor',
        title: 'An Ally?',
        content: `The veteran leaves. You remain standing.

The young nurse comes to you:
"Hey, don't mind her. She's always like that to new ones. I'm Emma."`,
        choices: [
            {
                id: 'emma_thanks',
                text: '"Thanks Emma. I\'m a bit nervous."',
                nextPhaseId: 'day1_patient',
                effect: {
                    addAlly: 'Emma',
                    stats: { hope: 5, teamAcceptance: 5 }
                }
            }
        ]
    },

    'day1_patient': {
        id: 'day1_patient',
        day: 1,
        time: '09:00',
        location: 'Room 12',
        title: 'First Patient',
        content: `The veteran tossed you a task. You go to measure blood pressure.

PATIENT (72y woman): "Oh my, a new nurse! You are so young. Are you sure you know how?"
She smiles, but there is doubt in her voice.`,
        choices: [
            {
                id: 'admit_new',
                text: '"I\'m a fresh graduate, but I do know how!"',
                nextPhaseId: 'day3_lunch',
                effect: {
                    stats: { selfEsteem: -20, shame: 10 },
                    logNote: 'Day 1: Patient questioned competence. Felt insecure.'
                }
            },
            {
                id: 'act_confident',
                text: '"I do know, no cause for worry."',
                nextPhaseId: 'day3_lunch',
                effect: {
                    stats: { selfEsteem: 5 }
                }
            }
        ]
    },

    // --- DAY 3 ---
    'day3_lunch': {
        id: 'day3_lunch',
        day: 3,
        time: '11:30',
        location: 'Lunch Room',
        title: 'Lunch Break',
        content: `The lunch room is noisy. Veteran nurses sit at one table laughing.

Emma sits alone at another table and waves.
There would be one empty chair at the veterans' table.

Where do you sit?`,
        choices: [
            {
                id: 'sit_veterans',
                text: 'Try to join the veterans\' table',
                nextPhaseId: 'day3_after_lunch_bad',
                effect: {
                    stats: { shame: 40, isolation: 30, teamAcceptance: -35 },
                    logNote: 'Day 3: Tried to sit at veterans\' table. "New ones sit there". Public rejection.'
                }
            },
            {
                id: 'sit_emma',
                text: 'Sit next to Emma',
                nextPhaseId: 'day3_after_lunch_good',
                effect: {
                    addAlly: 'Emma',
                    stats: { isolation: -10, hope: 10 },
                    logNote: 'Day 3: Veterans shouted "young ones hang together".'
                }
            }
        ]
    },

    'day3_after_lunch_bad': {
        id: 'day3_after_lunch_bad',
        day: 3,
        title: 'Isolated',
        content: `VETERAN: "That's Pirjo's seat. New ones sit THERE."
        
She points to the corner. The whole room goes silent for a moment.

You go to the corner. You eat alone. You hear them laughing behind your back.`,
        choices: [{ id: 'cont', text: 'Continue (Day 12)', nextPhaseId: 'day12_mistake' }]
    },

    'day3_after_lunch_good': {
        id: 'day3_after_lunch_good',
        day: 3,
        title: 'Ally',
        content: `EMMA: "Hey! Don't mind them. They were cold to me too in the beginning."
        
You feel relief. You are not the only one.`,
        choices: [{ id: 'cont', text: 'Continue (Day 12)', nextPhaseId: 'day12_mistake' }]
    },

    // --- DAY 12 ---
    'day12_mistake': {
        id: 'day12_mistake',
        day: 12,
        time: '13:45',
        location: 'Room 8',
        isCrisis: true,
        title: 'First Mistake',
        content: `You forgot to record a patient's temperature. The veteran notices it in the patient's presence.

"WHERE IS THE TEMPERATURE?" she rasps. "This is a PATIENT'S LIFE! Can't you even do elementary school math?"`,
        choices: [
            {
                id: 'apologize',
                text: '"Sorry, I forgot. Measuring immediately."',
                nextPhaseId: 'day20_isolation',
                effect: {
                    stats: { selfEsteem: -35, shame: 60, physicalHealth: -10 },
                    logNote: 'Day 12: Veteran shouted in front of patient "can\'t you do elementary school math". Humiliation.'
                }
            },
            {
                id: 'explain',
                text: '"I didn\'t have time yet, I was..."',
                nextPhaseId: 'day20_isolation',
                effect: {
                    stats: { selfEsteem: -40, teamAcceptance: -20 },
                    logNote: 'Day 12: Tried to explain. Shouted over me. Felt stupid.'
                }
            }
        ]
    },

    // --- DAY 20 (Placeholder for flow) ---
    'day20_isolation': {
        id: 'day20_isolation',
        day: 20,
        title: 'Isolation in Emergency',
        content: `Emergency on the ward. You rush to help.
        
VETERAN shoves you: "OUT OF THE WAY! Let the professionals handle it."
        
You stand by idly while others work.`,
        choices: [
            {
                id: 'feel_useless',
                text: 'Feel useless',
                nextPhaseId: 'day25_doctor', // Connecting flow
                effect: { stats: { isolation: 50, selfEsteem: -30 }, logNote: 'Day 20: Pushed physically away from situation. "Let professionals handle it".' }
            }
        ]
    },

    // To be continued... placeholder connection to End for testing
    // --- DAY 25 ---
    'day25_doctor': {
        id: 'day25_doctor',
        day: 25,
        time: '09:15',
        location: 'Corridor',
        title: 'Doctor\'s Attack',
        content: `Doctor (45y, male) comes to the ward. "Where are the patient's latest labs?"

You: "They are coming in half an hour..."

DOCTOR interrupts by shouting: "I didn't ask WHEN they are coming. I asked WHERE they are. Are you stupid?"
The whole corridor listens. Veteran smiles in the background.`,
        choices: [
            {
                id: 'doctor_apology',
                text: '"Sorry, calling the lab immediately..."',
                nextPhaseId: 'day30_reflection',
                effect: {
                    stats: { selfEsteem: -40, shame: 80 }, // fear removed, increased shame
                    logNote: 'Day 25: Doctor shouted "are you stupid" in the corridor. Veteran witnessed, did not intervene.'
                }
            },
            {
                id: 'doctor_silent',
                text: '(Walk away)',
                nextPhaseId: 'day30_reflection',
                effect: {
                    stats: { selfEsteem: -20, isolation: 40 },
                    logNote: 'Day 25: Left the situation while doctor shouted. Felt powerless.'
                }
            }
        ]
    },

    // --- DAY 30 ---
    'day30_reflection': {
        id: 'day30_reflection',
        day: 30,
        time: '20:00',
        location: 'At home',
        title: 'Reflection Point',
        content: `You have survived a month.

Physical changes:
• You wake up at 3-4 AM with anxiety
• Stomach hurts always before a shift
• Weight dropped -3kg

Your mother calls: "You sound tired. Is everything okay?"`,
        choices: [
            {
                id: 'mom_lie',
                text: '"Yeah, just fatigue..." (Lie)',
                nextPhaseId: 'day35_manager',
                effect: {
                    stats: { isolation: 65, shame: 75 },
                    logNote: 'Day 30: Lied to mom about my condition. Don\'t want to be a burden.'
                }
            },
            {
                id: 'mom_truth',
                text: '"No... I\'m being bullied at work."',
                nextPhaseId: 'day35_manager',
                effect: {
                    addAlly: 'Mother',
                    stats: { isolation: -20, hope: 15 },
                    logNote: 'Day 30: Told mom. First time saying it out loud.'
                }
            }
        ]
    },

    // --- DAY 35 ---
    'day35_manager': {
        id: 'day35_manager',
        day: 35,
        time: '14:00',
        location: 'Head Nurse\'s Office',
        title: 'Attempt to talk to Manager',
        content: `You gathered your courage and went to speak to the head nurse. You tell about the veterans' behavior.

HEAD NURSE sighs: "They have a lot of experience. This is a demanding field, and maybe you just need to be a bit stronger."
She checks her watch. The conversation is over.`,
        choices: [
            {
                id: 'manager_fail',
                text: 'Leave the office',
                nextPhaseId: 'day45_peak',
                effect: {
                    stats: { hope: -60, teamAcceptance: -50, selfEsteem: -20 },
                    logNote: 'Day 35: Manager belittled: "need to be stronger". Refused to intervene.'
                }
            }
        ]
    },

    // --- DAY 45 ---
    'day45_peak': {
        id: 'day45_peak',
        day: 45,
        location: 'Room 9',
        isCrisis: true,
        title: '"Nurses eat their young"',
        content: `Veteran comes to watch while you try to insert an IV. You don't succeed immediately.

VETERAN (to patient): "Sorry, these young ones don't know anything yet. I'll handle it."
VETERAN (to you, whispering): "If you don't learn soon, maybe this isn't your field."

She pushes you aside. The patient looks at you with pity.`,
        choices: [
            {
                id: 'give_up_thought',
                text: 'I think about quitting',
                nextPhaseId: 'day50_panic',
                effect: {
                    stats: { selfEsteem: 5, shame: 100 }, // 5 = critical low
                    logNote: 'Day 45: Veteran humiliated in front of patient. Suggest changing careers.'
                }
            }
        ]
    },

    // --- DAY 50 ---
    'day50_panic': {
        id: 'day50_panic',
        day: 50,
        time: '06:30',
        location: 'Home, Hallway',
        isCrisis: true,
        title: 'Panic',
        content: `You are leaving for work. Putting shoes on.
        
Suddenly you can't breathe. Chest is tight. Heart beats 180 times a minute.
The floor edges blur.

"I'm dying. I can't go there."`,
        choices: [
            {
                id: 'calm_down',
                text: 'Force yourself to calm down and go to work',
                nextPhaseId: 'day60_nightmares',
                effect: {
                    stats: { physicalHealth: 40, hope: 10 },
                    logNote: 'Day 50: Panic attack in hallway. Forced myself to go to work. Hands shaking.'
                }
            },
            {
                id: 'call_sick',
                text: 'Call in sick (Sick leave)',
                nextPhaseId: 'day80_occhealth',
                effect: {
                    stats: { physicalHealth: 60, hope: 30, teamAcceptance: -80 }, // Team hates you for leaving short
                    logNote: 'Day 50: Couldn\'t go. Called in sick. Panic symptoms.'
                }
            }
        ]
    },

    // --- DAY 60 ---
    'day60_nightmares': {
        id: 'day60_nightmares',
        day: 60,
        title: 'Nightmares',
        content: `You are in "zombie mode". You do the work, but feel nothing.
        
At night you wake up to your own screaming. You dreamt you were treating a patient and the veteran laughed next to you when the patient died.
Insomnia starts showing as mistakes.`,
        choices: [
            {
                id: 'keep_going',
                text: 'Just keep persisting',
                nextPhaseId: 'day88_critical',
                effect: {
                    stats: { physicalHealth: 20, hope: 5 }, // mentalHealth removed
                    logNote: 'Day 60: Insomnia chronic. Scared of making a nursing error.'
                }
            }
        ]
    },

    // --- DAY 80 ---
    'day80_occhealth': {
        id: 'day80_occhealth',
        day: 80,
        time: '10:00',
        location: 'Occupational Health',
        title: 'Last Straw',
        content: `Occupational health doctor listens to you.

"You have clear symptoms of burnout and depression. This cannot continue like this.
You have two options: I write sick leave and we look at medication, or..."`,
        choices: [
            {
                id: 'take_leave',
                text: 'I take sick leave',
                nextPhaseId: 'day90_decision',
                effect: {
                    stats: { hope: 40, physicalHealth: 70 },
                    logNote: 'Day 80: Occ health confirmed burnout. Went on sick leave.'
                }
            },
            {
                id: 'refuse_leave',
                text: '"I\'ll be fine, I won\'t stay on leave"',
                nextPhaseId: 'day88_critical',
                effect: {
                    stats: { hope: 0, physicalHealth: 10 },
                    customFeedback: 'Doctor: "I cannot force you, but I am worried about you."'
                }
            }
        ]
    },

    // --- DAY 88 ---
    'day88_critical': {
        id: 'day88_critical',
        day: 88,
        isCrisis: true,
        title: 'Collapse',
        content: `You are at work. Your hands shake so much you can't place a cannula.
        
Veteran comes through the door: "Alright, move aside from bumbling that."
        
Something snaps inside you. You can't move. You start crying uncontrollably in front of the patient.`,
        choices: [
            {
                id: 'collapse',
                text: 'Run away from the ward',
                nextPhaseId: 'day90_decision',
                effect: {
                    stats: { shame: 100, selfEsteem: 0, hope: 5 }, // Rock bottom
                    logNote: 'Day 88: Total collapse on the ward. Ran out.'
                }
            }
        ]
    },

    // --- DAY 90: THE ENDINGS ---
    'day90_decision': {
        id: 'day90_decision',
        day: 90,
        time: '12:00',
        location: 'Home / Cafe',
        title: 'Moment of Decision',
        content: `It has been 90 days since graduation. You are at a crossroads.
        
You browse your phone and find the "Turvasiipi" app you heard about in school. Or you browse open jobs. Or stay in bed.
        
What do you do?`,
        choices: [
            {
                id: 'end_quit',
                text: 'I resign. I can\'t take it anymore.',
                nextPhaseId: 'END_B', // Quit
                effect: {
                    stats: { hope: 60, selfEsteem: 40 },
                    logNote: 'Day 90: Resigned. Health is more important.'
                }
            },
            {
                id: 'end_suffer',
                text: 'I continue on the ward, try to endure',
                nextPhaseId: 'END_A', // Burnout
                effect: {
                    stats: { hope: 0, physicalHealth: 0 },
                    logNote: 'Day 90: Decided to continue. I don\'t see another option.'
                }
            },
            {
                id: 'end_fight',
                text: 'I download Turvasiipi and get help',
                nextPhaseId: 'END_C', // Fight back
                effect: {
                    stats: { hope: 100, selfEsteem: 60 },
                    logNote: 'Day 90: Downloaded Turvasiipi. Starting documentation.'
                }
            }
        ]
    }
};
