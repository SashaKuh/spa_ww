import React from 'react';
import { City, WeatherData } from '../../interface/weather';
import { useNavigate } from 'react-router-dom';
import './CityCard.scss';

interface CityCardProps {
        city: City;
        weatherData: WeatherData;
        onRemove: (cityId: string) => void;
        onRefresh: (city: City) => void;
}

const CityCard: React.FC<CityCardProps> = ({
        city,
        weatherData,
        onRemove,
        onRefresh
}) => {
        const navigate = useNavigate();
    
        if (!weatherData) return null;
    
        const handleCardClick = () => {
                navigate(`/city/${city.id}`);
        };
    
        return (
                <div className="city-card" onClick={handleCardClick}>
                        <div className="city-card__header">
                                <h2>{weatherData.cityName}</h2>
                                <div className="city-card__actions">
                                        <button
                                                className="city-card__button city-card__button--refresh"
                                                onClick={(e) => {
                                                        e.stopPropagation();
                                                        onRefresh(city);
                                                }}
                                        >
                                                Оновити
                                        </button>
                                        <button
                                                className="city-card__button city-card__button--remove"
                                                onClick={(e) => {
                                                        e.stopPropagation();
                                                        onRemove(city.id);
                                                }}
                                        >
                                                Видалити
                                        </button>
                                </div>
                        </div>
                        <div className="city-card__main-info">
                                <p>Температура: {weatherData.temperature}°C</p>
                                <p>{weatherData.description}</p>
                        </div>
                </div>
        );
};

export default CityCard;