import React from 'react'
import useFetch from './useFetch';
function UserList() {
    let counter = 1
    const res = useFetch('http://localhost:5000/api/dataentryop/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
        },
    });
    console.log('Recieved this : ',res.response)
    if(!res.response.patient) {
        return <div>Loading...</div>
    }

    // const data = res.response.results;
    const data = res.response.patient
    console.log('DATA : ',data);
    // console.log('DATA : ',d);

    return (
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
            {data && data.map(row => {
                return (
                    <tr data-url="http://localhost:3000/index.js">
                        <th scope="row" key={++counter}>{counter}</th>
                        <td>{row.Name}</td>
                        <td>{row.Aadhar}</td>
                        <td>{row.Phone}</td>
                    </tr>
                );
            })}      
        </tbody>
      </table>
    )
}

export default UserList;