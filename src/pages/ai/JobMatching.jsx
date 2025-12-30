import React, { useState } from "react";
import styles from "./JobMatching.module.css";
import axios from "axios";

const JobMatching = () => {
  const [resumeText, setResumeText] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await axios.post(
        "https://n8n.cybomb.com/webhook/job-match",
        {
          resumeText,
          location,
          jobType,
        }
      );

      // Extract results from n8n's nested structure with robust fallback logic
      const rawData = response.data;
      console.log("Job Matching Response Debug:", rawData);

      let extractedJobs = null;

      // Helper to extract jobs from various possible structures
      const getJobs = (obj) => {
        if (!obj) return null;
        if (Array.isArray(obj.results)) return obj.results;
        if (Array.isArray(obj.matchedJobs)) return obj.matchedJobs;
        if (Array.isArray(obj.jobs)) return obj.jobs;
        return null;
      };

      if (Array.isArray(rawData)) {
        // Option 1: Results are in the first item of the array (N8N default)
        extractedJobs = getJobs(rawData[0]);
        
        // Option 2: The array itself is the list of jobs
        if (!extractedJobs && rawData.length > 0 && (rawData[0].job_title || rawData[0].title)) {
          extractedJobs = rawData;
        }
      } else {
        // Option 3: Results are in the top-level object
        extractedJobs = getJobs(rawData);
      }

      if (extractedJobs && Array.isArray(extractedJobs)) {
        setResults(extractedJobs);
      } else {
        console.error("Failed to parse jobs from:", rawData);
        setError("Unexpected response format from AI service. Please check console for details.");
      }
    } catch (err) {
      setError("Failed to fetch job matches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreClass = (score) => {
    if (score >= 80) return styles.scoreHigh;
    if (score >= 60) return styles.scoreMedium;
    return styles.scoreLow;
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>AI Job Matching</h1>
        <p className={styles.subtitle}>Discover prime opportunities tailored to your unique expertise</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.glassCard}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Professional Resume</label>
          <textarea
            className={styles.textarea}
            rows="6"
            placeholder="Paste your professional summary or full resume content..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>Preferred Location</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. Remote, Bangalore, New York"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className={styles.col}>
            <label className={styles.label}>Target Job Role</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. Senior Backend Engineer"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            />
          </div>
        </div>

        <button className={styles.submitBtn} disabled={loading}>
          {loading ? (
            <span className={styles.loader}>Searching Market...</span>
          ) : (
            "Scan for Opportunities"
          )}
        </button>
      </form>

      {/* Results Section */}
      <div className={styles.resultsContainer}>
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Our AI is analyzing thousands of job markers for you...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorState}>
            <i className="bi bi-exclamation-triangle"></i>
            <p>{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className={styles.resultsGrid}>
            <h2 className={styles.resultsTitle}>Optimal Career Matches</h2>
            <div className={styles.grid}>
              {results.map((job, index) => (
                <div className={styles.jobGlassCard} key={job.job_id || index}>
                  <div className={styles.jobHeader}>
                    <div>
                      <h3 className={styles.jobTitle}>{job.job_title}</h3>
                      <p className={styles.companyName}>{job.company}</p>
                    </div>
                    <div className={`${styles.scoreBadge} ${getScoreClass(job.match_score)}`}>
                      {job.match_score}% Match
                    </div>
                  </div>

                  <div className={styles.analysisBox}>
                    <h4 className={styles.sectionLabel}>AI Insights</h4>
                    <p className={styles.explanation}>{job.explanation}</p>
                  </div>

                  {job.missing_skills && job.missing_skills.length > 0 && (
                    <div className={styles.skillsBox}>
                      <h4 className={styles.sectionLabel}>Growth Areas</h4>
                      <div className={styles.skillsList}>
                        {job.missing_skills.map((skill, i) => (
                          <span key={i} className={styles.skillTag}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <a
                    href={job.redirect_url || job.applyLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.applyBtn}
                  >
                    View Opportunity <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatching;
