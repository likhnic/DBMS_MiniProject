import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import NB from "../NB";
import { useNavigate } from "react-router-dom";

const ShowDatabaseAdministrator = (props) => {
  let navigate = useNavigate();
  const [databaseAdministrators, setDatabaseAdministrators] = useState([]);

  const [editFormData, setEditFormData] = useState({
    Name: "",
    Phone: "",
    Address: "",
  });

  const [editDatabaseAdministratorId, setEditDatabaseAdministratorId] =
    useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const update_dbadmin = async (editedDatabaseAdministrator) => {
    const res = await fetch("http://localhost:5000/api/admin/updatedbadmin", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },

      body: JSON.stringify(editedDatabaseAdministrator),
    });

    const jsonData = await res.json();

    return jsonData;
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedDatabaseAdministrator = {
      AdminID: editDatabaseAdministratorId,
      Name: editFormData.Name,
      Phone: editFormData.Phone,
      Address: editFormData.Address,
    };

    const jsonData = update_dbadmin(editedDatabaseAdministrator);
    if (jsonData.error) {
      console.log(jsonData.error);
      props.alert("Error updating database administrator", "danger");
    } else {
      props.alert("Updated database administrator", "success");

      const newDatabaseAdministrators = [...databaseAdministrators];

      const index = databaseAdministrators.findIndex(
        (databaseAdministrator) =>
          databaseAdministrator.AdminID === editDatabaseAdministratorId
      );

      newDatabaseAdministrators[index] = editedDatabaseAdministrator;

      setDatabaseAdministrators(newDatabaseAdministrators);
    }
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

  const get_all_dbadmins = async () => {
    const response = await fetch(
      `http://localhost:5000/api/admin/getdbadmins`,
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
      props.alert("Error getting database administrators", "danger");
    } else if (jsonData.empty) {
      console.log(jsonData.empty);
      props.alert("No database administrators found", "danger");
    } else {
      setDatabaseAdministrators(jsonData.dbadmins);
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
    get_all_dbadmins();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    let searchKey = event.target.value;
    if (searchKey) {
      let result = await fetch(
        `http://localhost:5000/api/admin/getdbadmins/${searchKey}`,
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
        setDatabaseAdministrators([]);
      } else {
        setDatabaseAdministrators(result.dbadmins);
      }
    } else {
      get_all_dbadmins();
    }
  };

  return (
    <>
      {!loading && (
        <>
          <NB alert={props.alert} />

          <div className="container">
            <h1 className="text-center container mt-3">
              Database Administrators
            </h1>

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
                  navigate("/admin/dbadmin/add");
                }}
              >
                Add Database Administrator
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
                  {databaseAdministrators.map((databaseAdministrator) => (
                    <Fragment key={databaseAdministrator.AdminID}>
                      {editDatabaseAdministratorId ===
                      databaseAdministrator.AdminID ? (
                        <EditableRow
                          id={editDatabaseAdministratorId}
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRow
                          databaseAdministrator={databaseAdministrator}
                          handleEditClick={handleEditClick}
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

export default ShowDatabaseAdministrator;
