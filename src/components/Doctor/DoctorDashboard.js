import React, { useEffect, useState } from 'react'

import PatientDetailsCard from './PatientDetailsCard'

const DoctorDashboard = (props) => {

    const [searchResult, setSearchResult] = useState([])
    const [showDetails, setShowDetails] = useState(0)
    const [patientDetails, setPatientDetails] = useState({})
    const [patientPres, setPatientPres] = useState({ tests: [], undergoes: [], prescribes: [] })
    const [patientPrescribe, setPatientPrescribe] = useState({ medicationcode: '', dose: '' })
    const [showType, setShowType] = useState(-1)
    const [currTime, setCurrTime] = useState(new Date().toISOString())
    const [loading, setLoading] = useState(true)
    const [medications, setMedications] = useState([])


    const presChange = (e) => {
        setPatientPrescribe({ ...patientPrescribe, [e.target.name]: e.target.value })
    }

    const prescribeClick = async (e) => {
        e.preventDefault();
        let appointmentId = patientDetails.appointmentid
        const { medicationcode, dose } = patientPrescribe
        // if (!dose || dose === '') {
        //     props.alert("Please enter a dose", "danger")
        //     return;
        // }
        const response = await fetch(`http://localhost:5000/api/doctor/${appointmentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({ MedicationCode: medicationcode, Dose: dose })
        })
        const json = await response.json();
        // console.log(json);
        if (json.error) {
            props.alert(json.error, "danger")
            return;
        }
        await getAccordingType('prescribes')
        props.alert("Prescribed Successfully", "success")
    }

    const getMedications = async () => {
        const response = await fetch('http://localhost:5000/api/doctor/getMedications', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        // console.log(json);
        if (json.error) {
            // alert(json.error)
            props.alert(json.error, "danger")
            return;
        }
        setMedications(json.medications)
    }

    const changeDate = (date) => {
        return new Date(date).toUTCString().split(' ').slice(0, 5).join(' ')
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
        // console.log(json);
        if (json.error) {
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
        if (json.error) {
            alert(json.error)
            setSearchResult([])
        }
        else setSearchResult(json.result)
        setLoading(false)
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
        // console.log(e.target.name, searchResult[e.target.name])
        setPatientDetails(searchResult[e.target.name])
        // console.log("Show details ", showDetails)
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
        // console.log(response);
        const json = await response.json();
        // console.log(json);
        if (json.error) {
            props.alert(json.error, 'danger')
            setPatientPres({ tests: [], undergoes: [], prescribes: [] })
        }
        else setPatientPres(json)
    }

    const changeMed = (e) => {
        setPatientPrescribe({ ...patientPrescribe, medicationcode: e.target.value })
    }
    const getTime = () => {
        let time = new Date()
        let ans = ("0" + time.getHours()).slice(-2)   + ":" + 
        ("0" + time.getMinutes()).slice(-2) + ":" + 
        ("0" + time.getSeconds()).slice(-2)
        return ans;
    }

    const getDate = () => {
        let time = new Date()
        let ans = (time.getFullYear())   + "-" + 
        ("0" + (time.getMonth()+1)).slice(-2) + "-" + 
        ("0" + time.getDate()).slice(-2)
        return ans;
    }

    const downloadResult = async (filename) => {
        let resultName = filename

        let response = await fetch(`http://localhost:5000/api/doctor/result/${resultName}`, {
            method: 'GET',
            headers: {
                'token': localStorage.getItem('token')
            },
        })

        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = resultName;
            a.click();
        });
    }

    const handledownloadFile = async (e) => {
        let fileName = e.target.getAttribute("name")
        console.log(fileName)
        await downloadResult(fileName)
    }

    useEffect(() => {
        if (showDetails === 0) onRenderPage()
        // get curr YYYY-MM-DD+" "+HH:MM:SS
        setCurrTime(getDate() + " " + getTime())
        if (showDetails === 1) getMedications()
    }, [showDetails])

    return (
        <>

            <div className="container">


                {!loading && showDetails === 0 && searchResult.length > 0 && 
                    (
                        <div className="row">
                            {
                                searchResult.map((result, i) => {
                                    return (
                                        <div key={i} className='col-md-6'>
                                            <div className={`card position-relative shadow mt-3 p-3 mb-3 rounded bg-light text-dark`} key={result}>
                                                <PatientDetailsCard result={result} />
                                                <button className="btn btn-primary mt-3" name={i} onClick={patientClick}>View</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
                {!loading && showDetails === 0 && searchResult.length === 0 && <h3 className=' mt-3 text-center'>No Appointment Yet</h3>}
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
                                                <h4 className="col-md-4">
                                                    Gender
                                                </h4>
                                                <h4 className="col-md-8">
                                                    {patientDetails.gender}
                                                </h4>
                                                <h4 className="col-md-4">
                                                    Age
                                                </h4>
                                                <h4 className="col-md-8">
                                                    {patientDetails.age}
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
                                                    {new Date(patientDetails.startdate).toLocaleString(undefined, {timeZone:'Asia/Kolkata'}).slice(0,10).slice(0,10)} {patientDetails.starttime}
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
                                    <button className={`btn btn-${showType !== 0 ? "outline-" : ""}primary col-md-2 m-2`} name='tests' onClick={handleType}>Tests</button>
                                    <button className={`btn btn-${showType !== 1 ? "outline-" : ""}primary col-md-2 m-2`} name='undergoes' onClick={handleType}>Treatments</button>
                                    <button className={`btn btn-${showType !== 2 ? "outline-" : ""}primary col-md-2 m-2`} name='prescribes' onClick={handleType}>Prescriptions</button>
                                    <div className="col-md-3"></div>
                                </div>
                            </div>
                            <div className="mt-3">
                                {showType === 0 && patientPres.tests.length !== 0 && (
                                    <div className="container">
                                        <div className="row">
                                            {
                                                patientPres.tests.map((test, i) => {
                                                    return (
                                                        <div className="col-md-6">
                                                            <div className='card m-3 shadow p-3 mb-5 bg-body rounded m-3' key={i}>
                                                                <div className="card-body">
                                                                    <div className='row'><b className='col-md-6'>Test Id:</b> {test.testid}</div>
                                                                    <div className='row'><b className='col-md-6'>Procedure Name:</b> {test.procedurename}</div>
                                                                    <div className='row'><b className='col-md-6'>Date:</b> {changeDate(test.date)}</div>
                                                                    <div className='row'><div className='mt-3 btn btn-primary' name={test.result} onClick={handledownloadFile}>Get Result!</div> </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )}
                                {showType === 0 && patientPres.tests.length === 0 && (
                                    <h4 className='text-center'>
                                        No Tests Yet
                                    </h4>
                                )}
                                {showType === 1 && patientPres.undergoes.length !== 0 && (
                                    <div className="container">
                                        <div className="row">
                                            {
                                                patientPres.undergoes.map((undergo, i) => {
                                                    return (
                                                        <div className="col-md-6">
                                                            <div className='card shadow p-3 mb-5 bg-body rounded m-3' key={i}>
                                                                <div className="card-body">
                                                                    <div className='row'><b className='col-md-6'>Procedure Name:</b> {undergo.procedurename}</div>
                                                                    <div className='row'><b className='col-md-6'>Undergoes Date:</b> {changeDate(undergo.undergoesdate)}</div>
                                                                    <div className='row'><b className='col-md-6'>Doctor Name:</b> {undergo.doctorname}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                                {showType === 1 && patientPres.undergoes.length === 0 && (
                                    <h4 className='text-center'>
                                        No Treatments Yet
                                    </h4>
                                )}
                                {showType === 2 && (

                                    <div className="container mt-3">
                                        {<div className="card shadow p-3 mb-5 bg-body rounded">
                                            <div className="card-body">
                                                <form>
                                                    <select className='form-control mb-3' defaultValue={"Medication"} onChange={changeMed}>
                                                        <option disabled>Medication</option>
                                                        {
                                                            medications.map((medication, i) => {
                                                                return (
                                                                    <option key={i} value={medication.Code}>{medication.Name} {medication.Brand}</option>
                                                                )
                                                            }
                                                            )
                                                        }
                                                    </select>
                                                    <div className="mb-3">
                                                        <input placeholder='Dose' type="text" name="dose" className="form-control" id="dose" onChange={presChange} />
                                                    </div>
                                                    <button type="submit" className="mt-3 btn btn-outline-primary" onClick={prescribeClick}>Prescribe</button>
                                                </form>
                                            </div>
                                        </div>}
                                        {
                                            <div className='row'>
                                                {
                                                    patientPres.prescribes.length !== 0 && patientPres.prescribes.map((prescribe, i) => {
                                                        return (
                                                            <div className='card shadow p-3 mb-5 bg-body rounded mt-1 mx-4 col-md-5' key={i}>
                                                                <div className="card-body">
                                                                    <div className='row'><b className='col-md-6'>Medication Name:</b> {prescribe.medicationname}</div>
                                                                    <div className='row'><b className='col-md-6'>Prescribed by:</b> {prescribe.doctorname}</div>
                                                                    <div className='row'><b className='col-md-6'>Prescribed Dose:</b> {prescribe.prescribesdose}</div>
                                                                    <div className='row'><b className='col-md-6'>Date:</b> {changeDate(prescribe.prescribesdate)}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        }
                                        {
                                            patientPres.prescribes.length === 0 && <h4 className='text-center mt-3'>
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