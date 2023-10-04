require("dotenv").config()
const express = require('express');

const admin = require('firebase-admin');


const app = express();
const PORT = 3000;

// This will run the code inside database.js and connect to MongoDB
require('./database');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log()
});



