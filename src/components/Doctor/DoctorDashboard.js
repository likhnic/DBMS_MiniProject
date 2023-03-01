import React, { useEffect, useState } from 'react'

const DoctorDashboard = () => {

    // const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [patientDetails, setPatientDetails] = useState({})
    const [patientPres, setPatientPres] = useState({tests:[], undergoes:[], prescribes:[]})
    const [patientPrescribe, setPatientPrescribe] = useState({medicationcode: '', dose: ''})
    const [showType, setShowType] = useState(0)
    const [type, setType] = useState(['tests', 'undergoes', 'prescribes'])

    // const searchOnChange = (e) => {
    //     setSearch(e.target.value)
    // }

    const presChange = (e) => {
        setPatientPrescribe({...patientPrescribe, [e.target.name]: e.target.value})
    }

    const prescribeClick = async (e) => {
        e.preventDefault();
        let appointmentId = patientDetails.appointmentId
        const response = await fetch(`http://localhost:5000/api/doctor/${appointmentId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientPrescribe)
        })
        const json = await response.json();
        console.log(json);
    }

    // const handleOnSubmit = async (e) => {
    //     e.preventDefault();
    //     const response = await fetch('http://localhost:5000/api/doctor/search', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ search })
    //     })
    //     console.log(response)
    // }

    const handleType = (e) => {
        if(e.target.name === 'tests'){
            setShowType(0)
        }
        else if(e.target.name === 'undergoes'){
            setShowType(1)
        }
        else if(e.target.name === 'prescribes'){
            setShowType(2)
        }

    }

    const onRenderPage = async () => {
        const response = await fetch('http://localhost:5000/api/doctor', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
        })
        const json = await response.json();
        console.log(json);
        setSearchResult(json.result)
    }

    const resetPage = async (e) => {
        e.preventDefault();
        // setSearch('')
        showDetails(false)
        onRenderPage()
    }
        
    const patientClick = async(e) => {

        setShowDetails(true)
        let appointmentId = searchResult[e.target.name].appointmentId
        setPatientDetails(searchResult[e.target.name])
        const response = await fetch(`http://localhost:5000/api/doctor/${appointmentId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },

        })
        const json = await response.json();
        console.log(json);
        setPatientPres(json)
    }


    useEffect(() => {
        onRenderPage()
    }, [])

    return (
        <>

            <div className="container">
                {/* <form className="d-flex mt-3" role="search"> */}
                    {/* <input className="form-control me-2" type="search" placeholder="Search" name='search' onChange={searchOnChange} aria-label="Search" /> */}
                    {/* <button className="btn btn-outline-success" onClick={handleOnSubmit} type="submit">Search</button> */}
                    {showDetails && (<button className="btn btn-outline-success m-3" onClick={resetPage} type="submit">Go Back</button>)}
                {/* </form> */}

                {!showDetails && searchResult.length > 0 && searchResult.map((result, i) => {
                    return (
                        <div className="card mt-3" key={i}>
                            <div className="card-body">
                                <h5 className="card-title">{result.patientname}</h5>
                                <h4 className='card-subtitle mb-2'>{result.appointmentid}</h4>
                                <h4 className='card-subtitle mb-2'>{result.starttime} - {result.endtime}</h4>
                                <h6 className="card-subtitle mb-2 text-muted">{result.patientaadhar}</h6>
                                <p className="card-text">{result.phone}</p>
                                <button className="btn btn-primary" name={i} onClick={patientClick}>View</button>
                            </div>
                        </div>
                    )
                })
                }
                {
                    showDetails && (
                        <div className="container mt-3">
                            <div className="row">
                                <button className="btn btn-primary col-md-3 m-2" name='tests' onClick={handleType}>Tests</button>
                                <button className="btn btn-primary col-md-3 m-2" name='undergoes' onClick={handleType}>Treatments</button>
                                <button className="btn btn-primary col-md-3 m-2" name='prescribes' onClick={handleType}>Prescriptions</button>
                            </div>
                        </div>
                    ) && (
                        <div className="container mt-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{patientDetails.patientname}</h5>
                                    <h4 className='card-subtitle mb-2'>{patientDetails.appointmentid}</h4>
                                    <h4 className='card-subtitle mb-2'>{patientDetails.starttime} - {patientDetails.endtime}</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">{patientDetails.patientaadhar}</h6>
                                    <p className="card-text">{patientDetails.phone}</p>
                                    <p className="card-text">{patientDetails.address}</p>
                                </div>
                            </div>
                        </div>
                    ) && (
                        <div className="container mt-3">
                            <div className="card">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="medicationcode" className="form-label">Employee ID</label>
                                        <input type="number" name="medicationcode" className="form-control" id="medicationcode" aria-describedby="emailHelp" onChange={presChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="dose" className="form-label">Password</label>
                                        <input type="text" name="dose" className="form-control" id="dose" onChange={presChange} />
                                    </div>
                                    <button type="submit" className="mt-3 btn btn-primary" onClick={prescribeClick}>Prescribe</button>
                                </form>
                            </div>
                        </div>
                    ) && (
                        <div className="card mt-3">
                            <div className="card-body">
                                <h5 className="card-title">Tests</h5>
                                {showType==0 && patientPres.tests.map((test, i)=>{
                                    return(
                                        <div className='card mt-3' key={i}>
                                            <div>Test Id: {test.testid}</div>
                                            <div>Procedure Name: {test.procedurename}</div>
                                            <div>Date: {test.date}</div>
                                            <div>Result: {test.result}</div>
                                        </div>
                                    )
                                })}
                                <h5 className="card-title">Undergoes</h5>
                                {showType==1 && patientPres.undergoes.map((undergo, i)=>{
                                    return(
                                        <div className='card mt-3' key={i}>
                                            <div>Procedure Name: {undergo.procedurename}</div>
                                            <div>Undergoes Date: {undergo.undergoesdate}</div>
                                            <div>Doctor Name: {undergo.doctorname}</div>
                                        </div>
                                    )
                                }
                                )}
                                <h5 className="card-title">Prescribes</h5>
                                {showType==2 && patientPres.prescribes.map((prescribe, i)=>{
                                    return(
                                        <div className='card mt-3' key={i}>
                                            <div>Medication Name: {prescribe.medicationname}</div>
                                            <div>Prescribed by: {prescribe.doctorname}</div>
                                            <div>Prescribed Dose: {prescribe.prescribesdose}</div>
                                            <div>Date: {prescribe.prescribesdate}</div>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default DoctorDashboard