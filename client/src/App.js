import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from './components/CRUD/Login';
import React from 'react';
import { Navbar } from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import { SingupPersonalData } from './components/CRUD/SingupPersonalData';
import { SingupDataLog } from './components/CRUD/SingupDataLog';
import { TableCars } from './components/TableCars';
import { UpdatePersonalData } from './components/CRUD/UpdatePersonalData';
import { UpdateDataLog } from './components/CRUD/UpdateDataLog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup-personal-data" element={<SingupPersonalData/>} />
        <Route path='/singup-data-log' element={<SingupDataLog/>}/>
        <Route path="/update-personal-data" element={<RequireAuth><UpdatePersonalData/></RequireAuth>} />
        <Route path="/update-data-log" element={<RequireAuth><UpdateDataLog/></RequireAuth>} />
        <Route path="/home" element={<RequireAuth><div><Navbar/><TableCars/></div></RequireAuth>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;