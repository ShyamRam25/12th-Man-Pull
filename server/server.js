const { Pool } = require('pg');

const pool = new Pool({
    host: 'aws-0-us-east-2.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.luzgratdvhliyzzjxnom',
    password: 'obannons1',
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
