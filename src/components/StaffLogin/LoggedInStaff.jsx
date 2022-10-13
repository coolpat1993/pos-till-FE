import { createContext, useState } from "react";

export const StaffContext = createContext();

export const StaffProvider = props => {
    const [loggedInUser, setLoggedInUser] = useState('');

    return (
        <StaffContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {props.children}
        </StaffContext.Provider>
    );
};