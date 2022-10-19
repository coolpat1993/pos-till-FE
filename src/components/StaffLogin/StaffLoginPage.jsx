import { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase-config';
import '../../App.scss';
import { collection, getDocs } from 'firebase/firestore';
import StaffLoginButton from './StaffLoginButton.jsx';
import LoginKeypad from './LoginKeyPad';
import { UserAuth } from '../context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { PopUpContext } from '../ChangePopUp/changePopUp';
import { Card, Container, Row } from 'react-bootstrap';

function StaffLoginPage() {
  const { popUpOpen } = useContext(PopUpContext);
  const { setPopUpOpen } = useContext(PopUpContext);
  console.log(popUpOpen);
  const { user } = UserAuth();
  let userName = user.email;
  const [isLoading, setIsLoading] = useState(true);
  const [passcode, setPasscode] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const [users, setusers] = useState([]);

  const closePopUp = async () => {
    setPopUpOpen(0);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getusers = async () => {
      setIsLoading(true);
      const data = await getDocs(collection(db, `${userName}/users/user`));
      setusers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    };

    getusers();
  }, [userName]);

  return (
    <div className="staffLoginPage">
      <Container fluid={true}>
        <Row>
          <div className="menuBars">
            <div className="col-7 products">
              {isLoading ? <h2 className="loading">Loading...</h2> : null}
              {users.length < 1 && !isLoading ? (
                <div className="col-3 mb-2 pt-2">
                  <Card
                    className="card-button stretched-link"
                    onClick={() => {
                      navigate('/CreateUsers');
                    }}
                  >
                    <Card.Title className="d-flex mb-2 justify-content-between">
                      Create User
                    </Card.Title>
                  </Card>
                </div>
              ) : null}
              <Container>
                <Row>
                  {users.map((users) => {
                    return (
                      <StaffLoginButton
                        username={users.name}
                        staffPasscode={users.staffPasscode}
                        setPasscode={setPasscode}
                        setSelectedUser={setSelectedUser}
                      />
                    );
                  })}
                </Row>
              </Container>
            </div>
            {popUpOpen !== 0 ? (
              <div className="popUp">
                <div className="popUpContent">
                  <h2>your change is £{popUpOpen}</h2>
                  <button
                    onClick={() => {
                      closePopUp();
                    }}
                  >
                    close pop up
                  </button>
                </div>
              </div>
            ) : null}
            <div className="col-4">
              <LoginKeypad
                userPasscode={passcode}
                selectedUser={selectedUser}
              />
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default StaffLoginPage;
