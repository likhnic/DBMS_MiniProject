const express = require('express');
const fetchuser = require('../public/js/fetchuser');
const router = express.Router();
const query = require('../dbConnection');

router.use(express.urlencoded({extended: 'false'}))
router.use(express.json())
var path = require('path');


router.get('/result/:fileName',  async(req, res,next)=>{
    
    var options = {
        root: path.join(__dirname+'/testresults')
    };

    var fileName = req.params.fileName;
    console.log(options)
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})

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

    let sqlQuery = `SELECT Patient.Name as patientname, Patient.Aadhar as patientaadhar, Patient.Gender as gender, Patient.Age as age, Appointment.AppointmentID as appointmentid, Appointment.StartTime as starttime, Appointment.StartDate as startdate, Patient.Phone as phone, Patient.Address as address, Appointment.Emrgncy as Emrgncy 
                FROM Patient
                JOIN Appointment ON Patient.Aadhar = Appointment.PatientAadhar
                WHERE Appointment.DocID = ${docId}
                ORDER BY Appointment.StartDate DESC,Appointment.StartTime DESC;`

    try{
        const patients = await query(sqlQuery);
        console.log(patients);
        return res.json({result: patients});
    }catch(error){
        console.log(error);
        return res.json({error: "Cannot fetch patients"});
    }
})

router.get('/getMedications', fetchuser, async(req, res)=>{

    let sqlQuery = `SELECT Code, Name, Brand FROM Medication;`
    try{
        const medications = await query(sqlQuery);
        return res.json({medications: medications});    
    }
    catch(error){
        console.log(error);
        return res.json({error: "Cannot fetch medications"});
    }
})

router.get('/names',fetchuser,async(req,res) =>{
    let sqlQuery = `SELECT DocID,Name from Doctor where isWorking=1`;
    try {
        let result = await query(sqlQuery)
        return res.json({test:result})
    } catch (error) {
        console.log(error);
        res.json({error: "Internal Server Error"});
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
        return res.json({error: "Cannot fetch patient details"});
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
        res.json({error: "Internal Server Error"});
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
        return res.json({error:"Not Authorised"})
    }

    const {MedicationCode, Dose} = req.body;

    let sqlQuery = `CALL insertPrescribes(${req.params.appointmentId}, ${MedicationCode}, "${Dose}");`
    try{
        let result = await query(sqlQuery);
        return res.json({result: result});
    }
    catch(error){
        console.log(error);
        return res.json({error:error.sqlMessage});
    }

})

module.exports = router;

