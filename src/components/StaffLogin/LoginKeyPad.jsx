
import { useContext, useState } from 'react';
import '../../App.scss';
import { Navigate } from 'react-router-dom';
import { StaffContext } from './LoggedInStaff';
import Keypad from './KeyPad';
import { Col, Container, Row } from 'react-bootstrap';


function LoginKeypad({ userPasscode, selectedUser }) {
  const { setLoggedInUser } = useContext(StaffContext);
  const [passcodeGuess, setPasscodeGuess] = useState("");
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

    <div className="container-fluid">
      <Row>
        <Col>
          <Keypad
            passcodeGuess={passcodeGuess}
            setPasscodeGuess={setPasscodeGuess}
          />
          <Container>
            <Row>
              <button className="col-12" onClick={logIn}>
                log in
              </button>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default LoginKeypad;
