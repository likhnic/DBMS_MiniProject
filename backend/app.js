const express = require('express');
const dataentryopRouter = require('./routes/dataentryop');
const frontdeskopRouter = require('./routes/frontdeskop');
const doctorRouter = require('./routes/doctor');
const adminRouter = require('./routes/admin');
const PORT = 5000;
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: 'false' }));
app.use(express.json());
app.use(cors());

app.use('/api/dataentryop', dataentryopRouter);
app.use('/api/frontdeskop', frontdeskopRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/admin', adminRouter);

app.post('/login', async (req, res) => {

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

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});
