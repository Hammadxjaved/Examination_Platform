import React, { useState, useEffect } from 'react';
import NavBar from '../../components/layouts/NavBar';
import { useAuth } from '../../components/Authentication/AuthProvider';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get authenticated user info
  const [teacherData] = useState(user);
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch teacher details and courses once the component is mounted
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/courses/teacher/${user._id}`);
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load teacher data');
        setLoading(false);
      }
    };
    
    const fetchExams = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/exams/teacher/${user._id}`);
        setExams(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load teacher data');
        setLoading(false);
      }
    };


    fetchCourses()
    fetchExams()
  }, [user._id]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <NavBar />
      <Container className="mt-4">
        <Row>
          <Col md={4}>
          <Row>
            <Card style={{marginBottom:"5%"}}>
              <Card.Header as="h5">{teacherData.name}'s Dashboard</Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Designation:</strong> {teacherData.designation}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {teacherData.email}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{marginBottom:"5%"}}>
              <Card.Header as="h5">Exams</Card.Header>
              <Card.Body>
                {exams.length > 0 ? (
                  <ListGroup>
                    {exams.map((exam) => (
                      <ListGroup.Item key={exam._id}>
                        <span onClick={() => navigate(`/teacher/exam/${exam._id}`)} style={{ cursor: "pointer", color: "#007bff" }}>
                        <strong>{exam.title}</strong> - {exam.startTime} 
                        <span className="text-muted"> (Status: {exam.status})</span>
                                    </span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Alert variant="info">No Exams found for this teacher.</Alert>
                )}
              </Card.Body>
            </Card>

          </Row>
          </Col>

          <Col md={8}>
            <Card>
              <Card.Header as="h5">Courses</Card.Header>
              <Card.Body>
                {courses.length > 0 ? (
                  <ListGroup>
                    {courses.map((course) => (
                      <ListGroup.Item key={course._id}>
                        <span onClick={() => navigate(`/teacher/course/${course._id}`)} style={{ cursor: "pointer", color: "#007bff" }}>
                        <strong>{course._id}</strong> - {course.code} 
                        <span className="text-muted"> (Semester: {course.semester})</span>
                                    </span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Alert variant="info">No courses found for this teacher.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
  
    </div>
  );
};

export default TeacherDashboard;
