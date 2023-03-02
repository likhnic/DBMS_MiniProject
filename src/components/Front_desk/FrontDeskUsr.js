import React from 'react'
import Card from '../Card'

const FrontDeskUsr = () => {
    return (
        <>
            <Card
                url="/frontdesk/register"
                img_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSpgPb_Fg_0fUat4d5jd0twdUVB_M1rthevw&usqp=CAU"
                card_text="Register a new patient"
                name="Register"
            />
            <Card
                url="/frontdesk/appointment"
                img_url="https://img.freepik.com/free-vector/appointment-booking-with-calendar_52683-39658.jpg?w=2000"
                card_text="Create a new appointment"
                name="Appointment"
            />
            <Card
                url="/frontdesk/room"
                img_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmAm-3g6Q8vmMIDUAX7MBI0OUTzfikEGEfBA&usqp=CAU"
                card_text="Assign a room to a patient"
                name="Room"
            />
            <Card
                url="/frontdesk/discharge"
                img_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeThq2gZzFCnJOMVyBIE6KQABB-vZMLy3jxg&usqp=CAU"
                card_text="Remove a patient"
                name="Discharge"
            />
        </>
    )
}

export default FrontDeskUsr;