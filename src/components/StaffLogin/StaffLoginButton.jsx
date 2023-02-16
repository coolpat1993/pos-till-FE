const StaffLoginButton = ({
  username,
  staffPasscode,
  setPasscode,
  setSelectedUser,
  selectedUser,
}) => {
  return (
    <button
      className={
        selectedUser === username
          ? 'stafflogin__staff--button-focus button'
          : 'stafflogin__staff--button button'
      }
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
