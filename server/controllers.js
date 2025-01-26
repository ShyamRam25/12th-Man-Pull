const pool = require('./db');
const { validate_uin, check_decks, update_row, update_students, insert_pull_history } = require('./helpers');

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

        const decks = await check_decks(uins.length);
        res.json({ over, under, names, decks });
    } catch (err) { 
        res.status(err.statusCode || 500).json({error: err.message || 'internal error', uin: err.uin});
    }
};


const pullTickets = async (req, res) => {
    const uins = req.body.uins;
    const deck = req.body.deck;
    
    result1 = await pool.query('SELECT section_num FROM sections WHERE deck = $1 ORDER BY priority', [deck]);
    var sections = result1.rows.map(row => row.section_num);
    for (var section of sections) {
        result2 = await pool.query('SELECT is_full FROM sections WHERE section_num = $1', [section]);
        if (!result2.rows[0].is_full) {
            result3 = await pool.query('SELECT * FROM rows WHERE section_num = $1 ORDER BY row_num', [section]);
            var rows = result3.rows;
            for (var row of rows) {
                if (uins.length <= row.seats_available) {
                    await update_row(row.row_num, uins.length, section, row.seats_available);
                    await update_students(uins, section, row.row_num, row.capacity-row.seats_available);
                    var seats = await insert_pull_history(uins, section, row.row_num, row.capacity-row.seats_available);
                    res.json({section, row: row.row_num, seats});
                    return;
                }
            }
        }
    }
};

module.exports = { getStudents, checkClassifications, pullTickets };
