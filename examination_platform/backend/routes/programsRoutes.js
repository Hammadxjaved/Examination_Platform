const express = require('express');
const router = express.Router();
const Program = require('../models/programs'); // Program model


router.post('/programs', async (req, res) => {
  const { name, description,semester } = req.body;
  if (!name || !description ) {
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