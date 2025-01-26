require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});