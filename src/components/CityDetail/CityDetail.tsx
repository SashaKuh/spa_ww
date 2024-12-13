// src/components/CityDetail/CityDetail.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { fetchWeatherByCity, fetchHourlyForecast } from '../../redux/features/weatherSlice';
import { WeatherData, HourlyForecast } from '../../interface/weather';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import TemperatureChart from '../TemperatureChart/TemperatureChart';

const CityDetailPage: React.FC = () => {
    const { cityId } = useParams<{ cityId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { cities, weatherData, hourlyForecasts } = useAppSelector((state) => state.weather);
    const city = cities.find(c => c.id === cityId);
    const weather: WeatherData | undefined = city ? weatherData[city.id] : undefined;
    const forecast: HourlyForecast[] = city ? hourlyForecasts[city.id] : [];

    useEffect(() => {
        if (city) {
            dispatch(fetchWeatherByCity(city));
            dispatch(fetchHourlyForecast(city));
        }
    }, [city, dispatch]);

    if (!city || !weather) {
        return <div>Місто не знайдено або дані завантажуються...</div>;
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="city-detail-page">
            <div className="header">
                <button className="back-button" onClick={handleGoBack}>
                    Назад
                </button>
                <h1 className='city-title'>{weather.cityName} - Детальна інформація</h1>
            </div>
            <CurrentWeather weather={weather} />
            <TemperatureChart data={forecast} />
        </div>
    );
};

export default CityDetailPage;