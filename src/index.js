import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StaffProvider } from "./components/StaffLogin/LoggedInStaff";
import { PopUpProvider } from "./components/ChangePopUp/changePopUp";

ReactDOM.render(
  <PopUpProvider>
    <StaffProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StaffProvider>
  </PopUpProvider>,
  document.getElementById("root")
);
