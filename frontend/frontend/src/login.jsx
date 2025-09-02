import React, { useState } from 'react';
import './login.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="login-container">
      <div className="decorative-shape"></div>
      
      <div className="main-panel">
        <div className="header-section">
          <button className="back-button">
            <span className="back-arrows"></span>
          </button>
          <span className="brand-text">Pink</span>
        </div>
        
        <div className="form-section">
          <div className="input-field">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          
          <div className="input-field password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
            <div className="password-icons">
              <span className="eye-icon">👁</span>
              <span className="eye-icon">👁</span>
            </div>
          </div>
          
          {/* Remember me and Forgot password */}
          <div className="options-row">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox"
              />
              <label htmlFor="remember" className="checkbox-label">
                Remember me
              </label>
            </div>
            <button type="button" className="forgot-password">
              Forgot password?
            </button>
          </div>
          
          {/* Sign up button */}
          <button type="submit" className="signup-button" onClick={handleSubmit}>
            Sign up
          </button>
          
          {/* Account prompt */}
          <div className="account-prompt">
            <span className="prompt-text">Don't have an account? </span>
            <button className="signup-link">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
