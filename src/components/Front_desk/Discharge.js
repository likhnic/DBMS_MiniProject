import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '../Alert';

const Discharge = () => {
    const header_style = { textAlign: 'center' }

    const [data, setCredentials] = useState({ PatientAadhar: "" });

    let navigate = useNavigate();
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
      setAlert({
        message,
        type
      })
      setTimeout(() => {
        setAlert(null)
      }, 4000);
    }
    const handleOnClick = async (e) => {
        e.preventDefault();
        const { PatientAadhar } = data;
        console.log(data);
        const response = await fetch(
            'http://localhost:5000/api/frontdeskop/discharge', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({ PatientAadhar })
            })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            navigate("/frontdesk", { replace: true })
            // alert("Patient discharged successfully")
            showAlert("Patient discharged successfully", "success")
        }
        else if(json.error){
            // alert(json.error)
            showAlert(json.error, "danger")
        }
    }

    const handleOnChange = (e) => {
        setCredentials({...data, [e.target.name]: e.target.value})
    }


    const goBack = () => { 
        navigate("/frontdesk", { replace: true })
    }

    return (
        <>
            <div className='container mt-3'>
                <Alert alert={alert} />

            <button className="btn btn-outline-primary m-3" onClick={goBack} type="submit">Go Back</button>

                <form className='form-control shadow bg-body p-3 mb-5 '>
                <h1 style={header_style} className="mt-3"> Discharge Form </h1>
                    <div className="form-outline mb-4">
                        <input type="text" name="PatientAadhar" className="form-control" placeholder="Patient Aadhar" maxLength={12} minLength={12} onChange={handleOnChange} />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleOnClick}> Discharge Patient </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Discharge