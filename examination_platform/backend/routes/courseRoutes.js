const express = require('express');
const router = express.Router();
const Course = require('../models/courses'); // courses model


router.post('/courses', async (req, res) => {
  const { name, code, semester } = req.body;
  if (!name || !code || !semester) {
    return res.status(401).json({ message: 'All fields are required' });
  }
  try {
    const newCourse = new Course({ name, code, semester });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
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