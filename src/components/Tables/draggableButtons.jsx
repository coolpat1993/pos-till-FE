import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

const IndividualTable = ({ theName, id }) => {

    const deleteTable = async (id) => {
        const tableDoc = doc(db, `username/tablePlan/tables`, id);
        await deleteDoc(tableDoc);
    };

    return (
        <div className="center">
            <h1>POS-Till</h1>
            <h2>{theName}</h2>
            <h3>staff logged in </h3>
            <button
                onClick={() => {
                    deleteTable(id);
                }}
            >
                Delete item
            </button>
        </div>
    );
};

export default IndividualTable;