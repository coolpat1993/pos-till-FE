import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
const Header = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  return (
    <nav className="center">
      <h1>POS-Till</h1>
      {console.log(user, '<<user')}
      <h3>you are currently logged in as {user.email}</h3>
    </nav>
  );
};

export default Header;
