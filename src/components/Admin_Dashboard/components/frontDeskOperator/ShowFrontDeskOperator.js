import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const ShowFrontDeskOperator = () => {
  const [frontDeskOperators, setFrontDeskOperators] = useState(data);
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

  const [editFrontDeskOperatorId, setEditFrontDeskOperatorId] = useState(null);

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

    const newFrontDeskOperator = {
      FrontDeskOpID: nanoid(),
      Name: addFormData.Name,
      Phone: addFormData.Phone,
      Address: addFormData.Address,
    };

    const newFrontDeskOperators = [...frontDeskOperators, newFrontDeskOperator];
    setFrontDeskOperators(newFrontDeskOperators);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedFrontDeskOperator = {
      FrontDeskOpID: editFrontDeskOperatorId,
      Name: editFormData.Name,
      Phone: editFormData.Phone,
      Address: editFormData.Address,
    };

    const newFrontDeskOperators = [...frontDeskOperators];

    const index = frontDeskOperators.findIndex((frontDeskOperator) => frontDeskOperator.FrontDeskOpID === editFrontDeskOperatorId);

    newFrontDeskOperators[index] = editedFrontDeskOperator;

    setFrontDeskOperators(newFrontDeskOperators);
    setEditFrontDeskOperatorId(null);
  };

  const handleEditClick = (event, frontDeskOperator) => {
    event.preventDefault();
    setEditFrontDeskOperatorId(frontDeskOperator.FrontDeskOpID);

    const formValues = {
      Name: frontDeskOperator.Name,
      Phone: frontDeskOperator.Phone,
      Address: frontDeskOperator.Address,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditFrontDeskOperatorId(null);
  };

  const handleDeleteClick = (frontDeskOperatorId) => {
    const newFrontDeskOperators = [...frontDeskOperators];

    const index = frontDeskOperators.findIndex((frontDeskOperator) => frontDeskOperator.FrontDeskOpID === frontDeskOperatorId);

    newFrontDeskOperators.splice(index, 1);

    setFrontDeskOperators(newFrontDeskOperators);
  };

  return (
    <div>
      <h1>Front Desk Operators</h1>
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
            {frontDeskOperators.map((frontDeskOperator) => (
              <Fragment>
                {editFrontDeskOperatorId === frontDeskOperator.FrontDeskOpID ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    frontDeskOperator={frontDeskOperator}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add a Front Desk Operator</h2>
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

export default ShowFrontDeskOperator;
