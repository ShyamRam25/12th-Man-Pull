const pool = require('./db');

// check uin exists, classification T/F, is_pulled T/F
const validate_uin = async (uin) => {
    var result1 = await pool.query('SELECT EXISTS (SELECT 1 FROM students WHERE uin = $1)', [uin]);
    exists = result1.rows[0].exists;
    if (!exists) {
        const error = new Error(`UIN ${uin} does not exist`);
        error.statusCode = 401;
        error.uin = uin;
        throw error;
    }

    var result2 = await pool.query('SELECT is_pulled FROM students WHERE uin = $1', [uin]);
    pulled = result2.rows[0].is_pulled;
    if (pulled) {
        const error = new Error(`Ticket already pulled for UIN ${uin}`);
        error.statusCode = 402;
        error.uin = uin;
        throw error;
    }

    var result3 = await pool.query('SELECT classification FROM students WHERE uin = $1', [uin]);
    classification = result3.rows[0].classification;

    var today = 3;
    // mon-4 tue-3 wed-2 thu/fri-1
    if (classification < today) {
        return false;
    }
    return true;
};


const check_deck_availability = async (deck_id, tickets_count) => {
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


const check_decks = async (tickets) => {
    const tickets_count = parseInt(tickets);
    var available_decks = [];
    if (tickets_count > 10) {
        if (await check_deck_availability(3, tickets_count)) {
            return [3];
        }
        else {
            return [0];
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
        return [0];
    }

    return available_decks;
};

const update_section = async (section_num) => {
    var result = await pool.query('SELECT * FROM rows WHERE section_num = $1', [section_num]);
    var rows = result.rows;
    for (var row of rows) {
        if (row.seats_available > 0) {
            return;
        }
    }

    await pool.query('UPDATE sections SET is_full = $1 WHERE section_num = $2', [true, section_num]);
};

const update_row = async (row_num, count, section_num, seats_available) => {
    var updated_seats_available = seats_available - count;
    var result = await pool.query('UPDATE rows SET seats_available = $1 WHERE section_num = $2 AND row_num = $3', [updated_seats_available, section_num, row_num]);
    if (updated_seats_available == 0) {
        await update_section(section_num);
    }
};

const update_students = async (uins, section_num, row_num, pos) => {
    for (let i = 0; i < uins.length; i++) {
        await pool.query('UPDATE students SET is_pulled = $1, section = $2, row = $3, seat = $4 WHERE uin = $5', [true, section_num, row_num, pos+i, uins[i]]);
    }
};

const insert_pull_history = async (uins, section_num, row_num, pos) => {
    var seats = []
    for (let i = 0; i < uins.length; i++) {
        seats.push(pos+i);
    }
    
    result = await pool.query('INSERT INTO pull_history (puller_uin, section, row, seats, pulled_for) VALUES ($1, $2, $3, $4, $5)', [uins[0], section_num, row_num, seats, uins]);
    return seats;
};

module.exports = { validate_uin, check_decks, update_row, update_students, insert_pull_history };