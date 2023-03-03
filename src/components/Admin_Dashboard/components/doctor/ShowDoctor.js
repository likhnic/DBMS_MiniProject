import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { json } from "react-router-dom";

const ShowDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [addFormData, setAddFormData] = useState({
        Position: "",
        Name: "",
        Phone: "",
        Address: "",
        isWorking: null,
    });

    const [editFormData, setEditFormData] = useState({
        Position: "",
        Name: "",
        Phone: "",
        Address: "",
        isWorking: null,
    });

    const [editDoctorId, setEditDoctorId] = useState(null);

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

        const newDoctor = {
            DocID: nanoid(),
            Position: addFormData.Position,
            Name: addFormData.Name,
            Phone: addFormData.Phone,
            Address: addFormData.Address,
            isWorking: addFormData.isWorking,
        };

        const newDoctors = [...doctors, newDoctor];
        setDoctors(newDoctors);
    };

    const update_docs = async (editedDoctor) => {
        const res = await fetch('http://localhost:5000/api/admin/updatedoctor', 
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 'token': localStorage.getItem('token')
            },
            
            body: JSON.stringify(editedDoctor)
        });
        
        const jsonData = await res.json();
        
        return jsonData;
    }

    const delete_doc = async (id) => {
        const res = await fetch(`http://localhost:5000/api/admin/deletedoctor`, 
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // 'token': localStorage.getItem('token')
            },
            body : JSON.stringify({id: id})
        });
        
        const jsonData = await res.json();
        
        return jsonData;
    }

    const handleEditFormSubmit =  (event) => {
        event.preventDefault();

        const editedDoctor = {
            DocID: editDoctorId,
            Position: editFormData.Position,
            Name: editFormData.Name,
            Phone: editFormData.Phone,
            Address: editFormData.Address,
            isWorking: editFormData.isWorking,
        };

        const jsonData = update_docs(editedDoctor);
        if (jsonData.error)
        {
            console.log(jsonData.error);
            alert("Error updating doctor");
        }
        
        else {
            const newDoctors = [...doctors];

            const index = doctors.findIndex((doctor) => doctor.DocID === editDoctorId);

            newDoctors[index] = editedDoctor;

            setDoctors(newDoctors);
        }
        setEditDoctorId(null);
    };

    const handleEditClick = (event, doctor) => {
        event.preventDefault();
        setEditDoctorId(doctor.DocID);

        const formValues = {
            Position: doctor.Position,
            Name: doctor.Name,
            Phone: doctor.Phone,
            Address: doctor.Address,
            isWorking: doctor.isWorking,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditDoctorId(null);
    };

    const handleDeleteClick = (doctorId) => {
        const jsonData = delete_doc(doctorId);
        if (jsonData.error)
        {
            console.log(jsonData.error);
            alert("Error deleting doctor");
        }
        else {
            const newDoctors = [...doctors];

            const index = doctors.findIndex((doctor) => doctor.DocID === doctorId);

            newDoctors.splice(index, 1);
            
            setDoctors(newDoctors);
        }
    };

    const get_all_docs = async () => {
        const response = await fetch(
            `http://localhost:5000/api/admin/getdoctors`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // 'token': localStorage.getItem('token')
                },
            }
        );

        const jsonData = await response.json();
        setDoctors(jsonData.dctrs);
        // console.log(jsonData);
    }

    useEffect(() => {
        get_all_docs();
    }, []);

    return (
        <div>
            <h1>Doctors</h1>
            <form onSubmit={handleEditFormSubmit}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>isWorking</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <Fragment>
                                {editDoctorId === doctor.DocID ? (
                                    <EditableRow
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange}
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <ReadOnlyRow
                                        doctor={doctor}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>
            <h2>Add a Doctor</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input
                    type="text"
                    name="Position"
                    required="required"
                    placeholder="Enter a Position..."
                    onChange={handleAddFormChange}
                />
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
                <input
                    type="number"
                    min="0"
                    max="1"
                    name="isWorking"
                    required="required"
                    placeholder="Enter a working status..."
                    onChange={handleAddFormChange}
                />
                <button className="btn btn-primary" type="submit">
                    Add
                </button>
            </form>
        </div>
    );
};

export default ShowDoctor;
