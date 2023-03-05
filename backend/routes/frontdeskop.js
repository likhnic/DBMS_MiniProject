const express = require('express');
const router = express.Router();
const query = require('../dbConnection');
const fetchuser = require('../public/js/fetchuser');
const emailjs = require('@emailjs/nodejs');

router.use(express.json());
router.use(express.urlencoded({ extended: 'false' }));

const actualSlots = [
    "08:00:00",
    "08:30:00",
    "09:00:00",
    "09:30:00",
    "10:00:00",
    "10:30:00",
    "11:00:00",
    "11:30:00",
    "12:00:00",
    "12:30:00",
    "14:00:00",
    "14:30:00",
    "15:00:00",
    "15:30:00",
    "16:00:00",
    "16:30:00",
    "18:00:00",
    "18:30:00",
    "19:00:00",
    "19:30:00"]

router.get("/getnews", async (req, res) => {
    let sql = `SELECT * from news`;
    try {
        let result = await query(sql);
        res.status(200).json({
            news : result
        });
        console.log(result);
    } catch (error) {
        res.status(404).json({
            error: "Cannot get news"
        });
    }
})

// add the fetuser middleware this route
router.post("/getslots", fetchuser, async (req, res) => {
    const { StartDate, DocID, Emergency } = req.body;
    console.log(StartDate);
    let sql = `SELECT StartTime from Appointment WHERE StartDate = '${StartDate}' and DocID = ${DocID}`;
    if (Emergency === true) {
        sql = `SELECT StartTime from Appointment WHERE StartDate = '${StartDate}' and DocID = ${DocID} and Emrgncy = 1`;
    }
    try {
        let result = await query(sql);
        console.log(result);
        let slots = [...actualSlots];
        for (let i = 0; i < result.length; i++) {
            let index = slots.indexOf(result[i].StartTime);
            if (index > -1)
                slots.splice(index, 1);
            console.log(index, result[i].StartTime)
        }
        console.log(slots);
        res.status(200).json({
            slots
        });

    } catch (error) {
        res.status(404).json({
            error: "Cannot get slots"
        });
    }
})

const sendemail = (email, DocName, message) => {

    const contactdetail = {
        from_name: DocName,
        from_email: email,
        message: message
    };

    emailjs.send('service_yt2r988', 'template_s8wvu2i', contactdetail, {
        publicKey: 'RkJI7TvtR2WCZ-gyN',
        privateKey: '<YOUR_PRIVATE_KEY>', // optional, highly recommended for security reasons
    })
        .then(
            function (response) {
                console.log('SUCCESS!', response.status, response.text);
            },
            function (err) {
                console.log('FAILED...', err);
            },
        );

}


// registering a new patient (using patient table)
router.post("/register", fetchuser, async (req, res) => {

    const { Aadhar, Name, Address, Phone, InsuranceID, PCPDocID } = req.body;

    let sql = `SELECT * from Patient WHERE Aadhar = '${Aadhar}'`
    try {
        let result = await query(sql);
        if (result.length > 0) {
            res.status(404).json({
                error: "Patient already registered"
            })
            console.log("Patient already registered");
            return;
        }

        sql = `INSERT INTO Patient (Aadhar, Name, Address, Phone, InsuranceId, PCPDocID) VALUES ('${Aadhar}', '${Name}', '${Address}', '${Phone}', ${InsuranceID}, ${PCPDocID})`

        result = await query(sql);
        console.log("Patient registered successfully");
        res.status(200).json({
            success: 'Patient registered successfully'
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            error: "Cannot Register Patient"
        });
    }
});

const getTime = () => {
    let time = new Date()
    let ans = ("0" + time.getHours()).slice(-2) + ":" +
        ("0" + time.getMinutes()).slice(-2) + ":" +
        ("0" + time.getSeconds()).slice(-2)
    return ans;
}

