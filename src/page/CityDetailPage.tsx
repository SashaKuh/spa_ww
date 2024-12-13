import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/store';
import {
  fetchWeatherByCityId,
  fetchHourlyForecastByCityId
} from '../redux/features/weatherSlice';
import CurrentWeather from '../components/CurrentWeather/CurrentWeather';
import TemperatureChart from '../components/TemperatureChart/TemperatureChart';
import '../components/CityDetail/CityDetail.scss';

const CityDetailPage: React.FC = () => {
        const { cityId } = useParams<{ cityId: string }>();
        const navigate = useNavigate();

        const dispatch = useAppDispatch();

        const { weatherData, hourlyForecasts } = useAppSelector(state => state.weather);

        const weather = weatherData[cityId || ''];
        const forecast = hourlyForecasts[cityId || ''] || [];

        useEffect(() => {
                if (cityId) {
                        dispatch(fetchWeatherByCityId(cityId));
                        dispatch(fetchHourlyForecastByCityId(cityId));
                }
        }, [cityId, dispatch]);

        if (!weather) {
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