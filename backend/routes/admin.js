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

router.delete("/user/:id/:type", async (req, res) => {
    // if (req.user.id != req.params.id) {
    //     return res.json({ error: "You are not authorized to do this operation!" })
    // }
    const id = req.params.id
    const type_index = req.params.type
    if (type_index.localeCompare('2') == 0) {
        let sqlQuery1 = 'UPDATE User SET status = 0 where ID = ' + id
        let sqlQuery2 = 'UPDATE Doctor SET isWorking = 0 where ID = ' + id;
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
        let sqlQuery1 = 'DELETE FROM ' + types[type_index] + ' WHERE ' + type_IDs[type_index] + '= ' + id
        let sqlQuery2 = 'DELETE FROM User WHERE ID = ' + id
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
    // if (req.user.id != req.params.id) {
    //     return res.json({ error: "You are not authorized to do this operation!" })
    // }
    const { username, type_index,Aadhar, password } = req.body
    password_confirm = req.body['password-confirm']
    console.log(req.body);
    let sqlQuery1 = 'SELECT ' + type_IDs[type_index] + ' FROM ' + types[type_index] + ' WHERE ' + type_IDs[type_index] + ' = ' + username
    console.log(sqlQuery1)
    try {
        let result1 = await query(sqlQuery1);
        if (result1.length > 0) {
            return res.status(409).json({
                error: "username already exists"
            })
        } else if (password !== password_confirm) {
            return res.status(400).json({
                error: "password and confirm password do not match"
            })
        }else{
            let hashedPassword = await bcrypt.hash(password, 8)
            let sqlQuery2 = 'INSERT INTO ' + 'User' + ' values (' + username + ','+Aadhar+',"' + hashedPassword + '",1)'
            console.log(sqlQuery2)
            
            try {
                let result2 = await query(sqlQuery2);
                return res.json({
                    result2: result2
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


router.get('/', (req, res) => {
    res.json({ success: "Website is live!" })
})

// router.listen(7001, () => {
//     console.log("server started on port ", 7001)
// })

module.exports = router