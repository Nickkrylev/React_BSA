import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
 import tripsReducer from './features/trips/tripsSlice';
 import bookingsReducer from './features/bookings/bookingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
     trips: tripsReducer,       // 🔜 додай після створення tripsSlice
     bookings: bookingsReducer, // 🔜 додай після створення bookingsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
