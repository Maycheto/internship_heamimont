import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./solutions.css"; // separate CSS file for styling solutions page

export default function SolutionsPage() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div
          className="logo"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
        >
          Pink
        </div>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/about">About Us</Link>
          <Link to="/insights">Insights</Link>
        </nav>

        <div className="actions">
          <Link className="btn btn-outline" to="/signup">
            Sign Up
          </Link>
          <Link className="btn btn-solid" to="/login">
            Log In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="solutions-content">
        <div className="solutions-box">
          <h1>Our Solutions</h1>
          <p>
            Explore our tailored insurance solutions designed to protect your
            business, personal assets, and peace of mind.
          </p>
        </div>

        <div className="solutions-list">
          <div className="solution-card">
            <h2>Business Insurance Solutions</h2>
            <p>
              Keep your business secure against unexpected events. From liability
              coverage to property protection, we help you manage risk.
            </p>
            <Link to="/solutions/business">Learn More →</Link>
          </div>

          <div className="solution-card">
            <h2>Personal Insurance Solutions</h2>
            <p>
              Protect what matters most — your home, your car, and your family's
              well-being with coverage tailored to your needs.
            </p>
            <Link to="/solutions/personal">Learn More →</Link>
          </div>

          <div className="solution-card">
            <h2>Health & Life Insurance Solutions</h2>
            <p>
              Ensure long-term security with our comprehensive health and life
              insurance plans designed for every stage of life.
            </p>
            <Link to="/solutions/health-life">Learn More →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
