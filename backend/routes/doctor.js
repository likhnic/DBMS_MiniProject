const express = require('express');
const fetchuser = require('../public/js/fetchuser');
const bcrypt = require('bcryptjs');
const router = express.Router();
const query = require('../dbConnection');

router.use(express.urlencoded({extended: 'false'}))
router.use(express.json())


router.get('/', fetchuser, async(req, res)=>{
    let checkquery = `SELECT * FROM Doctor WHERE DocID = ${req.user.id}`
    try{
        const checkdoc = await query(checkquery)
        if(!checkdoc){
            return res.json({error:"Not Authorised"})
        }
    }
    catch(error){
        return res.json({error:error})
    }
    const docId = req.user.id;

    let sqlQuery = `SELECT Patient.Name as patientname, Patient.Aadhar as patientaadhar, Appointment.AppointmentID as appointmentid, Appointment.StartTime as starttime, Appointment.EndTime as endtime, Patient.Phone as phone, Patient.Address as address 
                FROM Patient
                JOIN Appointment ON Patient.Aadhar = Appointment.PatientAadhar
                WHERE Appointment.DocID = ${docId};`

    try{
        const patients = await query(sqlQuery);
        return res.json({result: patients});
    }catch(error){
        console.log(error);
        return res.json({error: error});
    }
})

router.get('/:appointmentId/:type', fetchuser, async(req, res)=>{

    let checkquery = `SELECT * FROM Doctor WHERE DocID = ${req.user.id}`
    try{
        const checkdoc = await query(checkquery)
        if(!checkdoc){
            return res.json({error:"Not Authorised"})
        }
    }
    catch(error){
        return res.json({error:error})
    }
    const {appointmentId, type} = req.params;
    let patientId;
    let sqlQuery = `SELECT PatientAadhar FROM Appointment WHERE AppointmentID = ${appointmentId};`
    try{

        let patientDet = await query(sqlQuery);
        patientId = patientDet[0].PatientAadhar;
        if(!patientId){
            return res.json({error: "Patient not found!"})
        }
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }

    let sqlQuery1 = `SELECT TestID as testid, Name as procedurename, Date as date, Result as result FROM Test, \`Procedure\` WHERE Test.PatientAadhar = '${patientId}' AND Procedure.Code = Test.Code;`
    let sqlQuery2 = `SELECT Procedure.Name as procedurename, Undergoes.Date as undergoesdate, Doctor.Name as doctorname FROM Undergoes, \`Procedure\`, Doctor WHERE Undergoes.PatientAadhar = '${patientId}' AND Procedure.Code = Undergoes.ProcedureCode AND Doctor.DocID = Undergoes.DocID;`
    let sqlQuery3 = `SELECT Medication.Name as medicationname, Prescribes.Dose as prescribesdose, Doctor.Name as doctorname, Prescribes.Date as prescribesdate FROM Prescribes, Doctor, Medication WHERE Prescribes.PatientAadhar = '${patientId}' AND Medication.Code = Prescribes.MedicationCode AND Doctor.DocID = Prescribes.DocID;`

    try{

        if(type === 'tests'){
            let tests = await query(sqlQuery1);
            return res.json({tests: tests})
        }
        else if(type === 'undergoes'){
            let undergoes = await query(sqlQuery2);
            return res.json({undergoes: undergoes})
        }
        else {
            let prescribes = await query(sqlQuery3);
            return res.json({prescribes: prescribes})
        }
    }catch(error){
        console.log(error);
        res.json({error: error});
    }
})


router.post('/:appointmentId', fetchuser,async(req, res)=>{
    let checkquery = `SELECT * FROM Doctor WHERE DocID = ${req.user.id}`
    try{
        const checkdoc = await query(checkquery)
        if(!checkdoc){
            return res.json({error:"Not Authorised"})
        }
    }
    catch(error){
        return res.json({error:error})
    }
    const appointmentId = req.params.appointmentId;
    const {MedicationCode, Dose} = req.body;
    let patientId, DocId;
    let sqlQuery = `SELECT PatientAadhar, DocID FROM Appointment WHERE AppointmentID = ${appointmentId};`
     
    try{
        let patientDet = await query(sqlQuery);
        patientId = patientDet[0].PatientAadhar;
        DocId = patientDet[0].DocID;
        if(!patientId){
            return res.json({error: "Patient not found!"})
        }
        if(!DocId){
            return res.json({error: "Doctor not found!"})
        }
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }

    let DateN = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sqlQuery = `INSERT INTO Prescribes(MedicationCode, Dose, DocID, AppointmentID, PatientAadhar, Date) VALUES(${MedicationCode}, '${Dose}', ${DocId}, ${appointmentId}, '${patientId}', '${DateN}');`

    
    try{
        const result = await query(sqlQuery);
        return res.json({result: result});
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }
})

// router.get('/hello/world/hi', (req, res)=>{
//     res.json({success:"Website is live!"})
// })

// router.listen(3000, ()=> {
//     console.log("server started on port 3000")
// })

module.exports = router;

