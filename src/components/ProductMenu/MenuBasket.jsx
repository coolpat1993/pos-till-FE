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
import BasketTotals from "./BasketTotals";

function MenuBasket({ setNewCounter, counter, tableName, userOrTable, setCheckout, basketTotal, setBasketTotal }) {
    const { loggedInUser } = useContext(StaffContext);
    let staffUsername = loggedInUser.username
    const { user } = UserAuth();
    let userName = user.email;
    const [items, setitems] = useState([]);
    let docLink = ''
    if (!userOrTable) { docLink = `${userName}/${tableName}/drinks` } else {
        docLink = `${userName}/currentOrders/${staffUsername}`
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
    }, [counter, userName, staffUsername, userOrTable]);

    return (
        <div>
            <div className="ex1">
                {tableName !== 'noTableSelected' || userOrTable ?
                    <div>
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
                    : null}

            </div>
            <BasketTotals items={items} basketTotal={basketTotal} setBasketTotal={setBasketTotal} />
            <button
                onClick={() => {
                    setCheckout(true)
                }}
            >
                Pay
            </button>
        </div >
    );
}

export default MenuBasket;
