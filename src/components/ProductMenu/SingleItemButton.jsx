import { db } from '../../firebase-config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, addDoc } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { useContext } from 'react';
import { StaffContext } from '../StaffLogin/LoggedInStaff';
import { Card, Badge, Button, Container, Row, Col } from 'react-bootstrap';


const SingleItemButton = ({ name, price, id, counter, setNewCounter, tableName, userOrTable }) => {
  const { loggedInUser } = useContext(StaffContext);
  let staffUsername = loggedInUser.username;
  const { user } = UserAuth();
  let userName = user.email;

  let docLink = ''
  if (!userOrTable) { docLink = `${userName}/${tableName}/drinks` } else {
    docLink = `${userName}/currentOrders/${staffUsername}`
  }

  const addDrink = async () => {
    setNewCounter(counter + 1);
    await addDoc(collection(db, docLink), {
      name: name,
      price: price,
      quantity: 1,
    });
  };

  return (

    <Card
      className="card-button stretched-link"
      aria-label="change sort order"
      id={id}
      onClick={() => {
        addDrink();
      }}
    >
      <Card.Title className="d-flex mb-2 justify-content-between">
        {name}
      </Card.Title>
      £{price}
    </Card>

  );
};

export default SingleItemButton;
