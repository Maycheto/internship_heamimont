import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Background from "./Background"; // import the background component

const LoginPageCSS = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
  };

  return (
    <>
      <Background /> {/* background is separate now */}

      <div className="login-container">
        <div className="topbar" style={{ position: "absolute", top: 24, left: 24 }}>
          <button className="back-button" onClick={() => navigate(-1)}>
            <span className="icon arrow-left-icon"></span> Back
          </button>
        </div>

        <div className="login-card">
          <h1 className="card-title">
            Welcome
            <br />
            Back!
          </h1>

          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>

            <div className="field password">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="eye">👁</span>
              </button>
            </div>

            <div className="row">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="link muted align-right">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="primary-btn">
              Log in
            </button>
          </form>

          <p className="foot-note">
            Don't have an account? <button type="button" className="link">Sign up</button>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPageCSS;
