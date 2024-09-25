// Databasse connection ----------------------------------------------------------------
const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.DB_URL;

const mongoURI = dbUrl;
mongoose.connect(mongoURI, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});
// -----------------------------------------------------------------------------
