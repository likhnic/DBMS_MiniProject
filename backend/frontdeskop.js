const express = require('express');
const { Client } = require('pg');
const path = require("path");
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: 'false' }));

dotenv.config({ path: './.env' });

const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
});

client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

// registering a new patient (using patient table)
app.post("/api/frontdeskop/register", async (req, res) => {
    const {Aadhar, Name, Address, Phone, InsuranceId, PCPDocID} = req.body;

    let sql = "select * from patient where Aadhar = " + Aadhar;
    try{
        let result = await client.query(sql);
        if (result.rows.length > 0) {
            res.status(404).json({
                error: "Patient already registered"
            })
            console.log("Patient already registered");
            return;
        }
    
        sql = "insert into patient (Aadhar, Name, Address, Phone, InsuranceId, PCPDocID) values (" + Aadhar + ", '" + Name + "', '" + Address + "', " + Phone + ", " + InsuranceId + ", " + PCPDocID + ")";
    
        result = await client.query(sql);
        console.log("Patient registered successfully");
        res.status(200).json({
            success: 'Patient registered successfully'
        });
    }
    catch(error){
        console.log(error);
        res.status(404).json({
            success: 'Error in registering patient'
        });
    }
});


// creating a new appointment to a patient (appointment table)
app.post("/api/frontdeskop/:id", async (req, res) => {
    const {id} = req.params;
    const {AppointmentID, StartTime, EndTIme, ExaminationRoom, PatientAadhar, DocID} = req.body;
    let sql = "select * from appointment where AppointmentID = " + AppointmentID;

    let result = await client.query(sql);
    if (result.rows.length > 0) {
        res.status(404).json({
            error: "Appointment already exists"
        })
        console.log("Appointment already exists");
        return;
    }

    sql = "insert into appointment (AppointmentID, StartTime, EndTime, ExaminationRoom, PatientAadhar, DocID) values (" + AppointmentID + ", '" + StartTime + "', '" + EndTIme + "', " + ExaminationRoom + ", " + PatientAadhar + ", " + DocID + ")";
    
    result = await client.query(sql);
    console.log("Appointment created successfully");
    res.status(200).json({
        success: 'Appointment created successfully'
    });
});


// give a room to the patient (stay table)
app.put("/api/frontdeskop/:id", async (req, res) => {
    const {id} = req.params;
    const {StayID, StartTime, RoomNo, PatientAadhar} = req.body;

    if (id != PatientAadhar) {
        res.json({
            code: 404,
            message: "Patient not found"
        })
        console.log("Patient not found");
        return;
    }

    let sql = "select * from stay where StayID = " + StayID;
    await client.query(sql, async (err, result) => {
        if (err) throw err;
        if (result.rows.length > 0) {
            res.json({
                code: 404,
                message: "Stay already exists"
            })
            console.log("Stay already exists");
            return;
        }
    });

    sql = "insert into stay (StayID, StartTime, RoomNo, PatientAadhar) values (" + StayID + ", '" + StartTime + "', " + RoomNo + ", " + PatientAadhar + ")";
    client.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Stay created successfully");
        res.json({
            'code': 200,
            'message': 'Stay created successfully'
        });
    });
});

// removing the patient from the patient table and update the end time of patient (patient, stay tables)
app.delete("/api/frontdeskop/:id", async (req, res) => {
    const {id} = req.params;
    console.log("id = " + id);
    let sql = "select * from patient where Aadhar = " + id;
    await client.query(sql, async (err, result) => {
        if (err) throw err;
        if (result.rows.length == 0) {
            res.json({
                code: 404,
                message: "Patient not found"
            })
            console.log("Patient not found");
            return;
        }
        sql = "delete from patient where Aadhar = " + id;
        await client.query(sql, async (err, result) => {
            if (err) throw err;
            console.log("Patient removed successfully");
            res.json({
                'code': 200,
                'message': 'Patient removed successfully'
            });
        });

        // update the end time of the patient in the stay table
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        sql = "update stay set endtime = '" + dateTime + "' where stayid = (select stayid from stay where stay.patient = " + id + " order by starttime desc limit 1)";

        client.query(sql, (err, result) => {
            if (err) throw err;
            console.log("End time updated successfully");
            res.json({
                'code': 200,
                'message': 'End time updated successfully'
            });
        });
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});