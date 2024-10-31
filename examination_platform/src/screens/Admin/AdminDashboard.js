import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../components/layouts/NavBar';

const addUser = async (formData) => {
  try {
      console.log("Sending formData:", formData); // Log the form data to check contents
      const response = await fetch('http://localhost:3001/teachers', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });

      if (!response.ok) {
          const errorText = await response.text(); // Get the error response text
          throw new Error(`Network response was not ok: ${errorText}`);
      }

      return await response.json(); // Return the response data for further use
  } catch (error) {
      console.error('Failed to add user', error);
  }
};

const showUsers = async (setUsers) => {
    try {
        const response = await fetch('http://localhost:3001/teachers');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data); // Update users state with the fetched data
    } catch (error) {
        console.error('Failed to fetch users', error);
    }
};

export default function AdminDashboard() {
    const [formData, setFormData] = useState({
      teacher_id:"",
        name: "",
        email: "",
        password: "",
        designation: "" // Added designation field
    });

    const [users, setUsers] = useState([]); // State to store fetched users

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Fetch users when the component mounts
    useEffect(() => {
        showUsers(setUsers);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = await addUser(formData);
        if (newUser) {
            setFormData({ teacher_id:"",name: "", email: "", password: "", designation: "" }); // Reset the form
            showUsers(setUsers); // Refresh the user list after adding a new user
        }
    };

    return (
      <>
            <NavBar />
        <Container>
            <Row className="justify-content-md-center" style={{ marginTop: "20px" }}>
                <Col md={6}>
                    <h2>Add Teacher</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formID">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="teacher_id"
                                value={formData.teacher_id}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDesignation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Row className="justify-content-md-center" style={{ marginTop: "20px" }}>
                <Col md={6}>
                    <h3>Users:</h3>
                    <ListGroup>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <ListGroup.Item key={index}>
                                    <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}, <strong>Designation:</strong> {user.designation}
                                </ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item>No users found.</ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
        </>
    );
}

