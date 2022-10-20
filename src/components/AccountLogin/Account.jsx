import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {}
  };

  return (
    <Container fluid={true}>
      <div className="popUpContent w-25 text-center">
        <h1>Account</h1>
        <p>User Email: {user && user.email}</p>
        <button className="btn btn-light m-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </Container>
  );
};

export default Account;
