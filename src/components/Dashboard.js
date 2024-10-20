import React, { useState, useEffect } from 'react';
import PatientDetails from './PatientDetails';
import './Dashboard.css';

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null);    // State to handle errors

  useEffect(() => {
    // Fetch patients from backend
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:3000/patients');
        if (!response.ok) {
          throw new Error('Error fetching patient data');
        }
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const getCardVariant = (index) => {
    const variants = ['card-variant-1', 'card-variant-2', 'card-variant-3', 'card-variant-4'];
    return variants[index % variants.length]; // Cycle through variants
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container rounded-lg shadow-lg p-10 m-5">
        <h2 className="text-4xl font-extrabold text-center mb-10">
          Deceased Patients Dashboard
        </h2>
        {!selectedPatient ? (
          <div className="card-container">
            {patients.length > 0 ? (
              patients.map((patient, index) => (
                <div
                  key={patient._id}
                  className={`card hover:shadow-2xl transition duration-300 ${getCardVariant(index)}`}
                >
                  <h3 className="text-xl font-bold">
                    {patient.name}
                  </h3>
                  <p className="text-sm">ID: {patient.patientId}</p>
                  <button
                    className="mt-5 bg-neon-blue hover:bg-neon-blue-dark text-white font-bold py-2 px-4 rounded-full transition ease-in-out duration-300 transform hover:scale-105"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    View Patient Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center">No patients found.</p>
            )}
          </div>
        ) : (
          <PatientDetails patient={selectedPatient} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
