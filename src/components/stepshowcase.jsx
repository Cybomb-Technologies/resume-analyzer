import React from "react";
import "./stepshowcase.css";

import uploadImg from "../assets/howitworks/upload.png";
import processImg from "../assets/howitworks/process.png";
import resultImg from "../assets/howitworks/result.png";

export default function StepsShowcase() {
  return (
    <section className="steps-section">

      {/* STEP 1 — IMAGE LEFT */}
      <div className="step-row step-1 px-5 mx-5">
        <div className="step-image">
          <img src={uploadImg} alt="Upload Resume" />
        </div>

        <div className="step-text">
          <h3><span>Step 1 —</span> Upload Resumes</h3>
          <p>
            Drag & drop your resume in seconds. Our system securely processes
            and prepares your resume for AI-powered analysis automatically.
          </p>
        </div>
      </div>

      {/* STEP 2 — IMAGE RIGHT */}
      <div className="step-row step-2 reverse px-5 mx-5">
        <div className="step-image">
          <img src={processImg} alt="Paste Job Description" />
        </div>

        <div className="step-text">
          <h3><span>Step 2 —</span> Paste or Improve Job Description</h3>
          <p>
            Paste the job description or select a sample role. This helps our AI
            understand required skills, experience, and keywords.
          </p>

          <p className="step-link">
            Don’t have one? <span>Improve Job Description</span> with AI.
          </p>
        </div>
      </div>

      {/* STEP 3 — IMAGE LEFT */}
      <div className="step-row step-3 px-5 mx-5">
        <div className="step-image">
          <img src={resultImg} alt="Get Results" />
        </div>

        <div className="step-text">
          <h3><span>Step 3 —</span> Get Ranked ATS Results</h3>
          <p>
            Instantly receive your ATS score, skill match, and keyword analysis.
            Identify gaps in your resume and get clear, AI-powered
            recommendations to improve your chances of getting shortlisted.
          </p>
        </div>
      </div>

    </section>
  );
}
