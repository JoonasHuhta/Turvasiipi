"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, HeartHandshake, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const messages = [
    "Et ole yksin tämän asian kanssa. ❤️",
    "Olet arvokas juuri sellaisena kuin olet.",
    "Tämä tilanne ei ole sinun syysi.",
    "Jokainen päivä on uusi alku toipumiselle.",
    "Muista hengittää. Pärjäät kyllä.",
    "Sinulla on oikeus turvalliseen työhön.",
    "Voimia päivään! Olet vahvempi kuin uskot.",
    "Älä luovuta, asia selviää kyllä."
];

export default function CommunityPage() {
    const [userCount, setUserCount] = useState(142);

    useEffect(() => {
        // Simulate user count fluctuation
        const interval = setInterval(() => {
            setUserCount(prev => prev + Math.floor(Math.random() * 5) - 2);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8 pb-10">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Yhteisö</h2>
                <p className="text-muted-foreground">Muistutus siitä, että et ole yksin.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="flex items-center gap-4 py-6">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Users className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-primary">{userCount}</p>
                            <p className="text-sm text-muted-foreground">käyttäjää parhaillaan sovelluksessa</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-secondary/20 border-secondary/20">
                    <CardContent className="flex items-center gap-4 py-6">
                        <div className="p-3 bg-secondary/30 rounded-full">
                            <HeartHandshake className="w-8 h-8 text-secondary-foreground" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-secondary-foreground">Yli 2000</p>
                            <p className="text-sm text-muted-foreground">apua saanutta tänä vuonna</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Viestiseinä</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="h-full hover:shadow-md transition-shadow">
                                <CardContent className="pt-6 flex items-center justify-center p-6 text-center h-32 italic text-muted-foreground">
                                    &quot;{msg}&quot;
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Card className="border-l-4 border-l-yellow-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <ShieldAlert className="w-5 h-5 text-yellow-600" />
                        Vastuuvapauslauseke
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Tämä on turvallinen tila. Emme koskaan jaa tietojasi. Tämä yhteisönäkymä on luotu muistuttamaan vertaistuesta,
                        mutta yksityisyytesi turvaamiseksi emme mahdollista suoraa keskustelua sovelluksen kautta.
                        Jos tarvitset akuuttia keskusteluapua, ota yhteyttä Mieli ry:n kriisipuhelimeen.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
