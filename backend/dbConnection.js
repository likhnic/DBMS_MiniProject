const Client = require('mysql');
const dotenv = require('dotenv');
const util = require('util');

dotenv.config({ path: './.env' });

const client = Client.createConnection({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
})

client.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

const query = util.promisify(client.query).bind(client);

module.exports = query;