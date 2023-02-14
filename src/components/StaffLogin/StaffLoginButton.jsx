const StaffLoginButton = ({
  username,
  staffPasscode,
  setPasscode,
  setSelectedUser,
}) => {
  return (
    // <Card
    //   className=""
    //   aria-label="change sort order"
    //   id={username}
    //   onClick={() => {
    //     setPasscode(staffPasscode);
    //     setSelectedUser(username);
    //   }}
    // >
    //   <Card.Title className="">{username}</Card.Title>
    // </Card>

    <button
      className="stafflogin__staff--button button"
      onClick={() => {
        setPasscode(staffPasscode);
        setSelectedUser(username);
      }}
    >
      {username}
    </button>
  );
};

export default StaffLoginButton;
