import { Phase } from "../types";

export const INFORMATION_SHADOW_SCENARIO_EN: Record<string, Phase> = {
    start: {
        id: 'start',
        day: 1,
        time: '10:00',
        title: "The Dropped Thread",
        content: `
You are a team member responsible for part A of Project X. In the morning, you notice others talking about a "new direction" that you have no clue about.

**Your thoughts:**
"What are they talking about? I checked emails and Slack, nothing. Was there another 'unofficial' meeting in the kitchen?"

**Situation:**
You have fallen into the **Information Shadow**. Information is not directly denied to you, but it is also not actively shared with you.
`,
        choices: [
            {
                id: 'ask_politely',
                text: "Ask directly: 'I noticed the plan has changed, can you update me?'",
                nextPhaseId: 'THE_SOCIAL_GATE',
                effect: {
                    stats: {
                        selfEsteem: +5,
                        teamAcceptance: +5
                    },
                    logNote: "I asked for an update on the changed plan. Colleague said: 'Oh right, we forgot to tell you...'",
                    customFeedback: "Good activity. You got the info, but noticed it didn't come automatically."
                }
            },
            {
                id: 'ignore_and_wait',
                text: "Assume someone will tell you later and continue your work",
                nextPhaseId: 'THE_SOCIAL_GATE',
                effect: {
                    stats: {
                        selfEsteem: -10,
                        hope: -5
                    },
                    logNote: "I noticed the communication gap but didn't react immediately.",
                    customFeedback: "While waiting, the gap between you and the rest of the team grows. The Information Shadow deepens."
                }
            }
        ]
    },

    THE_SOCIAL_GATE: {
        id: 'THE_SOCIAL_GATE',
        day: 20,
        time: '12:30',
        title: "Coffee Room Power Structures",
        content: `
Two colleagues are talking about the project at lunch. When you enter the room, they go silent and change the subject to the weather.

**Feeling:**
This is a classic sign of **ostracism**. You have been shut out of the social circle.

**Your thoughts:**
"Did I do something wrong? Why did they stop talking?"
`,
        choices: [
            {
                id: 'forced_entry',
                text: "Force yourself into the conversation: 'Were you talking about the project?'",
                nextPhaseId: 'THE_MISSING_INVITE',
                effect: {
                    stats: {
                        teamAcceptance: -10,
                        selfEsteem: -5
                    },
                    logNote: "I tried to join a closed conversation. reception was cold.",
                    customFeedback: "Intruding might feel aggressive to them if they want to keep their circle closed."
                }
            },
            {
                id: 'document_pattern',
                text: "Note the situation and record it as an observation",
                nextPhaseId: 'THE_MISSING_INVITE',
                effect: {
                    stats: {
                        selfEsteem: +10,
                        hope: +5
                    },
                    logNote: "I observed social exclusion in the coffee room. Colleagues X and Y went silent when I arrived.",
                    customFeedback: "This is important. You don't take the blame, but observe the pattern as an outsider."
                }
            }
        ]
    },

    THE_MISSING_INVITE: {
        id: 'THE_MISSING_INVITE',
        day: 50,
        time: '15:00',
        title: "The Meeting That Didn't Exist",
        content: `
You walk past the conference room and see your entire team there - except you. Later it turns out they held a "brainstorming session" to which you "weren't bothered because you are so focused on your work".

**Message:**
They use your neurodiversity (your ability to focus) as a justification for leaving you out of decision making.

**Claim:** "We were just protecting your hyperfocus state!"
`,
        choices: [
            {
                id: 'accept_protection',
                text: "Thank them for the 'protection' and accept the explanation",
                nextPhaseId: 'END_ISOLATION',
                effect: {
                    stats: {
                        teamAcceptance: +5,
                        selfEsteem: -30,
                        hope: -20
                    },
                    logNote: "I accepted the explanation for exclusion as 'protection'. I feel useless.",
                    customFeedback: "They got what they wanted: you out of decision making and your 'approval' for it."
                }
            },
            {
                id: 'assert_inclusion',
                text: "State: 'I decide myself when my focus needs protection. I want an invite to all meetings.'",
                nextPhaseId: 'THE_FINAL_SHOWDOWN',
                effect: {
                    stats: {
                        selfEsteem: +20,
                        teamAcceptance: 0,
                        hope: +10
                    },
                    logNote: "I set a boundary for receiving information. I demanded inclusion.",
                    customFeedback: "Strong boundary setting! You restored your agency."
                }
            }
        ]
    },

    THE_FINAL_SHOWDOWN: {
        id: 'THE_FINAL_SHOWDOWN',
        day: 80,
        time: '09:00',
        title: "Breaking the Isolation",
        content: `
You have demanded information and it seems to annoy others. You are starting to be regarded as "demanding" and "difficult".

**Sari (Boss):** "Alex, it feels like you are very aggressive about getting this info. Why can't you just trust the team?"

**Choice:**
Now is the time to present the log and show how many times you have been left out of critical information.
`,
        choices: [
            {
                id: 'show_log',
                text: "Present the log: 'Here are 12 times in 3 months when I didn't get info. This is not a lack of trust, but a system error.'",
                nextPhaseId: 'END_NEW_START',
                effect: {
                    stats: {
                        hope: +40,
                        selfEsteem: +30
                    },
                    logNote: "I presented the log of communication gaps. The boss could no longer ignore the issue as a 'feeling'.",
                    customFeedback: "Bingo! It is impossible to argue against facts with feelings."
                }
            },
            {
                id: 'soften_stance',
                text: "Back down: 'Maybe I've been a bit sensitive, sorry.'",
                nextPhaseId: 'END_SHADOW',
                effect: {
                    stats: {
                        selfEsteem: -40,
                        teamAcceptance: +20
                    },
                    logNote: "I backed down and apologized for being 'sensitive'. Information Shadow remains.",
                    customFeedback: "You got social peace, but lost your right to information and professional credibility."
                }
            }
        ]
    },

    // ENDINGS
    END_BURNOUT: {
        id: 'END_BURNOUT',
        day: 90,
        title: "Total Isolation",
        content: "Burnout",
        choices: []
    },
    END_NEW_START: {
        id: 'END_NEW_START',
        day: 90,
        title: "Light in the Shadow",
        content: "Success",
        choices: []
    },
    END_CONFLICT: {
        id: 'END_CONFLICT',
        day: 90,
        title: "Invisible Employee",
        content: "Conflict",
        choices: []
    },
    // Fix for missing phase ID reference in choices above, though END_ISOLATION and END_SHADOW were used as NextPhaseId but distinct keys were END_BURNOUT etc.
    // Based on original file logical mapping:
    // accept_protection -> END_ISOLATION which likely maps to END_BURNOUT logic or created content
    // Let's create aliases or fix the NextPhaseIds.
    // In original file:
    // nextPhaseId: 'END_ISOLATION' -> key doesn't exist in original file? 
    // Wait, let's check original file content again.
    // Original has END_BURNOUT, END_NEW_START, END_CONFLICT.
    // But choices refer to END_ISOLATION, END_SHADOW.
    // Implicitly handled by GameEngine? Or bug in original?
    // Let's map them to existing keys to be safe or add them.
    // Actually, I should probably match the keys exactly as in my translation to avoid errors.
    // Original:
    //   nextPhaseId: 'END_ISOLATION'
    //   nextPhaseId: 'END_SHADOW'
    // But keys are END_BURNOUT, END_NEW_START, END_CONFLICT.
    // This looks like a bug in the original file too, or GameEngine handles fuzzy matching (unlikely).
    // I will add the missing keys to be safe.

    END_ISOLATION: {
        id: 'END_ISOLATION',
        day: 90,
        title: "Total Isolation",
        content: "Burnout",
        choices: []
    },
    END_SHADOW: {
        id: 'END_SHADOW',
        day: 90,
        title: "Staying in Shadow",
        content: "Conflict",
        choices: []
    }
};
