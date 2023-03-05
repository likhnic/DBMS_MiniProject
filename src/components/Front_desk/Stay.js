import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
;

const Stay = (props) => {
    const header_style = { textAlign: 'center' }

    const [data, setCredentials] = useState({ StartTime: "", RoomNo: "", PatientAadhar: "" });
    const getTime = (t) => {
        let time = new Date(t)
        let ans = ("0" + time.getHours()).slice(-2) + ":" +
            ("0" + time.getMinutes()).slice(-2) + ":" +
            ("0" + time.getSeconds()).slice(-2)
        return ans;
    }

    const getDate = (t) => {
        let time = new Date(t)
        let ans = (time.getFullYear()) + "-" +
            ("0" + (time.getMonth() + 1)).slice(-2) + "-" +
            ("0" + time.getDate()).slice(-2)
        return ans;
    }
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
        let { StartTime, RoomNo, PatientAadhar } = data;
        console.log(data);
        StartTime = getDate(StartTime)+" "+getTime(StartTime);
        const response = await fetch(
            'http://localhost:5000/api/frontdeskop/stay', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({ StartTime, RoomNo, PatientAadhar })
            })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth token and redirect
            // alert("Stay created successfully")
            props.alert("Stay created successfully", "success")
            navigate("/frontdesk", { replace: true })
        }
        else{
            // alert(json.error)
            props.alert(json.error, "danger")
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
            {!loading && <div className='container mt-3'>
                
            <button className="btn btn-outline-primary m-3" onClick={goBack} type="submit">Go Back</button>

                <form className='form-control shadow bg-body p-3 mb-5 '>
                <h1 style={header_style} className="mt-3"> Stay Form </h1>
                    <div className="form-outline mb-4">
                        <label className='form-outline mx-2'>Start Time </label>
                        <input type="datetime-local" id="StartTime" name="StartTime" requiredpattern="\d{4}-\d{2}-\d{2} \d{2}:\d{2}" onChange={handleOnChange}/>
                    </div>

                    <div className='form-outline mb-4'>
                        <input type='number' name='RoomNo' className='form-control' placeholder='Room Number' onChange={handleOnChange}/>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="text" name="PatientAadhar" className="form-control" placeholder="Patient Aadhar" maxLength={12} minLength={12} onChange={handleOnChange} />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleOnClick}> Add Stay </button>
                    </div>
                </form>
            </div>}
        </>
    )
}

export default Stay;