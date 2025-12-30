import React, { useState } from "react";
import "../static-pages.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been received. We will get back to you shortly.`);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="static-page-section">
      <div className="container">
        
        <div className="static-page-header">
          <h1 className="static-title">Get in Touch</h1>
          <p className="static-subtitle">
            Have questions, feedback, or need support? We're here to help you accelerate your career.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-form-container" style={{margin: 0, maxWidth: '100%'}}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  className="form-input" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-input" 
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  className="form-input" 
                  placeholder="How can we help?" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea 
                  name="message"
                  className="form-textarea" 
                  rows="4" 
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>

          <div className="contact-info-block">
            <h3 className="static-block-title">Contact Information</h3>
            <p className="static-text mb-4">
              Feel free to reach out to us through any of these channels. Our team typically responds within 24 hours.
            </p>

            <div className="info-item">
              <div className="info-icon">
                <i className="bi bi-envelope"></i>
              </div>
              <div className="info-text">
                <h4>Email Us</h4>
                <p>support@resumeiq.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="bi bi-geo-alt"></i>
              </div>
              <div className="info-text">
                <h4>Our Office</h4>
                <p>123 AI Tech Park, Innovation Way<br/>Bangalore, KA 560103</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="bi bi-clock"></i>
              </div>
              <div className="info-text">
                <h4>Support Hours</h4>
                <p>Monday - Friday: 9 AM - 6 PM IST</p>
              </div>
            </div>

            <div className="mt-5">
              <h4 style={{color: '#fff', fontSize: '1.1rem', marginBottom: '15px'}}>Follow Us</h4>
              <div className="social-links">
                <a href="#" className="social-btn"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="social-btn"><i className="bi bi-twitter-x"></i></a>
                <a href="#" className="social-btn"><i className="bi bi-github"></i></a>
                <a href="#" className="social-btn"><i className="bi bi-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
