"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    MessageSquare, Copy, Check, Mail, Printer, Sparkles,
    AlertCircle, Zap, Shield, CheckCircle2
} from "lucide-react";
import Link from "next/link";

// Conversation scenario types
type ScenarioCategory = 'accommodation' | 'boundary' | 'bullying';
type ScriptStyle = 'direct' | 'diplomatic' | 'written';

interface ConversationScript {
    opening: string;
    main: string;
    reasoning: string;
    closing: string;
    emailSubject?: string;
}

// Pre-written conversation templates
const CONVERSATION_SCRIPTS: Record<ScenarioCategory, Record<string, Record<ScriptStyle, ConversationScript>>> = {
    accommodation: {
        headphones: {
            direct: {
                opening: "Hei, haluaisin puhua hetken työympäristöstäni.",
                main: "Tarvitsen vastamelukuulokkeet keskittyäkseni. Avokonttorin äänitaso häiritsee työskentelyäni merkittävästi.",
                reasoning: "Suomen yhdenvertaisuuslaki velvoittaa työnantajan tekemään kohtuullisia mukautuksia. Tämä ei ole luksus, vaan tasa-arvo.",
                closing: "Voinko saada luvan käyttää niitä?"
            },
            diplomatic: {
                opening: "Kiitos että jaksoit ottaa aikaa tälle keskustelulle.",
                main: "Olen huomannut että pärjään parhaiten työssäni kun pystyn keskittymään syvästi. Avokonttorissa se on haastavaa.",
                reasoning: "Vastamelukuulokkeet auttaisivat minua tekemään parempaa työtä. Myös muut tiimit käyttävät niitä.",
                closing: "Olisiko tämä mahdollista? Voin hankkia itse, tarvitsen vain hyväksynnän."
            },
            written: {
                opening: "Hei [Nimi],",
                main: "Haluaisin keskustella pienestä työympäristön muutoksesta joka parantaisi työtehoa.\n\n**Tilanne:** Avokonttorissa keskittyminen on haastavaa erityisesti pitkissä työjaksoissa.\n\n**Ehdotus:** Haluaisin käyttää vastamelukuulokkeet silloin kun teen keskitystä vaativaa työtä.",
                reasoning: "**Hyödyt:**\n- Parempi työteho\n- Vähemmän virheitä\n- Lyhyemmät työajat (kun keskittyy kerralla)\n\n**Laki:** Yhdenvertaisuuslaki (1325/2014) velvoittaa työnantajan tekemään kohtuullisia mukautuksia.",
                closing: "Voisimmeko sopia tästä?\n\nYstävällisin terveisin,\n[Sinä]",
                emailSubject: "Työympäristön mukautusehdotus"
            }
        },
        remote_work: {
            direct: {
                opening: "Haluaisin keskustella etätyöjärjestelystä.",
                main: "Tarvitsen 2 etätyöpäivää viikossa. Aistiylikuormitus avokonttoris sa rasittaa ja heikentää suorituskykyäni.",
                reasoning: "Etätyö ei vähennä tuottavuutta - päinvastoin. Työlainsäädäntö mahdollistaa tämän digitaalisessa työssä.",
                closing: "Milloin voimme sopia kokeilujaksosta?"
            },
            diplomatic: {
                opening: "Kiitos mahdollisuudesta keskustella työjärjestelyistä.",
                main: "Haluaisin selvittää mahdollisuutta tehdä etätöitä 2 päivänä viikossa. Olen huomannut että ympäristö vaikuttaa paljon työtehooni.",
                reasoning: "Kotoa käsin pystyn työskentelemään pidempiä jaksoja ilman keskeytyksiä. Tämä hyödyttää sekä minua että tiimiä.",
                closing: "Voisimmeko kokeilla tätä esimerkiksi kuukauden ajan ja arvioida tuloksia sen jälkeen?"
            },
            written: {
                opening: "Hei [Nimi],",
                main: "Haluaisin esittää ehdotuksen työjärjestelyistä jotka parantaisivat työtehoani.\n\n**Ehdotus:** 2 etätyöpäivää viikossa (esim. ti + to)\n\n**Tausta:** Avokonttoriympäristö aiheuttaa merkittävää kognitiivista kuormaa, joka vaikuttaa keskittymiseen ja tuottavuuteen.",
                reasoning: "**Hyödyt:**\n- Pidemmât keskittymisjakso t ilman keskeytyksiä\n- Vähemmän sairauspoissaoloja (vähemmän stressiä)\n- Joustavuus molemmille osapuolille\n\n**Kokeilujakso:** Ehdotan 1-2 kuukauden kokeilua jonka jälkeen arvioimme tulokset.",
                closing: "Olisiko tämä mahdollista?\n\nYstävällisin terveisin,\n[Sinä]",
                emailSubject: "Etätyöjärjestelyn selvitys"
            }
        }
    },
    boundary: {
        interruptions: {
            direct: {
                opening: "Hei, haluan puhua asiasta joka haittaa työtäni.",
                main: "Keskeytät minua usein kun olen keskellä tehtävää. Tämä rikkoo keskittymisen ja hidastaa työtäni.",
                reasoning: "Tarvitsen keskeytyksettömiä jaksoja tehdäkseni työni hyvin. Jos on kiireellinen asia, voin vastata Teamsissa.",
                closing: "Voitko jatkossa laittaa viestin sen sijaan että tulet paikanpäälle?"
            },
            diplomatic: {
                opening: "Hei, haluaisin keskustella työrutiineistamme hetken.",
                main: "Olen huomannut että työskentelen parhaiten kun saan keskittyä yhteen asiaan kerrallaan. Keskeytykset vaikeuttavat tätä.",
                reasoning: "Ymmärrän että asiat tuntuvat kiireellisiltä, mutta keskittymisen palauttaminen vie joka kerta 15-20 minuuttia.",
                closing: "Voisimmeko sopia että kiireettömät asiat hoituvat T eamsin kautta? Vastaan niihin kun ehdin."
            },
            written: {
                opening: "Hei [Nimi],",
                main: "Haluaisin sopia kanssasi yhteistyötavoista, jotta molemmat pääsemme parhaaseen työsuoritukseen.\n\n**Huomio:** Kasvokkaiset keskeytykset kesken tehtävän vaikeuttaa työskentelyäni merkittävästi.",
                reasoning: "**Ehdotus:**\n- Kiireettömät asiat → Teams-viesti\n- Kiireelliset asiat → Teams-viesti merkinnällä 'KIIREELLINEN'\n- Akuutit kriisitilanteet → kasvokkain OK\n\nVastaan viesteihin säännöllisesti (esim. joka 2. tunti).",
                closing: "Tämä auttaisi minua palvelemaan sinua paremmin. Toimiiko?\n\nYstävällisin terveisin,\n[Sinä]",
                emailSubject: "Yhteistyötavat ja viestintä"
            }
        },
        personal_space: {
            direct: {
                opening: "Haluan puhua henkilökohtaisesta tilasta.",
                main: "Seisot liian lähellä kun puhut minulle. Tarvitsen vähintään metrin etäisyyden.",
                reasoning: "Tämä on minulle epämukavaa ja häiritsee keskittymistä. En halua olla töykeä, mutta tämä on minulle tärkeää.",
                closing: "Voitko jatkossa pitää hieman etäisyyttä?"
            },
            diplomatic: {
                opening: "Hei, haluaisin puhua pienestä asiasta.",
                main: "Tarvitsen henkilökohtaista tilaa kun keskustelemme - noin metrin etäisyyttä tuntuu minusta mukavalta.",
                reasoning: "Tämä liittyy siihen miten aivoni prosessoivat aistiärsykkeitä. Ei ole sinussa kyse, vaan siitä että pystyn kuuntelemaan paremmin.",
                closing: "Toivon että ymmärrät - haluan kuulla mitä sanot, ja se onnistuu paremmin kun on hieman tilaa."
            },
            written: {
                opening: "Hei [Nimi],",
                main: "Haluaisin sopia henkilökohtaisesta tilasta keskustelussamme.\n\n**Pyyntö:** Noin metrin etäisyys tuntuu minulle mukavalta keskustellessa.",
                reasoning: "Tämä liittyy aist iherkkyyteen - lähietäisyys tekee keskittymisestä vaikeampaa. Tämä ei ole henkilökohtaista vaan neurologista.\n\n**Tavoite:** Haluan kuulla sinua paremmin, ja se onnistuu kun on tilaa prosessoida.",
                closing: "Kiitos ymmärryksestä!\n\nYstävällisin terveisin,\n[Sinä]",
                emailSubject: "Henkilökohtainen tila"
            }
        }
    },
    bullying: {
        document_first: {
            direct: {
                opening: "Haluan puhua työilmapiiristä.",
                main: "Käytöksesi minua kohtaan on ollut epäasiallista. Kommentit [esimerkit] eivät ole hyväksyttäviä.",
                reasoning: "Olen dokumentoinut nämä tapaukset. Työturvallisuuslaki kieltää henkisen väkivallan työpaikalla.",
                closing: "Odotan että tämä loppuu välittömästi. Jos jatkuu, otan asian esimiehen käsittelyyn."
            },
            diplomatic: {
                opening: "Haluaisin keskustella yhteistyöstämme.",
                main: "Olen havainnut että  joissakin tilanteissa viestintämme on ollut haastavaa. Esimerkiksi [tilanne] tuntui minusta epämiellyttävältä.",
                reasoning: "Haluan että työskentely sujuu ammattimaisesti molempien osalta. Uskon että voimme tehdä tämän paremmin yhdessä.",
                closing: "Voisimmeko sopia ammattimaisista yhteistyötavoista jatkossa?"
            },
            written: {
                opening: "Hei [Nimi],",
                main: "Haluaisin keskustella yhteistyöstämme ja viestintätavoista.\n\n**Havainnot:** Olen huomannut tiettyjä viestintätilanteita jotka ovat tuntunut epäammattimaisilta:\n- [Päivämäärä]: [Tilanne]\n- [Päivämäärä]: [Tilanne]",
                reasoning: "**Tavoite:** Ammattimainen ja kunnioittava yhteistyö.\n\n**Pyyntö:** Jatkossa toivon että viestintämme on asiallista ja työhön keskittyvää.",
                closing: "Uskon että voimme tehdä tämän yhdessä paremmin.\n\nYstävällisin terveisin,\n[Sinä]",
                emailSubject: "Yhteistyön kehittäminen"
            }
        },
        escalate_manager: {
            direct: {
                opening: "Hei, tarvitsen apuasi vakavassa asiassa.",
                main: "[Henkilö] on kohdellut minua epäasiallisesti useita kertoja. Viimeisin tapaus oli [päivä]: [kuvaus].",
                reasoning: "Olen yrittänyt puhua asiasta suoraan hänen kanssaan, mutta käytös jatkuu. Minulla on dokumentaatio tapauksista.",
                closing: "Pyydän että puutut tähän tilanteeseen. Voinko lähettää sinulle dokumentaation?"
            },
            diplomatic: {
                opening: "Kiitos että otit aikaa. Haluaisin keskustella haastavasta tilanteesta.",
                main: "Yhteistyö [henkilön] kanssa on ollut haastavaa. On tapahtunut tilanteita jotka ovat tuntuneet epäammattimaisilta.",
                reasoning: "Olen yrittänyt ratkaista tämän suoraan, mutta tilanne ei ole parantunut. Haluaisin apuasi tilanteen selvittämiseen.",
                closing: "Voisimmeko keskustella tästä tarkemmin? Minulla on dokumentoituja esimerkkejä."
            },
            written: {
                opening: "Hei [Esimiehen nimi],",
                main: "Haluan tuoda tietoon työilmapiiriin liittyvän huolen.\n\n**Tilanne:** Yhteistyö [henkilön] kanssa on ollut haastavaa useiden epäammattimaisten tilanteiden vuoksi.\n\n**Esimerkit:**\n- [Päivämäärä]: [Kuvaus]\n- [Päivämäärä]: [Kuvaus]",
                reasoning: "**Aiemmat toimet:** Olen yrittänyt käsitellä tämän suoraan henkilön kanssa, mutta tilanne jatkuu.\n\n**Vaikutus:** Tämä vaikuttaa työtehooni ja hyvinvointiin.",
                closing: "Pyydän apuasi tilanteen selvittämiseen. Voinko lähettää yksityiskohtaisemman raportin?\n\nYstävällisin terveisin,\n[Sinä]",
                emailSubject: "Pyyntö keskustelusta - työilmapiiri"
            }
        }
    }
};

