import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import NavBar from '../../components/layouts/NavBar';

const demoData = {
  progress: [
    {
      examTitle: 'Sessional 1',
      course: 'Computer Networks',
      totalMarks: 20,
      marksObtained: 18,
      remark: 'Excellent performance! Keep it up!',
    },
    {
      examTitle: 'Sessional 2',
      course: 'Data Structures',
      totalMarks: 25,
      marksObtained: 20,
      remark: 'Good understanding, but revise binary trees.',
    },
    {
      examTitle: 'Midterm Exam',
      course: 'Operating Systems',
      totalMarks: 30,
      marksObtained: 25,
      remark: 'Great work! Try to focus on disk scheduling algorithms.',
    },
  ],
};

const StudentProgress = () => {
  return (
    <div>
      <NavBar />
      <Container className="mt-4">
        <h1 className="text-center mb-4">Student Progress</h1>
        <Row>
          <Col>
            <Card>
              <Card.Header className="bg-primary text-white">
                <h5>Previous Exams and Remarks</h5>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Exam Title</th>
                      <th>Course</th>
                      <th>Total Marks</th>
                      <th>Marks Obtained</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoData.progress.map((entry, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{entry.examTitle}</td>
                        <td>{entry.course}</td>
                        <td>{entry.totalMarks}</td>
                        <td>{entry.marksObtained}</td>
                        <td>{entry.remark}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default StudentProgress;
