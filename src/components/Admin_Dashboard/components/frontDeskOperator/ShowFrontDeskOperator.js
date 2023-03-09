import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import NB from "../NB";
import { useNavigate } from "react-router-dom";

const ShowFrontDeskOperator = (props) => {
  let navigate = useNavigate();
  const [frontDeskOperators, setFrontDeskOperators] = useState([]);

  const [editFormData, setEditFormData] = useState({
    Name: "",
    Phone: "",
    Address: "",
  });

  const [editFrontDeskOperatorId, setEditFrontDeskOperatorId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const update_frontdeskoperator = async (editedFrontDeskOperator) => {
    const res = await fetch(
      "http://localhost:5000/api/admin/updatefrontdeskoperator",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
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
          token: localStorage.getItem("token"),
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
      props.alert("Error updating front desk operator", "danger");
    } else {
      props.alert("Updated front desk operator", "success");

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
      props.alert("Error deleting front desk operator", "danger");
    } else {
      props.alert("Deleted front desk operator", "success");
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
          token: localStorage.getItem("token"),
        },
      }
    );

    const jsonData = await response.json();
    if (jsonData.error) {
      console.log(jsonData.error);
      props.alert("Error getting frontdeskoperators", "danger");
    } else if (jsonData.empty) {
      console.log(jsonData.empty);
      props.alert("No front desk operators found", "danger");
    } else {
      setFrontDeskOperators(jsonData.frontdeskoperators);
    }
  };

  const [loading, setLoading] = useState(true);
  const onRenderpage = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/checkUser/3", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    const json = await response.json();
    if (json.error) {
      navigate("/", { replace: true });
    }
    setLoading(false);
  };

  useEffect(() => {
    onRenderpage();
    get_all_frontdeskoperators();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    let searchKey = event.target.value;
    if (searchKey) {
      let result = await fetch(
        `http://localhost:5000/api/admin/getfrontdeskoperators/${searchKey}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      result = await result.json();
      if (result.error || result.empty) {
        // alert("No doctors found");
        setFrontDeskOperators([]);
      } else {
        setFrontDeskOperators(result.frontdeskoperators);
      }
    } else {
      get_all_frontdeskoperators();
    }
  };

  return (
    <>
      {!loading && (
        <>
          <NB alert={props.alert} />
          <div className="container">
            <h1 className="text-center container mt-3">Front Desk Operators</h1>

            <div className="form-outline mb-4">
              <input
                className="form-control-sm"
                type="text"
                placeholder="Search by name..."
                onChange={handleSearch}
              />
              <button
                className="btn btn-primary mx-3"
                onClick={() => {
                  navigate("/admin/frontdesk/add");
                }}
              >
                Add Front Desk Operator
              </button>
            </div>

            <form onSubmit={handleEditFormSubmit}>
              <table className="table table-hover">
                <thead>
                  <tr style={{ backgroundColor: "#060b26", color: "white" }}>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {frontDeskOperators.map((frontDeskOperator) => (
                    <Fragment key={frontDeskOperator.FrontDeskOpID}>
                      {editFrontDeskOperatorId ===
                      frontDeskOperator.FrontDeskOpID ? (
                        <EditableRow
                          id={editFrontDeskOperatorId}
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
          </div>
        </>
      )}
    </>
  );
};

export default ShowFrontDeskOperator;
