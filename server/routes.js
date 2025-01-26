const express = require('express');
const { getStudents, checkClassifications, pullTickets } = require('./controllers');
const router = express.Router();

router.get('/students', getStudents);

router.get('/check-classifications', checkClassifications);
router.post('/pull', pullTickets);

module.exports = router;
