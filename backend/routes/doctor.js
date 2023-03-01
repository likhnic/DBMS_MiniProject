const express = require('express');
const fetchuser = require('../public/js/fetchuser');
const bcrypt = require('bcryptjs');
const router = express.Router();
const query = require('../dbConnection');

router.use(express.urlencoded({extended: 'false'}))
router.use(express.json())


router.post('/login', async (req, res) => {

    const { ID, password } = req.body

    let sqlQuery = `SELECT * FROM User WHERE ID = ${ID}';`
    try {
        const result = await query(sqlQuery);
        if(result.rows.length == 0){
            return res.json({error: "Invalid Credentials"});
        }
        const comPass = bcrypt.compare(password, result.rows[0].password)
        if(!comPass){
            return res.json({error: "Invalid Credentials"});
        }
        const token = jwt.sign({user: {id: result.rows[0].ID}}, "secrethaha")
        return res.json({user: token})

    } catch (error) {
        console.log(error);
        return res.json({error: error});
    }
})


router.get('/', async(req, res)=>{

    // if(req.user.id != req.params.docId){
    //     return res.json({error: "You are not authorized to view this page!"})
    // }
    const docId = req.user.id;

    let sqlQuery = `SELECT Patient.Name 
                FROM Patient
                JOIN Appointment ON Patient.Aadhar = Appointment.PatientAadhar
                WHERE Appointment.DocId = ${docId};`

    try{
        const patients = await query(sqlQuery);
        return res.json({result: patients});
    }catch(error){
        console.log(error);
        return res.json({error: error});
    }
})

router.get('/:appointmentId', async(req, res)=>{

    // if(req.user.id != req.params.docId){
    //     return res.json({error: "You are not authorized to view this page!"})
    // }
    const appointmentId = req.params.appointmentId;
    let patientId;
    let sqlQuery = `SELECT PatientAadhar FROM Appointment WHERE AppointmentId = ${appointmentId};`
    try{

        let patientDet = await query(sqlQuery);
        patientId = patientDet.rows[0].PatientAadhar;
        if(!patientId){
            return res.json({error: "Patient not found!"})
        }
    }
    catch(error){
        console.log(error);
        return res.json({error: error});
    }

    let sqlQuery1 = `SELECT TestId, Name, Date, Result FROM Test, Procedure WHERE PatientAadhar = ${patientId} AND Procedure.Code = Test.Code;`
    let sqlQuery2 = `SELECT Procedure.Name, Undergoes.Date, Doctor.Name FROM Undergoes, Procedure, Doctor WHERE Undergoes.PatientAadhar = ${patientId} AND Procedure.Code = Undergoes.ProcedureCode AND Doctor.DocId = Undergoes.DocId;`
    let sqlQuery3 = `SELECT Medication.Name, Prescibes.Dose, Doctor.Name, Prescribes.Date FROM Prescribes, Doctor, Medication WHERE Prescribes.PatientAadhar = ${patientId} AND Medication.Code = Prescribes.MedicationCode AND Doctor.DocId = Prescribes.DocId;`

    try{

        let tests = await query(sqlQuery1);
        let undergoes = await query(sqlQuery2);
        let prescribes = await query(sqlQuery3);

        res.json({tests: tests, undergoes: undergoes, prescribes: prescribes});

    }catch(error){
        console.log(error);
        res.json({error: error});
    }
})


router.post('/:appointmentId', async(req, res)=>{

    // if(req.user.id != req.params.docId){
    //     return res.json({error: "You are not authorized to view this page!"})
    // }
    const appointmentId = req.params.appointmentId;
    const {MedicationCode, Dose} = req.body;
    let patientId, DocId;
    let sqlQuery = `SELECT PatientAadhar, DocId FROM Appointment WHERE AppointmentId = ${appointmentId};`
    
    try{

        let patientDet = await query(sqlQuery);
        patientId = patientDet.rows[0].PatientAadhar;
        DocId = patientDet.rows[0].DocId;
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

    let Date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sqlQuery = `INSERT INTO Prescribes(Medication, Dose, DocId, AppointmentId, PatientAadhar, Date) VALUES(${MedicationCode}, ${Dose}, ${DocId}, ${appointmentId}, ${patientId}, ${Date});`

    try{
        const result = await query(sqlQuery);
        res.json({result: result});
    }
    catch(error){
        console.log(error);
        res.json({error: error});
    }
})

// router.get('/hello/world/hi', (req, res)=>{
//     res.json({success:"Website is live!"})
// })

// router.listen(3000, ()=> {
//     console.log("server started on port 3000")
// })

module.exports = router;
