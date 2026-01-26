const fs = require('fs');

const FI_DATA = {
    interaction: [
        { id: 'o_i1', text: 'Kaikki saavat saman tiedon samaan aikaan' },
        { id: 'o_i2', text: 'Kokouskutsut lähetetään kaikille relevanteille' },
        { id: 'o_i3', text: 'Vitsit eivät kohdistu yhteen henkilöön toistuvasti' },
        { id: 'o_i4', text: 'Lounaita ja taukoja vietetään yhdessä' },
        { id: 'o_i5', text: 'Kukaan ei jää systemaattisesti ulkopuolelle' },
        { id: 'o_i6', text: 'Epäasiallisuuteen puututaan välittömästi' },
        { id: 'o_i7', text: 'Ilmapiiriongelmista voi puhua avoimesti' },
        { id: 'o_i8', text: 'Jos huomautan loukkaavasta käytöksestä, siihen reagoidaan' },
        { id: 'o_i9', text: 'Hiljainen hyväksyntä (sivustakatselu) ei ole hyväksyttävää' },
        { id: 'o_i10', text: 'Naljailu ei ole "vain vitsiä" -anteeksipyyntö' }
    ],
    support: [
        { id: 'o_s1', text: 'Tiedän mihin ilmoitan kiusaamishuolesta' },
        { id: 'o_s2', text: 'Työsuojeluvaltuutetun yhteystiedot ovat helposti saatavilla' },
        { id: 'o_s3', text: 'Prosessit kiusaamistapauksissa ovat selkeät' },
        { id: 'o_s4', text: 'Ilmoitukset käsitellään nopeasti (alle 7 päivää)' },
        { id: 'o_s5', text: 'Voin tuoda esiin huoleni ilman pelkoa seurauksista' },
        { id: 'o_s6', text: 'Ilmoittaminen on luottamuksellista' },
        { id: 'o_s7', text: 'Puuttujia tuetaan, ei rangaista' },
        { id: 'o_s8', text: 'Toistuviin tapauksiin puututaan tehokkaasti' }
    ],
    psych_safety: [
        { id: 'o_ps1', text: 'Voin olla oma itseni työpaikalla' },
        { id: 'o_ps2', text: 'Erimielisyydet ratkaistaan asiallisesti' },
        { id: 'o_ps3', text: 'Virheistä voi puhua ilman pelkoa' },
        { id: 'o_ps4', text: 'Apua pyydetään ja annetaan vapaasti' },
        { id: 'o_ps5', text: 'Tunnen kuuluvani yhteisöön' },
        { id: 'o_ps6', text: 'Tunnelma ei muutu kenenkään tullessa paikalle' }
    ],
    courage: [
        { id: 'o_c1', text: 'Puuttuisin havaitsemaani epäasiallisuuteen' },
        { id: 'o_c2', text: 'Puuttuisin vaikka kohteena olisi vaikutusvaltainen henkilö' },
        { id: 'o_c3', text: 'Kollegani tukisivat minua jos puuttuisin' },
        { id: 'o_c4', text: 'Tiedän turvallisen tavan puuttua' },
        { id: 'o_c5', text: 'Olen puuttunut viimeisen 3 kk aikana havaittuani epäasiallisuutta' }
    ],
    monitoring: [
        { id: 'o_m1', text: 'Ilmapiirikyselyjä tehdään säännöllisesti' },
        { id: 'o_m2', text: 'Kyselyn tulokset johtavat konkreettisiin toimiin' },
        { id: 'o_m3', text: 'Koulutusta kiusaamisen tunnistamisesta järjestetään' }
    ]
};

