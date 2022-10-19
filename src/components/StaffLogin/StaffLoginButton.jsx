const StaffLoginButton = ({
  username,
  staffPasscode,
  setPasscode,
  setSelectedUser,
}) => {
  return (
    <button
      className="staff-name"
      aria-label="change sort order"
      id={username}
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
