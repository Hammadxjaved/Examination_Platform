import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../../components/layouts/NavBar';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';

const CourseDetails = () => {
  const { id } = useParams(); // Get id from the URL params
  const [course, setCourse] = useState(null); // State to store course details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    // Fetch the course details based on the id
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/course/${id}`);
        sessionStorage.setItem('course', JSON.stringify(response.data));
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch course details');
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  if (!course) {
    return (
      <Alert variant="warning" className="text-center">
        Course not found.
      </Alert>
    );
  }

  return (
    <div>
        <NavBar />
    <Container>
      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Header as="h3">{course.name}</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Course Code:</strong> {course.code}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong> {course.description || 'No description available.'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Semester:</strong> {course.semester}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Programs:</strong> {course.programs.join(', ') || 'No programs associated.'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Teachers:</strong> {course.teachers.join(', ') || 'No teachers assigned.'}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br/>
      <Link to={`../createExam`}>
        <button className='btn'>Create Exam</button>
      </Link>
    </Container>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>

  );
};

export default CourseDetails;
