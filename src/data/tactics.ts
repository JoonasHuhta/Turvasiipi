export type TacticCategory = 'verbal' | 'social' | 'passive' | 'power';

export type RoleAdvice = {
    title: string;
    description: string;
    actions: string[];
};

export type Tactic = {
    id: string;
    category: TacticCategory;
    name: string;
    definition: string;
    phrases: string[];
    goal: string;
    strategy: string[];
    logExample: string;
    impact: {
        stress: number;
        burnout: number;
        selfEsteem: number;
    };
    neuroImpact?: {
        overload?: number;
        confusion?: number;
    };
    advice: {
        victim: RoleAdvice;
        witness: RoleAdvice;
        manager: RoleAdvice;
    };
};

export const bullyingTactics: Tactic[] = [
    {
        id: "mitatointi",
        category: "verbal",
        name: "Mitätöinti & Vähättely",
        definition: "Osaamisesi, ehdotustesi ja saavutustesi jatkuva vähättely ja kyseenalaistaminen.",
        phrases: [
            "Tuo on turha ehdotus",
            "Etkö todella tiedä tätä?",
            "Kuka tahansa olisi tehnyt tuon",
            "Miksi teet tästä numeron?"
        ],
        goal: "Murentaa itseluottamuksesi ja ammatillinen uskottavuutesi.",
        strategy: [
            "Dokumentoi positiivinen palaute muualta.",
            "Älä odota kiusaajalta tunnustusta.",
            "Vahvista osaamisesi ulkopuolisten kanssa."
        ],
        logExample: "Esimies sanoi 'turha ehdotus' palaverissa 12.12. Todistajat: 5 henkilöä.",
        impact: { stress: 65, burnout: 50, selfEsteem: 80 },
        advice: {
            victim: {
                title: "Uhri: Suojaa ammatillinen arvo",
                description: "Älä anna yhden henkilön mielipiteen muuttua totuudeksi.",
                actions: ["Kerää positiivinen palaute talteen", "Pyydä kirjalliset perustelut kritiikille", "Vahvista osaamisesi muiden verkostojen kautta"]
            },
            witness: {
                title: "Todistaja: Anna vasta-argumentti",
                description: "Voit tukea uhria validoimalla hänen osaamisensa julkisesti.",
                actions: ["Sano ääneen: 'Mielestäni tuo oli hyvä pointti'", "Keskustele uhrin kanssa kahden kesken", "Älä naura mukana vähättelylle"]
            },
            manager: {
                title: "Esimies: Puutu kulttuuriin",
                description: "Vähättely myrkyttää innovaatiokyvyn.",
                actions: ["Luo pelisäännöt ideoinnille", "Puutu heti 'vitsailuun'", "Varmista tasapuolinen palaute"]
            }
        }
    },
    {
        id: "eristaminen",
        category: "social",
        name: "Eristäminen & Ulossulkeminen",
        definition: "Tahallinen jättäminen sosiaalisen ja ammatillisen vuorovaikutuksen ulkopuolelle.",
        phrases: [
            "Unohdin kertoa sinulle tuon",
            "Tämä ei kuulu sinulle",
            "(Hiljaisuus saapuessasi paikalle)",
            "Palaveri oli jo eilen"
        ],
        goal: "Tehdä sinusta näkymätön ja katkaista tukiverkostosi.",
        strategy: [
            "Rakenna verkostoja muihin tiimeihin.",
            "Dokumentoi poissaolot palavereista.",
            "Kysy kirjallisesti, miksi tieto ei kulkenut."
        ],
        logExample: "Koko tiimi meni lounaalle ilman minua 3. päivä peräkkäin (10-12.12).",
        impact: { stress: 75, burnout: 60, selfEsteem: 85 },
        advice: {
            victim: {
                title: "Uhri: Riko hiljaisuus",
                description: "Eristäminen toimii vain, jos pysyt passiivisena.",
                actions: ["Kysy suoraan: 'Huomasin ettei minua kutsuttu, miksi?'", "Ota kontakti suoraan muihin", "Dokumentoi tiedonkulun puutteet"]
            },
            witness: {
                title: "Todistaja: Ole inklusiivinen",
                description: "Pieni ele voi olla pelastusrengas.",
                actions: ["Kutsu eristetty mukaan kahville", "Lisää hänet sähköpostiketjuun", "Kysy 'Mitä sinulle kuuluu?'"]
            },
            manager: {
                title: "Esimies: Seuraa dynamiikkaa",
                description: "Ulossulkeminen on ryhmäilmiö.",
                actions: ["Käytä arvottuja pareja projekteissa", "Varmista tiedonjako virallisesti", "Puutu klikkeihin"]
            }
        }
    },
    {
        id: "ostrakismi",
        category: "social",
        name: "Ostrakismi (Ulossulkeminen)",
        definition: "Järjestelmällinen huomiotta jättäminen ja 'kylmä olka'. Uhri sivuutetaan ikään kuin häntä ei olisi olemassa.",
        phrases: [
            "(Tervehdykseen ei vastata)",
            "(Puhe keskeytyy kun tulet huoneeseen)",
            "(Keskustelu käydään ohitse)",
            "(Vastaamattomat viestit)"
        ],
        goal: "Murentaa yhteenkuuluvuuden tunne hitaasti.",
        strategy: [
            "Tunnista toistuvuus.",
            "Pue sanoiksi havaittavat teot.",
            "Hae tukea inkluusion varmistamiseksi."
        ],
        logExample: "Huomasin 'hiljaisen konsensuksen': kolme kollegaa lopetti tervehtimisen samaan aikaan.",
        impact: { stress: 85, burnout: 70, selfEsteem: 95 },
        advice: {
            victim: {
                title: "Uhri: Validoi olemassaolosi",
                description: "Ostrakismi on 'sosiaalinen kuolema', joka tuntuu fyysisenä kipuna.",
                actions: ["Tee havainnot näkyviksi esimiehelle", "Älä syytä itseäsi, kyse on ryhmän käytöksestä", "Hae vertaistukea tilanteen ulkopuolelta"]
            },
            witness: {
                title: "Todistaja: Riko klikki",
                description: "Ole se, joka tervehtii ja katsoo silmiin.",
                actions: ["Tervehdi selkeästi nimellä", "Ota puheeksi toisen ohittaminen lennosta", "Osoita huomiota muun tiimin nähden"]
            },
            manager: {
                title: "Esimies: Nollatoleranssi jäädyttämiselle",
                description: "Ostrakismi on vaikeimmin havaittava kiusaamisen muoto.",
                actions: ["Kysy 1-to-1 keskusteluissa sosiaalisesta inkluusiosta", "Luo vahvat yhteiset pelisäännöt", "Intervenoi heti havaitessasi jäädyttämistä"]
            }
        }
    },
    {
        id: "gaslighting",
        category: "verbal",
        name: "Gaslighting",
        definition: "Psykologinen manipulaatio, joka saa sinut epäilemään omia havaintojasi ja muistiasi.",
        phrases: [
            "En ole koskaan sanonut tuota",
            "Olet liian herkkä",
            "Se oli vitsi",
            "Kuvittelet vain asioita"
        ],
        goal: "Saada sinut epäilemään mielenterveyttäsi ja hiljentää sinut.",
        strategy: [
            "Kirjaa asiat ylös heti.",
            "Käytä sähköpostia vahvistuksena.",
            "Älä jää väittelemään muistikuvista."
        ],
        logExample: "15.12 sovittiin X. 18.12 esimies väitti, ettei sellaista ole koskaan sovittu.",
        impact: { stress: 90, burnout: 75, selfEsteem: 90 },
        neuroImpact: { confusion: 80, overload: 60 },
        advice: {
            victim: {
                title: "Uhri: Luota aisteihisi",
                description: "Gaslighting pyrkii murentamaan todellisuudentajusi.",
                actions: ["Käytä 'Vahvista sähköpostilla' -taktiikkaa", "Pidä rinnallasi neutraali havainnoija", "Luota muistioihisi ennemmin kuin kiusaajan sanaan"]
            },
            witness: {
                title: "Todistaja: Tarjoa objektiviisuutta",
                description: "Auta uhria maadoittumaan faktoihin.",
                actions: ["Vahvista: 'Minäkin muistan sen noin'", "Älä anna manipuloijan muuttaa menneisyyttä", "Kirjaa omat muistiinpanosi ylös"]
            },
            manager: {
                title: "Esimies: Selkeys on lääke",
                description: "Varmista, että prosessit ja sopimukset ovat läpinäkyviä.",
                actions: ["Vaadi tärkeistä asioista kirjalliset muistiot", "Seuraa onko jonkun muisti 'aina väärässä' toisen mukaan", "Vahvista oikeudenmukainen kulttuuri"]
            }
        }
    },
    {
        id: "passiivi-aggressio",
        category: "passive",
        name: "Passiivi-aggressiivisuus",
        definition: "Piilotettua vihamielisyyttä, jota on vaikea osoittaa suoraan kiusaamiseksi.",
        phrases: [
            "Ehkä ensi kerralla onnistut paremmin",
            "Olen vain rehellinen",
            "(Huokailu puheenvuorosi aikana)",
            "(Silmien pyörittely)"
        ],
        goal: "Satuttaa ilman vastuuta käytöksestään.",
        strategy: [
            "Kysy suoraan tarkoitusta.",
            "Pysy viileän asiallisena.",
            "Dokumentoi sanat ja eleet."
        ],
        logExample: "Esimies pyöritteli silmiään projektiesitykseni aikana. Pvm X.",
        impact: { stress: 60, burnout: 45, selfEsteem: 65 },
        advice: {
            victim: {
                title: "Uhri: Kysy selvennystä",
                description: "Älä jätä passiivista viestiä arvailun varaan.",
                actions: ["Kysy: 'Huokaisit tuossa, oliko sinulla jotain lisättävää?'", "Pidä tunteet erillään, keskity sanoihin", "Älä lähde mukaan peliin"]
            },
            witness: {
                title: "Todistaja: Tee näkyväksi",
                description: "Älä sivuuta epämukavuutta.",
                actions: ["Sano: 'Huomasin silmien pyörittelyn, eikö se ole epäkunnioittavaa?'", "Tue avointa kommunikaatiota", "Älä hyväksy huonoa käytöstä hiljaa"]
            },
            manager: {
                title: "Esimies: Rakenna suoruutta",
                description: "Passiivi-aggressio kertoo kyvyttömyydestä kohdata konflikteja.",
                actions: ["Opeta suoran palautteen antamista", "Puutu epäkohteliaisiin eleisiin", "Luo psykologisesti turvallinen tila"]
            }
        }
    },
    {
        id: "kohtuuttomuus",
        category: "power",
        name: "Kohtuuttomat vaatimukset",
        definition: "Mahdottomien tavoitteiden tai epäinhimillisen työkuorman asettaminen.",
        phrases: [
            "Tämä pitää olla valmis huomenna",
            "Kyllä muutkin pystyvät tähän",
            "Miksi kesto tuntuu pitkältä?"
        ],
        goal: "Aiheuttaa uupumus tai 'todistaa' epäpätevyytesi.",
        strategy: [
            "Pyydä priorisointi kirjallisesti.",
            "Pidä kirjaa työajasta.",
            "Ilmoita ylikuormituksesta sähköpostilla."
        ],
        logExample: "Sain 40h työn perjantaina klo 16, palautus maanantaina klo 8.",
        impact: { stress: 95, burnout: 90, selfEsteem: 50 },
        neuroImpact: { overload: 100 },
        advice: {
            victim: {
                title: "Uhri: Priorisoi faktat",
                description: "Kukaan ei ole yli-ihminen.",
                actions: ["Tee lista tehtävistä ja niiden vaatimasta ajasta", "Ilmoita kirjallisesti: 'Työmäärä on kohtuuton'", "Pidä kiinni työajoista"]
            },
            witness: {
                title: "Todistaja: Jaa huoli",
                description: "Uupumusoireisiin on puututtava ajoissa.",
                actions: ["Huomauta työmäärästä yleisesti", "Tarjoa apua jos mahdollista", "Ilmoita esimiehen esimiehelle jos havaitset uupumusta"]
            },
            manager: {
                title: "Esimies: Seuraa kuormitusta",
                description: "Sinun velvollisuutesi on huolehtia työturvallisuudesta.",
                actions: ["Tarkista tehtäväjako säännöllisesti", "Kysy 'Miten jaksat?'", "Älä vertaa ihmisiä epäreilusti toisiinsa"]
            }
        }
    },
    {
        id: "epaoikeudenmukaisuus",
        category: "power",
        name: "Epäoikeudenmukaisuus",
        definition: "Sääntöjen ja palkkioiden soveltaminen eri tavalla eri ihmisiin.",
        phrases: [
            "A saa etätyötä, sinä et",
            "Hyvä projekti A! (Vaikka sinä teit työn)",
            "Sinun virheesi on vakava (A:n sama virhe ok)"
        ],
        goal: "Viestittää, ettet ole tasavertainen muiden kanssa.",
        strategy: [
            "Vertaa tilannettasi ohjeisiin.",
            "Dokumentoi poikkeamat.",
            "Kysy kirjallisesti perustelut."
        ],
        logExample: "Kollega sai kiitoksen tiimipalaverissa projektista, jonka tein yksin.",
        impact: { stress: 70, burnout: 55, selfEsteem: 75 },
        advice: {
            victim: {
                title: "Uhri: Vaadi tasapuolisuutta",
                description: "Oikeudenmukaisuus on perusoikeus.",
                actions: ["Pyydä perustelut päätöksille", "Vertaile ohjeistuksiin", "Ota puheeksi 1-to-1 keskustelussa"]
            },
            witness: {
                title: "Todistaja: Anna tunnustus",
                description: "Palauta kunnia oikealle tekijälle.",
                actions: ["Sano: 'Hienoa työtä X, sinähän tämän teit'", "Kysy tasapuolisuudesta tiimitapaamisessa", "Tue kollegaasi julkisesti"]
            },
            manager: {
                title: "Esimies: Ole läpinäkyvä",
                description: "Sääntöjen on oltava samat kaikille.",
                actions: ["Luo selkeät kriteerit palkkioille ja eduille", "Tunnusta todellinen työ", "Perustele päätökset avoimesti"]
            }
        }
    },
    {
        id: "sabotaasi",
        category: "power",
        name: "Sabotaasi",
        definition: "Työn tekemisen estäminen tai vaikeuttaminen tahallisesti.",
        phrases: [
            "(Tietoa annetaan väärin)",
            "En saanut viestiäsi",
            "Projekti siirrettiin toiselle",
            "(Työvälineitä ei toimiteta)"
        ],
        goal: "Saada sinut näyttämään epäpätevältä.",
        strategy: [
            "Kopioi tärkeät viestit.",
            "Varmista ohjeet kirjallisesti.",
            "Ilmoita esteistä välittömästi."
        ],
        logExample: "Tärkeää Excel-pohjaa ei toimitettu, vaikka pyysin sitä 5 kertaa.",
        impact: { stress: 80, burnout: 65, selfEsteem: 60 },
        advice: {
            victim: {
                title: "Uhri: Varmista todisteet",
                description: "Sabotaasi on usein vaikea todistaa ilman dokumentointia.",
                actions: ["Käytä sähköpostia kaikessa tärkeässä", "Ota kuvakaappaukset virhetilanteista", "Raportoi esteet heti kun ne ilmenevät"]
            },
            witness: {
                title: "Todistaja: Tarjoa apua",
                description: "Ole se, joka jakaa tiedon.",
                actions: ["Jaa puuttuva tieto kollegalle", "Ilmoita jos huomaat tahallista viivyttelyä", "Tue totuutta päätöksenteossa"]
            },
            manager: {
                title: "Esimies: Hallitse resursseja",
                description: "Varmista, että kaikilla on mahdollista onnistua.",
                actions: ["Seuraa tiedonkulun pullonkauloja", "Tarkista miksi projektit viivästyvät", "Puutu tiedon panttaamiseen"]
            }
        }
    },
    {
        id: "mobbing",
        category: "social",
        name: "Mobbing (Ryhmäkiusaaminen)",
        definition: "Koko ryhmän tai usean henkilön kohdistama painostus yhtä henkilöä kohtaan.",
        phrases: [
            "Kaikkien mielestä olet vaikea",
            "Kukaan ei halua sinua tähän projektiin",
            "(Yhteinen nauru heti kun poistut tilaasta)",
            "(Yhteiset 'sisäpiirin' sopimukset sinua vastaan)"
        ],
        goal: "Poistaa uhri ryhmästä sosiaalisen paineen avulla.",
        strategy: [
            "Etsi liittolaisia ryhmän ulkopuolelta.",
            "Dokumentoi ketkä osallistuvat aktiivisesti.",
            "Ota yhteyttä HR:ään: ryhmäilmiö vaatii ulkopuolista puuttumista."
        ],
        logExample: "Koko seitsemän hengen tiimi allekirjoitti 'valituksen' minusta keskustelematta kanssani kertaakaan.",
        impact: { stress: 100, burnout: 85, selfEsteem: 100 },
        advice: {
            victim: {
                title: "Uhri: Hae ulkopuolista apua",
                description: "Ryhmää vastaan on lähes mahdotonta taistella yksin.",
                actions: ["Ota välitön yhteys työsuojeluun", "Älä yritä miellyttää ryhmää", "Hae trauma-apua aikaisin"]
            },
            witness: {
                title: "Todistaja: Ole jäänmurtaja",
                description: "Yksikin soraääni voi purkaa ryhmäpaineen.",
                actions: ["Kysy: 'Miksi me teemme näin?'", "Älä osallistu yhteisiin haukkumishetkiin", "Ilmoita tilanteesta nimettömästi johdolle"]
            },
            manager: {
                title: "Esimies: Hajota myrkyllinen dynamiikka",
                description: "Mobbing on vakavin hälytysmerkki johtamisongelmasta.",
                actions: ["Keskustele jäsenten kanssa yksityisesti", "Uudelleenjärjestele tiimi tarvittaessa", "Ota käyttöön ulkopuolinen sovittelu"]
            }
        }
    },
    {
        id: "micromanagement",
        category: "power",
        name: "Mikrosäätö & Kyttäys",
        definition: "Liiallinen vahtiminen ja työn yksityiskohtiin puuttuminen ilman todellista tarvetta.",
        phrases: [
            "Laita minut CC:ksi jokaiseen sähköpostiin",
            "Miksi käytit tätä fonttia?",
            "Kuinka monta minuuttia käytit tähän tehtävään?",
            "Avaa näyttösi niin katson mitä teet"
        ],
        goal: "Viedä ammatillinen autonomia ja aiheuttaa epävarmuutta.",
        strategy: [
            "Tarjoa raportteja proaktiivisesti.",
            "Kysy tarvittavasta autonomian asteesta.",
            "Dokumentoi vaikutus tehokkuuteen."
        ],
        logExample: "Esimies vaati kuitin jokaisesta vessakäynnistä ja seurasi teams-tilaa minuutin tarkkuudella.",
        impact: { stress: 70, burnout: 60, selfEsteem: 40 },
        neuroImpact: { overload: 85 },
        advice: {
            victim: {
                title: "Uhri: Rakenna luottamusta faktoilla",
                description: "Kyttäys kertoo usein esimiehen omasta pelosta.",
                actions: ["Sovi selkeät tarkistuspisteet", "Kysy: 'Mitä voin tehdä, jotta luottaisit työhöni enemmän?'", "Pidä kirjaa suorituksista"]
            },
            witness: {
                title: "Todistaja: Tue autonomiaa",
                description: "Normaalista poikkeavaan valvontaan on puututtava.",
                actions: ["Vahvista kollegan osaaminen", "Kysy esimieheltä yhteisistä linjoista", "Älä raportoi muiden tekemisistä turhaan"]
            },
            manager: {
                title: "Esimies: Luota ja deleguoi",
                description: "Mikrosäätö on varma tapa tappaa motivaatio.",
                actions: ["Keskity lopputulokseen, älä prosessiin", "Opettele delegointia", "Kysy palautetta omasta johtamistyylistäsi"]
            }
        }
    },
    {
        id: "credit_stealing",
        category: "power",
        name: "Kunnian varastaminen",
        definition: "Toisen tekemän työn tai ideoiden esittäminen omina.",
        phrases: [
            "Kuten sanoin aiemmin... (toistaen ideasi)",
            "Minä sain tämän valmiiksi",
            "(Jättää nimesi pois loppuraportista)",
            "Tiimini teki tämän (vaikka teit yksin)"
        ],
        goal: "Edistää omaa uraa toisen kustannuksella ja murentaa uhrin näkyvyys.",
        strategy: [
            "Merkitse nimesi jokaiseen dokumenttiin.",
            "Jaa ideoita luotettaville tahoille etukäteen.",
            "Sano ääneen: 'Hienoa että jatkoit ideaani, josta puhuin aiemmin'."
        ],
        logExample: "Esittelin idean 1-to-1 keskustelussa, seuraavalla viikolla se esiteltiin esimiehen omana keksintönä koko osastolle.",
        impact: { stress: 55, burnout: 40, selfEsteem: 70 },
        advice: {
            victim: {
                title: "Uhri: Ole näkyvä",
                description: "Työsi on sinun pääomasi.",
                actions: ["Lisää nimesi tiedostojen otsikoihin ja metatietoihin", "Puhu työn alla olevista asioista laajemmalle piirille", "Korjaa väärinkäsitykset asiallisesti heti"]
            },
            witness: {
                title: "Todistaja: Palauta kunnia",
                description: "Tue totuutta julkisesti.",
                actions: ["Sano: 'X mainitsi tämän jo viime viikolla'", "Kysy: 'Miten X:n osuus tässä huomioidaan?'", "Älä anna väärän tiedon vakiintua"]
            },
            manager: {
                title: "Esimies: Tunnista tekijät",
                description: "Hienot tulokset vaativat todellisten tekijöiden arvostusta.",
                actions: ["Pyydä erittely työnjaosta", "Kehu yksilöitä heidän panoksestaan", "Luo kulttuuri, jossa ideoita arvostetaan"]
            }
        }
    },
    {
        id: "unjustified_warnings",
        category: "power",
        name: "Perusteettomat varoitukset",
        definition: "Virallisten varoitusten tai huomautusten käyttö pelottelukeinona ilman todellista syytä.",
        phrases: [
            "Tämä on nyt virallinen huomautus",
            "Nimesi on mustalla listalla",
            "Varoituksia tulee, jos asenne ei muutu",
            "En voi taata työsi jatkuvuutta tästä lähtien"
        ],
        goal: "Luoda oikeudellinen peruste irtisanomiselle tai hiljentää uhri.",
        strategy: [
            "Vastaa jokaiseen varoitukseen kirjallisesti ja vaadi perusteet.",
            "Ota välittömästi yhteys liittoon.",
            "Älä allekirjoita mitään, minkä kanssa olet eri mieltä ilman tarkennusta."
        ],
        logExample: "Sain varoituksen 'myöhästymisestä', vaikka olin paikalla 5min etuajassa. Todisteena kulunvalvonta.",
        impact: { stress: 100, burnout: 80, selfEsteem: 60 },
        advice: {
            victim: {
                title: "Uhri: Suojaa oikeusturvasi",
                description: "Tämä on suora hyökkäys toimeentuloasi vastaan.",
                actions: ["Dokumentoi jokainen perusteeton väite", "Ota juristiin tai liittoon yhteys HETI", "Pysy työsopimuksen rajoissa tarkasti"]
            },
            witness: {
                title: "Todistaja: Todista faktat",
                description: "Voit olla ratkaiseva todistaja.",
                actions: ["Kirjaa ylös omat havaintosi tapahtumista", "Jos todistat perusteetonta syyttelyä, sano se ääneen", "Tarjoa moraalista tukea"]
            },
            manager: {
                title: "Esimies (ja työnantaja): Käytä kurinpitotoimia vastuullisesti",
                description: "Väärinkäytetyt varoitukset ovat laitonta häirintää.",
                actions: ["Varmista, että perusteet ovat objektiivisia", "Noudata lakia ja työehtosopimuksia", "Käytä varoitusta viimeisenä keinona"]
            }
        }
    },
    {
        id: "cyberbullying",
        category: "verbal",
        name: "Nettikiusaaminen (Chat/Email)",
        definition: "Häirintä, joka tapahtuu digitaalisissa kanavissa, usein työajan ulkopuolella.",
        phrases: [
            "(Jatkuvat viestit vapaa-ajalla)",
            "(Mitätöintiä yhteisissä chat-kanavissa)",
            "(Epäasialliset meemit tai 'vitsit' ryhmässä)",
            "(Tahallinen ulossulkeminen kanavista)"
        ],
        goal: "Tehdä kotiympäristöstä ja vapaa-ajasta turvaton ja lisätä julkista nöyryytystä.",
        strategy: [
            "Ota kuvakaappaukset kaikesta.",
            "Älä vastaa provokaatioon.",
            "Aseta tekniset rajat (sulje sovellukset vapaalla)."
        ],
        logExample: "Slack-kanavalla levitettiin muokattua kuvaa minusta, jolle kaikki muut nauraivat emojeilla.",
        impact: { stress: 80, burnout: 70, selfEsteem: 85 },
        neuroImpact: { overload: 90 },
        advice: {
            victim: {
                title: "Uhri: Tallenna ja irtaudu",
                description: "Digitaalinen kiusaaminen jättää onneksi jäljen.",
                actions: ["Ota kuvakaappaukset HETI", "Laita ilmoitukset pois työajan jälkeen", "Ilmoita häirinnästä kanavan ylläpitäjälle tai IT:lle"]
            },
            witness: {
                title: "Todistaja: Raportoi ja tue",
                description: "Digitaalisessa maailmassa vaikeneminen on hyväksyntää.",
                actions: ["Älä reagoi epäasiallisiin viesteihin nauruemojeilla", "Sano chatissa: 'Tämä ei ole asiallista'", "Kuvakaappaa tilanne jos epäilet uhrin olevan poissa"]
            },
            manager: {
                title: "Esimies: Hallitse digitaalista ympäristöä",
                description: "Digitaalinen häirintä on työnantajan vastuulla.",
                actions: ["Luo etäviestinnän pelisäännöt", "Puutu heti chateissa tapahtuvaan vitsailuun", "Varmista ettei työviestintä valu vapaa-ajalle"]
            }
        }
    }
];
