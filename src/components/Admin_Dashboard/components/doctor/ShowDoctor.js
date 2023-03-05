import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import RegistrationForm from "./RegistrationForm";
import NB from "../NB";

const ShowDoctor = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [addFormData, setAddFormData] = useState({
    Position: "",
    Name: "",
    Phone: "",
    Address: "",
    Aadhar: "",
    Email:"",
    Password: "",
    rePassword: "",
  });

  const [editFormData, setEditFormData] = useState({
    Position: "",
    Name: "",
    Phone: "",
    Address: "",
    Email:"",
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
        'token': localStorage.getItem('token')
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
        'token': localStorage.getItem('token')
      },

      body: JSON.stringify(newDoctor),
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
      Type: 2,
      Status: 1,
    };
    var jsonData = await addUser(newUser);
    if (jsonData.error) {
      console.log(jsonData.error);
      props.alert("Error adding doctor", "danger");
      return;
    }
    const newDoctor = {
      DocID: jsonData.ID,
      Position: addFormData.Position,
      Name: addFormData.Name,
      Phone: addFormData.Phone,
      Address: addFormData.Address,
        Email: addFormData.Email,
      isWorking: 1,
    };
    jsonData = await addDoctor(newDoctor);
    if (jsonData.error) {
      console.log(jsonData.error);
      props.alert("Error adding doctor", "danger");
      return;
    }
    props.alert("Added " + newDoctor.Name + " with Employee ID: " + newDoctor.DocID, "success");

    const newDoctors = [...doctors, newDoctor];
    setDoctors(newDoctors);
  };

  const update_docs = async (editedDoctor) => {
    const res = await fetch("http://localhost:5000/api/admin/updatedoctor", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'token': localStorage.getItem('token')
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
        'token': localStorage.getItem('token')
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
      Email: editFormData.Email,
    };

    const jsonData = update_docs(editedDoctor);
    if (jsonData.error) {
      console.log(jsonData.error);
      props.alert("Error updating doctor", "danger");
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
        Email: doctor.Email,
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
      props.alert("Error deleting doctor", "danger");
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
        'token': localStorage.getItem('token')
      },
    });

    const jsonData = await response.json();
    if (jsonData.error) {
      console.log(jsonData.error);
      props.alert("Error getting doctors", "danger");
    } else if (jsonData.empty) {
      console.log(jsonData.empty);
      props.alert("No doctors found", "danger");
    } else {
      setDoctors(jsonData.doctors);
    }
  }; 

  useEffect(() => {
    get_all_docs();
  }, [doctors]);

  const handleSearch = async (event) => {
    event.preventDefault();
    let searchKey = event.target.value;
    if (searchKey) {
      let result = await fetch(
        `http://localhost:5000/api/admin/getdoctors/${searchKey}`,
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
        // alert("No doctors found");
        setDoctors([]);
      }
      else{
        setDoctors(result.doctors);
      }
    } else {
      get_all_docs();
    }
  };

  return (
    <>
    <NB/>
    <div className="container">
      <h1 className="text-center container mt-3">Doctors</h1>

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
              <th>Position</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Present</th>
                <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <Fragment key={doctor.DocID}>
                {editDoctorId === doctor.DocID ? (
                  <EditableRow
                    id={editDoctorId}
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
    </>
  );
};

export default ShowDoctor;