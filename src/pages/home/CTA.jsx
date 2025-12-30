import React from "react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-5">
      <div className="container py-5">
        <div className="p-5 rounded-5 text-center position-relative overflow-hidden" 
             style={{
               background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
               boxShadow: '0 20px 50px rgba(79, 70, 229, 0.3)'
             }}>
            
            {/* Background pattern */}
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{opacity: 0.1, backgroundImage: 'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)', backgroundSize: '30px 30px'}}></div>

            <div className="position-relative z-1">
                <h2 className="display-4 fw-bold text-white mb-4">Your dream job is one click away</h2>
                <p className="lead text-white opacity-90 mb-5 mx-auto" style={{maxWidth: '700px'}}>
                    Don't let a bad resume hold you back. Get an instant score, fix errors, and start getting interviews.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/analyse" className="btn btn-light btn-lg px-5 py-3 fw-bold rounded-pill text-primary shadow-sm hover-scale">
                        Analyze My Resume
                    </Link>
                    <Link to="/features" className="btn btn-outline-light btn-lg px-5 py-3 fw-bold rounded-pill hover-scale">
                        Explore Features
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
