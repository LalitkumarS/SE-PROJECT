import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container text-center my-5">
      <h1 className="mb-4">Welcome to Data Leakage Detection System</h1>
      <p className="lead mb-4">
        This project is designed to protect the information of deceased patients from unauthorized access.
      </p>
      <div className="d-grid gap-2 col-md-4 mx-auto">
        <button className="btn btn-primary" onClick={() => navigate('/register')}>
          Register a Patient
        </button>
      </div>
    </div>
  );
}

export default Home;
