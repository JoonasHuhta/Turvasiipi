'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Construction } from 'lucide-react';

interface Props {
    onExit: () => void;
}

export default function RSDLevelPlaceholder({ onExit, levelNumber, title }: Props & { levelNumber: number; title: string }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-violet-50/30 p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={onExit}
                    className="mb-4"
                >
                    <ChevronLeft className="w-4 h-4 mr-2" /> Takaisin
                </Button>

                <Card className="p-8 md:p-12 text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-100 text-violet-600">
                        <Construction className="w-10 h-10" />
                    </div>

                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#292524] mb-2">
                            Taso {levelNumber}: {title}
                        </h1>
                        <p className="text-base text-[#57534E]">
                            Tämä taso on parhaillaan kehityksessä.
                        </p>
                    </div>

                    <div className="pt-4">
                        <Button
                            onClick={onExit}
                            className="bg-violet-600 hover:bg-violet-700 text-white"
                        >
                            Palaa takaisin
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
