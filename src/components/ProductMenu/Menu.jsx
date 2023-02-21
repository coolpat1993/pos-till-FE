import { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase-config';
import '../../App.scss';
import { collection, getDocs } from 'firebase/firestore';
import { Link, Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import SingleItemButton from './SingleItemButton';
import { StaffContext } from '../StaffLogin/LoggedInStaff';
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
    <div className="menu">
      <div className="menu__navigation">
        <button
          className={
            currMenu === 'products'
              ? 'button menu__navigation-button--focus'
              : 'button menu__navigation-button'
          }
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
          className={`${currMenu === 'tables'
            ? 'button menu__navigation-button--focus'
            : 'button menu__navigation-button'
            }`}
          onClick={() => {
            setUserOrTable(false);
            setTableName('noTableSelected');
            setCurrMenu('tables');
          }}
        >
          Tables
        </button>
        <button
          className={
            currMenu === 'basket'
              ? 'button menu__navigation-button--focus'
              : 'button menu__navigation-button'
          }
          onClick={() => {
            setUserOrTable(true);
            setTableName('no table');
            setCurrMenu('basket');
          }}
        >
          My basket
        </button>
      </div>
      <div className="menu__viewing">
        {userOrTable ? (
          <p>{staffUsername}'s basket</p>
        ) : tableName !== 'noTableSelected' ? (
          <p>Currently viewing {tableName}</p>
        ) : (
          <p>Please select a table</p>
        )}
      </div>
      <div className="menu__items">
        <div className="menu__items_flex">
          {currMenu === 'checkOut' ? (
            <CheckoutPage
              key="CheckoutPage"
              userOrTable={userOrTable}
              tableName={tableName}
              basketTotal={basketTotal}
              setBasketTotal={setBasketTotal}
            />
          ) : null}
          {(currMenu === 'products') & (items.length < 1) ? (
            <Link to="/items">Add Items</Link>
          ) : null}

          {(currMenu === 'products') & (items.length > 1)
            ? items.map((item) => {
              return (
                <SingleItemButton
                  key={item.id}
                  tableName={tableName}
                  name={item.name}
                  price={item.price}
                  id={item.id}
                  setNewCounter={setNewCounter}
                  counter={counter}
                  userOrTable={userOrTable}
                />
              );
            })
            : null}
          {currMenu === 'tables' ? (
            <Tables
              key="table"
              setTableName={setTableName}
              setNewCounter={setNewCounter}
              counter={counter}
              setUserOrTable={setUserOrTable}
            />
          ) : null}
        </div>
      </div>
      <div className="menu__basket">
        <MenuBasket
          setNewCounter={setNewCounter}
          key="menubasket"
          counter={counter}
          tableName={tableName}
          userOrTable={userOrTable}
          basketTotal={basketTotal}
          setBasketTotal={setBasketTotal}
          setCurrMenu={setCurrMenu}
        />
      </div>
    </div>
  );
}

export default ProductMenu;
