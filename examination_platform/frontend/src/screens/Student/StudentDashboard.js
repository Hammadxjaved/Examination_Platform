import React from 'react';
import NavBar from '../../components/layouts/NavBar';
import { useAuth } from '../../components/Authentication/AuthProvider.js';


const StudentDashboard = () => {
  const { user } = useAuth();
  return (
    <div>
        <NavBar />
        {console.log(user)}
      <h1>{user.name} Dashboard</h1>
      <p>View upcoming exams, attempt exams, and track progress here.</p>
    </div>
  );
};

export default StudentDashboard;
