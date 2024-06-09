const connection = require('../config/database');
const bcrypt = require('bcryptjs');
module.exports = {
    createUser: async (user) => {
        const { name, email, password, role } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await connection.execute(
            'INSERT INTO users (name, email, password ,role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
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
    validatePassword: async function (inputPassword, storedPassword) {
        return await bcrypt.compare(inputPassword, storedPassword);
    },
    getAllUsers: async () => {
        const [rows] = await connection.query('SELECT * FROM users');
        return rows;
    }
}