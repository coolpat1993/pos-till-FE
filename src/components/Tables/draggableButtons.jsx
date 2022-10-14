import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { UserAuth } from "../context/AuthContext";

const IndividualTable = ({ theName, id, positions }) => {
    const { user } = UserAuth();
    let userName = user.email;

    const deleteTable = async (id) => {
        const tableDoc = doc(db, `${userName}/tablePlan/tables`, id);
        await deleteDoc(tableDoc);
    };

    const setTablePos = async (id) => {
        const drinkDoc = doc(db, `${userName}/tablePlan/tables`, id);
        const newFields = { x: positions.currentTable.x, y: positions.currentTable.y };
        await updateDoc(drinkDoc, newFields);
    };

    return (
        <div className="draggableTable">
            <h2>{theName}</h2>
            <button
                onClick={() => {
                    deleteTable(id);
                }}
            >
                Delete item
            </button>
            <button
                onClick={() => {
                    setTablePos(id);
                }}
            >
                set table Pos
            </button>
        </div>
    );
};

export default IndividualTable;