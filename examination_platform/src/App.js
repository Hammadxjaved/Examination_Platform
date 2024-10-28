import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './screens/Homepage';
import CodeEditorPage from './screens/CodeEditorPage';
import Test from './screens/testScreen'
import CustomContextMenu from './components/CustomContextMenu';
import Logging from './components/FocusLogger';
import Footer from './components/Footer';
import Exam from './components/AutoSubmitForm';
import LoginPage from './screens/LoginPage';
import { AuthProvider } from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import StudentDashboard from './screens/StudentDashboard';
import TeacherDashboard from './screens/TeacherDashboard';
import AdminDashboard from './screens/AdminDashboard';
import Login from './screens/LoginPage';

function App() {
  return (
    <AuthProvider>
    <CustomContextMenu />
    <Logging />
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/exam" element={<Exam />} />

        <Route path="/login" element={<Login />} />
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

