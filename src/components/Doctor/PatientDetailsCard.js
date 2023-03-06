import React from 'react'

const PatientDetailsCard = (props) => {

    const result = props.result
    return (
        <div>
            {result.Emrgncy===1 && <span className="position-absolute top-0 start-200 translate-middle badge bg-danger" style={{ fontSize: '13px' }}>
                Emergency
            </span>}
            <div className="card-body">
                <div className="row">
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
                        <div className="col-md-7">
                        {new Date(result.startdate).toLocaleString(undefined, {timeZone:'Asia/Kolkata'}).slice(0,10)} {result.starttime}
                        </div>
                        <div className="col-md-4">
                            Phone Number
                        </div>
                        <div className="col-md-6">
                            {result.phone}
                        </div>
                </div>
            </div>

        </div>
    )
}

export default PatientDetailsCard