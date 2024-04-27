import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";import { CreateUser } from './components/CRUD/CreateUser';
import { Login } from './components/CRUD/Login';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
  );
}

export default App;
