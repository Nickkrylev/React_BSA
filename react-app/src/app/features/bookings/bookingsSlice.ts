// bookingsSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { BookingsState } from './types';
import { fetchBookings, cancelBooking, bookTrip } from './bookingsAPI';

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

export const getBookings = createAsyncThunk('bookings/fetchAll', async (_, thunkAPI) => {
  try {
    return await fetchBookings();
  } catch (e) {
    return thunkAPI.rejectWithValue('Failed to load bookings');
  }
});

export const cancelBookingById = createAsyncThunk('bookings/cancel', async (bookingId: string, thunkAPI) => {
  try {
    await cancelBooking(bookingId);
    return bookingId;
  } catch (e) {
    return thunkAPI.rejectWithValue('Failed to cancel booking');
  }
});

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(cancelBookingById.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(b => b.id !== action.payload);
      });
  },
});

export default bookingsSlice.reducer;