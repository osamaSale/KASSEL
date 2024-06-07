const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail, getAllUsers } = require('../models/user');


module.exports = {
    register: async (req, res) => {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(name, email, hashedPassword, role);
        res.status(201).json({ message: 'User created' });
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    },

    getUsers: async (req, res) => {
        const users = await getAllUsers();
        res.json(users);
    }
}


