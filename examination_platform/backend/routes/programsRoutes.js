const express = require('express');
const router = express.Router();
const Program = require('../models/programs'); // Program model


// GET endpoint to fetch all programs
router.get('/api/programs', async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving programs' });
  }
});


// POST endpoint to add a new program
router.post('/api/programs', async (req, res) => {
  try {
    const program = new Program(req.body);
    await program.save();
    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error adding program' });
  }
});

// DELETE endpoint to remove a program by ID
router.delete('/api/programs/:id', async (req, res) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error removing program' });
  }
});

module.exports = router;