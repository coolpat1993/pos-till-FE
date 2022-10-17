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
    console.log(counter);
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
      console.log('warning for if this is running too many times');
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
      <Keypad passcodeGuess={newPasscode} setPasscodeGuess={setNewPasscode} />
      <input
        type="number"
        placeholder="level..."
        onChange={(event) => {
          setNewlevel(event.target.value);
        }}
      />

      <button onClick={createusers}> Create users</button>
      {users.map((users) => {
        return (
          <div key={users.id}>
            {' '}
            <h1 className="text-3xl font-bold underline">Name: {users.name}</h1>
            <h1 className="text-3xl font-bold underline">
              level: {`${users.level}`}
            </h1>
            <button
              onClick={() => {
                updateusers(users.id, users.level);
              }}
            >
              {' '}
              Increase level
            </button>
            <button
              onClick={() => {
                deleteusers(users.id);
              }}
            >
              {' '}
              Delete users
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default CreateUsers;
