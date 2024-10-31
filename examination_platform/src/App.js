import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Screens 
import Homepage from './screens/Homepage';
import StudentDashboard from './screens/Student/StudentDashboard';
import TeacherDashboard from './screens/Teacher/TeacherDashboard';
import AdminDashboard from './screens/Admin/AdminDashboard';
import CodeEditorPage from './screens/Student/CodeEditorPage';
import Test from './screens/testScreen';
import LoginPage from './screens/LoginPage';

// Components
import CustomContextMenu from './components/layouts/CustomContextMenu';
import Logging from './components/layouts/FocusLogger';
import Footer from './components/layouts/Footer';

// Authentication
import { AuthProvider } from './components/Authentication/AuthProvider';
import ProtectedRoute from './components/Authentication/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
    <CustomContextMenu />
    <Logging />
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/exam" element={<Test />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/CodeEditor" element={<CodeEditorPage />} />
        <Route path="/student" element={<ProtectedRoute role="student" />}>
            <Route path="dashboard" element={<StudentDashboard />} />
          </Route>

          <Route path="/teacher" element={<ProtectedRoute role="teacher" />}>
            <Route path="dashboard" element={<TeacherDashboard />} />
          </Route>

          <Route path="/admin" element={<ProtectedRoute role="admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
      </Routes>
    </Router>
    <Footer />
    </AuthProvider>
  );
}

export default App;

