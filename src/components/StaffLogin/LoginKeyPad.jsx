import { useState } from "react";
import "../../App.css";


function LoginKeypad({ userPasscode }) {
    console.log(userPasscode)
    const [passcodeGuess, setPasscodeGuess] = useState(0);

    const logIn = async () => {
        if (passcodeGuess == userPasscode) {
            console.log('correct password')
        } else {
            console.log('incorrect passcode')
        }
    };


    return (
        <div className="App">
            <input
                type="number"
                placeholder="passcode..."
                onChange={event => {
                    setPasscodeGuess(event.target.value);
                }}
            />

            <button onClick={logIn}>log in</button>
        </div>
    );
}

export default LoginKeypad;
