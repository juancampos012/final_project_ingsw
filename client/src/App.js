import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from './components/CRUD/Login';
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import { Singup } from './components/CRUD/Singup';

function App() {
  const [token, setToken] = useState(""); 
  const [user, setUser] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser}/>} />
        <Route path="/signup" element={<Singup/>} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route
          path="/home"
          element={
            <RequireAuth token={token}>
              <Navbar user={user}/>
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;