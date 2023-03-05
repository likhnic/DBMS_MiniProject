import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import RegistrationForm from "./RegistrationForm";
import NB from "../NB";

const ShowDataEntryOperator = () => {
  const [dataEntryOperators, setDataEntryOperators] = useState([]);
  const [addFormData, setAddFormData] = useState({
    Name: "",
    Phone: "",
    Address: "",
    Aadhar: "",
    Password: "",
    rePassword: "",
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

  const addUser = async (newUser) => {
    const res = await fetch("http://localhost:5000/api/admin/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'token': localStorage.getItem('token')
      },

      body: JSON.stringify(newUser),
    });

    const jsonData = await res.json();

    return jsonData;
  };

  const addDataEntryOperator = async (newDataEntryOperator) => {
    const res = await fetch(
      "http://localhost:5000/api/admin/adddataentryoperator",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'token': localStorage.getItem('token')
        },

        body: JSON.stringify(newDataEntryOperator),
      }
    );

    const jsonData = await res.json();

    return jsonData;
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    if (addFormData.Password !== addFormData.rePassword) {
      alert("Password mismatch");
      return;
    }
    const newUser = {
      Aadhar: addFormData.Aadhar,
      Password: addFormData.Password,
      Type: 1,
      Status: 1,
    };
    var jsonData = await addUser(newUser);
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error adding data entry operator");
      return;
    }
    const newDataEntryOperator = {
      DataEntryOpID: jsonData.ID,
      Name: addFormData.Name,
      Phone: addFormData.Phone,
      Address: addFormData.Address,
    };
    jsonData = await addDataEntryOperator(newDataEntryOperator);
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error adding data entry operator");
      return;
    }
    alert("Added " + newDataEntryOperator.Name + " with Employee ID: " + newDataEntryOperator.DataEntryOpID);

    const newDataEntryOperators = [...dataEntryOperators, newDataEntryOperator];
    setDataEntryOperators(newDataEntryOperators);
  };

  const update_dataentryoperator = async (editedDataEntryOperator) => {
    const res = await fetch(
      "http://localhost:5000/api/admin/updatedataentryoperator",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'token': localStorage.getItem('token')
        },

        body: JSON.stringify(editedDataEntryOperator),
      }
    );

    const jsonData = await res.json();

    return jsonData;
  };

  const delete_dataentryoperator = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/admin/deletedataentryoperator`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify({ DataEntryOpID: id }),
      }
    );

    const jsonData = await res.json();

    return jsonData;
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedDataEntryOperator = {
      DataEntryOpID: editDataEntryOperatorId,
      Name: editFormData.Name,
      Phone: editFormData.Phone,
      Address: editFormData.Address,
    };

    const jsonData = update_dataentryoperator(editedDataEntryOperator);
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error updating data entry operator");
    } else {
      const newDataEntryOperators = [...dataEntryOperators];

      const index = dataEntryOperators.findIndex(
        (dataEntryOperator) =>
          dataEntryOperator.DataEntryOpID === editDataEntryOperatorId
      );

      newDataEntryOperators[index] = editedDataEntryOperator;

      setDataEntryOperators(newDataEntryOperators);
    }

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
    const jsonData = delete_dataentryoperator(dataEntryOperatorId);
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error deleting data entry operator");
    } else {
      const newDataEntryOperators = [...dataEntryOperators];

      const index = dataEntryOperators.findIndex(
        (dataEntryOperator) =>
          dataEntryOperator.DataEntryOpID === dataEntryOperatorId
      );

      newDataEntryOperators.splice(index, 1);

      setDataEntryOperators(newDataEntryOperators);
    }
  };

  const get_all_dataentryoperators = async () => {
    const response = await fetch(
      `http://localhost:5000/api/admin/getdataentryoperators`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'token': localStorage.getItem('token')
        },
      }
    );

    const jsonData = await response.json();
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error getting data entry operators");
    } else if (jsonData.empty) {
      console.log(jsonData.empty);
      alert("No data entry operators found");
    } else {
      setDataEntryOperators(jsonData.dataentryoperators);
    }
  };

  useEffect(() => {
    get_all_dataentryoperators();
  }, [dataEntryOperators]);

  return (
    <>
    <NB/>
    <div className="container">
      <h1 className="text-center container mt-3">Data Entry Operators</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table className="table table-hover">
          <thead>
            <tr style={{ backgroundColor: "#060b26", color: "white" }}>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataEntryOperators.map((dataEntryOperator) => (
              <Fragment key={dataEntryOperator.DataEntryOpID}>
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
      <RegistrationForm
        onSubmit={handleAddFormSubmit}
        onChange={handleAddFormChange}
      />
    </div>
    </>
  );
};

export default ShowDataEntryOperator;