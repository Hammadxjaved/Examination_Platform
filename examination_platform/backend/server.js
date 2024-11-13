// server.js
const db = require('./db')
require('dotenv').config();
console.log(process.env.PORT)
const port = process.env.PORT || 3000;

const express = require('express');
const app = express();
app.use(express.json());


const cors = require('cors'); // Import the CORS package
app.use(cors()); // Enable CORS for all origins


const userRoutes = require('./routes/userRoutes'); // Import the user routes
app.use(userRoutes); // Use the imported user routes

const teacherRoutes = require('./routes/teacherRoutes'); // Import the teacher routes
app.use(teacherRoutes); // Use the imported teacher routes

const studentRoutes = require('./routes/studentRoutes.js'); // Import the student routes
app.use(studentRoutes); // Use the imported student routes

const examRoutes = require('./routes/examRoutes.js'); // Import the exam routes
app.use(examRoutes); // Use the imported exam routes

const questionRoutes = require('./routes/questionRoutes.js'); // Import the question routes
app.use(questionRoutes); // Use the imported question routes

const programsRoutes = require('./routes/programsRoutes'); // Import the programs routes
app.use(programsRoutes); // Use the imported programs routes
    

const coursesRoutes = require('./routes/courseRoutes'); // Import the courses routes
app.use(coursesRoutes); // Use the imported courses routes


const logging = require('./routes/logging')
app.use(logging);

app.get('/', (req, res) => {
    res.send('MongoDB connected with Express');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
