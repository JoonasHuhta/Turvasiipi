"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionProps {
    t: (key: string) => string;
}

export function FAQSection({ t }: FAQSectionProps) {
    return (
        <section className="space-y-12 border-t border-[#E8DDD0] pt-24 mb-24">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-[#2B2B2B]">{t('landing.faq.title')}</h2>
                <p className="text-lg text-[#4A4A4A]">{t('landing.faq.subtitle')}</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
                    <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
                        {t('landing.faq.q1')}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
                        {t('landing.faq.a1')}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
                    <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
                        {t('landing.faq.q2')}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
                        {t('landing.faq.a2')}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
                    <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
                        {t('landing.faq.q3')}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
                        {t('landing.faq.a3')}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
                    <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
                        {t('landing.faq.q4')}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
                        {t('landing.faq.a4')}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
                    <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
                        {t('landing.faq.q5')}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
                        {t('landing.faq.a5')}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
                    <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
                        {t('landing.faq.q6')}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6">
                        {t('landing.faq.a6')}
                    </AccordionContent>
                </AccordionItem>



                <AccordionItem value="item-10" className="border border-[#E8DDD0] bg-white rounded-sm px-6">
                    <AccordionTrigger className="hover:no-underline py-6 text-left text-lg font-medium text-[#2B2B2B]">
                        {t('landing.faq.q9')}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#4A4A4A] leading-relaxed pb-6 space-y-4">
                        <p className="font-bold text-[#2B2B2B]">{t('landing.faq.a9_title')}</p>
                        <p>{t('landing.faq.a9_text')}</p>
                        <ul className="space-y-2 pl-4">
                            <li>{t('landing.faq.a9_list_1').replace(/\*\*/g, '')}</li>
                            <li>{t('landing.faq.a9_list_2').replace(/\*\*/g, '')}</li>
                            <li>{t('landing.faq.a9_list_3').replace(/\*\*/g, '')}</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
}
