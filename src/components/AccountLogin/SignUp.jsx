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
    <div className="col-4">
      <div className="m-3">
        <h1>Sign up</h1>
        {password !== confirmedPass && <p>Passwords do not match</p>}
        <p>
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="m-3">
          <label>Email Address</label>
          <input
            className="order-box"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="m-3">
          <label>Password</label>
          <input
            className="order-box"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className="m-3">
          <label>Confirm password</label>
          <input
            className="order-box"
            onChange={(e) => setConfirmedPass(e.target.value)}
            type="password"
          />
        </div>
        <div className="m-3">
          <button
            className="btn btn-light"
            disabled={password !== confirmedPass || password.length === 0}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
