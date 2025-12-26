import React from "react";
import "../static-pages.css";

export default function Contact() {
  return (
    <section className="static-page-section">
      <div className="container">
        
        <div className="static-page-header">
          <h1 className="static-title">Get in Touch</h1>
          <p className="static-subtitle">
            Have questions or suggestion? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-form-container">
          <form>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-input" placeholder="Your Name" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" placeholder="Your Email" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" rows="5" placeholder="How can we help?"></textarea>
            </div>

            <button type="button" className="submit-btn" onClick={() => alert("Thank you for your message! We will get back to you soon.")}>
              Send Message
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="static-text mb-2">Or email us directly at:</p>
            <a href="mailto:support@resumeiq.com" style={{color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none'}}>
              support@resumeiq.com
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
