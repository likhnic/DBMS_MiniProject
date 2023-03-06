import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const RegisterPatient = (props) => {
    const header_style = { textAlign: 'center' }
    const [loading, setLoading] = useState(true);
    const [data, setCredentials] = useState({ Name: "", Aadhar: "", Address: "", Phone: "", InsuranceID: "", PCPDocID: "", Age: 1, Gender: "" });

    let navigate = useNavigate();
    const onRender = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5000/checkUser/0', {
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
        onRender();
    }, [])

    const handleOnClick = async (e) => {
        e.preventDefault();
        const { Name, Aadhar, Address, Phone, InsuranceID, PCPDocID, Age, Gender } = data;
        console.log(data);
        const response = await fetch(
            'http://localhost:5000/api/frontdeskop/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({ Name, Aadhar, Address, Phone, InsuranceID, PCPDocID, Age, Gender })
        }
        )
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth token and redirect
            props.alert("Patient registered successfully", "success")
            navigate("/frontdesk", { replace: true })
        }
        else if (!json.success) {
            props.alert(json.error, "danger")
        }
    }

    const handleOnChange = (e) => {
        setCredentials({ ...data, [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value);
    }
    const goBack = () => {
        navigate("/frontdesk", { replace: true })
    }
    return (
        <>
            {!loading && <div className='container mt-3'>

                <button className="btn btn-outline-primary m-3" onClick={goBack} type="submit">Go Back</button>

                <form className='form-control shadow bg-body p-3 mb-5'>
                    <h1 style={header_style} className="mt-3">Registration form</h1>
                    <div className="form-outline mb-4">
                        <input type="text" name="Name" className="form-control" placeholder="Name" onChange={handleOnChange} />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="text" name='Aadhar' className="form-control" placeholder='Aadhar' maxLength={12} minLength={12} onChange={handleOnChange} />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="text" name='Address' className="form-control" placeholder='Address' onChange={handleOnChange} />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="text" name="Phone" className="form-control" maxLength={20} minLength={10} placeholder="Phone Number" onChange={handleOnChange} />
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-outline mb-4">
                                <input type="number" name='Age' className="form-control" placeholder="Age" onChange={handleOnChange} min={1} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline mb-4">
                                <select name='Gender' className='form-control' defaultValue={'Gender'} onChange={handleOnChange}>
                                    <option disabled> Gender</option>
                                    <option value={'M'}>Male</option>
                                    <option value={'F'}>Female</option>
                                    <option value={'O'}>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="form-outline mb-4">
                                <input type="number" name="InsuranceID" className="form-control" placeholder="InsuranceID" onChange={handleOnChange} min={1} />
                            </div>
                        </div>
                        <div className="col">

                            <div className="form-outline mb-4">
                                <input type="number" name="PCPDocID" className="form-control" placeholder="PCPDocID" onChange={handleOnChange} min={1} />
                            </div>
                        </div>
                    </div>

                    {/* <!-- Submit button --> */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleOnClick}>Register Patient</button>
                    </div>
                </form>
            </div>}
        </>
    );
}

export default RegisterPatient;