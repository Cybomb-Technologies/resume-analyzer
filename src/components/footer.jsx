import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer-section mt-auto">
      <div className="container">
        
        <div className="footer-content">
          {/* Column 1: Brand & Desc */}
          <div className="footer-brand">
            <h4 className="footer-logo">
              Resume<span>IQ</span>
            </h4>
            <p className="footer-desc">
              Empowering job seekers with AI-driven resume analysis and interview prep to land their dream jobs.
            </p>
            <div className="social-icons">
              {/* External social links can remain as <a> */}
              <a href="#" className="social-link"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="social-link"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="social-link"><i className="bi bi-github"></i></a>
              <a href="#" className="social-link"><i className="bi bi-instagram"></i></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links">
            <h5 className="footer-heading">Quick Links</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-links">
            <h5 className="footer-heading">Services</h5>
            <ul>
              <li><Link to="/analyse">Resume Analysis</Link></li>
              <li><Link to="/cover-letter">Cover Letter AI</Link></li>
              <li><Link to="/mock-interview">Mock Interview</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-links">
            <h5 className="footer-heading">Get in Touch</h5>
            <ul>
              <li><i className="bi bi-envelope"></i> support@resumeiq.com</li>
              <li><i className="bi bi-telephone"></i> +1 (555) 123-4567</li>
              <li><i className="bi bi-geo-alt"></i> San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} ResumeIQ · All rights reserved.
          </p>
          <div className="legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
