//Postgres database
let pg = require('pg');
let client = new pg.Client("pg://postgres:azerty@localhost:5432/postgres");
client.connect();



module.exports = client;