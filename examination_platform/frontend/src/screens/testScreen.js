import React, { useState, useEffect } from "react";
// import Exam from '../components/AutoSubmitForm';
// import Chatbox from '../components/Chatbox';
import NavBar from '../components/layouts/NavBar';


const addUser = async (formData) => {
    try {
        const response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json(); // Return the response data for further use
    } catch (error) {
        console.error('Failed to add user', error);
    }
};

const showUsers = async (setUsers) => {
    try {
        const response = await fetch('http://localhost:3001/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data); // Update users state with the fetched data
    } catch (error) {
        console.error('Failed to fetch users', error);
    }
};


export default function TestScreen() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // const [SubmittedData, setSubmittedData] = useState(null);
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
        // setSubmittedData(formData); // Store the submitted data

        // Call addUser and await its completion
        const newUser = await addUser(formData);
        if (newUser) {
            setFormData({ name: "", email: "", password: "" }); // Reset the form
            showUsers(setUsers); // Refresh the user list after adding a new user
        }
    };

    return (
        <div>
            <NavBar />
            {/* <Chatbox /> */}
            <div style={{ padding: "20px" }}>
                <h2>Submit Your Info</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name: </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>

                <div style={{ marginTop: "20px" }}>
                    <h3>Users:</h3>
                    {users.length > 0 ? (
                        <ul>
                            {users.map((user, index) => (
                                <li key={index}>
                                    <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>
            {/* <Exam /> */}
        </div>
    );
}
