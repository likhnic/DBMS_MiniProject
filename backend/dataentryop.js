const express = require('express');
const dotenv = require('dotenv')
const { Client } = require('pg');
const fetchuser = require('./public/js/fetchuser');
const bcrypt = require('bcryptjs');

const app = express();

dotenv.config({ path: './.env' })

const client = new Client({
user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
})

client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

let testId = 0;

app.get('get /api/dataentryop/:patientId', fetchuser,async (req, res) => {

    let sqlQuery = `SELECT * FROM DataEntryOp WHERE DataEntryOpID = ${req.user.id};`
    try{
        let operator = await client.query(sqlQuery);
        if(operator.rows.length == 0){
            return res.json({error: "No Data Entry Operator found!"});
        }
    }
    catch(error){
        console.log(error);
        res.json({error: error});
    }

    sqlQuery = `SELECT * FROM Patient WHERE Aadhar = ${req.params.patientId};`
    try{
        let patient = await client.query(sqlQuery);
        if(patient.rows.length == 0){
            return res.json({error: "No patients found!"});
        }
        return res.json({patient: patient.rows[0]});
    }
    catch(error){
        console.log(error);
        res.json({error: error});
    }
})

app.post('/api/dataentryop/test/:patientId', fetchuser,async (req, res) => {

    let sqlQuery = `SELECT * FROM DataEntryOp WHERE DataEntryOpID = ${req.user.id};`
    try{
        let operator = await client.query(sqlQuery);
        if(operator.rows.length == 0){
            return res.json({error: "No Data Entry Operator found!"});
        }
    }
    catch(error){
        console.log(error);
        res.json({error: error});
    }

    const {Name} = req.body;
    sqlQuery = `SELECT Code FROM Procedure WHERE Name = '${Name}';`
    let Code;
    try{
        let code = await client.query(sqlQuery);
        if(code.rows.length == 0){
            return res.json({error: "No procedure found!"});
        }
        Code = code.rows[0].Code;
    }
    catch(error){
        console.log(error);
        res.json({error: error});
    }
    let Date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sqlQuery = `INSERT INTO Test(TestID, Date, Result, PatientAadhar, Code) VALUES (${testId}, '${Date}','Not Yet Available',${req.params.patientId}, ${Code});`
    try{
        await client.query(sqlQuery);
        testId++;
        return res.json({success: "Test added successfully!"});
    }
    catch(error){
        console.log(error);
        res.json({error: error});
    }
})

app.post('/api/dataentryop/treatment/:id', async(req, res)=>{

    let sqlQuery = `SELECT * FROM DataEntryOp WHERE DataEntryOpID = ${req.user.id};`
    try{
        let operator = await client.query(sqlQuery);
        if(operator.rows.length == 0){
            return res.json({error: "No Data Entry Operator found!"});
        }
    }
    catch(error){
        console.log(error);
        res.json({error: error});
    }

    const {Name} = req.body;
    sqlQuery = `SELECT Code FROM Procedure WHERE Name = '${Name}';`
    let Code;
    try{
        let code = await client.query(sqlQuery);
        if(code.rows.length == 0){
            return res.json({error: "No procedure found!"});
        }
        Code = code.rows[0].Code;
    }
    catch(error){
        console.log(error);
        res.json({error: error});
    }

    sqlQuery = `INSERT INTO Undergoes(Date, StayId)`

})


app.get('/', (req, res)=>{
    res.json({success:"Website is live!"})
})

app.listen(3000, ()=> {
    console.log("server started on port 3000")
})
