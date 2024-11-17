import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import NavBar from '../../components/layouts/NavBar';

const Exams = () => {
  // Demo Data
  const evaluatedExams = [
    {
      examTitle: 'Sessional 1',
      course: 'Data Structures',
      program: 'MCA',
      dateEvaluated: '2024-11-15',
      totalStudents: 50,
    },
    {
      examTitle: 'Sessional 2',
      course: 'Operating Systems',
      program: 'MCA',
      dateEvaluated: '2024-11-12',
      totalStudents: 45,
    },
  ];

  const toBeEvaluatedExams = [
    {
      examTitle: 'Mid-Term',
      course: 'Database Management Systems',
      program: 'M.Sc. Cyber Security',
      scheduledDate: '2024-11-19',
      totalStudents: 40,
    },
    {
      examTitle: 'Sessional 3',
      course: 'Computer Networks',
      program: 'MCA',
      scheduledDate: '2024-11-22',
      totalStudents: 55,
    },
  ];

  return (
    <div>
      <NavBar />
      <Container className="mt-4">
        <p className="text-center">Manage and track your evaluated and pending exams.</p>

        {/* Evaluated Exams */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header as="h5" className="bg-success text-white">Evaluated Exams</Card.Header>
              <Card.Body>
                {evaluatedExams.length > 0 ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Exam Title</th>
                        <th>Course</th>
                        <th>Program</th>
                        <th>Date Evaluated</th>
                        <th>Total Students</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evaluatedExams.map((exam, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{exam.examTitle}</td>
                          <td>{exam.course}</td>
                          <td>{exam.program}</td>
                          <td>{exam.dateEvaluated}</td>
                          <td>{exam.totalStudents}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-center">No evaluated exams available.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Exams to Be Evaluated */}
        <Row>
          <Col>
            <Card>
              <Card.Header as="h5" className="bg-warning text-white">To Be Evaluated Exams</Card.Header>
              <Card.Body>
                {toBeEvaluatedExams.length > 0 ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Exam Title</th>
                        <th>Course</th>
                        <th>Program</th>
                        <th>Scheduled Date</th>
                        <th>Total Students</th>
                      </tr>
                    </thead>
                    <tbody>
                      {toBeEvaluatedExams.map((exam, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{exam.examTitle}</td>
                          <td>{exam.course}</td>
                          <td>{exam.program}</td>
                          <td>{exam.scheduledDate}</td>
                          <td>{exam.totalStudents}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-center">No exams to evaluate.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Exams;
