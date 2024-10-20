// src/components/ErrorDialog.js
import React from 'react';
import './ErrorDialog.css'; // Include the CSS for styling the dialog box

function ErrorDialog({ message, onClose }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ErrorDialog;
