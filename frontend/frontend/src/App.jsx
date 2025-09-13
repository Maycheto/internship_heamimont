import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./sign up and login/login";
import Solutions from "./pages/Solutions";
import AboutUs from "./pages/AboutUs";
import Insights from "./pages/Insights";
import SignUp from "./sign up and login/SignUp";
import DatabaseManagement from "./pages/DatabaseManagement";
import Portfolios from "./pages/Portfolios";
import Accounts from "./pages/accounts";
import AccountDetails from "./pages/AccountDetails"; 

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
      <Route path="/database-management" element={<DatabaseManagement />} />
      <Route path="/portfolios/:databaseId" element={<Portfolios />} />
      <Route path="/accounts/:portfolioId" element={<Accounts />} />
      <Route path="/account-details/:accountId" element={<AccountDetails />} /> 

      <Route path="*" element={<Homepage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;