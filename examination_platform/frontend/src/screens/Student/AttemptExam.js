import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Navbar } from 'react-bootstrap';
import NavBar from '../../components/layouts/NavBar';


const AttemptExam = () => {
  const examData = {
    title: 'Sessional 1',
    instructions: 'All questions are mandatory \nTime - 45 min',
    duration: 45, // Duration in minutes
    totalMarks: 20,
    course: '6739f93d2e29695468a6414f',
    program: '6734ef7646a00aef32f825c2',
    createdBy: '6734dba22729bc40de4cf312',
    startTime: '2024-11-19T10:00',
    endTime: '2024-11-19T11:00',
    questions: [
      {
        questionNumber: 1,
        content: 'How many bits are there in a byte?',
        type: 'mcq',
        marks: 2,
        options: [
          { text: '2', isCorrect: false },
          { text: '4', isCorrect: false },
          { text: '8', isCorrect: true },
          { text: '16', isCorrect: false }
        ],
        testCases: []
      },
      {
        questionNumber: 2,
        content: 'Write about the generation of Computers.',
        type: 'subjective',
        marks: 8,
        options: [],
        testCases: []
      },
      {
        questionNumber: 3,
        content: 'Write a program to find the first n prime numbers.',
        type: 'coding',
        marks: 10,
        options: [],
        testCases: [{ input: '5', output: '[2,3,5,7,11]' }]
      }
    ]
  };

  const [responses, setResponses] = useState({});
  const [timeLeft, setTimeLeft] = useState(examData.duration * 60); // Time in seconds
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const initialResponses = {};
    examData.questions.forEach((q) => {
      if (q.type === 'mcq' || q.type === 'subjective' || q.type === 'coding') {
        initialResponses[q.questionNumber] = ''; // Initialize as empty
      }
    });
    setResponses(initialResponses); // Set initial responses
  
    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit on timeout
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer); // Cleanup on unmount
  }, []); // Empty dependency array ensures this runs only once
  

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleInputChange = (questionNumber, value) => {
    setResponses((prev) => ({ ...prev, [questionNumber]: value }));
  };

  const handleSubmit = () => {
    console.log('Responses submitted:', responses);
    setSubmitted(true);
  };

  if (submitted) {
    return (
        <>
        <NavBar />
      <Container className="mt-4">
        <h2 className="text-center">Exam Submitted</h2>
        <p className="text-center">Your responses have been recorded. Thank you!</p>
      </Container>
        </>
    );
  }

  return (
    <>
    <NavBar/>
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="text-center">{examData.title}</h1>
        </Col>
        <Col className="text-right">
          <Alert variant="info" className="d-inline-block">
            Time Left: {formatTime(timeLeft)}
          </Alert>
        </Col>
      </Row>
      <Card className="mb-4">
        <Card.Body>
          <p><strong>Instructions:</strong></p>
          <pre>{examData.instructions}</pre>
          <p><strong>Duration:</strong> {examData.duration} minutes</p>
          <p><strong>Total Marks:</strong> {examData.totalMarks}</p>
        </Card.Body>
      </Card>

      {examData.questions.map((question) => (
        <Card className="mb-4" key={question.questionNumber}>
          <Card.Header>Question {question.questionNumber} ({question.marks} Marks)</Card.Header>
          <Card.Body>
            <p>{question.content}</p>
            {question.type === 'mcq' && (
              <Form>
                {question.options.map((option, idx) => (
                  <Form.Check
                    type="radio"
                    id={`q${question.questionNumber}_opt${idx}`}
                    key={`q${question.questionNumber}_opt${idx}`}
                    label={option.text}
                    name={`q${question.questionNumber}`}
                    value={option.text}
                    checked={responses[question.questionNumber] === option.text}
                    onChange={(e) => handleInputChange(question.questionNumber, e.target.value)}
                  />
                ))}
              </Form>
            )}

            {question.type === 'subjective' && (
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Type your answer here..."
                value={responses[question.questionNumber]}
                onChange={(e) => handleInputChange(question.questionNumber, e.target.value)}
              />
            )}

            {question.type === 'coding' && (
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Write your code here..."
                value={responses[question.questionNumber]}
                onChange={(e) => handleInputChange(question.questionNumber, e.target.value)}
              />
            )}
          </Card.Body>
        </Card>
      ))}

      <Button variant="primary" onClick={handleSubmit}>
        Submit Exam
      </Button>
    </Container>
    </>

  );
};

export default AttemptExam;
