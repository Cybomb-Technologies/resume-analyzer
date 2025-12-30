import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <p className="auth-subtitle">Enter your email to receive a reset link</p>

        {message && <div className="auth-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email"
            />
          </div>

          <button type="submit" className="auth-btn">Send Link</button>
        </form>

        <p className="auth-redirect">
          Remembered it? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
