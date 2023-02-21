import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { UserAuth } from '../context/AuthContext';

const IndividualTable = ({ theName, id, positions, setCount, count }) => {
  const { user } = UserAuth();
  let userName = user.email;

  const deleteTable = async (id) => {
    setCount(count + 1);
    const tableDoc = doc(db, `${userName}/tablePlan/tables`, id);
    await deleteDoc(tableDoc);
  };

  const setTablePos = async (id) => {
    setCount(count + 1);
    const drinkDoc = doc(db, `${userName}/tablePlan/tables`, id);
    const newFields = { x: positions.x, y: positions.y };
    await updateDoc(drinkDoc, newFields);
  };

  return (
    <div
      className="tables__tablearea_card"
      onMouseUp={() => {
        setTablePos(id);
      }}
    >
      <p>{theName}</p>
      <button
        className="button-2"
        onClick={() => {
          deleteTable(id);
        }}
      >
        Delete table
      </button>
    </div>
  );
};

export default IndividualTable;
