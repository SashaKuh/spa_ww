import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import CityCard from './CityCard';
import { City, WeatherData } from '../../interface/weather';

const mockCity: City = {
    id: '1',
    name: 'Kyiv',
    country: 'Ukraine',
};

const mockWeatherData: WeatherData = {
    id: '1',
    cityName: 'Kyiv',
    temperature: 25,
    description: 'Sunny',
    feelsLike: 27,
    humidity: 60,
    windSpeed: 5,
};

const mockOnRemove = jest.fn();
const mockOnRefresh = jest.fn();

const renderCityCard = () => {
    return render(
        <Router>
            <CityCard
                city={mockCity}
                weatherData={mockWeatherData}
                onRemove={mockOnRemove}
                onRefresh={mockOnRefresh}
            />
        </Router>
    );
};

describe('CityCard', () => {
    it('renders the city name and weather data', () => {
        renderCityCard();
        expect(screen.getByText('Kyiv')).toBeInTheDocument();
        expect(screen.getByText('Температура: 25°C')).toBeInTheDocument();
        expect(screen.getByText('Sunny')).toBeInTheDocument();
    });

    it('calls onRefresh when the refresh button is clicked', () => {
        renderCityCard();
        const refreshButton = screen.getByText('Оновити');
        fireEvent.click(refreshButton);
        expect(mockOnRefresh).toHaveBeenCalledWith(mockCity);
    });

    it('calls onRemove when the remove button is clicked', () => {
        renderCityCard();
        const removeButton = screen.getByText('Видалити');
        fireEvent.click(removeButton);
        expect(mockOnRemove).toHaveBeenCalledWith(mockCity.id);
    });

    it('navigates to the city detail page when the card is clicked', () => {
        renderCityCard();
        const card = screen.getByText('Kyiv');
        fireEvent.click(card);
        expect(window.location.pathname).toBe(`/city/${mockCity.id}`);
    });
});