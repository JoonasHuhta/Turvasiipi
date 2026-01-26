const fs = require('fs');

// Additional 10 questions for culture thermometer (total will be 20)
const additionalQuestionsEN = [
    "Employees are recruited and promoted fairly, not based on personal relationships.",
    "I have received clear information about acceptable and unacceptable behavior in the workplace.",
    "At our workplace, newcomers are welcomed and integrated regardless of their background.",
    "Workplace conflicts are addressed constructively, not swept under the rug.",
    "I feel I can be honest about workload and stress without being seen as weak.",
    "Our team has regular conversations about well-being and culture.",
    "I have observed that all employees are treated with equal respect regardless of their role.",
    "I trust that HR and management actually follow through on reported issues.",
    "The atmosphere at work allows me to relax and bring my best performance.",
    "Our organization has clear, written anti-bullying policies that everyone knows."
];

const additionalQuestionsFI = [
    "Työntekijöitä palkataan ja ylennetään oikeudenmukaisesti, ei henkilösuhteiden perusteella.",
    "Olen saanut selkeää tietoa siitä, mikä käyttäytyminen on hyväksyttävää ja mikä ei työpaikalla.",
    "Työpaikallani uudet tulijat otetaan vastaan ja integroidaan taustasta riippumatta.",
    "Työpaikan konfliktit käsitellään rakentavasti, ei mätä maton alle.",
    "Tunnen voivani puhua rehellisesti työmäärästä ja stressistä näyttämättä heikolta.",
    "Tiimissämme on säännöllisiä keskusteluja hyvinvoinnista ja kulttuurista.",
    "Olen havainnut, että kaikkia työntekijöitä kohdellaan yhtä kunnioittavasti roolista riippumatta.",
    "Luotan, että HR ja johto todella käsittelevät ilmoitetut ongelmat.",
    "Työpaikan ilmapiiri sallii minun rentoutua ja tuoda esiin parhaan suoritukseni.",
    "Organisaatiollamme on selkeät, kirjalliset kiusaamisen vastaiset käytännöt, jotka kaikki tuntevat."
];

try {
    console.log('Reading training namespace files...');
    const enFile = 'src/translations/en/training.json';
    const fiFile = 'src/translations/fi/training.json';

    const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));
    const fiData = JSON.parse(fs.readFileSync(fiFile, 'utf8'));

    // Add questions to EN
    const enCT = enData.training?.culture_thermometer || enData.culture_thermometer;
    if (enCT) {
        enCT.questions = [...enCT.questions, ...additionalQuestionsEN];
        console.log('✅ EN: Added 10 questions. Total:', enCT.questions.length);
    }

    // Add questions to FI
    const fiCT = fiData.training?.culture_thermometer || fiData.culture_thermometer;
    if (fiCT) {
        fiCT.questions = [...fiCT.questions, ...additionalQuestionsFI];
        console.log('✅ FI: Added 10 questions. Total:', fiCT.questions.length);
    }

    // Save
    fs.writeFileSync(enFile, JSON.stringify(enData, null, 2), 'utf8');
    fs.writeFileSync(fiFile, JSON.stringify(fiData, null, 2), 'utf8');

    console.log('\n✅ Culture Thermometer now has 20 questions in both languages');

} catch (e) {
    console.error('❌ Failed:', e.message);
    process.exit(1);
}
