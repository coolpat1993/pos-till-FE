import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="contentSpreadX navbar">
      <Link to="/settings">Settings</Link>
      <Link to="/tables">Tables</Link>
      <Link to="/checkout">Checkout</Link>
      <Link to="/staffLogin">staff log</Link>
    </nav>
  );
};

export default Nav;
