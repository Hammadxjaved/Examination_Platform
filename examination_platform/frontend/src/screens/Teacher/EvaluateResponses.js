import React, { useState } from "react";
import { Container, Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import NavBar from "../../components/layouts/NavBar";

const EvaluateResponses = () => {
  // Demo data for students' responses
  const studentResponses = [
    {
      studentName: "Student1",
      facultyNumber: "23CAMSA112",
      responses: [
        {
          questionNumber: 1,
          type: "mcq",
          content: "How many bits are there in a byte?",
          studentAnswer: "8",
          correctAnswer: "8",
          marks: 1,
        },
        {
          questionNumber: 2,
          type: "subjective",
          content: "Write about the generation of computers.",
          studentAnswer: "First generation computers were based on vacuum tubes...",
          marks: null, // To be assigned by the teacher
          maxMarks: 8,
        },
        {
          questionNumber: 3,
          type: "coding",
          content: "Write a program to find the first n prime numbers.",
          studentAnswer: "Python program code here...",
          testCasesPassed: 2,
          totalTestCases: 3,
          marks: null, // To be assigned by the teacher
          maxMarks: 10,
        },
      ],
    },
    {
      studentName: "Hammad Javed",
      facultyNumber: "23CAMSA110",
      responses: [
        {
          questionNumber: 1,
          type: "mcq",
          content: "How many bits are there in a byte?",
          studentAnswer: "16",
          correctAnswer: "8",
          marks: 0,
        },
        {
          questionNumber: 2,
          type: "subjective",
          content: "Write about the generation of computers.",
          studentAnswer: "Generations of computers include 1st, 2nd...",
          marks: null, // To be assigned by the teacher
          maxMarks: 8,
        },
        {
          questionNumber: 3,
          type: "coding",
          content: "Write a program to find the first n prime numbers.",
          studentAnswer: "JavaScript program code here...",
          testCasesPassed: 1,
          totalTestCases: 3,
          marks: null, // To be assigned by the teacher
          maxMarks: 10,
        },
      ],
    },
  ];

  // State to track teacher's assigned marks
  const [evaluatedMarks, setEvaluatedMarks] = useState(
    studentResponses.map((student) =>
      student.responses.map((response) => ({
        questionNumber: response.questionNumber,
        marks: response.marks,
      }))
    )
  );

  const handleMarksChange = (studentIndex, questionIndex, value) => {
    const updatedMarks = [...evaluatedMarks];
    updatedMarks[studentIndex][questionIndex].marks = Number(value);
    setEvaluatedMarks(updatedMarks);
  };

  const handleSubmitEvaluation = (studentIndex) => {
    console.log("Submitted marks for student:", studentResponses[studentIndex].studentName);
    console.log("Evaluated Marks:", evaluatedMarks[studentIndex]);
    alert(`Marks for ${studentResponses[studentIndex].studentName} submitted!`);
  };

  return (
    <div>
      <NavBar />
      <Container className="mt-4">
        <h1 className="text-center mb-4">Evaluate Student Responses for  <br />Mid-Term	</h1>
        {studentResponses.map((student, studentIndex) => (
          <Card className="mb-4" key={studentIndex}>
            <Card.Header>
              <h5>
                {student.studentName} - {student.facultyNumber}
              </h5>
            </Card.Header>
            <Card.Body>
              <Table bordered striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Type</th>
                    <th>Student Answer</th>
                    <th>System Evaluation</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {student.responses.map((response, questionIndex) => (
                    <tr key={questionIndex}>
                      <td>{response.questionNumber}</td>
                      <td>{response.content}</td>
                      <td>{response.type.toUpperCase()}</td>
                      <td>{response.studentAnswer}</td>
                      <td>
                        {response.type === "mcq" ? (
                          response.studentAnswer === response.correctAnswer ? (
                            <span className="text-success">Correct</span>
                          ) : (
                            <span className="text-danger">Incorrect</span>
                          )
                        ) : response.type === "coding" ? (
                          <span>
                            Test Cases Passed: {response.testCasesPassed}/
                            {response.totalTestCases}
                          </span>
                        ) : (
                          "To be evaluated by teacher"
                        )}
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          placeholder={`Max ${response.maxMarks || 1}`}
                          value={
                            evaluatedMarks[studentIndex][questionIndex].marks || ""
                          }
                          onChange={(e) =>
                            handleMarksChange(studentIndex, questionIndex, e.target.value)
                          }
                          max={response.maxMarks || 1}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                variant="success"
                onClick={() => handleSubmitEvaluation(studentIndex)}
              >
                Submit Evaluation
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default EvaluateResponses;
