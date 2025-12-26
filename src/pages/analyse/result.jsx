import React, { useEffect, useState } from "react";
import "./result.css";

export default function Result() {
  const [data, setData] = useState(null);

  //  READ MODE
  const mode = localStorage.getItem("analysis_mode") || "JD_BASED";

  useEffect(() => {
    const stored = localStorage.getItem("ai_result");
    if (!stored) return;

    try {
      setData(JSON.parse(stored));
    } catch (err) {
      console.error("JSON parse error:", err);
    }
  }, []);

  if (!data) {
    return (
      <div className="result-container">
        <p className="loading-text">Loading analysis...</p>
      </div>
    );
  }

  return (
    <div className="result-container">
      <h1 className="result-title">AI Resume Analysis Report</h1>

      {/* SCORES */}
      <div className="score-grid">
        <div className="score-card blue">
          <p>ATS Score</p>
          <h2>{data.ats_score ?? "N/A"}</h2>
        </div>

        {/*  Hide Matched Score for Resume Only */}
        {mode === "JD_BASED" && (
          <div className="score-card purple">
            <p>Matched Score</p>
            <h2>{data.matched_score ?? "N/A"}</h2>
          </div>
        )}
      </div>

      {/* SUMMARY */}
      <div className="result-card highlight">
        <h3>🧠 AI Summary</h3>
        <p>{data.summary}</p>
      </div>

      {/*  SKILLS — ONLY FOR JD MODE */}
      {mode === "JD_BASED" && (
        <div className="result-grid">
          <div className="result-card">
            <h3>Matching Skills</h3>
            <div className="skill-badges">
              {data.matching_skills.map((skill, i) => (
                <span key={i} className="badge success">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="result-card">
            <h3>Missing Skills</h3>
            <div className="skill-badges">
              {data.missing_skills.map((skill, i) => (
                <span key={i} className="badge danger">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STRENGTHS */}
      <div className="result-card">
        <h3>Strengths</h3>
        <ul className="list">
          {data.strengths.map((item, i) => (
            <li key={i}> {item}</li>
          ))}
        </ul>
      </div>

      {/* RECOMMENDATIONS */}
      <div className="result-card">
        <h3>Recommendations</h3>

        {Array.isArray(data.recommendations) ? (
          <ul className="recommendation-list">
            {data.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>{data.recommendations}</p>
        )}
      </div>
    </div>
  );
}
