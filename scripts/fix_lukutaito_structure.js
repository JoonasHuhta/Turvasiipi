const fs = require('fs');

const SITUATION_SECTIONS_FI = {
    "itsetunto": "Itsetunto",
    "todellisuus": "Todellisuudentaju",
    "eristyksissä": "Eristäminen",
    "fyysiset": "Fyysiset oireet",
    "käyttäytyminen": "Käyttäytyminen"
};

const SITUATION_SECTIONS_EN = {
    "itsetunto": "Self-esteem",
    "todellisuus": "Sense of Reality",
    "eristyksissä": "Isolation",
    "fyysiset": "Physical Symptoms",
    "käyttäytyminen": "Behavior"
};

const RISK_FEEDBACK_FI = {
    itsetunto: { risk: { low: "Itsetuntosi on vakaa.", medium: "Työ on alkanut murentaa itsetuntoasi.", high: "Itsetuntosi on vaarassa romahtaa." } },
    todellisuus: { risk: { low: "Luotat omiin havaintoihisi.", medium: "Alat epäillä omia havaintojasi (gaslighting).", high: "Todellisuudentajusi horjuu vakavasti manipuloinnin takia." } },
    eristyksissä: { risk: { low: "Olet osa yhteisöä.", medium: "Sinua suljetaan ulkopuolelle hienovaraisesti.", high: "Olet täysin eristetty työyhteisöstä." } },
    fyysiset: { risk: { low: "Kehosi voi hyvin.", medium: "Stressi oireilee fyysisesti (uni, vatsa).", high: "Kehosi on hälytystilassa. Terveysriski." } },
    käyttäytyminen: { risk: { low: "Toimit kuten ennenkin.", medium: "Välttelet tilanteita ja olet varuillasi.", high: "Persoonallisuutesi on muuttunut pelon takia." } }
};

const RISK_FEEDBACK_EN = {
    itsetunto: { risk: { low: "Your self-esteem is stable.", medium: "Work is eroding your self-worth.", high: "Your self-esteem is at critical risk." } },
    todellisuus: { risk: { low: "You trust your perceptions.", medium: "You doubt your reality (gaslighting).", high: "Your sense of reality is severely compromised." } },
    eristyksissä: { risk: { low: "You are included.", medium: "You are being subtly excluded.", high: "You are totally isolated." } },
    fyysiset: { risk: { low: "Physical health is good.", medium: "Stress is manifesting physically.", high: "Your body is in alarm state. Health risk." } },
    käyttäytyminen: { risk: { low: "Behavior is normal.", medium: "You avoid situations and are guarded.", high: "Your personality has changed due to fear." } }
};

const FILES = [
    { path: 'src/translations/fi/lukutaito.json', sections: SITUATION_SECTIONS_FI, risks: RISK_FEEDBACK_FI },
    { path: 'src/translations/en/lukutaito.json', sections: SITUATION_SECTIONS_EN, risks: RISK_FEEDBACK_EN }
];

FILES.forEach(conf => {
    try {
        const content = fs.readFileSync(conf.path, 'utf8');
        const json = JSON.parse(content);

        // Keys to move under self_assessment
        const keysToMove = ['situation_data', 'culture_data', 'sections', 'feedback', 'answers', 'situations', 'cultures'];

        // Create wrapper if not exists (or use existing but it's likely mixed)
        const selfAssessment = json.self_assessment || {};

        keysToMove.forEach(key => {
            if (json[key]) {
                selfAssessment[key] = json[key];
                delete json[key]; // Remove from root
            } else if (selfAssessment[key]) {
                // Already inside, do nothing
            }
        });

        // Inject missing sections headers
        if (!selfAssessment.sections) selfAssessment.sections = {};
        Object.assign(selfAssessment.sections, conf.sections);

        // Inject missing risk feedback
        if (!selfAssessment.feedback) selfAssessment.feedback = {};
        Object.keys(conf.risks).forEach(key => {
            if (!selfAssessment.feedback[key]) selfAssessment.feedback[key] = {};
            Object.assign(selfAssessment.feedback[key], conf.risks[key]);
        });

        // Assign back to root
        json.self_assessment = selfAssessment;

        fs.writeFileSync(conf.path, JSON.stringify(json, null, 4), 'utf8');
        console.log(`✅ Restructured and updated ${conf.path}`);

    } catch (e) {
        console.error(`❌ Error processing ${conf.path}:`, e.message);
    }
});
