import { useState, useEffect, useContext } from "react";
import "../../App";
import { db } from "../../firebase-config";
import {
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { StaffContext } from "../StaffLogin/LoggedInStaff";
import { Link } from "react-router-dom";
import BasketTotals from "./BasketTotals";

function Basket({ setNewCounter, counter }) {
    const { loggedInUser } = useContext(StaffContext);
    let staffUsername = loggedInUser.username

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
            const data = await getDocs(collection(db, `${userName}/currentOrders/${staffUsername}`));
            setitems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        };

        getitems();
    }, [counter, userName, staffUsername]);

    return (
        <div>
            <div className="ex1">
                {items.map((item) => {
                    return (
                        <div key={item.id}>
                            <h1>Name: {item.name}</h1>
                            <h1>price: {`£${item.price}`}</h1>
                            <h1>quantity: {item.quantity}</h1>
                            <button
                                onClick={() => {
                                    decreaseQuantity(item.id, item.quantity);
                                }}
                            >
                                Decrease quantity
                            </button>
                            <button
                                onClick={() => {
                                    updateQuantity(item.id, item.quantity);
                                }}
                            >
                                Increase quantity
                            </button>
                            <button
                                onClick={() => {
                                    deleteitem(item.id);
                                }}
                            >
                                Delete item
                            </button>
                        </div>
                    );
                })}

            </div>
            <BasketTotals items={items} />
            <Link to="/checkout">Checkout</Link>
        </div>
    );
}

export default Basket;
