import NavBar from '../../components/layouts/NavBar';
import React from 'react';
import { useAuth } from '../../components/Authentication/AuthProvider.js';

const TeacherDashboard = () => {
  const { user } = useAuth();
  return (
    <div>
        <NavBar />
      <h1>{user.name} Dashboard</h1>
      <p>Create exams, evaluate submissions, and review student progress here.</p>
    </div>
  );
};

export default TeacherDashboard;
