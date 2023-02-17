import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { StaffContext } from '../StaffLogin/LoggedInStaff';
import Logo from '../../images/logo.png';
import Login from '../../images/login.png';

const Header = () => {
  const { user } = UserAuth();
  const { loggedInUser } = useContext(StaffContext);
  const { setLoggedInUser } = useContext(StaffContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
        <div className="header__dropdown">
          <button
            className="button header__dropdown--dropbtn "
            onClick={toggleMenu}
          >
            Menu
          </button>
          {menuOpen && (
            <div className="header__dropdown-content">
              <Link className="header__dropdown--link" to="/account">
                Account settings
              </Link>
              <Link className="header__dropdown--link" to="/CreateUsers">
                Create user
              </Link>
              <Link className="header__dropdown--link" to="/items">
                Add items
              </Link>
              <Link className="header__dropdown--link" to="/tablePlan">
                Table Plan
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
