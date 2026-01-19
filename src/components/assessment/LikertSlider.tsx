"use client";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LikertSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    labels?: Record<number, string>;
    className?: string;
    colors?: boolean; // If true, apply green-to-red or red-to-green gradient logic
    reverseColors?: boolean; // If true, 1=Red, 5=Green (Organizational). If false, 1=Green, 5=Red (Individual)
}

export function LikertSlider({
    value,
    onChange,
    min = 1,
    max = 5,
    labels,
    className,
    colors = true,
    reverseColors = false
}: LikertSliderProps) {
    const [localValue, setLocalValue] = useState([value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalValue([value]);
    }, [value]);

    const handleValueChange = (vals: number[]) => {
        setLocalValue(vals);
        onChange(vals[0]);
    };

    const getColorClass = (val: number) => {
        if (!colors) return "bg-slate-900";
        // Mapping: 
        // Normal (Individual): 1=Green (Good), 5=Red (Bad)
        // Reverse (Organizational): 1=Red (Bad), 5=Green (Good)

        if (reverseColors) {
            if (val <= 2) return "bg-red-500";
            if (val === 3) return "bg-yellow-400";
            return "bg-emerald-500";
        } else {
            if (val <= 2) return "bg-emerald-500";
            if (val === 3) return "bg-yellow-400";
            return "bg-red-500";
        }
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-500 tracking-widest">
                    {labels ? labels[localValue[0]] : localValue[0]}
                </span>
                <span className={cn(
                    "text-2xl font-black w-10 h-10 flex items-center justify-center rounded-full text-white shadow-sm transition-colors duration-300",
                    getColorClass(localValue[0])
                )}>
                    {localValue[0]}
                </span>
            </div>

            <div className="relative h-10 flex items-center">
                {/* Track Background with Gradient Hint */}
                <div className={cn(
                    "absolute inset-0 h-2 my-auto rounded-full opacity-20",
                    reverseColors
                        ? "bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500"
                        : "bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-500"
                )} />

                <Slider
                    value={localValue}
                    min={min}
                    max={max}
                    step={1}
                    onValueChange={handleValueChange}
                    className="cursor-pointer"
                />
            </div>


        </div>
    );
}
