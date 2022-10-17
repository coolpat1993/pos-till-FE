import { collection, getDocs, } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { db } from "../../firebase-config";
import { UserAuth } from "../context/AuthContext";
import TableButton from "../Tables/TableButton";

const Tables = ({ setTableName, setProducts, setNewCounter, counter, setUserOrTable }) => {
    const { user } = UserAuth();
    let userName = user.email;
    const [tempTables, setTables] = useState([])

    useEffect(() => {
        const getTables = async () => {
            const data = await getDocs(collection(db, `${userName}/tablePlan/tables`));
            setTables(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log("warning for if this is running too many times");
        };

        getTables();
    }, [userName]);
    let tables = ["table 1"];
    if (tempTables.length > 0) {
        tables = tempTables
    }
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        if (tempTables.length > 0) {
            setHasLoaded(true);
        }
    }, [tempTables]);

    return (
        <div>
            {tempTables.length > 0 && hasLoaded ?
                <div>
                    {tables.map((table) => {
                        return (
                            <div key={table.id}>
                                <Draggable
                                    defaultPosition={
                                        { x: table.x, y: table.y }
                                    }
                                    disabled={true}
                                >
                                    <div>
                                        <TableButton tableName={table.name}
                                            setTableName={setTableName}
                                            setProducts={setProducts}
                                            setNewCounter={setNewCounter}
                                            counter={counter}
                                            setUserOrTable={setUserOrTable} />

                                    </div>
                                </Draggable>
                            </div>
                        );
                    })}
                </div> : null}
        </div>
    );
}

export default Tables;



