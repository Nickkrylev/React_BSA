import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { FocusEvent } from 'react';
import React from 'react';
import briefcaseIcon from '../assets/images/briefcase.svg';
import userIcon from '../assets/images/user.svg';

const Header: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = (): void => {
    setDropdownVisible((prev) => !prev);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>): void => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setDropdownVisible(false);
    }
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link data-test-id="header-logo" to="/" className="header__logo">
          Travel App
        </Link>

     
      </div>
    </header>
  );
};

export default Header;
