import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks'; // кастомний хук для useDispatch
import { signUp } from '../app/features/auth/authSlice';
import Header from '../components/Header_Auth';
import Footer from '../components/Footer';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fullName && email && password.length >= 3 && password.length <= 20) {
      try {
        await dispatch(signUp({ fullName, email, password })).unwrap();
        navigate('/');
      } catch (error) {
        alert('Sign up failed');
      }
    } else {
      alert('Please fill all fields correctly.');
    }
  };

  return (
    <>
      <Header />
      <main className="sign-up-page">
        <h1 className="visually-hidden">Travel App</h1>
        <form className="sign-up-form" autoComplete="off" onSubmit={handleSubmit}>
          <h2 className="sign-up-form__title">Sign Up</h2>

          <label className="input">
            <span className="input__heading">Full name</span>
            <input
              data-test-id="auth-full-name"
              name="full-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>

          <label className="input">
            <span className="input__heading">Email</span>
            <input
              data-test-id="auth-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input">
            <span className="input__heading">Password</span>
            <input
              data-test-id="auth-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button data-test-id="auth-submit" className="button" type="submit">
            Sign Up
          </button>
        </form>

        <span>
          Already have an account?
          <Link data-test-id="auth-sign-in-link" to="/sign-in" className="sign-up-form__link">
            Sign In
          </Link>
        </span>
      </main>
      <Footer />
    </>
  );
};

export default SignUpPage;
