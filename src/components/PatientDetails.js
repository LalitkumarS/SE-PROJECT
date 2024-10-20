// src/components/PatientDetails.js
import React, { useState } from 'react';
import './PatientDetails.css'; // Add the required CSS for centering
import ErrorDialog from './ErrorDialog'; // Import the ErrorDialog component

function PatientDetails({ patient }) {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false); // State to control the error dialog

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if username and password are correct
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);  // Successful authentication
      setShowErrorDialog(false); // Close the dialog if previously open
    } else {
      setShowErrorDialog(true);  // Show the error dialog if login fails
    }
  };

  const handleCloseDialog = () => {
    setShowErrorDialog(false);  // Close the dialog when the close button is clicked
  };

  if (isAuthenticated) {
    // If authenticated, display the patient's biodata
    return (
      <div className="patient-biodata-container">
        <h2>{patient.name}'s Biodata</h2>
        <p><strong>Patient ID:</strong> {patient.patientId}</p>
        <p><strong>Patient Name:</strong> {patient.name}</p>
        <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Date of Admission:</strong> {patient.dateOfAdmission}</p>
        <p><strong>Room Number:</strong> {patient.roomNumber}</p>
        <p><strong>Cause of Death:</strong> {patient.causeOfDeath}</p>
        <p><strong>Date of Death:</strong> {patient.dateOfDeath}</p>

        {/* Add other relevant patient information here */}
      </div>
    );
  }

  return (
    <div className="patient-details-container">
      <div className="patient-card">
        <h2>{patient.name}'s Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Show the error dialog if login fails */}
      {showErrorDialog && (
        <ErrorDialog
          message="Unauthorized user trying to login"
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}

export default PatientDetails;
