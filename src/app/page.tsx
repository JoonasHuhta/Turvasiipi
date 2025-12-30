import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, ShieldCheck, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12 py-10">
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-primary uppercase leading-tight">
          Työpaikkakiusaaminen<br />
          <span className="text-slate-900">Ei ole sinun vikasi</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
          Turvasiipi on tukenasi kiusaamisen tunnistamisessa ja dokumentoinnissa. Tee anonyymi arvio tilanteestasi ja ota ensimmäinen askel kohti parempaa työelämää.
        </p>

        <div className="pt-4 flex flex-col items-center gap-4">
          <Link href="/quiz">
            <Button className="w-full md:w-auto h-14 px-8 text-lg gap-2 shadow-lg hover:scale-105 transition-transform" size="lg">
              Aloita ilmainen kysely – 2 min <ShieldCheck className="w-5 h-5 ml-1" /> 💙
            </Button>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm font-medium text-muted-foreground mt-6 text-left max-w-lg mx-auto">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600 shrink-0" /> Täysin luottamuksellinen
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600 shrink-0" /> Työlainsäädännön mukainen
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600 shrink-0" /> Matala kynnys aloittaa
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600 shrink-0" /> Kehitetty parantamaan työelämää
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white/80 border border-slate-200 rounded-2xl p-8 max-w-2xl mx-auto shadow-sm">
        <h3 className="text-lg font-bold tracking-wider text-slate-800 mb-6 border-b pb-2 uppercase text-center">
          Työpaikkakiusaaminen Suomessa
        </h3>

        <ul className="space-y-4 mb-8 text-left">
          <li className="flex items-start gap-3 text-slate-700">
            <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span>
              <strong>120,000 ihmistä</strong> kokee kiusaamista juuri nyt
              <span className="block text-sm text-slate-500 mt-0.5">(5-10% kaikista palkansaajista)</span>
            </span>
          </li>
          <li className="flex items-start gap-3 text-slate-700">
            <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span><strong>Joka neljäs</strong> on kokenut kiusaamista urallaan</span>
          </li>
          <li className="flex items-start gap-3 text-slate-700">
            <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span>
              Keskimäärin kiusaaminen kestää <strong>1-3 VUOTTA</strong>
              <span className="block text-sm text-slate-500 mt-0.5">ennen kuin uhri hakee apua</span>
            </span>
          </li>
          <li className="flex items-start gap-3 text-slate-700">
            <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span>
              <strong>65% tapauksista</strong> kiusaaja on esimies
              <span className="block text-sm text-slate-500 mt-1 pl-1 border-l-2 border-slate-200">
                • Ei kyse "henkilökemioista"<br />
                • Kyse on vallasta ja rakenteista
              </span>
            </span>
          </li>
          <li className="flex items-start gap-3 text-slate-700">
            <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span>
              <strong>90% uhreista</strong> kärsii ahdistuksesta, masennuksesta tai burnoutista
            </span>
          </li>
        </ul>

        <div className="space-y-4 bg-slate-50 p-6 rounded-xl text-center border border-slate-100">
          <p className="text-slate-800 font-medium leading-relaxed">
            <span className="font-bold text-red-600 uppercase tracking-wide text-sm block mb-1">Ongelma:</span>
            Uhrit eivät tunnista tilannetta ajoissa.
          </p>
          <p className="text-primary font-bold text-lg leading-relaxed">
            <span className="font-bold text-primary uppercase tracking-wide text-sm block mb-1">Ratkaisu:</span>
            Turvasiipi auttaa sinua toimimaan ennen kuin on liian myöhäistä.
          </p>
        </div>
      </section>


      <section className="space-y-8 py-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8 uppercase tracking-tight">
          Miten Suojasiipi auttaa?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 1. Dokumentointi */}
          <Card className="bg-white hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <span className="text-2xl">📝</span>
                Dokumentointiväline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>Kirjaa tapahtumat turvallisesti (kryptattu)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>Automaattinen aikaleima jokaiselle merkinnälle</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>Liitä todisteet: sähköpostit, viestit, kuvat</span>
                </li>
              </ul>
              <div className="pt-2 bg-blue-50 p-3 rounded-lg mt-4">
                <p className="font-medium text-blue-900 text-sm flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" />
                  Kun tarvitset apua, sinulla ON todisteet
                </p>
              </div>
              <Link href="/timeline" className="block pt-2">
                <Button variant="outline" className="w-full">
                  Siirry päiväkirjaan
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 2. Ymmärrys */}
          <Card className="bg-white hover:shadow-lg transition-shadow border-t-4 border-t-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <span className="text-2xl">🧠</span>
                Ymmärrys ja validointi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                  <span>Onko tämä kiusaamista? (Tunnistuskysely)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                  <span>Miksi tämä tapahtuu? (Rakenteet, ei sinä)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                  <span>Mitä teen seuraavaksi? (Toimintasuunnitelmat)</span>
                </li>
              </ul>
              <div className="pt-2 bg-purple-50 p-3 rounded-lg mt-4">
                <p className="font-medium text-purple-900 text-sm flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" />
                  Et ole sekaisin. Tämä ON todellista.
                </p>
              </div>
              <Link href="/quiz" className="block pt-2">
                <Button variant="outline" className="w-full">
                  Tee testi
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 3. Yhteisö */}
          <Card className="bg-white hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <span className="text-2xl">💙</span>
                Yhteisö ja toipuminen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Turvallinen vertaisryhmä (moderoitu 24/7)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Psykologiset ensiapu-harjoitukset</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Yhteys ammattilaisiin (juristit, terapeutit)</span>
                </li>
              </ul>
              <div className="pt-2 bg-green-50 p-3 rounded-lg mt-4">
                <p className="font-medium text-green-900 text-sm flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" />
                  Et ole yksin tämän kanssa.
                </p>
              </div>
              <Link href="/yhteiso" className="block pt-2">
                <Button variant="outline" className="w-full">
                  Liity yhteisöön
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-8 space-y-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8 uppercase tracking-tight">
          Näin Suojasiipi toimii – 5 askelta
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Step 1 */}
          <div className="flex gap-4 md:gap-6 items-start bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-primary/20 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl font-bold text-primary">
              1
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                Tee kysely <span className="text-sm font-normal text-muted-foreground bg-slate-100 px-2 py-0.5 rounded-full">2 min</span>
              </h3>
              <p className="text-slate-600">Tunnista, onko kyseessä kiusaaminen.</p>
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 pt-1">
                <ArrowRight className="w-4 h-4" /> Saat validoinnin: &quot;Kyllä, tämä ON kiusaamista&quot;
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 md:gap-6 items-start bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-primary/20 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl font-bold text-primary">
              2
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                Kirjaa tapahtumia <span className="text-sm font-normal text-muted-foreground bg-slate-100 px-2 py-0.5 rounded-full">5 min/päivä</span>
              </h3>
              <p className="text-slate-600">Kirjoita muutama lause siitä, mitä tapahtui.</p>
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 pt-1">
                <ArrowRight className="w-4 h-4" /> Sovellus luo automaattisen aikajanan
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 md:gap-6 items-start bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-primary/20 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl font-bold text-primary">
              3
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                Luo raportti <span className="text-sm font-normal text-muted-foreground bg-slate-100 px-2 py-0.5 rounded-full">1 klikkaus</span>
              </h3>
              <p className="text-slate-600">AI muuttaa tekstisi viralliseksi dokumentiksi.</p>
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 pt-1">
                <ArrowRight className="w-4 h-4" /> Lataa PDF ja lähetä liittoon/työnantajalle
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4 md:gap-6 items-start bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-primary/20 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl font-bold text-primary">
              4
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900">Seuraa suunnitelmaa</h3>
              <p className="text-slate-600">Valitse tilanteesi → saat step-by-step ohjeet.</p>
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 pt-1">
                <ArrowRight className="w-4 h-4" /> &quot;Tee tämä tänään, tämä huomenna...&quot;
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-4 md:gap-6 items-start bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-primary/20 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl font-bold text-primary">
              5
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900">Et ole yksin</h3>
              <p className="text-slate-600">Lue muiden tarinoita, jaa omasi.</p>
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 pt-1">
                <ArrowRight className="w-4 h-4" /> Häpeä häviää. Toipuminen alkaa.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 rounded-2xl p-8 text-center space-y-4">
        <h3 className="text-2xl font-semibold">Tietosi ovat turvassa</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Turvasiipi ei tallenna tietojasi pilveen. Kaikki merkinnät säilytetään vain omalla laitteellasi (selaimen muistissa).
          Jos tyhjennät selaimen historian, tiedot poistuvat.
        </p>
      </section>
    </div>
  );
}
