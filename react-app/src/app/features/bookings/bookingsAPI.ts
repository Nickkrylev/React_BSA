// bookingsAPI.ts
import axios from 'axios';
import type { BookingRequest, BookingResponse } from './types';

const API_URL = 'https://travel-app-api.up.railway.app/api/v1/bookings';

export const fetchBookings = async (): Promise<BookingResponse[]> => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const cancelBooking = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const bookTrip = async (data: BookingRequest): Promise<BookingResponse> => {
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};
