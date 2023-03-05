import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import style from './Style_data.css'
import searchBarImg from './searchBar.png'
const Data_Entry_Dashboard = () => {
    const [patient, setPatient] = useState([]);

    const [loading, setLoading] = useState(true);
    const onRender = async () => {
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
    
    useEffect(() => {
        onRender();
        getPatients();
    }, []);

    let navigate = useNavigate()
    const getPatients = async () => {
        let result = await fetch(`http://localhost:5000/api/dataentryop/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }

        });
        result = await result.json();
        setPatient(result.patient);
    }
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/api/dataentryop/${key}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            });
            result = await result.json();
            if (result) {
                setPatient(result.patient)
            }
        } else {
            getPatients();
        }

    }
    const sendToPage = (patientID) => {
        console.log(patientID)
        navigate(`/dataentryop/options?patientID=${patientID}`, { replace: true })

    }

    return (
        <>

            {!loading && <div className='container'>
                <nav className="navbar bg-body-tertiary sticky-top bg-body-tertiary" >
                    <div className="container-fluid  searchBar">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={searchHandle} name="Search"></input>
                            <img src={searchBarImg} width="20%"></img>
                        </form>
                    </div>
                </nav>
                <table className="table shadow rounded bg-body table-striped  table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Aadhar</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
                    <tbody className="patientRows" >
                        {
                            patient && patient.map((row, i) => {
                                return (
                                    <tr key={i} onClick={() => sendToPage(row.Aadhar)} >
                                        <th scope="row" key={i + 1}>{i + 1}</th>
                                        <td>{row.Name}</td>
                                        <td>{row.Aadhar}</td>
                                        <td>{row.Phone}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>}

        </>

    )
}

export default Data_Entry_Dashboard;