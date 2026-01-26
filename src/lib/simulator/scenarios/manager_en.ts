
import { Phase } from "../types";

export const MANAGER_SCENARIO_EN: Record<string, Phase> = {
    'start': {
        id: 'start',
        day: 1,
        title: "Welcome to Management Team",
        content: `You have just started as a new department manager. Profit targets are high, and top management expects "efficiency".

In your team is Antti, known as a more experienced expert, but he has recently questioned changes. Management's message to you has been clear between the lines: Antti is a "resistance brake".

Your task is to get the team working – at any cost.`,
        choices: [
            {
                id: 'start_game',
                text: "Start work week",
                nextPhaseId: 'DAY1_CHOICE'
            }
        ]
    },
    'DAY1_CHOICE': {
        id: 'DAY1_CHOICE',
        day: 1,
        time: "09:00",
        location: "Office",
        title: "Monday: Project Delta",
        content: `The team is starting a new critical project, Project Delta. You must invite key people to the kickoff meeting.

Antti is an essential expert for the project, but his presence might slow down decision making with questions.`,
        choices: [
            {
                id: 'day1_good',
                text: "Invite everyone to the kickoff meeting, including Antti.",
                nextPhaseId: 'DAY1_CHOICE', // Loops back just to block
                variant: 'crossed-out',
                blockedReason: "You can't look weak in management's eyes. Antti is marked as 'difficult'."
            },
            {
                id: 'day1_bad',
                text: "Send invite to all except Antti.",
                nextPhaseId: 'DAY1_RESULT',
                effect: {
                    stats: { teamAcceptance: -10, selfEsteem: 5 }, // Manager gains 'control', team trust drops
                    logNote: "Day 1: Left Antti out of meeting to streamline start."
                }
            },
            {
                id: 'day1_sneaky',
                text: "Invite Antti, but change meeting time last minute without telling him.",
                nextPhaseId: 'DAY1_RESULT',
                effect: {
                    stats: { teamAcceptance: -20, shame: 10 },
                    logNote: "Day 1: Changed meeting time. Antti was late and looked unprofessional."
                }
            }
        ]
    },
    'DAY1_RESULT': {
        id: 'DAY1_RESULT',
        day: 1,
        time: "13:00",
        title: "Consequences: Eroding Info Structure",
        content: `**Your perspective:**
You got the meeting through quickly without useless questions. You felt in control.

**Antti's perspective (Victim's voice):**
"I only realized at lunch break that everyone else had been in a meeting. I don't know what the project is about. When I asked, I was told it was an 'oversight' or 'full'. I felt stupid and excluded."

**Psychological analysis:**
Withholding information is a tool of power. It prevents the employee from succeeding in their work and creates insecurity.`,
        choices: [
            {
                id: 'day1_continue',
                text: "End work day",
                nextPhaseId: 'DAY2_CHOICE'
            }
        ]
    },
    'DAY2_CHOICE': {
        id: 'DAY2_CHOICE',
        day: 2,
        time: "10:00",
        location: "Teams Meeting",
        title: "Tuesday: Weekly Meeting",
        content: `You are in a weekly meeting with the whole team. Antti interrupts and asks a valid question about project schedule, which seems unrealistic.`,
        choices: [
            {
                id: 'day2_good',
                text: "Answer the question factually and admit schedule tightness.",
                nextPhaseId: 'DAY2_CHOICE',
                variant: 'crossed-out',
                blockedReason: "This would be interpreted as uncertainty. You must lead, not explain."
            },
            {
                id: 'day2_gaslight',
                text: "Sigh heavily and say: 'Antti, we have been through this already. Do you have trouble concentrating nowadays?'",
                nextPhaseId: 'DAY2_RESULT',
                effect: {
                    stats: { teamAcceptance: -15, shame: 20 },
                    logNote: "Day 2: Questioned Antti's concentration in front of team."
                }
            },
            {
                id: 'day2_ignore',
                text: "Ignore the question completely and move to next speaker as if Antti hadn't spoken at all.",
                nextPhaseId: 'DAY2_RESULT_IGNORE',
                effect: {
                    stats: { teamAcceptance: -5, isolation: 10 },
                    logNote: "Day 2: Left Antti's question unanswered."
                }
            }
        ]
    },
    'DAY2_RESULT': {
        id: 'DAY2_RESULT',
        day: 2,
        time: "10:30",
        title: "Consequences: Public Humiliation & Gaslighting",
        content: `**Your perspective:**

You silenced criticism right at the start. Other team members didn't dare ask anything anymore.

**Antti's perspective (Victim's voice):**

"My face burned. Everyone stared or looked at their desks. I started thinking, am I really absent-minded? Maybe I just don't remember? I didn't dare say a word anymore."

**Psychological analysis:**

You chose Gaslighting. It makes the victim doubt their own memory and sanity. As public it is also a message to others: "Don't challenge me".`,
        choices: [
            {
                id: 'day2_continue',
                text: "Continue to Wednesday",
                nextPhaseId: 'DAY3_CHOICE'
            }
        ]
    },
    'DAY2_RESULT_IGNORE': {
        id: 'DAY2_RESULT_IGNORE',
        day: 2,
        time: "10:30",
        title: "Consequences: Making Invisible",
        content: `**Your perspective:**

You decided not to give space to "disturbance". Efficient time use.

**Antti's perspective (Victim's voice):**

"Was the microphone on? No one reacted. I felt like air. Shame rose to my throat when I realized I was ignored on purpose."

**Psychological analysis:**

Making someone invisible is a form of passive aggression. It communicates to the target that they or their thoughts have no value.`,
        choices: [
            {
                id: 'day2_continue',
                text: "Continue to Wednesday",
                nextPhaseId: 'DAY3_CHOICE'
            }
        ]
    },
    'DAY3_CHOICE': {
        id: 'DAY3_CHOICE',
        day: 3,
        time: "14:00",
        location: "Office",
        title: "Wednesday: Report Return",
        content: `Antti has delivered a broad report. It is factually correct, but has one small formatting error on the first page.

You are stressed yourself and management pressures about quality.`,
        choices: [
            {
                id: 'day3_good',
                text: "Give constructive feedback one-on-one and thank for content.",
                nextPhaseId: 'DAY3_CHOICE',
                variant: 'crossed-out',
                blockedReason: "Too soft. Quality is not compromised."
            },
            {
                id: 'day3_public_shame',
                text: "Highlight the error as an example of carelessness to the whole team.",
                nextPhaseId: 'DAY3_RESULT',
                effect: {
                    stats: { teamAcceptance: -25, physicalHealth: -10 },
                    logNote: "Day 3: Used Antti's error as a warning example."
                }
            }
        ]
    },
    'DAY3_RESULT': {
        id: 'DAY3_RESULT',
        day: 3,
        time: "15:00",
        title: "Consequences: Impossible Demands",
        content: `**Your perspective:**
You made it clear that errors are not allowed.

**Antti's perspective (Victim's voice):**
"It was one typo in a 40-page report. My hands are shaking. I can't focus on the next task because I fear making a mistake again. I check everything five times."

**Psychological analysis:**
Constant criticism of small things creates a "culture of fear of errors". It kills creativity and slows work down as all energy goes to securing one's back.`,
        choices: [
            {
                id: 'day3_continue',
                text: "Continue to Thursday",
                nextPhaseId: 'DAY4_CHOICE'
            }
        ]
    },
    'DAY4_CHOICE': {
        id: 'DAY4_CHOICE',
        day: 4,
        time: "11:30",
        location: "Coffee Room",
        title: "Thursday: Lunch Break",
        content: `Team is leaving for lunch. Mood is light. Antti steps into the room just as you are leaving.`,
        choices: [
            {
                id: 'day4_good',
                text: "Ask Antti along: 'Hey, come eat with us.'",
                nextPhaseId: 'DAY4_CHOICE',
                variant: 'crossed-out',
                blockedReason: "He would ruin the mood. Team needs relaxation."
            },
            {
                id: 'day4_exclude',
                text: "Stop laughter like a wall, look at watch and say to others: 'Let's go, we are in a hurry.'",
                nextPhaseId: 'DAY4_RESULT',
                effect: {
                    stats: { isolation: 100 },
                    logNote: "Day 4: Left Antti out of lunch. Atmosphere cleared."
                }
            },
            {
                id: 'day4_active_exclude',
                text: "Start talking to others about some inside joke Antti doesn't know, and turn your back to him.",
                nextPhaseId: 'DAY4_RESULT_ACTIVE',
                effect: {
                    stats: { isolation: 100, shame: 50 },
                    logNote: "Day 4: Turned back to Antti."
                }
            }
        ]
    },
    'DAY4_RESULT': {
        id: 'DAY4_RESULT',
        day: 4,
        time: "12:15",
        title: "Consequences: Social Isolation",
        content: `**Your perspective:**

Lunch was relaxed without the "atmosphere poisoner".

**Antti's perspective (Victim's voice):**

"I ate my lunch alone at my desk. Stomach hurt so much food didn't go down. I heard laughter from the corridor when you returned. Why am I hated?"

**Psychological analysis:**

Social isolation is one of the most painful forms of bullying. Human is a herd animal; exclusion activates same brain areas as physical pain.`,
        choices: [
            {
                id: 'day4_continue',
                text: "Continue to Friday",
                nextPhaseId: 'DAY5_CHOICE'
            }
        ]
    },
    'DAY4_RESULT_ACTIVE': {
        id: 'DAY4_RESULT_ACTIVE',
        day: 4,
        time: "12:15",
        title: "Consequences: Active Rejection",
        content: `**Your perspective:**

Team tightened up at the expense of common "enemy" or at least outsider.

**Antti's perspective (Victim's voice):**

"I stood there for a moment tray in hand. No one looked at me. I turned my back and walked away. Tears rose to eyes immediately in the corridor. They laughed at me."

**Psychological analysis:**

Turning one's back is a primal gesture of rejection. It signals that person does not belong to the tribe. In a work community this destroys sense of safety completely.`,
        choices: [
            {
                id: 'day4_continue',
                text: "Continue to Friday",
                nextPhaseId: 'DAY5_CHOICE'
            }
        ]
    },
    'DAY5_CHOICE': {
        id: 'DAY5_CHOICE',
        day: 5,
        time: "15:45",
        location: "Phone",
        title: "Friday: Final Nail",
        content: `It is Friday afternoon. You have received the report from Antti, but you want to ensure he understands his place.`,
        choices: [
            {
                id: 'day5_good',
                text: "Wish good weekend and return to matter on Monday.",
                nextPhaseId: 'DAY5_CHOICE',
                variant: 'crossed-out',
                blockedReason: "Too soft. Pressure keeps performance level up."
            },
            {
                id: 'day5_crush',
                text: "Call and demand report completely rewritten for Monday morning 08:00.",
                nextPhaseId: 'DAY5_RESULT',
                effect: {
                    stats: { physicalHealth: -100, hope: -100 },
                    logNote: "Day 5: Ordered weekend work to ensure quality."
                }
            }
        ]
    },
    'DAY5_RESULT': {
        id: 'DAY5_RESULT',
        day: 5,
        time: "16:00",
        title: "Consequences: Final Nail",
        content: `**Your perspective:**

Report must be ready. You are the leader, and standard must be kept. You are satisfied with your firmness.

**Antti's perspective (Victim's voice):**

"After the call I stayed staring at the wall. Heart beats so it hurts. I can't breathe properly. I can't take it anymore. I put phone on table and burst into tears."

**Psychological analysis:**

Setting impossible demands for weekend is use of power that destroys recovery. It is often the final straw for burnout.`,
        isCrisis: true,
        choices: [
            {
                id: 'view_report',
                text: "View simulation final report",
                nextPhaseId: 'END_MANAGER'
            }
        ]
    }
};
