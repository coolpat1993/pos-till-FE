import { Link } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div>
      <h3>Edit your venue</h3>
      <Link to="/account">Account settings</Link>
      <Link to="/CreateUsers">Create user</Link>
      <Link to="/items">Items</Link>
      <Link to="/tablePlan">Table Plan</Link>
    </div>
  );
};

export default SettingsPage;