const SCENARIO_META = {
    accommodation: {
        headphones: {
            title: "Vastamelukuulokkeet",
            description: "Pyydä oikeutta käyttää kuulokkeita keskittyä vaativassa työssä"
        },
        remote_work: {
            title: "Etätyö 2pv/viikko",
            description: "Ehdota osa-aikaista etätyötä aistikuormituksen vähentämiseksi"
        }
    },
    boundary: {
        interruptions: {
            title: "Keskeyttämisen lopetus",
            description: "Pyydä työrauha ja sovi viestintäkanavista"
        },
        personal_space: {
            title: "Henkilökohtainen tila",
            description: "Pyydä riittävä etäisyys keskusteluissa"
        }
    },
    bullying: {
        document_first: {
            title: "Suora konfrontaatio",
            description: "Puhu suoraan henkilön kanssa (kun on turvallista)"
        },
        escalate_manager: {
            title: "Eskalointi esimiehelle",
            description: "Pyydä esimiehen apua tilanteen selvittämiseen"
        }
    }
};

export default function PreGamePrepPage() {
    const { t, loadNamespace } = useLanguage();
    const { completeModule, isModuleCompleted } = useProgress();

    const [selectedCategory, setSelectedCategory] = useState<ScenarioCategory>('accommodation');
    const [selectedScenario, setSelectedScenario] = useState<string>('headphones');
    const [selectedStyle, setSelectedStyle] = useState<ScriptStyle>('diplomatic');
    const [practiceChecks, setPracticeChecks] = useState([false, false, false]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        loadNamespace('neuromoninaisuus');
    }, [loadNamespace]);

    const currentScript = CONVERSATION_SCRIPTS[selectedCategory][selectedScenario][selectedStyle];
    const allPracticeChecked = practiceChecks.every(Boolean);

    const handlePracticeCheck = (index: number) => {
        const updated = [...practiceChecks];
        updated[index] = !updated[index];
        setPracticeChecks(updated);

        if (updated.every(Boolean) && !isModuleCompleted('neuro_prep_practiced')) {
            completeModule('neuro_prep_practiced'); // +30 points
        }
    };

    const handleGenerateScript = () => {
        if (!isModuleCompleted('neuro_prep_first')) {
            completeModule('neuro_prep_first'); // +20 points
        }
    };

    const copyToClipboard = () => {
        const fullText = selectedStyle === 'written'
            ? `${currentScript.emailSubject ? `Aihe: ${currentScript.emailSubject}\n\n` : ''}${currentScript.opening}\n\n${currentScript.main}\n\n${currentScript.reasoning}\n\n${currentScript.closing}`
            : `${currentScript.opening}\n\n${currentScript.main}\n\n${currentScript.reasoning}\n\n${currentScript.closing}`;

        navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        if (!isModuleCompleted('neuro_prep_copied')) {
            completeModule('neuro_prep_copied'); // +50 points
        }
    };

    const openEmailDraft = () => {
        const subject = currentScript.emailSubject || 'Keskustelupyyntö';
        const body = `${currentScript.opening}\n\n${currentScript.main}\n\n${currentScript.reasoning}\n\n${currentScript.closing}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const printScript = () => {
        const fullText = `${currentScript.opening}\n\n${currentScript.main}\n\n${currentScript.reasoning}\n\n${currentScript.closing}`;
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
        <html>
          <head>
            <title>Keskustelumuistilippu</title>
            <style>
              body { font-family: serif; padding: 40px; line-height: 1.6; }
              h2 { color: #5B4B8A; }
              p { margin-bottom: 16px; white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <h2>Keskustelumuistilippu</h2>
            <p>${fullText.replace(/\n/g, '<br>')}</p>
          </body>
        </html>
      `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    <Link href="/neuromoninaisuus" className="inline-block">
                        <span className="text-sm text-[#5B4B8A] hover:underline">← Neuromoninaisuus</span>
                    </Link>

                    <div className="space-y-2">
                        <span className="text-[11px] font-mono text-blue-700 uppercase tracking-widest border-b border-blue-600 pb-1 inline-block">
                            Valmistaudu keskusteluun
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B]">
                            💬 Pre-Game Prep
                        </h1>
                        <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                            Harjoittele vaikeat keskustelut ennen oikeaa tilannetta
                        </p>
                    </div>
                </div>

                {/* Why Card */}
                <Alert className="bg-blue-50 border-2 border-blue-200">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <AlertTitle className="text-blue-900">Miksi harjoitella?</AlertTitle>
                    <AlertDescription className="text-blue-800 space-y-2">
                        <p>
                            Dokumentointi on passiivista. <strong>Kiusaamisen pysäyttäminen vaatii aktiivista vuorovaikutusta</strong> -
                            ja se on monelle nepsylle pelottavaa.
                        </p>
                        <p className="font-semibold">
                            Pre-Game Prep antaa sinulle valmiit sanat. Harjoittele turvallisesti ennen oikeaa tilaisuutta.
                        </p>
                    </AlertDescription>
                </Alert>

                {/* Step 1: Category */}
                <Card className="bg-white border-[#E8DDD0] shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#5B4B8A] text-white rounded-full flex items-center justify-center text-sm">1</span>
                            Valitse tilanne
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                            <button
                                onClick={() => { setSelectedCategory('accommodation'); setSelectedScenario('headphones'); setPracticeChecks([false, false, false]); }}
                                className={`p-4 rounded-lg border-2 transition-all ${selectedCategory === 'accommodation'
                                    ? 'border-[#5B4B8A] bg-purple-50'
                                    : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <Shield className="w-8 h-8 mx-auto mb-2 text-[#5B4B8A]" />
                                <h3 className="font-bold text-sm">Mukautusten pyytäminen</h3>
                                <p className="text-xs text-slate-600 mt-1">Kuulokkeet, etätyö, kirjalliset ohjeet</p>
                            </button>

                            <button
                                onClick={() => { setSelectedCategory('boundary'); setSelectedScenario('interruptions'); setPracticeChecks([false, false, false]); }}
                                className={`p-4 rounded-lg border-2 transition-all ${selectedCategory === 'boundary'
                                    ? 'border-[#5B4B8A] bg-purple-50'
                                    : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-[#5B4B8A]" />
                                <h3 className="font-bold text-sm">Rajojen asettaminen</h3>
                                <p className="text-xs text-slate-600 mt-1">Keskeytykset, henkilökohtainen tila</p>
                            </button>

                            <button
                                onClick={() => { setSelectedCategory('bullying'); setSelectedScenario('document_first'); setPracticeChecks([false, false, false]); }}
                                className={`p-4 rounded-lg border-2 transition-all ${selectedCategory === 'bullying'
                                    ? 'border-[#5B4B8A] bg-purple-50'
                                    : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <Zap className="w-8 h-8 mx-auto mb-2 text-[#5B4B8A]" />
                                <h3 className="font-bold text-sm">Kiusaamisen puheeksiotto</h3>
                                <p className="text-xs text-slate-600 mt-1">Suora, esimiehen kautta, HR</p>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Step 2: Scenario */}
                <Card className="bg-white border-[#E8DDD0] shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#5B4B8A] text-white rounded-full flex items-center justify-center text-sm">2</span>
                            Valitse skenaario
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                            {Object.keys(SCENARIO_META[selectedCategory]).map(key => (
                                <button
                                    key={key}
                                    onClick={() => { setSelectedScenario(key); setPracticeChecks([false, false, false]); }}
                                    className={`p-4 rounded-lg border-2 text-left transition-all ${selectedScenario === key
                                        ? 'border-[#5B4B8A] bg-purple-50'
                                        : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <h3 className="font-bold text-sm">{(SCENARIO_META[selectedCategory] as Record<string, { title: string; description: string; }>)[key].title}</h3>
                                    <p className="text-xs text-slate-600 mt-1">{(SCENARIO_META[selectedCategory] as Record<string, { title: string; description: string; }>)[key].description}</p>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Step 3: Style */}
                <Card className="bg-white border-[#E8DDD0] shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#5B4B8A] text-white rounded-full flex items-center justify-center text-sm">3</span>
                            Valitse tyyli
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                            <button
                                onClick={() => { setSelectedStyle('direct'); setPracticeChecks([false, false, false]); }}
                                className={`p-4 rounded-lg border-2 transition-all ${selectedStyle === 'direct'
                                    ? 'border-rose-500 bg-rose-50'
                                    : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <h3 className="font-bold">Suora</h3>
                                <p className="text-xs text-slate-600 mt-1">"Tarvitsen vastamelukuulokkeet."</p>
                                <Badge className="mt-2 bg-rose-100 text-rose-800">Nopea, selkeä</Badge>
                            </button>

                            <button
                                onClick={() => { setSelectedStyle('diplomatic'); setPracticeChecks([false, false, false]); }}
                                className={`p-4 rounded-lg border-2 transition-all ${selectedStyle === 'diplomatic'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <h3 className="font-bold">Diplomaattinen</h3>
                                <p className="text-xs text-slate-600 mt-1">"Huomasin että pärjään paremmin kun..."</p>
                                <Badge className="mt-2 bg-blue-100 text-blue-800">Pehmempi, selittävä</Badge>
                            </button>

                            <button
                                onClick={() => { setSelectedStyle('written'); setPracticeChecks([false, false, false]); }}
                                className={`p-4 rounded-lg border-2 transition-all ${selectedStyle === 'written'
                                    ? 'border-emerald-500 bg-emerald-50'
                                    : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <h3 className="font-bold">Kirjallinen</h3>
                                <p className="text-xs text-slate-600 mt-1">Sähköpostimalli</p>
                                <Badge className="mt-2 bg-emerald-100 text-emerald-800">Ei kasvokkain</Badge>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Generated Script */}
                <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-[#5B4B8A] shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#5B4B8A]" />
                                Sinun keskustelurepliikkisi
                            </span>
                            <Button onClick={handleGenerateScript} size="sm" variant="outline">
                                <Sparkles className="w-4 h-4 mr-1" />
                                Uudista
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {selectedStyle === 'written' && currentScript.emailSubject && (
                            <div className="p-3 bg-white rounded-lg">
                                <Badge className="mb-2">Sähköpostin aihe:</Badge>
                                <p className="font-semibold">{currentScript.emailSubject}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="p-4 bg-white rounded-lg">
                                <h3 className="font-bold text-[#5B4B8A] mb-2">Aloitus:</h3>
                                <p className="leading-relaxed whitespace-pre-wrap">{currentScript.opening}</p>
                            </div>

                            <div className="p-4 bg-white rounded-lg">
                                <h3 className="font-bold text-[#5B4B8A] mb-2">Pääviesti:</h3>
                                <p className="leading-relaxed whitespace-pre-wrap">{currentScript.main}</p>
                            </div>

                            <div className="p-4 bg-white rounded-lg">
                                <h3 className="font-bold text-[#5B4B8A] mb-2">Perustelu:</h3>
                                <p className="leading-relaxed whitespace-pre-wrap">{currentScript.reasoning}</p>
                            </div>

                            <div className="p-4 bg-white rounded-lg">
                                <h3 className="font-bold text-[#5B4B8A] mb-2">Lopetus:</h3>
                                <p className="leading-relaxed whitespace-pre-wrap">{currentScript.closing}</p>
                            </div>
                        </div>

                        {/* Practice Mode */}
                        <div className="p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
                            <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                Harjoittele ääneen
                            </h3>
                            <p className="text-sm text-amber-800 mb-4">
                                Lue tämä kolme kertaa ääneen ennen oikeaa keskustelua. RSD-aivot tarvitsevat harjoittelua.
                            </p>

                            <div className="space-y-2">
                                {[1, 2, 3].map((num, idx) => (
                                    <label key={num} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-amber-100 rounded">
                                        <Checkbox
                                            checked={practiceChecks[idx]}
                                            onCheckedChange={() => handlePracticeCheck(idx)}
                                        />
                                        <span className="text-sm font-medium">{num}. kerta luettu</span>
                                    </label>
                                ))}
                            </div>

                            {allPracticeChecked && (
                                <Alert className="mt-4 bg-emerald-50 border-emerald-200">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                    <AlertDescription className="text-sm text-emerald-800">
                                        <strong>Hyvä!</strong> Olet valmis. Muista: tämä on lähtökohta, et käsikirjoitus. Voit muokata tarvittaessa.
                                        <span className="block mt-1 font-bold">+30 pistettä</span>
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>

                        {/* Export Buttons */}
                        <div className="grid md:grid-cols-3 gap-3">
                            <Button onClick={copyToClipboard} className="w-full" variant="outline">
                                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                {copied ? 'Kopioitu!' : 'Kopioi'}
                            </Button>

                            {selectedStyle === 'written' && (
                                <Button onClick={openEmailDraft} className="w-full bg-blue-600 hover:bg-blue-700">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Avaa sähköpostissa
                                </Button>
                            )}

                            <Button onClick={printScript} className="w-full" variant="outline">
                                <Printer className="w-4 h-4 mr-2" />
                                Tulosta muistilappu
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
