import React from "react";
import { Link } from "react-router-dom";

function Insights() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Insights</h1>
      <p>Articles and updates will live here.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default Insights; 