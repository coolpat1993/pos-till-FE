import { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase-config';
import '../../App.scss';
import { collection, getDocs } from 'firebase/firestore';
import { Link, Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import SingleItemButton from './SingleItemButton';
import Basket from './Basket';
import { StaffContext } from '../StaffLogin/LoggedInStaff';
import { Col, Container, Row } from 'react-bootstrap';
import { data } from 'autoprefixer';
import Tables from '../ProductMenu/Tables';

function Menu() {
    const { loggedInUser } = useContext(StaffContext);
    let staffUsername = loggedInUser.username;
    const { user } = UserAuth();
    let userName = user.email;
    const [counter, setNewCounter] = useState(0);
    const [products, setProducts] = useState(true);
    const [items, setitems] = useState([]);
    useEffect(() => {
        const getitems = async () => {
            const data = await getDocs(collection(db, `${userName}/items/drinks`));
            setitems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log('warning for if this is running too many times');
        };

        getitems();
    }, [userName, counter]);

    if (!staffUsername) {
        return <Navigate to="/staffLogin" />;
    }
    return (
        <div className="menu">
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
                }}
            >
                Tables
            </button>
            {products ?
                <Container>
                    {items.length < 1 ? <Link to="/items">Add items</Link> : null}
                    <Row>
                        {items.map((item) => {
                            return (
                                <Col xs={3} className="mb-5" key={data.id}>
                                    <SingleItemButton
                                        name={item.name}
                                        price={item.price}
                                        id={item.id}
                                        setNewCounter={setNewCounter}
                                        counter={counter}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Container> : <Tables />}
            <Basket setNewCounter={setNewCounter} counter={counter} />
        </div>
    );
}

export default Menu;
