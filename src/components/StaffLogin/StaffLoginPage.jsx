import { useState, useEffect, useContext } from "react";
import { db } from "../../firebase-config";
import "../../App.scss";
import { collection, getDocs } from "firebase/firestore";
import StaffLoginButton from "./StaffLoginButton.jsx";
import LoginKeypad from "./LoginKeyPad";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { PopUpContext } from "../ChangePopUp/changePopUp";
import { Container, Row } from "react-bootstrap";

function StaffLoginPage() {
  const { popUpOpen } = useContext(PopUpContext);
  const { setPopUpOpen } = useContext(PopUpContext);
  console.log(popUpOpen);
  const { user } = UserAuth();
  let userName = user.email;

  const [passcode, setPasscode] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

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
      {popUpOpen !== 0 ? (
        <div>
          <h2>your change is £{popUpOpen}</h2>
          <button
            onClick={() => {
              closePopUp();
            }}
          >
            close pop up
          </button>
        </div>
      ) : null}
      <LoginKeypad userPasscode={passcode} selectedUser={selectedUser} />
    </div>
  );
}

export default StaffLoginPage;
