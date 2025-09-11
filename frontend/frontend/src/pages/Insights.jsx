import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./insights.css";

export default function InsightsPage() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload(); 
  };

  // Disable page scroll while on Insights
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="insights-page">
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

      <main className="insights-content">
        <div className="insights-box">
          <h1>Insights To Keep You Informed</h1>
          <p>
            Stay up to date with the latest trends, strategies, and guidance on
            protecting what matters most.
          </p>
        </div>
        <div className="insights-list">
          <div className="insight-card">
            <h2>The Future of Insurance: Smarter, Simpler, Safer</h2>
            <p>
              Insurance is going digital — discover how technology is making
              protection more transparent and accessible.
            </p>
            <Link to="/insights/future">Read More →</Link>
          </div>

          <div className="insight-card">
            <h2>5 Ways to Secure Your Business Against Uncertainty</h2>
            <p>
              From financial risks to natural disasters, here are practical ways
              to keep your business running strong.
            </p>
            <Link to="/insights/business">Read More →</Link>
          </div>

          <div className="insight-card">
            <h2>Why Personalized Coverage Matters</h2>
            <p>
              One-size-fits-all doesn’t cut it anymore. Learn why tailored
              protection gives real peace of mind.
            </p>
            <Link to="/insights/personal">Read More →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
