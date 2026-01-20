"use client";


import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="px-6 sm:px-8 max-w-screen-md mx-auto space-y-32 pb-32 pt-20">
      {/* HERO */}
      <header className="space-y-12">
        {/* Bird Logo */}
        <div className="flex justify-start mb-8">
          <img
            src="/bird-logo.png"
            alt="Turvasiipi logo"
            className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-90"
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-[#2B2B2B]">
          {t('landing.hero.title_main')} <br />
          <span className="text-[#4A4A4A] font-normal italic">{t('landing.hero.title_span')}</span>
        </h1>

        <div className="space-y-8 max-w-2xl">
          <h2 className="text-2xl font-serif text-[#4A4A4A] leading-relaxed">
            {t('landing.hero.subtitle')}
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-[#4A4A4A] leading-relaxed">
              {t('landing.hero.text_1')}
            </p>
            <p className="text-lg text-[#4A4A4A] leading-relaxed">
              {t('landing.hero.text_2')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-4 items-start sm:items-center">
            <Link
              href="/aloita"
              className="px-8 py-4 bg-[#2B2B2B] text-white hover:bg-[#5B4B8A] transition-colors rounded-sm font-medium tracking-wide flex items-center gap-3 shadow-lg shadow-black/5"
            >
              {t('landing.hero.cta_start')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/quiz"
              className="px-6 py-4 text-[#4A4A4A] border-2 border-[#E8DDD0] hover:border-[#5B4B8A] hover:bg-[#5B4B8A]/5 transition-all rounded-sm font-medium tracking-wide flex items-center gap-3"
            >
              {t('landing.hero.cta_main')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="px-6 py-4 text-[#5B4B8A] hover:bg-[#5B4B8A]/5 rounded-sm font-medium transition-colors cursor-pointer"
                >
                  {t('landing.hero.cta_how')}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FDFBF7] border-[#E8DDD0]">
                <DialogHeader className="mb-8">
                  <DialogTitle className="text-3xl font-serif font-bold text-[#2B2B2B] mb-2">{t('landing.hero.dialog.title')}</DialogTitle>
                  <DialogDescription className="text-lg text-[#4A4A4A]">{t('landing.hero.dialog.desc')}</DialogDescription>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Step 1 */}
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-[#5B4B8A] text-white flex items-center justify-center font-bold text-lg">1</div>
                    <h3 className="text-xl font-bold text-[#2B2B2B]">{t('landing.hero.dialog.step1_title')}</h3>
                    <p className="text-[#4A4A4A]">{t('landing.hero.dialog.step1_text')}</p>
                    <div className="bg-white p-4 border border-[#E8DDD0] rounded-sm">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-[#5B4B8A] mb-1">{t('landing.hero.dialog.step1_sub')}</h4>
                      <p className="text-sm text-[#4A4A4A]">{t('landing.hero.dialog.step1_sub_text')}</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-[#5B4B8A] text-white flex items-center justify-center font-bold text-lg">2</div>
                    <h3 className="text-xl font-bold text-[#2B2B2B]">{t('landing.hero.dialog.step2_title')}</h3>
                    <p className="text-[#4A4A4A]">{t('landing.hero.dialog.step2_text')}</p>
                    <div className="bg-white p-4 border border-[#E8DDD0] rounded-sm">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-[#5B4B8A] mb-1">{t('landing.hero.dialog.step2_sub')}</h4>
                      <p className="text-sm text-[#4A4A4A]">{t('landing.hero.dialog.step2_sub_text')}</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-[#5B4B8A] text-white flex items-center justify-center font-bold text-lg">3</div>
                    <h3 className="text-xl font-bold text-[#2B2B2B]">{t('landing.hero.dialog.step3_title')}</h3>
                    <p className="text-[#4A4A4A]">{t('landing.hero.dialog.step3_text')}</p>
                    <div className="bg-white p-4 border border-[#E8DDD0] rounded-sm">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-[#5B4B8A] mb-1">{t('landing.hero.dialog.step3_sub')}</h4>
                      <p className="text-sm text-[#4A4A4A]">{t('landing.hero.dialog.step3_sub_text')}</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-[#5B4B8A] text-white flex items-center justify-center font-bold text-lg">4</div>
                    <h3 className="text-xl font-bold text-[#2B2B2B]">{t('landing.hero.dialog.step4_title')}</h3>
                    <p className="text-[#4A4A4A]">{t('landing.hero.dialog.step4_text')}</p>
                    <div className="bg-white p-4 border border-[#E8DDD0] rounded-sm">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-[#5B4B8A] mb-1">{t('landing.hero.dialog.step4_sub')}</h4>
                      <p className="text-sm text-[#4A4A4A]">{t('landing.hero.dialog.step4_sub_text')}</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="text-[11px] font-mono text-[#4A4A4A] uppercase tracking-wider space-y-1 border-l-2 border-[#E8DDD0] pl-4">
            <p>{t('landing.hero.read_first')}</p>
            <p>{t('landing.hero.quit_anytime')}</p>
          </div>
        </div>
      </header>

      {/* SCROLL 1 - WHY EXISTS */}
      <section id="miksi" className="space-y-12 border-t border-[#E8DDD0] pt-24 scroll-mt-24">
        <h2 className="text-3xl font-bold text-[#2B2B2B]">{t('landing.why.title')}</h2>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-8 space-y-8">
            <p className="text-xl leading-relaxed text-[#2B2B2B]">
              {t('landing.why.p1')}
            </p>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-[#E8DDD0] space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#4A4A4A]">{t('landing.why.list_title')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-lg text-[#4A4A4A]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8DDD0]" />
                  <span>{t('landing.why.list_1')}</span>
                </li>
                <li className="flex items-start gap-4 text-lg text-[#4A4A4A]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8DDD0]" />
                  <span>{t('landing.why.list_2')}</span>
                </li>
                <li className="flex items-start gap-4 text-lg text-[#4A4A4A]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8DDD0]" />
                  <span>{t('landing.why.list_3')}</span>
                </li>
                <li className="flex items-start gap-4 text-lg text-[#4A4A4A]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8DDD0]" />
                  <span className="italic">{t('landing.why.list_4')}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pl-8 border-l-4 border-[#5B4B8A]/20">
              <p className="text-lg font-medium text-[#2B2B2B]">{t('landing.why.conclusion_1')}</p>
              <p className="text-lg text-[#4A4A4A]">{t('landing.why.conclusion_2')}</p>
              <p className="text-lg text-[#4A4A4A]">{t('landing.why.conclusion_3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* IS THIS BULLYING? */}
      <section className="space-y-12 border-t border-[#E8DDD0] pt-24">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] leading-tight max-w-2xl">
          {t('landing.comparison.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6 text-lg leading-relaxed text-[#4A4A4A]">
            <p>{t('landing.comparison.p1')}</p>
            <p>{t('landing.comparison.p2')}</p>
            <p>{t('landing.comparison.p3')}</p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-[#4A4A4A]">
            <p className="font-medium text-[#2B2B2B]">{t('landing.comparison.p4')}</p>
            <p>{t('landing.comparison.p5')}</p>
            <p>{t('landing.comparison.p6')}</p>
            <div className="pt-4 p-6 bg-white border border-[#E8DDD0] rounded-sm">
              <p className="italic text-[#5B4B8A]">{t('landing.comparison.quote')}</p>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <Link href="/taktiikat" className="text-[#5B4B8A] font-bold text-lg hover:underline decoration-2 underline-offset-4 flex items-center gap-2">
            {t('landing.comparison.cta')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* PRIVATE LOG */}
      <section className="space-y-12 border-t border-[#E8DDD0] pt-24 bg-white -mx-8 px-8 py-24 shadow-sm border-b">
        <div className="max-w-screen-md mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#2B2B2B]">{t('landing.log.title')}</h2>
            <p className="text-xl text-[#4A4A4A] leading-relaxed">
              {t('landing.log.subtitle')}
            </p>
          </div>

          <div className="bg-[#FDFBF7] p-8 border border-[#E8DDD0] rounded-sm relative">
            <span className="absolute top-4 right-4 text-xs font-mono text-[#5B4B8A] uppercase tracking-wider border border-[#5B4B8A]/20 px-2 py-1 rounded-sm">{t('landing.log.label')}</span>
            <div className="space-y-6">
              <p className="text-lg text-[#2B2B2B]">{t('landing.log.text')}</p>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[t('landing.log.points.what'), t('landing.log.points.when'), t('landing.log.points.who'), t('landing.log.points.feeling')].map((item, i) => (
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
            <p>{t('landing.log.footer_1')}</p>
            <p>{t('landing.log.footer_2')}</p>
            <p>{t('landing.log.footer_3')}</p>
            <p className="font-bold text-[#2B2B2B]">{t('landing.log.footer_bold')}</p>
          </div>

          <Link href="/loki" className="bg-[#5B4B8A] text-white px-8 py-4 rounded-sm font-medium tracking-wide hover:bg-[#4A3A7A] transition-colors shadow-md inline-block">
            {t('landing.log.cta')} →
          </Link>
        </div>
      </section>

      {/* EARLY RECORDING */}
      <section className="space-y-12 pt-24">
        <h2 className="text-3xl font-bold text-[#2B2B2B]">{t('landing.early.title')}</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-lg text-[#4A4A4A]">{t('landing.early.p1')}</p>
            <p className="text-lg font-medium text-[#2B2B2B]">{t('landing.early.p2')}</p>
          </div>
          <div className="bg-white p-6 border border-[#E8DDD0] rounded-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B4B8A] mb-4">{t('landing.early.research_title')}</h4>
            <ul className="space-y-4 text-[#4A4A4A]">
              <li className="flex gap-4"><span className="text-[#E8DDD0] font-bold">•</span> {t('landing.early.research_1')}</li>
              <li className="flex gap-4"><span className="text-[#E8DDD0] font-bold">•</span> {t('landing.early.research_2')}</li>
              <li className="flex gap-4"><span className="text-[#E8DDD0] font-bold">•</span> {t('landing.early.research_3')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* NO DECISIONS FOR YOU */}
      <section className="space-y-12 border-t border-[#E8DDD0] pt-24">
        <h2 className="text-3xl font-bold text-[#2B2B2B]">{t('landing.freedom.title')}</h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <p className="text-lg text-[#4A4A4A]">{t('landing.freedom.p1')}</p>
            <div className="bg-[#5B4B8A]/5 p-6 rounded-sm border border-[#5B4B8A]/10">
              <p className="text-[#5B4B8A] italic font-medium">
                {t('landing.freedom.quote')}
              </p>
            </div>
            <p className="text-lg font-bold text-[#2B2B2B]">{t('landing.freedom.p2')}</p>
          </div>

          <div className="space-y-4 text-sm font-mono text-[#4A4A4A] bg-white p-8 border border-[#E8DDD0]">
            <p className="uppercase tracking-widest font-bold text-[#2B2B2B] mb-2">{t('landing.freedom.list_title')}</p>
            <ul className="space-y-3">
              <li>• {t('landing.freedom.list_1')}</li>
              <li>• {t('landing.freedom.list_2')}</li>
              <li>• {t('landing.freedom.list_3')}</li>
              <li>• {t('landing.freedom.list_4')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CALL */}
      <section className="text-center space-y-12 pt-12 pb-24">
        <div className="h-px w-24 bg-[#5B4B8A] mx-auto mb-12"></div>
        <h2 className="text-4xl font-bold text-[#2B2B2B]">{t('landing.final.title')}</h2>
        <p className="text-2xl italic text-[#4A4A4A]">{t('landing.final.subtitle')}</p>

        <div className="flex flex-col items-center gap-8">
          <Link
            href="/lukutaito-testi"
            className="text-xl font-bold text-[#2B2B2B] border-b-2 border-[#5B4B8A] pb-1 hover:text-[#5B4B8A] transition-colors flex items-center gap-3"
          >
            {t('landing.final.cta')} <ArrowRight className="w-6 h-6" />
          </Link>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#4A4A4A] space-y-1">
            <p>{t('landing.final.disclaimer_1')}</p>
            <p>{t('landing.final.disclaimer_2')}</p>
          </div>
        </div>
      </section>
      {/* FAQ SECTION */}
      <section className="space-y-12 border-t border-[#E8DDD0] pt-24">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-[#2B2B2B]">{t('faq.title')}</h2>
          <p className="text-lg text-[#4A4A4A]">{t('faq.subtitle')}</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              {t('faq.q1')}
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              {t('faq.a1')}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              {t('faq.q2')}
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              {t('faq.a2')}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              {t('faq.q3')}
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              {t('faq.a3')}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              {t('faq.q4')}
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              {t('faq.a4')}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              {t('faq.q5')}
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              {t('faq.a5')}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              {t('faq.q6')}
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              {t('faq.a6')}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              {t('faq.q7')}
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
              {t('faq.a7')}
            </AccordionContent>
          </AccordionItem>



          <AccordionItem value="item-10" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
            <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
              {t('faq.q9')}
            </AccordionTrigger>
            <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6 space-y-4">
              <p className="font-bold text-[#2B2B2B]">{t('faq.a9_title')}</p>
              <p>{t('faq.a9_text')}</p>
              <ul className="space-y-2 pl-4">
                <li>{t('faq.a9_list_1').replace(/\*\*/g, '')}</li>
                <li>{t('faq.a9_list_2').replace(/\*\*/g, '')}</li>
                <li>{t('faq.a9_list_3').replace(/\*\*/g, '')}</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

    </div>
  );
}
