import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from './components/CRUD/Login';
import React from 'react';
import { Navbar } from './components/Navbar';
import RequireAuthAdmin from './components/REQUIREAUTH/RequireAuthAdmin';
import RequireAuthUser from './components/REQUIREAUTH/RequireAuthUser';
import RequireAuth from './components/REQUIREAUTH/RequireAuth'
import { UpdatePersonalData } from './components/CRUD/UpdatePersonalData';
import { UpdateDataLog } from './components/CRUD/UpdateDataLog';
import { ViewProfile } from './components/CRUD/ViewProfile';
import { TopTable } from './components/TopTable';
import { TopTableDrivers } from './components/TopTableDirvers';
import { WelcomeComponent } from './components/WelcomeHome';
import { MapComponent } from './components/RoutesMap';
import { TableDrivers } from './components/TableDrivers';
import { TableCars } from './components/TableCars'
import { Footer } from './components/Footer';
import { CardsComponent } from './components/CardsComponent'; 
import { KanbaBoard } from './components/KanbaBoard';
import { Tires } from './components/Tires';
import { RefuelingComponent } from './components/Refueling';
import { NavbarUser } from './components/NavBarUser';
import { MaintenanceComponent } from './components/Maintenance';
import { TableRoutes } from './components/TableRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login/> } />
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
          <RequireAuthAdmin>
            <div>
              <Navbar/>
              <TopTable/>
              <TableCars/>
              <Footer/>
            </div>
          </RequireAuthAdmin>
        } />
        <Route path="/drivers-admin" 
        element={
          <RequireAuthAdmin>
            <div>
              <Navbar/>
              <TopTableDrivers/>
              <TableDrivers/>
              <Footer/>
            </div>
          </RequireAuthAdmin>
        } />
        <Route path="/home-user" 
        element={
          <RequireAuthUser>
            <div>
              <NavbarUser/>
              <WelcomeComponent/>
              <div id="about">
                <CardsComponent />
              </div>
              <Footer/>
            </div>
          </RequireAuthUser>
        } />
        <Route path="/home" 
        element={
          <RequireAuthAdmin>
            <div>
              <Navbar/>
              <WelcomeComponent/>
              <div id="about">
                <CardsComponent />
              </div>
              <Footer/>
            </div>
          </RequireAuthAdmin>
        } />
        <Route path="/routes-admin" 
        element={
          <RequireAuthAdmin>
            <div>
              <Navbar/>
              <MapComponent/>
              <Footer/>
            </div>
          </RequireAuthAdmin>
        } />
        <Route path="/tip-user" 
        element={
          <RequireAuthUser>
            <div>
              <NavbarUser/>
              <KanbaBoard/>
              <Footer/>
            </div>
          </RequireAuthUser>
        } />
        <Route path="/tires-admin" 
        element={
          <RequireAuthAdmin>
            <div>
              <Navbar/>
              <Tires/>
              <Footer/>
            </div>
          </RequireAuthAdmin>
        } />
        <Route path="/refueling-admin" 
        element={
          <RequireAuthAdmin>
            <div>
              <Navbar/>
              <RefuelingComponent/>
              <Footer/>
            </div>
          </RequireAuthAdmin>
        } />
        <Route path="/maintenance-admin" 
        element={
          <RequireAuthAdmin>
            <div>
              <Navbar/>
              <MaintenanceComponent/>
              <Footer/>
            </div>
          </RequireAuthAdmin>
        } />
        <Route path="/see-routes-admin" 
        element={
          <RequireAuthAdmin>
            <div>
              <Navbar/>
              <TableRoutes/>
              <Footer/>
            </div>
          </RequireAuthAdmin>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
