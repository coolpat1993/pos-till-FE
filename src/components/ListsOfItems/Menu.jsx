import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import "../../App.css";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import SingleItem from "./SingleItem"

function Menu() {
    const { user } = UserAuth();
    let userName = user.email;

    const [items, setitems] = useState([]);

    useEffect(() => {
        const getitems = async () => {
            const data = await getDocs(collection(db, `${userName}/items/drinks`));
            setitems(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            console.log("warning for if this is running too many times");
        };

        getitems();
    }, [userName]);


    return (
        <div className="staffLoginPage">
            {items.length < 1 ? <Link to="/Createitems">Create user</Link> : null}
            {items.map(item => {
                return (
                    <div key={item.id}>
                        <SingleItem name={item.name}
                            price={item.price}
                            id={item.id} />
                    </div>
                );
            })}
        </div>
    );
}

export default Menu;
