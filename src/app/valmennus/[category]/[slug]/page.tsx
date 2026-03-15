"use client";

import React, { useEffect } from 'react';
import { notFound, useRouter, useParams } from 'next/navigation';
import { trainingHubData } from "@/data/training-hub";
import { getModuleComponent } from "@/lib/training/registry";
import { useProgress } from "@/context/ProgressContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ComingSoonModule from "@/components/training/ComingSoonModule";

export default function ModulePage() {
    const params = useParams();
    const router = useRouter();
    const { completeModule, awardBadge, saveSimulationScore } = useProgress();
    const { loadNamespace } = useLanguage();

    useEffect(() => {
        loadNamespace('training');
    }, [loadNamespace]);

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
    const handleComplete = (score?: number, passed?: boolean) => {
        completeModule(moduleId);
        
        // Save score if provided by a simulation
        if (score !== undefined) {
            saveSimulationScore(moduleId, score);
        }

        if (module.isCertificationModule || passed) {
            awardBadge('concept_learner'); // Generic badge, can be specific
        }
        router.push('/valmennus');
    };

    const handleExit = () => {
        router.push('/valmennus');
    };

    if (!ModuleComponent) {
        return (
            <ComingSoonModule
                moduleId={moduleId}
                title={module.title}
                description={module.description}
                onExit={handleExit}
            />
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
