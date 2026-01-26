const fs = require('fs');

const RISK_FEEDBACK_FI_SOFT = {
    itsetunto: { risk: { low: "Itsetuntosi on vakaa.", medium: "Työ on alkanut vaikuttaa itsetuntoosi.", high: "Itsetuntosi on kovilla nykyisessä tilanteessa." } },
    todellisuus: { risk: { low: "Luotat omiin havaintoihisi.", medium: "Alat epäillä omia havaintojasi.", high: "Uskosi omiin havaintoihin on koetuksella." } },
    eristyksissä: { risk: { low: "Olet osa yhteisöä.", medium: "Koet ulkopuolisuuden tunnetta.", high: "Koet vahvaa eristämistä työyhteisössä." } },
    fyysiset: { risk: { low: "Kehosi voi hyvin.", medium: "Stressi oireilee fyysisesti.", high: "Kehosi käy ylikierroksilla. Pysähdy kuuntelemaan." } },
    käyttäytyminen: { risk: { low: "Toimit omana itsenäsi.", medium: "Olet varuillasi sosiaalisissa tilanteissa.", high: "Muutat käytöstäsi selviytyäksesi arjesta." } }
};

const RISK_FEEDBACK_EN_SOFT = {
    itsetunto: { risk: { low: "Your self-esteem is stable.", medium: "Work is affecting your self-worth.", high: "Your self-esteem is under strain." } },
    todellisuus: { risk: { low: "You trust your perceptions.", medium: "You are starting to doubt your perceptions.", high: "Your confidence in your own reality is tested." } },
    eristyksissä: { risk: { low: "You feel included.", medium: "You feel some exclusion.", high: "You feel strongly isolated from the community." } },
    fyysiset: { risk: { low: "Physical health is good.", medium: "Stress is showing physical symptoms.", high: "Your body is in high alert. Pause and listen." } },
    käyttäytyminen: { risk: { low: "You act as yourself.", medium: "You are guarded in social situations.", high: "You are altering your behavior to cope." } }
};

const FILES = [
    { path: 'src/translations/fi/lukutaito.json', risks: RISK_FEEDBACK_FI_SOFT },
    { path: 'src/translations/en/lukutaito.json', risks: RISK_FEEDBACK_EN_SOFT }
];

FILES.forEach(conf => {
    try {
        const content = fs.readFileSync(conf.path, 'utf8');
        const json = JSON.parse(content);

        // Ensure path exists: self_assessment.feedback
        if (!json.self_assessment || !json.self_assessment.feedback) {
            console.error(`❌ Structure missing in ${conf.path}`);
            return;
        }

        Object.keys(conf.risks).forEach(key => {
            if (!json.self_assessment.feedback[key]) json.self_assessment.feedback[key] = {};
            // Deep merge only risks
            Object.assign(json.self_assessment.feedback[key], conf.risks[key]);
        });

        fs.writeFileSync(conf.path, JSON.stringify(json, null, 4), 'utf8');
        console.log(`✅ Softened feedback in ${conf.path}`);

    } catch (e) {
        console.error(`❌ Error processing ${conf.path}:`, e.message);
    }
});
