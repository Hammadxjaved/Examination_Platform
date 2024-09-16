// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the CORS package

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Endpoint to handle log requests
app.post('/log', (req, res) => {
    const { message } = req.body;

    // Append log message to a file
    fs.appendFile(path.join(__dirname, 'logs.txt'), `${new Date().toISOString()} - ${message}\n`, (err) => {
        if (err) {
            console.error('Failed to write to log file', err);
            return res.status(500).send('Failed to log message');
        }
        res.send('Log message recorded');
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
