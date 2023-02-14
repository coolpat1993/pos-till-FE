import React, { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { StaffContext } from '../StaffLogin/LoggedInStaff';
import Logo from '../../images/logo.png';
import Login from '../../images/login.png';

const Header = () => {
  const { user } = UserAuth();
  const { loggedInUser } = useContext(StaffContext);
  const { setLoggedInUser } = useContext(StaffContext);

  let staffUsername = loggedInUser.username;

  const staffLogIn = () => {
    setLoggedInUser('');
  };

  return (
    <nav className="header">
      <div className="header__item header__item--1">
        <img className="header__logo" alt="header logo" src={Logo}></img>
      </div>
      <div className="header__item header__item--2">
        {console.log(loggedInUser, '<< user')}
        {loggedInUser ? (
          <span className="header__text">Employee: {staffUsername}</span>
        ) : null}
      </div>
      <div className="header__item header__item--3">
        {user ? (
          <Link
            id="dropdown-basic-button"
            to="/staffLogin"
            onClick={() => {
              staffLogIn();
            }}
          >
            <img
              className="header__staff-img"
              alt="Staff login"
              src={Login}
            ></img>
          </Link>
        ) : null}
      </div>
      <div className="header__item header__item--4">
        <NavDropdown id="dropdown-basic-button" title="Menu">
          <Dropdown.Item className="header__dropdown" href="/account">
            Account settings
          </Dropdown.Item>
          <Dropdown.Item className="header__dropdown" href="/CreateUsers">
            Create user
          </Dropdown.Item>
          <Dropdown.Item className="header__dropdown" href="/items">
            Add items
          </Dropdown.Item>
          <Dropdown.Item className="header__dropdown" href="/tablePlan">
            Table Plan
          </Dropdown.Item>
        </NavDropdown>
      </div>
    </nav>
  );
};

export default Header;
