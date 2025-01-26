const pool = require('./db');

// check uin exists, classification T/F, is_pulled T/F
const validate_uin = async (uin) => {
    var result1 = await pool.query('SELECT EXISTS (SELECT 1 FROM students WHERE uin = $1)', [uin]);
    exists = result1.rows[0].exists;
    if (!exists) {
        const error = new Error('UIN does not exist');
        error.statusCode = 401;
        throw error;
    }

    var result2 = await pool.query('SELECT is_pulled FROM students WHERE uin = $1', [uin]);
    pulled = result2.rows[0].is_pulled;
    if (pulled) {
        const error = new Error('Ticket already pulled');
        error.statusCode = 402;
        throw error;
    }

    var result3 = await pool.query('SELECT classification FROM students WHERE uin = $1', [uin]);
    classification = result3.rows[0].classification;
    if (classification < 4) {
        return false;
    }
    return true;
};


const check_deck_availability = async (deck_id, tickets_count) =>{
    var result1 = await pool.query('SELECT section_num FROM sections WHERE deck = $1', [deck_id]);
    sections = result1.rows.map(row => row.section_num)
    for (const section of sections) {
        var result2 = await pool.query('SELECT seats_available FROM rows WHERE section_num = $1', [section]);
        available_seats = result2.rows[0].seats_available;
        if (available_seats >= tickets_count) {
            return true;
        }
    }
        
    return false;

}
module.exports = { validate_uin, check_deck_availability };