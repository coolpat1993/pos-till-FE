import { addDoc, collection, doc, getDocs, updateDoc, } from "firebase/firestore";
import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { db } from "../../firebase-config";
import { UserAuth } from "../context/AuthContext";
import IndividualTable from "./draggableButtons";

const TablePlan = () => {
  const { user } = UserAuth();
  let userName = user.email;
  const [tempTables, setTables] = useState([])
  const [count, setCount] = useState(0)
  const [tableName, setTableName] = useState('table1')

  useEffect(() => {
    const getTables = async () => {
      const data = await getDocs(collection(db, `${userName}/tablePlan/tables`));
      setTables(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("warning for if this is running too many times");
    };

    getTables();
  }, [userName, count]);

  let tables = ["table 1"];

  if (tempTables.length > 0) {
    tables = tempTables
  }

  const [positions, setPositions] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (tempTables.length > 0) {
      const existingDivPositions = tempTables;
      setPositions(existingDivPositions);
      setHasLoaded(true);
      console.log("has loaded");
    }
  }, [tempTables, count]);

  const handleStop = async (e, data) => {
    let dummyPositions = {};
    dummyPositions["x"] = data.x;
    dummyPositions["y"] = data.y;
    setPositions(dummyPositions);
  }

  const createTable = async () => {
    setCount(count + 1);
    await addDoc(collection(db, `${userName}/tablePlan/tables`), {
      name: tableName,
      x: 0,
      y: 0,
    });
  };


  return (
    <div>
      <input
        placeholder="Name..."
        onChange={(event) => {
          setTableName(event.target.value);
        }}
      />
      <button
        onClick={() => {
          createTable();
        }}
      >
        Create Table +
      </button>
      {tempTables.length > 0 && hasLoaded ?
        <div>
          {tables.map((item) => {
            return (
              <div key={item.id}>
                <Draggable
                  defaultPosition={
                    { x: item.x, y: item.y }
                  }
                  grid={[25, 25]}
                  nodeRef={nodeRef}
                  onStop={handleStop}
                >
                  <div ref={nodeRef}>
                    <IndividualTable
                      id={item.id}
                      theName={item.name}
                      positions={positions}
                      setCount={setCount}
                      count={count} />
                  </div>
                </Draggable>
              </div>
            );
          })}
        </div> : null}
    </div>
  );
}

export default TablePlan;



