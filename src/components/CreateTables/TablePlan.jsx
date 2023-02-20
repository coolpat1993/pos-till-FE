import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
//import Draggable from 'react-draggable';
import { db } from '../../firebase-config';
import { UserAuth } from '../context/AuthContext';
import IndividualTable from './IndividualTable';

const TablePlan = () => {
  const { user } = UserAuth();
  let userName = user.email;
  const [tempTables, setTables] = useState([]);
  const [count, setCount] = useState(0);
  const [tableName, setTableName] = useState('table21');

  useEffect(() => {
    const getTables = async () => {
      const data = await getDocs(
        collection(db, `${userName}/tablePlan/tables`)
      );
      setTables(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTables();
  }, [userName, count]);

  let tables = ['table 1'];

  if (tempTables.length > 0) {
    tables = tempTables;
  }

  const [positions, setPositions] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  //const nodeRef = useRef(null);

  useEffect(() => {
    if (tempTables.length > 0) {
      const existingDivPositions = tempTables;
      setPositions(existingDivPositions);
      setHasLoaded(true);
    }
  }, [tempTables, count]);

  /* const handleStop = async (e, data) => {
    let dummyPositions = {};
    dummyPositions['x'] = data.x;
    dummyPositions['y'] = data.y;
    setPositions(dummyPositions);
  };*/

  const createTable = async () => {
    setCount(count + 1);
    await addDoc(collection(db, `${userName}/tablePlan/tables`), {
      name: tableName,
      x: 0,
      y: 0,
    });
  };

  return (
    <div className="tables">
      <div className="tables__add">
        <input
          className="tables__add--input"
          placeholder="Name..."
          onChange={(event) => {
            setTableName(event.target.value);
          }}
        />
        <button
          className="button-2"
          onClick={() => {
            createTable();
          }}
        >
          Create Table +
        </button>
      </div>
      {tempTables.length > 0 && hasLoaded ? (
        <div className="tables__tablearea">
          {tables.map((item) => {
            return (
              <IndividualTable
                id={item.id}
                theName={item.name}
                positions={positions}
                setCount={setCount}
                count={count}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TablePlan;

// {tempTables.length > 0 && hasLoaded ? (
//   <div className="dragContainer">
//     {tables.map((item) => {
//       return (
//         <Draggable
//           defaultPosition={{ x: item.x, y: item.y }}
//           grid={[25, 25]}
//           nodeRef={nodeRef}
//           onStop={handleStop}
//           bounds={{ top: 30, left: 30, right: 800, bottom: 540 }}
//         >
//           <div ref={nodeRef}>
//             <IndividualTable
//               id={item.id}
//               theName={item.name}
//               positions={positions}
//               setCount={setCount}
//               count={count}
//             />
//           </div>
//         </Draggable>
//       );
//     })}
//   </div>
// ) : null}
