import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../components/layouts/NavBar';

const ProgramDetail = () => {
    const { id } = useParams();
    const [program, setProgram] = useState(null);
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ name: '', code: '', description: '' });
    const [message, setMessage] = useState([]);
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        name: '',
        email: '',
        password: '123',
        faculty_number: '',
        enrollment_no: '',
        semester: ''
    });

    // Fetch program details, courses, and students on component mount
    useEffect(() => {
        const fetchProgramData = async () => {
            try {
                const programResponse = await fetch(`http://localhost:3001/program/${id}`);
                const programData = await programResponse.json();
                setProgram(programData);

                // // Fetch courses in this program
                // const coursesResponse = await fetch(`http://localhost:3001/program/${id}/courses`);
                // const coursesData = await coursesResponse.json();
                // setCourses(coursesData);

                // Fetch students in this program
                const studentsResponse = await fetch(`http://localhost:3001/students/`);
                const studentsData = await studentsResponse.json();
                setStudents(studentsData);
            } catch (error) {
                console.error("Failed to fetch program data:", error);
            }
        };
        fetchProgramData();
    }, [id]);

    // Handle form inputs for new course and new student
    const handleCourseChange = (e) => setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
    const handleStudentChange = (e) => setNewStudent({ ...newStudent, [e.target.name]: e.target.value });

    // Add a course to this program
    const addCourseToProgram = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/program/${id}/courses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCourse)
            });
            const addedCourse = await response.json();
            setCourses([...courses, addedCourse]);
            setNewCourse({ name: '', code: '', description: '' });
        } catch (error) {
            console.error("Failed to add course:", error);
        }
    };

    // Remove a course from this program
    const removeCourseFromProgram = async (courseId) => {
        try {
            await fetch(`http://localhost:3001/program/${id}/courses/${courseId}`, { method: 'DELETE' });
            setCourses(courses.filter(course => course._id !== courseId));
        } catch (error) {
            console.error("Failed to remove course:", error);
        }
    };

    // Add a student to this program
    const addStudentToProgram = async (e) => {
            e.preventDefault();
            
            try {
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
                    setStudents([...students, data]);
                    setNewStudent({ name: '', email: '', password: '123', faculty_number: '', enrollment_no: '', semester: '' });
                } else {
                    const errorData = await response.json();
                    setMessage(errorData.message || 'Failed to add student');
                }
            } catch (error) {
                setMessage("Error1: " + error.message);
            }
        };

    if (!program) return <p>Loading...</p>;

    return (
        <>
        <NavBar />
        <Container>
            {message}
            <h2>Program Details</h2>
            <p><strong>Name:</strong> {program.name}</p>
            <p><strong>Description:</strong> {program.description}</p>

            <h3>Courses in this Program</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course._id}>
                            <td>{course.name}</td>
                            <td>{course.code}</td>
                            <td>{course.description}</td>
                            <td>
                                <Button variant="danger" onClick={() => removeCourseFromProgram(course._id)}>
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h4>Add a New Course</h4>
            <Form onSubmit={addCourseToProgram}>
                <Form.Group>
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={newCourse.name}
                        onChange={handleCourseChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Course Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="code"
                        value={newCourse.code}
                        onChange={handleCourseChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={newCourse.description}
                        onChange={handleCourseChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Add Course</Button>
            </Form>

            <h3>Students in this Program</h3>
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
                <Form.Group>
                    <Form.Label>Semester</Form.Label>
                    <Form.Control
                        type="number"
                        name="semester"
                        value={newStudent.semester}
                        onChange={handleStudentChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Add Student</Button>
            </Form>
        </Container>
        </>
    );
};

export default ProgramDetail;
