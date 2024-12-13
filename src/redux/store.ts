import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../redux/features/weatherSlice';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
});

// Визначення типів
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Імпорт хуків з React-Redux
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Створення типізованих хуків
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;