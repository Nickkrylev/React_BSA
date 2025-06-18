import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAppSelector } from '../app/hooks';
import { selectAuth } from '../app/features/auth/authSlice';

interface Booking {
  id: string;
  userId: string;
  tripId: string;
  guests: number;
  date: string;
  createdAt: string;
  totalPrice: number;
  trip: {
    title: string;
    duration: number;
    price: number;
  };
}

const BookingsPage: React.FC = () => {
  const { user } = useAppSelector(selectAuth);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem('bookings');
    if (stored && user?.id) {
      const parsed = JSON.parse(stored) as Booking[];
      const filtered = parsed.filter((b) => b.userId === user.id);
      const sorted = filtered.sort((a, b) => a.date.localeCompare(b.date));
      setBookings(sorted);
    }
  }, [user]);

  const handleCancel = (id: string) => {
    const updated = bookings.filter((booking) => booking.id !== id);
    setBookings(updated);
    const allStored = sessionStorage.getItem('bookings');
    if (allStored) {
      const allParsed = JSON.parse(allStored) as Booking[];
      const newStored = allParsed.filter((b) => b.id !== id);
      sessionStorage.setItem('bookings', JSON.stringify(newStored));
    }
  };

  const formatDate = (iso: string) => iso.split('T')[0];

  return (
    <>
      <Header />
      <main className="bookings-page">
        <h1 className="visually-hidden">Travel App</h1>
        {bookings.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>No bookings yet</p>
        ) : (
          <ul className="bookings__list">
            {bookings.map((booking) => (
              <li key={booking.id} data-test-id="booking" className="booking">
                <h3 data-test-id="booking-title" className="booking__title">
                  {booking.trip.title}
                </h3>
                <span data-test-id="booking-guests" className="booking__guests">
                  {booking.guests} guests
                </span>
                <span data-test-id="booking-date" className="booking__date">
                  {formatDate(booking.date)}
                </span>
                <span data-test-id="booking-total" className="booking__total">
                  ${booking.totalPrice}
                </span>
                <button
                  data-test-id="booking-cancel"
                  className="booking__cancel"
                  title="Cancel booking"
                  onClick={() => handleCancel(booking.id)}
                >
                  <span className="visually-hidden">Cancel booking</span>
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BookingsPage;
