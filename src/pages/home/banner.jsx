import React from "react";
import "./banner.css";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">

      {/* NEW: PRE HEADING */}
      <p className="hero-eyebrow">
        WELCOME TO <span>RESUMEIQ</span>
      </p>

      <h1 className="hero-title">
        Build a Resume That Passes <br />
        ATS & Gets <span>Interviews</span>
      </h1>

      <p className="hero-text">
        AI-powered resume analysis to boost interview chances.
        Instantly identify ATS score, match missing skills, and get
        actionable recommendations.
      </p>

      <div className="hero-features">
        <span>✔ ATS Score</span>
        <span>✔ Skill Match</span>
        <span>✔ AI Recommendations</span>
      </div>

      <button
        className="hero-btn"
        onClick={() => navigate("/analyse")}
      >
        Start Free Analysis
      </button>
    </section>
  );
}
