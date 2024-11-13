const express = require('express');
const router = express.Router();
const Program = require('../models/programs'); // Program model
const Course = require('../models/courses'); // Program model


router.post('/programs', async (req, res) => {
  const { name, description,semester } = req.body;
  if (!name || !description || !semester ) {
    return res.status(401).json({ message: 'All fields are required' });
  }
  try {
    const newProgram = new Program({ name, description, semester });
    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Route to add a new course to a specific program
router.post('/program/:programId/addCourse', async (req, res) => {
    const { programId } = req.params;
    const  courseId = req.body; // Take course ID from request body

    try {
        // Step 1: Find the course by ID
        const course = await Course.find({"code":courseId.code});
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Step 2: Add the existing course to the program's courses array
        const program = await Program.findByIdAndUpdate(
            programId,
            { $addToSet: { courses: course } }, // Use `$addToSet` to prevent duplicates
        )

        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        res.status(200).json({ message: 'Course added to program successfully', program });
    } catch (error) {
        console.error('Error adding course to program:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.get('/programs', async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/program/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    res.json(program);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE endpoint to remove a program by ID
router.delete('/programs/:id', async (req, res) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error removing program' });
  }
});

module.exports = router;