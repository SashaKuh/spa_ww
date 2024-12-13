import React from 'react';
import CityCard from '../CityCard/CityCard';
import { City, WeatherData } from '../../interface/weather';

interface CityListProps {
        cities: City[];
        weatherData: { [key: string]: WeatherData };
        onRemove: (cityId: string) => void;
        onRefresh: (city: City) => void;
}

const CityList: React.FC<CityListProps> = ({ cities, weatherData, onRemove, onRefresh }) => (
        <div className="city-cards-container">
                {cities.map(city => (
                        <CityCard
                                key={city.id}
                                city={city}
                                weatherData={weatherData[city.id]}
                                onRemove={onRemove}
                                onRefresh={onRefresh}
                        />
                ))}
        </div>
);

export default CityList;