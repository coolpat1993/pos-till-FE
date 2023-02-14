import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {}
  };

  return (
    <div className="account">
      <h2 className="heading-2">Account</h2>
      <p>
        User Email:
        <br />
        {user && user.email}
      </p>
      <button className="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Account;
