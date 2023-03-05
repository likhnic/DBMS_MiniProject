const express = require('express');
const dataentryopRouter = require('./routes/dataentryop');
const frontdeskopRouter = require('./routes/frontdeskop');
const doctorRouter = require('./routes/doctor');
const adminRouter = require('./routes/admin');
const PORT = 5000;
const cors = require('cors');
const app = express();
const query = require('./dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('./public/js/fetchuser');

app.use(express.urlencoded({ extended: 'false' }));
app.use(express.json());
app.use(cors());

app.use('/api/dataentryop', dataentryopRouter);
app.use('/api/frontdeskop', frontdeskopRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/admin', adminRouter);

const types = {
    '0': 'Front_desk_operator',
    '1': 'Data_entry_operator',
    '2': 'Doctor',
    '3': 'Database_administrator'
}

const type_IDs = {
    '0': 'FrontDeskOpID',
    '1': 'DataEntryOpID',
    '2': 'DocID',
    '3': 'AdminID'
}

app.post('/login', async (req, res) => {

    const { ID, Password } = req.body

    let sqlQuery = `SELECT * FROM User WHERE ID = ${ID} AND Status=1;`
    console.log(sqlQuery)
    console.log(ID, Password)
    try {
        const result = await query(sqlQuery);
        console.log(result.length)
        if(result.length == 0){
            return res.json({error: "Invalid Credentials"});
        }
        // const comPass = bcrypt.compare(Password, result[0].Password)
        // if(!comPass){
        //     return res.json({error: "Invalid Credentials"});
        // }
        const token = jwt.sign({user: {id: result[0].ID}}, "secrethaha")
        return res.json({user: token, type: result[0].Type})
    } catch (error) {
        console.log(error);
        return res.status(404).json({error: "Cannot Login"});
    }

})

app.get('/checkUser/:type', fetchuser, async(req, res)=>{

    const isUser = req.user.id;
    const {type} = req.params
    let sqlQuery = `SELECT ${type_IDs[type]} FROM ${types[type]} WHERE  ${type_IDs[type]} = ${isUser};`

    try {
        const found = await query(sqlQuery)
        console.log("Hey",found)
        if(!found || found.length == 0){
            return res.json({error:"Not Authorised"})
        }
    } catch (error) {
        return res.json({error:"Cannot Authenticate"})
    }
    return res.json({success: "Fine"})
})

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});
