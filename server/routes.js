const express = require('express');
const { getStudents, checkClassifications, checkDecks, pullTickets } = require('./controllers');
const router = express.Router();

router.get('/students', getStudents);

router.get('/check-classifications', checkClassifications);
router.get('/check-decks', checkDecks);
router.post('/pull', pullTickets);

module.exports = router;
