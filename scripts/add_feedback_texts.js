const fs = require('fs');

const FEEDBACK_FI = {
    leadership: {
        culture: {
            low: "Johtaminen on epäjohdonmukaista tai autoritääristä. Luottamus esihenkilöihin on heikko.",
            medium: "Johtaminen toimii osittain, mutta läpinäkyvyydessä ja tasapuolisuudessa on parannettavaa.",
            high: "Johtaminen on esimerkillistä, reilua ja osallistavaa. Luottamus on vahvalla pohjalla."
        }
    },
    community: {
        culture: {
            low: "Yhteisössä on klikkejä ja ulossulkemista. Ilmapiiri on turvaton.",
            medium: "Yhteisö toimii rutiinolla, mutta syvempi yhteenkuuluvuus tai tuki voi puuttua.",
            high: "Yhteisö on tiivis, kannustava ja monimuotoisuutta arvostava."
        }
    },
    interaction: {
        culture: {
            low: "Ilmapiiri on hälyttävä. Kiusaamista tai syrjintää esiintyy, ja siihen ei puututa.",
            medium: "Ilmapiirissä on jännitteitä. Tiedonkulku pätkii tai ryhmäytyminen on sisäänpäinlämpiävää.",
            high: "Vuorovaikutus on avointa ja osallistavaa. Ihmiset viihtyvät ja kokevat kuuluvansa joukkoon."
        }
    },
    support: {
        culture: {
            low: "Prosessit puuttuvat tai ne eivät toimi. Avun hakeminen koetaan vaikeaksi.",
            medium: "Rakenteet ovat olemassa, mutta käytännön tasolla on epäselvyyksiä tai hitautta.",
            high: "Tukiverkko on vahva. Prosessit ovat selkeitä, nopeita ja oikeudenmukaisia."
        }
    },
    psych_safety: {
        culture: {
            low: "Turvallisuuden tunne on romuttunut. Virheitä peitellään ja pelon ilmapiiri on vallitseva.",
            medium: "Turvallisuus on vaihtelevaa. Tietyissä tilanteissa uskalletaan olla avoimia, toisissa varotaan.",
            high: "Korkea psykologinen turvallisuus. Ihmiset uskaltavat olla haavoittuvaisia ja oppia virheistä."
        }
    },
    courage: {
        culture: {
            low: "Puuttumiskynnys on liian korkea. Sivustaseuraajan rooli on yleinen.",
            medium: "Halua puuttua on, mutta keinot tai rohkeus eivät aina riitä tositilanteessa.",
            high: "Yhteisössä puututaan epäkohtiin aktiivisesti. 'Meillä ei katsota sivusta' on totta."
        }
    },
    monitoring: {
        culture: {
            low: "Ongelmia ei seurata tai niitä lakaistaan maton alle. Kyselyt eivät johda toimiin.",
            medium: "Seuranta on satunnaista tai mekaanista. Toimenpiteet jäävät usein puolitiehen.",
            high: "Kehitys on jatkuvaa ja dataohjattua. Ongelmiin reagoidaan systemaattisesti."
        }
    }
};

const FEEDBACK_EN = {
    leadership: {
        culture: {
            low: "Leadership is inconsistent or authoritarian. Trust in supervisors is weak.",
            medium: "Leadership works partially, but transparency and fairness need improvement.",
            high: "Leadership is exemplary, fair, and inclusive. Trust is solid."
        }
    },
    community: {
        culture: {
            low: "There are cliques and exclusion in the community. The atmosphere is unsafe.",
            medium: "The community functions routinely, but deeper belonging or support may be missing.",
            high: "The community is tight-knit, supportive, and values diversity."
        }
    },
    interaction: {
        culture: {
            low: "The atmosphere is alarming. Bullying or discrimination occurs and is not addressed.",
            medium: "There are tensions in the atmosphere. Information flow is broken or groups are cliquey.",
            high: "Interaction is open and inclusive. People feel comfortable and that they belong."
        }
    },
    support: {
        culture: {
            low: "Processes are missing or non-functional. Seeking help is felt to be difficult.",
            medium: "Structures exist, but there is ambiguity or slowness in practice.",
            high: "The support network is strong. Processes are clear, fast, and fair."
        }
    },
    psych_safety: {
        culture: {
            low: "The sense of safety is shattered. Mistakes are hidden and fear prevails.",
            medium: "Safety varies. In some situations openness is possible, in others people are guarded.",
            high: "High psychological safety. People create a safe space for vulnerability and learning."
        }
    },
    courage: {
        culture: {
            low: "The threshold to intervene is too high. The bystander role is common.",
            medium: "There is a desire to intervene, but means or courage are not always enough.",
            high: "Misconduct is actively addressed. 'We do not look away' is reality."
        }
    },
    monitoring: {
        culture: {
            low: "Problems are not monitored or are swept under the rug. Surveys do not lead to action.",
            medium: "Monitoring is occasional or mechanical. Actions often remain incomplete.",
            high: "Development is continuous and data-driven. Problems are reacted to systematically."
        }
    }
};

const FILES = [
    {
        path: 'src/translations/fi/lukutaito.json',
        data: FEEDBACK_FI
    },
    {
        path: 'src/translations/en/lukutaito.json',
        data: FEEDBACK_EN
    }
];

FILES.forEach(file => {
    try {
        const content = fs.readFileSync(file.path, 'utf8');
        const json = JSON.parse(content);

        // Ensure feedback structure exists
        if (!json.self_assessment.feedback) {
            json.self_assessment.feedback = {};
        }

        // Merge feedback
        Object.keys(file.data).forEach(key => {
            // Only overwrite if missing or we want to force update (let's force update for consistency)
            json.self_assessment.feedback[key] = file.data[key];
        });

        fs.writeFileSync(file.path, JSON.stringify(json, null, 4), 'utf8');
        console.log(`✅ Updated feedback in ${file.path}`);

    } catch (e) {
        console.error(`❌ Error updating ${file.path}:`, e.message);
    }
});
