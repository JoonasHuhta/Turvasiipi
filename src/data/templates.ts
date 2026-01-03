export type TemplateCategory = 'employer' | 'union' | 'health' | 'legal' | 'communication';

export interface Template {
    id: string;
    category: TemplateCategory;
    title: string;
    description: string;
    subject: string;
    content: string;
    tags: string[];
}

export const templates: Template[] = [
    {
        id: 'employer-notice-tsl28',
        category: 'employer',
        title: 'Ensimmäinen ilmoitus työnantajalle (TSL 28§)',
        description: 'Virallinen ilmoitus epäasiallisesta kohtelusta, joka velvoittaa työnantajan toimenpiteisiin.',
        subject: 'Ilmoitus epäasiallisesta kohtelusta (Työturvallisuuslaki 28 §)',
        content: `Hyvä [Esimiehen nimi / HR-johtaja],

Teen tämän ilmoituksen Työturvallisuuslain 28 §:n mukaisesti.

TAUSTA
Olen työskennellyt [Yritys]:ssä [Rooli]-tehtävissä [Aloituspvm] alkaen. Viimeisen [Ajanjakso] aikana olen kokenut systemaattista epäasiallista kohtelua, joka vaikuttaa työturvallisuuteeni ja -terveyteeni.

TAPAHTUMAT
[AI-yhdistelmä tapahtumista]

VAIKUTUKSET
Edellä kuvattu kohtelu on aiheuttanut minulle merkittävää kuormitusta, joka on ilmennyt [AI-oireet: esim. univaikeuksina ja työvireen laskuna].

PYYNTÖ TOIMENPITEISIIN
Työturvallisuuslain 28 § velvoittaa työnantajaa ryhtymään toimenpiteisiin tilanteen selvittämiseksi ja lopettamiseksi viipymättä. Pyydän:
1. Kirjallista vahvistusta tämän ilmoituksen vastaanottamisesta
2. Tiedotusta siitä, mihin toimenpiteisiin asiassa ryhdytään
3. Aikataulua selvitysprosessille

Olen dokumentoinut tapahtumat tarkasti ja olen valmis toimittamaan lisätietoja.

Ystävällisin terveisin,
[Nimesi]
[Päivämäärä]`,
        tags: ['virallinen', 'laki', 'aloitus']
    },
    {
        id: 'employer-follow-up',
        category: 'employer',
        title: 'Seurantaviesti (kun vastausta ei kuulu)',
        description: 'Käytä tätä 7-14 päivää ensimmäisen viestin jälkeen, jos työnantaja on hiljaa.',
        subject: 'Seuranta: Ilmoitus epäasiallisesta kohtelusta ([Alkuperäinen pvm])',
        content: `Hyvä [Vastaanottaja],

Lähetin [Pvm] ilmoituksen epäasiallisesta kohtelusta (liitteenä). En ole saanut vastausta kohtuullisessa ajassa.

Työturvallisuuslaki 28 § velvoittaa työnantajaa ryhtymään toimiin VIIPYMÄTTÄ tiedon saatuaan. Pyydän vastausta seuraaviin kysymyksiin viimeistään [Pvm + 7 päivää]:
1. Onko ilmoitukseni vastaanotettu?
2. Kuka käsittelee asiaa?
3. Mikä on arvioitu aikataulu selvitykselle?

Mikäli en saa vastausta, joudun ottamaan yhteyttä ammattiliittoon tai työsuojeluviranomaiseen tilanteen ratkaisemiseksi.

Ystävällisin terveisin,
[Nimi]`,
        tags: ['seuranta', 'kiireellinen']
    },
    {
        id: 'union-notice',
        category: 'union',
        title: 'Avunpyyntö ammattiliitolle',
        description: 'Viestipohja avun pyytämiseen omalta liitolta.',
        subject: 'Avunpyyntö: Työpaikkakiusaaminen / [Yrityksen nimi]',
        content: `Hyvä [Liiton nimi],

Olen [Liiton nimi]:n jäsen. Tarvitsen apua työpaikkakiusaamistilanteessa, jota en ole saanut selvitettyä työnantajani kanssa.

TILANNE LYHYESTI:
- Työnantaja: [Yritys]
- Roolini: [Rooli]
- Tilanne jatkunut: [Ajanjakso]
- Ilmoitettu työnantajalle: [Kyllä/Ei, pvm]

DOKUMENTOINTI:
Olen dokumentoinut tapahtumat Turvasiipi-palvelun avulla. Liitteenä on kronologinen raportti tilanteesta.

PYYNTÖ:
Toivon, että voisitte arvioida tilannettani ja neuvoa seuraavista askelista tai mahdollisesta edustuksesta työnantajan suuntaan.

Ystävällisin terveisin,
[Nimi]
[Puh]`,
        tags: ['liitto', 'tuki']
    },
    {
        id: 'health-notice',
        category: 'health',
        title: 'Pyyntö työterveyshuoltoon',
        description: 'Ajanvarauspyyntö työperäisen kuormituksen arviointiin.',
        subject: 'Ajanvaraus: Työperäisen kuormituksen ja stressin arviointi',
        content: `Hyvä työterveyshuolto,

Pyydän aikaa työperäisen kuormituksen arviointiin.

TILANNE:
Koen työpaikallani epäasiallista kohtelua, joka vaikuttaa merkittävästi fyysiseen ja psyykkiseen terveyteeni.

OIREET:
[Oireet: esim. univaikeudet, ahdistus, keskittymiskyvyn lasku]

TARVE:
Tarvitsen ammattilaisen arvion tilanteestani, mahdollisesta sairausloman tarpeesta sekä suosituksia jatkotoimenpiteistä työnantajan suuntaan.

Ystävällisin terveisin,
[Nimi]
[Puh]`,
        tags: ['terveys', 'lääkäri']
    }
];
