import React from 'react';

interface SkillCardProps {
    skillName: string;
    skillId: string;
    timesUsed: number;
    description: string;
    whyItWorks: string;
    template?: string;
    examples: string[];
    practiceNext?: string[];
}

/**
 * Skill Card - Shows what the player learned
 * Displays concrete, transferable skills with real-world examples
 */
export const SkillCard: React.FC<SkillCardProps> = ({
    skillName,
    timesUsed,
    description,
    whyItWorks,
    template,
    examples,
    practiceNext,
}) => {
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-lg p-4 mb-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="text-lg font-bold text-indigo-900">{skillName}</h3>
                    <p className="text-xs text-indigo-600">
                        Käytit {timesUsed} {timesUsed === 1 ? 'kerran' : 'kertaa'} ✅
                    </p>
                </div>
                <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Opittu!
                </div>
            </div>

            {/* Description */}
            <div className="mb-3">
                <p className="text-sm text-gray-700 font-medium mb-1">Mikä se on:</p>
                <p className="text-sm text-gray-600">{description}</p>
            </div>

            {/* Template (if provided) */}
            {template && (
                <div className="bg-white border border-indigo-200 rounded-lg p-3 mb-3">
                    <p className="text-xs text-indigo-700 font-semibold mb-1">📝 Kaava:</p>
                    <p className="text-sm text-gray-900 font-mono">{template}</p>
                </div>
            )}

            {/* Why it works */}
            <div className="mb-3">
                <p className="text-sm text-gray-700 font-medium mb-1">Miksi se toimii:</p>
                <p className="text-sm text-gray-600">{whyItWorks}</p>
            </div>

            {/* Examples */}
            <div className="mb-3">
                <p className="text-sm text-gray-700 font-medium mb-2">💡 Käytä oikeassa elämässä:</p>
                <ul className="space-y-2">
                    {examples.map((example, index) => (
                        <li
                            key={index}
                            className="bg-green-50 border-l-4 border-green-500 pl-3 py-2 text-sm text-gray-700"
                        >
                            {example}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Practice next (if provided) */}
            {practiceNext && practiceNext.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-800 font-semibold mb-2">
                        🎯 Harjoittele seuraavaksi:
                    </p>
                    <ul className="space-y-1">
                        {practiceNext.map((item, index) => (
                            <li key={index} className="text-sm text-amber-900">
                                • {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

interface SkillCardSummaryProps {
    skillsUsed: Record<string, number>; // skillId -> count
}

/**
 * Skill Card Summary - Container for all learned skills
 * Analyzes player's choices and displays skill cards
 */
export const SkillCardSummary: React.FC<SkillCardSummaryProps> = ({ skillsUsed }) => {
    // Skill database - defines all available skills
    const skillDatabase: Record<string, Omit<SkillCardProps, 'timesUsed' | 'skillId'>> = {
        'fact-reference': {
            skillName: 'Faktoihin viittaaminen',
            description:
                'Viittaat todennettavissa olevaan tietoon (muistiinpanot, sähköpostit, sopimukset) tulkintojen tai tunteiden sijaan.',
            whyItWorks:
                'Gaslightingia on vaikea tehdä kun on kirjallista dokumentaatiota. Faktat ovat neutraaleja ja vähentävät defensiivisyyttä. Siirtää keskustelun "kuka on väärässä" → "mitä sovittiin".',
            template: '"En muista niin, tarkistan [lähde]"',
            examples: [
                '📧 Sähköpostissa: "Muistini mukaan viime palaverissa sovittiin..."',
                '💬 Palaverissa: "Voimmeko tarkistaa muistiinpanot?"',
                '📋 HR-tapaamisessa: "Olen dokumentoinut tapahtumat [päivämäärä]"',
            ],
            practiceNext: [
                'Ala kirjaamaan tärkeitä palavereita ylös',
                'Vahvista sähköpostitse suulliset sopimukset',
            ],
        },
        'low-threshold-intervention': {
            skillName: 'Matalankynnyksen interventio',
            description:
                'Puutut tilanteeseen lempeästi, ei-konfrontatiivisesti. Annat tilaa ilman suoraa syytöstä.',
            whyItWorks:
                'Ei herätä defensiivisyyttä. Antaa kiusaajalle "kasvojen säilyttämisen" mahdollisuuden. 80% kiusaamisesta loppuisi jos joku puuttuisi - matalan kynnyksen interventio on helpoin tapa aloittaa.',
            template: '[Lempeä aloitus] + [Kysymys/Huomio]',
            examples: [
                '💬 "Anteeksi että keskeytän, mitä mieltä sinä olet tästä?"',
                '🤔 "Haluaisin varmistaa - miten tämä sovittiin?"',
                '👋 "Laura, kuulisinpa mielellään sinun näkemyksesi"',
            ],
            practiceNext: [
                'Harjoittele lempeää aloitusta peilin edessä',
                'Pelaa Scenario 5: "Toinen mahdollisuus puuttua"',
            ],
        },
        'redirect-attention': {
            skillName: 'Huomion palauttaminen',
            description:
                'Palautat aktiivisesti uhrin ääneen/näkyviin kun joku yrittää sivuuttaa hänet.',
            whyItWorks:
                'Näyttää uhrille että hänen mielipiteensä on arvokas. Häiritsee kiusaajan dynamiikkaa. Matalankynnyksen tapa osoittaa tukea ilman avointa konfrontaatiota.',
            template: '"[Nimi], mitä mieltä sinä olet?"',
            examples: [
                '🎯 Palaverissa: "Laura, haluaisin kuulla sinun näkemyksesi tästä"',
                '📧 Sähköpostissa: "Lisään Lauran mukaan keskusteluun"',
                '💡 Käytävällä: "Muuten, Laura mainitsi hyvän pointin aiemmin..."',
            ],
            practiceNext: [
                'Huomaa kuka jää hiljaiseksi kokouksissa',
                'Harjoittele aktiivista kuuntelua',
            ],
        },
    };

    // Filter skills that were actually used
    const usedSkills = Object.entries(skillsUsed)
        .filter(([_, count]) => count > 0)
        .map(([skillId, count]) => ({
            skillId,
            timesUsed: count,
            ...skillDatabase[skillId],
        }))
        .filter((skill) => skill.skillName); // Only include known skills

    if (usedSkills.length === 0) {
        return null;
    }

    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🎓 Opit nämä taidot</h2>
            <p className="text-sm text-gray-600 mb-4">
                Nämä ovat konkreettisia taitoja joita voit käyttää oikeassa elämässä. Jokaiseen on
                esimerkkejä eri konteksteista.
            </p>
            {usedSkills.map((skill) => (
                <SkillCard key={skill.skillId} {...skill} />
            ))}
        </div>
    );
};
