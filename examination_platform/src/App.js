// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './screens/Homepage';
import CodeEditorPage from './screens/CodeEditorPage';
import Test from './screens/testScreen'
import CustomContextMenu from './components/CustomContextMenu';
import Logging from './components/FocusLogger';
import Footer from './components/Footer';
import Exam from './components/AutoSubmitForm';
function App() {
  return (
    <>
    <CustomContextMenu />
    <Logging />
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/CodeEditor" element={<CodeEditorPage />} />
      </Routes>
    </Router>
    <Footer />
    </>
  );
}

export default App;
