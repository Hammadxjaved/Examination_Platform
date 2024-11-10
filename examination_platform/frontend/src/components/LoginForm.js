import React, { useState } from 'react';
import { useAuth } from './Authentication/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from "react-bootstrap";
import "./styles/login.css";

const LoginForm = () => {
  const [role, setRole] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    await delay(500);
    console.log(`Username: ${inputUsername}, Password: ${inputPassword}`);
    
    let userData = null;

    try {
        if (role === "student") {
            const response = await fetch('http://localhost:3001/students');
            if (!response.ok) throw new Error("Failed to fetch students");

            const students = await response.json();
            const student = students.find(
                (s) => s.enrollment_no === inputUsername && s.password === inputPassword
            );

            if (student) {
                userData = student;
            }

        } else if (role === "teacher") {
            const response = await fetch('http://localhost:3001/teachers');
            if (!response.ok) throw new Error("Failed to fetch teachers");

            const teachers = await response.json();
            const teacher = teachers.find(
                (t) => t.name === inputUsername && t.password === inputPassword
            );

            if (teacher) {
                userData = teacher;
            }
        }

        else if (inputUsername === "admin" && inputPassword === "admin" && role === "admin") {
            userData = { role: "admin" };
        }

        if (userData) {
            login({...userData, "role":role});
            navigate(`/${role}/dashboard`);
        } else {
            setShow(true);
        }
    } catch (error) {
        console.error("Error during login", error);
        setShow(true);
    } finally {
        setLoading(false);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);  // Toggle showPassword state
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="sign-in__wrapper">
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Sign In</div>
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Username"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2 position-relative" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}  // Toggle password visibility
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">

          <Form.Check type="checkbox" label="Show password" onClick={handlePasswordToggle} />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
          >
            Forgot password?
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;