// TripPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import trips from '../data/trips.json';
import { useAppSelector } from '../app/hooks';
import { selectAuth } from '../app/features/auth/authSlice';

interface Trip {
  id: string;
  title: string;
  image: string;
  price: number;
  level: string;
  duration: number;
  description: string;
}

const TripPage: React.FC = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const trip = trips.find((t) => t.id === tripId);
  const [isModalOpen, setModalOpen] = useState(false);
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState('');

  const { user } = useAppSelector(selectAuth);

  if (!trip) return <div>Trip not found</div>;

  const total = guests * trip.price;
  const today = new Date();
  const minDate = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking = {
      id: crypto.randomUUID(),
      userId: user?.id || '',
      tripId: trip.id,
      guests,
      date,
      createdAt: new Date().toISOString(),
      totalPrice: total,
      trip: {
        title: trip.title,
        duration: trip.duration,
        price: trip.price,
      },
    };

    const existing = sessionStorage.getItem('bookings');
    const bookings = existing ? JSON.parse(existing) : [];
    bookings.push(newBooking);
    sessionStorage.setItem('bookings', JSON.stringify(bookings));

    setModalOpen(false);
    navigate('/bookings');
  };

  return (
    <>
      <Header />
      <main className="trip-page">
        <h1 className="visually-hidden">Travel App</h1>
        <div className="trip">
          <img
            data-test-id="trip-details-image"
            src={trip.image}
            className="trip__img"
            alt="trip photo"
          />
          <div className="trip__content">
            <div className="trip-info">
              <h3 data-test-id="trip-details-title" className="trip-info__title">
                {trip.title}
              </h3>
              <div className="trip-info__content">
                <span data-test-id="trip-details-duration" className="trip-info__duration">
                  <strong>{trip.duration}</strong> days
                </span>
                <span data-test-id="trip-details-level" className="trip-info__level">
                  {trip.level}
                </span>
              </div>
            </div>
            <div data-test-id="trip-details-description" className="trip__description">
              {trip.description}
            </div>
            <div className="trip-price">
              <span>Price</span>
              <strong data-test-id="trip-details-price-value" className="trip-price__value">
                ${trip.price}
              </strong>
            </div>
            <button
              data-test-id="trip-details-button"
              className="trip__button button"
              onClick={() => setModalOpen(true)}
            >
              Book a trip
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {isModalOpen && (
        <div className="modal">
          <div data-test-id="book-trip-popup" className="book-trip-popup">
            <button
              data-test-id="book-trip-popup-close"
              className="book-trip-popup__close"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <form
              className="book-trip-popup__form"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="trip-info">
                <h3 data-test-id="book-trip-popup-title" className="trip-info__title">
                  {trip.title}
                </h3>
                <div className="trip-info__content">
                  <span data-test-id="book-trip-popup-duration" className="trip-info__duration">
                    <strong>{trip.duration}</strong> days
                  </span>
                  <span data-test-id="book-trip-popup-level" className="trip-info__level">
                    {trip.level}
                  </span>
                </div>
              </div>
              <label className="input">
                <span className="input__heading">Date</span>
                <input
                  data-test-id="book-trip-popup-date"
                  name="date"
                  type="date"
                  value={date}
                  min={minDate}
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label className="input">
                <span className="input__heading">Number of guests</span>
                <input
                  data-test-id="book-trip-popup-guests"
                  name="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={guests}
                  required
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
              </label>
              <span className="book-trip-popup__total">
                Total:
                <output
                  data-test-id="book-trip-popup-total-value"
                  className="book-trip-popup__total-value"
                >
                  ${total}
                </output>
              </span>
              <button
                data-test-id="book-trip-popup-submit"
                className="button"
                type="submit"
              >
                Book a trip
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TripPage;