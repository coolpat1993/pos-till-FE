import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { StaffContext } from "../StaffLogin/LoggedInStaff";
import { CiSettings } from "react-icons/ci";
const Header = () => {
  const { user } = UserAuth();
  const { loggedInUser } = useContext(StaffContext);
  const { setLoggedInUser } = useContext(StaffContext);

  let staffUsername = loggedInUser.username;

  const staffLogIn = () => {
    setLoggedInUser("");
  };

  return (
    <nav className="navbar  bg-#42C2FF d-flex  ">
      <h1>POS-Till</h1>
      {/* {user ? <h2>you are currently logged in as {user?.email}</h2> : null}
      <h3>staff logged in {staffUsername}</h3> */}
      <div className="mr-10px">
        <Link
          to="/staffLogin"
          onClick={() => {
            staffLogIn();
          }}
        >
          <button className="btn btn-outline-primary text-dark ">
            {" "}
            Staff Log{" "}
          </button>
        </Link>
        <Link className="text-dark" to="/settings">
          {" "}
          <CiSettings />
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default Header;
