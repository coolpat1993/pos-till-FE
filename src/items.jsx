import { useState, useEffect } from 'react';
import './App.scss';
import { db } from './firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { UserAuth } from './components/context/AuthContext';

function Items() {
  const { user } = UserAuth();
  let userName = user.email;

  const [newName, setNewName] = useState('');
  const [newprice, setNewprice] = useState(0);
  const [newItemType, setNewItemType] = useState('');
  const [counter, setNewCounter] = useState(0);
  const [drinks, setdrinks] = useState([]);

  const createdrink = async () => {
    setNewCounter(counter + 1);
    await addDoc(collection(db, `${userName}/items/drinks`), {
      name: newName,
      price: Number(newprice),
      quantity: 1,
      itemType: newItemType,
    });
  };

  const deletedrink = async (id) => {
    const drinkDoc = doc(db, `${userName}/items/drinks`, id);
    setNewCounter(counter + 1);
    await deleteDoc(drinkDoc);
  };

  useEffect(() => {
    const getdrinks = async () => {
      const data = await getDocs(collection(db, `${userName}/items/drinks`));
      setdrinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getdrinks();
  }, [counter, userName]);

  return (
    <div className="items">
      <div className="items__products">
        {drinks.map((drink) => {
          return (
            <div className="items__products_card">
              {drink.name}
              <p>
                Price: {`£${drink.price}`}
                <br></br>
                Type: {drink.itemType}
              </p>
              <button
                className="items__products_card--button button"
                onClick={() => {
                  deletedrink(drink.id);
                }}
              >
                {' '}
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div className="items__adder">
        <div className="items__adder_box">
          <input
            type="text"
            id="form12"
            className="items__adder_box--input"
            placeholder="Name..."
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
          <input
            id="form12"
            className="items__adder_box--input"
            type="number"
            placeholder="price..."
            onChange={(event) => {
              setNewprice(event.target.value);
            }}
          />
          <input
            id="form12"
            className="items__adder_box--input"
            type="string"
            placeholder="item type..."
            onChange={(event) => {
              setNewItemType(event.target.value);
            }}
          />

          <button
            onClick={createdrink}
            className="items__adder_box--button button"
          >
            {' '}
            Create item
          </button>
        </div>
      </div>
    </div>
  );
}

export default Items;
