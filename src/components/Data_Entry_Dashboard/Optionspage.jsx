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
    <>
        <button onClick={()=>goBack()}>Go Back</button>
        <button onClick={()=>sendToPage('0')} >Add Test</button>
        <button onClick={()=>sendToPage('1')}>Add Treatment</button>
        <button onClick={()=>sendToPage('2')}>Update Result</button>
    </>
  )
}

export default Optionspage