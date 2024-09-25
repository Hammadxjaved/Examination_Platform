// Endpoint to handle log requests
const express = require('express');
const path = require('path');
const router = express.Router();


const fs = require('fs');
router.post('/log', (req, res) => {
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

module.exports = router;
// -------------------------------------------------------------------------
