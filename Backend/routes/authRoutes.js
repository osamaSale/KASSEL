const express = require('express');
const { getUsers , login , register} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', authMiddleware, getUsers);
module.exports = router;
