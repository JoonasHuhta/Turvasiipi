import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format } from "date-fns";
import { fi } from "date-fns/locale";
import { useLanguage } from "@/context/LanguageContext";

interface IntensityTrendProps {
    data: {
        date: string;
        avgIntensity: number;
    }[];
}

export function IntensityTrend({ data }: IntensityTrendProps) {
    const { t } = useLanguage();

    if (data.length === 0) return null;

    // Format data for display
    const formattedData = data.map(item => ({
        ...item,
        displayDate: format(new Date(item.date), 'd.M.', { locale: fi })
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                    📈 {t('overview.charts.intensity_title')}
                </CardTitle>
                <p className="text-sm text-slate-500">
                    {t('overview.charts.intensity_desc')}
                </p>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="displayDate"
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis
                            domain={[1, 5]}
                            ticks={[1, 2, 3, 4, 5]}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px'
                            }}
                            formatter={(value: number) => [value.toFixed(1), t('overview.charts.intensity_label')]}
                            labelFormatter={(label: string) => `${t('overview.charts.intensity_day')} ${label}`}
                        />
                        <Line
                            type="monotone"
                            dataKey="avgIntensity"
                            stroke="#ef4444"
                            strokeWidth={3}
                            dot={{ fill: '#ef4444', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>

                {/* Summary */}
                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{t('overview.charts.intensity_avg')}</span>
                        <span className="font-semibold text-slate-900">
                            {(data.reduce((sum, d) => sum + d.avgIntensity, 0) / data.length).toFixed(1)} / 5.0
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-slate-600">{t('overview.charts.intensity_highest')}</span>
                        <span className="font-semibold text-red-600">
                            {Math.max(...data.map(d => d.avgIntensity)).toFixed(1)} / 5.0
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-slate-600">{t('overview.charts.intensity_lowest')}</span>
                        <span className="font-semibold text-green-600">
                            {Math.min(...data.map(d => d.avgIntensity)).toFixed(1)} / 5.0
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
