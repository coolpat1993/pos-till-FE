import { createContext, useState } from "react";

export const PopUpContext = createContext();

export const PopUpProvider = props => {
    const [popUpOpen, setPopUpOpen] = useState(0);

    return (
        <PopUpContext.Provider value={{ popUpOpen, setPopUpOpen }}>
            {props.children}
        </PopUpContext.Provider>
    );
};