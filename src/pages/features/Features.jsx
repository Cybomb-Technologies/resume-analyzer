import React from "react";
import { Link } from "react-router-dom";
import styles from "./Features.module.css";

export default function Features() {
  const features = [
    {
      icon: "bi-file-earmark-text",
      title: "AI Resume Analysis",
      desc: "Get instant feedback on your resume with detailed scoring and actionable improvements tailored to ATS algorithms."
    },
    {
      icon: "bi-pencil-square",
      title: "Cover Letter Generator",
      desc: "Create professional, job-specific cover letters in seconds using our advanced AI that analyzes the job description."
    },
    {
      icon: "bi-camera-video",
      title: "Mock Interview",
      desc: "Practice with our AI interviewer. Get real-time feedback on your answers, tone, and confidence to ace the real deal."
    },
    {
      icon: "bi-graph-up",
      title: "ATS Score Optimization",
      desc: "Understand how Applicant Tracking Systems see your resume. Optimize keywords and formatting to rank higher."
    },
    {
      icon: "bi-lightbulb",
      title: "Skill Gap Analysis",
      desc: "Identify missing skills required for your target job and get recommendations on what to add or learn."
    },
    {
      icon: "bi-shield-check",
      title: "Privacy First",
      desc: "Your data is secure. We don't store your personal documents longer than necessary for the analysis."
    }
  ];

  const detailedFeatures = [
    {
      title: "Smart Resume Analysis",
      desc: "Our core scoring engine uses advanced algorithms to parse your resume just like an Applicant Tracking System (ATS). It evaluates your content, structure, and formatting to provide a comprehensive score out of 100.",
      benefits: [
        "Instant score based on industry standards",
        "Line-by-line feedback on what to fix",
        "Keyword optimization suggestions",
        "PDF download of your improved resume"
      ],
      icon: "bi-cpu",
      link: "/analyse",
      cta: "Analyze My Resume"
    },
    {
      title: "AI Cover Letter Generator",
      desc: "Stop staring at a blank screen. Paste the job description, and our AI will craft a personalized, persuasive cover letter that highlights your relevant experience and matches the company's tone.",
      benefits: [
        "Tailored to specific job requirements",
        "Highlight your most relevant skills",
        "Choose from professional or creative tones",
        "Ready to copy and send in seconds"
      ],
      icon: "bi-envelope-paper",
      link: "/cover-letter",
      cta: "Generate Cover Letter"
    },
    {
      title: "Intelligent Mock Interviewer",
      desc: "Prepare for the hot seat with our AI-powered mock interview simulator. It generates relevant questions based on the job description you provide and evaluates your answers for content and clarity.",
      benefits: [
        "Practice with role-specific questions",
        "Receive instant feedback on your answers",
        "Get suggestions for better responses",
        "Build confidence before the real interview"
      ],
      icon: "bi-mic",
      link: "/mock-interview",
      cta: "Start Mock Interview"
    },
    {
      title: "Profile & History Tracking",
      desc: "Keep track of your job application journey. Save different versions of your resume, track your improvement over time, and manage your user profile all in one secure dashboard.",
      benefits: [
        "Analysis history tracking",
        "Secure profile management",
        "Multiple resume version support",
        "Progress visualization"
      ],
      icon: "bi-person-badge",
      link: "/profile",
      cta: "Go to Dashboard"
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        
        <div className="text-center mb-5">
          <h1 className={`display-4 fw-bold mb-3 ${styles.gradientTitle}`}>Powerful Features</h1>
          <p className="lead text-white-50 mx-auto" style={{maxWidth: '600px'}}>
            Everything you need to land your dream job, powered by cutting-edge AI technology.
          </p>
        </div>

        {/* Feature Grid Summary */}
        <div className="row g-4 mb-5">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className={`h-100 p-4 ${styles.card}`}>
                <div className={`mb-3 ${styles.iconWrapper}`}>
                  <i className={`bi ${feature.icon}`}></i>
                </div>
                <h3 className="h4 fw-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white-50 mb-0">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detailed Sections */}
      <div>
        {detailedFeatures.map((feature, index) => (
          <div key={index} className={`py-5 ${styles.detailSection} ${index % 2 !== 0 ? styles.detailSectionAlt : ''}`}>
            <div className="container">
                <div className="row align-items-center g-5">
                  <div className={`col-lg-6 ${index % 2 !== 0 ? 'order-lg-2' : ''}`}>
                    <div className={styles.visual}>
                      <i className={`bi ${feature.icon}`}></i>
                    </div>
                  </div>
                  <div className={`col-lg-6 ${index % 2 !== 0 ? 'order-lg-1' : ''}`}>
                    <h2 className={`display-5 fw-bold mb-4 ${styles.detailTitle}`}>{feature.title}</h2>
                    <p className="lead text-white-50 mb-4">{feature.desc}</p>
                    <ul className={`list-unstyled mb-4 ${styles.list}`}>
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="mb-2 fs-5">{benefit}</li>
                      ))}
                    </ul>
                    <Link to={feature.link} className={`btn btn-lg px-4 py-3 fw-bold text-decoration-none ${styles.ctaBtn}`}>
                      {feature.cta} <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
