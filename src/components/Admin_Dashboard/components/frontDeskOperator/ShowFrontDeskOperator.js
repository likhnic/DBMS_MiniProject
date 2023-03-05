import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import RegistrationForm from "./RegistrationForm";
import NB from "../NB";

const ShowFrontDeskOperator = () => {
  const [frontDeskOperators, setFrontDeskOperators] = useState([]);
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

  const [editFrontDeskOperatorId, setEditFrontDeskOperatorId] = useState(null);

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

  const addFrontDeskOperator = async (newFrontDeskOperator) => {
    const res = await fetch(
      "http://localhost:5000/api/admin/addfrontdeskoperator",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'token': localStorage.getItem('token')
        },

        body: JSON.stringify(newFrontDeskOperator),
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
      Type: 0,
      Status: 1,
    };
    var jsonData = await addUser(newUser);
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error adding front desk operator");
      return;
    }

    const newFrontDeskOperator = {
      FrontDeskOpID: jsonData.ID,
      Name: addFormData.Name,
      Phone: addFormData.Phone,
      Address: addFormData.Address,
    };
    jsonData = await addFrontDeskOperator(newFrontDeskOperator);
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error adding front desk operator");
      return;
    }
    alert("Added " + newFrontDeskOperator.Name + " with Employee ID: " + newFrontDeskOperator.FrontDeskOpID);

    const newFrontDeskOperators = [...frontDeskOperators, newFrontDeskOperator];
    setFrontDeskOperators(newFrontDeskOperators);
  };

  const update_frontdeskoperator = async (editedFrontDeskOperator) => {
    const res = await fetch(
      "http://localhost:5000/api/admin/updatefrontdeskoperator",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'token': localStorage.getItem('token')
        },

        body: JSON.stringify(editedFrontDeskOperator),
      }
    );

    const jsonData = await res.json();

    return jsonData;
  };

  const delete_frontdeskoperator = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/admin/deletefrontdeskoperator`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify({ FrontDeskOpID: id }),
      }
    );

    const jsonData = await res.json();

    return jsonData;
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedFrontDeskOperator = {
      FrontDeskOpID: editFrontDeskOperatorId,
      Name: editFormData.Name,
      Phone: editFormData.Phone,
      Address: editFormData.Address,
    };
    const jsonData = update_frontdeskoperator(editedFrontDeskOperator);
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error updating frontdeskoperator");
    } else {
      const newFrontDeskOperators = [...frontDeskOperators];

      const index = frontDeskOperators.findIndex(
        (frontDeskOperator) =>
          frontDeskOperator.FrontDeskOpID === editFrontDeskOperatorId
      );

      newFrontDeskOperators[index] = editedFrontDeskOperator;

      setFrontDeskOperators(newFrontDeskOperators);
    }
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
    const jsonData = delete_frontdeskoperator(frontDeskOperatorId);
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error deleting frontdeskoperator");
    } else {
      const newFrontDeskOperators = [...frontDeskOperators];

      const index = frontDeskOperators.findIndex(
        (frontDeskOperator) =>
          frontDeskOperator.FrontDeskOpID === frontDeskOperatorId
      );

      newFrontDeskOperators.splice(index, 1);

      setFrontDeskOperators(newFrontDeskOperators);
    }
  };

  const get_all_frontdeskoperators = async () => {
    const response = await fetch(
      `http://localhost:5000/api/admin/getfrontdeskoperators`,
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
      alert("Error getting frontdeskoperators");
    } else if (jsonData.empty) {
      console.log(jsonData.empty);
      alert("No front desk operators found");
    } else {
      setFrontDeskOperators(jsonData.frontdeskoperators);
    }
  };

  useEffect(() => {
    get_all_frontdeskoperators();
  }, [frontDeskOperators]);

  return (
    <>
    <NB/>
    <div className="container">
      <h1 className="text-center container mt-3">Front Desk Operators</h1>
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
            {frontDeskOperators.map((frontDeskOperator) => (
              <Fragment key={frontDeskOperator.FrontDeskOpID}>
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
      <RegistrationForm
        onSubmit={handleAddFormSubmit}
        onChange={handleAddFormChange}
      />
    </div>
    </>
  );
};

export default ShowFrontDeskOperator;