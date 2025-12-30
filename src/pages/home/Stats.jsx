import React from "react";

export default function Stats() {
  const stats = [
    { number: "50,000+", label: "Resumes Optimized" }, /** Proven scale */
    { number: "93%", label: "Interview Success Rate" }, /** Outcome focused */
    { number: "2x", label: "Faster Job Search" }, /** Benefit focused */
    { number: "4.9/5", label: "User Rating" } /** Social proof */
  ];

  return (
    <section className="py-5 bg-black text-white border-top border-bottom border-secondary border-opacity-25">
      <div className="container text-center">
        <div className="row g-4">
            {stats.map((stat, index) => (
                <div key={index} className="col-6 col-md-3">
                    <div className="p-3 hover-scale transition-all">
                        <h3 className="display-4 fw-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-1" 
                            style={{background: 'linear-gradient(to right, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                            {stat.number}
                        </h3>
                        <p className="text-white-50 mb-0 fs-5">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
