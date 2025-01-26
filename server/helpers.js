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
    if (classification < 4) {
        return false;
    }
    return true;
};

module.exports = { validate_uin };