const express = require('express');
const router = express.Router();
const Exam = require('../models/exam');
const ExamResponse = require('../models/ExamResponse');
const Question = require('../models/question');

const mongoose = require('mongoose');

router.post('/api/exams/create', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      title, course, program, createdBy, startTime, endTime, duration, totalMarks, instructions, questions
    } = req.body;

    console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------------");
    console.log(req.body);
    const exam = new Exam({
      title,
      course,
      program,
      createdBy,
      startTime,
      endTime,
      duration,
      totalMarks,
      instructions
    });
    await exam.save({ session });

    // Create questions
    const questionPromises = questions.map(async (q) => {
      console.log(q.options);
      const question = new Question({
        exam: exam._id,
        questionNumber: q.questionNumber,
        content: q.content,
        type: q.type,
        marks: q.marks,
        options: q.options || [],
        testCases: q.testCases || [],
        topics: q.topics || []
      });

      return question.save({ session });
    });

    await Promise.all(questionPromises);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: 'Exam created successfully',
      examId: exam._id
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error('Error creating exam:', error);
    res.status(400).json({
      message: 'Error creating exam',
      error: error.message
    });
  }
});

router.get('/exams/teacher/:teacherId', async (req, res) => {
  const { teacherId } = req.params;

  try {
    // Validate the teacherId
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ error: 'Invalid teacher ID' });
    }

    // Fetch exams created by the teacher
    const exams = await Exam.find({ createdBy: teacherId })
      .populate('course', 'name') // Populate course details (e.g., name)
      .populate('program', 'name') // Populate program details (e.g., name)
      .sort({ startTime: -1 }); // Sort exams by start time, most recent first

    // Return the exams
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
});



module.exports = router;
