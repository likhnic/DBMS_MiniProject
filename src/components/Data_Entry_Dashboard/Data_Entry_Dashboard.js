import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Searchbar from '../Searchbar'
import useFetch from '../useFetch';

const Data_Entry_Dashboard = () => {
    let counter = 1
    let navigate = useNavigate()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const onRender = async()=>{
        const token = localStorage.getItem('token')
        let response = await fetch('http://localhost:5000/checkUser/1', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })  
        let json = await response.json();
        console.log(json);
        if(json.error){
            window.location.href = '/'
        }
        const res = await fetch('http://localhost:5000/api/dataentryop/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        })
        json = await res.json();
        console.log(json);
        setData(json.patient)
        setLoading(false)
    }

    const sendToPage = (patientID) => {
        console.log(patientID)
        // navigate(`/dataentryop/addtest?patientID=${patientID}`,{replace:true})
        // navigate(`/dataentryop/treatment?patientID=${patientID}`,{replace:true})
        // navigate(`/dataentryop/updateresult?patientID=${patientID}`, { replace: true })
        navigate(`/dataentryop/options?patientID=${patientID}`, { replace: true })

    }

    useEffect(() => {
        onRender()
    }, [])

    return (<div className='container'>
        {!loading && <div>
        <Searchbar />
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
                {data && data.map((row, i) => {
                    return (
                        <tr key={i} onClick={() => sendToPage(row.Aadhar)}>
                            <th scope="row" key={++counter}>{counter}</th>
                            <td>{row.Name}</td>
                            <td>{row.Aadhar}</td>
                            <td>{row.Phone}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>}
    </div>
    )
}

export default Data_Entry_Dashboard;