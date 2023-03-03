import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const ShowDataEntryOperator = () => {
  const [dataEntryOperators, setDataEntryOperators] = useState(data);
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

  const [editDataEntryOperatorId, setEditDataEntryOperatorId] = useState(null);

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

    const newDataEntryOperator = {
      DataEntryOpID: nanoid(),
      Name: addFormData.Name,
      Phone: addFormData.Phone,
      Address: addFormData.Address,
    };

    const newDataEntryOperators = [...dataEntryOperators, newDataEntryOperator];
    setDataEntryOperators(newDataEntryOperators);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedDataEntryOperator = {
      DataEntryOpID: editDataEntryOperatorId,
      Name: editFormData.Name,
      Phone: editFormData.Phone,
      Address: editFormData.Address,
    };

    const newDataEntryOperators = [...dataEntryOperators];

    const index = dataEntryOperators.findIndex((dataEntryOperator) => dataEntryOperator.DataEntryOpID === editDataEntryOperatorId);

    newDataEntryOperators[index] = editedDataEntryOperator;

    setDataEntryOperators(newDataEntryOperators);
    setEditDataEntryOperatorId(null);
  };

  const handleEditClick = (event, dataEntryOperator) => {
    event.preventDefault();
    setEditDataEntryOperatorId(dataEntryOperator.DataEntryOpID);

    const formValues = {
      Name: dataEntryOperator.Name,
      Phone: dataEntryOperator.Phone,
      Address: dataEntryOperator.Address,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditDataEntryOperatorId(null);
  };

  const handleDeleteClick = (dataEntryOperatorId) => {
    const newDataEntryOperators = [...dataEntryOperators];

    const index = dataEntryOperators.findIndex((dataEntryOperator) => dataEntryOperator.DataEntryOpID === dataEntryOperatorId);

    newDataEntryOperators.splice(index, 1);

    setDataEntryOperators(newDataEntryOperators);
  };

  return (
    <div>
      <h1>Data Entry Operators</h1>
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
            {dataEntryOperators.map((dataEntryOperator) => (
              <Fragment>
                {editDataEntryOperatorId === dataEntryOperator.DataEntryOpID ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    dataEntryOperator={dataEntryOperator}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add a Data Entry Operator</h2>
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

export default ShowDataEntryOperator;
