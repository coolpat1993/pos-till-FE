import { Card } from 'react-bootstrap';

const StaffLoginButton = ({
  username,
  staffPasscode,
  setPasscode,
  setSelectedUser,
}) => {
  return (
    <div className="col-3 mb-2 pt-2">
      <Card
        className="card-button stretched-link"
        aria-label="change sort order"
        id={username}
        onClick={() => {
          setPasscode(staffPasscode);
          setSelectedUser(username);
        }}
      >
        <Card.Title className="d-flex mb-2 justify-content-between">
          {username}
        </Card.Title>
      </Card>
    </div>
  );
};

export default StaffLoginButton;
