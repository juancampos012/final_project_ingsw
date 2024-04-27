import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from './components/CRUD/Login';
import React, { useState } from 'react';
import { SingupUser } from './components/CRUD/SingupUser';

function App() {
  const [token, setToken] = useState(""); 

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<SingupUser/>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;