import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import NavBar from '../../components/layouts/NavBar';
import { Trash } from 'react-bootstrap-icons';

const addUser = async (formData) => {
    try {
        console.log("Sending formData:", formData);
        const response = await fetch('http://localhost:3001/teachers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        return await response.json();
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
        setUsers(data);
    } catch (error) {
        console.error('Failed to fetch users', error);
    }
};

const addProgram = async (programData) => {
    try {
        const response = await fetch('http://localhost:3001/programs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(programData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to add program', error);
    }
};

const showPrograms = async (setPrograms) => {
    try {
        const response = await fetch('http://localhost:3001/programs');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPrograms(data);
    } catch (error) {
        console.error('Failed to fetch programs', error);
    }
};

export default function AdminDashboard() {
    const [formData, setFormData] = useState({
        teacher_id: "",
        name: "",
        email: "",
        password: "",
        designation: ""
    });

    const [programData, setProgramData] = useState({
        name: "",
        description: "",
        semester : ""
    });

    const [users, setUsers] = useState([]);
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate();

    const handleTeacherChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleProgramChange = (e) => {
        const { name, value } = e.target;
        setProgramData({
            ...programData,
            [name]: value
        });
    };

    const deleteTeacher = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/teachers/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete teacher: ${errorText}`);
            }

            // Update the users list in state after deletion
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        } catch (error) {
            console.error('Failed to delete teacher', error);
        }
    };

    useEffect(() => {
        showUsers(setUsers);
        showPrograms(setPrograms);
    }, []);

    const handleTeacherSubmit = async (e) => {
        e.preventDefault();
        const newUser = await addUser(formData);
        if (newUser) {
            setFormData({ teacher_id: "", name: "", email: "", password: "", designation: "" });
            showUsers(setUsers);
        }
    };

    const handleProgramSubmit = async (e) => {
        e.preventDefault();
        const newProgram = await addProgram(programData);
        if (newProgram) {
            setProgramData({ name: "", description: "", semester: "" });
            showPrograms(setPrograms);
        }
    };

    return (
        <>
            <NavBar />
            <Container>
                <Row className="justify-content-md-center" style={{ marginTop: "20px" }}>
                    <Col md={5}>
                        <h3>Teachers:</h3>
                        <ListGroup>
                            {users.map((user, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                    <span onClick={() => navigate(`/admin/teacher/${user._id}`)} style={{ cursor: "pointer", color: "#007bff" }}>
                                        {user.name}
                                    </span>
                                    <Trash style={{ cursor: "pointer", color: "red" }} onClick={() => deleteTeacher(user._id)} />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <h2 className="mt-4">Add Teacher</h2>
                        <Form onSubmit={handleTeacherSubmit}>
                            <Form.Group controlId="formID">
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="teacher_id"
                                    value={formData.teacher_id}
                                    onChange={handleTeacherChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleTeacherChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleTeacherChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleTeacherChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formDesignation">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleTeacherChange}
                                    required
                                />
                            </Form.Group>
                            <br />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>

                    </Col>

                    <Col md={5}>
                        <h3>Programs:</h3>
                        <ListGroup>
                            {programs.map((program, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                    <span onClick={() => navigate(`/admin/program/${program._id}`)} style={{ cursor: "pointer", color: "#007bff" }}>
                                        {program.name}
                                    </span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <h2 className="mt-4">Add Program</h2>
                        <Form onSubmit={handleProgramSubmit}>
                            <Form.Group controlId="formProgramName">
                                <Form.Label>Program Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={programData.name}
                                    onChange={handleProgramChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formProgramDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={programData.description}
                                    onChange={handleProgramChange}
                                />
                            </Form.Group>
                            
                            <Form.Group controlId="formProgramSemester">
                                <Form.Label>Semester</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="semester"
                                    value={programData.semester}
                                    onChange={handleProgramChange}
                                />
                            </Form.Group>
                            <br/>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
