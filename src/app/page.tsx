import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HomePage() {
  return (
    <div className="px-6 sm:px-8 max-w-screen-md mx-auto space-y-32 pb-32 pt-20">
      {/* HERO */}
      <header className="space-y-12">
        <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-[#2B2B2B]">
          Kai tämä on normaalia työelämää. <br />
          <span className="text-[#4A4A4A] font-normal italic">Vai onko?</span>
        </h1>

        <div className="space-y-8 max-w-2xl">
          <h2 className="text-2xl font-serif text-[#4A4A4A] leading-relaxed">
            Jos alat epäillä omaa havainnointikykyäsi ja muistojasi, se on merkki siitä, että jotain on todella vialla.
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-[#4A4A4A] leading-relaxed">
              Turvasiipi auttaa sinua näkemään mitä tapahtuu – ennen kuin alat kyseenalaistaa itseäsi.
            </p>
            <p className="text-lg text-[#4A4A4A] leading-relaxed">
              Sinun ei tarvitse olla varma. <br />
              Eikä vielä valmis tekemään mitään.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-4 items-start sm:items-center">
            <Link
              href="/lukutaito-testi"
              className="px-8 py-4 bg-[#2B2B2B] text-white hover:bg-[#5B4B8A] transition-colors rounded-sm font-medium tracking-wide flex items-center gap-3 shadow-lg shadow-black/5"
            >
              Tutki tilannettasi <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="px-6 py-4 text-[#5B4B8A] hover:bg-[#5B4B8A]/5 rounded-sm font-medium transition-colors"
            >
              Lue ensin miten tämä toimii
            </Link>
          </div>

          <div className="text-[11px] font-mono text-[#4A4A4A] uppercase tracking-wider space-y-1 border-l-2 border-[#E8DDD0] pl-4">
            <p>Useimmat aloittavat vain lukemalla.</p>
            <p>Voit lopettaa milloin tahansa.</p>
          </div>
        </div>
      </header>

      {/* SCROLL 1 - WHY EXISTS */}
      <section className="space-y-12 border-t border-[#E8DDD0] pt-24">
        <span className="text-xs font-bold uppercase tracking-widest text-[#5B4B8A]">Miksi tämä on niin vaikeaa?</span>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-8 space-y-8">
            <p className="text-xl leading-relaxed text-[#2B2B2B]">
              Työpaikkakiusaaminen ei yleensä ala selvästi. Se alkaa epämääräisenä tunteena, jota on vaikea selittää toisille – ja lopulta myös itselle.
            </p>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-[#E8DDD0] space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#4A4A4A]">Usein käy näin:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-lg text-[#4A4A4A]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8DDD0]" />
                  <span>Tapahtumat jäävät kirjaamatta</span>
                </li>
                <li className="flex items-start gap-4 text-lg text-[#4A4A4A]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8DDD0]" />
                  <span>Muistikuvat hämärtyvät ajan myötä</span>
                </li>
                <li className="flex items-start gap-4 text-lg text-[#4A4A4A]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8DDD0]" />
                  <span>Alat epäillä: "Olenko minä ongelma?"</span>
                </li>
                <li className="flex items-start gap-4 text-lg text-[#4A4A4A]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8DDD0]" />
                  <span className="italic">Myöhemmin joku kysyy: "Miksi et sanonut aiemmin?"</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pl-8 border-l-4 border-[#5B4B8A]/20">
              <p className="text-lg font-medium text-[#2B2B2B]">Turvasiipi on olemassa tätä hetkeä varten.</p>
              <p className="text-lg text-[#4A4A4A]">Sitä ennen kuin tiedät, mitä ajattelet.</p>
              <p className="text-lg text-[#4A4A4A]">Sitä ennen kuin tiedät, mitä teet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* IS THIS BULLYING? */}
      <section className="space-y-12 border-t border-[#E8DDD0] pt-24">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] leading-tight max-w-2xl">
          "Onko tämä kiusaamista vai vain huonoa johtamista?"
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6 text-lg leading-relaxed text-[#4A4A4A]">
            <p>Ehkä se ei ole kiusaamista.</p>
            <p>Ehkä se on vain konfliktia.</p>
            <p>Ehkä muut eivät koe tätä ongelmana.</p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-[#4A4A4A]">
            <p className="font-medium text-[#2B2B2B]">Turvasiipi auttaa sinua nimeämään kokemuksesi ilman dramatisointia tai vähättelyä.</p>
            <p>Et saa diagnoosia etkä tuomiota.</p>
            <p>Saat jäsennyksen.</p>
            <div className="pt-4 p-6 bg-white border border-[#E8DDD0] rounded-sm">
              <p className="italic text-[#5B4B8A]">Tarkoitus ei ole vakuuttaa ketään. Vaan nähdä itse, mitä on tapahtunut.</p>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <button className="text-[#5B4B8A] font-bold text-lg hover:underline decoration-2 underline-offset-4 flex items-center gap-2">
            Tunnista merkkejä rauhassa <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* PRIVATE LOG */}
      <section className="space-y-12 border-t border-[#E8DDD0] pt-24 bg-white -mx-8 px-8 py-24 shadow-sm border-b">
        <div className="max-w-screen-md mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#2B2B2B]">Kirjoita ylös ennen kuin alat unohtaa.</h2>
            <p className="text-xl text-[#4A4A4A] leading-relaxed">
              Muisti ei ole puolueeton. Se muuttuu ajan, stressin ja selittelyn mukana.
            </p>
          </div>

          <div className="bg-[#FDFBF7] p-8 border border-[#E8DDD0] rounded-sm relative">
            <span className="absolute top-4 right-4 text-xs font-mono text-[#5B4B8A] uppercase tracking-wider border border-[#5B4B8A]/20 px-2 py-1 rounded-sm">Yksityinen loki</span>
            <div className="space-y-6">
              <p className="text-lg text-[#2B2B2B]">Turvasiipi tarjoaa henkilökohtaisen lokin, johon voit kirjata tapahtumat silloin kun ne ovat vielä tuoreita:</p>
              <ul className="grid sm:grid-cols-2 gap-4">
                {['Mitä tapahtui', 'Milloin (päivämäärä, kellonaika)', 'Ketkä olivat paikalla', 'Miltä se tuntui'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#4A4A4A]">
                    <div className="w-4 h-4 border border-[#E8DDD0] bg-white flex items-center justify-center">
                      <div className="w-2 h-2 text-[#5B4B8A]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 text-[13px] text-[#4A4A4A] font-mono leading-relaxed border-t border-[#E8DDD0] pt-8">
            <p>Vain sinä hallitset tietoja.</p>
            <p>Merkintöjä ei voi muokata jälkikäteen.</p>
            <p>Kaikki data tallennetaan vain sinun laitteellesi.</p>
            <p className="font-bold text-[#2B2B2B]">Tämä ei ole kertomus. Tämä on muistia varten.</p>
          </div>

          <button className="bg-[#5B4B8A] text-white px-8 py-4 rounded-sm font-medium tracking-wide hover:bg-[#4A3A7A] transition-colors shadow-md">
            Aloita kirjaaminen →
          </button>
        </div>
      </section>

      {/* EARLY RECORDING */}
      <section className="space-y-12 pt-24">
        <h2 className="text-3xl font-bold text-[#2B2B2B]">Useimmat odottavat liian kauan.</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-lg text-[#4A4A4A]">Kun tilanne vihdoin tunnistetaan, voimat ovat jo lopussa.</p>
            <p className="text-lg font-medium text-[#2B2B2B]">Varhainen kirjaaminen ei tee tilanteesta vakavampaa. Se tekee siitä selkeämmän.</p>
          </div>
          <div className="bg-white p-6 border border-[#E8DDD0] rounded-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B4B8A] mb-4">Tutkimusten mukaan</h4>
            <ul className="space-y-4 text-[#4A4A4A]">
              <li className="flex gap-4"><span className="text-[#E8DDD0] font-bold">•</span> Kiusaaminen jatkuu usein 1–3 vuotta ennen toimenpiteitä</li>
              <li className="flex gap-4"><span className="text-[#E8DDD0] font-bold">•</span> Moni ehtii kyseenalaistaa oman kokemuksensa kokonaan</li>
              <li className="flex gap-4"><span className="text-[#E8DDD0] font-bold">•</span> Konkreettinen näyttö puuttuu, kun sitä tarvittaisiin</li>
            </ul>
          </div>
        </div>
      </section>

      {/* NO DECISIONS FOR YOU */}
      <section className="space-y-12 border-t border-[#E8DDD0] pt-24">
        <h2 className="text-3xl font-bold text-[#2B2B2B]">Turvasiipi ei pakota sinua mihinkään.</h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <p className="text-lg text-[#4A4A4A]">Se antaa sinulle aineiston, jota voit käyttää – tai olla käyttämättä.</p>
            <div className="bg-[#5B4B8A]/5 p-6 rounded-sm border border-[#5B4B8A]/10">
              <p className="text-[#5B4B8A] italic font-medium">
                Moni ei koskaan vie asiaa eteenpäin. Silti he sanovat jälkeenpäin olevansa tyytyväisiä, että alkoivat kirjata ajoissa.
              </p>
            </div>
            <p className="text-lg font-bold text-[#2B2B2B]">Koska he tietävät mitä tapahtui. Eivätkä enää epäile itseään.</p>
          </div>

          <div className="space-y-4 text-sm font-mono text-[#4A4A4A] bg-white p-8 border border-[#E8DDD0]">
            <p className="uppercase tracking-widest font-bold text-[#2B2B2B] mb-2">Turvasiipi ei:</p>
            <ul className="space-y-3">
              <li>• Kehota sinua toimimaan</li>
              <li>• Ota yhteyttä työnantajaan</li>
              <li>• Arvioi ketään ihmisenä</li>
              <li>• Kerro sinulle mitä tehdä</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CALL */}
      <section className="text-center space-y-12 pt-12 pb-24">
        <div className="h-px w-24 bg-[#5B4B8A] mx-auto mb-12"></div>
        <h2 className="text-4xl font-bold text-[#2B2B2B]">Et ole velvollinen tietämään vielä, mitä tämä on.</h2>
        <p className="text-2xl italic text-[#4A4A4A]">Riittää, että huomaat sen.</p>

        <div className="flex flex-col items-center gap-8">
          <Link
            href="/lukutaito-testi"
            className="text-xl font-bold text-[#2B2B2B] border-b-2 border-[#5B4B8A] pb-1 hover:text-[#5B4B8A] transition-colors flex items-center gap-3"
          >
            Tee rauhallinen tilannekartoitus <ArrowRight className="w-6 h-6" />
          </Link>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#4A4A4A] space-y-1">
            <p>Voit lopettaa milloin tahansa.</p>
            <p>Mitään ei tallennu ilman lupaasi.</p>
          </div>
        </div>
      </section>
      {/* FAQ SECTION */}
      <section className="space-y-12 border-t border-[#E8DDD0] pt-24">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-[#2B2B2B]">Usein kysytyt kysymykset</h2>
          <p className="text-lg text-[#4A4A4A]">Mietityttääkö jokin? Tässä vastauksia yleisimpiin kysymyksiin.</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              Mikä on Turvasiipi?
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              Turvasiipi on yksityinen työkalu, joka auttaa sinua tunnistamaan ja dokumentoimaan työpaikkakiusaamista. Kaikki tiedot tallennetaan vain sinun laitteellesi – emme kerää mitään palvelimillemme.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              Kuka näkee kirjoittamani asiat?
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              Vain sinä. Kaikki merkinnät tallennetaan selaimeesi paikallisesti. Emme lähetä tietoja minnekään, emmekä voi nähdä niitä. Tämä on täysin yksityinen työkalu.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              Voiko työnantajani nähdä, että käytän tätä?
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              Ei. Turvasiipi toimii täysin paikallisesti selaimessasi. Työnantajasi ei voi nähdä, että käytät sovellusta, ellet itse jaa tietoja. Suosittelemme käyttämään omaa laitettasi, ei työnantajan laitetta.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              Miten dokumentointi toimii?
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              Kirjaat tapahtumat lyhyesti: mitä tapahtui, milloin, ketkä olivat paikalla, ja miltä se tuntui. Merkintöjä ei voi muokata jälkikäteen, jotta ne säilyvät luotettavina. Voit myöhemmin luoda raportin tai viedä tiedot.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              Näkyykö Tarinat-osiossa jakamani tarina muille?
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              Kyllä, mutta täysin anonyymisti. Tarinat jaetaan ilman nimeä, työpaikkaa tai muita tunnistetietoja. Voit itse päättää, haluatko jakaa tarinasi vai ei.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              Miten Turvasiipi auttaa minua toipumaan?
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              Turvasiipi ei korvaa ammattiapua, mutta se auttaa sinua näkemään tilanteen selkeämmin. Dokumentointi vähentää epävarmuutta ja auttaa sinua luottamaan omaan havaintokykyyn. Yhteisö-osio tarjoaa vertaistukea.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              Onko tekoälyn käyttö turvallista?
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              Turvasiipi ei käytä tekoälyä perusominaisuuksissa. Simulaatiot ja testit toimivat ennalta määritellyillä skenaarioilla. Tietosi eivät koskaan mene tekoälypalveluihin.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              Mitä on kiusaamisen lukutaito?
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              Kyky tunnistaa kiusaamisen merkit, ymmärtää sen dynamiikkaa ja nimetä kokemuksesi. Samalla tavalla kuin medialukutaito auttaa ymmärtämään mediaa, kiusaamisen lukutaito auttaa ymmärtämään työpaikkadynamiikkaa.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              Kenelle Turvasiipi on tehty?
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              Kaikille, jotka epäilevät kokevansa työpaikkakiusaamista tai huonoa kohtelua. Erityisesti niille, jotka eivät ole vielä varmoja, mitä tapahtuu, mutta tuntevat että jotain on vialla.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10" className="border border-[#E8DDD0] bg-white rounded-sm px-6 border-l-4 border-l-red-500">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-red-700">
              Olen välittömässä vaarassa. Mitä teen?
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6 space-y-4">
              <p className="font-bold text-red-700">Jos olet välittömässä vaarassa, ota yhteyttä hätänumeroon 112.</p>
              <p>Turvasiipi ei ole kriisipalvelu. Jos tarvitset akuuttia apua, ota yhteyttä:</p>
              <ul className="space-y-2 pl-4">
                <li>• <strong>Kriisipuhelin:</strong> 09 2525 0111 (24/7)</li>
                <li>• <strong>Mieli ry:</strong> mieli.fi</li>
                <li>• <strong>Työsuojeluviranomainen:</strong> tyosuojelu.fi</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

    </div>
  );
}
