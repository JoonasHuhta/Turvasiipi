const fs = require('fs');

// 17 additional scenarios to reach 20 total
const additionalScenariosFI = [
    {
        id: 4,
        text: "Palavereissa muut keskeyttävät sinut jatkuvasti, mutta kuuntelevat tarkasti kun muut puhuvat.",
        isBullying: true,
        explanation: "Systemaattinen vaikeneminen ja kunnioituksen puute on vallankäytön muoto."
    },
    {
        id: 5,
        text: "Esimiehesi antaa suoraa palautetta työstäsi kahden kesken, myös negatiivista.",
        isBullying: false,
        explanation: "Rakentava, kahden kesken tapahtuva palaute on normaalia johtamista."
    },
    {
        id: 6,
        text: "Saat tietää tärkeistä kokouksista vasta jälkikäteen, vaikka asia koskee työtäsi.",
        isBullying: true,
        explanation: "Tiedon pimittäminen ja sivuuttaminen on klassinen kiusaamisen muoto."
    },
    {
        id: 7,
        text: "Työkaveri on usein myöhässä palavereista, mikä ärsyttää sinua.",
        isBullying: false,
        explanation: "Yksittäisen henkilön huono käytös ei ole sinun kiusaamistasi, vaan hänen ongelmaansa."
    },
    {
        id: 8,
        text: "Lounastauolla muut vaikenevat kun istut pöytään, ja keskustelut alkavat vasta kun lähdet.",
        isBullying: true,
        explanation: "Sosiaalinen eristäminen ja näkymättömäksi tekeminen on selkeää kiusaamista."
    },
    {
        id: 9,
        text: "Esimiehesi pyytää sinua tekemään ylitöitä kiireellisen projektin vuoksi.",
        isBullying: false,
        explanation: "Satunnaiset ylityöpyynnöt työtehtävien hoitamiseksi ovat normaalia, ellei se kohdistu vain sinuun."
    },
    {
        id: 10,
        text: "Työtoverisi levittävät huhuja yksityiselämästäsi eteenpäin organisaatiossa.",
        isBullying: true,
        explanation: "Yksityisyy den rikkominen ja juoruilu on manipulointia ja kiusaamista."
    },
    {
        id: 11,
        text: "Saat sähköpostia, jossa pyydetään lisäselvitystä työhön liittyvästä asiasta.",
        isBullying: false,
        explanation: "Normaali työkommunikaatio ja tarkentavat kysymykset eivät ole kiusaamista."
    },
    {
        id: 12,
        text: "Esimiehesi huutaa sinulle kaikkien kuullen virheestä, jonka teit.",
        isBullying: true,
        explanation: "Julkinen nöyryyttäminen on aina väärin ja loukkaa ihmisarvoa."
    },
    {
        id: 13,
        text: "Tiimisi jäsen kysyy, voisitko auttaa häntä tehtävässä jossa sinulla on enemmän kokemusta.",
        isBullying: false,
        explanation: "Avunpyyntö ja vertaistuki ovat terveen työyhteisön merkkejä."
    },
    {
        id: 14,
        text: "Kaikki tiimin muut saavat kutsun yhteiseen vapaa-ajan tapahtumaan, mutta sinua ei kutsuta.",
        isBullying: true,
        explanation: "Tahallinen ulossulkeminen sosiaalisista tilanteista on eristämistä."
    },
    {
        id: 15,
        text: "Esimiehesi kieltää sinua puhumasta ongelmasta kenellekään muulle organisaatiossa.",
        isBullying: true,
        explanation: "Vaikenemisen kulttuuri ja vaientaminen mahdollistavat kiusaamisen jatkumisen."
    },
    {
        id: 16,
        text: "Joudut odottamaan esimiehesi palautetta pidempään kuin muut tiimissä.",
        isBullying: false,
        explanation: "Esimiehen kiireisyys voi selittää viiveen - yhden tapauksen perusteella ei voi päätellä kiusaamista."
    },
    {
        id: 17,
        text: "Sinulle annetaan mahdottomia määräaikoja tehtäviin tarkoituksella, jotta epäonnistut.",
        isBullying: true,
        explanation: "Tarkoituksellinen epäonnistumisen aiheuttaminen on vallankäyttöä ja sabotaasia."
    },
    {
        id: 18,
        text: "Työkaveri nauraa ääneen, kun teet virheen esityksessä.",
        isBullying: true,
        explanation: "Toisen nöyryyttäminen ja ilkkuminen ammattitaidon hetkellisen pettämisen vuoksi on loukkaavaa."
    },
    {
        id: 19,
        text: "Projektiryhmässä eri jäsenillä on erilaisia näkemyksiä toteutustavasta.",
        isBullying: false,
        explanation: "Erilaiset mielipiteet ja näkökulmat ovat normaalia tiimityötä ja konfliktia."
    },
    {
        id: 20,
        text: "Esimiehesi antaa sinulle jatkuvasti tehtäviä jotka ovat selvästi ammattitaitosi alapuolella.",
        isBullying: true,
        explanation: "Tahallinen alisuoriutumaan pakottaminen ja osaamisen kahlitseminen on kiusaamista."
    }
];

