const express = require('express');
const router = express.Router();
const Exam = require('../models/exam');

router.post('/exams', async (req, res) => {
  const { title, course, program, createdBy, startTime, endTime, status } = req.body;
  try {
    const newExam = new Exam({
      title,
      course,
      program,
      createdBy,
      startTime,
      endTime,
      status,
    });
    await newExam.save();
    res.status(201).json(newExam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
