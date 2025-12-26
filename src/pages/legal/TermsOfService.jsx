import React from "react";
import "../static-pages.css";

export default function TermsOfService() {
  return (
    <section className="static-page-section">
      <div className="container" style={{maxWidth: '900px'}}>
        
        <div className="static-page-header">
          <h1 className="static-title">Terms of Service</h1>
          <p className="static-subtitle">Last updated: December 2025</p>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">1. Agreement to Terms</h3>
          <p className="static-text">
            By accessing or using our website, you agree to be bound by these Terms of Service and our Privacy Policy. 
            If you do not agree to these terms, please do not use our services.
          </p>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">2. Use of Services</h3>
          <p className="static-text">
            You may use our services for lawful purposes only. You agree not to use the website:
          </p>
          <ul className="static-list">
            <li>In any way that violates any applicable federal, state, local, or international law.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material.</li>
            <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
          </ul>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">3. Intellectual Property</h3>
          <p className="static-text">
            The Service and its original content, features, and functionality are and will remain the exclusive property of ResumeIQ and its licensors. 
            The service is protected by copyright, trademark, and other laws.
          </p>
        </div>

        <div className="static-content-block">
          <h3 className="static-block-title">4. Limitation of Liability</h3>
          <p className="static-text">
            In no event shall ResumeIQ, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, 
            special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </div>

      </div>
    </section>
  );
}
