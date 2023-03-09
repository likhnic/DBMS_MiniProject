import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import NB from "../NB";
import { useNavigate } from "react-router-dom";

const ShowDataEntryOperator = (props) => {
  let navigate = useNavigate();
  const [dataEntryOperators, setDataEntryOperators] = useState([]);

  const [editFormData, setEditFormData] = useState({
    Name: "",
    Phone: "",
    Address: "",
  });

  const [editDataEntryOperatorId, setEditDataEntryOperatorId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const update_dataentryoperator = async (editedDataEntryOperator) => {
    const res = await fetch(
      "http://localhost:5000/api/admin/updatedataentryoperator",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
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
          token: localStorage.getItem("token"),
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
      props.alert("Error updating data entry operator", "danger");
    } else {
      props.alert("Updated data entry operator", "success");

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
      props.alert("Error deleting data entry operator", "danger");
    } else {
      props.alert("Deleted data entry operator", "success");
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
          token: localStorage.getItem("token"),
        },
      }
    );

    const jsonData = await response.json();
    if (jsonData.error) {
      console.log(jsonData.error);
      props.alert("Error getting data entry operators", "danger");
    } else if (jsonData.empty) {
      console.log(jsonData.empty);
      props.alert("No data entry operators found", "danger");
    } else {
      setDataEntryOperators(jsonData.dataentryoperators);
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
    get_all_dataentryoperators();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    let searchKey = event.target.value;
    if (searchKey) {
      let result = await fetch(
        `http://localhost:5000/api/admin/getdataentryoperators/${searchKey}`,
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
        setDataEntryOperators([]);
      } else {
        setDataEntryOperators(result.dataentryoperators);
      }
    } else {
      get_all_dataentryoperators();
    }
  };

  return (
    <>
      {!loading && (
        <>
          <NB alert={props.alert} />
          <div className="container">
            <h1 className="text-center container mt-3">Data Entry Operators</h1>

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
                  navigate("/admin/dataentry/add");
                }}
              >
                Add Data Entry Operator
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
                  {dataEntryOperators.map((dataEntryOperator) => (
                    <Fragment key={dataEntryOperator.DataEntryOpID}>
                      {editDataEntryOperatorId ===
                      dataEntryOperator.DataEntryOpID ? (
                        <EditableRow
                          id={editDataEntryOperatorId}
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
          </div>
        </>
      )}
    </>
  );
};

export default ShowDataEntryOperator;
