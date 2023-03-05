import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import backImage from './back.png'
import updateResultImg from './updateResult.jpg'
import addtreatmentImg from './addtreatment.jpg'
import addtestImg from './addtest.jpg'
import prescribesImg from './viewPrescription.avif'
import styles from './Style_data.scss'

const Optionspage = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const patientID = queryParameters.get("patientID")
    let navigate = useNavigate()
    
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

    useEffect(() => {
        onRenderpage();
    }, [])
    const sendToPage = (e) => {
        // window.location.replace('http://localhost:3000/dataentryop/addtest');
        console.log(e)
        if(e==0) navigate(`/dataentryop/addtest?patientID=${patientID}`,{replace:true})
        else if(e==1) navigate(`/dataentryop/treatment?patientID=${patientID}`,{replace:true})
        else if(e==2) navigate(`/dataentryop/updateresult?patientID=${patientID}`, { replace: true })
        else if(e==3) navigate(`/dataentryop/viewprescribes?patientID=${patientID}`, { replace: true })

    }
    const goBack = () => {
        // window.location.replace('http://localhost:3000/dataentryop/addtest');
        navigate(`/dataentryop/`,{replace:true})
    }
    const mystyle = {
        background:'transparent',
                border:'none',
                outline:'none',
                cursor:'pointer'
    }
  return (
    <>
    {!loading && <div className='dataentry'>
        <button style={mystyle} className="prev" onClick={()=>goBack()}  color="red" border="none"><img src={backImage} width='50rem'></img></button>
        <main id="app">

        <div className="static">
            <img src={updateResultImg} alt="updateResultImage" width="300em" ></img>
          <button onClick={()=>sendToPage('2')} className="b1">
            <span>UPDATE RESULT</span>
          </button>
        </div>
        <div className="static">
          <img src={addtreatmentImg} width="500em" alt="addtreatmentImage"></img>
          <button onClick={()=>sendToPage('1')} className="b1">
            <span>ADD TREATMENT</span>
          </button>
        </div>
        <div className="static">
          <img src={addtestImg} width="400em" alt="addtestImage"></img>
          <button onClick={()=>sendToPage('0')} className="b1">ADD &thinsp;&thinsp;&thinsp;TEST</button>
        </div>
        <div className="static">
          <img src={prescribesImg} width="500em" alt="addtestImage"></img>
          <button onClick={()=>sendToPage('3')} className="b1">VIEW PRESCRIPTION</button>
        </div>
      </main>
    </div>}
    </>
  )
}

export default Optionspage