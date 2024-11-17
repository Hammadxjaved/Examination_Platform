import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import NavBar from '../../components/layouts/NavBar';
import axios from 'axios';
import {ListGroup, Alert } from 'react-bootstrap';


const TeacherDetail = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);


    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await fetch(`http://localhost:3001/teacher/${id}`);
                const data = await response.json();
                setTeacher(data);
            } catch (error) {
                console.error("Failed to fetch teacher details:", error);
            }
        };
        const fetchCourses = async () => {
            try {
              const response = await axios.get(`http://localhost:3001/courses/teacher/${id}`);
              setCourses(response.data);
              setLoading(false);
            } catch (err) {
              setError('Failed to load teacher data');
              setLoading(false);
            }
          };
    fetchCourses()

        fetchTeacher();
    }, [id]);

    if (!teacher) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading...</p>
            </Container>
        );
    }

    return (
        <>
        <NavBar/>
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Header as="h5" className="text-center">
                            Teacher Details
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>ID:</strong> {teacher.teacher_id}
                            </Card.Text>
                            <Card.Text>
                                <strong>Name:</strong> {teacher.name}
                            </Card.Text>
                            <Card.Text>
                                <strong>Email:</strong> {teacher.email}
                            </Card.Text>
                            <Card.Text>
                                <strong>Designation:</strong> {teacher.designation}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

        <Container className="mt-4">
        <Row>
          <Col >
            <Card>
              <Card.Header as="h5">Courses</Card.Header>
              <Card.Body>
                {courses.length > 0 ? (
                  <ListGroup>
                    {courses.map((course) => (
                      <ListGroup.Item key={course._id}>
                        <span>
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

        </>
    );
};

export default TeacherDetail;
