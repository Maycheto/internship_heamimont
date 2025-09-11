import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./aboutus.css";

export default function AboutPage() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

 
  return (
    <div className="homepage about-page-bg">
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

      <main className="about-content">
        <section className="about-hero">
          <h1>Why Choose Us?</h1>
          <p>
            We’re not just an insurance provider — we’re your partner in building
            confidence, security, and peace of mind. Every policy we offer is
            shaped around real people and real needs.
          </p>
        </section>

        <section className="why-section">
          <div className="why-card">
            <div className="why-icon">🛡️</div>
            <div className="why-text">
              <h2>Tailored Protection</h2>
              <p>
                Your journey is unique. Our solutions adapt to your lifestyle,
                business, and future goals—never the other way around.
              </p>
            </div>
          </div>

          <div className="why-card">
            <div className="why-icon">👥</div>
            <div className="why-text">
              <h2>Trusted Expertise</h2>
              <p>
                With years of industry knowledge, we break down the complexity
                of insurance into clear, reliable guidance you can count on.
              </p>
            </div>
          </div>

          <div className="why-card">
            <div className="why-icon">🤝</div>
            <div className="why-text">
              <h2>Here When It Matters</h2>
              <p>
                From the first question to the hardest claim day, we’re by your
                side. No bots, no endless holds—just real support.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
