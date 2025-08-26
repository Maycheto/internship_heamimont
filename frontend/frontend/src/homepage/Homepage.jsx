import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./homepage.css";

function Homepage() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  const handleLearnMore = () => {
    navigate("/insights");
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="logo" onClick={handleLogoClick} role="button" tabIndex={0}>Pink</div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/about">About Us</Link>
          <Link to="/insights">Insights</Link>
        </nav>
        <div className="actions">
          <Link className="btn btn-outline" to="/signup">Sign Up</Link>
          <Link className="btn btn-solid" to="/login">Log In</Link>
        </div>
      </header>

      <main className="hero">
        <div className="hero-left">
          <div className="pink-circle animate-pop" />
          <h1 className="headline fade-in">
            <span className="highlight">
              <span className="highlight-bg" />
              <span className="highlight-text">Protecting</span>
            </span>{" "}
            what matters, securing your future.
          </h1>
          <button className="btn btn-learn pulse" onClick={handleLearnMore}>Learn More</button>
        </div>

        <div className="hero-right">
          <div className="image-circle float">
            <img src="https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg" />
          </div>
        </div>
      </main>

      <div className="divider-dots" aria-hidden="true" />

      <section className="cta-section">
        <h2 className="cta-title">Get Covered Today.</h2>
        <p className="cta-sub">Discover Your Plan.</p>
        <div className="cta-actions">
          <Link to="/signup" className="btn btn-outline">Sign Up</Link>
          <Link to="/login" className="btn btn-solid">Log In</Link>
        </div>
      </section>

      <div className="wave" aria-hidden="true" />

      <section className="services" id="services">
        <h2 className="services-title">Our Services</h2>

        <div className="service service-a">
          <div className="service-media">
            <img src="https://images.pexels.com/photos/620530/pexels-photo-620530.jpeg"/>
            <div className="service-chip">Personal Insurance</div>
          </div>
          <div className="service-copy">
            <p>
              Protect what matters most with tailored coverage for health, life,
              and everyday security — built to give you peace of mind.
            </p>
          </div>
        </div>

        <div className="service service-b">
          <div className="service-copy">
            <h3 className="service-label">Business Protection</h3>
            <p>
              Safeguard your company against risks with flexible insurance
              solutions designed to keep your operations running smoothly.
            </p>
          </div>
          <div className="service-media">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop"
            />
          </div>
        </div>

        <div className="service service-c">
          <div className="service-media">
            <img
              src="https://images.pexels.com/photos/11895978/pexels-photo-11895978.jpeg"
              alt="Modern building"
            />
          </div>
          <div className="service-copy">
            <div className="service-chip">Future Planning</div>
            <p>
              Plan ahead with financial and insurance strategies that secure your
              future — so you can move forward with confidence.
            </p>
          </div>
        </div>
      </section>

      <div className="bottom-arcs" aria-hidden="true">
        <div className="arc arc-green" />
        <div className="arc arc-pink" />
        <div className="arc arc-magenta" />
      </div>

      <div className="grid-ghost" aria-hidden="true" />
    </div>
  );
}

export default Homepage; 