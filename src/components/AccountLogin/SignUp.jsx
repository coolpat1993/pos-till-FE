import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';
import Account from './Account';
import SignIn from './SignIn';
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
      navigate('/account');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <div>
        <h1>Sign up</h1>
        {password !== confirmedPass && <p>Passwords do not match</p>}
        <p>
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" />
        </div>
        <div>
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div>
          <label>Confirm password</label>
          <input
            onChange={(e) => setConfirmedPass(e.target.value)}
            type="password"
          />
        </div>
        <button disabled={password !== confirmedPass || password.length === 0}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
