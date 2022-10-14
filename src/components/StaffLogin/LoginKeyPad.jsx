import { useContext, useState } from "react";
import "../../App.css";
import { Navigate } from "react-router-dom";
import { StaffContext } from "./LoggedInStaff";
import KeyPad from "../StaffLogin/KeyPad";

function LoginKeypad({ userPasscode, selectedUser }) {
  const { setLoggedInUser } = useContext(StaffContext);
  const [passcodeGuess, setPasscodeGuess] = useState(0);
  const [success, setSuccess] = useState(false);

  const logIn = () => {
    if (+passcodeGuess === +userPasscode) {
      setLoggedInUser({ username: selectedUser });
      console.log("working");
      setSuccess(true);
    } else {
      console.log("incorrect passcode");
    }
  };

  if (success) {
    return <Navigate to="/menu" />;
  }

  return (
    <div className="App">
      <KeyPad />
      <input
        onChange={(event) => {
          setPasscodeGuess(event.target.value);
        }}
      />

      <button onClick={logIn}>log in</button>
    </div>
  );
}

export default LoginKeypad;
