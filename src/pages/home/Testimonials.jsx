import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Frontend Developer",
      company: "TechFlow Inc.",
      text: "I applied to 50+ jobs with no luck. After running my resume through ResumeIQ, I realized my formatting was getting rejected by ATS. I fixed it in 5 minutes and got interviews at 3 major tech companies the next week.",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      name: "Priya Patel",
      role: "Product Manager",
      company: "InnovateX",
      text: "The Mock Interviewer is terrifyingly accurate. It asked me specific questions about my product roadmap experience that I actually encountered in my final round interview. It gave me the confidence to nail it.",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg"
    },
    {
      name: "Marcus Reid",
      role: "Data Analyst",
      company: "DataCorp",
      text: "I didn't know how to translate my academic experience into business value. The 'Rewrite Suggestions' feature helped me rephrase my bullet points to sound more impact-driven and professional.",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg"
    }
  ];

  const companies = ["Google", "Amazon", "Netflix", "Microsoft", "Tesla", "Adobe"];

  return (
    <section className="py-5 bg-black text-white position-relative overflow-hidden">
      {/* Background Decor */}
      <div className="position-absolute top-0 start-50 translate-middle-x w-100 h-100" 
           style={{background: 'radial-gradient(circle at center, rgba(124, 58, 237, 0.1) 0%, transparent 70%)', pointerEvents: 'none'}}></div>

      <div className="container py-5 position-relative z-1">
        <div className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 mb-3 px-3 py-2 rounded-pill">Success Stories</span>
            <h2 className="display-4 fw-bold mb-3">Don't just take our word for it</h2>
            <p className="text-white-50 lead mx-auto" style={{maxWidth: '600px'}}>
                Join thousands of professionals who have accelerated their careers with AI-powered insights.
            </p>
        </div>
        
        <div className="row g-4 mb-5">
            {testimonials.map((t, index) => (
                <div key={index} className="col-lg-4">
                    <div className="h-100 p-4 rounded-4 border border-secondary border-opacity-25 d-flex flex-column" 
                         style={{background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)'}}>
                        <div className="mb-4">
                            <i className="bi bi-quote fs-1 text-primary opacity-50"></i>
                        </div>
                        <p className="mb-4 text-light opacity-90 flex-grow-1" style={{lineHeight: '1.7'}}>"{t.text}"</p>
                        
                        <div className="d-flex align-items-center mt-auto border-top border-secondary border-opacity-25 pt-4">
                            <img src={t.avatar} alt={t.name} className="rounded-circle me-3 border border-2 border-primary border-opacity-50" width="50" height="50" />
                            <div>
                                <h6 className="mb-0 fw-bold">{t.name}</h6>
                                <small className="text-white-50">{t.role} at {t.company}</small>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Company Logos / Trust Badges */}
        <div className="text-center pt-5 border-top border-secondary border-opacity-25">
            <p className="text-white-50 mb-4 small text-uppercase letter-spacing-2">Candidates hired by</p>
            <div className="d-flex flex-wrap justify-content-center gap-4 gap-md-5 align-items-center opacity-50 grayscale hover-grayscale-0 transition-all">
                {companies.map((company, i) => (
                    <span key={i} className="fw-bold fs-4">{company}</span>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
