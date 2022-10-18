import { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase-config';
import '../../App.scss';
import { collection, getDocs } from 'firebase/firestore';
import { Link, Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import SingleItemButton from './SingleItemButton';
import { StaffContext } from '../StaffLogin/LoggedInStaff';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { data } from 'autoprefixer';
import Tables from './Tables';
import MenuBasket from './Basket';
import CheckoutPage from '../Checkout/CheckoutPage';

function ProductMenu() {
  const { loggedInUser } = useContext(StaffContext);
  let staffUsername = loggedInUser.username;
  const { user } = UserAuth();
  let userName = user.email;
  const [counter, setNewCounter] = useState(0);
  const [products, setProducts] = useState(true);
  const [items, setitems] = useState([]);
  const [tableName, setTableName] = useState('noTableSelected');
  const [userOrTable, setUserOrTable] = useState(true);
  const [checkOut, setCheckout] = useState(false);
  const [basketTotal, setBasketTotal] = useState('');
  console.log(basketTotal);

  useEffect(() => {
    const getitems = async () => {
      const data = await getDocs(collection(db, `${userName}/items/drinks`));
      setitems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getitems();
  }, [userName, counter]);

  if (!staffUsername) {
    return <Navigate to="/staffLogin" />;
  }
  return (
    <div className="menu" key="Menu">
      {userOrTable ? (
        <h4>You are currently viewing {staffUsername}'s basket</h4>
      ) : tableName !== 'noTableSelected' ? (
        <h4>You are currently viewing {tableName}</h4>
      ) : (
        <h4>Please select a table</h4>
      )}
      <button
        onClick={() => {
          setProducts(true);
          setCheckout(false);
        }}
      >
        Products
      </button>
      <button
        onClick={() => {
          setProducts(false);
          setUserOrTable(false);
          setTableName('noTableSelected');
          setCheckout(false);
        }}
      >
        Tables
      </button>
      <button
        onClick={() => {
          setProducts(true);
          setUserOrTable(true);
          setTableName('no table');
          setCheckout(false);
        }}
      >
        My basket
      </button>
      {!checkOut ? (
        <div>
          {products ? (
            <div>
              {items.length < 1 ? <Link to="/items">Add items</Link> : null}
              <Container fluid={true}>
                <Row>
                  <div className="col-8 menu">
                    <Container>
                      <Row>
                        {items.map((item) => {
                          return (
                            <SingleItemButton
                              tableName={tableName}
                              name={item.name}
                              price={item.price}
                              id={item.id}
                              setNewCounter={setNewCounter}
                              counter={counter}
                              userOrTable={userOrTable}
                            />
                          );
                        })}
                      </Row>
                    </Container>
                  </div>
                  <div className="order-box col-4">
                    <Container>
                      <MenuBasket
                        setNewCounter={setNewCounter}
                        key="MenuBasket"
                        counter={counter}
                        tableName={tableName}
                        userOrTable={userOrTable}
                        setCheckout={setCheckout}
                        basketTotal={basketTotal}
                        setBasketTotal={setBasketTotal}
                      />
                    </Container>
                  </div>
                </Row>
              </Container>
            </div>
          ) : (
            <Tables
              key="table"
              setTableName={setTableName}
              setProducts={setProducts}
              setNewCounter={setNewCounter}
              counter={counter}
              setUserOrTable={setUserOrTable}
            />
          )}{' '}
        </div>
      ) : (
        <div className="container-fluid">
          <Row>
            <div className="col-4">
              <CheckoutPage
                key="CheckoutPage"
                userOrTable={userOrTable}
                tableName={tableName}
                basketTotal={basketTotal}
                setBasketTotal={setBasketTotal}
              />{' '}
            </div>
            <div className="col-4"></div>
            <div className="col-4 order-box">
              <MenuBasket
                setNewCounter={setNewCounter}
                key="MenuBasket"
                counter={counter}
                tableName={tableName}
                userOrTable={userOrTable}
                setCheckout={setCheckout}
                basketTotal={basketTotal}
                setBasketTotal={setBasketTotal}
              />
            </div>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductMenu;
