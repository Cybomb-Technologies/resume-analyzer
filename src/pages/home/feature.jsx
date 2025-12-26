import React from "react";
import "./feature.css";

export default function Feature() {
  return (
    <section className="feature-section">
      <div className="container">

        {/* Section Title */}
        <h2 className="feature-title">What ResumeIQ Provides</h2>

        {/* Subtitle */}
        <p className="feature-subtitle">
          Powerful AI tools to analyze your resume, generate ATS scoring, extract skills, and offer smart suggestions.
        </p>

        {/* Feature Cards */}
        <div className="feature-row">

          {/* ATS Score Card */}
          <div className="feature-box">
            <div className="feature-badge">01</div>
            <i className="bi bi-clipboard-check feature-icon"></i>
            <h4>ATS Score Card</h4>
            <p>
              A clear, visual ATS score showing how well your resume performs
              against automated tracking systems — including formatting, keyword match,
              and structure.
            </p>
          </div>

          {/* Skills List */}
          <div className="feature-box">
            <div className="feature-badge">02</div>
            <i className="bi bi-list-ul feature-icon"></i>
            <h4>Skills List</h4>
            <p>
              Extracted skills grouped by categories (technical, tools, soft skills).
              Easily export or compare with job descriptions.
            </p>
          </div>

          {/* Suggestion Panel */}
          <div className="feature-box">
            <div className="feature-badge">03</div>
            <i className="bi bi-lightbulb feature-icon"></i>
            <h4>Suggestion Panel</h4>
            <p>
              AI-powered suggestions to improve your resume — keywords to add,
              lines to rewrite, and formatting fixes prioritized for you.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
