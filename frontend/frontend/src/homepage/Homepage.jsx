import React from "react";
import "./homepage.css";

function Homepage() {
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">Pink</div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Solutions</a>
          <a href="#">About Us</a>
          <a href="#">Insights</a>
        </nav>
        <div className="actions">
          <button className="btn btn-outline">Sign Up</button>
          <button className="btn btn-solid">Log In</button>
        </div>
      </header>

      <main className="hero">
        <div className="hero-left">
          <div className="pink-circle" />
          <h1 className="headline">
            <span className="highlight">
              <span className="highlight-bg" />
              <span className="highlight-text">Protecting</span>
            </span>{" "}
            what matters, securing your future.
          </h1>
        </div>

        <div className="hero-right">
          <div className="image-circle">
            {}
            <img src="/teamwork.jpg"/>
          </div>
        </div>
      </main>

      {}
      <div className="grid-ghost" aria-hidden="true" />
    </div>
  );
}

export default Homepage; 