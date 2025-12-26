import React from "react";
import "../static-pages.css";

export default function Features() {
  const features = [
    {
      icon: "bi-file-earmark-text",
      title: "AI Resume Analysis",
      desc: "Get instant feedback on your resume with detailed scoring and actionable improvements tailored to ATS algorithms."
    },
    {
      icon: "bi-pencil-square",
      title: "Cover Letter Generator",
      desc: "Create professional, job-specific cover letters in seconds using our advanced AI that analyzes the job description."
    },
    {
      icon: "bi-camera-video",
      title: "Mock Interview",
      desc: "Practice with our AI interviewer. Get real-time feedback on your answers, tone, and confidence to ace the real deal."
    },
    {
      icon: "bi-graph-up",
      title: "ATS Score Optimization",
      desc: "Understand how Applicant Tracking Systems see your resume. Optimize keywords and formatting to rank higher."
    },
    {
      icon: "bi-lightbulb",
      title: "Skill Gap Analysis",
      desc: "Identify missing skills required for your target job and get recommendations on what to add or learn."
    },
    {
      icon: "bi-shield-check",
      title: "Privacy First",
      desc: "Your data is secure. We don't store your personal documents longer than necessary for the analysis."
    }
  ];

  return (
    <section className="static-page-section">
      <div className="container">
        
        <div className="static-page-header">
          <h1 className="static-title">Powerful Features</h1>
          <p className="static-subtitle">
            Everything you need to land your dream job, powered by cutting-edge AI technology.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <i className={`bi ${feature.icon}`}></i>
              </div>
              <h3 className="static-block-title">{feature.title}</h3>
              <p className="static-text">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
