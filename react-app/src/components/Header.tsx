import { Link } from 'react-router-dom';
import { useState, type FocusEvent } from 'react';
import React from 'react';
import briefcaseIcon from '../assets/images/briefcase.svg';
import userIcon from '../assets/images/user.svg';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectAuth, signOut } from '../app/features/auth/authSlice';

const Header: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth); // ← отримаємо user з Redux

  const toggleDropdown = (): void => {
    setDropdownVisible((prev) => !prev);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>): void => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setDropdownVisible(false);
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link data-test-id="header-logo" to="/" className="header__logo">
          Travel App
        </Link>

        <nav data-test-id="header-nav" className="header__nav">
          <ul className="nav-header__list">
            <li className="nav-header__item" title="Bookings">
              <Link
                data-test-id="header-bookings-link"
                to="/bookings"
                className="nav-header__inner"
              >
                <span className="visually-hidden">Bookings</span>
                <img src={briefcaseIcon} alt="bookings" />
              </Link>
            </li>

            <li className="nav-header__item" title="Profile">
              <div
                data-test-id="header-profile-nav"
                className="nav-header__inner profile-nav"
                tabIndex={0}
                onClick={toggleDropdown}
                onBlur={handleBlur}
              >
                <span className="visually-hidden">Profile</span>
                <img src={userIcon} alt="profile" />
                {isDropdownVisible && (
                  <ul
                    data-test-id="header-profile-nav-list"
                    className="profile-nav__list"
                  >
                    <li
                      data-test-id="header-profile-nav-username"
                      className="profile-nav__item"
                    >
                      {user?.fullName || 'Guest'}
                    </li>
                    <li className="profile-nav__item">
                      <Link
                        data-test-id="header-profile-nav-sign-out"
                        to="/sign-in"
                        className="profile-nav__sign-out button"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
