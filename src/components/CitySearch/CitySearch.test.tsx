import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import CitySearch from './CitySearch';

describe('CitySearch', () => {
    const mockOnAddCity = jest.fn();

    beforeEach(() => {
        mockOnAddCity.mockClear();
        render(<CitySearch onAddCity={mockOnAddCity} />);
    });

    it('renders input and button', () => {
        expect(screen.getByPlaceholderText('Введіть назву міста')).toBeInTheDocument();
        expect(screen.getByText('Додати місто')).toBeInTheDocument();
    });

    it('calls onAddCity with the correct city name when form is submitted', () => {
        const input = screen.getByPlaceholderText('Введіть назву міста');
        const button = screen.getByText('Додати місто');

        fireEvent.change(input, { target: { value: 'Kyiv' } });
        fireEvent.click(button);

        expect(mockOnAddCity).toHaveBeenCalledWith('Kyiv');
        expect(input).toHaveValue('');
    });

    it('does not call onAddCity when input is empty', () => {
        const button = screen.getByText('Додати місто');
        fireEvent.click(button);

        expect(mockOnAddCity).not.toHaveBeenCalled();
    });
});