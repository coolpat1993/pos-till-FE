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
    useEffect(() => {
        const getitems = async () => {
            const data = await getDocs(collection(db, `${userName}/items/drinks`));
            setitems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log('warning for if this is running too many times');
        };

        getitems();
    }, [userName, counter]);
    console.log(userOrTable, 'user or table')
    if (!staffUsername) {
        return <Navigate to="/staffLogin" />;
    }
    return (
        <div className="menu">
            {userOrTable ? <h2>You are currently viewing {staffUsername}'s basket</h2> : tableName !== 'noTableSelected' ? <h2>You are currently viewing {tableName}</h2> : <h2>Please select a table</h2>}
            <button
                onClick={() => {
                    setProducts(true);
                }}
            >
                Products
            </button>
            <button
                onClick={() => {
                    setProducts(false);
                    setUserOrTable(false)
                    setTableName('noTableSelected')
                }}
            >
                Tables
            </button>
            <button
                onClick={() => {
                    setProducts(true);
                    setUserOrTable(true)
                    setTableName('no table')
                }}
            >
                My basket
            </button>
            {products ?
                <Container>
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
                </Container> : <Tables setTableName={setTableName} setProducts={setProducts} setNewCounter={setNewCounter} counter={counter} setUserOrTable={setUserOrTable} />}
            <MenuBasket setNewCounter={setNewCounter} counter={counter} tableName={tableName} userOrTable={userOrTable} />
        </div>
    );
}

export default ProductMenu;