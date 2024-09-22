// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import CompanyList from "./pages/CompanyList";
import EngineerList from "./pages/EngineerList";
import InquiryList from "./pages/InquiryList";
import InquiryDetail from "./pages/InquiryDetail";
import JobDetail from "./pages/JobDetail";
import EngineerDetail from "./pages/EngineerDetail";
import CompanyDetail from "./pages/CompanyDetail";
import ClientTool from "./pages/ClientTool";
import AIAsisstanceSpecification from "./pages/AIAssistanceSpecification";
import LandingPage from "./pages/LandingPage";
import SimulationResult from "./pages/SimulationResult";
import SystemOrderSimulation from "./components/SystemOrderSimulation";
import SystemPreview from "./components/SystemPreview";
import ThanksPage from "./pages/ThanksPage";

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
        <Route path="/inquirylist" element={<InquiryList />} />
        <Route path="/inquirydetail/:id" element={<InquiryDetail />} />
        <Route path="/clienttool" element={<ClientTool />} />
        <Route
          path="/aiassistancespecification"
          element={<AIAsisstanceSpecification />}
        />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/simulation" element={<SystemOrderSimulation />} />
        <Route path="/simulation-result" element={<SimulationResult />} />
        <Route path="/system-preview" element={<SystemPreview />} />
        <Route path="/thanks" element={<ThanksPage />} />
      </Routes>
    </Router>
  );
};

export default App;
