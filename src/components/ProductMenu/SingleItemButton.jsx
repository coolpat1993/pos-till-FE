import { db } from '../../firebase-config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, addDoc } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { useContext } from 'react';
import { StaffContext } from '../StaffLogin/LoggedInStaff';

const SingleItemButton = ({
  name,
  price,
  id,
  counter,
  setNewCounter,
  tableName,
  userOrTable,
}) => {
  const { loggedInUser } = useContext(StaffContext);
  let staffUsername = loggedInUser.username;
  const { user } = UserAuth();
  let userName = user.email;

  let docLink = '';
  if (!userOrTable) {
    docLink = `${userName}/${tableName}/drinks`;
  } else {
    docLink = `${userName}/currentOrders/${staffUsername}`;
  }

  const addDrink = async () => {
    setNewCounter(counter + 1);
    await addDoc(collection(db, docLink), {
      name: name,
      price: price,
      quantity: 1,
    });
  };

  return (
    <button
      className="menu__items_flex--button button-2"
      id={id}
      onClick={() => {
        addDrink();
      }}
    >
      <p> {name}</p>
      <p>£{price.toFixed(2)}</p>
    </button>
  );
};

export default SingleItemButton;
