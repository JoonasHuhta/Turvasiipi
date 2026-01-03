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
    },
    {
        id: 'employer-escalation',
        category: 'employer',
        title: 'Eskalointiilmoitus (kun tilanne jatkuu)',
        description: 'Vakava ilmoitus johtoon, kun aiempiin ilmoituksiin ei ole puututtu.',
        subject: 'Eskalointiilmoitus: Epäasiallinen kohtelu jatkuu / Toimenpidepyyntö',
        content: `Hyvä [HR-johtaja / Toimitusjohtaja],

Olen raportoinut epäasiallista kohtelua [Pvm] ja [Pvm]. Tilanteeseen ei ole puututtu tehokkaasti, ja kohtelu on [JATKUNUT / PAHENTUNUT].

UUDET TAPAHTUMAT (viestini jälkeen):
[AI-yhdistelmä uusista tapahtumista]

Työturvallisuuslain 28 § velvoittaa työnantajaa puuttumaan tilanteeseen viipymättä. Koska toimia ei ole tehty, ilmoitan asiasta seuraavaksi:
- Työsuojeluviranomaiselle
- Ammattiliitolleni

Odotan kirjallista vastaustanne ja konkreettista suunnitelmaa asian ratkaisemiseksi [Pvm] mennessä.

Ystävällisin terveisin,
[Nimi]`,
        tags: ['laki', 'vakava', 'eskalointi']
    },
    {
        id: 'health-stress-assessment',
        category: 'health',
        title: 'Työperäisen stressin arviointipyyntö',
        description: 'Tarkempi pyyntö työterveyteen oireiden ja taustan kera.',
        subject: 'Ajanvaraus + Työperäisen stressin ja kuormituksen arviointi',
        content: `Hyvä työterveyshoitaja / -lääkäri,

Pyydän kiireellistä aikaa työperäisen kuormituksen arviointiin.

TILANNE:
Koen työpaikallani jatkuvaa epäasiallista kohtelua, joka vaikuttaa merkittävästi terveyteeni ja toimintakykyyni.

OIREET:
- Univaikeudet (heräily, nukahtamisvaikeudet)
- Jatkuva ahdistus ja pelko työpaikalle saapuessa
- [Muut oireet: esim. päänsärky, vatsavaivat]

TAUSTA:
Olen dokumentoinut tilannetta [X] ajan ja raportoinut siitä työnantajalle [Pvm]. Tilanne ei ole korjaantunut.

TARVE:
Tarvitsen ammattilaisen arvion sairausloman tarpeesta sekä virallisen lausunnon työperäisestä kuormituksesta jatkotoimenpiteitä varten.

Ystävällisin terveisin,
[Nimi]
[Puh]`,
        tags: ['terveys', 'oireet', 'lääkäri']
    },
    {
        id: 'legal-compensation-claim',
        category: 'legal',
        title: 'Vahingonkorvausvaatimus',
        description: 'Juridinen pohja korvauksien hakemiseen laiminlyönnin vuoksi.',
        subject: 'Vaatimus vahingonkorvauksesta (Vahingonkorvauslaki 3:1)',
        content: `[Yrityksen nimi]
Toimitusjohtaja / Hallitus

Asia: Vaatimus vahingonkorvauksesta

TAUSTA:
Olen työskennellyt yrityksessänne [Ajanjakso]. Tänä aikana koin systemaattista epäasiallista kohtelua, josta ilmoitin työnantajalle [Pvm]. Työnantaja ei ryhtynyt Työturvallisuuslain 28 § mukaisiin toimenpiteisiin kohtelun lopettamiseksi.

VAHINGOT:
Laiminlyönti on aiheuttanut minulle:
1. Taloudellisia vahinkoja (terapiakustannukset, lääkkeet)
2. Henkistä kärsimystä ja terveydellistä haittaa

VAATIMUS:
Vaadin vahingonkorvausta [Summa €] sovinnollisena ratkaisuna asiassa. Perusteena on työnantajan isännänvastuu ja huolehtimisvelvoitteen laiminlyönti.

Mikäli asiaa ei ratkaista [Pvm] mennessä, siirrän asian oikeudelliseen käsittelyyn.

Ystävällisin terveisin,
[Nimi]`,
        tags: ['laki', 'korvaus', 'vakava']
    },
    {
        id: 'resignation-notice',
        category: 'legal',
        title: 'Irtisanoutuminen (kiusaamisen vuoksi)',
        description: 'Irtisanoutumisilmoitus, jossa syy dokumentoidaan tulevaa varten.',
        subject: 'Irtisanoutumisilmoitus / [Nimesi]',
        content: `Hyvä [Vastaanottaja],

Ilmoitan irtisanoutuvani [Rooli]-tehtävästäni. Viimeinen työpäiväni on [Pvm].

PERUSTE:
Irtisanoutumiseni syynä on pitkään jatkunut epäasiallinen kohtelu ja työpaikkakiusaaminen, johon työnantaja ei ole puuttunut huomautuksistani ja Työturvallisuuslain 28 § velvoitteista huolimatta.

Olen raportoinut tilanteesta [Pvm], mutta koska turvallista työympäristöä ei ole pystytty takaamaan, joudun päättämään työsuhteeni terveyteni turvaamiseksi.

Pyydän toimittamaan työtodistuksen ja lopputilin asianmukaisesti.

Ystävällisin terveisin,
[Nimi]`,
        tags: ['irtisanoutuminen', 'lopettaminen']
    },
    {
        id: 'authority-notice',
        category: 'legal',
        title: 'Ilmoitus työsuojeluviranomaiselle',
        description: 'Virallinen ilmoitus AVIlle Työturvallisuuslain rikkomisesta.',
        subject: 'Ilmoitus puutteista työsuojelussa (TSL 28 §) / [Yritys]',
        content: `Asia: Ilmoitus työturvallisuuslain 28 §:n rikkomisesta

ILMOITTAJA:
Nimi: [Nimi]
Työpaikka: [Yritys]

ILMOITUKSEN AIHE:
Työpaikallani esiintyy systemaattista epäasiallista kohtelua ja häirintää, johon työnantaja ei ole puuttunut Työturvallisuuslain 28 §:n mukaisesti useista huomautuksista huolimatta.

TAPAHTUMAT:
Olen dokumentoinut tapahtumat kronologisesti. Liitteenä on kooste 15 vakavimmasta tapauksesta.

TYÖNANTAJAN TOIMET:
Tein ilmoituksen työnantajalle [Pvm]. Työnantaja ei ole ryhtynyt toimenpiteisiin tilanteen lopettamiseksi, vaan kohtelu on jatkunut.

PYYNTÖ:
Pyydän työsuojeluviranomaista suorittamaan tarkastuksen ja ohjaamaan työnantajaa täyttämään lakiperusteisen selvitysjaksonsa ja puuttumisvelvollisuutensa.

Ystävällisin terveisin,
[Nimi]`,
        tags: ['AVI', 'viranomainen', 'laki']
    },
    {
        id: 'legal-crime-report',
        category: 'legal',
        title: 'Rikosilmoitus -malli (Väkivalta/Uhkailu)',
        description: 'Pohja poliisille tehtävään ilmoitukseen, jos kyseessä on rikos.',
        subject: 'Rikosilmoitus - Työpaikkakiusaaminen / Uhkailu',
        content: `Asia: Rikosilmoitus

EPÄILTY RIKOS:
[Laiton uhkaus / Kunnianloukkaus / Pahoinpitely]

TAPAHTUMAT:
[Pvm] tapahtui [Kuvaus tapahtumasta]. Paikalla olivat [Todistajat]. Tilanteesta on olemassa [Sähköpostit / Viestit / Nauhoite].

TODISTEET:
Liitteenä on Turvasiipi-palvelun kautta dokumentoitu tapahtumakulku ja todisteet kyseisestä tapauksesta.

PYYNTÖ:
Pyydän poliisia suorittamaan esitutkinnan asiassa.

Ystävällisin terveisin,
[Nimi]
[Henkilötunnus]`,
        tags: ['poliisi', 'rikos', 'vakava']
    },
    {
        id: 'comm-witness-request',
        category: 'communication',
        title: 'Pyyntö todistajalle (kollegalle)',
        description: 'Empaattinen mutta selkeä pyyntö kollegalle todistaa näkemänsä.',
        subject: 'Pyyntö todistajaksi / Luottamuksellinen',
        content: `Hei [Nimi],

Kuten tiedät, olen kokenut haasteellista kohtelua työpaikalla viime aikoina. Olet ollut läsnä joissakin näistä tilanteista.

Olisin erittäin kiitollinen, jos voisit kirjoittaa lyhyen, vapaamuotoisen todistuksen siitä, mitä olet nähnyt tai kuullut. Tämä auttaisi minua asian selvittämisessä liiton tai työsuojelun kanssa.

Ymmärrän, että tämä voi olla sinulle vaikea paikka. Todistustasi käsitellään luottamuksellisesti.

Kiitos että harkitset tätä.

Ystävällisin terveisin,
[Nimi]`,
        tags: ['kollega', 'tuki', 'todistaja']
    },
    {
        id: 'career-interview-prep',
        category: 'communication',
        title: 'Työhaastattelussa vastaaminen',
        description: 'Miten selittää työpaikan vaihtaminen ilman "hankalan työntekijän" leimaa.',
        subject: 'Vastauspohja haastatteluun (suullinen)',
        content: `YLEINEN LINJA: Älä hauku edellistä työnantajaa. Keskity tulevaisuuteen.

VAIHTOEHTO A (Neutraali):
"Edellisessä työsuhteessani tunnistin, että organisaatiokulttuuri ja johtamistyyli eivät enää vastanneet arvojani tai mahdollistaneet kehittymistäni. Siksi päätin etsiä ympäristön, jossa arvostetaan avointa kommunikaatiota ja yhteistyötä, kuten teillä."

VAIHTOEHTO B (Hieman avoimempi):
"Edellisessä työssäni kohdattiin haasteellinen johtamistilanne. Tein parhaani tilanteen ratkaisemiseksi, mutta totesin lopulta, että on parasta siirtyä eteenpäin ja keskittää energia uuteen haasteeseen."

VAIHTOEHTO C (Rehellinen):
"Koin edellisessä työpaikassani epäasiallista kohtelua, jota ei yrityksistä huolimatta saatu ratkaistua. Dokumentoin tilanteen huolellisesti ja hoidin poistumiseni ammattimaisesti. Tämä kokemus on opettanut minulle paljon terveestä työkulttuurista ja siitä, miten tärkeää on molemminpuolinen kunnioitus."`,
        tags: ['työnhaku', 'haastattelu', 'vinkki']
    },
    {
        id: 'comm-thanks-supporter',
        category: 'communication',
        title: 'Kiitosviesti tukijalle',
        description: 'Lämmin kiitos kollegalle tai ystävälle, joka on tukenut vaikeassa tilanteessa.',
        subject: 'Kiitos tuestasi / [Nimesi]',
        content: `Hei [Nimi],

Halusin vain kiittää sinua siitä, että olet ollut tukenani [tilanne, esim. eilisessä palaverissa]. Se merkitsi minulle todella paljon.

Tiedän, että tilanteeni on ollut hankala, ja arvostan aidosti sitä, että uskalsit [toiminta, esim. sanoa ääneen, että kohtelu oli väärin].

Kiitos, että et jättänyt minua yksin.

Ystävällisin terveisin,
[Nimi]`,
        tags: ['tuki', 'kiitos', 'kollega']
    }
];
