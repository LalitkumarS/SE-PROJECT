import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signin.css'; // Ensure your custom CSS is imported

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log(`Username: ${username}, Password: ${password}`);
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign In</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="sign-up-button" onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}

export default SignIn;
