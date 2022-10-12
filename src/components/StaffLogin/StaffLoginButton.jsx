const StaffLoginButton = ({ username, staffPasscode, setPasscode }) => {
  return <button aria-label="change sort order" onClick={() => {
    setPasscode(staffPasscode)
  }}>{username}</button>;
};

export default StaffLoginButton;
