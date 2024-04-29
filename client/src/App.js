import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from './components/CRUD/Login';
import React from 'react';
import { Navbar } from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import { Singup } from './components/CRUD/Singup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Singup/>} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route
          path="/home"
          element={
            <RequireAuth >
              <Navbar/>
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;