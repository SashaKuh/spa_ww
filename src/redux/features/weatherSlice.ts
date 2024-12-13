import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeatherService } from '../../services/weatherService';
import {
    City,
    WeatherState,
    WeatherErrorResponse,
    WeatherData,
    HourlyForecast
} from '../../interface/weather';

export const fetchWeatherByCity = createAsyncThunk<
    { city: City; weather: WeatherData },
    City,
    { rejectValue: WeatherErrorResponse }
>(
    'weather/fetchWeatherByCity',
    async (city, { rejectWithValue }) => {
        try {
            const weather = await WeatherService.fetchWeatherByCity(city.name);
            return { city, weather };
        } catch (error) {
            return rejectWithValue({
                message: `Помилка завантаження погоди ${error}`,
                code: 500
            });
        }
    }
);

export const fetchHourlyForecast = createAsyncThunk<
    { cityId: string; forecast: HourlyForecast[] },
    City,
    { rejectValue: WeatherErrorResponse }
>(
    'weather/fetchHourlyForecast',
    async (city, { rejectWithValue }) => {
        try {
            const forecast = await WeatherService.fetchHourlyForecast(city.name);
            return { cityId: city.id, forecast };
        } catch (error) {
            return rejectWithValue({
                message: `Помилка завантаження погодинного прогнозу ${error}`,
                code: 500
            });
        }
    }
);

export const fetchWeatherByCityId = createAsyncThunk<
    { cityId: string; weather: WeatherData },
    string,
    { rejectValue: WeatherErrorResponse }
>(
    'weather/fetchWeatherByCityId',
    async (cityId, { rejectWithValue }) => {
        try {
            const weather = await WeatherService.fetchWeatherByCityId(cityId);
            return { cityId, weather };
        } catch (error) {
            return rejectWithValue({
                message: `Помилка завантаження погоди: ${error}`,
                code: 500
            });
        }
    }
);

export const fetchHourlyForecastByCityId = createAsyncThunk<
    { cityId: string; forecast: HourlyForecast[] },
    string,
    { rejectValue: WeatherErrorResponse }
>(
    'weather/fetchHourlyForecastByCityId',
    async (cityId, { rejectWithValue }) => {
        try {
            const forecast = await WeatherService.fetchHourlyForecastByCityId(cityId);
            return { cityId, forecast };
        } catch (error) {
            return rejectWithValue({
                message: `Помилка завантаження прогнозу: ${error}`,
                code: 500
            });
        }
    }
);

const initialState: WeatherState = {
    cities: [],
    weatherData: {},
    hourlyForecasts: {},
    loading: false,
    error: null
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        addCity: (state, action: PayloadAction<City>) => {
            const cityExists = state.cities.some(city => city.id === action.payload.id);
            if (!cityExists) {
                state.cities.push(action.payload);
                localStorage.setItem('savedCities', JSON.stringify(state.cities));
            }
        },
        removeCity: (state, action: PayloadAction<string>) => {
            state.cities = state.cities.filter(city => city.id !== action.payload);
            delete state.weatherData[action.payload];
            delete state.hourlyForecasts[action.payload];
            localStorage.setItem('savedCities', JSON.stringify(state.cities));
        },
        loadSavedCities: (state) => {
            const savedCities = localStorage.getItem('savedCities');
            if (savedCities) {
                state.cities = JSON.parse(savedCities);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherByCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
                const { city, weather } = action.payload;
                state.weatherData[city.id] = weather;
                state.loading = false;
            })
            .addCase(fetchWeatherByCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || null;
            })
            .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
                const { cityId, forecast } = action.payload;
                state.hourlyForecasts[cityId] = forecast;
            })
            .addCase(fetchWeatherByCityId.fulfilled, (state, action) => {
                const { cityId, weather } = action.payload;
                state.weatherData[cityId] = weather;
                const cityExists = state.cities.some(city => city.id === cityId);
                if (!cityExists) {
                    state.cities.push({
                        id: cityId,
                        name: weather.cityName,
                        country: ''
                    });
                }
            })
            .addCase(fetchHourlyForecastByCityId.fulfilled, (state, action) => {
                const { cityId, forecast } = action.payload;
                state.hourlyForecasts[cityId] = forecast;
            });
    }
});

export const {
    addCity,
    removeCity,
    loadSavedCities
} = weatherSlice.actions;

export default weatherSlice.reducer;