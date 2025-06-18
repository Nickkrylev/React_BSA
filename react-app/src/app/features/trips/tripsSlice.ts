// tripsSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Trip } from './types';
import { fetchTrips, fetchTripById } from './tripsAPI';

interface TripsState {
  trips: Trip[];
  currentTrip: Trip | null;
  loading: boolean;
  error: string | null;
}

const initialState: TripsState = {
  trips: [],
  currentTrip: null,
  loading: false,
  error: null,
};

export const getTrips = createAsyncThunk('trips/getTrips', async (_, thunkAPI) => {
  try {
    return await fetchTrips();
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch trips');
  }
});

export const getTripById = createAsyncThunk('trips/getTripById', async (tripId: string, thunkAPI) => {
  try {
    return await fetchTripById(tripId);
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch trip details');
  }
});

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getTripById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTripById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTrip = action.payload;
      })
      .addCase(getTripById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tripsSlice.reducer;
