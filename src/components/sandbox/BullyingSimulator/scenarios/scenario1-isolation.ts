import type { Scenario } from '../types';

/**
 * Scenario 1: "Hiljainen eristäminen"
 * Context: IT office, new employee started 3 months ago
 * Learning Goal: Recognize that isolation is a form of bullying, even without words
 */
export const isolationScenario: Scenario = {
    id: 'isolation-1',
    title: 'Hiljainen eristäminen',
    context: 'Olet työskennellyt IT-toimistossa 3 kuukautta. Huomaat, että kollegat käyttäytyvät oudosti.',
    characters: [
        { id: 'player', name: 'Sinä', role: 'Uusi työntekijä', color: '#3b82f6' },
        { id: 'colleague1', name: 'Matti', role: 'Kollega', color: '#64748b' },
        { id: 'colleague2', name: 'Anna', role: 'Kollega', color: '#64748b' },
        { id: 'colleague3', name: 'Liisa', role: 'Kollega', color: '#64748b' },
    ],
    learningGoal: 'Tunnista sosiaalinen eristäminen kiusaamisen muotona ja opi dokumentointi',
    scenes: [
        // Scene 1: Morning coffee break
        {
            id: 'scene-1',
            background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
            backgroundType: 'breakroom',
            characters: [
                { characterId: 'colleague1', position: 'standing', emotion: 'neutral', x: 20, y: 50 },
                { characterId: 'colleague2', position: 'standing', emotion: 'happy', x: 30, y: 50 },
                { characterId: 'colleague3', position: 'standing', emotion: 'happy', x: 40, y: 50 },
                { characterId: 'player', position: 'standing', emotion: 'neutral', x: 65, y: 50 },
            ],
            narration: '☕ Aamukahvitauko - Kahvihuone',
            dialogue: [
                { characterId: 'colleague2', text: 'Ai että, meillä oli ihana viikonloppu mökillä!', style: 'normal' },
                { characterId: 'colleague1', text: 'Hienoa! Me käytiin taas uimassa...', style: 'normal' },
                { characterId: 'player', text: 'Kuulostaa kivalta! Mekin—', style: 'normal' },
            ],
            pauseForReflection: true,
        },
        // Scene 2: Colleagues leave abruptly
        {
            id: 'scene-2',
            background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
            backgroundType: 'breakroom',
            characters: [
                { characterId: 'colleague1', position: 'standing', emotion: 'neutral', x: 15, y: 50 },
                { characterId: 'colleague2', position: 'standing', emotion: 'neutral', x: 20, y: 50 },
                { characterId: 'colleague3', position: 'standing', emotion: 'neutral', x: 25, y: 50 },
                { characterId: 'player', position: 'standing', emotion: 'sad', x: 65, y: 50 },
            ],
            dialogue: [
                { characterId: 'colleague1', text: 'Ai niin, mulla on kiire palaveriin!', style: 'normal' },
                { characterId: 'colleague3', text: 'Joo, mennään...', style: 'whisper' },
            ],
            narration: 'Kollegat poistuvat nopeasti. Huone hiljenee. Tämä on tapahtunut jo monta kertaa.',
            decision: {
                prompt: 'Miltä tämä tilanne tuntuu sinusta?',
                perspective: 'target',
                options: [
                    {
                        id: 'option-a',
                        text: 'Ei mitään, heillä varmaan vain kiire.',
                        response: {
                            immediate: 'Päätit olla ajattelematta asiaa enempää.',
                            consequences: 'Seuraavalla viikolla sama toistuu. Tunnet itsesi yhä ulkopuolisemmaksi.',
                            analysis: {
                                whatWorked: 'Et ottanut turhaa stressiä yksittäisestä tilanteesta.',
                                risks: 'Jos tämä toistuu, voi olla merkki suuremmasta ongelmasta. Tunteiden tukahduttaminen voi johtaa uupumukseen.',
                                improvement: 'Seuraa tilannetta. Jos toistuu, ota asia puheeksi tai dokumentoi tapahtumat.',
                            },
                            educational: {
                                concept: 'Yksittäinen tilanne ei ole kiusaamista. Kiusaaminen on toistuvaa ja tarkoituksellista.',
                                legalContext: 'Työturvallisuuslaki velvoittaa työnantajaa ehkäisemään henkistä kuormitusta. Toistuva eristäminen voi olla epäasiallista kohtelua.',
                                nextSteps: [
                                    'Tarkkaile, toistuuko tilanne',
                                    'Kirjaa ylös päivämäärät ja paikka',
                                    'Ota asia puheeksi luotettavan kollegan kanssa',
                                ],
                            },
                            learningPoint: '📝 Uusi taito: Havainnointi on ensimmäinen askel. Yksittäinen tapaus ≠ kiusaaminen.',
                        },
                    },
                    {
                        id: 'option-b',
                        text: 'Tunnen itseni ulkopuoliseksi, mutta ehkä vain kuvittelen.',
                        response: {
                            immediate: 'Tunnistat tunteen, mutta epäilet omaa havaintoasi.',
                            consequences: 'Epävarmuus syö energiaa. Jatkuvasti pohdit, oliko se vain sattumaa.',
                            analysis: {
                                whatWorked: 'Tunnistit oman tunteen – tämä on tärkeä ensimmäinen askel.',
                                risks: 'Itsesi kyseenalaistaminen voi johtaa siihen, että sivuutat todellisen ongelman. Kiusaajat usein laskevat siihen, että uhri epäilee itseään.',
                                improvement: 'Luota havaintoihisi. Tunne on signaali – se ei tarvitse heti selitystä. Dokumentoi objektiivisesti mitä tapahtuu.',
                            },
                            educational: {
                                concept: 'Gaslighting on tekniikka, jossa uhri saadaan epäilemään omia havaintojaan. Sinun tunteesi ovat aina valideja.',
                                legalContext: 'Sinulla on oikeus turvalliseen työympäristöön. Henkinen kuormitus on yhtä vakavaa kuin fyysinen.',
                                nextSteps: [
                                    'Kirjaa tapahtumat päiväkirjaan (päivämäärä, kellonaika, todistajat)',
                                    'Jaa havaintosi luotettavan ystävän kanssa',
                                    'Muista: tunteesi ovat tosiasioita, vaikka tulkinta voikin vaihdella',
                                ],
                            },
                            learningPoint: '💡 Uusi tieto: Tunteiden kyseenalaistaminen on yleinen taipumus. Luota itseesi.',
                        },
                    },
                    {
                        id: 'option-c',
                        text: 'Tämä on toistunut jo monta kertaa. Olen huolissani.',
                        response: {
                            immediate: 'Tunnistit toistuvuuden – tämä on keskeinen havainto.',
                            consequences: 'Päätät ottaa asian vakavasti ja mietit, mitä tehdä seuraavaksi.',
                            analysis: {
                                whatWorked: 'Tunnistit toistuvuuden, joka on kiusaamisen keskeinen elementti. Huolesi on perusteltu.',
                                risks: 'Jatkuva tilanne voi johtaa stressiin, ahdistukseen ja työuupumukseen, jos siihen ei puututa.',
                                improvement: 'Seuraava askel on toiminta: dokumentoi, ota yhteyttä esihenkilöön tai luottamushenkilöön.',
                            },
                            educational: {
                                concept: 'Toistuvuus on kiusaamisen määritelmän ydin. Yksittäinen konflikti ≠ kiusaaminen. Toistuva, tarkoituksellinen häirintä = kiusaaminen.',
                                legalContext: 'Työturvallisuuslaki 28§: Työnantajan on huolehdittava työntekijän turvallisuudesta ja terveydestä, mukaan lukien psykososiaalinen kuormitus.',
                                nextSteps: [
                                    'Dokumentoi: päivämäärät, kellonajat, todistajat, mitä tapahtui',
                                    'Ota asia puheeksi esihenkilön kanssa',
                                    'Ota yhteyttä työsuojeluvaltuutettuun tai luottamusmieheen',
                                    'Pohdi: onko työnohjausta tai työterveyshuollon tukea saatavilla?',
                                ],
                            },
                            learningPoint: '🎯 Uusi tunnistustapa: Toistuvuus on avain. Laske kuinka usein tapahtuu.',
                        },
                    },
                ],
            },
        },
        // Scene 3: Email about team event (player excluded)
        {
            id: 'scene-3',
            background: 'linear-gradient(to bottom, #1e293b, #334155)',
            backgroundType: 'office',
            characters: [
                { characterId: 'player', position: 'sitting', emotion: 'sad', x: 50, y: 60 },
            ],
            narration: '💻 Viikko myöhemmin - Työpöytäsi ääressä',
            dialogue: [
                {
                    characterId: 'player',
                    text: '📧 Sähköposti kollegoille: "Huomenna toimiston pelipäivä klo 14! Tervetuloa kaikki! -Anna"',
                    style: 'normal',
                },
            ],
            pauseForReflection: true,
        },
        {
            id: 'scene-4',
            background: 'linear-gradient(to bottom, #1e293b, #334155)',
            backgroundType: 'office',
            characters: [
                { characterId: 'player', position: 'sitting', emotion: 'fearful', x: 50, y: 60 },
            ],
            narration: 'Huomaat, että sinä et saanut sähköpostia. Kaikki muut puhuvat tapahtumasta.',
            decision: {
                prompt: 'Mitä teet?',
                perspective: 'target',
                options: [
                    {
                        id: 'option-d',
                        text: 'En tee mitään. Ehkä se oli vahingossa.',
                        response: {
                            immediate: 'Päätät olla puuttumatta asiaan.',
                            consequences: 'Tunnet olosi yhä ulkopuolisemmaksi. Seuraavalla viikolla tilanne toistuu.',
                            analysis: {
                                whatWorked: 'Vältit välittömän konfliktin.',
                                risks: 'Hiljaisuus voi tulkita tilanteen hyväksymiseksi. Kiusaaminen voi jatkua ja pahentua.',
                                improvement: 'Aseta raja aikaisessa vaiheessa. Dokumentoi ja ota asia puheeksi.',
                            },
                            educational: {
                                concept: 'Toistuva ulossulkeminen on sosiaalisen eristämisen muoto ja se on kiusaamista.',
                                legalContext: 'Kaikilla on oikeus osallistua työyhteisön toimintaan tasavertaisesti.',
                                nextSteps: [
                                    'Dokumentoi tapahtuma',
                                    'Kysy suoraan järjestäjältä: "Huomasin etten saanut kutsua, oliko se tarkoituksellista?"',
                                    'Raportoi esihenkilölle tai HR:lle',
                                ],
                            },
                            learningPoint: '⚠️ Uusi tieto: Hiljaisuus ei ratkaise ongelmaa. Raja on asetettava.',
                        },
                    },
                    {
                        id: 'option-e',
                        text: 'Lähetän Annalle viestin: "Hei, en saanut kutsua. Voinko tulla mukaan?"',
                        response: {
                            immediate: 'Otat asian puheeksi rauhallisesti.',
                            consequences: 'Anna vastaa: "Ai, ei kai se mennyt perille? Toki voit tulla!" Mutta vastaavat pois sulkemiset jatkuvat.',
                            analysis: {
                                whatWorked: 'Asetit rajan ja teit tilanteen näkyväksi. Tämä on rohkea askel.',
                                risks: 'Jos kiusaaminen on tarkoituksellista, se voi jatkua hienovaraisemmissa muodoissa.',
                                improvement: 'Dokumentoi myös tämä ja seuraavat tapaukset. Jos jatkuu, vie asia eteenpäin.',
                            },
                            educational: {
                                concept: 'Puheeksi ottaminen on tärkeä taito. Se ei aina lopeta kiusaamista, mutta tekee sen näkyväksi.',
                                legalContext: 'Sinulla on oikeus kysyä ja saada selitys. Työnantajalla on velvollisuus selvittää tilanne.',
                                nextSteps: [
                                    'Dokumentoi keskustelu',
                                    'Jos toistuu, raportoi esihenkilölle',
                                    'Pyydä työterveyshuollon tukea jos koet stressiä',
                                ],
                            },
                            learningPoint: '🗣️ Uusi keino: "Huomasin että..." -aloitus. Neutraali, ei syyttävä.',
                        },
                    },
                    {
                        id: 'option-f',
                        text: 'Kirjaan tapahtuman ylös ja otan yhteyttä esihenkilöön.',
                        response: {
                            immediate: 'Dokumentoit tapahtuman ja varaat ajan esihenkilölle.',
                            consequences: 'Esihenkilö ottaa asian vakavasti ja lupaa selvittää. Tilanne alkaa parantua.',
                            analysis: {
                                whatWorked: 'Dokumentointi ja virallinen kanava. Tämä on tehokkain tapa.',
                                risks: 'Vaatii rohkeutta. Mahdollinen kostotoimet (joihin pitää puuttua yhtä voimakkaasti).',
                                improvement: 'Täydellinen toiminta. Jatka dokumentointia myös esihenkilön toimista.',
                            },
                            educational: {
                                concept: 'Tämä on selkeä esimerkki toistuvasta kiusaamisesta. Dokumentointi muuttaa tunteen todisteeksi.',
                                legalContext: 'Esihenkilöllä on velvollisuus puuttua. Jos ei toimi, vie asia HR:lle, työsuojeluun tai Työsuojeluviranomaiselle.',
                                nextSteps: [
                                    'Jatka dokumentointia',
                                    'Pyydä esihenkilöltä selvitys mitä tehtiin',
                                    'Seuraa tilannetta',
                                    'Jos ei muutu, ota yhteyttä työsuojeluvaltuutettuun',
                                ],
                            },
                            learningPoint: '📋 Uusi taito: Dokumentointi = päivämäärät, kellonajat, todistajat, tarkat kuvaukset.',
                        },
                    },
                ],
            },
        },
    ],
};
