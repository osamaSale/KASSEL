
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/userModel');
const userModel = require('../models/userModel');

module.exports = {
    register: async (req, res) => {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        try {
            const user = { name, email, password, role };
            if (user[0]) {
                return res.status(400).json({ message: "Email already exist" });
            }
            const userId = await userModel.createUser(user);
            res.status(201).json({ message: 'User created successfully', userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        try {
            const user = await userModel.getUserByEmail(email);
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const isPasswordValid = await userModel.validatePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, user, message: "Login completed successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await userModel.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

}


