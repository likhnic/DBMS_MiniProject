const express = require('express');
const dataentryopRouter = require('./routes/dataentryop');
const frontdeskopRouter = require('./routes/frontdeskop');
const doctorRouter = require('./routes/doctor');
const adminRouter = require('./routes/admin');
const PORT = 5000;
const app = express();

app.use(express.urlencoded({ extended: 'false' }));
app.use(express.json());

app.use('/api/dataentryop', dataentryopRouter);
app.use('/api/frontdeskop', frontdeskopRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/admin', adminRouter);


app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});