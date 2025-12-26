import React from "react";
import "./screening.css";

export default function Screening() {
  return (
    <section className="screening-section">
      <div className="container">

        {/*  REMOVED DUPLICATE "How ResumeIQ Works" TITLE */}

        <div className="steps-row">

          <div className="screen-card">
            <i className="bi bi-upload screen-icon"></i>
            <h4>Upload Resume</h4>
            <p>Upload your PDF resume securely using our AI-powered reader.</p>
          </div>

          <div className="screen-card">
            <i className="bi bi-cpu screen-icon"></i>
            <h4>AI Processing</h4>
            <p>Our AI extracts keywords, skills, and structure from your resume.</p>
          </div>

          <div className="screen-card">
            <i className="bi bi-bar-chart-line screen-icon"></i>
            <h4>Get Results</h4>
            <p>Receive ATS score, skill match, and AI suggestions instantly.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
