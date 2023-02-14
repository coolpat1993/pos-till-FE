import { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase-config';
import '../../App.scss';
import { collection, getDocs } from 'firebase/firestore';
import StaffLoginButton from './StaffLoginButton.jsx';
import LoginKeypad from './LoginKeyPad';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PopUpContext } from '../ChangePopUp/changePopUp';
import { Card } from 'react-bootstrap';

function StaffLoginPage() {
  const { popUpOpen } = useContext(PopUpContext);
  const { setPopUpOpen } = useContext(PopUpContext);
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
    <div className="stafflogin">
      {popUpOpen !== 0 ? (
        <div className="popup">
          <div className="popup__content">
            <p>Your change is £{popUpOpen}</p>
            <button
              className="popup__content--button button"
              onClick={() => {
                closePopUp();
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      ) : null}
      <div className="stafflogin__keypad">
        <LoginKeypad userPasscode={passcode} selectedUser={selectedUser} />
      </div>
      <div className="stafflogin__staff">
        {isLoading ? <h2 className="">Loading...</h2> : null}
        {users.length < 1 && !isLoading ? (
          <div className="">
            <Card
              className=""
              onClick={() => {
                navigate('/CreateUsers');
              }}
            >
              <Card.Title className="">Create User</Card.Title>
            </Card>
          </div>
        ) : null}
        <div className="stafflogin__staff_flex">
          {users.map((users) => {
            return (
              <StaffLoginButton
                key={users.id}
                username={users.name}
                staffPasscode={users.staffPasscode}
                setPasscode={setPasscode}
                setSelectedUser={setSelectedUser}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StaffLoginPage;
