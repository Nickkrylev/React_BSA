// types.ts
export interface BookingResponse {
  id: string;
  tripId: string;
  userId: string;
  date: string;
  guests: number;
  totalPrice: number;
  createdAt: string;
  trip: {
    title: string;
    duration: number;
    price: number;
  };
}

export interface BookingRequest {
  tripId: string;
  guests: number;
  date: string;
}

export interface BookingsState {
  bookings: BookingResponse[];
  loading: boolean;
  error: string | null;
}
