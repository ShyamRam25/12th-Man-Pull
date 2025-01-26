const pool = require('./db');
const { validate_uin, check_deck_availability } = require('./helpers');

const getStudents = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students');
        res.json(result.rows);
    } catch (err) {
        console.error('Error querying students:', err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
};

const checkClassifications = async (req, res) => {
    const uins = req.query.uins?.split(',');
    var over = 0;
    var under = 0;
    var names = [];

    try {
        for (const uin of uins) {
            if (await validate_uin(uin)) {
                over += 1;
            }
            else {
                under += 1;
            }
            result = await pool.query('SELECT name FROM students WHERE uin = $1', [uin]);
            names.push(result.rows[0].name);
        }
        
        if (under > over) {
            res.status(403).json({ error: 'Invalid ratio', over, under, names});
            return;
        }
        res.json({ over, under, names });
    } catch (err) { 
        res.status(err.statusCode || 500).json({error: err.message || 'internal error', uin: err.uin});
    }
};

const checkDecks = async (req, res) => {
    const tickets_count = parseInt(req.query.tickets);
    available_decks = [];
    if (tickets_count > 10) {
        if (await check_deck_availability(3, tickets_count)) {
            res.json([3]);
            return
        }
        else {
            res.json([0]);
            return
        }
    }

    if ( await check_deck_availability(1, tickets_count)) {
        available_decks.push(1);
    }
    if ( await check_deck_availability(2, tickets_count)) {
        available_decks.push(2);
    }
    if ( await check_deck_availability(3, tickets_count)) {
        available_decks.push(3);
    }
    if (available_decks.length === 0) {
        res.json([0]);
        return
    }
    res.json(available_decks);

};

const pullTickets = async (req, res) => {

};

module.exports = { getStudents, checkClassifications, checkDecks, pullTickets };
