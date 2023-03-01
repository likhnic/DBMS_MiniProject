const express = require('express');
const fetchuser = require('../public/js/fetchuser');
const bcrypt = require('bcryptjs');
const router = express.Router();

const query = require('../dbConnection');

router.use(express.urlencoded({extended: 'false'}))
router.use(express.json())

let testId = 0;

router.get('/:patientId',async (req, res) => {

    let sqlQuery //= `SELECT * FROM DataEntryOp WHERE DataEntryOpID = ${req.user.id};`
    // try{
    //     let operator = await query(sqlQuery);
    //     if(operator.rows.length == 0){
    //         return res.json({error: "No Data Entry Operator found!"});
    //     }
    // }
    // catch(error){
    //     console.log(error);
    //     res.json({error: error});
    // }

    sqlQuery = `SELECT * FROM Patient WHERE Aadhar = ${req.params.patientId};`
    try{
        let patient = await query(sqlQuery);
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

// need to give Test Name
router.post('/test/:patientId',async (req, res) => {

    let sqlQuery //= `SELECT * FROM DataEntryOp WHERE DataEntryOpID = ${req.user.id};`
    // try{
    //     let operator = await query(sqlQuery);
    //     if(operator.rows.length == 0){
    //         return res.json({error: "No Data Entry Operator found!"});
    //     }
    // }
    // catch(error){
    //     console.log(error);
    //     res.json({error: error});
    // }

    const {Name} = req.body;
    sqlQuery = `SELECT Code FROM Procedure WHERE Name = '${Name}';`
    let Code;
    try{
        let code = await query(sqlQuery);
        if(code.rows.length == 0){
            return res.json({error: "No procedure found!"});
        }
        Code = code.rows[0].Code;
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }
    let Date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sqlQuery = `INSERT INTO Test(TestID, Date, Result, PatientAadhar, Code) VALUES (${testId}, '${Date}','Not Yet Available',${req.params.patientId}, ${Code});`
    try{
        await query(sqlQuery);
        testId++;
        return res.json({success: "Test added successfully!"});
    }
    catch(error){
        console.log(error);
        res.json({error: error});
    }
})

// need to give TreatmentName and DocID
router.post('/treatment/:patientId', async(req, res)=>{

    let sqlQuery //= `SELECT * FROM DataEntryOp WHERE DataEntryOpID = ${req.user.id};`
    // try{
    //     let operator = await query(sqlQuery);
    //     if(operator.rows.length == 0){
    //         return res.json({error: "No Data Entry Operator found!"});
    //     }
    // }
    // catch(error){
    //     console.log(error);
    //     res.json({error: error});
    // }

    const {Name, DocID} = req.body;
    sqlQuery = `SELECT Code FROM Procedure WHERE Name = '${Name}';`
    let Code;
    try{
        let code = await query(sqlQuery);
        if(code.rows.length == 0){
            return res.json({error: "No procedure found!"});
        }
        Code = code.rows[0].Code;
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }

    // get stayID from patientId where stayid = (select stayid from stay where stay.patient = " + id + " order by starttime desc limit 1)
    sqlQuery = `SELECT StayID FROM Stay WHERE StayID = (SELECT StayID FROM Stay WHERE PatientAadhar = ${req.params.patientId} ORDER BY StartTime DESC LIMIT 1);`
    let StayID;
    try{
        let stayRes = query(sqlQuery);
        if(stayRes.rows.length == 0){
            return res.json({error: "No stay found!"});
        }
        StayID = stayRes.rows[0].StayID;
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }
    sqlQuery = `INSERT INTO Undergoes(Date, StayId, ProcedureCode, PatientAadhar, DocID) VALUES ('${new Date().toISOString().slice(0, 19).replace('T', ' ')}', ${StayID}, ${Code}, ${req.params.patientId}, ${DocID});`

    try{

        await query(sqlQuery);
        return res.json({success: "Treatment added successfully!"});
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }
})

// give Result in Body
router.put('/test/:testId',async (req, res) => {

    let sqlQuery //= `SELECT * FROM DataEntryOp WHERE DataEntryOpID = ${req.user.id};`
    // try{
    //     let operator = await query(sqlQuery);
    //     if(operator.rows.length == 0){
    //         return res.json({error: "No Data Entry Operator found!"});
    //     }
    // }
    // catch(error){
    //     console.log(error);
    //     res.json({error: error});
    // }

    const {testId} = req.params;
    const {Result} = req.body;

    sqlQuery = `SELECT * FROM Test WHERE TestID = ${testId};`
    try{

        let testRes = await query(sqlQuery);
        if(testRes.rows.length == 0){
            return res.json({error: "No test found!"});
        }
        testRes.rows[0].Result = Result;
        sqlQuery = `UPDATE Test SET Result = '${Result}' WHERE TestID = ${testId};`
    
        await query(sqlQuery);
        return res.json({success: "Test updated successfully!"});
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }

})


// router.get('/', (req, res)=>{
//     res.json({success:"Website is live!"})
// })

// router.listen(3000, ()=> {
//     console.log("server started on port 3000")
// })

module.exports = router;