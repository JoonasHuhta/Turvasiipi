"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Star, Brain, ClipboardCheck, FileText, Users, Heart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-8 pb-12 md:pt-12 md:pb-24 text-center max-w-5xl mx-auto">

        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-200/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

        <div className="flex justify-center mb-8 relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full opacity-100" />
            <img src="/logo.png" alt="Turvasiipi Logo" className="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10 drop-shadow-sm" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
          {t('hero.title')}
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col items-center gap-6">
          <Link href="/quiz">
            <Button className="rounded-full w-full md:w-auto h-14 px-8 text-lg font-semibold shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105 transition-all bg-primary hover:bg-primary/90" size="lg">
              {t('hero.cta')} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-slate-500 font-medium bg-white/60 backdrop-blur px-4 py-1.5 rounded-full border border-slate-200/50">
            {t('hero.stats_info')}
          </p>
        </div>
      </section>

      {/* Trust Grid / Statistics - Mobile Optimized */}
      <section className="px-4 pb-16">
        <div className="max-w-md md:max-w-4xl mx-auto bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-6 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column: Header + Stats */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                  <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">!</span>
                  {t('stats.title')}
                </h3>
              </div>

              <ul className="space-y-3">
                {[
                  t('stats.stat1'),
                  t('stats.stat2'),
                  t('stats.stat3'),
                  t('stats.stat4'),
                  t('stats.stat5')
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium bg-white/50 p-2.5 rounded-lg border border-slate-100/50">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Warning + Solution */}
            <div className="space-y-4">
              {/* Warning Block */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100/50 rounded-bl-full -mr-4 -mt-4" />
                <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-2">
                  <span className="text-xl">⚠️</span> {t('stats.warning_title')}
                </h4>
                <p className="text-sm text-amber-800/90 leading-relaxed">
                  {t('stats.warning_desc')}
                </p>
              </div>

              {/* Solution Block */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 border border-emerald-400/20 rounded-xl p-5 shadow-lg text-white relative overflow-hidden group">
                <h4 className="font-bold text-white flex items-center gap-2 mb-2">
                  <span className="text-xl">✅</span> {t('stats.solution_title')}
                </h4>
                <p className="text-sm text-emerald-50 leading-relaxed mb-3">
                  {t('stats.solution_desc')}
                </p>
                <p className="text-sm font-bold text-white/90 border-t border-white/20 pt-2">
                  {t('stats.solution_footer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="space-y-12 py-12 md:py-24 px-4 container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t('features.title')}</h2>
          <p className="text-slate-600">{t('features.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Card className="bg-white/50 backdrop-blur border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">📝</div>
              <CardTitle className="text-xl">{t('features.doc_title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                {t('features.doc_desc')}
              </p>
              <Link href="/timeline" className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1">
                {t('features.doc_cta')} <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="bg-white/50 backdrop-blur border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">🧠</div>
              <CardTitle className="text-xl">{t('features.understand_title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                {t('features.understand_desc')}
              </p>
              <Link href="/quiz" className="text-purple-600 font-semibold text-sm hover:underline flex items-center gap-1">
                {t('features.understand_cta')} <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="bg-white/50 backdrop-blur border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">💙</div>
              <CardTitle className="text-xl">{t('features.recover_title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                {t('features.recover_desc')}
              </p>
              <Link href="/yhteiso" className="text-green-600 font-semibold text-sm hover:underline flex items-center gap-1">
                {t('features.recover_cta')} <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="antigravity-flow" className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden relative">
        <div className="container mx-auto max-w-5xl px-4 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">{t('how_it_works.title')}</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {t('how_it_works.subtitle')}
            </p>
          </div>

          <div className="relative space-y-24">
            {/* Connecting Line */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-emerald-200 -translate-x-1/2 rounded-full" />

            {/* Step 1: Validate */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
              <div className="flex-1 md:text-right order-2 md:order-1 space-y-4">
                <div className="inline-flex md:hidden items-center justify-center w-12 h-12 bg-indigo-600 rounded-full text-white font-bold text-xl mb-4 shadow-lg ring-4 ring-indigo-50">1</div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{t('how_it_works.step1_title')}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {t('how_it_works.step1_desc')}
                </p>
                <Link href="/quiz">
                  <span className="inline-flex items-center font-semibold text-indigo-600 hover:text-indigo-700 mt-2">
                    {t('how_it_works.step1_cta')} <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </div>

              {/* Number Badge (Desktop) */}
              <div className="hidden md:flex flex-none w-14 h-14 bg-indigo-600 rounded-full items-center justify-center text-white font-bold text-xl shadow-xl ring-8 ring-slate-50 relative z-10 order-1 md:order-2 group-hover:scale-110 transition-transform">
                1
              </div>

              <div className="flex-1 order-3 w-full">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100/50 hover:shadow-md transition-shadow relative overflow-hidden group-hover:-translate-y-1 duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Brain className="w-24 h-24 text-indigo-600" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <Brain className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{t('how_it_works.step1_card_title')}</h4>
                      <p className="text-sm text-slate-500">{t('how_it_works.step1_card_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Document */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
              <div className="flex-1 order-3 md:order-1 w-full">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100/50 hover:shadow-md transition-shadow relative overflow-hidden group-hover:-translate-y-1 duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ClipboardCheck className="w-24 h-24 text-blue-600" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <ClipboardCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{t('how_it_works.step2_card_title')}</h4>
                      <p className="text-sm text-slate-500">{t('how_it_works.step2_card_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Number Badge (Desktop) */}
              <div className="hidden md:flex flex-none w-14 h-14 bg-blue-600 rounded-full items-center justify-center text-white font-bold text-xl shadow-xl ring-8 ring-slate-50 relative z-10 order-1 md:order-2 group-hover:scale-110 transition-transform">
                2
              </div>

              <div className="flex-1 md:text-left order-2 md:order-3 space-y-4">
                <div className="inline-flex md:hidden items-center justify-center w-12 h-12 bg-blue-600 rounded-full text-white font-bold text-xl mb-4 shadow-lg ring-4 ring-blue-50">2</div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{t('how_it_works.step2_title')}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {t('how_it_works.step2_desc')}
                </p>
                <Link href="/timeline">
                  <span className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 mt-2">
                    {t('how_it_works.step2_cta')} <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Step 3: Analyze */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
              <div className="flex-1 md:text-right order-2 md:order-1 space-y-4">
                <div className="inline-flex md:hidden items-center justify-center w-12 h-12 bg-purple-600 rounded-full text-white font-bold text-xl mb-4 shadow-lg ring-4 ring-purple-50">3</div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{t('how_it_works.step3_title')}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {t('how_it_works.step3_desc')}
                </p>
                <Link href="/raportti">
                  <span className="inline-flex items-center font-semibold text-purple-600 hover:text-purple-700 mt-2">
                    {t('how_it_works.step3_cta')} <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </div>

              {/* Number Badge (Desktop) */}
              <div className="hidden md:flex flex-none w-14 h-14 bg-purple-600 rounded-full items-center justify-center text-white font-bold text-xl shadow-xl ring-8 ring-slate-50 relative z-10 order-1 md:order-2 group-hover:scale-110 transition-transform">
                3
              </div>

              <div className="flex-1 order-3 w-full">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100/50 hover:shadow-md transition-shadow relative overflow-hidden group-hover:-translate-y-1 duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <FileText className="w-24 h-24 text-purple-600" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{t('how_it_works.step3_card_title')}</h4>
                      <p className="text-sm text-slate-500">{t('how_it_works.step3_card_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Recover */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
              <div className="flex-1 order-3 md:order-1 w-full">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100/50 hover:shadow-md transition-shadow relative overflow-hidden group-hover:-translate-y-1 duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Users className="w-24 h-24 text-emerald-600" />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <Heart className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{t('how_it_works.step4_card_title')}</h4>
                      <p className="text-sm text-slate-500">{t('how_it_works.step4_card_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Number Badge (Desktop) */}
              <div className="hidden md:flex flex-none w-14 h-14 bg-emerald-600 rounded-full items-center justify-center text-white font-bold text-xl shadow-xl ring-8 ring-slate-50 relative z-10 order-1 md:order-2 group-hover:scale-110 transition-transform">
                4
              </div>

              <div className="flex-1 md:text-left order-2 md:order-3 space-y-4">
                <div className="inline-flex md:hidden items-center justify-center w-12 h-12 bg-emerald-600 rounded-full text-white font-bold text-xl mb-4 shadow-lg ring-4 ring-emerald-50">4</div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{t('how_it_works.step4_title')}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {t('how_it_works.step4_desc')}
                </p>
                <Link href="/yhteiso">
                  <span className="inline-flex items-center font-semibold text-emerald-600 hover:text-emerald-700 mt-2">
                    {t('how_it_works.step4_cta')} <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">{t('faq.title')}</h2>
            <p className="text-slate-600">{t('faq.subtitle')}</p>
          </div>

          <Accordion type="single" collapsible className="w-full">

            <AccordionItem value="item-1" className="border-b border-slate-100">
              <AccordionTrigger className="text-left text-lg font-medium text-slate-800 hover:text-indigo-600 hover:no-underline py-4">
                {t('faq.q1')}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                {t('faq.a1')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-slate-100">
              <AccordionTrigger className="text-left text-lg font-medium text-slate-800 hover:text-indigo-600 hover:no-underline py-4">
                {t('faq.q2')}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                {t('faq.a2')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-slate-100">
              <AccordionTrigger className="text-left text-lg font-medium text-slate-800 hover:text-indigo-600 hover:no-underline py-4">
                {t('faq.q3')}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                {t('faq.a3')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-slate-100">
              <AccordionTrigger className="text-left text-lg font-medium text-slate-800 hover:text-indigo-600 hover:no-underline py-4">
                {t('faq.q4')}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                {t('faq.a4')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-slate-100">
              <AccordionTrigger className="text-left text-lg font-medium text-slate-800 hover:text-indigo-600 hover:no-underline py-4">
                {t('faq.q5')}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                {t('faq.a5')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-b-0">
              <AccordionTrigger className="text-left text-lg font-medium text-rose-600 hover:text-rose-700 hover:no-underline py-4">
                {t('faq.q6')}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                {t('faq.a6')}
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </section>

    </div>
  );
}
