"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    Building2,
    ArrowLeft,
    ShieldAlert,
    Users,
    Activity,
    Briefcase,
    BookOpen,
    Scale,
    AlertTriangle,
    CheckCircle2
} from "lucide-react";

interface OrganizationResourcesProps {
    onExit: () => void;
    onComplete: () => void;
}

export const OrganizationResources: React.FC<OrganizationResourcesProps> = ({ onExit, onComplete }) => {



    const resources = [
        {
            id: "structure",
            title: "1. Rakenteellinen riski – Ei yksilön ongelma",
            icon: ShieldAlert,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p><strong>Tutkimusnäyttö osoittaa:</strong> Työpaikkakiusaaminen ei synny sattumalta. Se liittyy usein epäselviin rooleihin, heikkoon johtamiseen, kuormitukseen ja muutostilanteisiin.</p>
                    <p>Organisaatioissa, joissa vastuu siirretään yksilöille (“kemiat eivät kohdanneet”), kiusaaminen jatkuu herkemmin ja pitkittyy.</p>
                    <div className="bg-slate-100 p-4 rounded-lg border-l-4 border-slate-500 font-medium">
                        Keskeinen periaate: Työpaikkakiusaaminen on aina työyhteisön ja johdon vastuukysymys.
                    </div>
                </div>
            )
        },
        {
            id: "psych-safety",
            title: "2. Psykologinen turvallisuus – Hyvinvoinnin perusta",
            icon: Users,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p><strong>Amy Edmondsonin tutkimukset:</strong> Psykologisesti turvallisissa tiimeissä uskalletaan puhua ongelmista ajoissa, virheisiin puututaan rakentavasti ja tuottavuus on parempaa.</p>
                    <p><strong>Se EI tarkoita:</strong> Vaatimustason laskemista tai konfliktien välttelyä.</p>
                    <p><strong>Se tarkoittaa:</strong> Oikeutta tulla kuulluksi ja nostaa esiin epäkohtia ilman pelkoa seurauksista.</p>
                </div>
            )
        },
        {
            id: "early-signs",
            title: "3. Varhaiset merkit – Tunnista epäsuorat signaalit",
            icon: Activity,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p>Työpaikkakiusaaminen näkyy usein ensin epäsuorina signaaleina:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Lisääntyneet sairauspoissaolot</li>
                        <li>Vetäytyminen palavereissa</li>
                        <li>Vaihtuvuus tai siirtymiset sivuun</li>
                        <li>Epäselvä puhe “ongelmallisesta henkilöstä”</li>
                        <li>Hiljainen hyväksyntä epäasialliselle käytökselle</li>
                    </ul>
                    <p><strong>Tutkimusten mukaan:</strong> Varhainen puuttuminen on merkittävin tekijä haittojen minimoimisessa.</p>
                </div>
            )
        },
        {
            id: "leadership",
            title: "4. Johtamisen rooli – Ratkaiseva vaikutus",
            icon: Briefcase,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p>Esihenkilön toiminta (tai toimimattomuus) määrittää tilanteen suunnan. Kiusaaminen harvoin jatkuu, jos puuttuminen on nopeaa, rajat ovat selkeät ja prosessit ovat oikeudenmukaisia.</p>
                    <p><strong>Haaste:</strong> Monet esihenkilöt eivät ole saaneet koulutusta konfliktien, vallan tai trauman kohtaamiseen. Tämä tietopankki tukee johtoa tässä vastuussa.</p>
                </div>
            )
        },
        {
            id: "trauma-informed",
            title: "5. Traumainformoitu työyhteisö",
            icon: BookOpen,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p>Tarkoittaa, että organisaatio ymmärtää ihmisten reaktioiden voivan liittyä kuormitukseen, ei patologisoi oireita eikä kiirehdi “ratkaisuja” ilman kuulemista.</p>
                    <p>Käytännössä tämä näkyy selkeinä toimintamalleina, rauhallisena ja johdonmukaisena viestintänä sekä ihmisten kohtaamisena arvokkaasti myös vaikeissa tilanteissa.</p>
                </div>
            )
        },
        {
            id: "responsibilities",
            title: "6. Vastuut ja velvoitteet",
            icon: Scale,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p>Organisaatiolla on työturvallisuusvastuu, velvollisuus ehkäistä ja puuttua epäasialliseen kohteluun sekä vastuu dokumentoinnista ja prosesseista.</p>
                    <p><strong>Huomio:</strong> Pelkkä ohje ei riitä, jos sitä ei tunneta, uskalleta käyttää tai jos sen käyttö johtaa kielteisiin seurauksiin ilmoittajalle.</p>
                </div>
            )
        },
        {
            id: "cost",
            title: "7. Vaikenemisen hinta",
            icon: AlertTriangle,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p>Tutkimusten mukaan työpaikkakiusaaminen lisää sairauspoissaoloja, työkyvyttömyysriskiä, henkilöstön vaihtuvuutta ja organisaation mainehaittoja.</p>
                    <p>Ennen kaikkea se heikentää luottamusta, sitoutumista ja työn merkityksellisyyttä.</p>
                </div>
            )
        },
        {
            id: "actions",
            title: "8. Mitä organisaatio voi tehdä toisin",
            icon: CheckCircle2,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p><strong>Tutkitusti vaikuttavia toimia:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Selkeät ja tunnetut toimintamallit</li>
                        <li>Koulutus esihenkilöille ja HR:lle</li>
                        <li>Ulkopuolinen tuki vaikeissa tilanteissa</li>
                        <li>Kulttuuri, jossa puhuminen on turvallista</li>
                    </ul>
                    <p><strong>Ydinajatus:</strong> Hyvinvoiva työyhteisö ei synny sattumalta – se rakennetaan tietoisesti.</p>
                </div>
            )
        },
        {
            id: "target",
            title: "9. Kenelle tämä tietopankki on?",
            icon: Users,
            content: (
                <div className="space-y-4 text-slate-700">
                    <p>Johto, esihenkilöt, HR, työsuojelu, kehittäjät ja konsultit.</p>
                    <p>Tietopankkia voi käyttää koulutusten tukena, päätöksenteon pohjana ja yhteisen kielen luomisessa.</p>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-full p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Takaisin
                </Button>
                <div className="flex items-center gap-2 text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
                    <Building2 className="w-4 h-4" /> Organisaatioille
                </div>
            </div>

            <div className="space-y-4 pb-4 border-b border-slate-200">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
                    Tietopankki: <span className="text-slate-600">Työyhteisön Hyvinvointi</span>
                </h1>
                <p className="text-slate-500 max-w-2xl text-lg">
                    Rakenteelliset riskit, johdon vastuu ja tutkittu tieto turvallisen työyhteisön rakentamiseksi.
                </p>
            </div>

            <Card className="p-0 border-slate-200 shadow-lg overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                    {resources.map((item, i) => (
                        <AccordionItem key={item.id} value={item.id} className="border-b border-slate-100 last:border-0 px-6">
                            <AccordionTrigger className="hover:no-underline py-6 group">
                                <div className="flex items-center gap-4 text-left">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-colors">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-slate-800 text-lg group-hover:text-slate-900">{item.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-6 pl-[4.5rem] pr-4">
                                {item.content}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Card>

            <div className="bg-slate-50 p-8 rounded-2xl text-center space-y-4 mt-4 border border-slate-100">
                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm">Organisaatiot ovat ihmisiä</h3>
                <p className="text-slate-600 italic max-w-xl mx-auto">
                    "Kun työyhteisö on turvallinen, ihmiset uskaltavat tehdä työnsä hyvin. Kun turvallisuus puuttuu, seuraukset näkyvät kaikkialla."
                </p>
            </div>
        </div>
    );
};
