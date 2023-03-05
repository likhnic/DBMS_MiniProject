import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import RegistrationForm from "./RegistrationForm";

const ShowDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [addFormData, setAddFormData] = useState({
    Position: "",
    Name: "",
    Phone: "",
    Address: "",
    Aadhar: "",
    Password: "",
    rePassword: "",
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

  const addUser = async (newUser) => {
    const res = await fetch("http://localhost:5000/api/admin/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'token': localStorage.getItem('token')
      },

      body: JSON.stringify(newUser),
    });

    const jsonData = await res.json();

    return jsonData;
  };

  const addDoctor = async (newDoctor) => {
    const res = await fetch("http://localhost:5000/api/admin/adddoctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'token': localStorage.getItem('token')
      },

      body: JSON.stringify(newDoctor),
    });

    const jsonData = await res.json();

    return jsonData;
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
      Type: 2,
      Status: 1,
    };
    var jsonData = await addUser(newUser);
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error adding doctor");
      return;
    }
    const newDoctor = {
      DocID: jsonData.ID,
      Position: addFormData.Position,
      Name: addFormData.Name,
      Phone: addFormData.Phone,
      Address: addFormData.Address,
      isWorking: 1,
    };
    jsonData = await addDoctor(newDoctor);
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error adding doctor");
      return;
    }
    alert("Added " + newDoctor.Name + " with Employee ID: " + newDoctor.DocID);
    
    const newDoctors = [...doctors, newDoctor];
    setDoctors(newDoctors);
  };

  const update_docs = async (editedDoctor) => {
    const res = await fetch("http://localhost:5000/api/admin/updatedoctor", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'token': localStorage.getItem('token')
      },

      body: JSON.stringify(editedDoctor),
    });

    const jsonData = await res.json();

    return jsonData;
  };

  const delete_doc = async (id) => {
    const res = await fetch(`http://localhost:5000/api/admin/deletedoctor`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'token': localStorage.getItem('token')
      },
      body: JSON.stringify({ DocID: id }),
    });

    const jsonData = await res.json();

    return jsonData;
  };

  const handleEditFormSubmit = (event) => {
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
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error updating doctor");
    } else {
      const newDoctors = [...doctors];

      const index = doctors.findIndex(
        (doctor) => doctor.DocID === editDoctorId
      );

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
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error deleting doctor");
    } else {
      const newDoctors = [...doctors];

      const index = doctors.findIndex((doctor) => doctor.DocID === doctorId);

      newDoctors.splice(index, 1);

      setDoctors(newDoctors);
    }
  };

  const get_all_docs = async () => {
    const response = await fetch(`http://localhost:5000/api/admin/getdoctors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'token': localStorage.getItem('token')
      },
    });

    const jsonData = await response.json();
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error getting doctors");
    } else if (jsonData.empty) {
      console.log(jsonData.empty);
      alert("No doctors found");
    } else {
      setDoctors(jsonData.doctors);
    }
  }; 

  useEffect(() => {
    get_all_docs();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center container mt-3">
        Doctors
      </h1>
      <form onSubmit={handleEditFormSubmit}>
        <table className="table table-hover">
          <thead>
            <tr style={{backgroundColor:"#060b26", color:"white"}} >
              <th>Position</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Present</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <Fragment key={doctor.DocID}>
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
      <RegistrationForm
        onSubmit={handleAddFormSubmit}
        onChange={handleAddFormChange}
      />
    </div>
  );
};

export default ShowDoctor;
