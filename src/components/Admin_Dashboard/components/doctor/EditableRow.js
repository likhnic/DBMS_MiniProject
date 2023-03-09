import React from "react";

const EditableRow = ({
  id,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a Position..."
          name="Position"
          value={editFormData.Position}
          onChange={handleEditFormChange}
        ></input>
      </td>
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
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required="required"
          placeholder="Enter a phone number (XXX-XXX-XXXX)..."
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
        <input
          type="number"
          min="0"
          max="1"
          required="required"
          placeholder="Enter a working status..."
          name="isWorking"
          value={editFormData.isWorking}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td> 
        <input
            type="email"
            required="required"
            placeholder="Enter a email..."
            name="Email"
            value={editFormData.Email}
            onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button className="btn btn-success me-1" type="submit">Save</button>
        <button className="btn btn-danger ms-1" type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;