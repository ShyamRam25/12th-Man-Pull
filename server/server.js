require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false, 
    },
});

async function queryDatabase() {
    try {
        const res = await pool.query('SELECT * FROM students');
        console.log('Data:', res.rows);
    } catch (err) {
        console.error('Error executing query:', err);
    }
}

queryDatabase();