// English versions
const additionalScenariosEN = [
    {
        id: 4,
        text: "In meetings, others constantly interrupt you, but listen carefully when others speak.",
        isBullying: true,
        explanation: "Systematic silencing and lack of respect is a form of power abuse."
    },
    {
        id: 5,
        text: "Your supervisor gives you direct feedback about your work in private, including negative feedback.",
        isBullying: false,
        explanation: "Constructive, private feedback is normal management practice."
    },
    {
        id: 6,
        text: "You learn about important meetings only afterwards, even though the topic concerns your work.",
        isBullying: true,
        explanation: "Withholding information and excluding you is a classic form of bullying."
    },
    {
        id: 7,
        text: "A colleague is often late to meetings, which annoys you.",
        isBullying: false,
        explanation: "One person's bad behavior isn't bullying you - it's their problem."
    },
    {
        id: 8,
        text: "During lunch break, others go silent when you sit down, and conversations start only after you leave.",
        isBullying: true,
        explanation: "Social isolation and making someone invisible is clear bullying."
    },
    {
        id: 9,
        text: "Your supervisor asks you to work overtime due to an urgent project.",
        isBullying: false,
        explanation: "Occasional overtime requests to handle work tasks are normal, unless it targets only you."
    },
    {
        id: 10,
        text: "Coworkers spread rumors about your private life throughout the organization.",
        isBullying: true,
        explanation: "Violating privacy and gossiping is manipulation and bullying."
    },
    {
        id: 11,
        text: "You receive an email requesting clarification on a work-related matter.",
        isBullying: false,
        explanation: "Normal work communication and clarifying questions are not bullying."
    },
    {
        id: 12,
        text: "Your supervisor yells at you in front of everyone about a mistake you made.",
        isBullying: true,
        explanation: "Public humiliation is always wrong and violates human dignity."
    },
    {
        id: 13,
        text: "A team member asks if you could help them with a task where you have more experience.",
        isBullying: false,
        explanation: "Asking for help and peer support are signs of a healthy workplace."
    },
    {
        id: 14,
        text: "Everyone else on the team gets invited to a social event, but you're not invited.",
        isBullying: true,
        explanation: "Deliberate exclusion from social situations is isolation."
    },
    {
        id: 15,
        text: "Your supervisor forbids you from talking about the problem to anyone else in the organization.",
        isBullying: true,
        explanation: "Culture of silence and silencing enables bullying to continue."
    },
    {
        id: 16,
        text: "You have to wait longer for your supervisor's feedback than others on the team.",
        isBullying: false,
        explanation: "Supervisor's busyness may explain the delay - you can't conclude bullying from one instance."
    },
    {
        id: 17,
        text: "You're given impossible deadlines for tasks on purpose, so that you fail.",
        isBullying: true,
        explanation: "Deliberately causing failure is power abuse and sabotage."
    },
    {
        id: 18,
        text: "A coworker laughs out loud when you make a mistake in a presentation.",
        isBullying: true,
        explanation: "Humiliating and mocking someone for a momentary lapse in professional competence is offensive."
    },
    {
        id: 19,
        text: "In a project group, different members have different views on how to proceed.",
        isBullying: false,
        explanation: "Different opinions and perspectives are normal teamwork and conflict."
    },
    {
        id: 20,
        text: "Your supervisor continuously gives you tasks that are clearly below your professional level.",
        isBullying: true,
        explanation: "Deliberately forcing underperformance and limiting competence is bullying."
    }
];

try {
    console.log('Adding 17 additional scenarios to quicktest...');
    const fiFile = 'src/translations/fi/lukutaito.json';
    const enFile = 'src/translations/en/lukutaito.json';

    const fiData = JSON.parse(fs.readFileSync(fiFile, 'utf8'));
    const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

    // Add to FI
    if (fiData.quicktest?.scenarios) {
        fiData.quicktest.scenarios = [...fiData.quicktest.scenarios, ...additionalScenariosFI];
        console.log('✅ FI: Total scenarios:', fiData.quicktest.scenarios.length);
    }

    // Add to EN
    if (enData.quicktest?.scenarios) {
        enData.quicktest.scenarios = [...enData.quicktest.scenarios, ...additionalScenariosEN];
        console.log('✅ EN: Total scenarios:', enData.quicktest.scenarios.length);
    }

    // Save
    fs.writeFileSync(fiFile, JSON.stringify(fiData, null, 4), 'utf8');
    fs.writeFileSync(enFile, JSON.stringify(enData, null, 4), 'utf8');

    console.log('\n✅ Quick Test now has 20 scenarios in both languages');

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
