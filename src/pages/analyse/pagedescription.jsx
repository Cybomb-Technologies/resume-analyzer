import React, { useState } from "react";
import "./pagedescription.css";
import { useNavigate } from "react-router-dom";

export default function PageDescription() {
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  READ MODE
  const mode = localStorage.getItem("analysis_mode") || "JD_BASED";

  //  ENV-SAFE API URL
  const API_URL = import.meta.env.VITE_API_URL;

  async function sendJDToN8N() {
    const resumeText = localStorage.getItem("resume_text");

    if (!resumeText) {
      alert("Resume not found. Please upload again.");
      return;
    }

    if (mode === "JD_BASED" && !jobDesc.trim()) {
      alert("Please enter job description!");
      return;
    }

    setLoading(true);

    try {
     const response = await fetch(
  `${API_URL}/webhook/Resume-Analyzer`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode,
      resume_text: resumeText,
      text: resumeText, // ADDED for n8n compatibility
      content: resumeText, // ADDED for safety
      job_description: mode === "JD_BASED" ? jobDesc : null,
    }),
  }
);

      const rawText = await response.text();

      if (!rawText || rawText.trim() === "") {
        alert("AI service is temporarily unavailable. Please try again later.");
        return;
      }

      let parsed;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        parsed = rawText;
      }

      if (Array.isArray(parsed)) parsed = parsed[0];
      if (parsed?.json) parsed = parsed.json;
      if (parsed?.output) parsed = parsed.output;

      if (typeof parsed === "string") {
        parsed = JSON.parse(
          parsed.replace(/```json/gi, "").replace(/```/g, "").trim()
        );
      }

      const finalResult = {
        summary: parsed.summary || "",
        ats_score: Number(parsed.ats_score) || 0,
        matched_score: Number(parsed.matched_score) || 0,
        matching_skills: Array.isArray(parsed.matching_skills)
          ? parsed.matching_skills
          : [],
        missing_skills: Array.isArray(parsed.missing_skills)
          ? parsed.missing_skills
          : [],
        strengths: Array.isArray(parsed.strengths)
          ? parsed.strengths
          : [],
        recommendations: parsed.recommendations || "",
      };

      localStorage.setItem("ai_result", JSON.stringify(finalResult));
      navigate("/result");

    } catch (err) {
      console.error("FINAL ERROR:", err);
      alert("AI service error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  //  EXISTING SAMPLES 
  const samples = [
    {
      title: "Full Stack Developer",
      text: `We are seeking a Full Stack Developer responsible for building scalable web applications.

Key Responsibilities:
- Develop frontend applications using React.js
- Build REST APIs using Node.js and Express
- Design and manage databases using MongoDB
- Deploy applications on cloud platforms like AWS or Azure
- Collaborate with UI/UX designers and backend teams
- Write clean, maintainable, and well-documented code

Required Skills:
React, Node.js, MongoDB, JavaScript, Git, Cloud Deployment`,
    },
    {
      title: "Data Analyst",
      text: `We are hiring a Data Analyst to analyze and interpret complex data sets.

Key Responsibilities:
- Analyze large datasets to identify trends and insights
- Write optimized SQL queries
- Perform data cleaning using Python
- Build dashboards using Power BI or Tableau
- Present reports to stakeholders

Required Skills:
SQL, Python, Excel, Power BI, Data Analysis`,
    },
    {
      title: "UI/UX Designer",
      text: `We are looking for a UI/UX Designer to improve user experience across products.

Key Responsibilities:
- Conduct user research and usability testing
- Create wireframes and prototypes
- Design interfaces using Figma
- Collaborate with developers and product managers
- Ensure accessibility and visual consistency

Required Skills:
Figma, UX Research, Wireframing, Prototyping, Usability Testing`,
    },
  ];

  return (
    <div className="paste-container">
      <div className="jd-card">

        <div className="card-header">
          <span className="header-bold">
            {mode === "JD_BASED"
              ? "Paste Your Job Description"
              : "Resume Only Analysis"}
          </span>

          {mode === "JD_BASED" && (
            <span className="header-bold">Select a Sample</span>
          )}
        </div>

        <div className="jd-body">

          {/*  JD MODE (UNCHANGED) */}
          {mode === "JD_BASED" && (
            <>
              <textarea
                className="jd-textarea"
                placeholder="Paste job description here..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                disabled={loading}
              />

              <div className="jd-sample-box">
                {samples.map((s, i) => (
                  <p
                    key={i}
                    className="sample-item"
                    onClick={() => setJobDesc(s.text)}
                  >
                    {s.title}
                  </p>
                ))}
              </div>
            </>
          )}

          {/* RESUME ONLY MODE (NEW – UI ONLY) */}
          {mode === "RESUME_ONLY" && (
            <div className="resume-only-content">
              <p className="resume-only-desc">
                We’ll analyze your resume for ATS compatibility, structure,
                keyword usage, and overall clarity — no job description required.
              </p>

              <div className="resume-only-points">
                <div>✓ ATS formatting & structure</div>
                <div>✓ Keyword optimization</div>
                <div>✓ Resume clarity & readability</div>
                <div>✓ Improvement recommendations</div>
              </div>
            </div>
          )}

        </div>

        <div className="text-center">
          <button
            className="analyse-btn"
            onClick={sendJDToN8N}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Start Analysis"}
          </button>
        </div>

      </div>
    </div>
  );
}
