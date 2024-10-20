import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PatientDetails from './components/PatientDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [patients, setPatients] = useState([]);

  const addPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register addPatient={addPatient} />} />
        <Route path="/patient/:patientId" element={<PatientDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
