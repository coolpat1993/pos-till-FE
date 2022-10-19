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
  const [items, setitems] = useState([]);
  const [tableName, setTableName] = useState('noTableSelected');
  const [userOrTable, setUserOrTable] = useState(true);
  const [basketTotal, setBasketTotal] = useState('');
  const [currMenu, setCurrMenu] = useState('products');
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
      <Container fluid={true}>
        <Row>
          <div className="col-4">
            <button
              className="btn-btn-light"
              onClick={() => {
                setCurrMenu('products');
                if (tableName === 'noTableSelected') {
                  setUserOrTable(true);
                }
              }}
            >
              Products
            </button>
            <button
              className="btn-btn-light"
              onClick={() => {
                setUserOrTable(false);
                setTableName('noTableSelected');
                setCurrMenu('tables');
              }}
            >
              Tables
            </button>
            <button
              className="btn-btn-light"
              onClick={() => {
                setUserOrTable(true);
                setTableName('no table');
                setCurrMenu('products');
              }}
            >
              My basket
            </button>
          </div>
          <div className="col-4"></div>
          <div className="col-4">
            {userOrTable ? (
              <h4>You are currently viewing {staffUsername}'s basket</h4>
            ) : tableName !== 'noTableSelected' ? (
              <h4>You are currently viewing {tableName}</h4>
            ) : (
              <h4>Please select a table</h4>
            )}
          </div>
        </Row>
      </Container>
      <Container fluid={true}>
        <Row>
          <div className="menuBars">
            {currMenu === 'checkOut' ? (
              <div className="col-8 menu">
                <CheckoutPage
                  key="CheckoutPage"
                  userOrTable={userOrTable}
                  tableName={tableName}
                  basketTotal={basketTotal}
                  setBasketTotal={setBasketTotal}
                />
              </div>
            ) : null}
            {currMenu === 'products' ? (
              <div className="col-8 products">
                <Container>
                  {items.length < 1 ? (
                    <Link to="/items">Add Items</Link>
                  ) : (
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
                  )}
                </Container>
              </div>
            ) : null}
            {currMenu === 'tables' ? (
              <div className="col-8">
                <Tables
                  key="table"
                  setTableName={setTableName}
                  setNewCounter={setNewCounter}
                  counter={counter}
                  setUserOrTable={setUserOrTable}
                />
              </div>
            ) : null}
            <div className="order-box col-4">
              <Container>
                <MenuBasket
                  setNewCounter={setNewCounter}
                  key="MenuBasket"
                  counter={counter}
                  tableName={tableName}
                  userOrTable={userOrTable}
                  basketTotal={basketTotal}
                  setBasketTotal={setBasketTotal}
                  setCurrMenu={setCurrMenu}
                />
              </Container>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default ProductMenu;
