require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3001;

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

app.use(cors());

app.get('/students', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students');
        res.json(result.rows);
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});