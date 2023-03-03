import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const ShowDatabaseAdministrator = () => {
  const [databaseAdministrators, setDatabaseAdministrators] = useState(data);
  const [addFormData, setAddFormData] = useState({
    Name: "",
    Phone: "",
    Address: "",
  });

  const [editFormData, setEditFormData] = useState({
    Name: "",
    Phone: "",
    Address: "",
  });

  const [editDatabaseAdministratorId, setEditDatabaseAdministratorId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newDatabaseAdministrator = {
      AdminID: nanoid(),
      Name: addFormData.Name,
      Phone: addFormData.Phone,
      Address: addFormData.Address,
    };

    const newDatabaseAdministrators = [...databaseAdministrators, newDatabaseAdministrator];
    setDatabaseAdministrators(newDatabaseAdministrators);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedDatabaseAdministrator = {
      AdminID: editDatabaseAdministratorId,
      Name: editFormData.Name,
      Phone: editFormData.Phone,
      Address: editFormData.Address,
    };

    const newDatabaseAdministrators = [...databaseAdministrators];

    const index = databaseAdministrators.findIndex((databaseAdministrator) => databaseAdministrator.AdminID === editDatabaseAdministratorId);

    newDatabaseAdministrators[index] = editedDatabaseAdministrator;

    setDatabaseAdministrators(newDatabaseAdministrators);
    setEditDatabaseAdministratorId(null);
  };

  const handleEditClick = (event, databaseAdministrator) => {
    event.preventDefault();
    setEditDatabaseAdministratorId(databaseAdministrator.AdminID);

    const formValues = {
      Name: databaseAdministrator.Name,
      Phone: databaseAdministrator.Phone,
      Address: databaseAdministrator.Address,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditDatabaseAdministratorId(null);
  };

  const handleDeleteClick = (databaseAdministratorId) => {
    const newDatabaseAdministrators = [...databaseAdministrators];

    const index = databaseAdministrators.findIndex((databaseAdministrator) => databaseAdministrator.AdminID === databaseAdministratorId);

    newDatabaseAdministrators.splice(index, 1);

    setDatabaseAdministrators(newDatabaseAdministrators);
  };

  return (
    <div>
      <h1>Database Administrators</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {databaseAdministrators.map((databaseAdministrator) => (
              <Fragment>
                {editDatabaseAdministratorId === databaseAdministrator.AdminID ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    databaseAdministrator={databaseAdministrator}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add a Database Administrator</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="Name"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="Phone"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="Address"
          required="required"
          placeholder="Enter an address..."
          onChange={handleAddFormChange}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default ShowDatabaseAdministrator;
