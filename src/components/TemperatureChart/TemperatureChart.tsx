import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { HourlyForecast } from '../../interface/weather';

interface TemperatureChartProps {
        data: HourlyForecast[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
        const chartData = data.map(item => ({
                time: new Date(item.time).getHours(),
                temperature: item.temperature
        }));

        return (
                <section className="hourly-forecast">
                        <h2>Графік температури на поточний день</h2>
                        <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData}>
                                        <XAxis dataKey="time" label={{ value: 'Година', position: 'insideBottomRight', offset: -5 }} />
                                        <YAxis label={{ value: 'Температура °C', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
                                </LineChart>
                        </ResponsiveContainer>
                </section>
        );
};

export default TemperatureChart;