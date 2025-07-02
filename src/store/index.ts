import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from './reducers/stockSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;