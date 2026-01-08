export type TemplateCategory = 'employer' | 'union' | 'health' | 'legal' | 'communication';

export interface Template {
    id: string;
    category: TemplateCategory;
    tags: string[];
}

export const templates: Template[] = [
    {
        id: 'employer-notice-tsl28',
        category: 'employer',
        tags: ['virallinen', 'laki', 'aloitus']
    },
    {
        id: 'employer-follow-up',
        category: 'employer',
        tags: ['seuranta', 'kiireellinen']
    },
    {
        id: 'union-notice',
        category: 'union',
        tags: ['liitto', 'tuki']
    },
    {
        id: 'health-notice',
        category: 'health',
        tags: ['terveys', 'lääkäri']
    },
    {
        id: 'employer-escalation',
        category: 'employer',
        tags: ['laki', 'vakava', 'eskalointi']
    },
    {
        id: 'health-stress-assessment',
        category: 'health',
        tags: ['terveys', 'oireet', 'lääkäri']
    },
    {
        id: 'legal-compensation-claim',
        category: 'legal',
        tags: ['laki', 'korvaus', 'vakava']
    },
    {
        id: 'resignation-notice',
        category: 'legal',
        tags: ['irtisanoutuminen', 'lopettaminen']
    },
    {
        id: 'authority-notice',
        category: 'legal',
        tags: ['AVI', 'viranomainen', 'laki']
    },
    {
        id: 'legal-crime-report',
        category: 'legal',
        tags: ['poliisi', 'rikos', 'vakava']
    },
    {
        id: 'comm-witness-request',
        category: 'communication',
        tags: ['kollega', 'tuki', 'todistaja']
    },
    {
        id: 'career-interview-prep',
        category: 'communication',
        tags: ['työnhaku', 'haastattelu', 'vinkki']
    },
    {
        id: 'comm-thanks-supporter',
        category: 'communication',
        tags: ['tuki', 'kiitos', 'kollega']
    }
];
