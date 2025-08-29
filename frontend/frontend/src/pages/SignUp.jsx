import React, { useState } from "react";
import "./signup.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="signup-container">
      <div className="geometric-shape-1"></div>
      <div className="geometric-shape-2"></div>
        

      <div className="header">
        <button className="back-button">
          <span className="icon arrow-left-icon"></span>
        </button>
        <span className="header-text">Pink</span>
      </div>

      <div className="signup-card">
        <div className="form-header">
          <h1 className="form-title">Get Started</h1>
          <h2 className="form-subtitle">Join Our Website</h2>
        </div>

        <form className="signup-form">
          <div className="name-row">
            <input
              type="text"
              placeholder="First Name"
              className="form-input"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="form-input"
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            className="form-input"
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span
                className={`icon ${
                  showPassword ? "eye-off-icon" : "eye-icon"
                }`}
              ></span>
            </button>
          </div>

          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="form-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <span
                className={`icon ${
                  showConfirmPassword ? "eye-off-icon" : "eye-icon"
                }`}
              ></span>
            </button>
          </div>

          <div className="checkbox-container">
            <input type="checkbox" id="terms" className="checkbox" defaultChecked />
            <label htmlFor="terms" className="checkbox-label">
              I accept the terms and privacy policy
            </label>
          </div>

          <button type="submit" className="submit-button">
            Sign up
          </button>

          <div className="login-link-container">
            <p className="login-text">
              Already have an account?{" "}
              <a href="#" className="login-link">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
