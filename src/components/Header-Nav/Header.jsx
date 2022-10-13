import React, { useContext } from 'react';
import { UserAuth } from '../context/AuthContext';
import { StaffContext } from '../StaffLogin/LoggedInStaff';
const Header = () => {
  const { user } = UserAuth();
  const { loggedInUser } = useContext(StaffContext);
  let staffUsername = loggedInUser.username

  return (
    <nav className="center">
      <h1>POS-Till</h1>
      {user ? <h2>you are currently logged in as {user?.email}</h2> : null}
      <h3>staff logged in {staffUsername}</h3>

    </nav>
  );
};

export default Header;
