const connection = require('../config/database');

module.exports = {
    createUser: async (name, email, password, role) => {
        const [result] = await connection.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role]
        );
        return result;
    },
    getUserByEmail: async (email) => {
        const [rows] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    },
    getAllUsers: async () => {
        const [rows] = await connection.query('SELECT * FROM users');
        return rows;
    }
}