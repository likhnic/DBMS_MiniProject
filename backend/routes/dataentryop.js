const express = require('express');
const router = express.Router();
const query = require('../dbConnection');
const fetchuser = require('../public/js/fetchuser');

router.use(express.urlencoded({extended: 'false'}))
router.use(express.json())


router.get('/',fetchuser,async(req,res) => {
    let sqlQuery = `Select * from Patient`;
    try {
        let patient = await query(sqlQuery);
        if(patient.length == 0){
            return res.json({error: "No patients found!"});
        }
        return res.json({patient: patient});
    } catch (error) {
        console.log(error);
        res.json({error: error});
    }
})

router.get('/:patientId',fetchuser,async (req, res) => {

    let sqlQuery;

    sqlQuery = `SELECT * FROM Patient WHERE Aadhar = ${req.params.patientId};`
    try{
        let patient = await query(sqlQuery);
        if(patient.length == 0){
            return res.json({error: "No patients found!"});
        }
        return res.json({patient: patient});
    }
    catch(error){
        console.log(error);
        res.json({error: error});
    }
})
router.get('/test/names/:patientID',fetchuser,async(req,res) =>{
    console.log(req.params.patientID)
    let sqlQuery = `SELECT TestID,Name from Test,\`Procedure\` where Test.Code=\`Procedure\`.Code AND Result='NOT YET AVAILABLE' AND PatientAadhar='${req.params.patientID}'`;
    console.log(sqlQuery)
    try {
        let result = await query(sqlQuery)
        console.log(result)
        return res.json({test:result})
    } catch (error) {
        console.log(error);
        res.json({error: error});
    }
})
router.get('/test/names',fetchuser,async(req,res) =>{
    let sqlQuery = `SELECT Name from \`Procedure\` WHERE Type=0`;
    try {
        let result = await query(sqlQuery)
        return res.json({test:result})
    } catch (error) {
        console.log(error);
        res.json({error: error});
    }
})
router.get('/treatment/names',fetchuser,async(req,res) =>{
    let sqlQuery = `SELECT Name from \`Procedure\` WHERE Type=1`;
    try {
        let result = await query(sqlQuery)
        return res.json({test:result})
    } catch (error) {
        console.log(error);
        res.json({error: error});
    }
})
// need to give Test Name
router.post('/test/:patientId',fetchuser,async (req, res) => {


    const {Name} = req.body;
    console.log(Name)
    let sqlQuery = `SELECT Code FROM \`Procedure\` WHERE Name = '${Name}';`
    let Code;
    console.log(sqlQuery)
    try{
        let code = await query(sqlQuery);
        if(code.length == 0){
            return res.json({error: "No procedure found!"});
        }
        Code = code[0].Code;
        console.log('Code : ',Code)
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sqlQuery = `INSERT INTO Test( Date, Result, PatientAadhar, Code) VALUES ( '${date}','Not Yet Available','${req.params.patientId}', ${Code});`
    try{
        await query(sqlQuery);
        return res.json({success: "Test added successfully!"});
    }
    catch(error){
        console.log(error);
        res.json({error: error});
    }
})



// need to give TreatmentName and DocID
router.post('/treatment/:patientId', fetchuser,async(req, res)=>{

    let sqlQuery;

    const {Name, DocID} = req.body;
    sqlQuery = `SELECT Code FROM \`Procedure\` WHERE Name = '${Name}';`
    let Code;
    try{
        let code = await query(sqlQuery);
        if(code.length == 0){
            return res.json({error: "No procedure found!"});
        }
        Code = code[0].Code;
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }

    // get stayID from patientId where stayid = (select stayid from stay where stay.patient = " + id + " order by starttime desc limit 1)
    // sqlQuery = `SELECT StayID FROM Stay WHERE StayID = (SELECT StayID FROM Stay WHERE PatientAadhar = ${req.params.patientId} ORDER BY StartTime DESC LIMIT 1);`
    sqlQuery = `SELECT StayID FROM Stay WHERE PatientAadhar = ${req.params.patientId} ORDER BY StartTime DESC LIMIT 1;`
    let StayID;
    console.log(sqlQuery)
    try{
        let stayRes = await query(sqlQuery);
        console.log(stayRes)
        if(!stayRes||stayRes.length === 0){
            return res.json({error: "No stay found!"});
        }
        StayID = stayRes[0].StayID;
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }
    // sqlQuery = `SELECT * FROM Appointment WHERE PatientAadhar = '${req.params.patientId}' AND DocID = ${DocID} AND StartTime = (SELECT MAX(StartTime) FROM Appointment WHERE PatientAadhar = '${req.params.patientId}' AND DocID = ${DocID});`
    // try{
    //     let appointment = await query(sqlQuery);
    //     if(!appointment || appointment.length == 0){
    //         return res.json({error: "No appointment found!"});
    //     }
    //     if(appointment.StartTime > new Date().toISOString().slice(0, 19).replace('T', ' ') || appointment.EndTime < new Date().toISOString().slice(0, 19).replace('T', ' ')){
    //         return res.json({error: "Appointment not active!"});
    //     }
    // }
    // catch(error){
    //     console.log(error);
    //     return res.json({error: error});
    // }
    sqlQuery = `INSERT INTO Undergoes(Date, StayId, ProcedureCode, PatientAadhar, DocID) VALUES ('${new Date().toISOString().slice(0, 19).replace('T', ' ')}', ${StayID}, ${Code}, '${req.params.patientId}', ${DocID});`

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

router.put('/test/:testId',fetchuser,async (req, res) => {

    let sqlQuery;

    const {testId} = req.params;
    const {Result} = req.body;
    console.log(testId,Result)
    sqlQuery = `SELECT * FROM Test WHERE TestID = ${testId};`
    console.log(sqlQuery)
    try{

        let testRes = await query(sqlQuery);
        if(testRes.length == 0){
            return res.json({error: "No test found!"});
        }
        testRes[0].Result = Result;
        sqlQuery = `UPDATE Test SET Result = '${Result}' WHERE TestID = ${testId};`
    
        await query(sqlQuery);
        return res.json({success: "Test updated successfully!"});
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }

})

module.exports = router;