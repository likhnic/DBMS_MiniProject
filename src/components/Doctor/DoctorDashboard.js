import React, { useEffect, useState } from 'react'

const DoctorDashboard = () => {

    const [searchResult, setSearchResult] = useState([])
    const [showDetails, setShowDetails] = useState(0)
    const [patientDetails, setPatientDetails] = useState({})
    const [patientPres, setPatientPres] = useState({ tests: [], undergoes: [], prescribes: [] })
    const [patientPrescribe, setPatientPrescribe] = useState({ medicationcode: '', dose: '' })
    const [showType, setShowType] = useState(-1)
    const [currTime, setCurrTime] = useState(new Date().toISOString())

    const presChange = (e) => {
        setPatientPrescribe({ ...patientPrescribe, [e.target.name]: e.target.value })
    }

    const prescribeClick = async (e) => {
        e.preventDefault();
        let appointmentId = patientDetails.appointmentid
        const { medicationcode, dose } = patientPrescribe
        const response = await fetch(`http://localhost:5000/api/doctor/${appointmentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({ MedicationCode: medicationcode, Dose: dose })
        })
        const json = await response.json();
        console.log(json);
        await getAccordingType('prescribes')

    }

    const changeDate = (date) =>{
        return new Date(date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    }

    const handleType = async (e) => {
        if (e.target.name === 'tests') {
            await getAccordingType('tests')
            setShowType(0)
        }
        else if (e.target.name === 'undergoes') {
            await getAccordingType('undergoes')
            setShowType(1)
        }
        else if (e.target.name === 'prescribes') {
            await getAccordingType('prescribes')
            setShowType(2)
        }
    }

    const onRenderPage = async () => {

        const token = localStorage.getItem('token')
        let response = await fetch('http://localhost:5000/checkUser/2', { 
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
        response = await fetch('http://localhost:5000/api/doctor', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
        })
        json = await response.json();
        console.log(json);
        setSearchResult(json.result)
    }

    const resetPage = async (e) => {
        e.preventDefault();
        setShowDetails(0)
        setPatientDetails({})
        setShowType(-1)
        setPatientPres({ tests: [], undergoes: [], prescribes: [] })
        onRenderPage()
    }

    const patientClick = async (e) => {

        setShowDetails(1)
        console.log(e.target.name, searchResult[e.target.name])
        setPatientDetails(searchResult[e.target.name])
        console.log("Show details ", showDetails)
    }

    const getAccordingType = async (type) => {
        let appointmentId = patientDetails.appointmentid
        const response = await fetch(`http://localhost:5000/api/doctor/${appointmentId}/${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
        })
        console.log(response);
        const json = await response.json();
        console.log(json);
        setPatientPres(json)
    }


    useEffect(() => {
        if (showDetails === 0) onRenderPage()
        if(showDetails===0){
            setCurrTime(new Date().toISOString())
        }
    }, [showDetails])

    return (
        <>

            <div className="container">

                {showDetails === 0 && searchResult.length > 0 && searchResult.map((result, i) => {
                    return (
                        <div className={`card shadow mt-3 p-3 mb-3 rounded bg-${result.starttime >= currTime ? 'light':'secondary'} text-${result.starttime >= currTime ? 'dark':'light'}`} key={i}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="row col-md-9">
                                        <h4 className="col-md-4">
                                            Patient Name
                                        </h4>
                                        <h4 className="col-md-6">
                                            {result.patientname}
                                        </h4>
                                        <h5 className="col-md-4">
                                            Appointment ID
                                        </h5>
                                        <h5 className="col-md-6">
                                            {result.appointmentid}
                                        </h5>
                                        <div className="col-md-4">
                                            Appointment Time
                                        </div>
                                        <div className="col-md-6">
                                        {changeDate(result.starttime)} to {changeDate(result.endtime)}
                                        </div>
                                        <div className="col-md-4">
                                            Phone Number
                                        </div>
                                        <div className="col-md-6">
                                        {result.phone}
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary mt-3" name={i} onClick={patientClick}>View</button>
                            </div>
                        </div>
                    )
                })
                }
                {
                    showDetails === 1 && (
                        <>
                            <button className="btn btn-outline-primary m-3" onClick={resetPage} type="submit">Go Back</button>

                            <div className="container mt-3">
                                <div className="card shadow p-3 mb-5 bg-body rounded">
                                    <div className="card-body">
                                        <div className="row">
                                    <div className="row col-md-9">
                                        <h4 className="col-md-4">
                                            Patient Name
                                        </h4>
                                        <h4 className="col-md-8">
                                            {patientDetails.patientname}
                                        </h4>
                                        <h5 className="col-md-4">
                                            Appointment ID
                                        </h5>
                                        <h5 className="col-md-8">
                                            {patientDetails.appointmentid}
                                        </h5>
                                        <div className="col-md-4">
                                            Appointment Time
                                        </div>
                                        <div className="col-md-8">
                                        {changeDate(patientDetails.starttime)} to {changeDate(patientDetails.endtime)}
                                        </div>
                                        <div className="col-md-4 text-muted">
                                            Phone Number
                                        </div>
                                        <div className="col-md-8 text-muted">
                                        {patientDetails.phone}
                                        </div>
                                        <div className="col-md-4 text-muted">
                                            Address
                                        </div>
                                        <div className="col-md-8 text-muted">
                                        {patientDetails.address}
                                        </div>
                                    </div>
                                </div>
                                    </div>
                                </div>
                            </div>


                            <div className="container mt-3">
                                <div className="row">
                                    <div className="col-md-3"></div>
                                    <button className={`btn btn-${showType !== 0 ? "outline-":""}primary col-md-2 m-2`} name='tests' onClick={handleType}>Tests</button>
                                    <button className={`btn btn-${showType !== 1 ? "outline-":""}primary col-md-2 m-2`} name='undergoes' onClick={handleType}>Treatments</button>
                                    <button className={`btn btn-${showType !== 2 ? "outline-":""}primary col-md-2 m-2`} name='prescribes' onClick={handleType}>Prescriptions</button>
                                    <div className="col-md-3"></div>
                                </div>
                            </div>
                            <div className="mt-3">
                                    {showType === 0 && patientPres.tests.length!==0 && <div className='card'>
                                        {
                                            patientPres.tests.map((test, i) => {
                                                return (
                                                    <div className='card m-3' key={i}>
                                                        <div className="card-body">
                                                        <div>Test Id: {test.testid}</div>
                                                        <div>Procedure Name: {test.procedurename}</div>
                                                        <div>Date: {test.date}</div>
                                                        <div>Result: {test.result}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>}
                                    {showType === 0 && patientPres.tests.length===0 && (
                                        <h4 className='text-center'>
                                        No Tests Yet
                                        </h4>
                                    )}
                                    {showType === 1 && patientPres.undergoes.length!==0 && (
                                        <div className="card shadow p-3 mb-5 bg-body rounded">
                                            {
                                                patientPres.undergoes.map((undergo, i) => {
                                                    return (
                                                        <div className='card m-3' key={i}>
                                                            <div className="card-body">
                                                            <div>Procedure Name: {undergo.procedurename}</div>
                                                            <div>Undergoes Date: {undergo.undergoesdate}</div>
                                                            <div>Doctor Name: {undergo.doctorname}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                )
                                            }
                                        </div>
                                    )}
                                    {showType === 1 && patientPres.undergoes.length===0 && (
                                        <h4 className='text-center'>
                                        No Treatments Yet
                                        </h4>
                                    )}
                                    {showType === 2 && (

                                        <div className="container mt-3">
                                            <div className="card shadow p-3 mb-5 bg-body rounded">
                                                <div className="card-body">
                                                <form>
                                                    <div className="mb-3">
                                                        <label htmlFor="medicationcode" className="form-label">Medication Code</label>
                                                        <input type="number" name="medicationcode" className="form-control" id="medicationcode" aria-describedby="emailHelp" onChange={presChange} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="dose" className="form-label">Dose</label>
                                                        <input type="text" name="dose" className="form-control" id="dose" onChange={presChange} />
                                                    </div>
                                                    <button type="submit" className="mt-3 btn btn-outline-primary" onClick={prescribeClick}>Prescribe</button>
                                                </form>
                                                </div>
                                            </div>
                                            {
                                                patientPres.prescribes.length!==0 &&  patientPres.prescribes.map((prescribe, i) => {
                                                    return (
                                                        <div className='card shadow p-3 mb-5 bg-body rounded m-3' key={i}>
                                                            <div className="card-body">
                                                            <div>Medication Name: {prescribe.medicationname}</div>
                                                            <div>Prescribed by: {prescribe.doctorname}</div>
                                                            <div>Prescribed Dose: {prescribe.prescribesdose}</div>
                                                            <div>Date: {changeDate(prescribe.prescribesdate)}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {
                                                patientPres.prescribes.length===0 &&   <h4 className='text-center mt-3'>
                                                No Prescrptions to show
                                                </h4>
                                            }
                                        </div>
                                    )
                                    }
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default DoctorDashboard