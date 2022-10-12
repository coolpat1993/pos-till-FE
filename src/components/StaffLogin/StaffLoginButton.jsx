const StaffLoginButton = ({ username, staffPasscode, setPasscode }) => {
  return <button aria-label="change sort order" id={username} onClick={() => {
    setPasscode(staffPasscode)
  }}>{username}</button>;
};

export default StaffLoginButton;
