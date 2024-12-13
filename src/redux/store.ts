import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../redux/features/weatherSlice';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
