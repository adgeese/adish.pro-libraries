
const { Pool } = require('pg');

const DB_HOST = (process.env.DB_HOST) ? process.env.DB_HOST : '192.168.1.160';
const DB_USER = (process.env.DB_USER) ? process.env.DB_USER : 'adish';
const DB_PASSWORD = (process.env.DB_PASSWORD) ? process.env.DB_PASSWORD : 'adish';
const DB_NAME = (process.env.DB_NAME) ? process.env.DB_NAME : 'adish';

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: 5432,
    max: 20
  });


let bConnected = true;
console.log(`pool connected to ${DB_USER} @ ${DB_HOST}:5432 db ${DB_NAME} password *******`)

pool.on('error', (err, client) => {
  console.error(JSON.stringify(err));
  console.error('Exiting');
  bConnected = false;
});


exports.connected = () => {
	return bConnected;
};

/**
 * Query the Database
 * 
 * @param string query Query the database. Expressions e.g. $1 with type ::uuid are populated with parameters
 * @param array parameters to pass to the client query string
 * @catch errors
 * @return object Object has rows element populated with the data
 **/
exports.query = async (query, params) => {

  // Create a connection to the database
  const client = await pool.connect();

  // Query for the results
  const results = await client.query(query, params);

  // Release the client
  await client.release();

  return results;

}; // end query

exports.close = async () => {
	await pool.end();
};
