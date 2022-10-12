import { useState, useEffect } from "react";
import "../../App.css";
import { db } from "../../firebase-config";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import StaffLoginButton from "./StaffLoginButton.jsx";
import LoginKeypad from "./LoginKeyPad";
import { UserAuth } from "../context/AuthContext";

function StaffLoginPage() {
    const { user } = UserAuth();
    let userName = user.email;
    console.log(userName, 'username')
    const [passcode, setPasscode] = useState('')

    const [users, setusers] = useState([]);
    console.log(passcode, '< passcode saved')

    useEffect(() => {
        const getusers = async () => {
            const data = await getDocs(collection(db, `${userName}/users/user`));
            setusers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            console.log("warning for if this is running too many times");
        };

        getusers();
    }, [userName]);


    return (
        <div className="staffLoginPage">
            {users.map(users => {
                return (
                    <div key={users.id}>
                        <StaffLoginButton username={users.name}
                            staffPasscode={users.staffPasscode}
                            setPasscode={setPasscode} />
                    </div>
                );
            })}
            <LoginKeypad userPasscode={passcode} />
        </div>
    );
}

export default StaffLoginPage;
