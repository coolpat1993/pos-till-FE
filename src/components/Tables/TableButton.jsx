const TableButton = ({
  tableName,
  setTableName,
  setNewCounter,
  counter,
  setUserOrTable,
}) => {
  return (
    <button
      className="button"
      onClick={() => {
        setTableName(tableName);
        setNewCounter(counter + 1);
        setUserOrTable(false);
      }}
    >
      {tableName}
    </button>
  );
};

export default TableButton;
