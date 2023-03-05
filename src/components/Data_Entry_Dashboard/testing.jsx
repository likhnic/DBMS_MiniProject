// import React from "react";
// import style from "./Style.scss";
// const Testing = () => {
//   return (
//     <>
//       <main id="app">
//         <h1>Aqua Buttons</h1>

//         <div className="static">
//           <button className="b1">
//             <span>UPDATE RESULT</span>
//           </button>
//         </div>
//         <div className="static">
//           <button className="b1">
//             <span>ADD TREATMENT</span>
//           </button>
//         </div>
//         <div className="static">
//           <button className="b1">ADD &thinsp;&thinsp;&thinsp;TEST</button>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Testing;


import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import style from './Style_data.css'
import searchBarImg from './searchBar.png'
import backImage from './340.png'

const ViewPrescribes = async() => {
    const [patient,setPatient] = useState([]);
    const queryParameters = new URLSearchParams(window.location.search)
    const patientID = queryParameters.get("patientID")
    // useEffect(()=>{
    //     // getPrescription();
    // },[]);
    let navigate = useNavigate()
    // const getPrescription = async () =>{
        let result = await fetch(`http://localhost:5000/api/dataentryop/precribes/${patientID}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        });
        result = await result.json();
        setPatient(result.prescription);
    // }
    
    const sendToPage = () => {
        console.log(patientID)
        navigate(`/dataentryop/options?patientID=${patientID}`, { replace: true })

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
        <button style={mystyle} className="prev" onClick={()=>goBack()}  color="red" border="none"><img src={backImage} width='50rem'></img></button>

        <div className='container'>
        
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
                            <tr key={i} onClick={() => sendToPage()} >
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
        
        </>

    )
}

export default ViewPrescribes;