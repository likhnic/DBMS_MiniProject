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

app.use(express.urlencoded({ extended: 'false' }));
app.use(express.json());
app.use(cors());

app.use('/api/dataentryop', dataentryopRouter);
app.use('/api/frontdeskop', frontdeskopRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/admin', adminRouter);


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
        const comPass = bcrypt.compare(Password, result[0].Password)
        if(!comPass){
            return res.json({error: "Invalid Credentials"});
        }
        const token = jwt.sign({user: {id: result[0].ID}}, "secrethaha")
        return res.json({user: token})
    } catch (error) {
        console.log(error);
        return res.json({error: error});
    }
})

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});
