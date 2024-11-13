import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/Authentication/AuthProvider';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const CreateExam = () => {
  const { user } = useAuth();
  const {id} = useParams();
  const navigate = useNavigate();
  
  const [examData, setExamData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    status: 'upcoming',
  });

  const [questions, setQuestions] = useState([
    {
      content: '',
      type: 'mcq', // mcq, subjective, coding
      marks: 0,
      response: ''
    }
  ]);

  const [courses, setCourses] = useState([]);
  const [program, setPrograms] = useState([]);

  useEffect(() => {
    // Fetch courses and programs for selection
    const fetchCoursesAndPrograms = async () => {
      try {
        const [courseRes] = await Promise.all([
          axios.get(`http://localhost:3001/course/${id}`),
        ]);
        const [programRes] = await Promise.all([
          axios.get(`http://localhost:3001/program/${courseRes.data.programs[0]}`),
        ]);
        setCourses(courseRes.data);
        setPrograms(programRes.data);

      } catch (err) {
        console.error('Failed to fetch courses and programs:', err);
      }
    };

    fetchCoursesAndPrograms(); 
  }, [id]);

  const handleExamChange = (e) => {
    const { name, value } = e.target;
    setExamData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        content: '',
        type: 'mcq',
        marks: 0,
        response: ''
      }
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, create the exam
      const examResponse = await axios.post('http://localhost:3001/exams', {
        ...examData,
        program : program._id,
        course: id,
        createdBy: user._id,
      });

      const examId = examResponse.data._id;

      // Then, add the questions
      await Promise.all(
        questions.map(async (question) => {
          await axios.post('http://localhost:3001/questions', {
            ...question,
            exam: examId,
          });
        })
      );

      navigate('../dashboard'); // Redirect to the teacher dashboard or exam list
    } catch (err) {
      console.error('Error creating exam or adding questions:', err);
    }
  };

  return (
    <Container>
      <h2>Create Exam</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="title">
              <Form.Label>Exam Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter exam title"
                name="title"
                value={examData.title}
                onChange={handleExamChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="course">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                name="course"
                value={courses.name + " - " + courses.code}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
          <Form.Group controlId="Program">
              <Form.Label>Program</Form.Label>
              <Form.Control
                type="text"
                name="Program"
                value={program.name}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={examData.status}
                onChange={handleExamChange}
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startTime"
                value={examData.startTime}
                onChange={handleExamChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endTime"
                value={examData.endTime}
                onChange={handleExamChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <h3>Questions</h3>
        {questions.map((question, index) => (
          <div key={index} className="mb-3">
            <Form.Group controlId={`content-${index}`}>
              <Form.Label>Question Content</Form.Label>
              <Form.Control
                type="text"
                name="content"
                placeholder="Enter question content"
                value={question.content}
                onChange={(e) => handleQuestionChange(index, e)}
              />
            </Form.Group>

            <Form.Group controlId={`type-${index}`}>
              <Form.Label>Question Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={question.type}
                onChange={(e) => handleQuestionChange(index, e)}
              >
                <option value="mcq">MCQ</option>
                <option value="subjective">Subjective</option>
                <option value="coding">Coding</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId={`marks-${index}`}>
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type="number"
                name="marks"
                value={question.marks}
                onChange={(e) => handleQuestionChange(index, e)}
              />
            </Form.Group>

            <Form.Group controlId={`response-${index}`}>
              <Form.Label>Response</Form.Label>
              <Form.Control
                type="text"
                name="response"
                placeholder="Enter correct answer or response"
                value={question.response}
                onChange={(e) => handleQuestionChange(index, e)}
              />
            </Form.Group>

            <Button variant="danger" onClick={() => handleRemoveQuestion(index)}>
              Remove Question
            </Button>
          </div>
        ))}
        <Button variant="primary" onClick={handleAddQuestion}>
          Add Question
        </Button>

        <Button variant="success" type="submit" className="mt-3">
          Create Exam
        </Button>
      </Form>
    </Container>
  );
};

export default CreateExam;
