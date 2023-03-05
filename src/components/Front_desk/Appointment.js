import React, { useState } from 'react';
import { useNavigate } from 'react-router'; 

const Appointment = () => {
    const header_style = { textAlign: 'center' }

    const [data, setCredentials] = useState({ StartTime: "", EndTime: "", ExaminationRoom: "", PatientAadhar: "", DocID: "", Emergency: false });

    let navigate = useNavigate();

    const handleOnClick = async (e) => {
        e.preventDefault();
        let { StartTime, EndTime, ExaminationRoom, PatientAadhar, DocID, Emergency } = data;
        console.log(data);
        StartTime = new Date(StartTime).toISOString().slice(0, 19).replace('T', ' ');
        EndTime = new Date(EndTime).toISOString().slice(0, 19).replace('T', ' ');
        console.log(StartTime, EndTime);
        const response = await fetch(
            'http://localhost:5000/api/frontdeskop/appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({ StartTime, EndTime, ExaminationRoom, PatientAadhar, DocID, Emergency })
            })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            navigate("/frontdesk", { replace: true })
        }
        else if(json.error){
            alert(json.error)
        }
    }

    const handleOnChange = (e) => {
        setCredentials({ ...data, [e.target.name]: e.target.value })
        console.log(data);
    }

    const handleOnCheck = (e) => {
        setCredentials({ ...data, [e.target.name]: e.target.checked })
        console.log(data);
    }

    const goBack = () => { 
        navigate("/frontdesk", { replace: true })
    }

    return(
        <>
            <div className='container mt-3'>
            <button className="btn btn-outline-primary m-3" onClick={goBack} type="submit">Go Back</button>

                <form className='form-control shadow bg-body p-3 mb-5 '>
                <h1 style={header_style} className="mt-3">Appointment form</h1>
                    <div className="form-outline mb-4">
                        <label className='form-outline mx-2'>Start Time </label>
                        <input type="datetime-local" name="StartTime" requiredpattern="\d{4}-\d{2}-\d{2} \d{2}:\d{2}" onChange={handleOnChange}/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className='form-outline mx-2'>End Time </label>
                        <input type="datetime-local" name="EndTime" requiredpattern="\d{4}-\d{2}-\d{2} \d{2}:\d{2}" onChange={handleOnChange}/>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="text" name='ExaminationRoom' className="form-control" placeholder='Examination Room' onChange={handleOnChange} />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="text" name="PatientAadhar" className="form-control" placeholder="Patient Aadhar" onChange={handleOnChange} />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="number" name="DocID" className="form-control" placeholder="Doctor ID" onChange={handleOnChange} />
                    </div>

                    <input type="checkbox" className="btn-check" id="btncheck1" autocomplete="off" onClick={handleOnCheck} name="Emergency"/>
                    <label className="btn btn-outline-danger mb-4" for="btncheck1">Emergency</label>
                    <br/>

                    {/* <!-- Submit button --> */}
                    <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleOnClick}>Give Appointment</button>
                </form>
            </div>
        </>
    )
}

export default Appointment