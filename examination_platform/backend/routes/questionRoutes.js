const express = require('express');
const router = express.Router();
const Question = require('../models/question');

router.post('/questions', async (req, res) => {
  const { exam, content, type, marks, response } = req.body;
  try {
    const newQuestion = new Question({
      exam,
      content,
      type,
      marks,
      response
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
