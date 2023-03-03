import React from 'react'
import { useNavigate } from 'react-router-dom';
import Searchbar from '../Searchbar'
import useFetch from '../useFetch';

const Data_Entry_Dashboard = () => {
    let counter = 1
    let navigate = useNavigate()
    const res = useFetch('http://localhost:5000/api/dataentryop/', {});
    console.log('Recieved this : ', res.response)
    if (!res.response.patient) {
        return <div>Loading...</div>
    }
    const sendToPage = (patientID) => {
        // window.location.replace('http://localhost:3000/dataentryop/addtest');
        console.log(patientID)
        // navigate(`/dataentryop/addtest?patientID=${patientID}`,{replace:true})
        // navigate(`/dataentryop/treatment?patientID=${patientID}`,{replace:true})
        navigate(`/dataentryop/updateresult?patientID=${patientID}`, { replace: true })

    }
    // const data = res.response.results;
    const data = res.response.patient
    console.log('DATA : ', data);
    // console.log('DATA : ',d);

    return (<div className='container'>
        <Searchbar />
        <table className="table table-striped table-dark">
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
    </div>
    )
}

export default Data_Entry_Dashboard;