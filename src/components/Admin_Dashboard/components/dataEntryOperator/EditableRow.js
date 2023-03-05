import React from "react";

const ReadOnlyRow = ({ dataEntryOperator, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="Name"
          value={editFormData.Name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="Phone"
          value={editFormData.Phone}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an address..."
          name="Address"
          value={editFormData.Address}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button className="btn btn-success me-1" type="submit">
          Save
        </button>
        <button
          className="btn btn-danger ms-1"
          type="button"
          onClick={(event) => handleEditClick(event, dataEntryOperator)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;