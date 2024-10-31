import React from 'react'
import NavBar from '../components/layouts/NavBar';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

import {  ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Sample data for demonstration
  const upcomingExams = [
    { id: 1, name: 'Computer Networks', date: '2024-09-20' },
    { id: 2, name: 'Data Structures', date: '2024-09-25' },
    { id: 3, name: 'Operating Systems', date: '2024-10-01' },
  ];

  const progress = {
    totalExams: 10,
    attemptedExams: 5,
    percentage: 50, // in percentage
  };

  const attemptedExams = [
    { id: 1, name: 'Algorithm Design', date: '2024-08-15', score: '85%' },
    { id: 2, name: 'Database Systems', date: '2024-08-20', score: '90%' },
  ];

  return (
    <div>
      {/* Header */}
      <NavBar />
      <h1 className="text-3xl font-bold text-gray-900 p-2">Welcome User</h1>
      {/* Main Content */}
      <main style={{ padding: '20px' }}>
        <Container>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Upcoming Exams</Card.Title>
                  <ListGroup>
                    {upcomingExams.map(exam => (
                      <ListGroup.Item key={exam.id}>
                        {exam.name} - {exam.date}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Link to="/upcoming-exams">
                    <Button variant="primary" style={{ marginTop: '10px' }}>View All Exams</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Progress Overview</Card.Title>
                  <Card.Text>
                    Total Exams: {progress.totalExams}
                  </Card.Text>
                  <Card.Text>
                    Attempted Exams: {progress.attemptedExams}
                  </Card.Text>
                  <Card.Text>
                    Progress: {progress.percentage}%
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Already Attempted Exams</Card.Title>
                  <ListGroup>
                    {attemptedExams.map(exam => (
                      <ListGroup.Item key={exam.id}>
                        {exam.name} - {exam.date} - Score: {exam.score}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Link to="/attempted-exams">
                    <Button variant="primary" style={{ marginTop: '10px' }}>View All Attempted Exams</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

    </div>
  );
};

export default HomePage;

