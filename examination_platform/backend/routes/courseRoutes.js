const express = require('express');
const router = express.Router();
const Course = require('../models/courses'); // courses model


// Route to add a new course
// Import necessary models
const Program = require('../models/programs');  // Adjust path as needed
const Teacher = require('../models/Teachers');  // Adjust path as needed

// Route to add a new course
router.post('/courses/:id', async (req, res) => {
  const { name, code, description, semester, programs, teachers } = req.body;
  const program = await Program.findById(req.params.id);

    // Check if required fields are provided
    if (!name || !code || !semester) {
        return res.status(400).json({ message: 'Name, code, and semester are required fields' });
    }

    try {
        // Find the program and teacher objects from the database
        // const programIds = await Program.findById(programs);
        
        const teacherIds = await Teacher.findById(teachers);

        // Create a new course instance with the found program and teacher objects
        const newCourse = new Course({
            name,
            code,
            description,
            semester,
            programs: program,  // Extract only the ObjectIds
            teachers: teacherIds   // Extract only the ObjectIds
        });

        // Save the course to the database
        await newCourse.save();

        res.status(201).json(newCourse); // Respond with the created course
    } catch (error) {
        // Handle any errors (e.g., duplicate code)
        res.status(400).json({ message: error.message });
    }
});


router.get('/courses/program/:programId', async (req, res) => {
  const { programId } = req.params;

  try {
      // Find courses with the specific program ID
      const courses = await Course.find({ programs: programId });

      if (courses.length === 0) {
          return res.status(404).json({ message: 'No courses found for this program' });
      }

      res.status(200).json(courses);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/courses/teacher/:teacherId', async (req, res) => {
  const { teacherId } = req.params;

  try {
      // Find courses with the specific teacher ID
      const courses = await Course.find({ teachers: teacherId });

      if (courses.length === 0) {
          return res.status(404).json({ message: 'No courses found for this teacher' });
      }

      res.status(200).json(courses);  
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/course/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE endpoint to remove a course by ID
router.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error removing course' });
  }
});

module.exports = router;