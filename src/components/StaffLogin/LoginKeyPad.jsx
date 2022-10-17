import { useContext, useState } from 'react';
import '../../App.scss';
import { Navigate } from 'react-router-dom';
import { StaffContext } from './LoggedInStaff';
import Keypad from './KeyPad';

function LoginKeypad({ userPasscode, selectedUser }) {
  const { setLoggedInUser } = useContext(StaffContext);
  const [passcodeGuess, setPasscodeGuess] = useState('');
  const [success, setSuccess] = useState(false);

  const logIn = () => {
    if (+passcodeGuess === +userPasscode) {
      setLoggedInUser({ username: selectedUser });

      setSuccess(true);
    } else {

    }
  };

  if (success) {
    return <Navigate to="/menu" />;
  }

  return (
    <div className="App">
      <Keypad
        passcodeGuess={passcodeGuess}
        setPasscodeGuess={setPasscodeGuess}
      />
      <button onClick={logIn}>log in</button>
    </div>
  );
}

export default LoginKeypad;
