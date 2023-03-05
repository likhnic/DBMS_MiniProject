import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import style from './Style_data.css'
import searchBarImg from './searchBar.png'
import backImage from './back.png'
const ViewPrescribes = () => {
    const [patient,setPatient] = useState([]);
    const queryParameters = new URLSearchParams(window.location.search)
    const patientID = queryParameters.get("patientID")
    const [loading, setLoading] = useState(true);
    const onRenderpage = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5000/checkUser/1', {
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

    useEffect(()=>{
        onRenderpage();
        getPrescription();
    },[]);
    let navigate = useNavigate()
    const getPrescription = async () =>{
        let result = await fetch(`http://localhost:5000/api/dataentryop/prescribes/${patientID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        });
        result = await result.json();
        setPatient(result.prescription);
    }
    const goBack = () => {
        // window.location.replace('http://localhost:3000/dataentryop/addtest');
        navigate(`/dataentryop/options?patientID=${patientID}`, { replace: true })
    }
    const mystyle = {
        background:'transparent',
                border:'none',
                outline:'none',
                cursor:'pointer'
    }

    return (
        <>
        {!loading && <>
         <button style={mystyle} className="prev" onClick={()=>goBack()}  color="red" border="none"><img src={backImage} width='50rem'></img></button>
        <div className='container'>
        <nav className="navbar bg-body-tertiary sticky-top bg-body-tertiary" >
                <div className="container-fluid  ">
                    
                </div>
            </nav>
        <table className="table shadow rounded bg-body table-striped  table-hover">
            <thead className="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Appointment ID</th>
                    <th scope="col">Doctor ID</th>
                    <th scope="col">Medication Code</th>
                    <th scope="col">Dose</th>
                </tr>
            </thead>
            <tbody className="patientRows" >
                {
                    patient && patient.map((row, i) => {
                        return (
                            <tr key={i} >
                                <th scope="row" key={i+1}>{i+1}</th>
                                <td>{row.AppointmentID}</td>
                                <td>{row.DocID}</td>
                                <td>{row.MedicationCode}</td>
                                <td>{row.Dose}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    </div>
    </>}
        </>

    )
}

export default ViewPrescribes;