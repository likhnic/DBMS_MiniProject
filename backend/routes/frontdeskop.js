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
    const {Aadhar, Name, Address, Phone, InsuranceID, PCPDocID} = req.body;

    let sql = `SELECT * from Patient WHERE Aadhar = '${Aadhar}'`
    try{
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
    catch(error){
        console.log(error);
        res.status(404).json({
            error: error
        });
    }
});


// creating a new appointment to a patient (appointment table)
router.post("/:id", async (req, res) => {
    const {id} = req.params;
    const {StartTime, EndTime, ExaminationRoom, PatientAadhar, DocID} = req.body;
    try {

        let sql = `INSERT INTO Appointment (StartTime, EndTime, ExaminationRoom, PatientAadhar, DocID) VALUES ('${StartTime}', '${EndTime}', '${ExaminationRoom}', '${PatientAadhar}', ${DocID})`
        result = await query(sql);
        console.log("Appointment created successfully");
        res.status(200).json({
            success: 'Appointment created successfully'
        });
    }
    catch(error) {
        res.status(404).json({
            error: 'Error in creating Appointment'
        });
    }
});


// give a room to the patient (stay table)
router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const {StartTime, RoomNo, PatientAadhar} = req.body;

    if (id != PatientAadhar) {
        console.log("Patient not found");
        res.status(404).json({
            error: "Patient not found"
        });
        return;
    }
    try {
        let sql = `SELECT * FROM Stay WHERE StayID = ${StayID}`;
        let result  = await query(sql);
        if (result.length > 0) {
            console.log("Stay already exists");
            res.status(404).json({
                error: "Stay already exists"
            });
            return;
        }

        sql = `INSERT INTO Stay (StartTime, RoomNo, PatientAadhar) VALUES ('${StartTime}', ${RoomNo}, '${PatientAadhar}')`
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
        let sql = `SELECT * FROM Patient WHERE Aadhar = '${id}'`;

        let result = await query(sql);
        if (result.length == 0) {
            console.log("Patient not found");
            return res.status(404).json({
                error: "Patient not found"
            });
        }

        sql = `DELETE FROM Patient WHERE Aadhar = '${id}'`;
        result = await query(sql);
        console.log("Patient removed successfully");

        // update the end time of the patient in the stay table
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        
        sql = `UPDATE Stay SET EndTime = '${dateTime}' WHERE StayID = (SELECT StayID FROM Stay WHERE Stay.PatientAadhar = '${id}' ORDER BY StartTime DESC LIMIT 1)`;
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