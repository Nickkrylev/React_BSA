// tripsAPI.ts
import axios from 'axios';
import type { Trip } from './types';


const API_URL = 'https://travel-app-api.up.railway.app/api/v1/trips';

export const fetchTrips = async (): Promise<Trip[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchTripById = async (tripId: string): Promise<Trip> => {
  const response = await axios.get(`${API_URL}/${tripId}`);
  return response.data;
};
