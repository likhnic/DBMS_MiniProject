const express = require('express');
const router = express.Router();
const query = require('../dbConnection');
const fetchuser = require('../public/js/fetchuser');

router.use(express.json());
router.use(express.urlencoded({ extended: 'false' }));


// registering a new patient (using patient table)
router.post("/register", fetchuser,async (req, res) => {

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


// creating a new appointment to a patient (appointment table)
// add a new appointment to the appointment table
router.post("/appointment", fetchuser, async (req, res) => {

    const { StartTime, EndTime, ExaminationRoom, PatientAadhar, DocID, Emergency } = req.body;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    const curr_time = new Date(dateTime);
    const start_time = new Date(StartTime);
    const end_time = new Date(EndTime);
    const emrgncy = Emergency ? 1 : 0;

    if (start_time < curr_time || end_time < start_time) {
        res.status(404).json({
            error: "Invalid time"
        });
        return;
    }
    try {
        let sql = `INSERT INTO Appointment (StartTime, EndTime, ExaminationRoom, PatientAadhar, DocID, Emrgncy) VALUES ('${StartTime}', '${EndTime}', '${ExaminationRoom}', '${PatientAadhar}', ${DocID}, ${emrgncy})`
        result = await query(sql);
        console.log("Appointment created successfully");
        res.status(200).json({
            success: 'Appointment created successfully'
        });
    }
    catch (error) {
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
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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