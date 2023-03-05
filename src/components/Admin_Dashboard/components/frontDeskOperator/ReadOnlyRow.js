import React from "react";

const ReadOnlyRow = ({ frontDeskOperator, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{frontDeskOperator.FrontDeskOpID}</td>
      <td>{frontDeskOperator.Name}</td>
      <td>{frontDeskOperator.Phone}</td>
      <td>{frontDeskOperator.Address}</td>
      <td>
        <button
          className="btn btn-primary"
          type="button"
          onClick={(event) => handleEditClick(event, frontDeskOperator)}
        >
          Edit
        </button>
        <button className="btn btn-danger mx-3" type="button" onClick={() => handleDeleteClick(frontDeskOperator.FrontDeskOpID)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;