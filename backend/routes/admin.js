const express = require('express');
const dotenv = require('dotenv')
const Client = require('mysql');
const fetchuser = require('../public/js/fetchuser');
const util = require('util');
const bcrypt = require('bcryptjs');
const router = express.Router();
const query = require('../dbConnection');


router.use(express.urlencoded({ extended: 'false' }))
router.use(express.json())

const types = {
    '0': 'Front_Desk_Operator',
    '1': 'Data_Entry_Operator',
    '2': 'Doctor',
    '3': 'Database_administrator'
}

const type_IDs = {
    '0': 'FrontDeskOpID',
    '1': 'DataEntryOpID',
    '2': 'DocID',
    '3': 'AdminID'
}

router.delete("/user/:ID/:type", async (req, res) => {
    // if (req.user.ID != req.params.ID) {
    //     return res.json({ error: "You are not authorized to do this operation!" })
    // }
    const ID = req.params.ID
    const type_index = req.params.type
    if (type_index == 2) {
        let sqlQuery1 = `UPDATE User SET Status = 0 where ID = ${ID}`
        let sqlQuery2 = `UPDATE Doctor SET isWorking = 0 where ${type_IDs[type_index]} = ${ID}`
        try {
            let result1 = await query(sqlQuery1);
            let result2 = await query(sqlQuery2);
            return res.json({
                result1: result1, result2: result2
            })
        } catch (error) {
            console.log(error);
            return res.json({ error: error });
        }
    } else {
        let sqlQuery1 = 'DELETE FROM ' + types[type_index] + ' WHERE ' + type_IDs[type_index] + '= ' + ID
        let sqlQuery2 = 'DELETE FROM User WHERE ID = ' + ID
        console.log(sqlQuery1)
        console.log(sqlQuery2)
        try {
            let result1 = await query(sqlQuery1);
            let result2 = await query(sqlQuery2);
            return res.json({
                result1: result1, result2: result2
            })
        } catch (error) {
            console.log(error);
            return res.json({ error: error });
        }
    }
})


router.post("/user", async (req, res) => {
    // if (req.user.ID != req.params.ID) {
    //     return res.json({ error: "You are not authorized to do this operation!" })
    // }
    const { ID, type_index,Aadhar, Password, Password_confirm,Name,Phone,Address,Position} = req.body
    
    console.log(req.body);
    let sqlQuery1 = 'SELECT ' + type_IDs[type_index] + ' FROM ' + types[type_index] + ' WHERE ' + type_IDs[type_index] + ' = ' + ID
    console.log(sqlQuery1)
    try {
        let result1 = await query(sqlQuery1);
        if (result1.length > 0) {
            return res.status(409).json({
                error: "ID already exists"
            })
        } else if (Password !== Password_confirm) {
            return res.status(400).json({
                error: "password and confirm password do not match"
            })
        }else{
            let hashedPassword = await bcrypt.hash(Password, 8)
            let sqlQuery2 = 'INSERT INTO ' + 'User' + ' values (' + ID + ','+Aadhar+',"' + hashedPassword + '",1)'
            if(type_index==2)
                sqlQuery3 = `INSERT INTO ${types[type_index]} values (${ID},"${Position}","${Name}","${Phone}","${Address}",1)`
            else
                sqlQuery3 = `INSERT INTO ${types[type_index]} values (${ID},"${Name}","${Phone}","${Address}")`

            // ID name phone address
            console.log(sqlQuery2)
            console.log(sqlQuery3)
            try {
                let result2 = await query(sqlQuery2);
                let result3 = await query(sqlQuery3);
                return res.json({
                    result2: result2,
                    resutl3: result3
                })
            } catch (error) {
                console.log(error);
                return res.json({ error: error });
            }
        }
    } catch (error) {
        console.log(error);
        return res.json({ error: error });
    }
})

router.post('/login', async (req, res) => {

    const { ID, Password } = req.body

    let sqlQuery = `SELECT * FROM User WHERE ID = ${ID} AND Status=1;`
    console.log(sqlQuery)
    try {
        const result = await query(sqlQuery);
        console.log(result.length)
        if(result.length == 0){
            return res.json({error: "Invalid Credentials"});
        }
        const comPass = bcrypt.compare(Password, result[0].Password)
        if(!comPass){
            return res.json({error: "Invalid Credentials"});
        }
        // const token = jwt.sign({user: {id: result.rows[0].ID}}, "secrethaha")
        // return res.json({user: token})
        return res.json({success:"successfully logged in"})
    } catch (error) {
        console.log(error);
        return res.json({error: error});
    }
})

router.get('/', (req, res) => {
    res.json({ success: "Website is live!" })
})

// router.listen(7001, () => {
//     console.log("server started on port ", 7001)
// })

module.exports = router
