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

          {/* AI Resume Analysis */}
          <div className="feature-box">
            <div className="feature-badge">01</div>
            <i className="bi bi-file-earmark-text feature-icon"></i>
            <h4>AI Resume Analysis</h4>
            <p>
              Get an instant score based on ATS algorithms. We verify your formatting, keywords, and job fit in seconds.
            </p>
          </div>

          {/* Cover Letter */}
          <div className="feature-box">
            <div className="feature-badge">02</div>
            <i className="bi bi-pencil-square feature-icon"></i>
            <h4>Smart Cover Letter</h4>
            <p>
              Generate tailored cover letters for any job description. Our AI matches your skills to the company's needs automatically.
            </p>
          </div>

          {/* Mock Interview */}
          <div className="feature-box">
            <div className="feature-badge">03</div>
            <i className="bi bi-camera-video feature-icon"></i>
            <h4>AI Mock Interview</h4>
            <p>
              Practice with a realistic AI interviewer. Get asked role-specific questions and receive instant feedback on your answers.
            </p>
          </div>

          {/* Analytics & History */}
          <div className="feature-box">
            <div className="feature-badge">04</div>
            <i className="bi bi-graph-up feature-icon"></i>
            <h4>Progress Tracking</h4>
            <p>
              Keep track of every resume version and interview score. Watch your improve over time with detailed analytics.
            </p>
          </div>

          {/* AI Job Matching */}
          <div className="feature-box">
            <div className="feature-badge">05</div>
            <i className="bi bi-briefcase feature-icon"></i>
            <h4>AI Job Matching</h4>
            <p>
              Find the perfect roles for your skillset. Our AI scans thousands of listings to surface jobs you're most likely to land.
            </p>
          </div>

          {/* Resume Builder */}
          <div className="feature-box">
            <div className="feature-badge">06</div>
            <i className="bi bi-tools feature-icon"></i>
            <h4>Resume Builder</h4>
            <p>
              Build a professional, ATS-friendly resume from scratch using our drag-and-drop templates and AI content suggestions.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
