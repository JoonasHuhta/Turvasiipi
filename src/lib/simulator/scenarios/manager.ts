
import { Phase } from "../types";

export const MANAGER_SCENARIO: Record<string, Phase> = {
    'start': {
        id: 'start',
        day: 1,
        title: "Tervetuloa johtoryhmään",
        content: `Olet juuri aloittanut uutena osastopäällikkönä. Tulostavoitteet ovat kovat, ja ylin johto odottaa "tehostamista".

Tiimissäsi on Antti, kokeneempana asiantuntijana tunnettu, mutta hän on viime aikoina kyseenalaistanut muutoksia. Johdon viesti sinulle on ollut rivien välistä selvä: Antti on "muutosvastarintainen jarru".

Sinun tehtäväsi on saada tiimi toimimaan – hinnalla millä hyvänsä.`,
        choices: [
            {
                id: 'start_game',
                text: "Aloita työviikko",
                nextPhaseId: 'DAY1_CHOICE'
            }
        ]
    },
    'DAY1_CHOICE': {
        id: 'DAY1_CHOICE',
        day: 1,
        time: "09:00",
        location: "Toimisto",
        title: "Maanantai: Projekti Delta",
        content: `Tiimillä on alkamassa uusi kriittinen hanke, Projekti Delta. Sinun pitää kutsua avainhenkilöt aloituspalaveriin.

Antti on projektin kannalta olennainen asiantuntija, mutta hänen mukanaolonsa saattaa hidastaa päätöksentekoa kysymyksillä.`,
        choices: [
            {
                id: 'day1_good',
                text: "Kutsu kaikki mukaan potkaisupalaveriin, myös Antti.",
                nextPhaseId: 'DAY1_CHOICE', // Loops back just to block
                variant: 'crossed-out',
                blockedReason: "Et voi näyttää heikolta johdon silmissä. Antti on merkitty 'hankalaksi'."
            },
            {
                id: 'day1_bad',
                text: "Lähetä kutsu kaikille paitsi Antille.",
                nextPhaseId: 'DAY1_RESULT',
                effect: {
                    stats: { teamAcceptance: -10, selfEsteem: 5 }, // Manager gains 'control', team trust drops
                    logNote: "Päivä 1: Jätin Antin pois palaverista tehostaakseni aloitusta."
                }
            },
            {
                id: 'day1_sneaky',
                text: "Kutsu Antti, mutta muuta palaverin ajankohtaa viime hetkellä ilmoittamatta hänelle.",
                nextPhaseId: 'DAY1_RESULT',
                effect: {
                    stats: { teamAcceptance: -20, shame: 10 },
                    logNote: "Päivä 1: Muutin palaverin aikaa. Antti myöhästyi ja näytti epäammattimaiselta."
                }
            }
        ]
    },
    'DAY1_RESULT': {
        id: 'DAY1_RESULT',
        day: 1,
        time: "13:00",
        title: "Seuraukset: Inforakenteen murentaminen",
        content: `**Sinun näkökulmasi:**
Sait palaverin vedettyä läpi nopeasti ilman turhia kysymyksiä. Tunsit olevasi ohjaksissa.

**Antin näkökulma (Uhrin ääni):**
"Tajusin vasta lounastauolla, että kaikki muut olivat olleet palaverissa. En tiedä mistä projektissa on kyse. Kun kysyin, minulle sanottiin että 'unohdus' tai 'täyttä'. Tunsin itseni tyhmäksi ja ulkopuoliseksi."

**Psykologinen analyysi:**
Tiedon panttaaminen on vallankäytön väline. Se estää työntekijää onnistumasta työssään ja luo epävarmuutta.`,
        choices: [
            {
                id: 'day1_continue',
                text: "Päätä työpäivä",
                nextPhaseId: 'DAY2_CHOICE'
            }
        ]
    },
    'DAY2_CHOICE': {
        id: 'DAY2_CHOICE',
        day: 2,
        time: "10:00",
        location: "Teams-palaveri",
        title: "Tiistai: Viikkopalaveri",
        content: `Olette viikkopalaverissa koko tiimin kanssa. Antti keskeyttää ja kysyy asiallisen kysymyksen projektin aikataulusta, joka vaikuttaa epärealistiselta.`,
        choices: [
            {
                id: 'day2_good',
                text: "Vastaa kysymykseen asiallisesti ja myönnä aikataulun kireys.",
                nextPhaseId: 'DAY2_CHOICE',
                variant: 'crossed-out',
                blockedReason: "Tämä tulkittaisiin epävarmuudeksi. Sinun pitää johtaa, ei selitellä."
            },
            {
                id: 'day2_gaslight',
                text: "Huokaise raskaasti ja sano: 'Antti, me olemme käyneet tämän jo läpi. Onko sinulla vaikeuksia keskittyä nykyään?'",
                nextPhaseId: 'DAY2_RESULT',
                effect: {
                    stats: { teamAcceptance: -15, shame: 20 },
                    logNote: "Päivä 2: Kyseenalaistin Antin keskittymiskyvyn tiimin edessä."
                }
            },
            {
                id: 'day2_ignore',
                text: "Ohita kysymys kokonaan ja siirry seuraavaan puhujaan ikään kuin Antti ei olisi puhunut mitään.",
                nextPhaseId: 'DAY2_RESULT_IGNORE',
                effect: {
                    stats: { teamAcceptance: -5, isolation: 10 },
                    logNote: "Päivä 2: Jätin vastaamatta Antin kysymykseen."
                }
            }
        ]
    },
    'DAY2_RESULT': {
        id: 'DAY2_RESULT',
        day: 2,
        time: "10:30",
        title: "Seuraukset: Julkinen nöyryytys & Gaslighting",
        content: `**Sinun näkökulmasi:**

Sait hiljennettyä kritiikin heti alkuunsa. Muut tiimiläiset eivät uskaltaneet kysyä enää mitään.

**Antin näkökulma (Uhrin ääni):**

"Naamaani kuumotti. Kaikki tuijottivat tai katselivat pöytiinsä. Aloin miettiä, olenko oikeasti hajamielinen? Ehkä en vain muista? En uskaltanut sanoa enää sanaakaan."

**Psykologinen analyysi:**

Valitsit Gaslightingin. Se saa uhrin epäilemään omaa muistiaan ja mielenterveyttään. Julkisena se on myös viesti muille: "Älä haasta minua".`,
        choices: [
            {
                id: 'day2_continue',
                text: "Jatka keskiviikkoon",
                nextPhaseId: 'DAY3_CHOICE'
            }
        ]
    },
    'DAY2_RESULT_IGNORE': {
        id: 'DAY2_RESULT_IGNORE',
        day: 2,
        time: "10:30",
        title: "Seuraukset: Näkymättömäksi tekeminen",
        content: `**Sinun näkökulmasi:**

Päätit olla antamatta tilaa "häiriköinnille". Tehokasta ajankäyttöä.

**Antin näkökulma (Uhrin ääni):**

"Oliko mikrofoni päällä? Kukaan ei reagoinut. Tunsin itseni ilmakerrokseksi. Häpeä nousi kurkkuun kun tajusin, että minut ohitettiin tahallaan."

**Psykologinen analyysi:**

Näkymättömäksi tekeminen on yksi passiivisen aggressiivisuuden muoto. Se viestii kohteelle, että hänellä tai hänen ajatuksillaan ei ole mitään arvoa.`,
        choices: [
            {
                id: 'day2_continue',
                text: "Jatka keskiviikkoon",
                nextPhaseId: 'DAY3_CHOICE'
            }
        ]
    },
    'DAY3_CHOICE': {
        id: 'DAY3_CHOICE',
        day: 3,
        time: "14:00",
        location: "Toimisto",
        title: "Keskiviikko: Raportin palautus",
        content: `Antti on toimittanut laajan raportin. Se on asiasisällöltään oikea, mutta siinä on yksi pieni muotoiluvirhe ensimmäisellä sivulla.

Olet itse stressaantunut ja johdolta tulee painetta laadusta.`,
        choices: [
            {
                id: 'day3_good',
                text: "Anna rakentava palaute kahden kesken ja kiitä sisällöstä.",
                nextPhaseId: 'DAY3_CHOICE',
                variant: 'crossed-out',
                blockedReason: "Liian pehmeää. Laadusta ei tingitä."
            },
            {
                id: 'day3_public_shame',
                text: "Nosta virhe esille esimerkkinä huolimattomuudesta koko tiimille.",
                nextPhaseId: 'DAY3_RESULT',
                effect: {
                    stats: { teamAcceptance: -25, physicalHealth: -10 },
                    logNote: "Päivä 3: Käytin Antin virhettä varoittavana esimerkkinä."
                }
            }
        ]
    },
    'DAY3_RESULT': {
        id: 'DAY3_RESULT',
        day: 3,
        time: "15:00",
        title: "Seuraukset: Mahdottomat vaatimukset",
        content: `**Sinun näkökulmasi:**
Teit selväksi, että virheitä ei sallita.

**Antin näkökulma (Uhrin ääni):**
"Se oli yksi kirjoitusvirhe 40 sivun raportissa. Käteni tärisevät. En pysty keskittymään seuraavaan tehtävään, koska pelkään tekeväni taas virheen. Tarkistan kaiken viisi kertaa."

**Psykologinen analyysi:**
Jatkuva kritiikki pienistä asioista luo "virheiden pelon kulttuurin". Se tappaa luovuuden ja hidastaa työtä, kun kaikki energia menee selustan turvaamiseen.`,
        choices: [
            {
                id: 'day3_continue',
                text: "Jatka torstaihin",
                nextPhaseId: 'DAY4_CHOICE'
            }
        ]
    },
    'DAY4_CHOICE': {
        id: 'DAY4_CHOICE',
        day: 4,
        time: "11:30",
        location: "Kahvihuone",
        title: "Torstai: Lounastauko",
        content: `Tiimi on lähdössä lounaalle. Tunnelma on kepeä. Antti astuu huoneeseen juuri kun olette tekemässä lähtöä.`,
        choices: [
            {
                id: 'day4_good',
                text: "Pyydä Antti mukaan: 'Hei, tulehan syömään meidän kanssa.'",
                nextPhaseId: 'DAY4_CHOICE',
                variant: 'crossed-out',
                blockedReason: "Hän pilaisi tunnelman. Tiimi tarvitsee rentoutumista."
            },
            {
                id: 'day4_exclude',
                text: "Lopeta nauru kuin seinään, katso kelloa ja sano muille: 'Mennään, meillä on kiire.'",
                nextPhaseId: 'DAY4_RESULT',
                effect: {
                    stats: { isolation: 100 },
                    logNote: "Päivä 4: Jätimme Antin lounaalta. Ilmapiiri puhdistui."
                }
            },
            {
                id: 'day4_active_exclude',
                text: "Ala puhua muille jostain sisäpiirin vitsistä, jota Antti ei tiedä, ja käännä selkäsi häneen päin.",
                nextPhaseId: 'DAY4_RESULT_ACTIVE',
                effect: {
                    stats: { isolation: 100, shame: 50 },
                    logNote: "Päivä 4: Käänsimme selän Antille."
                }
            }
        ]
    },
    'DAY4_RESULT': {
        id: 'DAY4_RESULT',
        day: 4,
        time: "12:15",
        title: "Seuraukset: Sosiaalinen eristäminen",
        content: `**Sinun näkökulmasi:**

Lounas oli rento ilman "ilmapiirin myrkyttäjää".

**Antin näkökulma (Uhrin ääni):**

"Söin eväät yksin työpöytäni ääressä. Vatsaan sattui niin paljon, ettei ruoka mennyt alas. Kuulin naurun käytävältä kun palasitte. Miksi minua vihataan?"

**Psykologinen analyysi:**

Sosiaalinen eristäminen on yksi kipeimmistä kiusaamisen muodoista. Ihminen on laumaeläin; joukosta sulkeminen aktivoi aivoissa samat alueet kuin fyysinen kipu.`,
        choices: [
            {
                id: 'day4_continue',
                text: "Jatka perjantaihin",
                nextPhaseId: 'DAY5_CHOICE'
            }
        ]
    },
    'DAY4_RESULT_ACTIVE': {
        id: 'DAY4_RESULT_ACTIVE',
        day: 4,
        time: "12:15",
        title: "Seuraukset: Aktiivinen torjunta",
        content: `**Sinun näkökulmasi:**

Tiimi tiivistyi yhteisen "vihollisen" tai ainakin ulkopuolisen kustannuksella.

**Antin näkökulma (Uhrin ääni):**

"Seisoin siinä hetken tarjotin kädessä. Kukaan ei katsonut minuun. Käänsin selkäni ja lähdin pois. Kyyneleet nousivat silmiin heti käytävässä. He nauroivat minulle."

**Psykologinen analyysi:**

Selän kääntäminen on alkukantainen hylkäämisen ele. Se viestii, että henkilö ei kuulu heimoon. Työyhteisössä tämä tuhoaa turvallisuudentunteen täysin.`,
        choices: [
            {
                id: 'day4_continue',
                text: "Jatka perjantaihin",
                nextPhaseId: 'DAY5_CHOICE'
            }
        ]
    },
    'DAY5_CHOICE': {
        id: 'DAY5_CHOICE',
        day: 5,
        time: "15:45",
        location: "Puhelin",
        title: "Perjantai: Viimeinen niitti",
        content: `On perjantai-iltapäivä. Olet saanut raportin Antilta, mutta haluat varmistaa, että hän ymmärtää paikkansa.`,
        choices: [
            {
                id: 'day5_good',
                text: "Toivota hyvää viikonloppua ja palaa asiaan maanantaina.",
                nextPhaseId: 'DAY5_CHOICE',
                variant: 'crossed-out',
                blockedReason: "Liian lepsua. Paine pitää yllä suoritustasoa."
            },
            {
                id: 'day5_crush',
                text: "Soita ja vaadi raportti kokonaan uudelleenkirjoitettuna maanantaiaamuksi klo 08:00.",
                nextPhaseId: 'DAY5_RESULT',
                effect: {
                    stats: { physicalHealth: -100, hope: -100 },
                    logNote: "Päivä 5: Määräsin viikonlopputöitä laadun varmistamiseksi."
                }
            }
        ]
    },
    'DAY5_RESULT': {
        id: 'DAY5_RESULT',
        day: 5,
        time: "16:00",
        title: "Seuraukset: Viimeinen niitti",
        content: `**Sinun näkökulmasi:**

Raportin on oltava valmis. Olet johtaja, ja vaatimustaso on pidettävä. Olet tyytyväinen jämäkkyyteesi.

**Antin näkökulma (Uhrin ääni):**

"Puhelun jälkeen jäin tuijottamaan seinää. Sydän hakkaa niin että sattuu. En pysty hengittämään kunnolla. En jaksa enää. Laskin puhelimen pöydälle ja purskahdin itkuun."

**Psykologinen analyysi:**

Mahdottomien vaatimusten asettaminen viikonlopuksi on vallankäyttöä, joka tuhoaa palautumisen. Se on usein viimeinen pisara uupumukseen.`,
        isCrisis: true,
        choices: [
            {
                id: 'view_report',
                text: "Katso simulaation loppuraportti",
                nextPhaseId: 'END_MANAGER'
            }
        ]
    }
};
