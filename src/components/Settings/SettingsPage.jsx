import { Link } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div>
      <h3>Edit your venue</h3>
      <Link to="/account">account settings</Link>
      <Link to="/CreateUsers">Create user</Link>
      <Link to="/items">items</Link>
    </div>
  );
};

export default SettingsPage;
