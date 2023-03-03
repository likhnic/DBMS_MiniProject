import React from 'react'
import { useNavigate } from 'react-router-dom';
const Optionspage = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const patientID = queryParameters.get("patientID")
    let navigate = useNavigate()
    const sendToPage = (e) => {
        // window.location.replace('http://localhost:3000/dataentryop/addtest');
        console.log(e)
        if(e==0) navigate(`/dataentryop/addtest?patientID=${patientID}`,{replace:true})
        else if(e==1) navigate(`/dataentryop/treatment?patientID=${patientID}`,{replace:true})
        else if(e==2) navigate(`/dataentryop/updateresult?patientID=${patientID}`, { replace: true })

    }
    const goBack = () => {
        // window.location.replace('http://localhost:3000/dataentryop/addtest');
        navigate(`/dataentryop/`,{replace:true})
    }
  return (
    <div className='container mt-3'>
        <div className="row">
            <div className="col-md-2"></div>
            <button className='btn btn-outline-primary m-2 col-md-2 text-center' onClick={()=>goBack()}>Go Back</button>
            <button className='btn btn-outline-primary m-2 col-md-2 text-center' onClick={()=>sendToPage('0')} >Add Test</button>
            <button className='btn btn-outline-primary m-2 col-md-2 text-center' onClick={()=>sendToPage('1')}>Add Treatment</button>
            <button className='btn btn-outline-primary m-2 col-md-2 text-center' onClick={()=>sendToPage('2')}>Update Result</button>
        </div>
    </div>
  )
}

export default Optionspage