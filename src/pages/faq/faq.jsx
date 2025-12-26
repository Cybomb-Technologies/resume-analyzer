import React, { useState } from "react";
import "./faq.css";

export default function FAQ() {
  return (
    <section className="faq-page">

      {/* =====================
          ABOUT RESUMEIQ
      ====================== */}
      <div className="container">
        <h2 className="faq-heading">About ResumeIQ</h2>

        <FAQGroup
          questions={[
            {
              q: "What is ResumeIQ?",
              a: "ResumeIQ is an AI-powered resume analyzer that evaluates your resume for ATS compatibility, identifies missing skills, and provides improvement suggestions in seconds."
            },
            {
              q: "How accurate is ResumeIQ's ATS scoring?",
              a: "ResumeIQ uses ATS-patterned algorithms trained on real job descriptions to evaluate formatting, keyword match, structure, and section quality to generate reliable ATS scores."
            },
            {
              q: "What does ResumeIQ analyze in my resume?",
              a: "ResumeIQ analyzes skills, keywords, formatting, work experience structure, readability, and missing skill gaps based on industry standards and job requirements."
            },
            {
              q: "Is my resume safe with ResumeIQ?",
              a: "Yes. Your resume is processed securely and is never stored on our servers. All analysis happens temporarily and is deleted immediately after processing."
            }
          ]}
        />
      </div>

      {/* =====================
          USING THE APPLICATION
      ====================== */}
      <div className="container">
        <h2 className="faq-heading">Using the Application</h2>

        <FAQGroup
          questions={[
            {
              q: "How do I upload my resume for analysis?",
              a: "Click the 'Start Analysis' button on the homepage and upload your PDF or DOCX resume. ResumeIQ processes your resume instantly."
            },
            {
              q: "What file formats does ResumeIQ support?",
              a: "ResumeIQ supports PDF and DOCX formats. PDF is recommended for best formatting accuracy."
            },
            {
              q: "How long does the analysis take?",
              a: "The analysis takes only 2–3 seconds. ResumeIQ is optimized to evaluate resumes quickly using fast AI models."
            },
            {
              q: "Can I download or save my analysis results?",
              a: "Yes. You can download your ATS score, skill list, and improvement suggestions as a report."
            }
          ]}
        />
      </div>

    </section>
  );
}

/* =====================
   REUSABLE FAQ COMPONENT
====================== */
function FAQGroup({ questions }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-group">
      {questions.map((item, index) => (
        <div key={index} className="faq-item">

          {/* Row */}
          <div
            className="faq-question-row"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <h4>{item.q}</h4>
            <span className={`chevron ${openIndex === index ? "rotate" : ""}`}>
              ▾
            </span>
          </div>

          {/* Answer */}
          {openIndex === index && (
            <p className="faq-answer">{item.a}</p>
          )}

          {/* Divider */}
          <div className="faq-divider"></div>
        </div>
      ))}
    </div>
  );
}
