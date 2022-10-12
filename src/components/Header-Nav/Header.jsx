import React from 'react';
import { UserAuth } from '../context/AuthContext';
const Header = () => {
  const { user } = UserAuth();

  return (
    <nav className="center">
      <h1>POS-Till</h1>
      {user ? <h3>you are currently logged in as {user?.email}</h3> : null}

    </nav>
  );
};

export default Header;
