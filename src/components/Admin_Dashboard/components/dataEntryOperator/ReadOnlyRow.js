import React from "react";

const ReadOnlyRow = ({ dataEntryOperator, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{dataEntryOperator.DataEntryOpID}</td>
      <td>{dataEntryOperator.Name}</td>
      <td>{dataEntryOperator.Phone}</td>
      <td>{dataEntryOperator.Address}</td>
      <td>
        <button
          className="btn btn-primary"
          type="button"
          onClick={(event) => handleEditClick(event, dataEntryOperator)}
        >
          Edit
        </button>
        <button className="btn btn-danger mx-3" type="button" onClick={() => handleDeleteClick(dataEntryOperator.DataEntryOpID)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;