const EN_DATA = {
    interaction: [
        { id: 'o_i1', text: 'Everyone receives the same information at the same time' },
        { id: 'o_i2', text: 'Meeting invitations are sent to everyone relevant' },
        { id: 'o_i3', text: 'Jokes are not repeatedly targeted at one person' },
        { id: 'o_i4', text: 'Lunch and breaks are spent together' },
        { id: 'o_i5', text: 'No one is systematically left out' },
        { id: 'o_i6', text: 'Inappropriate behavior is addressed immediately' },
        { id: 'o_i7', text: 'Atmosphere problems can be discussed openly' },
        { id: 'o_i8', text: 'If I point out offensive behavior, it is reacted to' },
        { id: 'o_i9', text: 'Silent approval (bystanding) is not acceptable' },
        { id: 'o_i10', text: 'Teasing is not excused as "just a joke"' }
    ],
    support: [
        { id: 'o_s1', text: 'I know where to report bullying concerns' },
        { id: 'o_s2', text: 'Contact info for occupational safety rep is easily available' },
        { id: 'o_s3', text: 'Processes for bullying cases are clear' },
        { id: 'o_s4', text: 'Reports are handled quickly (under 7 days)' },
        { id: 'o_s5', text: 'I can raise concerns without fear of consequences' },
        { id: 'o_s6', text: 'Reporting is confidential' },
        { id: 'o_s7', text: 'Those who intervene are supported, not punished' },
        { id: 'o_s8', text: 'Recurring cases are addressed effectively' }
    ],
    psych_safety: [
        { id: 'o_ps1', text: 'I can be myself at work' },
        { id: 'o_ps2', text: 'Disagreements are resolved professionally' },
        { id: 'o_ps3', text: 'Mistakes can be discussed without fear' },
        { id: 'o_ps4', text: 'Help is asked for and given freely' },
        { id: 'o_ps5', text: 'I feel I belong to the community' },
        { id: 'o_ps6', text: 'The atmosphere does not change when someone enters' }
    ],
    courage: [
        { id: 'o_c1', text: 'I would intervene if I observed inappropriate behavior' },
        { id: 'o_c2', text: 'I would intervene even if the target was an influential person' },
        { id: 'o_c3', text: 'My colleagues would support me if I intervened' },
        { id: 'o_c4', text: 'I know a safe way to intervene' },
        { id: 'o_c5', text: 'I have intervened in the last 3 months after observing misconduct' }
    ],
    monitoring: [
        { id: 'o_m1', text: 'Atmosphere surveys are conducted regularly' },
        { id: 'o_m2', text: 'Survey results lead to concrete actions' },
        { id: 'o_m3', text: 'Training on identifying bullying is organized' }
    ]
};

const SECTIONS_FI = {
    interaction: "Vuorovaikutus ja ilmapiiri",
    support: "Tukirakenteet ja prosessit",
    psych_safety: "Psykologinen turvallisuus",
    courage: "Puuttumisen rohkeus",
    monitoring: "Seuranta ja kehitys"
};

const SECTIONS_EN = {
    interaction: "Interaction and Atmosphere",
    support: "Support Structures and Processes",
    psych_safety: "Psychological Safety",
    courage: "Courage to Intervene",
    monitoring: "Monitoring and Development"
};

const FILES = [
    {
        path: 'src/translations/fi/lukutaito.json',
        data: FI_DATA,
        headers: SECTIONS_FI
    },
    {
        path: 'src/translations/en/lukutaito.json',
        data: EN_DATA,
        headers: SECTIONS_EN
    }
];

FILES.forEach(file => {
    try {
        const content = fs.readFileSync(file.path, 'utf8');
        const json = JSON.parse(content);

        // Add sections
        Object.assign(json.self_assessment.sections, file.headers);

        // Add data with type slider
        Object.keys(file.data).forEach(key => {
            json.self_assessment.culture_data[key] = file.data[key].map(q => ({ ...q, type: 'slider' }));
        });

        fs.writeFileSync(file.path, JSON.stringify(json, null, 4), 'utf8');
        console.log(`✅ Updated ${file.path}`);

    } catch (e) {
        console.error(`❌ Error updating ${file.path}:`, e.message);
    }
});
