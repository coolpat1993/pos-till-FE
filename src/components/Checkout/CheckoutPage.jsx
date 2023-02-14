import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import { PopUpContext } from '../ChangePopUp/changePopUp';
import { UserAuth } from '../context/AuthContext';
import { StaffContext } from '../StaffLogin/LoggedInStaff';
import PaymentKeypad from './PaymentKeypad';

const CheckoutPage = ({ userOrTable, tableName, basketTotal }) => {
  const { loggedInUser } = useContext(StaffContext);
  let staffUsername = loggedInUser.username;
  const { user } = UserAuth();
  let userName = user.email;
  const navigate = useNavigate();
  const { setPopUpOpen } = useContext(PopUpContext);

  const [tempTotal, setTempTotal] = useState(0.0);
  const [totalAmount, setTotalAmount] = useState('0.00');
  const [amountPaid, setAmountPaid] = useState(0);
  const [totalToPay, setTotalToPay] = useState(basketTotal);

  let docLink = '';
  if (!userOrTable) {
    docLink = `${userName}/${tableName}/drinks`;
  } else {
    docLink = `${userName}/currentOrders/${staffUsername}`;
  }

  let trueTotal = totalToPay.toFixed(2);
  const ClearDrinkWindow = async () => {
    const data = await getDocs(collection(db, docLink));
    data.docs.map((docu) => deleteDoc(doc(db, docLink, docu.id)));
  };

  if (amountPaid >= basketTotal) {
    ClearDrinkWindow();
    setPopUpOpen(
      Math.abs(Math.round((basketTotal - amountPaid) * 100) / 100).toFixed(2)
    );
    navigate('/staffLogin');
  }

  const calcAmountPaid = async () => {
    setAmountPaid(amountPaid + parseFloat(totalAmount));
    setTotalToPay(totalToPay - parseFloat(totalAmount));
    setTotalAmount('0.00');
    setTempTotal(0.0);
  };

  return (
    <div className="">
      <Container>
        <div className="">
          <h4>Total to pay: £{trueTotal}</h4>
        </div>
      </Container>
      <br></br>
      <PaymentKeypad
        setTotalAmount={setTotalAmount}
        totalAmount={totalAmount}
        tempTotal={tempTotal}
        setTempTotal={setTempTotal}
      />
      <Container>
        <button
          className=""
          onClick={() => {
            calcAmountPaid();
          }}
        >
          Pay
        </button>
      </Container>
    </div>
  );
};

export default CheckoutPage;
