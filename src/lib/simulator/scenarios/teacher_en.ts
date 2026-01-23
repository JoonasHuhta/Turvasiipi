
import { Phase } from "../types";

export const TEACHER_SCENARIO_EN: Record<string, Phase> = {
    // --- DAY 1: START ---
    'start': {
        id: 'start',
        day: 1,
        time: '08:00',
        location: 'Teachers\' Room',
        title: 'New School Year',
        content: `The new school year begins. You brew coffee and look for your place in the teachers' room. You are excited about the new class.

SENIOR TEACHER (Pekka, 60y): "Aha, you are the new one. Well, let's see if you have what it takes. The pace is quite hard here, and not everyone lasts."

He snorts and turns away to others. You feel a small sting in your chest.`,
        choices: [
            {
                id: 'polite_intro',
                text: '"Nice to meet you, Pekka. Looking forward to it!"',
                nextPhaseId: 'day2_parent_call',
                effect: {
                    stats: { hope: 85, teamAcceptance: 65 },
                    logNote: 'Day 1: Started new job. Pekka was reserved, but I stayed positive.'
                }
            },
            {
                id: 'modest_intro',
                text: '"I\'ll do my best, hope I\'ll manage."',
                nextPhaseId: 'day2_parent_call',
                effect: {
                    stats: { selfEsteem: 70, hope: 75 },
                    logNote: 'Day 1: Pekka stated not everyone lasts. Felt like I\'m being tested.'
                }
            }
        ]
    },

    // --- DAY 2: PARENTS ---
    'day2_parent_call': {
        id: 'day2_parent_call',
        day: 2,
        time: '15:30',
        location: 'Office',
        title: 'Call Home',
        content: `You call a student's home. The student has been disrupting class constantly.

GUARDIAN: "Listen, the fault is not in my child but in you! I hear you are completely lost. The previous teacher managed just fine. Maybe you just don't know how to motivate young people?"

The guardian's voice is aggressive. (Studies show 31% of inappropriate treatment experienced by teachers comes from guardians).`,
        choices: [
            {
                id: 'stay_professional',
                text: 'Stay professional and suggest a meeting',
                nextPhaseId: 'day5_wilma',
                effect: {
                    stats: { selfEsteem: -10, physicalHealth: -5 },
                    logNote: 'Day 2: Guardian attacked my competence directly. Blamed child\'s problems on my incompetence.'
                }
            },
            {
                id: 'feel_guilty',
                text: 'Think about if you really have failed',
                nextPhaseId: 'day5_wilma',
                effect: {
                    stats: { selfEsteem: -25, shame: 30 },
                    logNote: 'Day 2: Guardian said old teacher was better. Started doubting myself.'
                }
            }
        ]
    },

    // --- DAY 5: WILMA TRASH ---
    'day5_wilma': {
        id: 'day5_wilma',
        day: 5,
        time: '23:15',
        location: 'Home Sofa',
        title: 'Notification Flood',
        content: `You are just going to sleep when your phone chimes. A Wilma message. And another.

A guardian has sent a long message criticizing the amount of homework, grading of exams, and even your dressing. The message is copied to the principal.

Your heart starts pounding. Should you reply immediately?`,
        choices: [
            {
                id: 'reply_immediately',
                text: 'Reply immediately to defend yourself',
                nextPhaseId: 'day10_classroom',
                effect: {
                    stats: { physicalHealth: -15, hope: -5, isolation: 10 },
                    logNote: 'Day 5: Replied to angry Wilma message at night. Sleep ruined.'
                }
            },
            {
                id: 'wait_until_morning',
                text: 'Try to sleep and reply in the morning',
                nextPhaseId: 'day10_classroom',
                effect: {
                    stats: { selfEsteem: -5, physicalHealth: -5 },
                    logNote: 'Day 5: Received inappropriate Wilma message at night. Anxious, but decided to reply during work time.'
                }
            }
        ]
    },

    // --- DAY 10: STUDENTS ---
    'day10_classroom': {
        id: 'day10_classroom',
        day: 10,
        time: '10:00',
        location: 'Classroom',
        title: 'Silent Resistance',
        content: `You are teaching a difficult math formula. At the back of the class, two students are snickering and looking at you.

STUDENT: "What is she/he explaining? Even she/he doesn't know."
Another replies: "Yeah, Pekka said at recess this is a joke."

(Students are the biggest source of bullying in the teaching field, approx 42%).`,
        choices: [
            {
                id: 'address_incident',
                text: 'Intervene immediately and strictly',
                nextPhaseId: 'day15_staff_meeting',
                effect: {
                    stats: { teamAcceptance: -10, selfEsteem: 10 },
                    logNote: 'Day 10: Students snickered and referred to Pekka\'s words. Intervened, but feels bad.'
                }
            },
            {
                id: 'ignore_incident',
                text: 'Continue teaching and pretend not to notice',
                nextPhaseId: 'day15_staff_meeting',
                effect: {
                    stats: { selfEsteem: -20, isolation: 20 },
                    logNote: 'Day 10: Students belittled my teaching. They told Pekka called me a joke. Couldn\'t say anything.'
                }
            }
        ]
    },

    // --- DAY 15: MEETING ---
    'day15_staff_meeting': {
        id: 'day15_staff_meeting',
        day: 15,
        time: '14:30',
        location: 'Meeting Room',
        title: 'Invisible',
        content: `In the weekly meeting, you suggest a new project that would increase community spirit.

No one answers. After a moment of silence, Pekka suggests almost the same thing, but in slightly different words.
PRINCIPAL: "Brilliant idea Pekka! Let's put that into action."

Others nod. No one looks at you.`,
        choices: [
            {
                id: 'speak_up_idea',
                text: '"That\'s exactly what I meant just now..."',
                nextPhaseId: 'day20_lounge_isolation',
                effect: {
                    stats: { teamAcceptance: -20, shame: 15 },
                    logNote: 'Day 15: My idea was ignored, but accepted when Pekka presented it. Tried to point it out, got awkward looks.'
                }
            },
            {
                id: 'stay_silent_meeting',
                text: 'Be quiet and swallow your anger',
                nextPhaseId: 'day20_lounge_isolation',
                effect: {
                    stats: { selfEsteem: -15, isolation: 25 },
                    logNote: 'Day 15: My idea was stolen in the meeting. Didn\'t dare say anything.'
                }
            }
        ]
    },

    // --- DAY 20: ISOLATION ---
    'day20_lounge_isolation': {
        id: 'day20_lounge_isolation',
        day: 20,
        time: '11:15',
        location: 'Teachers\' Room',
        title: 'Empty Chair',
        content: `You go to lunch. Pekka and a couple of other experienced teachers are sitting at the same table. Conversation stops immediately as you sit next to them.

Pekka moves his chair slightly away from you and turns his back. They continue whispering. You feel completely invisible.`,
        choices: [
            {
                id: 'try_to_join',
                text: 'Try to ask something about the day',
                nextPhaseId: 'day25_ally',
                effect: {
                    stats: { isolation: 40, teamAcceptance: -30, shame: 20 },
                    logNote: 'Day 20: Social isolation at lunch. Pekka turned his back.'
                }
            },
            {
                id: 'eat_fast',
                text: 'Eat lunch quickly and leave',
                nextPhaseId: 'day25_ally',
                effect: {
                    stats: { isolation: 50, hope: -15, physicalHealth: -10 },
                    logNote: 'Day 20: Conversation died near me. Ate alone in corner.'
                }
            }
        ]
    },

    // --- DAY 25: ALLY? ---
    'day25_ally': {
        id: 'day25_ally',
        day: 25,
        time: '16:00',
        location: 'Parking Lot',
        title: 'Warning',
        content: `You are leaving for home. Another young teacher, Liisa, comes to you glancing carefully around.

LIISA: "Hey... I just wanted to say, don't mind Pekka. He has smoked many young ones out of here. But be careful, he has the principal's support."

Liisa looks scared. Dare you trust her?`,
        choices: [
            {
                id: 'trust_liisa',
                text: '"Thanks Liisa. Is there anything to be done?"',
                nextPhaseId: 'day30_evaluation',
                effect: {
                    addAlly: 'Liisa',
                    stats: { hope: 10, isolation: -20 },
                    logNote: 'Day 25: Liisa warned about Pekka. Found out I\'m not the only one.'
                }
            },
            {
                id: 'distrust_liisa',
                text: '"I\'ll manage, thanks." (Avoid risk)',
                nextPhaseId: 'day30_evaluation',
                effect: {
                    stats: { isolation: 10 },
                    logNote: 'Day 25: Liisa tried to approach, but I feared it was a trap.'
                }
            }
        ]
    },

    // --- DAY 30: EVALUATION ---
    'day30_evaluation': {
        id: 'day30_evaluation',
        day: 30,
        time: '10:00',
        location: 'Principal\'s Office',
        title: 'Surprise Feedback',
        content: `Principal calls you for a chat.

PRINCIPAL: "I have received... worrying feedback about your teaching. Several sources have said that your classes are restless and learning doesn't happen."

You know this is not true. Your classes have gone well except for the effect of Pekka's "joking".`,
        choices: [
            {
                id: 'ask_details',
                text: 'Ask for concrete examples and name sources',
                nextPhaseId: 'day40_symptoms',
                effect: {
                    stats: { teamAcceptance: -40, selfEsteem: 10 },
                    logNote: 'Day 30: Principal gave vague negative feedback. When I asked for details, he couldn\'t answer.'
                }
            },
            {
                id: 'accept_blame',
                text: '"I will try to improve my ways..."',
                nextPhaseId: 'day40_symptoms',
                effect: {
                    stats: { selfEsteem: -30, shame: 40, hope: -20 },
                    logNote: 'Day 30: Accepted false feedback. Feel like a bad teacher.'
                }
            }
        ]
    },

    // --- DAY 40: SYMPTOMS ---
    'day40_symptoms': {
        id: 'day40_symptoms',
        day: 40,
        time: '03:15',
        location: 'Home (Bedroom)',
        isCrisis: true,
        title: 'Wolf Hour',
        content: `You wake up at three at night. Heart pounding and stomach churning. Thoughts spin around false feedback.
        
(Studies show over 50% of bullying cases in teaching field last over a year).

"I don't want to go there. Just the school yard makes me nauseous."`,
        choices: [
            {
                id: 'suppress_feelings',
                text: 'Take a painkiller and force yourself to sleep',
                nextPhaseId: 'day45_sickleave',
                effect: {
                    stats: { physicalHealth: -30, hope: -20 },
                    logNote: 'Day 40: Insomnia and physical symptoms getting worse.'
                }
            },
            {
                id: 'search_help_online',
                text: 'Search info about burnout at night',
                nextPhaseId: 'day45_sickleave',
                effect: {
                    stats: { selfEsteem: -10, hope: 5 },
                    logNote: 'Day 40: Searched info about symptoms. Realize it is a stress reaction.'
                }
            }
        ]
    },

    // --- DAY 45: SICK LEAVE? ---
    'day45_sickleave': {
        id: 'day45_sickleave',
        day: 45,
        time: '07:15',
        location: 'Home',
        title: 'To Go or Not?',
        content: `You stand in the hallway with coat on, but can't open the door. Crying.

You think about calling in sick. But you know Pekka would have to substitute, which would worsen talk about your "laziness".`,
        choices: [
            {
                id: 'go_to_work',
                text: 'Force yourself to school at any cost',
                nextPhaseId: 'day60_management_meeting',
                effect: {
                    stats: { physicalHealth: -20, hope: -10 },
                    logNote: 'Day 45: Went to work sick due to fear. Can barely stand.'
                }
            },
            {
                id: 'stay_home',
                text: 'Call and report sick',
                nextPhaseId: 'day60_management_meeting',
                effect: {
                    stats: { physicalHealth: 20, teamAcceptance: -30, shame: 20 },
                    logNote: 'Day 45: Stayed home to rest. Feel guilt, but couldn\'t go.'
                }
            }
        ]
    },

    // --- DAY 60: MEETING MANAGER (SECOND ATTEMPT) ---
    'day60_management_meeting': {
        id: 'day60_management_meeting',
        day: 60,
        time: '14:00',
        location: 'Principal\'s Office',
        title: 'Talk with Principal',
        content: `You have requested a new meeting. You now tell directly about the bullying, Pekka's behavior and its effect on your health.

PRINCIPAL: "Are you quite sure now? Pekka has been here 25 years, he is a pillar of the school. Maybe this is just a misunderstanding? Teaching requires thick skin."

Principal's expression is dismissive. He checks his watch.`,
        choices: [
            {
                id: 'give_up_manager',
                text: 'Stop talking and leave',
                nextPhaseId: 'day70_union',
                effect: {
                    stats: { hope: -50, selfEsteem: -20, isolation: 30 },
                    logNote: 'Day 60: Principal belittled again. Felt that support is nowhere to be found.'
                }
            },
            {
                id: 'insist_records',
                text: 'Say that you have recorded things',
                nextPhaseId: 'day70_union',
                effect: {
                    stats: { hope: 10, teamAcceptance: -20 },
                    logNote: 'Day 60: Mentioned documentation. Principal looked scared.'
                }
            }
        ]
    },

    // --- DAY 70: UNION ---
    'day70_union': {
        id: 'day70_union',
        day: 70,
        time: '16:30',
        location: 'Phone',
        title: 'Outside Help',
        content: `You call the school's shop steward. He listens quietly.

SHOP STEWARD: "This sounds familiar. You are not the first to complain about Pekka. But without hard evidence this is word against word, and the principal protects him."

He promises to investigate, but warns about the heaviness of the process.`,
        choices: [
            {
                id: 'start_official_process',
                text: 'Request to start official process',
                nextPhaseId: 'day80_rumor',
                effect: {
                    stats: { hope: 30, teamAcceptance: -50 },
                    addAlly: 'Shop Steward',
                    logNote: 'Day 70: Contacted shop steward. Process started, even though scary.'
                }
            },
            {
                id: 'wait_and_see',
                text: 'Wait and see if situation calms down',
                nextPhaseId: 'day80_rumor',
                effect: {
                    stats: { hope: -20, isolation: 10 },
                    logNote: 'Day 70: Didn\'t dare make official report yet.'
                }
            }
        ]
    },

    // --- DAY 80: RUMOR ---
    'day80_rumor': {
        id: 'day80_rumor',
        day: 80,
        time: '09:00',
        location: 'Corridor',
        title: 'Reputation',
        content: `A rumor circulates at work that you have applied for sick leave due to "mental health problems" and that you are unsuitable to be a teacher.

Students whisper in the corridor: "Does she/he/they have that burnout?"
Pekka smiles at you widely when passing: "Hang in there."`,
        choices: [
            {
                id: 'angry_confrontation',
                text: 'Shout at Pekka in the corridor',
                nextPhaseId: 'day90_peak_crisis',
                effect: {
                    stats: { selfEsteem: -40, shame: 80 },
                    logNote: 'Day 80: Lost my temper and shouted. Played straight into their pocket ("unstable").'
                }
            },
            {
                id: 'cold_silence',
                text: 'Walk past with head high',
                nextPhaseId: 'day90_peak_crisis',
                effect: {
                    stats: { hope: 10, selfEsteem: 10 },
                    logNote: 'Day 80: Kept my cool despite rumors.'
                }
            }
        ]
    },

    // --- DAY 90: PEAK ---
    'day90_peak_crisis': {
        id: 'day90_peak_crisis',
        day: 90,
        time: '08:00',
        location: 'School Yard',
        isCrisis: true,
        title: 'Threshold Low',
        content: `You stand in the school yard. You see Pekka and the principal talking and looking at you. Pekka laughs something and principal nods.

You can't move your legs. 60% of teachers have considered changing fields. 25% quit in under 5 years.

Are you one of them?`,
        choices: [
            {
                id: 'end_suffer',
                text: 'Walk in and decide to just endure (Burnout)',
                nextPhaseId: 'END_A',
                effect: {
                    stats: { physicalHealth: 0, hope: 0, shame: 100 },
                    logNote: 'Day 90: Decided to just endure. Don\'t see a way out.'
                }
            },
            {
                id: 'end_quit',
                text: 'Turn around and resign (Change fields)',
                nextPhaseId: 'END_B',
                effect: {
                    stats: { hope: 30, selfEsteem: 50 },
                    logNote: 'Day 90: Resigned. Health is more important than this career.'
                }
            },
            {
                id: 'end_fight_turvasiipi',
                text: 'Use Turvasiipi and demand intervention',
                nextPhaseId: 'END_C',
                effect: {
                    stats: { hope: 100, selfEsteem: 80 },
                    logNote: 'Day 90: Using Turvasiipi for reporting and contacting union.'
                }
            }
        ]
    }
};
