import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface Insight {
    priority: 'urgent' | 'warning' | 'positive';
    icon: string;
    message: string;
    action?: { label: string; href: string };
}

interface SmartInsightsProps {
    insights: Insight[];
}

export function SmartInsights({ insights }: SmartInsightsProps) {
    const { t } = useLanguage();

    if (insights.length === 0) return null;

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">
                💡 {t('overview.insights.title')}
            </h3>
            <div className="space-y-3">
                {insights.map((insight, index) => {
                    const isUrgent = insight.priority === 'urgent';
                    const isWarning = insight.priority === 'warning';
                    const isPositive = insight.priority === 'positive';

                    return (
                        <Card
                            key={index}
                            className={cn(
                                "border-l-4 transition-all hover:shadow-md",
                                isUrgent && "bg-red-50/50 border-l-red-500",
                                isWarning && "bg-amber-50/50 border-l-amber-500",
                                isPositive && "bg-green-50/50 border-l-green-500"
                            )}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    {/* Icon */}
                                    <div className={cn(
                                        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                                        isUrgent && "bg-red-100",
                                        isWarning && "bg-amber-100",
                                        isPositive && "bg-green-100"
                                    )}>
                                        {isUrgent && <AlertCircle className="w-5 h-5 text-red-600" />}
                                        {isWarning && <Lightbulb className="w-5 h-5 text-amber-600" />}
                                        {isPositive && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <p className={cn(
                                            "text-sm font-medium leading-relaxed",
                                            isUrgent && "text-red-900",
                                            isWarning && "text-amber-900",
                                            isPositive && "text-green-900"
                                        )}>
                                            {insight.message}
                                        </p>

                                        {/* Action Button */}
                                        {insight.action && (
                                            <Link href={insight.action.href}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={cn(
                                                        "mt-2 px-0 h-auto font-semibold",
                                                        isUrgent && "text-red-700 hover:text-red-800 hover:bg-red-100",
                                                        isWarning && "text-amber-700 hover:text-amber-800 hover:bg-amber-100",
                                                        isPositive && "text-green-700 hover:text-green-800 hover:bg-green-100"
                                                    )}
                                                >
                                                    {insight.action.label}
                                                    <ArrowRight className="w-4 h-4 ml-1" />
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
