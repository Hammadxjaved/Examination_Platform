// studentRoutes.js
const express = require('express');
const router = express.Router();

const Student = require('../models/Students');

// Route to fetch all teachers
router.get('/students', async (req, res) => {
    try {
        const student = await Student.find();
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/students/program/:programId', async (req, res) => {
    const { programId } = req.params;

    try {
        // Find students with the specific program ID
        const students = await Student.find({ program: programId });

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found for this program' });
        }

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/student/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE endpoint to remove a student by ID
router.delete('/students/:id', async (req, res) => {
    try {
      await Student.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Error removing student' });
    }
  });

// Route to create a new student
const Program = require('../models/programs'); // Program model
router.post('/students/:id', async (req, res) => {
    const program = await Program.findById(req.params.id);
    const {name, email, password, faculty_number, enrollment_no, semester } = req.body;
    if (!name || !email || !password || !faculty_number || !enrollment_no || !program|| !semester) {
        return res.status(400).json({ message: 'All fields are required'});
    }
    
    try {
      const newStudent = new Student({name, email, password, faculty_number, enrollment_no, program, semester });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});
module.exports = router;
