
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = {
    register: async (req, res) => {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.json({ message: 'All fields are required' , status: 400 });
        }
        try {
            const user = { name, email, password, role };
            if (user[0]) {
                return res.json({ message: "Email already exist", status: 400 });
            }
            const userId = await userModel.createUser(user);
            res.json({ message: 'User created successfully', userId, status: 201 });
        } catch (error) {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    res.json({ message: 'Email already exists' });
                }
                console.error(error);
            res.status(500).json({ message: 'Server Error'  , status: 500 });
            }
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'Email and password are required', status: 400 });
        }
        try {
            const user = await userModel.getUserByEmail(email);
            if (!user) {
                return res.json({ message: 'Invalid email or password', status: 400 });
            }
            const isPasswordValid = await userModel.validatePassword(password, user.password);
            if (!isPasswordValid) {
                return res.json({ message: 'Invalid email or password' , status: 400});
            }
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, user, message: "Login completed successfully" ,status: 201 });
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


