import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const RegisterPatient = () => {
    const header_style = { textAlign: 'center' }

    const [data, setCredentials] = useState({ Name: "", Aadhar: "", Address: "", Phone: "", InsuranceID: "", PCPDocID: "" });

    let navigate = useNavigate();

    const handleOnClick = async (e) => {
        e.preventDefault();
        const { Name, Aadhar, Address, Phone, InsuranceID, PCPDocID } = data;
        console.log(data);
        const response = await fetch(
            'http://localhost:5000/api/frontdeskop/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },  
                body: JSON.stringify({Name, Aadhar, Address, Phone, InsuranceID, PCPDocID})  
            }
        )
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/frontdesk", { replace: true })
        }
    }

    const handleOnChange = (e) => {
        setCredentials({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='container mt-3'>
                <form className='form-control'>
            <h1 style={header_style} className="mt-3">Registration form</h1>
                    <div className="form-outline mb-4">
                        <input type="text" name="Name" className="form-control" placeholder="Name" onChange={handleOnChange} />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="number" name='Aadhar' className="form-control" placeholder='Aadhar' maxLength={12} minLength={12} onChange={handleOnChange} />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="text" name='Address' className="form-control" placeholder='Address' onChange={handleOnChange} />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="number" name="Phone" className="form-control" maxLength={12} minLength={10} placeholder="Phone Number" onChange={handleOnChange} />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="number" name="InsuranceID" className="form-control" placeholder="InsuranceID" onChange={handleOnChange} />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="number" name="PCPDocID" className="form-control" placeholder="PCPDocID" onChange={handleOnChange} />
                    </div>

                    {/* <!-- Submit button --> */}
                    <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleOnClick}>Register Patient</button>
                </form>
            </div>
        </>
    );
}

export default RegisterPatient;