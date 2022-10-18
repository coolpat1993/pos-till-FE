import { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import '../../App.scss';
import { collection, getDocs } from 'firebase/firestore';
import StaffLoginButton from './StaffLoginButton.jsx';
import LoginKeypad from './LoginKeyPad';
import { UserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function StaffLoginPage() {
  const { user } = UserAuth();
  let userName = user.email;

  const [passcode, setPasscode] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const [users, setusers] = useState([]);


  useEffect(() => {
    const getusers = async () => {
      const data = await getDocs(collection(db, `${userName}/users/user`));
      setusers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    };

    getusers();
  }, [userName]);

  return (
    <div className="staffLoginPage">
      {users.length < 1 ? <Link to="/CreateUsers">Create user</Link> : null}
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
      <LoginKeypad userPasscode={passcode} selectedUser={selectedUser} />
    </div>
  );
}

export default StaffLoginPage;
