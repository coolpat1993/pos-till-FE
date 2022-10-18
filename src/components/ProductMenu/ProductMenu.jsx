import { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase-config';
import '../../App.scss';
import { collection, getDocs } from 'firebase/firestore';
import { Link, Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import SingleItemButton from './SingleItemButton';
import { StaffContext } from '../StaffLogin/LoggedInStaff';
import { Col, Container, Row } from 'react-bootstrap';
import { data } from 'autoprefixer';
import Tables from './Tables';
import MenuBasket from './MenuBasket';
import CheckoutPage from '../Checkout/CheckoutPage';

function ProductMenu() {
    const { loggedInUser } = useContext(StaffContext);
    let staffUsername = loggedInUser.username;
    const { user } = UserAuth();
    let userName = user.email;
    const [counter, setNewCounter] = useState(0);
    const [products, setProducts] = useState(true);
    const [items, setitems] = useState([]);
    const [tableName, setTableName] = useState('noTableSelected')
    const [userOrTable, setUserOrTable] = useState(true)
    const [checkOut, setCheckout] = useState(false)
    const [basketTotal, setBasketTotal] = useState('')
    console.log(basketTotal)

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
            {userOrTable ? <h2>You are currently viewing {staffUsername}'s basket</h2> : tableName !== 'noTableSelected' ? <h2>You are currently viewing {tableName}</h2> : <h2>Please select a table</h2>}
            <button
                onClick={() => {
                    setProducts(true);
                    setCheckout(false)
                }}
            >
                Products
            </button>
            <button
                onClick={() => {
                    setProducts(false);
                    setUserOrTable(false)
                    setTableName('noTableSelected')
                    setCheckout(false)
                }}
            >
                Tables
            </button>
            <button
                onClick={() => {
                    setProducts(true);
                    setUserOrTable(true)
                    setTableName('no table')
                    setCheckout(false)
                }}
            >
                My basket
            </button>
            {!checkOut ?
                <div>
                    {products ?
                        <Container key="Container">
                            {items.length < 1 ? <Link to="/items">Add items</Link> : null}
                            <Row>
                                {items.map((item) => {
                                    return (
                                        <Col xs={3} className="mb-5" key={data.id}>
                                            <SingleItemButton
                                                tableName={tableName}
                                                name={item.name}
                                                price={item.price}
                                                id={item.id}
                                                setNewCounter={setNewCounter}
                                                counter={counter}
                                                userOrTable={userOrTable}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Container> :
                        <Tables key="table" setTableName={setTableName} setProducts={setProducts} setNewCounter={setNewCounter} counter={counter} setUserOrTable={setUserOrTable} />} </div> :
                <CheckoutPage key="CheckoutPage" userOrTable={userOrTable} tableName={tableName} />}
            <MenuBasket setNewCounter={setNewCounter} key="MenuBasket"
                counter={counter}
                tableName={tableName}
                userOrTable={userOrTable}
                setCheckout={setCheckout}
                basketTotal={basketTotal}
                setBasketTotal={setBasketTotal} />
        </div>
    );
}

export default ProductMenu;