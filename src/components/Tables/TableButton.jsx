
const TableButton = ({ tableName, setTableName, setNewCounter, counter, setUserOrTable }) => {

    return (
        <button className="draggableTable"
            onClick={() => {
                setTableName(tableName)
                setNewCounter(counter + 1);
                setUserOrTable(false)
            }}
        >{tableName}
        </button>
    );
};

export default TableButton;