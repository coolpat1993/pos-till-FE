import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { db } from "../../firebase-config";
import { UserAuth } from "../context/AuthContext";

const TablePlan = () => {
  const { user } = UserAuth();
  let userName = user.email;

  const [tempTables, setTables] = useState([])
  useEffect(() => {
    const getdrinks = async () => {
      const data = await getDocs(collection(db, `username/tablePlan/tables`));
      setTables(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("warning for if this is running too many times");
    };

    getdrinks();
  }, [userName]);

  let tables = ["table 1"];

  if (tempTables.length > 0) {
    tables = (Object.keys(tempTables[0]?.positions))
    console.log(tempTables[0]?.positions, '<<< temp positions')
  }
  // console.log(Object.keys(tempTables[0]?.positions))



  const [positions, setPositions] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (tempTables.length > 0) {
      const existingDivPositions = tempTables[0]?.positions;
      setPositions(existingDivPositions);
      setHasLoaded(true);
      console.log(existingDivPositions, 'existing positions');
      console.log("has loaded");
    }
  }, [tempTables]);

  function handleStop(e, data) {
    let dummyPositions = { ...positions };
    const itemId = e.target.id;
    dummyPositions[itemId] = {};
    dummyPositions[itemId]["x"] = data.x;
    dummyPositions[itemId]["y"] = data.y;
    setPositions(dummyPositions);
  }


  const addTables = async () => {
    await updateDoc(collection(db, `username/tablePlan/tables`), {
      positions
    });
  };

  const updateTables = async (id) => {
    const drinkDoc = doc(db, `username/tablePlan/tables`, id);
    const newFields = { positions };
    await updateDoc(drinkDoc, newFields);
  };

  return hasLoaded ? (
    <div>
      <div>
        <button
          onClick={() => {
            updateTables(tempTables[0].id);
          }}
        >
          updatePositions
        </button>
      </div>
      {tables.map((item) => {
        return (
          <>
            <Draggable
              defaultPosition={
                positions === null
                  ? { x: 0, y: 0 }
                  : !positions[item]
                    ? { x: 0, y: 0 }
                    : { x: positions[item].x, y: positions[item].y }
              }
              position={null}
              grid={[25, 25]}
              key={item}
              nodeRef={nodeRef}
              onStop={handleStop}
            >
              <div ref={nodeRef}>
                <div id={item}>{item}</div>
              </div>
            </Draggable>
          </>
        );
      })}{" "}
      <button id="set tables" onClick={() => {
        addTables()
      }}>set tables</button>
    </div>
  ) : null;
}

export default TablePlan;



