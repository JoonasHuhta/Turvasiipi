import type { Scenario } from '../types';

/**
 * Scenario 2: "Mikromanagerointi ja vallan väärinkäyttö"
 * Context: Service industry, experienced worker with new supervisor
 * Learning Goal: Recognize power abuse through micromanagement and learn proper escalation
 */
export const micromanagementScenario: Scenario = {
    id: 'micromanagement-1',
    title: 'Mikromanagerointi ja vallan väärinkäyttö',
    context: 'Olet työskennellyt palvelualalla 5 vuotta. Sait uuden esihenkilön 2 kuukautta sitten.',
    characters: [
        { id: 'player', name: 'Sinä', role: 'Kokenut työntekijä', color: '#3b82f6' },
        { id: 'supervisor', name: 'Uusi esimies', role: 'Esihenkilö', color: '#ef4444' },
        { id: 'colleague', name: 'Jari', role: 'Kollega', color: '#64748b' },
        { id: 'hr', name: 'HR-päällikkö', role: 'Henkilöstöhallinto', color: '#8b5cf6' },
    ],
    learningGoal: 'Tunnista hierarkian väärinkäyttö ja opi rajojen asettaminen esihenkilölle',
    scenes: [
        // Scene 1: Excessive control
        {
            id: 'scene-1',
            background: 'linear-gradient(to bottom, #f1f5f9, #cbd5e1)',
            backgroundType: 'office',
            characters: [
                { characterId: 'player', position: 'sitting', emotion: 'neutral', x: 40, y: 60 },
                { characterId: 'supervisor', position: 'standing', emotion: 'smug', x: 70, y: 50 },
            ],
            narration: '📋 Maanantaiaamu - Työpisteelläsi',
            dialogue: [
                {
                    characterId: 'supervisor',
                    text: 'Tarvitsen raportin jokaisesta asiakaskontaktista. Tuntikohtainen erittely.',
                    style: 'aggressive',
                },
                {
                    characterId: 'player',
                    text: 'Mutta meillä on jo valmis raportointijärjestelmä...',
                    style: 'normal',
                },
                {
                    characterId: 'supervisor',
                    text: 'Minä päätän miten täällä raportoidaan. Haluan myös nähdä kaikki sähköpostit ennen lähetystä.',
                    style: 'aggressive',
                },
            ],
            decision: {
                prompt: 'Miten reagoit?',
                perspective: 'target',
                options: [
                    {
                        id: 'option-a',
                        text: 'Teen kuten käsketään. Hän on esimies.',
                        response: {
                            immediate: 'Päätät noudattaa kaikkia vaatimuksia.',
                            consequences: 'Viikon kuluttua työaika ei riitä. Teet ylitöitä raportoidaksesi raporteista. Olet uupunut.',
                            analysis: {
                                whatWorked: 'Vältit välittömän konfliktin.',
                                risks: 'Kohtuuttomat vaatimukset johtavat uupumukseen. Kun hyväksyt kerran, vaatimukset kasvavat. Tämä ei ole kestävää.',
                                improvement: 'Aseta rajat aikaisessa vaiheessa. Kysy: "Mitä ongelmaa tämä ratkaisee?" Osoita olemassa olevat prosessit.',
                            },
                            educational: {
                                concept: 'Mikromanagerointi voi olla vallan väärinkäytön muoto, erityisesti jos se kohdistuu valikoivasti tiettyihin henkilöihin ja estää varsinaisen työn tekemistä.',
                                legalContext: 'Työnantaja voi antaa työohjeita, mutta niiden tulee olla perusteltuja ja kohtuullisia. Liiallinen kontrolli voi olla henkistä kuormitusta.',
                                nextSteps: [
                                    'Dokumentoi: mitkä tehtävät vievät aikaa ja miksi',
                                    'Kysy esihenkilöltä: "Mikä on näiden raporttien tarkoitus?"',
                                    'Jos jatkuu, raportoi ylemmälle esihenkilölle tai HR:lle',
                                ],
                            },
                            learningPoint: '⚠️ Uusi tieto: Hierarkia ei anna rajatonta valtaa. Kohtuuttomuus on epäasiallista.',
                        },
                    },
                    {
                        id: 'option-b',
                        text: 'Kysyn: "Mikä ongelma tällä ratkaistaan? Meillä on toimiva järjestelmä."',
                        response: {
                            immediate: 'Otat asian puheeksi rakentavasti.',
                            consequences: 'Esimies kieltäytyy vastaamasta. "Minä päätän täällä. Jos et pysty, voimme keskustella sopivuudestasi."',
                            analysis: {
                                whatWorked: 'Asetit rajan ja esitit perustelun. Tämä oli oikea reaktio.',
                                risks: 'Uhkailu on vakava merkki. Tämä ei ole normaalia johtamista. Voit tuntea olosi epävarmaksi.',
                                improvement: 'Dokumentoi uhkailu tarkalleen. Vie asia välittömästi HR:ään tai työsuojeluvaltuutettuun. Tämä on ylittänyt rajan.',
                            },
                            educational: {
                                concept: 'Uhkailu työpaikan menettämisestä konstruktiivisen palautteen seurauksena on selkeä vallan väärinkäyttö ja mahdollista kiusaamista.',
                                legalContext: 'Työntekijällä on oikeus esittää kysymyksiä ja palautetta. Uhkailu on kiellettyä. Jos uhkailu johtaa toimenpiteisiin (varoitus, irtisanominen ilman perustetta), kyseessä on työsuhteen ehtojen rikkomus.',
                                nextSteps: [
                                    'Dokumentoi uhkailu: päivämäärä, tarkka lainaus, todistajat',
                                    'Ota yhteyttä HR:ään tai ylempään esihenkilöön',
                                    'Ota yhteyttä työsuojeluvaltuutettuun',
                                    'Harkitse työterveyshuollon tukea',
                                ],
                            },
                            learningPoint: '🚨 Uusi tunnistustapa: Uhkailu = vallan väärinkäyttö. Dokumentoi ja raportoi.',
                        },
                    },
                    {
                        id: 'option-c',
                        text: 'Sanon: "Selvä. Ehdotan että keskustellaan tarkemmin palaverissa, mitkä raportit ovat tarpeellisia."',
                        response: {
                            immediate: 'Ehdotat rakentavaa keskustelua.',
                            consequences: 'Esimies suostuu palaveriin. Palaverissa pystytte sopimaan järkevimmästä raportointitavasta. Tilanne rauhoittuu.',
                            analysis: {
                                whatWorked: 'Erinomainen ratkaisu! Tunnustit esihenkilön auktoriteetin mutta ehdotit rakentavaa yhteistyötä. Sait aikaan neuvottelun.',
                                risks: 'Ei merkittäviä riskejä. Jos esimies kieltäytyy neuvottelemasta, tiedät että ongelma on syvempi.',
                                improvement: 'Täydellinen. Voit käyttää tätä mallia jatkossakin: tunnusta + ehdota + neuvottele.',
                            },
                            educational: {
                                concept: 'Rakentava vuoropuhelu on avain. Jos esimies on halukas neuvottelemaan, kyse voi olla vain erilaisista työskentelytyyleistä, ei kiusaamisesta.',
                                legalContext: 'Työntekijällä on oikeus osallistua oman työnsä kehittämiseen. Hyvä työantaja kuuntelee kokeneita työntekijöitä.',
                                nextSteps: [
                                    'Valmistele palaveriin: mitä raportit jo kertovat?',
                                    'Ehdota kompromisseja',
                                    'Jos neuvottelu ei toimi, dokumentoi ja vie ylemmäs',
                                ],
                            },
                            learningPoint: '💡 Uusi keino: "Ehdotan että keskustellaan" -lause. Rakentava mutta voimaannuttava.',
                        },
                    },
                ],
            },
        },
        // Scene 2: Public humiliation
        {
            id: 'scene-2',
            background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
            backgroundType: 'meeting',
            characters: [
                { characterId: 'supervisor', position: 'standing', emotion: 'angry', x: 30, y: 45 },
                { characterId: 'player', position: 'sitting', emotion: 'fearful', x: 60, y: 60 },
                { characterId: 'colleague', position: 'sitting', emotion: 'sad', x: 75, y: 60 },
            ],
            narration: '🗣️ Viikkopalaverissa - Kaikki tiimiläiset paikalla',
            dialogue: [
                {
                    characterId: 'supervisor',
                    text: 'Ja sitten meillä on henkilöitä, jotka eivät osaa noudattaa ohjeita. Eikö niin?',
                    style: 'aggressive',
                },
            ],
            pauseForReflection: true,
        },
        {
            id: 'scene-3',
            background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
            backgroundType: 'meeting',
            characters: [
                { characterId: 'supervisor', position: 'standing', emotion: 'smug', x: 30, y: 45 },
                { characterId: 'player', position: 'sitting', emotion: 'sad', x: 60, y: 60 },
                { characterId: 'colleague', position: 'sitting', emotion: 'neutral', x: 75, y: 60 },
            ],
            dialogue: [],
            decision: {
                prompt: 'Mitä teet?',
                perspective: 'target',
                options: [
                    {
                        id: 'option-d',
                        text: 'En sano mitään. Kestän tilanteen.',
                        response: {
                            immediate: 'Hiljennyt ja kestät julkisen nöyryytyksen.',
                            consequences: 'Palaverin jälkeen kollega Jari tulee luoksesi: "Tuo oli ihan kohtuutonta."',
                            analysis: {
                                whatWorked: 'Vältit julkisen väittelyn, joka olisi voinut eskaloida.',
                                risks: 'Hiljaisuus voi tulkita hyväksynnäksi. Julkinen nöyryytys on vakavaa ja voi aiheuttaa psyykkistä haittaa.',
                                improvement: 'Ota asia puheeksi joko julkisesti tai yksityisesti palaverin jälkeen. Vie HR:ään jos jatkuu.',
                            },
                            educational: {
                                concept: 'Julkinen nöyryytys ja epämääräiset syytökset ilman mahdollisuutta vastata ovat psykologista väkivaltaa ja kiusaamista.',
                                legalContext: 'Palaute tulee antaa rakentavasti ja yksityisesti. Julkinen häpäisy on epäasiallista kohtelua ja voi rikkoa työturvallisuuslakia.',
                                nextSteps: [
                                    'Dokumentoi: päivämäärä, todistajat, tarkat sanat',
                                    'Keskustele asian luottamusmiehen tai työsuojeluvaltuutetun kanssa',
                                    'Raportoi HR:lle',
                                    'Pyydä tukea työterveydenhuollosta',
                                ],
                            },
                            learningPoint: '📋 Uusi tieto: Julkinen kritiikki ilman mahdollisuutta vastata = nöyryytys.',
                        },
                    },
                    {
                        id: 'option-e',
                        text: 'Sanon rauhallisesti: "Voisimmeko käsitellä tämän kahden kesken palaverin jälkeen?"',
                        response: {
                            immediate: 'Asetit rajan rauhallisesti mutta selkeästi.',
                            consequences: 'Esimies ärsyyntyy: "Ei tarvitse. Tämä koskee kaikkia." Jatkaa muuhun aiheeseen. Jari nyökkää sinulle hyväksyvästi.',
                            analysis: {
                                whatWorked: 'Erinomainen! Osoitit että huomaat epäasiallisen käytöksen ja vaatit asiallista kohtelua. Sait myös todistajia.',
                                risks: 'Esimies saattaa kostaa myöhemmin. Jatka dokumentointia.',
                                improvement: 'Täydellinen reaktio. Vie asia HR:ään tai luottamusmiehelle ennen kuin tilanne ehtii eskaloida.',
                            },
                            educational: {
                                concept: 'Sinulla on oikeus vaatia asiallista kohtelua. Julkinen kritiikki tulee aina haastaa.',
                                legalContext: 'Palaute tulee antaa yksityisesti. Jos esimies kieltäytyy, se osoittaa tarkoituksellisuutta ja on vahvempi näyttö kiusaamisesta.',
                                nextSteps: [
                                    'Dokumentoi tapahtuma ja esihenkilön reaktio',
                                    'Ota yhteyttä HR:ään saman päivän aikana',
                                    'Pyydä Jaria toimimaan todistajana tarvittaessa',
                                ],
                            },
                            learningPoint: '🗣️ Uusi keino: "Voisimmeko käsitellä kahden kesken?" - Asettaa rajan julkisesti.',
                        },
                    },
                    {
                        id: 'option-f',
                        text: 'Kysyn suoraan: "Voitko täsmentää, mitä tarkoitat? Mihin ohjeisiin viittaat?"',
                        response: {
                            immediate: 'Pyydät konkretiaa epämääräisten syytösten sijaan.',
                            consequences: 'Esimies epäröi. Ei pysty nimeämään mitään konkreettista. Siirtyy seuraavaan aiheeseen kiukkuisena.',
                            analysis: {
                                whatWorked: 'Loistava taktiikka! Paljastit että syytökset ovat perättömiä. Sait todistajia tälle.',
                                risks: 'Esimies voi kostaa myöhemmin. Dokumentoi kaikki.',
                                improvement: 'Täydellinen. Vie asia nyt välittömästi HR:ään, kun sinulla on todistajia.',
                            },
                            educational: {
                                concept: 'Epämääräiset syytökset ilman konkretiaa ovat klassinen kiusaamisen taktiikka. Ne on aina haastettava.',
                                legalContext: 'Työntekijällä on oikeus tietää, mistä häntä syytetään. Perättömät syytökset voivat täyttää kunnianloukkauksen tunnusmerkit.',
                                nextSteps: [
                                    'Dokumentoi: esimies ei pystynyt nimeämään yhtään konkreettista esimerkkiä',
                                    'Kirjaa todistajat (Jari ja muut)',
                                    'Vie asia HR:ään ja ylemmälle johdolle',
                                    'Tarvittaessa ota yhteyttä lakimieheen',
                                ],
                            },
                            learningPoint: '🎯 Uusi taktiikka: Pyydä aina konkretiaa. Se paljastaa perusteettoman kritiikin.',
                        },
                    },
                ],
            },
        },
    ],
};
