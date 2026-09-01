import { useDispatch, useSelector } from 'react-redux';

import userReducer from '@features/User.Slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: { user: userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
