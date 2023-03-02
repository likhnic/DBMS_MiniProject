import React from 'react'
import Card from '../Card'
import img1 from './register.jpeg'
import img2 from './appointment.avif'
import img3 from './room.jpeg'
import img4 from './discharge.jpeg'

const FrontDeskUsr = () => {
    return (
        <div className="container mt-3">
        <div className="row">
            <div className="col-md-5 m-3">
                <Card
                    url="/frontdesk/register"
                    img_url={img1}
                    card_text="Register a new patient"
                    name="Register"
                />
            </div>

            <div className="col-md-5 m-3">
                <Card
                    url="/frontdesk/appointment"
                    img_url={img2}
                    card_text="Create a new appointment"
                    name="Appointment"
                />
            </div>

            <div className="col-md-5 m-3">
                <Card
                    url="/frontdesk/room"
                    img_url={img3}
                    card_text="Assign a room to a patient"
                    name="Room"
                />
            </div>
            <div className="col-md-5 m-3">
                <Card
                    url="/frontdesk/discharge"
                    img_url={img4}
                    card_text="Discharge a patient"
                    name="Discharge"
                />
            </div>
        </div>
        </div>
    )
}

export default FrontDeskUsr;