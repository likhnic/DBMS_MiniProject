import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import RegistrationForm from "./RegistrationForm";
import NB from "../NB";
import { useNavigate } from "react-router-dom";

const ShowDatabaseAdministrator = (props) => {
    let navigate = useNavigate();
    const [databaseAdministrators, setDatabaseAdministrators] = useState([]);
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

    const [editDatabaseAdministratorId, setEditDatabaseAdministratorId] =
        useState(null);

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

    const addDatabaseAdministrator = async (newDatabaseAdministrator) => {
        const res = await fetch("http://localhost:5000/api/admin/adddbadmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'token': localStorage.getItem('token')
            },

            body: JSON.stringify(newDatabaseAdministrator),
        });

        const jsonData = await res.json();

        return jsonData;
    };

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        if (addFormData.Password !== addFormData.rePassword) {
            props.alert("Password mismatch", "danger");
            return;
        }
        const newUser = {
            Aadhar: addFormData.Aadhar,
            Password: addFormData.Password,
            Type: 3,
            Status: 1,
        };
        var jsonData = await addUser(newUser);
        if (jsonData.error) {
            console.log(jsonData.error);
            props.alert("Error adding database administrator", "danger");
            return;
        }
        const newDatabaseAdministrator = {
            AdminID: jsonData.ID,
            Name: addFormData.Name,
            Phone: addFormData.Phone,
            Address: addFormData.Address,
        };
        jsonData = await addDatabaseAdministrator(newDatabaseAdministrator);
        if (jsonData.error) {
            console.log(jsonData.error);
            props.alert("Error adding database administrator", "danger");
            return;
        }
        props.alert("Added " + newDatabaseAdministrator.Name + " with Employee ID: " + newDatabaseAdministrator.AdminID, "success");

        const newDatabaseAdministrators = [
            ...databaseAdministrators,
            newDatabaseAdministrator,
        ];

        setDatabaseAdministrators(newDatabaseAdministrators);
    };

    const update_dbadmin = async (editedDatabaseAdministrator) => {
        const res = await fetch("http://localhost:5000/api/admin/updatedbadmin", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'token': localStorage.getItem('token')
            },

            body: JSON.stringify(editedDatabaseAdministrator),
        });

        const jsonData = await res.json();

        return jsonData;
    };

    const delete_dbadmin = async (id) => {
        const res = await fetch(`http://localhost:5000/api/admin/deletedbadmin`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({ AdminID: id }),
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

    const handleDeleteClick = (databaseAdministratorId) => {
        const jsonData = delete_dbadmin(databaseAdministratorId);
        if (jsonData.error) {
            console.log(jsonData.error);
            props.alert("Error deleting database administrator", "danger");
        } else {
            const newDatabaseAdministrators = [...databaseAdministrators];

            const index = databaseAdministrators.findIndex(
                (databaseAdministrator) =>
                    databaseAdministrator.AdminID === databaseAdministratorId
            );

            newDatabaseAdministrators.splice(index, 1);

            setDatabaseAdministrators(newDatabaseAdministrators);
        }
    };

    const get_all_dbadmins = async () => {
        const response = await fetch(
            `http://localhost:5000/api/admin/getdbadmins`,
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
        const response = await fetch('http://localhost:5000/checkUser/3', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        }
        )
        const json = await response.json();
        if (json.error) {
            navigate("/", { replace: true })
        }
        setLoading(false);
    }

    useEffect(() => {
        onRenderpage();
        get_all_dbadmins();
    }, [databaseAdministrators]);

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
                        'token': localStorage.getItem('token')
                    },
                }
            );
            result = await result.json();
            if (result.error || result.empty) {
                setDatabaseAdministrators([]);
            }
            else {
                setDatabaseAdministrators(result.dbadmins);
            }
        } else {
            get_all_dbadmins();
        }
    };

    return (
        <>
        {!loading && <>
            <NB alert={props.alert} />

            <div className="container">
                <h1 className="text-center container mt-3">Database Administrators</h1>

                <div className="form-outline mb-4">
                    <input
                        className="form-control-sm"
                        type="text"
                        placeholder="Search by name..."
                        onChange={handleSearch}
                    />
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
        </>}
        </>
    );
};

export default ShowDatabaseAdministrator;