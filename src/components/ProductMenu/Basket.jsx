import { useState, useEffect, useContext } from 'react';
import '../../App';
import { db } from '../../firebase-config';
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { UserAuth } from '../../components/context/AuthContext';
import { StaffContext } from '../StaffLogin/LoggedInStaff';
import BasketTotals from './BasketTotals';

function MenuBasket({
  setNewCounter,
  counter,
  tableName,
  userOrTable,
  setCurrMenu,
  basketTotal,
  setBasketTotal,
}) {
  const { loggedInUser } = useContext(StaffContext);
  let staffUsername = loggedInUser.username;
  const { user } = UserAuth();
  let userName = user.email;
  const [items, setitems] = useState([]);

  let docLink = '';

  if (!userOrTable) {
    docLink = `${userName}/${tableName}/drinks`;
  } else {
    docLink = `${userName}/currentOrders/${staffUsername}`;
  }

  const updateQuantity = async (id, quantity) => {
    const itemDoc = doc(db, docLink, id);
    const newFields = { quantity: quantity + 1 };
    setNewCounter(counter + 1);
    await updateDoc(itemDoc, newFields);
  };

  const decreaseQuantity = async (id, quantity) => {
    const itemDoc = doc(db, docLink, id);
    const newFields = { quantity: quantity - 1 };
    if (newFields.quantity < 1) {
      deleteitem(id);
    }
    setNewCounter(counter + 1);
    await updateDoc(itemDoc, newFields);
  };

  const deleteitem = async (id) => {
    const itemDoc = doc(db, docLink, id);
    setNewCounter(counter + 1);
    await deleteDoc(itemDoc);
  };

  useEffect(() => {
    const getitems = async () => {
      const data = await getDocs(collection(db, docLink));
      setitems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getitems();
  }, [counter, userName, staffUsername, docLink]);

  return (
    <div className="menu__basket_content">
      <div className="menu__basket_items">
        {items.map((item) => {
          return (
            <div className="menu__basket_items_single" key={item.id}>
              <p className="menu__basket_items_single--text">{item.name}</p>
              <div className="menu__basket_items_single--quantity">
                <button
                  className="button-2"
                  onClick={() => {
                    decreaseQuantity(item.id, item.quantity);
                  }}
                >
                  -
                </button>
                <p className="u-margin-top-small">{item.quantity}</p>
                <button
                  className="button-2"
                  onClick={() => {
                    updateQuantity(item.id, item.quantity);
                  }}
                >
                  +
                </button>
              </div>
              <p className="menu__basket_items_single--price">{`£${(
                item.price * item.quantity
              ).toFixed(2)}`}</p>
            </div>
          );
        })}
      </div>

      <div className="menu__basket_content_pay">
        <BasketTotals
          items={items}
          basketTotal={basketTotal}
          setBasketTotal={setBasketTotal}
        />
        <button
          className="menu__basket_content_pay--button button"
          onClick={() => {
            setCurrMenu('checkOut');
          }}
        >
          Pay
        </button>
      </div>
    </div>
  );
}

export default MenuBasket;
