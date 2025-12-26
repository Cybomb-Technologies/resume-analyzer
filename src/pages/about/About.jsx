import React from "react";
import "../static-pages.css";

export default function About() {
  return (
    <section className="static-page-section">
      <div className="container" style={{maxWidth: '900px'}}>
        
        <div className="static-page-header">
          <h1 className="static-title">About ResumeIQ</h1>
          <p className="static-subtitle">
            Bridging the gap between talent and opportunity with intelligent technology.
          </p>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">Our Mission</h3>
          <p className="static-text">
            At ResumeIQ, we believe that every qualified candidate deserves a fair chance at their dream job. 
            Too often, great talent is overlooked simply because of poor resume formatting or a lack of keywords 
            that Applicant Tracking Systems (ATS) look for. Our mission is to democratize career success by 
            providing professional-grade resume analysis and interview preparation tools to everyone, instantly.
          </p>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">Why We Started</h3>
          <p className="static-text">
            The job market is more competitive than ever. Recruiters spend an average of 7 seconds reviewing a resume. 
            We built ResumeIQ to help you make those seconds count. By leveraging advanced AI, we help you translate 
            your unique experiences into a language that both machines and hiring managers understand.
          </p>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">What We Offer</h3>
          <ul className="static-list">
            <li><strong>Smart Analysis:</strong> Instant feedback on resume strength and ATS compatibility.</li>
            <li><strong>Personalized Advice:</strong> Tailored suggestions to improve content and structure.</li>
            <li><strong>Interview Prep:</strong> Realistic AI mock interviews to build confidence.</li>
            <li><strong>Secure & Private:</strong> Your career data belongs to you. We prioritize your privacy.</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
