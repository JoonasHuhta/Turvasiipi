"use client";

import React from 'react';
import { notFound, useRouter, useParams } from 'next/navigation';
import { trainingHubData } from "@/data/training-hub";
import { getModuleComponent } from "@/lib/training/registry";
import { useProgress } from "@/context/ProgressContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ModulePage() {
    const params = useParams();
    const router = useRouter();
    const { completeModule, awardBadge } = useProgress();

    // Extract params safely
    const categoryId = params.category as string;
    const moduleId = params.slug as string;

    // 1. Validate Category
    const category = trainingHubData.find(c => c.id === categoryId);
    if (!category) {
        notFound();
    }

    // 2. Validate Module
    const module = category.modules.find(m => m.id === moduleId);
    if (!module) {
        notFound();
    }

    // 3. Resolve Component
    const ModuleComponent = getModuleComponent(moduleId);

    // 4. Handle Completion
    const handleComplete = () => {
        completeModule(moduleId);
        if (module.isCertificationModule) {
            awardBadge('concept_learner'); // Generic badge, can be specific
        }
        router.push('/valmennus');
    };

    const handleExit = () => {
        router.push('/valmennus');
    };

    if (!ModuleComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-slate-50">
                <h1 className="text-2xl font-bold text-slate-900">Moduulia ei ole vielä toteutettu React-komponenttina.</h1>
                <p className="text-slate-500">ID: {moduleId}</p>
                <Button onClick={handleExit}>Palaa takaisin</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Optional Header for context (can be hidden if module handles its own header) */}
            <div className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleExit}
                    className="pointer-events-auto bg-white/80 backdrop-blur shadow-sm hover:bg-white border cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Poistu
                </Button>
            </div>

            <ModuleComponent
                moduleId={moduleId}
                onComplete={handleComplete}
                onExit={handleExit}
            />
        </div>
    );
}
