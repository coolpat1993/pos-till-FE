import { useState, useEffect } from 'react';
import '../App.scss';
import { db } from '../firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { UserAuth } from './context/AuthContext';
import Keypad from './StaffLogin/KeyPad';
import { Card, Container, Row } from 'react-bootstrap';

function CreateUsers() {
  const { user } = UserAuth();
  let userName = user.email;
  const [newName, setNewName] = useState('');
  const [newlevel, setNewlevel] = useState(0);
  const [newPasscode, setNewPasscode] = useState('');
  const [counter, setNewCounter] = useState(0);

  const [users, setusers] = useState([]);
  const createusers = async () => {
    setNewCounter(counter + 1);
    await addDoc(collection(db, `${userName}/users/user`), {
      name: newName,
      staffPasscode: Number(newPasscode),
      level: Number(newlevel),
    });
  };

  const updateusers = async (id, level) => {
    const usersDoc = doc(db, `${userName}/users/user`, id);
    const newFields = { level: level + 1 };

    setNewCounter(counter + 1);
    await updateDoc(usersDoc, newFields);
  };

  const deleteusers = async (id) => {
    const usersDoc = doc(db, `${userName}/users/user`, id);
    setNewCounter(counter + 1);
    await deleteDoc(usersDoc);
  };

  useEffect(() => {
    const getusers = async () => {
      const data = await getDocs(collection(db, `${userName}/users/user`));
      setusers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getusers();
  }, [counter, userName]);

  return (
    <div className="App">
      <h2>Create new user</h2>
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />

      <button onClick={createusers}> Create users</button>
      <div className="menu">
        <Container fluid={true}>
          <Row>
            <div className="col-7 products">
              <Container>
                <Row>
                  {users.map((users) => {
                    return (
                      <div className="col-3 mb-2 pt-2" key={users.id}>
                        <Card className="user-item">
                          {' '}
                          <Card.Title className="m-1">
                            Name: {users.name}
                          </Card.Title>
                          <Card.Body className="p-1">
                            level: {`${users.level}`}
                          </Card.Body>
                          <button
                            className="btn btn-light m-1"
                            onClick={() => {
                              updateusers(users.id, users.level);
                            }}
                          >
                            {' '}
                            Increase level
                          </button>
                          <button
                            className="btn btn-light m-1"
                            onClick={() => {
                              deleteusers(users.id);
                            }}
                          >
                            {' '}
                            Delete users
                          </button>
                        </Card>
                      </div>
                    );
                  })}
                </Row>
              </Container>
            </div>
            <div className="col-4">
              <Keypad
                passcodeGuess={newPasscode}
                setPasscodeGuess={setNewPasscode}
              />
              <input
                type="number"
                placeholder="level..."
                onChange={(event) => {
                  setNewlevel(event.target.value);
                }}
              />
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default CreateUsers;
