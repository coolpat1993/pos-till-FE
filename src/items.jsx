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
import { Card, Container, Row } from 'react-bootstrap';

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
    <div className="menu">
      <div className="container-fluid">
        <Row>
          <div className="col-8 products">
            <Container>
              <Row>
                {drinks.map((drink) => {
                  return (
                    <div className="col-3 mb-2 pt-2">
                      <Card className="user-item">
                        {' '}
                        <Card.Title className="m-1">{drink.name}</Card.Title>
                        <p className="m-1">
                          Price: {`£${drink.price}`}
                          <br></br>
                          Type: {drink.itemType}
                        </p>
                        <button
                          className="btn btn-light m-1"
                          onClick={() => {
                            deletedrink(drink.id);
                          }}
                        >
                          {' '}
                          Delete item
                        </button>
                      </Card>
                    </div>
                  );
                })}
              </Row>
            </Container>
          </div>
          <div className="col-3">
            <input
              type="text"
              id="form12"
              className="form-control"
              placeholder="Name..."
              onChange={(event) => {
                setNewName(event.target.value);
              }}
            />
            <input
              id="form12"
              className="form-control"
              type="number"
              placeholder="price..."
              onChange={(event) => {
                setNewprice(event.target.value);
              }}
            />
            <input
              id="form12"
              className="form-control"
              type="string"
              placeholder="item type..."
              onChange={(event) => {
                setNewItemType(event.target.value);
              }}
            />

            <button onClick={createdrink} className="btn btn-light m-1">
              {' '}
              Create item
            </button>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default Items;
