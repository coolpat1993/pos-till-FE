import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StaffProvider } from './components/StaffLogin/LoggedInStaff';

ReactDOM.render(
  <StaffProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StaffProvider>,
  document.getElementById('root')
);
