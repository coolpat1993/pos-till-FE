import { useState, useEffect, useContext } from "react";
import "../../App.css";
import { db } from "../../firebase-config";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { UserContext } from "../users/User";
import StaffLoginButton from "./StaffLoginButton.jsx";
import LoginKeypad from "./LoginKeyPad";

function StaffLoginPage() {
    const user = useContext(UserContext);
    let userName = user.loggedInUser.username
    const [passcode, setPasscode] = useState('')

    const [users, setusers] = useState([]);
    const usersCollectionRef = collection(db, `${userName}/users/user`);
    console.log(passcode, '< passcode saved')

    useEffect(() => {
        const getusers = async () => {
            const data = await getDocs(usersCollectionRef);
            setusers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            console.log("warning for if this is running too many times");
        };

        getusers();
    }, []);


    return (
        <div className="staffLoginPage">
            {users.map(users => {
                return (
                    <div>
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
