import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import NavBar from '../../components/layouts/NavBar';
import axios from 'axios';


const ProgramDetail = () => {
    const { id } = useParams();
    const [program, setProgram] = useState(null);
    const [message, setMessage] = useState('');  // Set message as an empty string
    const [showMessage, setShowMessage] = useState(false);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [newStudent, setNewStudent] = useState({
        name: '',
        email: '',
        password: '123',
        faculty_number: '',
        enrollment_no: '',
        semester: ''
    });
    const [newCourse, setNewCourse] = useState({
        name: '',
        code: '',
        description: '',
        semester: '',
        programs: '',
        teachers: ''
    });
    const [teachers, setTeachers] = useState([]);

    // Fetch program details, courses, and students on component mount
    useEffect(() => {
        const fetchProgramsAndTeachers = async () => {
            try {
                const teachersRes = await axios.get('http://localhost:3001/teachers'); // Update URL if necessary
                setTeachers(teachersRes.data);
            } catch (error) {
                console.error('Error fetching programs and teachers:', error);
            }
        };

        fetchProgramsAndTeachers();
        const fetchProgramData = async () => {
            try {
                const programResponse = await fetch(`http://localhost:3001/program/${id}`);
                const programData = await programResponse.json();
                setProgram(programData);
                const studentsResponse = await fetch(`http://localhost:3001/students/program/${id}`);
                const studentsData = await studentsResponse.json();
                setStudents(studentsData);
                const courseResponse = await fetch(`http://localhost:3001/courses/program/${id}`);
                const courseData = await courseResponse.json();
                setCourses(courseData);
            } catch (error) {
                console.error("Failed to fetch program data:", error);
            }
        };
        fetchProgramData();
    }, [id]);


    const addCourseToProgram = async (e) => {
        e.preventDefault();

        try {
            newCourse.semester = program.semester;
            const response = await fetch(`http://localhost:3001/courses/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });

            if (response.ok) {
                const data = await response.json();
                try {
                    const response2 = await fetch(`http://localhost:3001/program/${id}/addCourse`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
                    if (response2.ok) {
                        setMessage("Course added successfully!");
                        setShowMessage(true);
                        setCourses([...courses, data]);
                        setNewCourse({
                            name: '',
                            code: '',
                            description: '',
                            semester: program.semester,
                            programs: '',
                            teachers: ''
                        });
                    } else {
                        const errorData = await response.json();
                        setMessage(errorData.message || 'Failed to add course');
                        setShowMessage(true);
                    }
                }
                catch (error) {
                    setMessage("Error1: " + error.message);
                    setShowMessage(true);
                }
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Failed to add course');
                setShowMessage(true);
            }
        } catch (error) {
            setMessage("Error1: " + error.message);
            setShowMessage(true);
        }
    };
    // Handle form inputs for new course and new student
    const handleStudentChange = (e) => setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    const handleCourseChange = (e) => setNewCourse({ ...newCourse, [e.target.name]: e.target.value });


    // Add a student to this program
    const addStudentToProgram = async (e) => {
        e.preventDefault();

        try {
            newStudent.semester = program.semester;
            const response = await fetch(`http://localhost:3001/students/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage("Student added successfully!");
                setShowMessage(true);
                setStudents([...students, data]);
                setNewStudent({ name: '', email: '', password: '123', faculty_number: '', enrollment_no: '', semester: program.semester });
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Failed to add student');
                setShowMessage(true);
            }
        } catch (error) {
            setMessage("Error1: " + error.message);
            setShowMessage(true);
        }
    };

    if (!program) return <p>Loading...</p>;


    return (
        <>
            <NavBar />
            <Container>
                {showMessage ? (
                    <Alert
                        className="mb-2"
                        variant="info"
                        style={{
                            position: 'fixed',       // Keeps the alert fixed on the screen
                            top: '20px',             // Adjust top offset as needed
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '90%',            // Optional: adjust width for smaller devices
                            maxWidth: '100%',       // Optional: set a maximum width
                            zIndex: 1000             // Ensure it appears above other elements
                        }}
                        onClose={() => setShowMessage(false)}
                        dismissible
                    >
                        {message}
                    </Alert>
                ) : (
                    <div />
                )}
                <h2>Program Details</h2>
                <p><strong>Name:</strong> {program.name}</p>
                <p><strong>Semester:</strong> {program.semester}</p>
                <p><strong>Description:</strong> {program.description}</p>

                <h3>Courses in this Program</h3>
                {courses.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Teacher</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course._id}>
                                    <td>{course.name}</td>
                                    <td>{course.code}</td>
                                    <td>{course.description}</td>
                                    <td>{course.teachers}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => { }}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No courses found for this program.</p>
                )}

                <h4>Add a New Course</h4>
                <Form onSubmit={addCourseToProgram}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={newCourse.name}
                                    onChange={handleCourseChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="code"
                                    value={newCourse.code}
                                    onChange={handleCourseChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={newCourse.description}
                            onChange={handleCourseChange}
                        />
                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Label>Semester</Form.Label>
                        <Form.Control
                            type="text"
                            name="semester"
                            value={newCourse.semester}
                            onChange={handleCourseChange}
                            required
                        />
                    </Form.Group> */}
                    <Form.Group>
                        <Form.Label>Teacher</Form.Label>
                        <Form.Control
                            as="select"
                            name="teachers"
                            value={newCourse.teachers}
                            onChange={handleCourseChange}
                            required
                        >
                            <option value="">Select a Teacher</option>
                            {teachers.map((teacher) => (
                                <option key={teacher._id} value={teacher._id}>
                                    {teacher.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">Add Course</Button>
                </Form>
                

                    <br />
                <h3>Students in this Program</h3>
                {students.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Faculty Number</th>
                                <th>Enrollment No.</th>
                                <th>Semester</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.faculty_number}</td>
                                    <td>{student.enrollment_no}</td>
                                    <td>{student.semester}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No students found for this program.</p>
                )}

                <h4>Add a New Student</h4>
                <Form onSubmit={addStudentToProgram}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={newStudent.name}
                                    onChange={handleStudentChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={newStudent.email}
                                    onChange={handleStudentChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Faculty Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="faculty_number"
                                    value={newStudent.faculty_number}
                                    onChange={handleStudentChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Enrollment Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="enrollment_no"
                                    value={newStudent.enrollment_no}
                                    onChange={handleStudentChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    {/* <Form.Group>
                        <Form.Label>Semester</Form.Label>
                        <Form.Control
                            type="number"
                            name="semester"
                            value={newStudent.semester}
                            onChange={handleStudentChange}
                            required
                        />
                    </Form.Group> */}
            <br />
                    <Button variant="primary" type="submit">Add Student</Button>
                </Form>
            </Container>
        </>
    );
};

export default ProgramDetail;
