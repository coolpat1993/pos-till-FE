import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/staffLogin');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="col-4">
      <div className="m-3">
        <h1>Sign in to your account</h1>
        <p>
          Don't have an account yet? <Link to="/signup"> Sign up</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="m-3">
          <label>Email Address</label>
          <input
            className=" order-box"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="m-3">
          <label>Password</label>
          <input
            className="vw-25 order-box "
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button className="m-3 btn btn-light">Sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
