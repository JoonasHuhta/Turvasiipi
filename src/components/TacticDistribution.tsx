import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useLanguage } from "@/context/LanguageContext";

interface TacticDistributionProps {
    data: {
        name: string;
        count: number;
        color: string;
    }[];
}

export function TacticDistribution({ data }: TacticDistributionProps) {
    const { t } = useLanguage();

    if (data.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                    📊 {t('overview.charts.tactics_title')}
                </CardTitle>
                <p className="text-sm text-slate-500">
                    {t('overview.charts.tactics_desc')}
                </p>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                        <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px'
                            }}
                            formatter={(value: number | undefined) => value !== undefined ? [`${value} kertaa`, 'Määrä'] : ['', '']}
                        />
                        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

                {/* Legend */}
                <div className="mt-4 space-y-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-sm"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-slate-700">{item.name}</span>
                            </div>
                            <span className="font-semibold text-slate-900">
                                {item.count} {item.count === 1 ? t('overview.charts.tactics_count_singular') : t('overview.charts.tactics_count_plural')}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
