import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from './components/CRUD/Login';
import React from 'react';
import { Navbar } from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import { SingupPersonalData } from './components/CRUD/SingupPersonalData';
import { SingupDataLog } from './components/CRUD/SingupDataLog';
import { TableCars } from './components/TableCars';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup-personal-data" element={<SingupPersonalData/>} />
        <Route path='/singup-data-log' element={<SingupDataLog/>}/>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route
          path="/home"
          element={
            <RequireAuth >
              <div>  
                <Navbar/>
                <TableCars/>
              </div>
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;