import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Spinner } from 'react-bootstrap';
import NavBar from '../../components/layouts/NavBar';
import { useParams } from 'react-router-dom';

const StudentDashboard = () => {
  const savedUser = JSON.parse(localStorage.getItem('user'));
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [previousResults, setPreviousResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded data
  const mockUpcomingExams = [
    { _id: '1', title: 'Midterm Exam', course: { name: 'Data Structures' }, startTime: new Date(), duration: 90 },
    { _id: '2', title: 'Final Exam', course: { name: 'Algorithms' }, startTime: new Date(), duration: 120 },
  ];

  const mockPreviousResults = [
    { _id: '1', exam: { title: 'Quiz 1', course: { name: 'Python Programming' } }, totalMarks: 20, marksObtained: 18 },
    { _id: '2', exam: { title: 'Midterm Exam', course: { name: 'Web Development' } }, totalMarks: 50, marksObtained: 42 },
    { _id: '3', exam: { title: 'Lab Test', course: { name: 'Operating Systems' } }, totalMarks: 25, marksObtained: 20 },
    { _id: '4', exam: { title: 'Final Exam', course: { name: 'Database Management' } }, totalMarks: 100, marksObtained: 85 },
    { _id: '5', exam: { title: 'Quiz 2', course: { name: 'Machine Learning' } }, totalMarks: 20, marksObtained: 15 },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUpcomingExams(mockUpcomingExams);
      setPreviousResults(mockPreviousResults);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <NavBar />
      <Container className="mt-4">
        <h1 className="mb-4 text-center">Welcome {savedUser.name}</h1>
        <p className="text-center">View upcoming exams, attempt exams, and track your progress here.</p>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Row>
              <Col>
                <Card className="mb-4">
                  <Card.Header as="h5" className="bg-primary text-white">Upcoming Exams</Card.Header>
                  <Card.Body>
                    {upcomingExams.length > 0 ? (
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Course</th>
                            <th>Start Time</th>
                            <th>Duration (mins)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {upcomingExams.map((exam, index) => (
                            <tr key={exam._id}>
                              <td>{index + 1}</td>
                              <td>{exam.title}</td>
                              <td>{exam.course.name}</td>
                              <td>{new Date(exam.startTime).toLocaleString()}</td>
                              <td>{exam.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p className="text-center">No upcoming exams.</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card>
                  <Card.Header as="h5" className="bg-success text-white">Previous Results</Card.Header>
                  <Card.Body>
                    {previousResults.length > 0 ? (
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Exam Title</th>
                            <th>Course</th>
                            <th>Total Marks</th>
                            <th>Marks Obtained</th>
                          </tr>
                        </thead>
                        <tbody>
                          {previousResults.map((result, index) => (
                            <tr key={result._id}>
                              <td>{index + 1}</td>
                              <td>{result.exam.title}</td>
                              <td>{result.exam.course.name}</td>
                              <td>{result.totalMarks}</td>
                              <td>{result.marksObtained}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p className="text-center">No previous results found.</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default StudentDashboard;
