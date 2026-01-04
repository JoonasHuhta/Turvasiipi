
export type QuizPart = {
    id: number;
    title: string;
    questions: QuizQuestion[];
};

export type QuizQuestion = {
    id: number;
    text: string;
    options: { label: string; value: string }[];
    correctAnswer: string; // The value of the correct option (e.g., 'B')
    explanation: string;
};

export const comprehensiveQuizData: QuizPart[] = [
    {
        id: 1,
        title: "OSA 1: Kiusaamisen määrittely ja yleisyys",
        questions: [
            {
                id: 1,
                text: "Mikä on kansainvälisten tutkimusten mukaan työpaikkakiusaamisen yleisyys työelämässä?",
                options: [
                    { label: "1-3% työntekijöistä", value: "A" },
                    { label: "10-15% työntekijöistä", value: "B" },
                    { label: "30-40% työntekijöistä", value: "C" },
                    { label: "Yli 50% työntekijöistä", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Kansainväliset tutkimukset osoittavat johdonmukaisesti, että 10-15% työntekijöistä kokee systemaattista kiusaamista."
            },
            {
                id: 2,
                text: "Kuinka monta työntekijää on maailmanlaajuisesti kokenut jonkinlaista väkivaltaa tai häirintää työpaikalla uransa aikana (ILO 2023)?",
                options: [
                    { label: "Noin 150 miljoonaa", value: "A" },
                    { label: "Noin 400 miljoonaa", value: "B" },
                    { label: "Noin 750 miljoonaa", value: "C" },
                    { label: "Yli 1 miljardi", value: "D" }
                ],
                correctAnswer: "C",
                explanation: "ILO:n (International Labour Organization) ensimmäinen globaali tutkimus vuodelta 2023 osoitti, että 23% työssäkäyvistä aikuisista eli noin 750 miljoonaa työntekijää maailmanlaajuisesti on kokenut jonkinlaista väkivaltaa tai häirintää uransa aikana."
            },
            {
                id: 3,
                text: "Kuka on todennäköisin työpaikkakiusaaja?",
                options: [
                    { label: "Työkaveri samalla hierarkiatasolla", value: "A" },
                    { label: "Esimies tai johtaja", value: "B" },
                    { label: "Alainen", value: "C" },
                    { label: "Asiakas tai ulkopuolinen taho", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Tutkimukset osoittavat, että esimies tai johtaja on tyypillisin kiusaaja. Valtahierarkia ja asemavallan väärinkäyttö ovat keskeisiä tekijöitä kiusaamisessa."
            },
            {
                id: 4,
                text: "Mikä on kiusaamisen keston kriteeri, jotta sitä voidaan kutsua systemaattiseksi kiusaamiseksi (Einarsen ym.)?",
                options: [
                    { label: "Sen on tapahduttava kerran viikossa vähintään kuukauden ajan", value: "A" },
                    { label: "Sen on tapahduttava toistuvasti (esim. viikoittain) ja säännöllisesti vähintään 6 kuukauden ajan", value: "B" },
                    { label: "Riittää, että se tapahtuu kerran, jos se on riittävän vakavaa", value: "C" },
                    { label: "Sen on tapahduttava päivittäin vähintään 2 viikkoa", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Einarsen ja kollegat määrittelevät, että kiusaamiseksi luokiteltavien tekojen on tapahduttava toistuvasti ja säännöllisesti (esim. viikoittain) ja kestettävä pidempään (yleensä vähintään 6 kuukautta). Yksittäinen konflikti ei ole kiusaamista."
            },
            {
                id: 5,
                text: "Kuinka suuri osuus työntekijöistä on todennäköisesti ollut todistamassa työpaikkakiusaamista?",
                options: [
                    { label: "Noin 20%", value: "A" },
                    { label: "Noin 40%", value: "B" },
                    { label: "Noin 60%", value: "C" },
                    { label: "Yli 80%", value: "D" }
                ],
                correctAnswer: "D",
                explanation: "Yli 80% työntekijöistä on todennäköisesti ollut todistamassa kiusaamista jossain vaiheessa työuraansa. Tämä tekee sivullisista paljon suuremman ryhmän kuin varsinaisista uhreista."
            }
        ]
    },
    {
        id: 2,
        title: "OSA 2: Kiusaamisen muodot ja taktiikat",
        questions: [
            {
                id: 6,
                text: "Mitä termiä käytetään kiusaamisesta, jossa esimies kyseenalaistaa työntekijän muistin, havaintokyvyn ja mielenterveyden?",
                options: [
                    { label: "Micro-management", value: "A" },
                    { label: "Gaslighting (Sumuttaminen)", value: "B" },
                    { label: "Silent treatment", value: "C" },
                    { label: "Tokenismi", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Gaslighting on psyykkisen väkivallan muoto, jossa uhri saadaan epäilemään omaa todellisuudentajuaan. Se on esimiehen tehokkain ase, koska se hiljentää uhrin ja saa hänet uskomaan, että vika on hänessä itsessään."
            },
            {
                id: 7,
                text: "Mikä on 'savustamisen' (constructive discharge) tarkoitus?",
                options: [
                    { label: "Parantaa työntekijän suorituskykyä paineen avulla", value: "A" },
                    { label: "Saada työntekijä irtisanoutumaan itse", value: "B" },
                    { label: "Motivoida työntekijää hakemaan ylennystä", value: "C" },
                    { label: "Testata työntekijän stressinsietokykyä", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Savustamisen tavoite on saada työntekijä irtisanoutumaan itse, jolloin työnantaja välttää irtisanomisprosessin ja mahdolliset korvaukset. Tehtävien muuttaminen merkityksettömiksi on yleinen keino murentaa ammatillinen itsetunto."
            },
            {
                id: 8,
                text: "Mitä tarkoittaa DARVO-taktiikka työpaikkakiusaamisessa?",
                options: [
                    { label: "Deny, Attack, Reverse Victim and Offender", value: "A" },
                    { label: "Document, Assess, Report, Verify, Observe", value: "B" },
                    { label: "Deflect, Avoid, Rationalize, Validate, Overlook", value: "C" },
                    { label: "Describe, Apologize, Reassure, Validate, Overcome", value: "D" }
                ],
                correctAnswer: "A",
                explanation: "DARVO (Deny, Attack, Reverse Victim and Offender) on manipulaatiotaktiikka, jossa tekijä kieltää väärinkäytöksen, hyökkää uhrin uskottavuutta vastaan ja kääntää roolit niin, että hänestä tulee uhri."
            },
            {
                id: 9,
                text: "Mikä seuraavista on tyypillinen 'tiedon pimittämisen' muoto?",
                options: [
                    { label: "Esimies unohtaa salasanansa", value: "A" },
                    { label: "Alaiselta evätään pääsy kriittisiin tietoihin", value: "B" },
                    { label: "Esimies lukee liikaa uutisia työajalla", value: "C" },
                    { label: "Työntekijä ei osaa käyttää sähköpostia", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Tieto on valtaa. Pimittämällä tietoa esimies asettaa alaisen tilaan, jossa tämä epäonnistuu väistämättä tehtävässään, koska hänellä ei ole tarvittavia työkaluja tai tietoja päätöksentekoon."
            },
            {
                id: 10,
                text: "Mitä tarkoitetaan termillä 'Lentävät apulaiset' (Flying monkeys) työpaikkakiusaamisessa?",
                options: [
                    { label: "Yrityksen virkistystoimikunta", value: "A" },
                    { label: "Kiusaajan ympärilleen keräämä ryhmä", value: "B" },
                    { label: "Yrityksen ylintä johtoa", value: "C" },
                    { label: "HR-osasto", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Kiusaaminen on harvoin vain kahden kauppa. Kiusaaja kerää ympärilleen tukijoita, jotka osallistuvat kiusaamiseen tai hiljaisesti hyväksyvät sen."
            }
        ]
    },
    {
        id: 3,
        title: "OSA 3: Kiusaajan persoonallisuus ja käyttäytyminen",
        questions: [
            {
                id: 11,
                text: "Mikä persoonallisuuspiirrekolmikko (Dark Triad) ennustaa parhaiten kiusaamiskäyttäytymistä?",
                options: [
                    { label: "Neuroottisuus, introvertti, pessimismi", value: "A" },
                    { label: "Machiavellismi, Narsismi, Psykopatia", value: "B" },
                    { label: "Ahdistuneisuus, Empatia, Tunnollisuus", value: "C" },
                    { label: "Avoimuus, Sovinnollisuus, Ekstraversio", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Dark Triad koostuu Machiavellismista, Narsismista ja Psykopatiasta. Nämä kolme persoonallisuuspiirrettä ennustavat manipulatiivista ja empatiatonta käyttäytymistä."
            },
            {
                id: 12,
                text: "Tutkimusten mukaan, mikä Dark Triad -piirre on vahvin ennustaja työpaikkakiusaamiselle?",
                options: [
                    { label: "Narsismi", value: "A" },
                    { label: "Machiavellismi", value: "B" },
                    { label: "Psykopatia", value: "C" },
                    { label: "Kaikki yhtä vahvoja", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Tutkimukset osoittavat, että Machiavellismi on vahvin yksittäinen ennustaja kiusaamiskäyttäytymiselle, selittäen merkittävän osan variaatiosta."
            },
            {
                id: 13,
                text: "Mitä Dark Tetrad sisältää Dark Triadin lisäksi?",
                options: [
                    { label: "Sosiopatian", value: "A" },
                    { label: "Sadismin", value: "B" },
                    { label: "Skitsofrenian", value: "C" },
                    { label: "Bipolaarisen häiriön", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Dark Tetrad sisältää Dark Triadin lisäksi Sadismin (arkipäivän sadismin), joka tarkoittaa mielihyvän saamista toisten kärsimyksestä."
            },
            {
                id: 14,
                text: "Miksi kiusaamiseen ei usein puututa organisaatioissa?",
                options: [
                    { label: "Kukaan ei huomaa sitä", value: "A" },
                    { label: "Kiusaaja on usein organisaatiolle 'tuloksellinen'", value: "B" },
                    { label: "Kiusatut eivät kerro kenellekään", value: "C" },
                    { label: "Kiusaaminen on laillista", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Organisaatiot usein suojelevat 'tähtisuorittajia' tai esimiehiä, jotka tuovat tulosta, vaikka heidän johtamistapansa tuhoaisi ihmisiä."
            },
            {
                id: 15,
                text: "Kuinka monta prosenttia kiusatuista menettää työpaikkansa kiusaamisen seurauksena (WBI)?",
                options: [
                    { label: "10-20%", value: "A" },
                    { label: "23-30%", value: "B" },
                    { label: "45-55%", value: "C" },
                    { label: "67-77%", value: "D" }
                ],
                correctAnswer: "D",
                explanation: "Workplace Bullying Institute (WBI) -tutkimus osoittaa, että suurin osa (67-77%) kiusaamisen uhreista menettää työpaikkansa, joko irtisanomisen tai pakotetun eroamisen kautta."
            }
        ]
    },
    {
        id: 4,
        title: "OSA 4: Sivullisten (Bystanders) rooli",
        questions: [
            {
                id: 16,
                text: "Mikä on 'sivustakatsojan efekti' (Bystander Effect) työpaikkakiusaamisessa?",
                options: [
                    { label: "Ihmiset puuttuvat herkemmin kun muita on läsnä", value: "A" },
                    { label: "Ihmiset eivät puutu, koska odottavat muiden tekevän sen", value: "B" },
                    { label: "Sivulliset eivät koskaan huomaa kiusaamista", value: "C" },
                    { label: "Sivulliset tukevat aina uhria", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Bystander Effect tarkoittaa, että ihmiset ovat vähemmän todennäköisesti puuttuva tilanteeseen, kun muita ihmisiä on läsnä. Vastuu 'hajaantuu'."
            },
            {
                id: 17,
                text: "Mikä sivullisen rooli liittyy parhaaseen työhön sitoutumiseen (work engagement)?",
                options: [
                    { label: "Puolustaja", value: "A" },
                    { label: "Ulkopuolinen", value: "B" },
                    { label: "Avustaja", value: "C" },
                    { label: "Ei merkitystä", value: "D" }
                ],
                correctAnswer: "A",
                explanation: "Tutkimukset osoittavat, että puolustajan rooli (aktiivinen puuttuminen ja tuki) ennustaa parasta työhön sitoutumista myös sivulliselle itselleen."
            },
            {
                id: 18,
                text: "Kuinka suuri osuus työpaikkakiusaamisen todistajista ei raportoi näkemästään?",
                options: [
                    { label: "Noin 15%", value: "A" },
                    { label: "Noin 35%", value: "B" },
                    { label: "Noin 55%", value: "C" },
                    { label: "Noin 75%", value: "D" }
                ],
                correctAnswer: "C",
                explanation: "Noin 55% todistajista ei raportoi kokemuksestaan, vaikka he olisivat todistaneet kiusaamista. Tämä on hälyttävän korkea luku."
            },
            {
                id: 19,
                text: "Mikä on yleisin syy siihen, miksi todistajat eivät raportoi kiusaamisesta?",
                options: [
                    { label: "Pelko fyysisestä väkivallasta", value: "A" },
                    { label: "Usko siihen, että raportoinnista ei ole hyötyä", value: "B" },
                    { label: "Tietämättömyys raportointitavoista", value: "C" },
                    { label: "Kiusaajan tukeminen", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Yleisin syy (55% vastaajista) on kyynisyys ja usko siihen, että organisaatio ei kuitenkaan tee asialle mitään."
            },
            {
                id: 20,
                text: "Miten passiivisten sivullisten määrä vaikuttaa uhrin työhön sitoutumiseen?",
                options: [
                    { label: "Ei vaikuta mitenkään", value: "A" },
                    { label: "Parantaa sitä", value: "B" },
                    { label: "Heikentää sitä merkittävästi", value: "C" },
                    { label: "Vaikutus on epäselvä", value: "D" }
                ],
                correctAnswer: "C",
                explanation: "Mitä enemmän passiivisia sivullisia, sitä enemmän kiusaamisen negatiivinen vaikutus korostuu ja uhrin sitoutuminen heikkenee."
            }
        ]
    },
    {
        id: 5,
        title: "OSA 5: Terveysvaikutukset ja seuraukset",
        questions: [
            {
                id: 21,
                text: "Mitä fyysisiä oireita pitkäkestoinen työpaikkakiusaaminen aiheuttaa?",
                options: [
                    { label: "Ei mitään, vain henkisiä", value: "A" },
                    { label: "Lievää ärtymystä", value: "B" },
                    { label: "Unettomuutta, paniikkikohtauksia, sydänriskejä", value: "C" },
                    { label: "Vain tilapäistä väsymystä", value: "D" }
                ],
                correctAnswer: "C",
                explanation: "Työpaikkakiusaaminen aiheuttaa vakavia fysiologisia stressireaktioita. Se ei ole 'vain pään sisällä'."
            },
            {
                id: 22,
                text: "Mikä on kiusaamisen uhrien sydän- ja verisuonisairauksien riskisuhde verrattuna ei-kiusattuihin?",
                options: [
                    { label: "1.2", value: "A" },
                    { label: "1.8", value: "B" },
                    { label: "2.3", value: "C" },
                    { label: "3.5", value: "D" }
                ],
                correctAnswer: "C",
                explanation: "Tutkimukset osoittavat, että riski on peräti 2.3-kertainen. Pitkäkestoinen stressi on myrkkyä keholle."
            },
            {
                id: 23,
                text: "Miten todistajien (bystanders) henkinen hyvinvointi vertautuu uhrien hyvinvointiin?",
                options: [
                    { label: "Todistajat eivät kärsi lainkaan", value: "A" },
                    { label: "Oireet ovat samankaltaisia, joskin lievempiä", value: "B" },
                    { label: "Todistajat kärsivät enemmän", value: "C" },
                    { label: "Vain uhrit kärsivät", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Myös todistajat traumatisoituvat. Epäreiluuden ja julmuuden seuraaminen sivusta on psyykkisesti raskasta."
            },
            {
                id: 24,
                text: "Mikä on työpaikkakiusaamisen asema työssä koettavan stressin aiheuttajana?",
                options: [
                    { label: "15. merkittävin", value: "A" },
                    { label: "10. merkittävin", value: "B" },
                    { label: "Toiseksi yleisin", value: "C" },
                    { label: "Ei merkittävä", value: "D" }
                ],
                correctAnswer: "C",
                explanation: "Kiusaamista pidetään toiseksi yleisimpänä stressin aiheuttajana työpaikoilla heti liiallisen työmäärän jälkeen."
            },
            {
                id: 25,
                text: "Kuinka moni kiusaamisen uhreista on kertonut kokemuksestaan jollekulle?",
                options: [
                    { label: "24%", value: "A" },
                    { label: "54%", value: "B" },
                    { label: "74%", value: "C" },
                    { label: "94%", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Vain noin puolet kertoo kokemuksistaan. Häpeä ja pelko estävät monia puhumasta."
            }
        ]
    },
    {
        id: 6,
        title: "OSA 6: Lakisääteiset vastuut ja puuttuminen",
        questions: [
            {
                id: 26,
                text: "Kenen vastuulla on työturvallisuuslain mukaan puuttua kiusaamiseen?",
                options: [
                    { label: "Työsuojeluvaltuutetun", value: "A" },
                    { label: "Työnantajan (ylin johto ja esimiehet)", value: "B" },
                    { label: "Kiusatun itsensä", value: "C" },
                    { label: "Poliisin", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Suomen työturvallisuuslaki on yksiselitteinen: Työnantajalla on velvollisuus puuttua epäasialliseen kohteluun heti kun se tulee tietoon."
            },
            {
                id: 27,
                text: "Mikä on DARVO-taktiikoista kertomisen ja kouluttamisen vaikutus?",
                options: [
                    { label: "Ei vaikutusta", value: "A" },
                    { label: "Tekee ihmisistä kyynisempiä", value: "B" },
                    { label: "Auttaa tunnistamaan manipulaation", value: "C" },
                    { label: "Heikentää arvostelukykyä", value: "D" }
                ],
                correctAnswer: "C",
                explanation: "Tieto on suojaa. Kun ihmiset tunnistavat kaavan (kiellä, hyökkää, uhriudu), sen teho heikkenee."
            },
            {
                id: 28,
                text: "Mikä toimiala tai ammatti kärsii eniten työpaikkakiusaamisesta?",
                options: [
                    { label: "IT-ala", value: "A" },
                    { label: "Terveydenhuolto ja sosiaaliala", value: "B" },
                    { label: "Kauppa ja ravintola-ala", value: "C" },
                    { label: "Teollisuus", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Terveydenhuolto ja sosiaaliala ovat valitettavia tilastokärkiä. Hierarkkiset rakenteet ja kova paine luovat otolliset olosuhteet."
            },
            {
                id: 29,
                text: "Mikä sukupuoli on todennäköisemmin kiusaamisen uhri?",
                options: [
                    { label: "Miehet", value: "A" },
                    { label: "Naiset", value: "B" },
                    { label: "Ei eroa", value: "C" },
                    { label: "Riippuu täysin toimialasta", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Tilastollisesti naiset joutuvat useammin uhreiksi (57%), mutta miehet ovat yliedustettuina kiusaajissa."
            },
            {
                id: 30,
                text: "Kuinka moni naispuolinen kiusaaja valitsee uhrikseen naisen?",
                options: [
                    { label: "25%", value: "A" },
                    { label: "45%", value: "B" },
                    { label: "71%", value: "C" },
                    { label: "90%", value: "D" }
                ],
                correctAnswer: "C",
                explanation: "Tämä on merkittävä sukupuolidynamiikkaan liittyvä havainto: Naiskiusaajat kohdistavat toimintansa useimmiten toisiin naisiin."
            }
        ]
    },
    {
        id: 7,
        title: "OSA 7: Organisaatiokulttuuri ja ennaltaehkäisy",
        questions: [
            {
                id: 31,
                text: "Mikä organisaatiotekijä on vahvin suojaava tekijä kiusaamista vastaan?",
                options: [
                    { label: "Hyvä palkka", value: "A" },
                    { label: "Tukeva organisaatiokulttuuri ja johdon tuki", value: "B" },
                    { label: "Uudet tilat", value: "C" },
                    { label: "Etätyömahdollisuus", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Kulttuuri syö prosessit aamupalaksi. Jos johto ei tue nollatoleranssia teoillaan, paperit ovat hyödyttömiä."
            },
            {
                id: 32,
                text: "Mikä seuraavista on tehoton tapa ehkäistä työpaikkakiusaamista?",
                options: [
                    { label: "Nollatoleranssi-politiikka ilman laajempaa lähestymistapaa", value: "A" },
                    { label: "Selkeät raportointimenettelyt", value: "B" },
                    { label: "Johdon sitoutuminen", value: "C" },
                    { label: "Säännöllinen koulutus", value: "D" }
                ],
                correctAnswer: "A",
                explanation: "Pelkkä 'meillä on nollatoleranssi' -julistus ei riitä, jos rakenteet ja toimintamallit eivät tue sitä."
            },
            {
                id: 33,
                text: "Mitä 'hiljaisuuden kulttuuri' (culture of silence) tarkoittaa?",
                options: [
                    { label: "Hiljainen työtila", value: "A" },
                    { label: "Pelko puhua ongelmista seurausten pelossa", value: "B" },
                    { label: "Hiljaiset hetket", value: "C" },
                    { label: "Sähköpostikommunikaatio", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Hiljaisuuden kulttuuri on myrkkyä. Se mahdollistaa väärinkäytösten jatkumisen vuosia, koska kukaan ei uskalla avata suutaan."
            },
            {
                id: 34,
                text: "Mikä on 'institutionaalinen petos' (institutional betrayal)?",
                options: [
                    { label: "Työntekijän petos", value: "A" },
                    { label: "Organisaation epäonnistuminen puuttua väärinkäytöksiin", value: "B" },
                    { label: "Kilpailijan vakoilu", value: "C" },
                    { label: "Työpaikan vaihto", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Kun organisaatio, jonka tulisi suojella työntekijää, kääntääkin selkänsä tai hyökkää uhria vastaan, kyseessä on syvästi traumatisoiva institutionaalinen petos."
            },
            {
                id: 35,
                text: "Kuinka moni hoitoalan työntekijä Britanniassa on kokenut kiusaamista?",
                options: [
                    { label: "5%", value: "A" },
                    { label: "20%", value: "B" },
                    { label: "43%", value: "C" },
                    { label: "65%", value: "D" }
                ],
                correctAnswer: "B",
                explanation: "Luvut ovat korkeita. Julkisen sektorin paineet ja hierarkiat ovat globaali haaste."
            }
        ]
    }
];
