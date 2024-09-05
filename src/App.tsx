// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import CompanyList from "./pages/CompanyList";
import EngineerList from "./pages/EngineerList";
import JobDetail from "./pages/JobDetail";
import EngineerDetail from "./pages/EngineerDetail";
import CompanyDetail from "./pages/CompanyDetail";
import ClientTool from "./pages/ClientTool";
import AIAsisstanceSpecification from "./pages/AIAssistanceSpecification";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/joblist" element={<JobList />} />
        <Route path="/companylist" element={<CompanyList />} />
        <Route path="/engineerlist" element={<EngineerList />} />
        <Route path="/jobdetail" element={<JobDetail />} />
        <Route path="/engineerdetail" element={<EngineerDetail />} />
        <Route path="/companydetail" element={<CompanyDetail />} />
        <Route path="/clienttool" element={<ClientTool />} />
        <Route
          path="/aiassistancespecification"
          element={<AIAsisstanceSpecification />}
        />
      </Routes>
    </Router>
  );
};

export default App;
