import { Tactic, TacticCategory, RoleAdvice } from '@/types/domain';

export const tactics: Tactic[] = [
    {
        id: "mitatointi",
        category: "verbal",
        name: "Mitätöinti & Vähättely",
        definition: "Osaamisen ja saavutusten jatkuva vähättely.",
        phrases: ["Tuo on turha ehdotus", "Etkö todella tiedä tätä?"],
        goal: "Murentaa itseluottamus.",
        strategy: ["Dokumentoi palaute.", "Vahvista osaamisesi muiden kanssa."],
        logExample: "Esimies sivuutti ehdotukseni sanoen sitä 'turhaksi'.",
        impact: { stress: 65, burnout: 50, selfEsteem: 85 },
        advice: {
            victim: { title: "Suojaa ammattiarvosi", description: "Muista oma osaamisesi.", actions: ["Kerää positiivinen palaute", "Pyydä kirjalliset perustelut"] },
            witness: { title: "Validoi osaaminen", description: "Tue uhria julkisesti.", actions: ["Sano: 'Mielestäni tuo oli hyvä'", "Älä naura mukana"] },
            manager: { title: "Puutu heti", description: "Vähättely tuhoaa tiimin.", actions: ["Luo selkeät pelisäännöt", "Varmista tasapuolinen palaute"] }
        }
    },
    {
        id: "gaslighting",
        category: "verbal",
        name: "Gaslighting",
        definition: "Psykologinen manipulaatio todellisuudentajun horjuttamiseksi.",
        phrases: ["En ole koskaan sanonut tuota", "Kuvittelet vain"],
        goal: "Saada uhri epäilemään omia havaintojaan.",
        strategy: ["Kirjaa asiat ylös heti.", "Käytä sähköpostivahvistuksia."],
        logExample: "Sovittu asia kiellettiin myöhemmin kokonaan.",
        impact: { stress: 90, burnout: 70, selfEsteem: 90 },
        advice: {
            victim: { title: "Luota havaintoihisi", description: "Käytä dokumentaatiota ankkurina.", actions: ["Vahvista asiat sähköpostilla", "Pidä neutraali todistaja"] },
            witness: { title: "Vahvista totuus", description: "Auta uhria maadoittumaan.", actions: ["Sano: 'Minäkin muistan sen noin'", "Älä anna muuttaa faktoja"] },
            manager: { title: "Vaadi läpinäkyvyyttä", description: "Selkeys on lääke.", actions: ["Vaadi kirjalliset muistiot", "Seuraa toistuvia 'muistivirheitä'"] }
        }
    },
    {
        id: "uhkailu",
        category: "verbal",
        name: "Uhkailu & Pelottelu",
        definition: "Suora tai epäsuora pelon käyttö hallinnan välineenä.",
        phrases: ["Tiedät mitä tästä seuraa", "Ehkä et sovi tänne"],
        goal: "Hiljentää ja hallita pelon avulla.",
        strategy: ["Dokumentoi uhat.", "Ota yhteys luottamusmieheen."],
        logExample: "Esimies vihjasi työsuhteen päättymisellä ilman syytä.",
        impact: { stress: 95, burnout: 80, selfEsteem: 75 },
        advice: {
            victim: { title: "Suojaa oikeusturvasi", description: "Älä jää yksin uhkailijan kanssa.", actions: ["Pyydä uhat kirjallisena", "Ota yhteys liittoon HETI"] },
            witness: { title: "Todista tapahtumat", description: "Auta dokumentoinnissa.", actions: ["Kirjaa havaintosi ylös", "Tarjoa tukea uhrille"] },
            manager: { title: "Nollatoleranssi", description: "Uhkailu on laitonta häirintää.", actions: ["Intervenoi välittömästi", "Selvitä uhkauksen laajuus"] }
        }
    },
    {
        id: "identiteetti",
        category: "verbal",
        name: "Identiteetin hyökkäys",
        definition: "Hyökkäys henkilökohtaisia ominaisuuksia kohtaan.",
        phrases: ["Oletko liian vanha tähän?", "Naiset eivät ymmärrä tätä"],
        goal: "Nöyryyttää ja osoittaa ulkopuolisuus.",
        strategy: ["Tunnista syrjintä.", "Dokumentoi sanat tarkasti."],
        logExample: "Koulutuksessa viitattiin ikääni alentavasti.",
        impact: { stress: 80, burnout: 60, selfEsteem: 95 },
        advice: {
            victim: { title: "Tunnista syrjintä", description: "Tämä on vastoin lakia.", actions: ["Dokumentoi sanatarkasti", "Ota yhteys luottamusmieheen"] },
            witness: { title: "Puutu puheeseen", description: "Osoita ettei tämä ole ok.", actions: ["Sano: 'Tuollainen ei kuulu tänne'", "Raportoi eteenpäin"] },
            manager: { title: "Varmista yhdenvertaisuus", description: "Johtajuva vaatii inkluusiota.", actions: ["Kouluta tiimiä", "Puutu heti 'vitseihin'"] }
        }
    },
    {
        id: "sexual_harassment",
        category: "verbal",
        name: "Seksuaalinen häirintä",
        definition: "Seksuaalissävytteinen epäasiallinen käytös.",
        phrases: ["Hyvältä näytät tänään", "Älä ole niin jäykkä (ehdottelu)"],
        goal: "Esineellistää ja nöyryyttää.",
        strategy: ["Sano selkeä lopetus.", "Ilmoita HR:lle."],
        logExample: "Sain epäasiallisia kommentteja ulkonäöstäni tauolla.",
        impact: { stress: 90, burnout: 65, selfEsteem: 90 },
        advice: {
            victim: { title: "Aseta tiukka raja", description: "Älä siedä häirintää.", actions: ["Sano: 'Lopeta, tämä on häiritsevää'", "Raportoi virallisesti HETI"] },
            witness: { title: "Riko hiljaisuus", description: "Hiljaisuus on hyväksyntää.", actions: ["Sano: 'Tuollainen ei ole asiallista'", "Tue uhria raportoinnissa"] },
            manager: { title: "Lakisääteinen velvollisuus", description: "Puutu heti ja vakavasti.", actions: ["Noudata tasa-arvolakia", "Varmista uhrin turvallisuus"] }
        }
    },
    {
        id: "eristaminen",
        category: "social",
        name: "Eristäminen & Ulossulkeminen",
        definition: "Tahallinen jättäminen vuorovaikutuksen ulkopuolelle.",
        phrases: ["Unohdin kutsua sinut", "Tämä ei kuulu sinulle"],
        goal: "Katkaista tukiverkostot.",
        strategy: ["Rakenna muita verkostoja.", "Kysy kirjallisesti syitä."],
        logExample: "Tiimi piti suunnittelupalaverin ilman minua.",
        impact: { stress: 75, burnout: 60, selfEsteem: 85 },
        advice: {
            victim: { title: "Riko saarto", description: "Ota itse kontaktia.", actions: ["Kysy suoraan: 'Miksi tieto ei kulkenut?'", "Rakenna verkostoja muualle"] },
            witness: { title: "Ole inklusiivinen", description: "Ota uhri mukaan.", actions: ["Kutsu kollega mukaan", "Lisää hänet sähköposteihin"] },
            manager: { title: "Seuraa dynamiikkaa", description: "Ulossulkeminen on ryhmäilmiö.", actions: ["Käytä arvottuja pareja", "Puutu klikkeihin"] }
        }
    },
    {
        id: "ostrakismi",
        category: "social",
        name: "Ostrakismi",
        definition: "Järjestelmällinen huomiotta jättäminen ('kylmä olka').",
        phrases: ["(Ei vastausta tervehdykseen)", "(Huone hiljenee saapuessasi)"],
        goal: "Murentaa yhteenkuuluvuus.",
        strategy: ["Pue havainnot sanoiksi.", "Hae ulkopuolista validaatiota."],
        logExample: "Kukaan ei vastaa kysymyksiini yhteisellä kanavalla.",
        impact: { stress: 85, burnout: 70, selfEsteem: 95 },
        advice: {
            victim: { title: "Validoi olemassaolosi", description: "Tämä on sosiaalista väkivaltaa.", actions: ["Tee havainnot näkyviksi HR:lle", "Hae vertaistukea"] },
            witness: { title: "Riko jää", description: "Ole se joka tervehtii.", actions: ["Tervehdi nimellä selkeästi", "Ota puheeksi katsomalla silmiin"] },
            manager: { title: "Nollatoleranssi", description: "Vaikein häirinnän muoto havaita.", actions: ["Kysy 1-to-1 keskusteluissa", "Intervenoi heti jäädytykseen"] }
        }
    },
    {
        id: "mobbing",
        category: "social",
        name: "Mobbing (Ryhmäkiusaaminen)",
        definition: "Usean henkilön kohdistama paine yhtä kohtaan.",
        phrases: ["Kaikkien mielestä olet vaikea", "Kukaan ei halua sinua"],
        goal: "Savustaa uhri ulos ryhmästä.",
        strategy: ["Etsi liittolaisia ulkopuolelta.", "Ota yhteys HR:ään välittömästi."],
        logExample: "Koko tiimi kääntyi minua vastaan yhden aloitteesta.",
        impact: { stress: 100, burnout: 85, selfEsteem: 100 },
        advice: {
            victim: { title: "Hae ulkopuolista apua", description: "Ryhmää vastaan ei pärjää yksin.", actions: ["Ota yhteys työsuojeluun", "Hae trauma-apua aikaisin"] },
            witness: { title: "Ole jäänmurtaja", description: "Yksikin soraääni voi purkaa paineen.", actions: ["Kysy: 'Miksi teemme näin?'", "Raportoi johdolle nimettömästi"] },
            manager: { title: "Hajota myrkyllinen ryhmä", description: "Vakavin johtamisongelma.", actions: ["Yksilökeskustelut heti", "Uudelleenjärjestele tiimi"] }
        }
    },
    {
        id: "maine",
        category: "social",
        name: "Maineen vahingoittaminen",
        definition: "Perättömien huhujen levittäminen.",
        phrases: ["Kuulin että hän tekee virheitä", "Hän ei ole tiimipelaaja"],
        goal: "Tuhota uskottavuus.",
        strategy: ["Oikaise faktat heti.", "Anna työn tulosten puhua."],
        logExample: "Minusta levitettiin valheellista tietoa johdolle.",
        impact: { stress: 80, burnout: 60, selfEsteem: 90 },
        advice: {
            victim: { title: "Puolusta todellisuutta", description: "Maine on pääomasi.", actions: ["Oikaise faktat heti", "Ole läpinäkyvä kaikessa"] },
            witness: { title: "Pysäytä huhut", description: "Huhu vaatii yleisön.", actions: ["Kysy: 'Mihin tämä perustuu?'", "Tuo esiin onnistumisia"] },
            manager: { title: "Suojele mainetta", description: "Häirintä pitää katkaista.", actions: ["Puutu selän takana puhumiseen", "Selvitä huhun lähde"] }
        }
    },
    {
        id: "cyberbullying",
        category: "social",
        name: "Nettikiusaaminen",
        definition: "Häirintä digitaalisissa kanavissa.",
        phrases: ["(Mitätöinti chatissa)", "(Vapaa-ajan häirintäviestit)"],
        goal: "Tehdä vapaa-ajasta turvatonta.",
        strategy: ["Screenshotaa kaikki.", "Laita ilmoitukset pois."],
        logExample: "Ryhmä-chatissa levitettiin halventavia meemejä minusta.",
        impact: { stress: 85, burnout: 70, selfEsteem: 85 },
        advice: {
            victim: { title: "Tallenna ja irtaudu", description: "Digitaalinen jälki on todiste.", actions: ["Ota kuvakaappaukset HETI", "Laita tekniset rajat"] },
            witness: { title: "Raportoi häirintä", description: "Vaikeneminen on hyväksyntää.", actions: ["Sano: 'Tämä ei ole asiallista'", "Kuvakaappaa jos uhri ei näe"] },
            manager: { title: "Hallitse digiympäristöä", description: "Työnantaja vastaa myös chateista.", actions: ["Luo etäväestinnän säännöt", "Puutu chatti-vitsailuun"] }
        }
    },
    {
        id: "kohtuuttomuus",
        category: "power",
        name: "Kohtuuttomat vaatimukset",
        definition: "Mahdottomien tavoitteiden asettaminen.",
        phrases: ["Tämä pitää olla valmis huomenna", "Muutkin pystyvät"],
        goal: "Uuvuttaa tai todistaa epäpätevyys.",
        strategy: ["Pyydä priorisointi kirjallisesti.", "Pidä työaikakirjanpitoa."],
        logExample: "Sain viikon työn tehtäväksi yhdessä iltapäivässä.",
        impact: { stress: 95, burnout: 90, selfEsteem: 50 },
        advice: {
            victim: { title: "Priorisoi faktat", description: "Kukaan ei ole yli-ihminen.", actions: ["Tee tehtävälista ajoituksineen", "Ilmoita ylikuormasta kirjallisesti"] },
            witness: { title: "Jaa huoli", description: "Uupumus on riski työturvallisuudelle.", actions: ["Huomauta työmäärästä yleisesti", "Tarjoa apua jos voit"] },
            manager: { title: "Seuraa kuormitusta", description: "Työturvallisuus on vastuullasi.", actions: ["Tarkista tehtäväjako", "Kysy 'Miten jaksat?'"] }
        }
    },
    {
        id: "epaoikeudenmukaisuus",
        category: "power",
        name: "Epäoikeudenmukaisuus",
        definition: "Sääntöjen ja etujen epätasa-arvoinen soveltaminen.",
        phrases: ["Hän saa etätyötä, sinä et", "Hänelle saa antaa anteeksi"],
        goal: "Viestittää epäarvoisuudesta.",
        strategy: ["Vertaa ohjeistuksiin.", "Pyydä kirjalliset perustelut."],
        logExample: "Palkankorotus evättiin minulta ilman syytä, muille se annettiin.",
        impact: { stress: 70, burnout: 55, selfEsteem: 75 },
        advice: {
            victim: { title: "Vaadi tasapuolisuutta", description: "Olet tasavertainen kollega.", actions: ["Vertaile ohjeisiin", "Ota puheeksi 1-to-1"] },
            witness: { title: "Anna tunnustus", description: "Palauta oikeudenmukaisuus.", actions: ["Kehu oikeaa tekijää", "Kysy tasapuolisuudesta julkisesti"] },
            manager: { title: "Ole läpinäkyvä", description: "Säännöt ovat samat kaikille.", actions: ["Perustele päätökset openly", "Tunnista todelliset tekijät"] }
        }
    },
    {
        id: "micromanagement",
        category: "power",
        name: "Mikrosäätö & Kyttäys",
        definition: "Liiallinen valvonta ja puuttuminen yksityiskohtiin.",
        phrases: ["CC:ksi jokaiseen viestiin", "Avaa näyttösi tässä"],
        goal: "Viedä ammatillinen autonomia.",
        strategy: ["Raportoi proaktiivisesti.", "Kysy tarvittavasta tuesta."],
        logExample: "Esimies puuttui jokaisen sähköpostini kielioppiin ja fonttiin.",
        impact: { stress: 70, burnout: 60, selfEsteem: 40 },
        advice: {
            victim: { title: "Rakenna luottamusta", description: "Kyttäys kertoo esimiehen pelosta.", actions: ["Sovi tarkistuspisteet", "Pidä kirjaa suorituksista"] },
            witness: { title: "Tue autonomiaa", description: "Poikkeava valvonta on haitallista.", actions: ["Vahvista kollegan osaaminen", "Älä raportoi muiden tekemisistä turhaan"] },
            manager: { title: "Luota ja delegoi", description: "Kyttäys tappaa motivaation.", actions: ["Keskity lopputulokseen", "Opettele delegointia"] }
        }
    },
    {
        id: "credit_stealing",
        category: "power",
        name: "Kunnian varastaminen",
        definition: "Toisen ideoiden esittäminen omina.",
        phrases: ["Kuten sanoin (sinun ideasi)", "Minä sain tämän valmiiksi"],
        goal: "Edistää omaa uraa toisen työllä.",
        strategy: ["Merkitse nimesi joka paikkaan.", "Jaa ideoita laajemmin."],
        logExample: "Palaverissa esittelemäni idea kirjattiin esimiehen nimiin raportissa.",
        impact: { stress: 55, burnout: 40, selfEsteem: 70 },
        advice: {
            victim: { title: "Ole näkyvä", description: "Työsi on sinun pääomasi.", actions: ["Lisää nimi dokumentteihin", "Puhu työn alla olevista asioista"] },
            witness: { title: "Palauta kunnia", description: "Tue totuutta julkisesti.", actions: ["Sano: 'Hienoa että jatkoit X:n ideaa'", "Älä anna väärän tiedon jäädä"] },
            manager: { title: "Tunnista tekijät", description: "Arvosta todellista panosta.", actions: ["Pyydä erittely työnjaosta", "Kehu yksilöitä heidän työstään"] }
        }
    },
    {
        id: "unjustified_warnings",
        category: "power",
        name: "Perusteettomat varoitukset",
        definition: "Kurinpidon käyttö pelotteluna.",
        phrases: ["Tämä on virallinen huomautus", "Olet mustalla listalla"],
        goal: "Luoda peruste poistamiselle.",
        strategy: ["Vastaa aina kirjallisesti.", "Soita liittoon HETI."],
        logExample: "Sain varoituksen 'asenneongelmasta', kun pyysin lakisääteistä taukoa.",
        impact: { stress: 100, burnout: 80, selfEsteem: 60 },
        advice: {
            victim: { title: "Suojaa oikeusturvasi", description: "Tämä on suora hyökkäys.", actions: ["Dokumentoi jokainen väite", "Ota juristiin yhteys HETI"] },
            witness: { title: "Todista faktat", description: "Voit olla avainasemassa.", actions: ["Kirjaa omat havaintosi", "Tarjoa moraalista tukea"] },
            manager: { title: "Käytä vastuullisesti", description: "Väärinkäyttö on laitonta.", actions: ["Varmista objektiiviset syyt", "Noudata lakia tarkasti"] }
        }
    },
    {
        id: "passiivi-aggressio",
        category: "passive",
        name: "Passiivi-aggressio",
        definition: "Piilotettu vihamielisyys ja epäsuora vastustaminen.",
        phrases: ["Olipa upea suoritus (sarkasmi)", "Olen vain rehellinen"],
        goal: "Satuttaa ilman vastuuta teoista.",
        strategy: ["Kysy suoraan tarkoitusta.", "Pysy viileän asiallisena."],
        logExample: "Esimies pyöritteli silmiään puheenvuorollani.",
        impact: { stress: 70, burnout: 55, selfEsteem: 65 },
        advice: {
            victim: { title: "Tee piilotettu näkyväksi", description: "Älä mene mukaan peliin.", actions: ["Vastaa vain asiasisältöön", "Kysy: 'Mitä tarkoitit tuolla?'"] },
            witness: { title: "Huomioi eleet", description: "Passiivinen hyökkäys vaatii yleisön.", actions: ["Älä naura sarkasmille", "Kysy: 'Oliko tuo tarpeellista?'"] },
            manager: { title: "Puutu käytökseen", description: "Sarkasmi myrkyttää luottamuksen.", actions: ["Keskustele asenteesta 1-to-1", "Vaadi rakentavaa puhetapaa"] }
        }
    },
    {
        id: "thousand-cuts",
        category: "passive",
        name: "Death by a Thousand Cuts",
        definition: "Jatkuva sarja pienenpieniä mikroaggressioita.",
        phrases: ["(Jatkuva pieni korjailu)", "(Huokailu pyyntöjesi jälkeen)"],
        goal: "Kuluttaa uhrin psyyke hitaasti.",
        strategy: ["Dokumentoi KAIKKI pienetkin asiat.", "Hae ulkopuolista tukea."],
        logExample: "Tänään oli 10 pientä epämiellyttävää kohtaamista.",
        impact: { stress: 85, burnout: 80, selfEsteem: 90 },
        advice: {
            victim: { title: "Määrä on laatua", description: "Yksittäinen asia on pieni, kokonaisuus suuri.", actions: ["Pidä tarkkaa päiväkirjaa", "Älä vähättele omaa kokemustasi"] },
            witness: { title: "Tunnista jatkumo", description: "Huomaatko toistuvan kuvion?", actions: ["Validioi uhrin kokemus", "Huomauta toistuvuudesta"] },
            manager: { title: "Katso kokonaisuutta", description: "Mikroaggressiot ovat vaikeita todistaa.", actions: ["Seuraa tiimin ilmapiiriä", "Puutu toistuvaan negaatioon"] }
        }
    },
    {
        id: "sarcasm_mockery",
        category: "passive",
        name: "Sarkasmi & Pilkka",
        definition: "Aggressiivinen vitsailu hyökkäyksen peitteenä.",
        phrases: ["Meidän nero keksi taas jotain", "Olipa hieno suoritus (ivallinen)"],
        goal: "Nöyryyttää ilman vastapuolen puolustusmahdollisuutta.",
        strategy: ["Kysy suoraan: 'Mikä tässä naurattaa?'.", "Älä naura mukana."],
        logExample: "Lounaalla kaksi tiimiläistä matki puhetapaani ivallisesti.",
        impact: { stress: 75, burnout: 50, selfEsteem: 80 },
        advice: {
            victim: { title: "Pysy vakavana", description: "Pilkka loppuu kun se ei saa yleisöä.", actions: ["Kysy: 'Mitä tarkoitit tuolla?'", "Älä naura mukana edes kohteliaisuudesta"] },
            witness: { title: "Lopeta yleisönä olo", description: "Pilkkaaja tarvitsee naurajia.", actions: ["Pysy vakavana", "Sano: 'Tuo ei ollut kovin hauskaa'"] },
            manager: { title: "Luo kunnioitusta", description: "Huumori ei saa olla lyömistä.", actions: ["Puutu 'vitsailuun' heti", "Määrittele asiallinen palaute"] }
        }
    },
    {
        id: "neglect_indifference",
        category: "passive",
        name: "Välinpitämättömyys",
        definition: "Uhrin tarpeiden ja olemassaolon huomiotta jättäminen.",
        phrases: ["En ehdi nyt (eikä koskaan)", "(Sähköpostit ohitetaan)"],
        goal: "Tehdä uhrista merkityksetön.",
        strategy: ["Pyydä vastauksia kirjalloisesti asettaen määräaika.", "Ilmoita viestintäkatkoksista."],
        logExample: "Esimies ei ole vastannut ohje-pyyntöihini kahteen viikkoon.",
        impact: { stress: 70, burnout: 75, selfEsteem: 85 },
        advice: {
            victim: { title: "Vaadi vastauksia", description: "Sinulla on oikeus työhön tarvittavaan tietoon.", actions: ["Aseta määräajat kysymyksille", "Nosta asia esille virallisesti"] },
            witness: { title: "Tue tiedonkulkua", description: "Varmista ettei kollega jää pimentoon.", actions: ["Laita hänet jakeluun", "Kysy palaverissa hänen mielipidettään"] },
            manager: { title: "Varmista kontakti", description: "Laiminlyönti on hiljaista kiusaamista.", actions: ["Pidä säännölliset 1-to-1", "Vastaa viesteihin ajoissa"] }
        }
    },
    {
        id: "withholding_info",
        category: "passive",
        name: "Tiedon panttaaminen",
        definition: "Kriittisen tiedon tahallinen salaaminen.",
        phrases: ["Ai, eikö kukaan kertonut?", "Palaveri oli jo"],
        goal: "Saada uhri epäonnistumaan ja näyttämään epäpätevältä.",
        strategy: ["Sovi virallisista kanavista.", "Kysy aktiivisesti puuttuvaa tietoa."],
        logExample: "Projekti viivästyi, koska en saanut tietoa muuttuneista toiveista.",
        impact: { stress: 80, burnout: 70, selfEsteem: 60 },
        advice: {
            victim: { title: "Suojaa tuloksesi", description: "Tieto on työkalu.", actions: ["Tee viralliset tietopyynnöt", "Dokumentoi tiedon puutteesta johtuvat viiveet"] },
            witness: { title: "Jaa tietoa openly", description: "Avoimuus estää panttaamisen.", actions: ["Varmista että kaikki ovat jakelussa", "Kysy: 'Onko kaikilla tämä tieto?'"] },
            manager: { title: "Luo avoin kulttuuri", description: "Tiedon panttaaminen on sabotaasia.", actions: ["Käytä yhteisiä alustoja", "Seuraa kuka hallitsee tietoa"] }
        }
    },
    {
        id: "triangulation",
        category: "manipulative",
        name: "Triangulaatio",
        definition: "Ihmisten pelaaminen toisiaan vastaan selän takana.",
        phrases: ["Matti sanoi että sinä...", "Esimies on huolissaan (vaikka ei ole)"],
        goal: "Luoda konflikteja ja epäluottamusta.",
        strategy: ["Varmista asiat suoraan asianosaiselta.", "Älä levitä huhuja."],
        logExample: "Kollega väitti esimiehen olevan tyytymätön, vaikka hän oli tyytyväinen.",
        impact: { stress: 85, burnout: 60, selfEsteem: 75 },
        advice: {
            victim: { title: "Puhu suoraan", description: "Manipulaatio murtuu suoralla puheella.", actions: ["Varmista huhu suoraan kohteelta", "Sano: 'Keskustelen mieluiten hänen kanssaan'"] },
            witness: { title: "Älä mene väliin", description: "Varo 'kirjekyyhkyn' roolia.", actions: ["Kehota osapuolia puhumaan keskenään", "Älä välitä juoruja eteenpäin"] },
            manager: { title: "Vaadi suoruutta", description: "Kolmikulmapeli tuhoaa tiimin.", actions: ["Älä kuuntele 'jonkun puolesta' puhumista", "Vaadi suoraa palautetta"] }
        }
    },
    {
        id: "scapegoating",
        category: "manipulative",
        name: "Syntipukitus",
        definition: "Yhden henkilön syyttäminen kollektiivisista virheistä.",
        phrases: ["Tämä epäonnistui sinun takiasi", "Olet heikoin lenkki"],
        goal: "Siirtää vastuu ja luoda yhteinen vihollinen.",
        strategy: ["Faktapohjainen vastine syytöksiin.", "Osoita työnjako selvästi."],
        logExample: "Minua syytettiin budjettivajeesta, jota en edes hallinnoinut.",
        impact: { stress: 90, burnout: 75, selfEsteem: 85 },
        advice: {
            victim: { title: "Faktat pöytään", description: "Syyllisyys on manipulaatiota, vastuu on faktaa.", actions: ["Esitä todisteet työnjaosta", "Älä ota toisten virheitä kontollesi"] },
            witness: { title: "Oikaise syyttely", description: "Seiso totuuden puolella.", actions: ["Sano: 'Tämä oli yhteinen päätös'", "Muistuta todellisesta työnjaosta"] },
            manager: { title: "Analysoi rakenteet", description: "Yksittäinen syyllinen on harvoin totuus.", actions: ["Tee juurisyyanalyysi", "Varmista ettei ketään uhrata"] }
        }
    },
    {
        id: "concern_trolling",
        category: "manipulative",
        name: "Valesympatia",
        definition: "Kritiikin verhoaminen huolestuneisuuteen.",
        phrases: ["Olen vain huolissani jaksamisestasi (ivalla)", "Ehkä tämä on liian raskasta?"],
        goal: "Murentaa itseluottamus ja saada uhri tuntemaan itsensä heikoksi.",
        strategy: ["Vastaa vain faktaan.", "Kysy konkreettisia perusteita 'huolelle'."],
        logExample: "Kollega huokaili 'huolestuneena' työpisteelläni muiden nähden.",
        impact: { stress: 75, burnout: 60, selfEsteem: 80 },
        advice: {
            victim: { title: "Tunnista myrkyllinen huoli", description: "Aito huoli tarjoaa apua, manipulointi heikentää.", actions: ["Sano: 'Kiitos, pärjään hyvin'", "Kysy: 'Mihin konkreettiseen tämä perustuu?'"] },
            witness: { title: "Havaitse ivallisuus", description: "Pue manipulointi sanoiksi.", actions: ["Sano: 'Hän näyttää suoriutuvan hienosti'", "Varmista uhrilta hänen todellinen vointinsa"] },
            manager: { title: "Seuraa motiiveja", description: "Huoli on usein naamioitu hyökkäys.", actions: ["Tarkista suoritustaso objektiivisesti", "Puutu patronisoivaan puheeseen"] }
        }
    },
    {
        id: "victim_playing",
        category: "manipulative",
        name: "Uhriutuminen",
        definition: "Kiusaaja esittää itsensä uhrina välttääkseen vastuun.",
        phrases: ["Aina minua syytetään!", "Minua kiusataan kun pyydän sinua tekemään työtäsi"],
        goal: "Kääntää huomio pois omasta käytöksestä.",
        strategy: ["Pysy tiukasti faktoissa.", "Älä pyydä anteeksi asioita joita et ole tehnyt."],
        logExample: "Kun huomautin huutamisesta, kollega alkoi itkeä ja väitti minua hyökkääjäksi.",
        impact: { stress: 80, burnout: 55, selfEsteem: 70 },
        advice: {
            victim: { title: "Pysy faktoissa", description: "Tunteet ovat sumuverho käytökselle.", actions: ["Toista alkuperäinen asiasi neutraalisti", "Älä provosoidu draamasta"] },
            witness: { title: "Todista alkuperä", description: "Muistuta mistä tilanne alkoi.", actions: ["Kyse oli tästä teosta, ei tunteesta", "Tue uhrin alkuperäistä havaintoa"] },
            manager: { title: "Erota teko ja tunne", description: "Itku ei pyyhi pois väärää tekoa.", actions: ["Pysy asialinjalla", "Vaadi vastuuta konkreettisesta teosta"] }
        }
    },
    {
        id: "manipulaatio",
        category: "manipulative",
        name: "Emotionaalinen manipulaatio",
        definition: "Tunteiden (syyllisyys, pelko) käyttö hallintaan.",
        phrases: ["Luulin että olemme ystäviä", "Kun olet sairas, muut kärsivät"],
        goal: "Saada uhri kuuliaiseksi syyllisyyden avulla.",
        strategy: ["Tunnista syyllistämisen kehä.", "Pidä ammatilliset rajat."],
        logExample: "Esimies syyllisti sairauslomasta sanoen sen tuhoavan tiimihengen.",
        impact: { stress: 85, burnout: 70, selfEsteem: 80 },
        advice: {
            victim: { title: "Aseta terveet rajat", description: "Et ole vastuussa toisen tunteista.", actions: ["Tunnista 'hyvä päivä / huono päivä' -kuvio", "Älä selittele omia oikeuksiasi"] },
            witness: { title: "Tarjoa perspektiiviä", description: "Auta uhria näkemään syyllistäminen.", actions: ["Muistuta ettei sairastuminen ole valinta", "Tue uhrin oikeutta rajoihin"] },
            manager: { title: "Lopeta peli", description: "Tunneälyä ei saa käyttää väärin.", actions: ["Kouluta ammatillisista rajoista", "Puutu syyllistämiseen heti"] }
        }
    },
    {
        id: "resources_denial",
        category: "structural",
        name: "Resurssien kieltäminen",
        definition: "Työvälineiden tai avun epääminen.",
        phrases: ["Meillä ei ole budjettia tähän (mutta muille on)", "Tee se käsin"],
        goal: "Tehdä työnteosta tuskallista ja hidastaa tuloksia.",
        strategy: ["Tee viralliset pyynnöt kirjallisesti.", "Dokumentoi hukattu aika."],
        logExample: "Kaikki muut saivat uudet lisenssit paitsi minä.",
        impact: { stress: 75, burnout: 80, selfEsteem: 65 },
        advice: {
            victim: { title: "Vaadi työkalut", description: "Työnantajalla on velvollisuus tarjota välineet.", actions: ["Raportoi esteet kirjallisesti", "Osoita resurssipulan kustannus"] },
            witness: { title: "Jaa omiasi", description: "Ole solidaarinen tiimikaveri.", actions: ["Lainaa välineitä jos voit", "Kysy ääneen miksi kollegalla ei ole X:ää"] },
            manager: { title: "Varmista työedellytykset", description: "Resurssien panttaaminen on kiusaamista.", actions: ["Tarkista resurssijaon tasapuolisuus", "Poista työn esteet"] }
        }
    },
    {
        id: "underemployment",
        category: "structural",
        name: "Alityöllistäminen",
        definition: "Työtehtävien muuttaminen selvästi osaamista vastaamattomiksi.",
        phrases: ["Tämä on tärkeintä nyt (hanttihommat)", "Hae tiimille kahvia"],
        goal: "Nöyryyttää ja saada uhri irtisanoutumaan.",
        strategy: ["Pidä listaa tehtävistä vrt. työsopimus.", "Ota puheeksi työnkuva."],
        logExample: "Asiantuntijatehtävistäni siirrettiin tekemään pelkkää skannausta.",
        impact: { stress: 80, burnout: 70, selfEsteem: 90 },
        advice: {
            victim: { title: "Pidä kiinni työnkuvasta", description: "Osaamisesi on arvokasta.", actions: ["Varmista työsopimuksen rajat liitosta", "Pyydä perusteet tehtävien muutokselle"] },
            witness: { title: "Arvosta osaamista", description: "Muistuta kollegan todellisesta kyvystä.", actions: ["Pyydä häneltä asiantuntija-apua", "Huomioi tehtävien epäsuhta julkisesti"] },
            manager: { title: "Hyödynnä potentiaali", description: "Osaamisen haaskaaminen on tappiota.", actions: ["Tee uusi kehityssuunnitelma", "Varmista haastavat tehtävät kaikille"] }
        }
    },
    {
        id: "moving_goalposts",
        category: "structural",
        name: "Maalitolppien siirto",
        definition: "Vaatimusten muuttaminen kesken kaiken.",
        phrases: ["Tarkoitimmekin oikeastaan tätä", "Tämä ei enää riitä"],
        goal: "Varmistaa ettei onnistuminen ole mahdollista.",
        strategy: ["Vaadi tavoitteet kirjallisesti ennen aloitusta.", "Dokumentoi muutokset."],
        logExample: "Raportin valmistuttua esimies sanoi haluavansakin aivan eri asioita.",
        impact: { stress: 90, burnout: 85, selfEsteem: 75 },
        advice: {
            victim: { title: "Naulaa tavoitteet", description: "Selkeys on suojasi.", actions: ["Pyydä kirjallinen hyväksyntä suunnitelmaan", "Huomauta muutoksen vaikutuksesta aikatauluun"] },
            witness: { title: "Todista muutos", description: "Auta muistamaan alkuperäinen sopimus.", actions: ["Sano: 'Kyllä kertaalleen sovimme näin'", "Tue selkeitä raameja"] },
            manager: { title: "Varmista ennakoitavuus", description: "Johtamisen on oltava johdonmukaista.", actions: ["Aseta mitattavat kriteerit", "Pidä kiinni sovituista tavoitteista"] }
        }
    },
    {
        id: "spatial_harassment",
        category: "structural",
        name: "Tilahäirintä",
        definition: "Henkilökohtaisen tilan tunkeileva käyttö tai heikennys.",
        phrases: ["(Pöydän siirto pimeään nurkkaan)", "(Seisominen liian lähellä)"],
        goal: "Saada uhri tuntemaan olonsa turvattomaksi omalla paikallaan.",
        strategy: ["Pyydä selkeästi lisää tilaa.", "Pyydä työsuojelutarkastus."],
        logExample: "Työpisteeni siirrettiin käytävälle, vaikka toimistossa oli vapaata.",
        impact: { stress: 80, burnout: 65, selfEsteem: 75 },
        advice: {
            victim: { title: "Ota tilasi takaisin", description: "Työpiste on turvapaikkasi.", actions: ["Sano: 'Tarvitsen enemmän fyysistä tilaa'", "Pyydä ergonominen ja rauhallinen paikka"] },
            witness: { title: "Huomioi reviiri", description: "Tilan vieminen on vallankäyttöä.", actions: ["Kysy miksi kollega on siirretty", "Anna hänelle tilaa palavereissa"] },
            manager: { title: "Suunnittele asiallisesti", description: "Tila ei saa olla rangaistus.", actions: ["Varmista tasavertaiset työpisteet", "Puutu fyysiseen tunkeiluun"] }
        }
    },
    {
        id: "symbolic_demotion",
        category: "structural",
        name: "Symbolinen alentaminen",
        definition: "Statuksen merkkien poistaminen tai arvovallan murentaminen.",
        phrases: ["Hän on vain tällainen avustaja", "(Nimen poisto listoilta)"],
        goal: "Viestiä muille ettei uhri ole enää tärkeä osa tiimiä.",
        strategy: ["Huomauta puuttuvista tiedoista heti.", "Varmista asemasi HR:stä."],
        logExample: "Nimikkeeni muutettiin sähköpostissa 'interniksi' koko osaston nähden.",
        impact: { stress: 85, burnout: 60, selfEsteem: 90 },
        advice: {
            victim: { title: "Vahvista asemasi", description: "Ole ylpeä tittelistäsi ja työstäsi.", actions: ["Käytä oikeaa titteliäsi rohkeasti", "Kysy perusteet muutoksille kirjallisesti"] },
            witness: { title: "Käytä oikeaa termiä", description: "Älä mene mukaan vähättelyyn.", actions: ["Sano: 'Kuten asiantuntijamme X sanoi'", "Muistuta muiden onnistumisista"] },
            manager: { title: "Arvosta hierarkiaa", description: "Tittelit ja vastuut pitää kunnioittaa.", actions: ["Vahvista kaikkien roolit julkisesti", "Puutu tahalliseen vähättelyyn"] }
        }
    }
];

export const bullyingTactics = tactics;
