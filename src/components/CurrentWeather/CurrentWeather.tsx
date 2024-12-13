import React from 'react';
import { WeatherData } from '../../interface/weather';

interface CurrentWeatherProps {
        weather: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => (
        <section className="current-weather">
                <h2>Поточна погода</h2>
                <p>Температура: {weather.temperature}°C</p>
                <p>Відчувається як: {weather.feelsLike}°C</p>
                <p>Опис: {weather.description}</p>
                <p>Вологість: {weather.humidity}%</p>
                <p>Швидкість вітру: {weather.windSpeed} м/с</p>
        </section>
);

export default CurrentWeather;