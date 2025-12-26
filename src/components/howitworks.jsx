import React from "react";
import "./howitworks.css";

export default function HowItWorks() {
  return (
    <section className="howitworks-section">
      
      <div className="howitworks-wrapper text-center">
        <h2 className="howitworks-title">How ResumeIQ Works</h2>

        <div className="howitworks-row">
          <div className="howitworks-card">
            <i className="bi bi-upload howitworks-icon"></i>
            <h4>Upload Resume</h4>
            <p>Upload your PDF resume securely using our AI-powered reader.</p>
          </div>

          <div className="howitworks-card">
            <i className="bi bi-cpu howitworks-icon"></i>
            <h4>AI Processing</h4>
            <p>Our AI extracts keywords, skills, and structure from your resume.</p>
          </div>

          <div className="howitworks-card">
            <i className="bi bi-bar-chart-line howitworks-icon"></i>
            <h4>Get Results</h4>
            <p>Receive ATS score, skill match, and AI suggestions instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
