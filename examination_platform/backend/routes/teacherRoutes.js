// teacherRoutes.js
const express = require('express');
const router = express.Router();

const Teacher = require('../models/Teachers');


// Route to create a new teacher
router.post('/teachers', async (req, res) => {
    const {teacher_id, name, email, password, designation } = req.body;
    if (!teacher_id || !name || !email || !password || !designation) {
        return res.status(400).json({ message: 'All fields are required'});
    }
    
    try {
      const newTeacher = new Teacher({ teacher_id,name, email, password, designation });
        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to fetch all teachers
router.get('/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/teacher/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        res.json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE endpoint to remove a Teacher by ID
router.delete('/teachers/:id', async (req, res) => {
    try {
      await Teacher.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Error removing Teacher' });
    }
  });

module.exports = router;
