import { useContext } from "react";
import { Link } from "react-router-dom";
import { StaffContext } from "../StaffLogin/LoggedInStaff";


const Nav = () => {
  const { setLoggedInUser } = useContext(StaffContext);
  const staffLogIn = () => {
    setLoggedInUser('')
  }


  return (
    <nav className="contentSpreadX navbar">
      <Link to="/settings">Settings</Link>
      <Link to="/tables">Tables</Link>
      <Link to="/checkout">Checkout</Link>
      <Link to="/staffLogin" onClick={() => {
        staffLogIn()
      }}>staff log</Link>


    </nav>
  );
};

export default Nav;
