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
    <div>
      <div>
        {items.map((item) => {
          return (
            <Card>
              <Container>
                <div className="d-flex justify-content-end" key={item.id}>
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
      <div className="">
        <Container>
          <Row>
            <BasketTotals
              items={items}
              basketTotal={basketTotal}
              setBasketTotal={setBasketTotal}
            />
            <button
              onClick={() => {
                setCurrMenu('checkOut');
              }}
            >
              Pay
            </button>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default MenuBasket;
