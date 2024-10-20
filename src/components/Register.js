// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // Import the CSS file

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    patientId: '',
    password: '',
    dateOfBirth: '',
    age: '',
    dateOfAdmission: '',
    roomNumber: '',
    causeOfDeath: '',
    dateOfDeath: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 201) {
      alert('Registered successfully');
      navigate('/dashboard');
    } else {
      alert('Error during registration');
    }
  };

  return (
    <div className="custom-container my-5">
      <h2 className="text-center mb-5">Register Deceased Patient</h2>
      <form onSubmit={handleSubmit} className="g-3">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Patient Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Patient ID"
            value={formData.patientId}
            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        {/* New Fields for Patient Details */}
        <div className="form-group mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="Date of Admission"
            value={formData.dateOfAdmission}
            onChange={(e) => setFormData({ ...formData, dateOfAdmission: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Room Number"
            value={formData.roomNumber}
            onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Cause of Death"
            value={formData.causeOfDeath}
            onChange={(e) => setFormData({ ...formData, causeOfDeath: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="Date of Death"
            value={formData.dateOfDeath}
            onChange={(e) => setFormData({ ...formData, dateOfDeath: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-sm w-100">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
