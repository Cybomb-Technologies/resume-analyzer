import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/home/home";
import Analyse from "./pages/analyse/analyse";
import PageDescription from "./pages/analyse/pagedescription";
import FAQ from "./pages/faq/faq";
import Features from "./pages/features/Features";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import Result from "./pages/analyse/result.jsx";

import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Profile from "./pages/profile/Profile";
import History from "./pages/history/History";
import CoverLetter from "./pages/ai/CoverLetter";
import MockInterview from "./pages/ai/MockInterview";
import JobMatching from "./pages/ai/JobMatching";

import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyse" element={<Analyse />} />
          <Route path="/pagedescription" element={<PageDescription />} />
          <Route path="/result" element={<Result />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* New Static Pages */}
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route path="/mock-interview" element={<MockInterview />} />
          <Route path="/job-matching" element={<JobMatching />} />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}
