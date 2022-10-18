import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../../firebase-config";
import { UserAuth } from "../context/AuthContext";
import { StaffContext } from "../StaffLogin/LoggedInStaff";
import PaymentKeypad from "./PaymentKeypad";

const CheckoutPage = ({ userOrTable, tableName }) => {
  const { loggedInUser } = useContext(StaffContext);
  let staffUsername = loggedInUser.username
  const { user } = UserAuth();
  let userName = user.email;

  const [items, setItems] = useState([])
  const [totalAmount, setTotalAmount] = useState('')

  let docLink = ''
  if (!userOrTable) { docLink = `${userName}/${tableName}/drinks` } else {
    docLink = `${userName}/currentOrders/${staffUsername}`
  }

  const ClearDrinkWindow = async () => {
    const data = await getDocs(collection(db, docLink));
    setItems(data.docs.map((docu) => (deleteDoc(doc(db, docLink, docu.id)))));
  };

  return (
    <div>
      <h3>Checkout</h3>
      <PaymentKeypad setTotalAmount={setTotalAmount} totalAmount={totalAmount} />
      <button
        onClick={() => {
        }}
      >
        Cash
      </button>
      <button
        onClick={() => {
        }}
      >
        Card
      </button>
    </div>
  );
};

export default CheckoutPage;
