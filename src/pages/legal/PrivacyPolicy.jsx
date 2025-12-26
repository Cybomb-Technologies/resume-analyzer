import React from "react";
import "../static-pages.css";

export default function PrivacyPolicy() {
  return (
    <section className="static-page-section">
      <div className="container" style={{maxWidth: '900px'}}>
        
        <div className="static-page-header">
          <h1 className="static-title">Privacy Policy</h1>
          <p className="static-subtitle">Last updated: December 2025</p>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">1. Introduction</h3>
          <p className="static-text">
            Welcome to ResumeIQ. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">2. Data We Collect</h3>
          <p className="static-text">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="static-list">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
            <li><strong>Document Data:</strong> includes the resume and cover letter content you upload for analysis.</li>
          </ul>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">3. How We Use Your Data</h3>
          <p className="static-text">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="static-list">
            <li>To provide the AI analysis services you requested.</li>
            <li>To manage your account and registration.</li>
            <li>To improve our website and services.</li>
          </ul>
          <p className="static-text mt-3">
            <strong>Important:</strong> We do not sell your personal data to third parties. Resume data is processed temporarily for analysis and suggestions.
          </p>
        </div>

      </div>
    </section>
  );
}
