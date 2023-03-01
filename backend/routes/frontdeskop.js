const express = require('express');
const Client = require('mysql');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const query = require('../dbConnection');

router.use(express.json());
router.use(express.urlencoded({ extended: 'false' }));


// registering a new patient (using patient table)
router.post("/register", async (req, res) => {
    const {Aadhar, Name, Address, Phone, InsuranceId, PCPDocID} = req.body;

    let sql = "select * from patient where Aadhar = " + Aadhar;
    try{
        let result = await query(sql);
        if (result.rows.length > 0) {
            res.status(404).json({
                error: "Patient already registered"
            })
            console.log("Patient already registered");
            return;
        }
    
        sql = "insert into patient (Aadhar, Name, Address, Phone, InsuranceId, PCPDocID) values (" + Aadhar + ", '" + Name + "', '" + Address + "', " + Phone + ", " + InsuranceId + ", " + PCPDocID + ")";
    
        result = await query(sql);
        console.log("Patient registered successfully");
        res.status(200).json({
            success: 'Patient registered successfully'
        });
    }
    catch(error){
        console.log(error);
        res.status(404).json({
            error: 'Error in registering patient'
        });
    }
});


// creating a new appointment to a patient (appointment table)
router.post("/:id", async (req, res) => {
    const {id} = req.params;
    const {AppointmentID, StartTime, EndTIme, ExaminationRoom, PatientAadhar, DocID} = req.body;
    try {
        let sql = "select * from appointment where AppointmentID = " + AppointmentID;
        let result = await query(sql);
        if (result.rows.length > 0) {
            console.log("Appointment already exists");
            res.status(404).json({
                error: "Appointment already exists"
            })
            return;
        }

        sql = "insert into appointment (AppointmentID, StartTime, EndTime, ExaminationRoom, PatientAadhar, DocID) values (" + AppointmentID + ", '" + StartTime + "', '" + EndTIme + "', " + ExaminationRoom + ", " + PatientAadhar + ", " + DocID + ")";
        
        result = await query(sql);
        console.log("Appointment created successfully");
        res.status(200).json({
            success: 'Appointment created successfully'
        });
    }
    catch {
        res.status(404).json({
            error: 'Error in creating appointment'
        });
    }
});


// give a room to the patient (stay table)
router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const {StayID, StartTime, RoomNo, PatientAadhar} = req.body;

    if (id != PatientAadhar) {
        console.log("Patient not found");
        res.status(404).json({
            error: "Patient not found"
        });
        return;
    }
    try {
        let sql = "select * from stay where StayID = " + StayID;
        let result  = await query(sql);
        if (result.rows.length > 0) {
            console.log("Stay already exists");
            res.status(404).json({
                error: "Stay already exists"
            });
            return;
        }

        sql = "insert into stay (StayID, StartTime, RoomNo, PatientAadhar) values (" + StayID + ", '" + StartTime + "', " + RoomNo + ", " + PatientAadhar + ")";
        result = await query(sql);
        console.log("Stay created successfully");
        res.status(200).json({
            success: 'Stay created successfully'
        });
    }
    catch {
        res.status(404).json({
            error: 'Error in creating stay'
        });
    }
});

// removing the patient from the patient table and update the end time of patient (patient, stay tables)
router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    console.log("id = " + id);
    try {
        let sql = "select * from patient where Aadhar = " + id;
        let result = await query(sql);
        if (result.rows.length == 0) {
            console.log("Patient not found");
            res.status(404).json({
                error: "Patient not found"
            });
            return;
        }

        sql = "delete from patient where Aadhar = " + id;
        result = await client(sql);
        console.log("Patient removed successfully");
        // res.status(200).json({
        //     success: 'Patient removed successfully'
        // });

        // update the end time of the patient in the stay table
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        sql = "update stay set endtime = '" + dateTime + "' where stayid = (select stayid from stay where stay.patient = " + id + " order by starttime desc limit 1)";
        result = query(sql);

        console.log("End time updated successfully");
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

// router.listen(3000, () => {
//     console.log("Server started on port 3000");
// });

module.exports = router;