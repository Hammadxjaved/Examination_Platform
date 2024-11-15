import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Badge, Navbar } from 'react-bootstrap';
import { PlusCircle, Trash2 } from 'lucide-react';
// import { useParams, Link } from 'react-router-dom';
import NavBar from '../../components/layouts/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateExam = () => {
    const navigate = useNavigate();
    const savedCourse = JSON.parse(sessionStorage.getItem('course'));
    const id = savedCourse._id; // Get id from the URL params
    const [course, setCourse] = useState(null); // State to store course details
    useEffect(() => {
        // Fetch the course details based on the id
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/course/${savedCourse._id}`);
                setCourse(response.data);
            } catch (err) {
            }
        };
        fetchCourseDetails();
    }, [id]);

    const [examData, setExamData] = useState({
        title: '',
        course: savedCourse._id,
        program: savedCourse.programs[0],
        createdBy: savedCourse.teachers[0],
        startTime: '',
        endTime: '',
        duration: '',
        totalMarks: '',
        instructions: '',
        questions: []
    });

    const [currentQuestion, setCurrentQuestion] = useState({
        type: '',
        content: '',
        marks: '',
        options: [{ text: '', isCorrect: false }],
        correctOption: '',
        testCases: [{ input: '', expectedOutput: '' }]
    });

    const handleExamDataChange = (e) => {
        const { name, value } = e.target;
        setExamData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        setCurrentQuestion(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTestCaseChange = (index, field, value) => {
        setCurrentQuestion(prev => {
            const newTestCases = [...prev.testCases];
            newTestCases[index] = { ...newTestCases[index], [field]: value };
            return { ...prev, testCases: newTestCases };
        });
    };

    const addTestCase = () => {
        setCurrentQuestion(prev => ({
            ...prev,
            testCases: [...prev.testCases, { input: '', expectedOutput: '' }]
        }));
    };

    const removeTestCase = (index) => {
        setCurrentQuestion(prev => ({
            ...prev,
            testCases: prev.testCases.filter((_, i) => i !== index)
        }));
    };

    const addQuestion = () => {
        if (!currentQuestion.type || !currentQuestion.content || !currentQuestion.marks) {
            alert('Please fill all required fields for the question');
            return;
        }
        setExamData(prev => ({
            ...prev,
            questions: [...prev.questions, currentQuestion]
        }));
        setCurrentQuestion({
            content: '',
            type: '',
            marks: '',
            options: [{ text: '', isCorrect: false }],
            correctOption: '',
            testCases: [{ input: '', expectedOutput: '' }]
        });
    };


    const handleOptionChange = (index, field, value) => {
        const updatedOptions = [...currentQuestion.options];
        updatedOptions[index][field] = value;
        setCurrentQuestion((prevData) => ({
          ...prevData,
          options: updatedOptions,
        }));
      };
    
      const handleAddOption = () => {
        setCurrentQuestion((prevData) => ({
          ...prevData,
          options: [...prevData.options, { text: '', isCorrect: false }],
        }));
      };
    
      const handleRemoveOption = (index) => {
        const updatedOptions = currentQuestion.options.filter((_, i) => i !== index);
        setCurrentQuestion((prevData) => ({
          ...prevData,
          options: updatedOptions,
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(examData)
        try {
            // Validate total marks matches sum of question marks
            const totalQuestionMarks = examData.questions.reduce((sum, q) => sum + Number(q.marks), 0);
            if (totalQuestionMarks !== Number(examData.totalMarks)) {
                alert(`Total marks (${examData.totalMarks}) doesn't match sum of question marks (${totalQuestionMarks})`);
                return;
            }



            const response = await fetch('http://localhost:3001/api/exams/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: examData.title,
                    instructions: examData.instructions,
                    duration: Number(examData.duration),
                    totalMarks: Number(examData.totalMarks),
                    course: examData.course,
                    program: examData.program,
                    createdBy: examData.createdBy,
                    startTime: examData.startTime,
                    endTime: examData.endTime,
                    questions: examData.questions.map((q, index) => ({
                        questionNumber: index + 1,
                        content: q.content,
                        type: q.type,
                        marks: Number(q.marks),
                        options: q.type === 'mcq' ? q.options.map(opt => ({
                            text: opt.text,
                            isCorrect: opt.isCorrect
                          })) : [],
                          testCases: q.type === 'coding' ? q.testCases.map(tc => ({
                            input: tc.input,
                            expectedOutput: tc.expectedOutput
                          })) : []
                    }))
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create exam');
            }

            const result = await response.json();
            alert('Exam created successfully!');
            // Optionally reset the form or redirect
            setExamData({
                title: '',
                course: savedCourse._id,
                program: savedCourse.programs[0],
                createdBy: savedCourse.teachers[0],
                startTime: '',
                endTime: '',
                duration: '',
                totalMarks: '',
                instructions: '',
                questions: []
            });
            navigate("/teacher/dashboard");

        } catch (error) {
            console.error('Error creating exam:', error);
            alert('Error creating exam: ' + error.message);
        }
    };

    return (
        <>
            <NavBar />
            <Container className="py-4">
                <Form onSubmit={handleSubmit}>
                    {/* Exam Details Card */}
                    <Card className="mb-4">
                        <Card.Header as="h5">Create New Exam</Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Exam Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={examData.title}
                                    onChange={handleExamDataChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>instructions</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="instructions"
                                    value={examData.instructions}
                                    onChange={handleExamDataChange}
                                    required
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Start Time</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            name="startTime"
                                            value={examData.startTime}
                                            onChange={handleExamDataChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>End Time</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            name="endTime"
                                            value={examData.endTime}
                                            onChange={handleExamDataChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Duration (minutes)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="duration"
                                            value={examData.duration}
                                            onChange={handleExamDataChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Total Marks</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="totalMarks"
                                            value={examData.totalMarks}
                                            onChange={handleExamDataChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    {/* Add Question Card */}
                    <Card className="mb-4">
                        <Card.Header as="h5">Add Question</Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Question Type</Form.Label>
                                <Form.Select
                                    name="type"
                                    value={currentQuestion.type}
                                    onChange={handleQuestionChange}
                                >
                                    <option value="">Select question type</option>
                                    <option value="mcq">Multiple Choice</option>
                                    <option value="subjective">Subjective</option>
                                    <option value="coding">Programming</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Question</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="content"
                                    value={currentQuestion.content}
                                    onChange={handleQuestionChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Marks</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="marks"
                                    value={currentQuestion.marks}
                                    onChange={handleQuestionChange}
                                />
                            </Form.Group>

                            {currentQuestion.type === 'mcq' && (
                                <>
  <h5>Options</h5>
  {currentQuestion.options.map((option, index) => (
    <Row key={index}>
      <Col md={8}>
        <Form.Control
          type="text"
          value={option.text}
          onChange={(e) =>
            handleOptionChange(index, 'text', e.target.value)
          }
          placeholder={`Option ${index + 1}`}
        />
      </Col>
      <Col md={4}>
        <Form.Check
          type="radio"
          label="Correct"
          checked={option.isCorrect}
          onChange={() =>
            handleOptionChange(index, 'isCorrect', true)
          }
        />

        <Form.Check
          type="radio"
          label="Incorrect"
          checked={!option.isCorrect}
          onChange={() =>
            handleOptionChange(index, 'isCorrect', false)
          }
        />
      </Col>
      <Col>
        <Button variant="danger" onClick={() => handleRemoveOption(index)}>
          Remove Option
        </Button>
      </Col>
    </Row>
  ))}
  <Button variant="primary" onClick={handleAddOption}>
    Add Option
  </Button>
  </>
)}

                            {currentQuestion.type === 'coding' && (
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <Form.Label className="mb-0">Test Cases</Form.Label>
                                        <Button variant="outline-primary" size="sm" onClick={addTestCase}>
                                            <PlusCircle className="me-2" size={16} />
                                            Add Test Case
                                        </Button>
                                    </div>
                                    {currentQuestion.testCases.map((testCase, index) => (
                                        <Card key={index} className="mb-3">
                                            <Card.Body>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label>Input</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                rows={3}
                                                                value={testCase.input}
                                                                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label>Expected Output</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                rows={3}
                                                                value={testCase.expectedOutput}
                                                                onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                {index > 0 && (
                                                    <Button
                                                        variant="link"
                                                        className="text-danger p-0 mt-2"
                                                        onClick={() => removeTestCase(index)}
                                                    >
                                                        <Trash2 size={16} className="me-1" />
                                                        Remove Test Case
                                                    </Button>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            <Button variant="primary" onClick={addQuestion}>
                                Add Question
                            </Button>
                        </Card.Body>
                    </Card>

                    {/* Questions List Card */}
                    {examData.questions.length > 0 && (
                        <Card className="mb-4">
                            <Card.Header as="h5">
                                Added Questions <Badge bg="secondary">{examData.questions.length}</Badge>
                            </Card.Header>
                            <Card.Body>
                                {examData.questions.map((q, index) => (
                                    <Card key={index} className="mb-3">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h6 className="mb-0">Question {index + 1}</h6>
                                                <Badge bg="primary">{q.type}</Badge>
                                            </div>
                                            <p className="mt-2 mb-1">{q.question}</p>
                                            <small className="text-muted">Marks: {q.marks}</small>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Card.Body>
                        </Card>
                    )}

                    <Button variant="success" type="submit" size="lg" className="w-100">
                        Create Exam
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default CreateExam;