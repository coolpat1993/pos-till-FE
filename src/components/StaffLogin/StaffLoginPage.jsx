import { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase-config';
import '../../App.scss';
import { collection, getDocs } from 'firebase/firestore';
import StaffLoginButton from './StaffLoginButton.jsx';
import LoginKeypad from './LoginKeyPad';
import { UserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { PopUpContext } from '../ChangePopUp/changePopUp';
import { Container, Row } from 'react-bootstrap';

function StaffLoginPage() {
  const { popUpOpen } = useContext(PopUpContext);
  const { setPopUpOpen } = useContext(PopUpContext);
  console.log(popUpOpen);
  const { user } = UserAuth();
  let userName = user.email;

  const [passcode, setPasscode] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const [users, setusers] = useState([]);

  const closePopUp = async () => {
    setPopUpOpen(0);
  };

  useEffect(() => {
    const getusers = async () => {
      const data = await getDocs(collection(db, `${userName}/users/user`));
      setusers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getusers();
  }, [userName]);

  return (
    <div className="staffLoginPage">
      <Container>
        <Row>
          <div className="col-8">
            {users.length < 1 ? (
              <Link to="/CreateUsers">Create user</Link>
            ) : null}
            {users.map((users) => {
              return (
                <div key={users.id}>
                  <StaffLoginButton
                    username={users.name}
                    staffPasscode={users.staffPasscode}
                    setPasscode={setPasscode}
                    setSelectedUser={setSelectedUser}
                  />
                </div>
              );
            })}
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
            <LoginKeypad userPasscode={passcode} selectedUser={selectedUser} />
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default StaffLoginPage;
