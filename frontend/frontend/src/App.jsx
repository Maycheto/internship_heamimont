import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./sign up and login/login";
import Solutions from "./pages/Solutions";
import AboutUs from "./pages/AboutUs";
import Insights from "./pages/Insights";
import SignUp from "./sign up and login/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;