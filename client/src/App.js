import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from './components/CRUD/Login';
import React from 'react';
import { Navbar } from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import { SingupPersonalData } from './components/CRUD/SingupPersonalData';
import { SingupDataLog } from './components/CRUD/SingupDataLog';
import { UpdatePersonalData } from './components/CRUD/UpdatePersonalData';
import { UpdateDataLog } from './components/CRUD/UpdateDataLog';
import { ViewProfile } from './components/CRUD/ViewProfile';
import { SingupAddress } from './components/CRUD/SingupAddress';
import { TopTable } from './components/TopTable';
import Tablecars from './components/TableCars';
import MapComponent from './components/map';
import { TopTableDrivers } from './components/TopTableDirvers';
import TableUsers from './components/TableDrivers';
import { WelcomeComponent } from './components/WelcomeHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup-personal-data" element={<SingupPersonalData/>} />
        <Route path="/signup-address" element={<SingupAddress/>} />
        <Route path='/singup-data-log' element={<SingupDataLog/>}/>
        <Route path='/map' element={<MapComponent/>}/>
        <Route path="/update-personal-data" 
        element={
          <RequireAuth>
            <UpdatePersonalData/>
          </RequireAuth>
        } />
        <Route path="/update-data-log" 
        element={
          <RequireAuth>
            <UpdateDataLog/>
          </RequireAuth>
        } />
        <Route path="/view-profile" 
        element={
          <RequireAuth>
            <ViewProfile/>
          </RequireAuth>
        } />
        <Route path="/trucks-admin" 
        element={
          <RequireAuth>
            <div>
              <Navbar/>
              <TopTable/>
              <Tablecars/>
            </div>
          </RequireAuth>
        } />
        <Route path="/drivers-admin" 
        element={
          <RequireAuth>
            <div>
              <Navbar/>
              <TopTableDrivers/>
              <TableUsers/>
            </div>
          </RequireAuth>
        } />
        <Route path="/home" 
        element={
          <RequireAuth>
            <div>
              <Navbar/>
              <WelcomeComponent/>
            </div>
          </RequireAuth>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;