const express = require('express');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
require("./config/database")
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/courses', courseRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});