import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
;

const Appointment = (props) => {
    const header_style = { textAlign: 'center' }
    const [slots, setSlots] = useState([]);
    const [data, setCredentials] = useState({ StartDate: "", ExaminationRoom: "", PatientAadhar: "", DocID: "", Emergency: false });
    const [sentReq, setSentReq] = useState(false);
    let navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
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
        let { StartDate, ExaminationRoom, PatientAadhar, DocID, Emergency } = data;
        console.log(data);

        const getAttr = (e) => {
            let attr = e.target.getAttribute('name');
            return attr;
        }
        const StartTime = getAttr(e);
        console.log(StartTime);
        const response = await fetch(
            'http://localhost:5000/api/frontdeskop/appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({ StartTime, StartDate, ExaminationRoom, PatientAadhar, DocID, Emergency })
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            navigate("/frontdesk", { replace: true })
            // alert("Appointment created successfully")
            props.alert("Appointment created successfully", "success")
        }
        else if (json.error) {
            // alert(json.error)
            props.alert(json.error, "danger")
        }
    }

    const getSlots = async (e) => {
        e.preventDefault();
        let { StartDate, DocID, Emergency } = data;
        if (StartDate === "" || DocID === "" || Emergency === "") {
            // alert("Please fill all the fields")
            props.alert("Please fill all the fields", "danger")
            return;
        }
        console.log(data);
        const response = await fetch(
            'http://localhost:5000/api/frontdeskop/getslots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({ StartDate, DocID, Emergency })
        })
        const jsonData = await response.json();
        console.log(jsonData);
        if (jsonData.error) {
            // alert(jsonData.error)
            props.alert(jsonData.error, "danger")
        }
        setSlots(jsonData.slots);
        setSentReq(true);
    }

    const handleOnChange = (e) => {
        setSlots([]);
        setCredentials({ ...data, [e.target.name]: e.target.value })
        console.log(data);
    }

    const handleOnCheck = (e) => {
        setSlots([]);
        setCredentials({ ...data, [e.target.name]: e.target.checked })
        console.log(data);
    }

    const goBack = () => {
        navigate("/frontdesk", { replace: true })
    }

    const getTime = () => {
        let time = new Date()
        let ans = ("0" + time.getHours()).slice(-2) + ":" +
            ("0" + time.getMinutes()).slice(-2) + ":" +
            ("0" + time.getSeconds()).slice(-2)
        return ans;
    }

    const getDate = () => {
        let time = new Date()
        let ans = (time.getFullYear()) + "-" +
            ("0" + (time.getMonth() + 1)).slice(-2) + "-" +
            ("0" + time.getDate()).slice(-2)
        return ans;
    }

    return (
        <>
            {!loading && <>
                <div className='container mt-3'>

                    <button className="btn btn-outline-primary m-3" onClick={goBack} type="submit">Go Back</button>

                    <form className='form-control shadow bg-body p-3 mb-5 '>
                        <h1 style={header_style} className="mt-3 mb-4">Appointment form</h1>
                        <div className="form-outline mb-4 col-sm">
                            <label className='form-outline mx-2'> Date </label>
                            <input type="date" name="StartDate" requiredpattern="\d{4}-\d{2}-\d{2}" onChange={handleOnChange} />
                        </div>

                        {/* <div className="form-outline mb-4 col-sm">
                            <input placeholder='Slot Number' name='StartTime' type="number" min={1} max={25} onChange={handleOnChange} />
                        </div> */}

                        <div className="form-outline mb-4">
                            <input type="text" name='ExaminationRoom' className="form-control" placeholder='Examination Room' onChange={handleOnChange} />
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" name="PatientAadhar" className="form-control" placeholder="Patient Aadhar" maxLength={12} minLength={12} onChange={handleOnChange} />
                        </div>

                        <div className="form-outline mb-4">
                            <input type="number" name="DocID" className="form-control" placeholder="Doctor ID" onChange={handleOnChange} min={1} />
                        </div>

                        <input type="checkbox" className="btn-check" id="btncheck1" autoComplete='off' onClick={handleOnCheck} name="Emergency" />
                        <label className="btn btn-outline-danger mb-4" htmlFor="btncheck1">Emergency</label>
                        <br />

                        {/* <!-- Submit button --> */}
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={getSlots}>Get Slots</button>
                        </div>
                    </form>
                </div>

                {slots.length > 0 && (
                    <div className="container">
                        <div className='row'>
                            {
                                slots.map((slot, index) => {
                                    let time = getTime()
                                    let date = getDate()
                                    if (data.StartDate > date || slot > time) {
                                        console.log(slot, time, data.StartDate, date)
                                        return (
                                            <div key={index} className="btn btn-primary col-md-2 mt-2 mx-3" name={slot} onClick={handleOnClick}>
                                                {slot}
                                            </div>
                                        )
                                    }
                                    return null;
                                })
                            }
                        </div>
                    </div>
                )}
            </>}
        </>
    )
}

export default Appointment