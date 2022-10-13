import { db } from "../../firebase-config";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { useContext } from "react";
import { StaffContext } from "../StaffLogin/LoggedInStaff";

const SingleItemButton = ({ name, price, id, counter, setNewCounter }) => {
  const { loggedInUser } = useContext(StaffContext);
  let staffUsername = loggedInUser.username
  const { user } = UserAuth();
  let userName = user.email;

  const addDrink = async () => {
    setNewCounter(counter + 1)
    await addDoc(collection(db, `${userName}/currentOrders/${staffUsername}`), {
      name: name,
      price: price,
      quantity: 1,
    });
  };


  return <button aria-label="change sort order" id={id} onClick={() => {
    addDrink()
  }}>{name},{price}</button>;
};

export default SingleItemButton;


