export interface Concept {
    id: string;
    title: string;
    description: string;
    mechanism: string;
    researchSource?: string;
    howToBreak: string;
}

export const PSYCHOLOGY_CONCEPTS: Concept[] = [
    {
        id: 'pluralistic_ignorance',
        title: 'Pluralistinen ignoranssi',
        description: 'Ryhmän jäsenet hylkäävät normin yksityisesti, mutta tukevat sitä julkisesti, koska luulevat muiden hyväksyvän sen.',
        mechanism: 'Pikallisuus ja hiljaisuus tulkitaan hyväksynnäksi, vaikka 70-80% todistajista paheksuu tilannetta sisäisesti.',
        researchSource: 'Salmivalli et al. (Bystander Roles in School Bullying)',
        howToBreak: 'Ole ensimmäinen joka sanoo: "Tämä tuntuu väärältä, mitä muut ajattelette?". Tämä murtaa harhan välittömästi.'
    },
    {
        id: 'bystander_effect',
        title: 'Bystander-efekti',
        description: 'Mitä enemmän todistajia on paikalla, sitä epätodennäköisemmin kukaan puuttuu tilanteeseen.',
        mechanism: 'Vastuun hajautuminen: "Joku muu varmasti hoitaa tämän."',
        howToBreak: 'Ota henkilökohtainen vastuu tai nimeä joku kollega auttamaan kanssasi: "Matti, tullaanpa tähän väliin."'
    }
];
