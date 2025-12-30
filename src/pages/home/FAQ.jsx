import React, { useState } from "react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How accurate is the ATS scoring?",
      answer: "Our engine uses the same parsing algorithms (like Sovren and DaXtra) used by 90% of Fortune 500 companies. If we flag an issue, it's highly likely an ATS will too."
    },
    {
      question: "Will my data be shared with recruiters?",
      answer: "No. Your privacy is paramount. We do not share your resume or personal data with any third parties or recruiters. You own your data completely."
    },
    {
      question: "Does this work for creative portfolios?",
      answer: "While we specialize in standard text-based resumes (PDF/DOCX) which are best for ATS, our Cover Letter generator can help creative professionals articulate their unique value proposition effectively."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "We offer a 'Forever Free' plan for basic analysis. If you choose to upgrade for premium AI features, you can cancel instantly from your dashboard with no hidden fees."
    }
  ];

  return (
    <section className="py-5 bg-black text-white">
      <div className="container py-5">
        <h2 className="display-5 fw-bold text-center mb-5">Frequently Asked Questions</h2>
        
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="d-flex flex-column gap-3">
                    {faqs.map((faq, index) => (
                        <div key={index} 
                             className={`rounded-3 border border-secondary border-opacity-50 overflow-hidden transition-all ${activeIndex === index ? 'bg-white bg-opacity-10 border-primary' : 'bg-transparent'}`}
                             style={{borderWidth: '1px'}}>
                            
                            <button 
                                className="w-100 p-4 d-flex justify-content-between align-items-center bg-transparent border-0 text-white text-start shadow-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="fs-5 fw-semibold">{faq.question}</span>
                                <i className={`bi bi-chevron-down transition-all ${activeIndex === index ? 'rotate-180' : ''}`} 
                                   style={{transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s'}}></i>
                            </button>
                            
                            <div className={`px-4 text-white-50 overflow-hidden transition-all`}
                                 style={{
                                    maxHeight: activeIndex === index ? '200px' : '0',
                                    opacity: activeIndex === index ? '1' : '0',
                                    paddingBottom: activeIndex === index ? '1.5rem' : '0'
                                 }}>
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
