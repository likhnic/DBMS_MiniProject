import React from "react";

const ReadOnlyRow = ({ databaseAdministrator, handleEditClick }) => {
  return (
    <tr>
      <td>{databaseAdministrator.AdminID}</td>
      <td>{databaseAdministrator.Name}</td>
      <td>{databaseAdministrator.Phone}</td>
      <td>{databaseAdministrator.Address}</td>
      <td>
        <button
          className="btn btn-primary"
          type="button"
          onClick={(event) => handleEditClick(event, databaseAdministrator)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;