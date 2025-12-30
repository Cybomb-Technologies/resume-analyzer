import React from "react";
import "../static-pages.css";

export default function About() {
  return (
    <section className="static-page-section">
      <div className="container" style={{maxWidth: '1000px'}}>
        
        <div className="static-page-header">
          <h1 className="static-title">Empowering Careers with AI</h1>
          <p className="static-subtitle">
            ResumeIQ is the ultimate platform for job seekers to bridge the gap between talent and opportunity through intelligent, data-driven insights.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">50k+</span>
            <span className="stat-label">Resumes Analyzed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">95%</span>
            <span className="stat-label">ATS Accuracy</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10k+</span>
            <span className="stat-label">Job Matches</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4.9/5</span>
            <span className="stat-label">User Rating</span>
          </div>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">Our Mission</h3>
          <p className="static-text">
            At ResumeIQ, we believe that every qualified candidate deserves a fair chance at their dream job. 
            Great talent shouldn't be hidden behind complex Applicant Tracking Systems (ATS). Our mission is to 
            democratize career success by providing professional-grade resume analysis and interview preparation 
            tools to everyone, empowering you to present your best self to the world.
          </p>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">Why Choose ResumeIQ?</h3>
          <p className="static-text">
            The modern job market demands more than just a list of experiences. It requires strategic presentation. 
            We built ResumeIQ to help you navigate this complexity. By leveraging cutting-edge LLMs and industry-leading 
            algorithms, we help you translate your unique story into a language that recruiters and hiring systems value.
          </p>
          
          <div className="values-grid">
            <div className="value-card">
              <i className="bi bi-shield-check value-icon"></i>
              <h4>Privacy First</h4>
              <p>Your data is encrypted and secure. We never share your personal info.</p>
            </div>
            <div className="value-card">
              <i className="bi bi-lightning-charge value-icon"></i>
              <h4>Instant Insights</h4>
              <p>Get comprehensive feedback on your resume in under 10 seconds.</p>
            </div>
            <div className="value-card">
              <i className="bi bi-graph-up-arrow value-icon"></i>
              <h4>Data Driven</h4>
              <p>Our analysis is based on real-world hiring patterns and ATS requirements.</p>
            </div>
          </div>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">Our Journey</h3>
          <p className="static-text">
            Started by a team of recruiters and software engineers, ResumeIQ was born out of frustration with 
            the "black box" of modern hiring. Today, we are a growing community of professionals dedicated 
            to making the job search process more transparent, efficient, and successful for everyone.
          </p>
        </div>

      </div>
    </section>
  );
}
