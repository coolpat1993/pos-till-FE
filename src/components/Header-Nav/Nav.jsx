import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StaffContext } from '../StaffLogin/LoggedInStaff';

const Nav = () => {
  const { setLoggedInUser } = useContext(StaffContext);
  const staffLogIn = () => {
    setLoggedInUser('');
  };

  return (
    <nav className="navbar navbar-expand-lg  navbar-dark nav-js">
      <div className="main_banner sticky-top">
        <Link className="navbar-brand" to="/settings">
          Settings
        </Link>
        <Link className="navbar-brand" to="/tables">
          Tables
        </Link>
        <Link className="navbar-brand" to="/checkout">
          Checkout
        </Link>
        <Link
          className="navbar-brand"
          to="/staffLogin"
          onClick={() => {
            staffLogIn();
          }}
        >
          staff log
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
