import React from "react";

const ReadOnlyRow = ({ doctor, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{doctor.DocID}</td>
      <td>{doctor.Position}</td>
      <td>{doctor.Name}</td>
      <td>{doctor.Phone}</td>
      <td>{doctor.Address}</td>
      <td>{doctor.isWorking}</td>
        <td>{doctor.Email}</td>
      <td>
        <button
          className="btn btn-primary"
          type="button"
          onClick={(event) => handleEditClick(event, doctor)}
        >
          Edit
        </button>
        <button className="btn btn-danger mx-3" type="button" onClick={() => handleDeleteClick(doctor.DocID)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;