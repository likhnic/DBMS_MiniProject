import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom'


const Data_Entry_Dashboard = () => {
    const [patient,setPatient] = useState([]);

    useEffect(()=>{
        getPatients();
    },[]);

    const getPatients = async () =>{
        let result = await fetch(`http://localhost:5000/api/dataentryop/`);
        result = await result.json();
        setPatient(result);
    }
    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/api/dataentryop/${key}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
            }
            );
            result = await result.json();
            if(result){
                setPatient(result)
            }
        }else{
            getPatients();
        }

    }

    return (
        <>
        <div className='container'>
        <nav className="navbar bg-body-tertiary sticky-top bg-body-tertiary">
                <div className="container-fluid">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={searchHandle} name="Search"></input>
                        {/* <button className="btn btn-outline-success" type="submit" onClick={HandleOnClick}>Search</button> */}
                    </form>
                </div>
            </nav>
        <table className="table shadow rounded bg-body table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Aadhar</th>
                    <th scope="col">Phone</th>
                </tr>
            </thead>
            <tbody>
                {
                    patient && patient.map((row, i) => {
                        return (
                            <tr key={i} onClick={() => sendToPage(row.Aadhar)}>
                                <th scope="row" key={i+1}>{counter}</th>
                                <td>{row.Name}</td>
                                <td>{row.Aadhar}</td>
                                <td>{row.Phone}</td>
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

export default Data_Entry_Dashboard;