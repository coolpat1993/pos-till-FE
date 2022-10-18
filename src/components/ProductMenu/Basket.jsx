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
import { Link } from 'react-router-dom';
import BasketTotals from './BasketTotals';
import { Card, Container, Row } from 'react-bootstrap';

function Basket({ setNewCounter, counter }) {
  const { loggedInUser } = useContext(StaffContext);
  let staffUsername = loggedInUser.username;

  const { user } = UserAuth();
  let userName = user.email;

  const [items, setitems] = useState([]);

  const updateQuantity = async (id, quantity) => {
    const itemDoc = doc(db, `${userName}/currentOrders/${staffUsername}`, id);
    const newFields = { quantity: quantity + 1 };
    setNewCounter(counter + 1);
    await updateDoc(itemDoc, newFields);
  };

  const decreaseQuantity = async (id, quantity) => {
    const itemDoc = doc(db, `${userName}/currentOrders/${staffUsername}`, id);
    const newFields = { quantity: quantity - 1 };
    setNewCounter(counter + 1);
    await updateDoc(itemDoc, newFields);
  };

  const deleteitem = async (id) => {
    const itemDoc = doc(db, `${userName}/currentOrders/${staffUsername}`, id);
    setNewCounter(counter + 1);
    await deleteDoc(itemDoc);
  };

  useEffect(() => {
    const getitems = async () => {
      const data = await getDocs(
        collection(db, `${userName}/currentOrders/${staffUsername}`)
      );
      setitems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log('warning for if this is running too many times');
    };

    getitems();
  }, [counter, userName, staffUsername]);

  return (
    <div>
      <div>
        {items.map((item) => {
          return (
            <Card>
              <Container>
                <div className="d-flex justify-content-between" key={item.id}>
                  <p className="p-2 float-start">{item.quantity}</p>
                  <p className="p-2 float-start">{item.name} </p>
                  <p className="p-2 float-start">{`£${item.price}`}</p>
                  <div className="p2">
                    <button
                      className="btn btn-light"
                      onClick={() => {
                        decreaseQuantity(item.id, item.quantity);
                      }}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-light"
                      onClick={() => {
                        updateQuantity(item.id, item.quantity);
                      }}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-light"
                      onClick={() => {
                        deleteitem(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Container>
            </Card>
          );
        })}
      </div>
      <div className="d-flex justify-content-end">
        <BasketTotals items={items} />
        <Link to="/checkout">Checkout</Link>
      </div>
    </div>
  );
}

export default Basket;
