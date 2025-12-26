import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./navbar.css";

export default function AppNavbar() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext); // Logout is now handled in Profile page
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="nav-container">

        {/*  LEFT LOGO */}
        <div className="nav-left">
          <Link to="/" className="logo">
            Resume<span>IQ</span>
          </Link>
        </div>

        {/*  DESKTOP LINKS */}
        <div className="nav-center desktop-menu">
          <Link to="/" className="nav-link">Home</Link>
          
          {/* Services Dropdown */}
          <div 
            className="nav-dropdown-container"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="nav-link dropdown-trigger">Services <i className="bi bi-chevron-down"></i></span>
            {dropdownOpen && (
              <div className="nav-dropdown-menu text-white">
                <Link to="/analyse" className="dropdown-item">Analyse</Link>
                <Link to="/cover-letter" className="dropdown-item">Cover Letter</Link>
                <Link to="/mock-interview" className="dropdown-item">Mock Interview</Link>
              </div>
            )}
          </div>

          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>

        {/*DESKTOP BUTTON */}
        <div className="nav-right desktop-menu">
          {user ? (
            <Link to="/profile" className="profile-icon-btn" title="Go to Profile">
                {/* Simple User SVG Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </Link>
          ) : (
            <Link to="/login" className="get-started-btn">Login / Sign Up</Link>
          )}
        </div>

        {/*  MOBILE HAMBURGER */}
        <div className="hamburger" onClick={() => setOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </nav>

      {/*  MOBILE OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

      {/*  MOBILE DRAWER */}
      <div className={`mobile-drawer ${open ? "open" : ""}`}>

        <div className="drawer-header">
          <div className="drawer-logo">Resume<span>IQ</span></div>
          <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
        </div>

        <Link to="/" className="drawer-link" onClick={() => setOpen(false)}>Home</Link>
        
        <div className="drawer-section-label">Services</div>
        <Link to="/analyse" className="drawer-link indented" onClick={() => setOpen(false)}>Analyse</Link>
        <Link to="/cover-letter" className="drawer-link indented" onClick={() => setOpen(false)}>Cover Letter</Link>
        <Link to="/mock-interview" className="drawer-link indented" onClick={() => setOpen(false)}>Mock Interview</Link>
        
        <div style={{borderTop: '1px solid rgba(255,255,255,0.1)', margin: '1rem 0'}}></div>
        
        <Link to="/features" className="drawer-link" onClick={() => setOpen(false)}>Features</Link>
        <Link to="/contact" className="drawer-link" onClick={() => setOpen(false)}>Contact</Link>
        <Link to="/about" className="drawer-link" onClick={() => setOpen(false)}>About</Link>
        
        {user ? (
            <Link to="/profile" className="drawer-link" onClick={() => setOpen(false)}>Profile</Link>
        ) : (
            <Link to="/login" className="drawer-btn" onClick={() => setOpen(false)}>Login / Sign Up</Link>
        )}
      </div>
    </>
  );
}
