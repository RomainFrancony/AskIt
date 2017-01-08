//Postgres database

var connectionString = "pg://postgres:azerty@localhost:5432/postgres";


let pg = require('pg');
let client = new pg.Client(connectionString);
client.connect();



module.exports = client;