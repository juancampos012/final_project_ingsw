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
import { TopTableDrivers } from './components/TopTableDirvers';
import { WelcomeComponent } from './components/WelcomeHome';
import { MapComponent } from './components/RoutesMap';
import { TableDrivers } from './components/TableDrivers';
import { TableCars } from './components/TableCars'
import { Footer } from './components/HomeFooter';
import { CardsComponent } from './components/CardsComponent'; 
import KanbaBoard from './components/Kanba/KanbaBoard';
import { Tires } from './components/Tires';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup-personal-data" element={<SingupPersonalData/>} />
        <Route path="/signup-address" element={<SingupAddress/>} />
        <Route path='/singup-data-log' element={<SingupDataLog/>}/>
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
              <TableCars/>
              <Footer/>
            </div>
          </RequireAuth>
        } />
        <Route path="/drivers-admin" 
        element={
          <RequireAuth>
            <div>
              <Navbar/>
              <TopTableDrivers/>
              <TableDrivers/>
              <KanbaBoard/>
              <Footer/>
            </div>
          </RequireAuth>
        } />
        <Route path="/home" 
        element={
          <RequireAuth>
            <div>
              <Navbar/>
              <WelcomeComponent/>
              <div id="about">
                <CardsComponent />
              </div>
              <Footer/>
            </div>
          </RequireAuth>
        } />
        <Route path="/routes-admin" 
        element={
          <RequireAuth>
            <div>
              <Navbar/>
              <MapComponent/>
              <Footer/>
            </div>
          </RequireAuth>
        } />
        <Route path="/tires-admin" 
        element={
          <RequireAuth>
            <div>
              <Navbar/>
              <Tires/>
              <Footer/>
            </div>
          </RequireAuth>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