const getDate = () => {
    let time = new Date()
    let ans = (time.getFullYear()) + "-" +
        ("0" + (time.getMonth() + 1)).slice(-2) + "-" +
        ("0" + time.getDate()).slice(-2)
    return ans;
}
// creating a new appointment to a patient (appointment table)
// add a new appointment to the appointment table
router.post("/appointment", fetchuser, async (req, res) => {

    const { StartTime, StartDate, ExaminationRoom, PatientAadhar, DocID, Emergency } = req.body;
    var date = getDate();
    var time = getTime();
    var dateTime = date + ' ' + time;
    const emrgncy = Emergency ? 1 : 0;
    console.log(date, time, StartDate+" "+StartTime);
    if (StartDate+" "+StartTime < dateTime) {
        res.status(404).json({
            error: "Invalid time"
        });
        return;
    }
    try {
        let sql = `INSERT INTO Appointment (StartTime, StartDate, ExaminationRoom, PatientAadhar, DocID, Emrgncy) VALUES ('${StartTime}', '${StartDate}', '${ExaminationRoom}', '${PatientAadhar}', ${DocID}, ${emrgncy})`
        result = await query(sql);
        if (Emergency) {
            sql = `SELECT Email, Name from Doctor WHERE DocID = ${DocID}`
            try {
                let ans = await query(sql);
                sendemail(ans[0].Email, ans[0].Name, `Emergency Appointment created for ${PatientAadhar} From ${StartTime} on ${StartDate}`);
            }
            catch (error) {
                console.log({ error: "Failed to Send Email!" });
            }
        }
        res.status(200).json({
            success: 'Appointment created successfully'
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            error: "Cannot create appointment"
        });
    }
});


// give a room to the patient (stay table)
// add a new entity to the stay table
// change the availability status of the room
router.put("/stay", fetchuser, async (req, res) => {

    const { StartTime, RoomNo, PatientAadhar } = req.body;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    const curr_time = new Date(dateTime);
    const start_time = new Date(StartTime);

    if (start_time < curr_time) {
        res.status(404).json({
            error: "Invalid time"
        });
        return;
    }

    try {
        sql = `SELECT Availability from Room WHERE RoomNo = ${RoomNo}`
        result = await query(sql);
        if (result[0].Availability == 0) {
            res.status(404).json({
                error: "Room not available"
            });
            return;
        }
        sql = `SELECT * from Stay WHERE PatientAadhar = '${PatientAadhar}' and EndTime is NULL`;
        result = await query(sql);
        if (result.length > 0) {
            res.status(404).json({
                error: "Patient already admitted"
            });
            return;
        }
        sql = `INSERT INTO Stay (StartTime, RoomNo, PatientAadhar) VALUES ('${StartTime}', ${RoomNo}, '${PatientAadhar}')`
        result = await query(sql);
        console.log("Stay created successfully");

        sql = `UPDATE Room SET Availability = 0 WHERE RoomNo = ${RoomNo}`;
        result = await query(sql);
        console.log("Room availability updated successfully");
        res.status(200).json({
            success: 'Stay created successfully'
        });
    }
    catch (error) {
        res.status(404).json({
            error: "Cannot create stay"
        });
    }
});

// update the end time of patient (patient, stay tables)
// change the availability status of the room
// do not remove the patient from patient table
router.delete("/discharge", fetchuser, async (req, res) => {

    const { PatientAadhar } = req.body;
    const id = PatientAadhar;
    console.log("id = " + id);
    try {
        let sql = `SELECT * FROM Patient WHERE Aadhar = '${id}'`;

        let result = await query(sql);
        if (result.length === 0) {
            console.log("Patient not found");
            return res.status(404).json({
                error: "Patient not found"
            });
        }

        // update the end time of the patient in the stay table
        var date = getDate();
        var time = getTime();
        var dateTime = date + ' ' + time;

        sql = `UPDATE Stay 
                INNER JOIN (SELECT StayID FROM Stay WHERE Stay.PatientAadhar = '${id}' ORDER BY StartTime DESC LIMIT 1) AS S2 ON Stay.StayID = S2.StayID 
                SET EndTime = '${dateTime}';`;
        result = query(sql);

        console.log("End time updated successfully");

        // change the availability status of the room
        sql = `SELECT RoomNo FROM Stay 
                INNER JOIN (SELECT StayID FROM Stay WHERE Stay.PatientAadhar = '${id}' ORDER BY StartTime DESC LIMIT 1) AS S2 ON Stay.StayID = S2.StayID`
        result = await query(sql);

        console.log("RoomNo = " + result[0].RoomNo);
        sql = `UPDATE Room SET Availability = 1 WHERE RoomNo = ${result[0].RoomNo} `;
        result = await query(sql);
        console.log("Room availability updated successfully");

        res.status(200).json({
            success: 'End time updated successfully'
        });
    }
    catch {
        res.status(404).json({
            error: 'Error in removing patient'
        });
    }
});



module.exports = router;