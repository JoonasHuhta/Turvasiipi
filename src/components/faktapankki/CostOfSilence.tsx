"use client";

import { CheckCircle2, BookOpen, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/ProgressContext";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function CostOfSilence() {
    const { completeModule, isModuleCompleted } = useProgress();
    const isCompleted = isModuleCompleted('cost_of_silence_info');

    const handleComplete = () => {
        completeModule('cost_of_silence_info');
    };

    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg space-y-24">
            {/* Introduction */}
            <section className="space-y-8 max-w-2xl">
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                    Työpaikka on kuin talo, jonka rakenteet koostuvat luottamuksesta, osaamisesta ja vuorovaikutuksesta. Kun talossa on hyvä olla, se kantaa asujansa vaikeidenkin aikojen yli.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                    Joskus kuitenkin rakenteisiin pääsee hiipimään jotakin sellaista, joka murentaa niitä hiljaa mutta varmasti. Työpaikkakiusaaminen ei ole vain inhimillinen ongelma. Se on <strong className="text-[#2B2B2B]">taloudellinen, terveydellinen ja sosiaalinen kustannus</strong>, joka kasautuu hiljaa mutta määrätietoisesti.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                    Usein näemme vain pintakerroksen: yksittäisen sairauspoissaolon tai työyhteisön ristiriidan. Todellinen hinta syntyy ketjuvaikutuksista, jotka ulottuvat vuosien päähän.
                </p>
            </section>

            {/* Economic Costs */}
            <section className="space-y-12 border-t border-[#E8DDD0] pt-16">
                <h2 className="text-2xl font-bold text-[#2B2B2B]">
                    Taloudelliset kustannukset – näkyvät ja näkymättömät
                </h2>

                <p className="text-base text-[#4A4A4A] leading-relaxed max-w-2xl">
                    Työpaikkakiusaaminen maksaa organisaatiolle rahaa monella tasolla:
                </p>

                <div className="space-y-8 max-w-2xl">
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">Sairauspoissaolot</h3>
                        <div className="flex items-baseline gap-3">
                            <div className="text-3xl font-bold text-[#2B2B2B]">350 €</div>
                            <p className="text-sm text-[#4A4A4A]">/ sairauspoissaolopäivä</p>
                        </div>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            Pitkittyneet poissaolot moninkertaistavat summan nopeasti.
                        </p>
                        <p className="text-[10px] text-[#4A4A4A]/60 uppercase tracking-wider font-mono pt-1">
                            Lähde: Työterveyslaitos (2024)
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">Läsnäoleva poissaolo (presenteeism)</h3>
                        <div className="flex items-baseline gap-3">
                            <div className="text-3xl font-bold text-[#2B2B2B]">15–40 %</div>
                            <p className="text-sm text-[#4A4A4A]">työtehosta katoaa</p>
                        </div>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            Työntekijä on paikalla, mutta työkyky on heikentynyt stressin ja pelon vuoksi.
                        </p>
                        <p className="text-[10px] text-[#4A4A4A]/60 uppercase tracking-wider font-mono pt-1">
                            Lähde: HBR / Workplace Bullying Institute
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">Henkilöstön vaihtuvuus</h3>
                        <div className="flex items-baseline gap-3">
                            <div className="text-3xl font-bold text-[#2B2B2B]">6–18 kk</div>
                            <p className="text-sm text-[#4A4A4A]">palkkakustannus / menetetty asiantuntija</p>
                        </div>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            Kiusaaminen lisää irtisanoutumisia. Osaavien työntekijöiden lähtö tarkoittaa rekrytointi-, perehdytys- ja tuottavuuskustannuksia sekä hiljaisen tiedon menetystä.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">Esihenkilö- ja HR-työ</h3>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            Konfliktien selvittely vie aikaa, joka on pois kehittämisestä, johtamisesta ja perustehtävästä. Tätä kustannusta ei usein lasketa – mutta se on todellinen.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">Virheet ja laadun heikkeneminen</h3>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            Erityisesti asiakas-, hoito- ja opetustyössä stressi lisää virheiden, reklamaatioiden ja turvallisuusriskien määrää.
                        </p>
                    </div>
                </div>

                <p className="text-base text-[#2B2B2B] leading-relaxed max-w-2xl pt-4">
                    Taloudellinen hinta ei synny yhdestä tapahtumasta, vaan pitkittyneestä kuormituksesta ja reaktiivisesta toiminnasta.
                </p>
            </section>

            {/* Health Costs */}
            <section className="space-y-12 border-t border-[#E8DDD0] pt-16">
                <h2 className="text-2xl font-bold text-[#2B2B2B]">
                    Terveydelliset kustannukset – yksilöstä kansanterveyteen
                </h2>

                <p className="text-base text-[#4A4A4A] leading-relaxed max-w-2xl">
                    Kiusaamisen vaikutukset eivät pääty työpäivään eivätkä edes työsuhteeseen.
                </p>

                <div className="space-y-8 max-w-2xl">
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">Mielenterveyden ongelmat</h3>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            Työpaikkakiusaaminen lisää masennuksen, ahdistuneisuuden, unihäiriöiden ja stressiperäisten oireiden riskiä. Oireet voivat jatkua <strong className="text-[#2B2B2B]">vuosia</strong>, vaikka tilanne olisi jo päättynyt.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">Fyysiset terveysvaikutukset</h3>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            Pitkittynyt stressi heikentää vastustuskykyä ja lisää sydän- ja verisuonitautien, tuki- ja liikuntaelinoireiden sekä vatsavaivojen riskiä.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">Työkyvyn pysyvä heikkeneminen</h3>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            Osa kiusatuista ei palaa entiseen työhönsä. Jotkut vaihtavat alaa, osa päätyy ennenaikaiselle työkyvyttömyyseläkkeelle.
                        </p>
                    </div>
                </div>

                <p className="text-base text-[#2B2B2B] leading-relaxed max-w-2xl pt-4">
                    Tämä tekee kiusaamisesta yksilöllisen tragedian lisäksi yhteiskunnallisen kustannuksen.
                </p>
            </section>

            {/* Social Costs */}
            <section className="space-y-12 border-t border-[#E8DDD0] pt-16">
                <h2 className="text-2xl font-bold text-[#2B2B2B]">
                    Sosiaaliset kustannukset – kallein ja vaikeimmin mitattava
                </h2>

                <p className="text-base text-[#4A4A4A] leading-relaxed max-w-2xl">
                    Sosiaaliset kustannukset ovat usein näkymättömiä, mutta pitkäkestoisimpia.
                </p>

                <div className="space-y-8 max-w-2xl">
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">Luottamuksen rapautuminen</h3>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            Kun epäasialliseen kohteluun ei puututa, luottamus johtoon ja organisaatioon heikkenee.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">Työyhteisön sosiaalinen pääoma murenee</h3>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            Yhteistyö vähenee, ihmiset varovat puhumasta ja keskittyvät selviytymiseen kehittämisen sijaan.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">Kulttuurin normalisoituminen</h3>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            Jos kiusaamista siedetään, siitä tulee "tapa toimia". Uudet työntekijät oppivat mallin nopeasti.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">Vaikutukset perheisiin</h3>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            Työpaikan kuormitus kulkeutuu kotiin: parisuhteisiin, vanhemmuuteen ja lasten hyvinvointiin. Tämä on kerrannaisvaikutus, jota ei voi rajata työpaikan seinien sisälle.
                        </p>
                    </div>
                </div>
            </section>

            {/* Reflection */}
            <section className="space-y-8 border-t border-[#E8DDD0] pt-16">
                <h2 className="text-2xl font-bold text-[#2B2B2B]">
                    Peiliin katsomisen hetki – lempeästi mutta rehellisesti
                </h2>

                <div className="space-y-6 max-w-2xl">
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        Nollatoleranssi on sana, jota käytetään monissa strategioissa. Se on kaunis tavoite, mutta se vaatii toteutuakseen jotain enemmän kuin vain papereita.
                    </p>
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        Johtamisessa ja esihenkilötyössä puuttumattomuus on usein inhimillistä – se on pelkoa konfliktista tai ajanpuutetta. Mutta jokainen kerta, kun katsomme ohi epäasiallisen kommentin tai jätämme puuttumatta ulkopuolelle jättämiseen, hyväksymme pienen palan sitä taloudellista ja inhimillistä laskua, joka lopulta lankeaa maksettavaksi.
                    </p>
                    <p className="text-lg text-[#2B2B2B] leading-relaxed">
                        Puuttuminen ei vaadi sankaritekoja. Se vaatii pysähtymistä, kuulemista ja rohkeutta sanoa ääneen, että meillä jokaisella on oikeus tulla töihin pelkäämättä.
                    </p>
                </div>
            </section>

            {/* Positive Closing */}
            <section className="space-y-8 border-t border-[#E8DDD0] pt-16 pb-16">
                <h2 className="text-2xl font-bold text-[#2B2B2B]">
                    Mitä tapahtuu, kun puututaan ajoissa?
                </h2>

                <div className="space-y-6 max-w-2xl">
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        Tutkimusten mukaan organisaatiot, joissa kiusaamiseen puututaan varhain ja johdonmukaisesti:
                    </p>

                    <ul className="space-y-3 text-base text-[#4A4A4A]">
                        <li className="flex items-start gap-3">
                            <span className="text-[#5B4B8A] mt-1">•</span>
                            <span>vähentävät sairauspoissaoloja</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#5B4B8A] mt-1">•</span>
                            <span>pienentävät vaihtuvuutta</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#5B4B8A] mt-1">•</span>
                            <span>parantavat työtyytyväisyyttä ja tuloksellisuutta</span>
                        </li>
                    </ul>

                    <div className="bg-[#FDFBF7] border-l-4 border-[#5B4B8A] p-6 mt-8">
                        <p className="text-lg text-[#2B2B2B] leading-relaxed font-medium">
                            Turvallinen työpaikka ei ole pehmeä arvo. Se on yksi kannattavimmista investoinneista, jonka organisaatio voi tehdä.
                        </p>
                    </div>

                    <p className="text-base text-[#4A4A4A] leading-relaxed italic pt-4">
                        Puuttuminen maksaa vähemmän kuin hiljaisuus.
                    </p>
                </div>
            </section>

            {/* COMPLETION SECTION */}
            <div className="border-t border-slate-200 pt-8 pb-20">
                <Card className={cn(
                    "transition-all duration-500 rounded-3xl overflow-hidden border-2",
                    isCompleted
                        ? "bg-emerald-50 border-emerald-100 shadow-sm"
                        : "bg-white border-indigo-100 shadow-xl"
                )}>
                    <CardContent className="p-8 md:p-12 text-center space-y-6">
                        <div className={cn(
                            "w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 transition-all duration-500",
                            isCompleted ? "bg-emerald-500 text-white rotate-12" : "bg-indigo-50 text-indigo-600"
                        )}>
                            {isCompleted ? <CheckCircle2 className="w-10 h-10" /> : <BookOpen className="w-10 h-10" />}
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                                {isCompleted ? "Tieto on valtaa!" : "Oletko lukenut kaiken?"}
                            </h3>
                            <p className="text-slate-600 max-w-sm mx-auto font-medium">
                                {isCompleted
                                    ? "Olet suorittanut teoriaosuuden. Pisteet on lisätty profiiliisi."
                                    : "Kuittaa teoriaosuus luetuksi kerätäksesi pisteitä ja edistääksesi asiantuntijuuttasi."}
                            </p>
                        </div>

                        {!isCompleted ? (
                            <Button
                                onClick={handleComplete}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest px-10 py-6 rounded-2xl shadow-lg hover:shadow-indigo-500/25 transition-all"
                            >
                                Merkitse luetuksi (+100 pts)
                            </Button>
                        ) : (
                            <div className="flex justify-center gap-4">
                                <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-bold px-8 py-6 rounded-2xl cursor-default">
                                    Suoritettu
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
