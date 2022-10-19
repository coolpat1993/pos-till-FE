import React, { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { StaffContext } from '../StaffLogin/LoggedInStaff';
import Logo from '../../images/logo.png';

const Header = () => {
  const { user } = UserAuth();
  const { loggedInUser } = useContext(StaffContext);
  const { setLoggedInUser } = useContext(StaffContext);

  let staffUsername = loggedInUser.username;

  const staffLogIn = () => {
    setLoggedInUser('');
  };

  return (
    <nav className="topbar navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <img className="topbar-img" src={Logo}></img>

        {user ? (
          <span className="navbar-text">Logged in as {user?.email}</span>
        ) : null}
        <span className="navbar-text">Employee: {staffUsername}</span>

        <Link
          className="staff-login-nav"
          id="dropdown-basic-button"
          to="/staffLogin"
          onClick={() => {
            staffLogIn();
          }}
        >
          Staff Login
        </Link>

        <NavDropdown id="dropdown-basic-button" title="Menu">
          <Dropdown.Item href="/">Items</Dropdown.Item>
          <Dropdown.Item href="/account">Account settings</Dropdown.Item>
          <Dropdown.Item href="/CreateUsers">Create user</Dropdown.Item>
          <Dropdown.Item href="/items">Add items</Dropdown.Item>
          <Dropdown.Item href="/tablePlan">Table Plan</Dropdown.Item>
        </NavDropdown>
      </div>
    </nav>
  );
};

export default Header;
