import React, { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header_Auth';
import Footer from '../components/Footer';
import { useAppDispatch } from '../app/hooks';
import { signIn } from '../app/features/auth/authSlice';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password.length >= 3 && password.length <= 20) {
      try {
        await dispatch(signIn({ email, password })).unwrap();
        navigate('/');
      } catch (error) {
        alert('Sign in failed');
      }
    } else {
      alert('Please enter valid credentials.');
    }
  };

  return (
    <>
      <Header />
      <main className="sign-in-page">
        <h1 className="visually-hidden">Travel App</h1>
        <form className="sign-in-form" autoComplete="off" onSubmit={handleSubmit}>
          <h2 className="sign-in-form__title">Sign In</h2>

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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button data-test-id="auth-submit" className="button" type="submit">
            Sign In
          </button>
        </form>

        <span>
          Don't have an account?
          <Link
            data-test-id="auth-sign-up-link"
            to="/sign-up"
            className="sign-in-form__link"
          >
            Sign Up
          </Link>
        </span>
      </main>
      <Footer />
    </>
  );
};

export default SignInPage;
