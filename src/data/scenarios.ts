export type TrainingLevel = 'easy' | 'medium' | 'hard';

export interface TrainingScenario {
    id: string;
    level: TrainingLevel;
    tacticId?: string; // Links to tactics.ts if applicable
    scenario: string;
    question: string;
    options: {
        id: string;
        text: string;
        isCorrect: boolean;
        feedback: string;
    }[];
    hint: string;
}

export const trainingScenarios: TrainingScenario[] = [
    // --- HELPO (EASY) ---
    {
        id: 'e1',
        level: 'easy',
        scenario: 'Esimies välttää katsekontaktia ja ohittaa sinut tervehtiessäsi, vaikka hän tervehtii muita iloisesti.',
        question: 'Mitä kiusaamistaktiikkaa tässä käytetään?',
        options: [
            { id: 'a', text: 'Eristäminen ja ulossulkeminen', isCorrect: true, feedback: 'Oikein. Systemaattinen huomioimatta jättäminen on passiivinen mutta tehokas tapa eristää ihminen työyhteisöstä.' },
            { id: 'b', text: 'Sabotaasi', isCorrect: false, feedback: 'Väärin. Sabotaasi liittyy yleensä työnteon vaikeuttamiseen, ei pelkkään sosiaaliseen kohteluun.' },
            { id: 'c', text: 'Gaslighting', isCorrect: false, feedback: 'Väärin. Gaslightingissa yritetään vääristää todellisuudentajua, ei vain sivuuttaa henkilöä.' },
            { id: 'd', text: 'Asiallinen palaute', isCorrect: false, feedback: 'Väärin. Tervehtimättä jättäminen ei ole koskaan asiallista palautetta.' }
        ],
        hint: 'Tämä taktiikka pyrkii tekemään kohteesta "näkymättömän".'
    },
    {
        id: 'e2',
        level: 'easy',
        scenario: 'Työkaveri "unohtaa" jatkuvasti lisätä sinut kalenterikutsuihin palavereissa, jotka liittyvät suoraan vastuualueeseesi.',
        question: 'Mistä taktiikasta on kyse?',
        options: [
            { id: 'a', text: 'Sabotaasi', isCorrect: true, feedback: 'Oikein. Työnteon estäminen pimentämällä tietoa on sabotaasia, joka vaikeuttaa uhrin onnistumista.' },
            { id: 'b', text: 'Mitätöinti', isCorrect: false, feedback: 'Väärin. Mitätöinti kohdistuu yleensä henkilön osaamiseen tai tunteisiin, ei suoraan työnkulkuun.' },
            { id: 'c', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Uhkailussa luvataan seurauksia, tässä vain estetään työnteko.' },
            { id: 'd', text: 'Maineen vahingoittaminen', isCorrect: false, feedback: 'Väärin. Vaikka tämä voi vaikuttaa maineeseen, ensisijainen teko on työn estäminen.' }
        ],
        hint: 'Kyse on tehokkaasta tavasta estää toista tekemästä työtään.'
    },
    {
        id: 'e3',
        level: 'easy',
        scenario: 'Esimies väittää palaverissa, ettei ole koskaan lupannut sinulle lisäresursseja, vaikka asvosta sovittiin kirjallisesti viikko sitten. Alat epäillä omaa muistiasi.',
        question: 'Mikä taktiikka on kyseessä?',
        options: [
            { id: 'a', text: 'Gaslighting', isCorrect: true, feedback: 'Oikein. Gaslighting on pyrkimys saada uhri epäilemään omaa havaintokykyään tai muistiaan.' },
            { id: 'b', text: 'Epäoikeudenmukaisuus', isCorrect: false, feedback: 'Väärin. Vaikka teko on epäoikeudenmukainen, spesifimpi termi on todellisuuden vääristäminen.' },
            { id: 'c', text: 'Emotionaalinen manipulaatio', isCorrect: false, feedback: 'Väärin. Emotionaalinen manipulaatio on laajempi käsite, gaslighting on täsmällisempi tässä.' },
            { id: 'd', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Tilanteessa ei esitetä suoraa uhkaa, vaan vääristetään faktoja.' }
        ],
        hint: 'Nimi tulee elokuvasta, jossa lamppujen välkkyminen kielletään.'
    },
    {
        id: 'e4',
        level: 'easy',
        scenario: 'Kollegasi naurahtaa ivallisesti ja pyörittää silmiään aina, kun avaat suusi tiimipalaverissa.',
        question: 'Mitä tässä tapahtuu?',
        options: [
            { id: 'a', text: 'Mitätöinti ja vähättely', isCorrect: true, feedback: 'Oikein. Sanaton viestintä (eleet, ilmeet) on tehokas keino kertoa, ettei toisen mielipiteellä ole arvoa.' },
            { id: 'b', text: 'Asiallinen kritiikki', isCorrect: false, feedback: 'Väärin. Asiallinen kritiikki kohdistuu sisältöön, ei henkilön nolaamiseen eleillä.' },
            { id: 'c', text: 'Sabotaasi', isCorrect: false, feedback: 'Väärin. Sabotaasi kohdistuu työn tuotokseen, ei suoraan vuorovaikutustilanteeseen.' },
            { id: 'd', text: 'Gaslighting', isCorrect: false, feedback: 'Väärin. Tässä ei yritetä vääristää muistoja, vaan nolata henkilö.' }
        ],
        hint: 'Tämä taktiikka hyökkää henkilön itsetuntoa ja asiantuntijuutta vastaan.'
    },
    {
        id: 'e5',
        level: 'easy',
        scenario: 'Saat työtehtäväksesi arkistoida 5000 sivua manuaalisesti viikonlopun aikana, vaikka tiedetään, että tehtävä on turha ja se voitaisiin hoitaa koneellisesti.',
        question: 'Mikä taktiikka on käytössä?',
        options: [
            { id: 'a', text: 'Kohtuuttomat vaatimukset', isCorrect: true, feedback: 'Oikein. Mahdottomien tai tarkoituksellisen raskaiden ja turhien tehtävien antaminen on uuvuttamiseen tähtäävää kiusaamista.' },
            { id: 'b', text: 'Maineen vahingoittaminen', isCorrect: false, feedback: 'Väärin. Tämä kohdistuu työaikaan ja jaksamiseen, ei suoraan julkiseen kuvaan.' },
            { id: 'c', text: 'Emotionaalinen manipulaatio', isCorrect: false, feedback: 'Väärin. Vaikka tämä on kurjaa, kyse on nimenomaan työmäärän käytöstä aseena.' },
            { id: 'd', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Tilanteessa ei esitetä ehtoa (jos et tee -> niin...), vaan annetaan mahdoton tehtävä.' }
        ],
        hint: 'Kyse on vallankäytöstä, jossa tehtävä itsessään toimii rangaistuksena.'
    },
    {
        id: 'e6',
        level: 'easy',
        scenario: 'Esimies sanoo: "Jos tästä asiasta menee tieto eteenpäin, en voi taata, että työsuhteesi jatkuu koeajan jälkeen."',
        question: 'Mitä taktiikkaa tässä käytetään?',
        options: [
            { id: 'a', text: 'Uhkailu ja pelottelu', isCorrect: true, feedback: 'Oikein. Suora tai epäsuora uhkaus työpaikan menettämisestä on vakavaa kiusaamista ja vallan väärinkäyttöä.' },
            { id: 'b', text: 'Asiallinen ohjeistus', isCorrect: false, feedback: 'Väärin. Työsuhteen jatkolla pelottelu vaikenemisen ehdoksi ei ole koskaan asiallista.' },
            { id: 'c', text: 'Passiivi-aggressiivisuus', isCorrect: false, feedback: 'Väärin. Uhkaus on tässä hyvinkin suora, ei passiivinen.' },
            { id: 'd', text: 'Gaslighting', isCorrect: false, feedback: 'Väärin. Tässä ei vääristellä totuutta, vaan luodaan pelkoa.' }
        ],
        hint: 'Tämä taktiikka pyrkii vaientamaan uhrin pelon avulla.'
    },
    {
        id: 'e7',
        level: 'easy',
        scenario: 'Lounaspöydässä keskustelu lakkaa heti, kun istut alas, ja muut vaihtavat merkitseviä katseita keskenään.',
        question: 'Mistä on kyse?',
        options: [
            { id: 'a', text: 'Eristäminen ja ulossulkeminen', isCorrect: true, feedback: 'Oikein. Hiljaisuus ja elekieli, jotka viestivät "et kuulu joukkoon", ovat voimakkaita eristämisen keinoja.' },
            { id: 'b', text: 'Sattuma', isCorrect: false, feedback: 'Väärin. Jos tämä on toistuvaa, se on suunnitelmallista ulossulkemista.' },
            { id: 'c', text: 'Mitätöinti', isCorrect: false, feedback: 'Väärin. Mitätöinti kohdistuu sanomisiisi, tässä sinua ei edes oteta puheeseen mukaan.' },
            { id: 'd', text: 'Maineen vahingoittaminen', isCorrect: false, feedback: 'Väärin. Vaikka tämä voi liittyä juoruiluun, ensisijainen teko on sosiaalinen eristäminen.' }
        ],
        hint: 'Tämä on tyypillinen "näkymätön" tapa kertoa uhrille hänen asemansa.'
    },
    {
        id: 'e8',
        level: 'easy',
        scenario: 'Huomaat, että sinusta levitetään perättömiä juoruja koskien alkoholinkäyttöäsi vapaa-ajalla.',
        question: 'Mikä taktiikka on käytössä?',
        options: [
            { id: 'a', text: 'Maineen vahingoittaminen', isCorrect: true, feedback: 'Oikein. Perättömien huhujen levittäminen tähtää uhrin uskottavuuden ja sosiaalisen aseman tuhoamiseen.' },
            { id: 'b', text: 'Emotionaalinen manipulaatio', isCorrect: false, feedback: 'Väärin. Vaikka se tuntuu pahalta, kyse on nimenomaan julkisen kuvan mustamaalaamisesta.' },
            { id: 'c', text: 'Sananvapaus', isCorrect: false, feedback: 'Väärin. Valheiden levittäminen toisesta ei ole sananvapautta, vaan loukkaavaa käytöstä.' },
            { id: 'd', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Tässä ei uhata tulevalla, vaan vahingoitetaan nykyistä mainetta.' }
        ],
        hint: 'Tavoitteena on uhrin uskottavuuden syöminen muiden silmissä.'
    },
    {
        id: 'e9',
        level: 'easy',
        scenario: 'Esimies antaa sinulle erittäin tuskallisen tarkan ja tiukan palautteen raportistasi, jossa on useita asiavirheitä. Hän vaatii korjauksia huomiseksi.',
        question: 'Onko tämä kiusaamista?',
        options: [
            { id: 'a', text: 'Ei, tämä on asiallista kritiikkiä', isCorrect: true, feedback: 'Oikein. Työn laatuun kohdistuva, perusteltu palaute ja virheiden korjausvaatimus on esimiehen oikeus ja velvollisuus.' },
            { id: 'b', text: 'Kyllä, se on kohtuuton vaatimus', isCorrect: false, feedback: 'Väärin. Jos raportissa on isoja virheitä, korjaus on tarpeen nopeasti. Se ei ole kiusaamista, ellei aikataulu ole mahdoton.' },
            { id: 'c', text: 'Kyllä, se on mitätöintiä', isCorrect: false, feedback: 'Väärin. Virheiden osoittaminen on eri asia kuin osaamisen yleinen vähättely.' },
            { id: 'd', text: 'Kyllä, se on uhkailua', isCorrect: false, feedback: 'Väärin. Kritiikki ja vaatimustaso eivät ole uhkailua.' }
        ],
        hint: 'Mieti, kohdistuuko teko työn sisältöön vai henkilöön.'
    },
    {
        id: 'e10',
        level: 'easy',
        scenario: 'Laitat esimiehellesi sähköpostia tärkeästä asiasta. Hän vastaa kaikille muiden tiimiläisten viesteihin, mutta jättää sinun viestisi toistuvasti vastaamatta viikkojen ajan.',
        question: 'Mikä taktiikka?',
        options: [
            { id: 'a', text: 'Passiivi-aggressiivisuus', isCorrect: true, feedback: 'Oikein. Vaikeneminen ja huomiotta jättäminen (silent treatment) sähköpostitse on passiivista aggressiivisuutta.' },
            { id: 'b', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Hiljaisuus ei ole suora uhkaus, vaan passiivinen teko.' },
            { id: 'c', text: 'Työkiire', isCorrect: false, feedback: 'Väärin. Jos hän vastaa muille mutta ei sinulle toistuvasti, kyse ei ole pelkästä kiireestä.' },
            { id: 'd', text: 'Mitätöinti', isCorrect: false, feedback: 'Väärin. Tämä on lähempänä eristämistä tai passiivista vastustusta kuin suoraa vähättelyä.' }
        ],
        hint: 'Tämä on tyypillinen "hiljainen" tapa osoittaa vihamielisyyttä.'
    },

    // --- KESKIVAIKEA (MEDIUM) ---
    {
        id: 'm1',
        level: 'medium',
        scenario: 'Esimies kehuu kaikkia muita tiimin jäseniä vuolaasti erinomaisesta suorituksesta, mutta sinun kohdallasi hän toteaa vain lyhyesti: "Sinäkin teit osuutesi."',
        question: 'Mitä taktiikkaa tässä käytetään?',
        options: [
            { id: 'a', text: 'Mitätöinti ja vähättely', isCorrect: true, feedback: 'Oikein. Kontrastilla luotu vähättely on hienovaraista: kehumalla muita sivuutetaan sinun merkityksesi.' },
            { id: 'b', text: 'Epäoikeudenmukaisuus', isCorrect: false, feedback: 'Väärin. Vaikka se on epäreilua, keskeinen mekanismi on suorituksen vähättely suhteessa muihin.' },
            { id: 'c', text: 'Asiallinen palaute', isCorrect: false, feedback: 'Väärin. Jatkuva kontrastin luominen muihin on kiusaamista, ei tasapuolista palautetta.' },
            { id: 'd', text: 'Emotionaalinen manipulaatio', isCorrect: false, feedback: 'Väärin. Tämä on suoraan osaamisen vähättelyä.' }
        ],
        hint: 'Tämä on hienovarainen tapa kertoa, että panoksesi ei ole yhtä arvokas kuin muiden.'
    },
    {
        id: 'm2',
        level: 'medium',
        scenario: 'Sait suuren projektin valmiiksi etuajassa. Esimiehesi sanoo: "Hienoa että ehdit kerrankin ajoissa, yleensähän sinulla on tapana viivytellä."',
        question: 'Mikä on kyseessä?',
        options: [
            { id: 'a', text: 'Passiivi-aggressiivisuus', isCorrect: true, feedback: 'Oikein. "Vale-kehu" (backhanded compliment) on tapa piilottaa kritiikki tai loukkaus positiivisen lauseen sisään.' },
            { id: 'b', text: 'Asiallinen muistutus', isCorrect: false, feedback: 'Väärin. Historialla piikittely onnistumisen hetkellä ei ole rakentavaa ohjausta.' },
            { id: 'c', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Tässä ei uhata millään, vaan loukataan.' },
            { id: 'd', text: 'Gaslighting', isCorrect: false, feedback: 'Väärin. Tässä ei yritetä vääristää muistoja, vaan luoda syyllisyyttä.' }
        ],
        hint: 'Tämä on kehu, joka jättää pahan maun suuhun.'
    },
    {
        id: 'm3',
        level: 'medium',
        scenario: 'Tiimipalaverissa esimies kysyy mielipidettäsi asiaan, mutta alkaa katsoa puhelintaan ja keskeyttää sinut heti kun aloitat vastaamisen.',
        question: 'Mitä tässä tapahtuu?',
        options: [
            { id: 'a', text: 'Mitätöinti (näkymättömäksi tekeminen)', isCorrect: true, feedback: 'Oikein. Demonstroimalla, ettei vastauksesi oikeasti kiinnosta, esimies mitätöi asiantuntijuutesi muiden edessä.' },
            { id: 'b', text: 'Työkiire', isCorrect: false, feedback: 'Väärin. Puhelimen katsominen ja keskeyttäminen on epäkunnioittavaa käytöstä, ei kiirettä.' },
            { id: 'c', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Tilanteessa ei ole pelote-elementtiä.' },
            { id: 'd', text: 'Eristäminen', isCorrect: false, feedback: 'Väärin. Vaikka se voi johtaa eristämiseen, ensisijainen teko on puheenvuoron vähättely.' }
        ],
        hint: 'Tämä taktiikka viestii, että puheellasi ei ole arvoa.'
    },
    {
        id: 'm4',
        level: 'medium',
        scenario: 'Kollegasi ottaa kunnian ideasta, jonka esitit hänelle kahden kesken aamukahvilla, ja esittelee sen omana ideanaan viikkopalaverissa.',
        question: 'Mikä taktiikka?',
        options: [
            { id: 'a', text: 'Sabotaasi ja hyväksikäyttö', isCorrect: true, feedback: 'Oikein. Toisen ideoilla ratsastaminen ja uhrin näkyvyyden vieminen on urakehityksen sabotoimista.' },
            { id: 'b', text: 'Yhteistyö', isCorrect: false, feedback: 'Väärin. Yhteistyössä kunnia jaetaan, ei varasteta.' },
            { id: 'c', text: 'Gaslighting', isCorrect: false, feedback: 'Väärin. Hän ei yritä saada sinua epäilemään sanoitko sen, hän vain varastaa sen.' },
            { id: 'd', text: 'Emotionaalinen manipulaatio', isCorrect: false, feedback: 'Väärin. Kyse on työpanoksen varastamisesta.' }
        ],
        hint: 'Tämä kohdistuu suoraan uhrin työn arvoon ja näkyvyyteen.'
    },
    {
        id: 'm5',
        level: 'medium',
        scenario: 'Esimies muuttaa projektin tavoitteita ja deadlineja jatkuvasti ilmoittamatta niistä sinulle, mutta kritisoi sinua siitä, ettet pysy aikataulussa.',
        question: 'Mitä taktiikkaa tässä käytetään?',
        options: [
            { id: 'a', text: 'Epäoikeudenmukaisuus ja sabotaasi', isCorrect: true, feedback: 'Oikein. "Liikkuvat maalit" tekevät onnistumisesta mahdotonta, mikä on tyypillistä sabotaasia.' },
            { id: 'b', text: 'Huono johtaminen', isCorrect: false, feedback: 'Väärin. Jos tämä on toistuvaa ja kohdistuu vain sinuun, kyse ei ole vain huonosta johtamisesta vaan kiusaamisesta.' },
            { id: 'c', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Uhkaus puuttuu, mutta kritiikki perusteettomasti on läsnä.' },
            { id: 'd', text: 'Maineen vahingoittaminen', isCorrect: false, feedback: 'Väärin. Vaikka maine kärsii epäonnistumisesta, teko itsessään on työnteon vaikeuttamista.' }
        ],
        hint: 'Tämä tekee onnistumisen mahdottomaksi tarkoituksella.'
    },
    {
        id: 'm6',
        level: 'medium',
        scenario: 'Työyhteisössä on sovittu yhteinen "sisäpiirin vitsi", joka liittyy sinun tapaasi puhua tai pukeutua. Vaikka sanot, ettei se ole kivaa, he jatkavat "hyvällä huumorilla".',
        question: 'Mistä on kyse?',
        options: [
            { id: 'a', text: 'Identiteetin hyökkäys ja vähättely', isCorrect: true, feedback: 'Oikein. Huumorin varjolla tehty henkilöön kohdistuva pilkka on vallankäyttöä ja kiusaamista.' },
            { id: 'b', text: 'Työpaikkahuumori', isCorrect: false, feedback: 'Väärin. Huumori lakkaa olemasta huumoria, kun kohde kokee sen loukkaavaksi.' },
            { id: 'c', text: 'Gaslighting', isCorrect: false, feedback: 'Väärin. Vaikka he voivat väittää sinun olevan liian herkkä, keskeinen teko on pilkkaaminen.' },
            { id: 'd', text: 'Eristäminen', isCorrect: false, feedback: 'Väärin. Tämä on aktiivista nolaamista, ei pelkkää sivuuttamista.' }
        ],
        hint: 'Tämä on tyypillinen tapa naamioida aggressio huumoriksi.'
    },
    {
        id: 'm7',
        level: 'medium',
        scenario: 'Esimies sanoo: "Sinulla tuntuu olevan vaikeuksia sopeutua meidän tiimin dynaamiseen kulttuuriin. Ehkä tämä ympäristö on sinulle liian vaativa?"',
        question: 'Mikä taktiikka?',
        options: [
            { id: 'a', text: 'Emotionaalinen manipulaatio / Gaslighting', isCorrect: true, feedback: 'Oikein. Syyn siirtäminen uhrin "persoonaan" tai "kykyihin" sen sijaan että puhuttaisiin ongelmista, on hienovaraista manipulointia.' },
            { id: 'b', text: 'Asiallinen ohjaus', isCorrect: false, feedback: 'Väärin. Ohjauksessa annettaisiin tukea tai konkreettisia parannusehdotuksia, ei kyseenalaistettaisi koko ihmistä.' },
            { id: 'c', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Tässä ei suoraan uhata, mutta vihjataan poistumiseen.' },
            { id: 'd', text: 'Mitätöinti', isCorrect: false, feedback: 'Väärin. Tämä on enemmänkin uhrin todellisuudentajun horjuttamista.' }
        ],
        hint: 'Tämä saa uhrin itsensä tuntemaan olevansa ongelma.'
    },
    {
        id: 'm8',
        level: 'medium',
        scenario: 'Huomaat, että sinua koskevia tärkeitä sähköposteja "katoaa" tai niitä ei lähetetä sinulle, mutta esimies syyttää sinua tiedonpuutteesta muiden edessä.',
        question: 'Mikä taktiikka?',
        options: [
            { id: 'a', text: 'Sabotaasi ja nolaaminen', isCorrect: true, feedback: 'Oikein. Tiedon panttaaminen (gatekeeping) yhdistettynä julkiseen syyttämiseen on tehokas yhdistelmä sabotaasia ja nolaamista.' },
            { id: 'b', text: 'Inhimillinen virhe', isCorrect: false, feedback: 'Väärin. Jos tiedon puutteesta rangaistaan nolaamalla, se ei ole enää pelkkä virhe.' },
            { id: 'c', text: 'Gaslighting', isCorrect: false, feedback: 'Väärin. Tässä sabotoidaan työn resursseja.' },
            { id: 'd', text: 'Maineen vahingoittaminen', isCorrect: false, feedback: 'Väärin. Teko on sabotaasia, julkinen syyttäminen on nolaamista.' }
        ],
        hint: 'Kyse on tiedon käyttämisestä vallan välineenä.'
    },
    {
        id: 'm9',
        level: 'medium',
        scenario: 'Olet tehnyt hienon tuloksen. Esimies sanoo: "Upeaa, mutta muista että tämä on vain yksi onnistuminen. Älä anna sen nousta hattuun, olet kuitenkin vielä aika kokematon."',
        question: 'Onko tämä kiusaamista?',
        options: [
            { id: 'a', text: 'Kyllä, se on mitätöintiä ja vähättelyä', isCorrect: true, feedback: 'Oikein. Onnistumisen välitön alasampuminen (vähättely) estää uhrin itsetunnon kasvun ja nautinnon työstä.' },
            { id: 'b', text: 'Ei, se on realismia', isCorrect: false, feedback: 'Väärin. Realismi ei tarkoita toisen onnistumisen tarkoituksellista himmentämistä välittömästi.' },
            { id: 'c', text: 'Kyllä, se on uhkailua', isCorrect: false, feedback: 'Väärin. Uhkaus puuttuu, kyse on statuksen laskemisesta.' },
            { id: 'd', text: 'Ei, se on palautetta', isCorrect: false, feedback: 'Väärin. Palaute ilman kannustusta ja pelkkä vähättely on kiusaamista.' }
        ],
        hint: 'Tämä vie ilon onnistumisesta silmänräpäyksessä.'
    },
    {
        id: 'm10',
        level: 'medium',
        scenario: 'Kaikki muut saavat osallistua koulutuspäivään, mutta sinun on jäätävä "päivystämään toimistolle", koska joku on aina paikalla oltava. Tämä on jo kolmas kerta putkeen.',
        question: 'Mikä taktiikka?',
        options: [
            { id: 'a', text: 'Epäoikeudenmukaisuus ja eristäminen', isCorrect: true, feedback: 'Oikein. Resurssien ja kehitysmahdollisuuksien epätasa-arvoinen jakaminen on tapa sivuuttaa uhri.' },
            { id: 'b', text: 'Työnjako', isCorrect: false, feedback: 'Väärin. Jos työnjako osuu aina samaan henkilöön toisten hyödyksi, se ei ole asiallista työnjakoa.' },
            { id: 'c', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Kyse on passiivisesta syrjimisestä.' },
            { id: 'd', text: 'Sabotaasi', isCorrect: false, feedback: 'Väärin. Kyse on urakehityksen ja sosiaalisen osallistumisen estämisestä.' }
        ],
        hint: 'Tämä taktiikka jättää uhrin jälkeen muusta tiimistä.'
    },

    // --- VAIKEA (HARD) ---
    {
        id: 'h1',
        level: 'hard',
        scenario: 'Esimies on kanssasi erittäin mukava ja kannustava kahden kesken, mutta muiden läsnä ollessa hän on kylmä ja etäinen. Alat kyseenalaistaa, oletko kuvitellut hänen ystävällisyytensä.',
        question: 'Mitä taktiikkaa tässä käytetään?',
        options: [
            { id: 'a', text: 'Gaslighting ja emotionaalinen manipulaatio', isCorrect: true, feedback: 'Oikein. Kahdet kasvot (Jekyll & Hyde) tuottavat uhrille valtavaa hämmennystä ja saavat epäilemään omaa tulkintakykyä.' },
            { id: 'b', text: 'Tilanneherkkyys', isCorrect: false, feedback: 'Väärin. Suoraan vastakkainen käytös eri tilanteissa on epätervettä manipulointia, ei asiallista sopeutumista.' },
            { id: 'c', text: 'Asiallinen kritiikki', isCorrect: false, feedback: 'Väärin. Tässä ei ole kyse kritiikistä vaan epäloogisesta sosiaalisesta kohtelusta.' },
            { id: 'd', text: 'Sabotaasi', isCorrect: false, feedback: 'Väärin. Tämä kohdistuu uhrin mielenterveyteen ja luottamukseen.' }
        ],
        hint: 'Tämä taktiikka perustuu epäjohdonmukaisuuteen, joka horjuttaa uhrin tasapainoa.'
    },
    {
        id: 'h2',
        level: 'hard',
        scenario: 'Sinua pyydetään kommentoimaan projektia. Kun teet sen, esimies sanoo: "Kiitos, mutta tuntuu että olet nyt vähän liian emotionaalisesti kiinnittynyt tähän. Pysytäänpä faktoissa."',
        question: 'Kyseessä on taktiikka, joka tunnetaan nimellä...',
        options: [
            { id: 'a', text: 'Tone policing (äänensävyn kyttäys / mitätöinti)', isCorrect: true, feedback: 'Oikein. Sisällön ohittaminen ja keskittyminen uhrin "tunteeseen" on tapa viedä sanoman uskottavuus.' },
            { id: 'b', text: 'Asiallinen ohjaus', isCorrect: false, feedback: 'Väärin. Asiallisessa ohjauksessa vastattaisiin argumentteihin, ei leimattaisi puhujaa "tunteelliseksi".' },
            { id: 'c', text: 'Gaslighting', isCorrect: false, feedback: 'Väärin. Vaikka se voi olla osa sitä, spesifimpi muoto on asiasisällön kieltäminen tunteeseen vedoten.' },
            { id: 'd', text: 'Sabotaasi', isCorrect: false, feedback: 'Väärin. Tämä on suoraan suullista vähättelyä.' }
        ],
        hint: 'Hyökkäys kohdistuu siihen, *miten* sanot asian, ei siihen *mitä* sanot.'
    },
    {
        id: 'h3',
        level: 'hard',
        scenario: 'Huomaat, että aina kun teet pienenkin inhimillisen virheen (kuten kirjoitusvirhe meilissä), siitä nousee valtava haloo. Muilta samoja virheitä ei edes huomioida.',
        question: 'Mitä taktiikkaa tässä käytetään?',
        options: [
            { id: 'a', text: 'Death by a Thousand Cuts / Mikrotarkkailu', isCorrect: true, feedback: 'Oikein. Epätasa-arvoinen puuttuminen pikkuseikkoihin kuluttaa uhrin hermoja ja luo jatkuvan pelon tilan.' },
            { id: 'b', text: 'Laadunvalvonta', isCorrect: false, feedback: 'Väärin. Laadunvalvonnan tulee olla tasapuolista eikä se saa olla kohtuutonta.' },
            { id: 'c', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Uhkaus on epäsuora, mutta kyse on jatkuvasta nalkuttamisesta.' },
            { id: 'd', text: 'Mitätöinti', isCorrect: false, feedback: 'Väärin. Kyse on virheiden suurentamisesta, ei osaamisen kieltämisestä.' }
        ],
        hint: 'Pienistä puroista kasvaa valtava uupumuksen joki.'
    },
    {
        id: 'h4',
        level: 'hard',
        scenario: 'Esimies kysyy: "Oletko nyt aivan varma, että olet palautunut sairauslomalta? Näytät hieman väsyneeltä tänään. Ehkä emme anna tätä uutta vastuuta sinulle vielä?"',
        question: 'Tämä on hienovarainen taktiikka, jonka nimi on...',
        options: [
            { id: 'a', text: 'Huolenpitoon naamioitu syrjintä / mitätöinti', isCorrect: true, feedback: 'Oikein. "Huoli" uhrin jaksamisesta on usein tapa rajoittaa hänen etenemistään tai viedä mielenkiintoiset tehtävät.' },
            { id: 'b', text: 'Vastuullinen johtaminen', isCorrect: false, feedback: 'Väärin. Vastuullinen johtaja kysyisi: "Miten sinulla menee, tarvitsetko tukea?", eikä tekisi oletuksia ja eväisi vastuuta.' },
            { id: 'c', text: 'Gaslighting', isCorrect: false, feedback: 'Väärin. Tässä ei vääristellä menneisyyttä, vaan nykyhetkeä huolen varjolla.' },
            { id: 'd', text: 'Empathia', isCorrect: false, feedback: 'Väärin. Aito empatia antaa valtaa kohteelle, ei ota sitä pois.' }
        ],
        hint: 'Nenän alla on huoli, mutta takana on vallan rajoittaminen.'
    },
    {
        id: 'h5',
        level: 'hard',
        scenario: 'Tiimipalaverissa esimies esittää kysymyksen, johon tiedät vastauksen. Kun vastaat, hän sanoo: "Kiitos, mutta haluaisin kuulla jonkun sellaisen mielipiteen, joka on ollut täällä kauemmin."',
        question: 'Mikä taktiikka?',
        options: [
            { id: 'a', text: 'Eksklusiivisuus ja statuksen vähättely', isCorrect: true, feedback: 'Oikein. Osaamisen kytkeminen statukseen (kuten seniority) on tapa evätä uhrilta oikeus osallistua keskusteluun.' },
            { id: 'b', text: 'Fakta', isCorrect: false, feedback: 'Väärin. Kokemus on fakta, mutta sen käyttäminen asiantuntemuksen sivuuttamiseen on kiusaamista.' },
            { id: 'c', text: 'Sabotaasi', isCorrect: false, feedback: 'Väärin. Tämä on sosiaalista nolaamista palaverissa.' },
            { id: 'd', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Pelote puuttuu, mutta loukkaus on selkeä.' }
        ],
        hint: 'Tässä rakennetaan muuria uhrin ja päätöksenteon välille.'
    },
    {
        id: 'h6',
        level: 'hard',
        scenario: 'Sait tehtäväksesi valmistella esityksen. Deadlineksi sovittiin perjantai. Torstaina esimies kysyy: "Missä esitys on? Sovimme että se on valmis keskiviikkona."',
        question: 'Mitä tässä tapahtuu?',
        options: [
            { id: 'a', text: 'Gaslighting (aikataulun vääristäminen)', isCorrect: true, feedback: 'Oikein. Aikatauluista valehtelu jälkikäteen tähtää uhrin syyllistämiseen ja oman muistin epäilyyn.' },
            { id: 'b', text: 'Väärinkäsitys', isCorrect: false, feedback: 'Väärin. Jos deadlinet "siirtyvät" vain sinun kohdallasi, se on tietoista manipulointia.' },
            { id: 'c', text: 'Sabotaasi', isCorrect: false, feedback: 'Väärin. Sabotaasi olisi tiedostojen poistaminen, aikataulusta valehtelu on gaslightingia.' },
            { id: 'd', text: 'Kohtuuttomat vaatimukset', isCorrect: false, feedback: 'Väärin. Vaatimus on sama, mutta ajankohtaa vääristellään.' }
        ],
        hint: 'Tämä saa sinut etsimään meilejä, joita ei ole olemassa.'
    },
    {
        id: 'h7',
        level: 'hard',
        scenario: 'Esimies pyytää sinua pysymään töiden jälkeen "keskustelemaan". Hän ei kerro aihetta, mutta on vakava. Odottat tapaamista koko päivän ahdistuneena. Tapaamisessa hän puhuukin vain säästä.',
        question: 'Tämä on tyypillinen esimerkki...',
        options: [
            { id: 'a', text: 'Psykologisesta pelottelusta / horjuttamisesta', isCorrect: true, feedback: 'Oikein. Epävarmuuden ja pelon luominen tarkoituksella (vagaat varoitukset) on vakavaa henkistä väkivaltaa.' },
            { id: 'b', text: 'Pienestä pilasta', isCorrect: false, feedback: 'Väärin. Pila on hauska molemmille, tämä aiheuttaa toiselle kärsimystä.' },
            { id: 'c', text: 'Passiivi-aggressiivisuudesta', isCorrect: false, feedback: 'Väärin. Tämä on aktiivista manipulointia.' },
            { id: 'd', text: 'Heikosta viestinnästä', isCorrect: false, feedback: 'Väärin. Ammattilainen tunnistaa, että epävarmuuden luominen on vallankäyttöä.' }
        ],
        hint: 'Tämä hyökkää uhrin turvallisuudentunnetta vastaan.'
    },
    {
        id: 'h8',
        level: 'hard',
        scenario: 'Esimies vihjailee muiden työntekijöiden olevan tyytymättömiä panokseesi, mutta ei suostu nimeämään kuka on valittanut tai mitä on sanottu.',
        question: 'Mikä taktiikka?',
        options: [
            { id: 'a', text: 'Mielikuvien luominen ja eristäminen (Triangulaatio)', isCorrect: true, feedback: 'Oikein. Kuvitteellisen "vastustajajoukon" luominen syö uhrin turvallisuuden ja saa hänet epäilemään kaikkia kollegoitaan.' },
            { id: 'b', text: 'Anonyymi palaute', isCorrect: false, feedback: 'Väärin. Anonyymin palautteen tulee silti olla konkreettista eikä sitä tule käyttää pelotteluun.' },
            { id: 'c', text: 'Maineen vahingoittaminen', isCorrect: false, feedback: 'Väärin. Maine on jo ehkä vahingoitettu, mutta teko on psyykkinen horjuttaminen.' },
            { id: 'd', text: 'Uhkailu', isCorrect: false, feedback: 'Väärin. Tässä ei uhata, vaan kerrotaan (ehkä valheellisesti) toisten mielipiteitä.' }
        ],
        hint: 'Tämä tehtiin, jotta tuntisit olevasi yksin kaikkia muita vastaan.'
    },
    {
        id: 'h9',
        level: 'hard',
        scenario: 'Tiimipalaverissa puhutaan uudesta strategiasta. Esimies sanoo: "Tämä voi olla joillekin vähän liian monimutkaista, joten ehkä [Sinun Nimesi] voisi keskittyä noihin kopiokoneen huoltoihin tänään?"',
        question: 'Onko tämä kiusaamista?',
        options: [
            { id: 'a', text: 'Kyllä, se on loukkaavaa vähättelyä ja osaamisen sivuuttamista', isCorrect: true, feedback: 'Oikein. Julkinen älykkyyden tai osaamisen kyseenalaistaminen ja alentavat tehtävät ovat selkeää kiusaamista.' },
            { id: 'b', text: 'Ei, se on työnjakoa osaamisen mukaan', isCorrect: false, feedback: 'Väärin. Työnjaon tulee kunnioittaa kunkin ammattitaitoa.' },
            { id: 'c', text: 'Ei, se on huolenpitoa työmäärästä', isCorrect: false, feedback: 'Väärin. Kopiokoneen huolto ei ole asiantuntijan tehtävä.' },
            { id: 'd', text: 'Kyllä, se on uhkailua', isCorrect: false, feedback: 'Väärin. Uhkaus puuttuu, nolaaminen on keskiössä.' }
        ],
        hint: 'Mieti miltä sinusta tuntuisi muiden silmissä.'
    },
    {
        id: 'h10',
        level: 'hard',
        scenario: 'Olet tehnyt ison virheen. Esimies ottaa asian puheeksi rauhallisesti, esittää faktat ja pyytää sinua tekemään suunnitelman, miten vastaava vältetään jatkossa.',
        question: 'Onko tämä kiusaamista?',
        options: [
            { id: 'a', text: 'Ei, tämä on asiallista ja rakentavaa palautetta', isCorrect: true, feedback: 'Oikein. Virheisiin puuttuminen, faktoilla perusteleminen ja ratkaisukeskeisyys ovat hyvää johtamista, eivät kiusaamista.' },
            { id: 'b', text: 'Kyllä, se on mitätöintiä', isCorrect: false, feedback: 'Väärin. Virheen osoittaminen ei ole mitätöintiä, jos se tapahtuu asiallisesti.' },
            { id: 'c', text: 'Kyllä, se on emotionaalista väkivaltaa', isCorrect: false, feedback: 'Väärin. Palaute on harvoin mukavaa, mutta asiallisena se ei ole väkivaltaa.' },
            { id: 'd', text: 'Ei, mutta se on epäreilua', isCorrect: false, feedback: 'Väärin. Virheen käsittely on reilua työn laatua ajatellen.' }
        ],
        hint: 'Mieti, pyrkiväkö teko tuhoamaan henkilöä vai parantamaan työtä.'
    }
];
