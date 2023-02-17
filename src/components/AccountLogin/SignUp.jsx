import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPass, setConfirmedPass] = useState('');
  const [error, setError] = useState('');

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/staffLogin');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <div className="signin">
        <div>
          <div className="signin__text">
            <h2 className="heading-2">Sign up for an account</h2>
            <p className="signin__text--p">
              Already have an account? <Link to="/">Sign in</Link>
            </p>
          </div>
          <form className="signin__form" onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              className="signin__form--box"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <label>Password</label>
            <input
              className="signin__form--box"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <label>Confirm password</label>
            <input
              className="signin__form--box"
              onChange={(e) => setConfirmedPass(e.target.value)}
              type="password"
            />

            <button
              className="button"
              disabled={password !== confirmedPass || password.length === 0}
            >
              Sign Up
            </button>
            {error === 'Firebase: Error (auth/email-already-in-use).' ? (
              <p className="u-margin-top-small">
                Email address already in use.
              </p>
            ) : null}
          </form>
        </div>
      </div>
      {password !== confirmedPass && (
        <p className="signin__error">Passwords do not match</p>
      )}
      {console.log(error)}
    </div>
  );
};

export default SignUp;
