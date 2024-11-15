import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Screens 
import Homepage from './screens/Homepage';
import StudentDashboard from './screens/Student/StudentDashboard';
import TeacherDashboard from './screens/Teacher/TeacherDashboard';
import CourseDetails from './screens/Teacher/CourseDetails';
import CreateExam from './screens/Teacher/CreateExam2';
import CodeEditorPage from './screens/Student/CodeEditorPage';
import AdminDashboard from './screens/Admin/AdminDashboard';
import ProgramDetail from './screens/Admin/ProgramDetail';
import TeacherDetail from './screens/Admin/TeacherDetail';
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

            <Route path="exam" element={<br/>} />
            <Route path="exams/:id/take" element={<br />} />
            {/* <Route path="exams/:id/result" element={<ExamRe />} /> */}
          </Route>

          <Route path="/teacher" element={<ProtectedRoute role="teacher" />}>
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="course/:id" element={<CourseDetails />} />
            <Route path="createExam/" element={<CreateExam />} />
            <Route path="exams" element={<br />} />
            <Route path="exams/create" element={<br />} />
            {/* <Route path="exams/:id/edit" element={<ExamEditor />} /> */}

          </Route>

          <Route path="/admin" element={<ProtectedRoute role="admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="program/:id" element={<ProgramDetail />} />
            <Route path="teacher/:id" element={<TeacherDetail />} />
          </Route>
      </Routes>
    </Router>
    <Footer />
    </AuthProvider>
  );
}

export default App;

