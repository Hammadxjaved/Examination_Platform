import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TeacherDetail = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            const response = await fetch(`http://localhost:3001/teacher/${id}`);
            const data = await response.json();
            setTeacher(data);
        };
        fetchTeacher();
    }, [id]);

    if (!teacher) return <p>Loading...</p>;

    return (
        <div>
            <h2>Teacher Details</h2>
            <p><strong>ID:</strong> {teacher.teacher_id}</p>
            <p><strong>Name:</strong> {teacher.name}</p>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Designation:</strong> {teacher.designation}</p>
        </div>
    );
};

export default TeacherDetail;
