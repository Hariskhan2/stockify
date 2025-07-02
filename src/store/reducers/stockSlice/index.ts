import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  selectedStock: string;
  timeRange: '1week' | '1month' | '3months';
}

const initialState: PreferencesState = {
  selectedStock: 'AAPL',
  timeRange: '1month',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setSelectedStock: (state, action: PayloadAction<string>) => {
      state.selectedStock = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<'1week' | '1month' | '3months'>) => {
      state.timeRange = action.payload;
    },
  },
});

export const { setSelectedStock, setTimeRange } = preferencesSlice.actions;

export default preferencesSlice.reducer;