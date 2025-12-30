import React, { useState, useEffect } from "react";
import styles from "./JobMatching.module.css";
import axios from "axios";

const JobMatching = () => {
  const [resumeText, setResumeText] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(resumeText.length);
  }, [resumeText]);

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

      const rawData = response.data;
      let extractedJobs = null;

      const getJobs = (obj) => {
        if (!obj) return null;
        if (Array.isArray(obj.results)) return obj.results;
        if (Array.isArray(obj.matchedJobs)) return obj.matchedJobs;
        if (Array.isArray(obj.jobs)) return obj.jobs;
        return null;
      };

      if (Array.isArray(rawData)) {
        extractedJobs = getJobs(rawData[0]);
        if (!extractedJobs && rawData.length > 0 && (rawData[0].job_title || rawData[0].title)) {
          extractedJobs = rawData;
        }
      } else {
        extractedJobs = getJobs(rawData);
      }

      if (extractedJobs && Array.isArray(extractedJobs)) {
        setResults(extractedJobs);
      } else {
        setError("Could not parse job matches. Please try again.");
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
    <div className={`container-fluid ${styles.pageContainer}`}>
      <div className="container-fluid px-3 h-100">
        <div className={styles.glassCard} style={{ minHeight: '85vh' }}>
          
          <header className={styles.header}>
            <h2 className={styles.titleGradient}>AI Job Matching</h2>
            <p className="text-white-50 fs-5 mb-0">Discover prime opportunities tailored to your unique expertise</p>
          </header>

          <div className={styles.mainGrid}>
            {/* Left: Input Form (Sticky-like) */}
            <aside className={styles.stickySide}>
              <form onSubmit={handleSubmit} className="h-100 d-flex flex-column">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className={styles.label}>Professional Resume</label>
                    <span className="badge bg-opacity-10 bg-white border border-white-10 text-light fw-normal d-flex align-items-center gap-2">
                       <span className={styles.statusDot} style={{background: charCount > 0 ? '#10b981' : '#94a3b8'}}></span>
                       {charCount > 0 ? 'Ready' : 'Awaiting Input'}
                    </span>
                  </div>
                  <textarea
                    className={`form-control ${styles.inputField}`}
                    style={{ minHeight: '200px', resize: 'none' }}
                    placeholder="Paste your professional summary or resume content..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    required
                  />
                  <div className="text-white-50 small mt-1 text-end">
                    {charCount} characters
                  </div>
                </div>

                <div className="mb-4">
                  <label className={styles.label}>Preferred Location</label>
                  <input
                    type="text"
                    className={`form-control ${styles.inputField}`}
                    placeholder="e.g. Remote, Bangalore"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className={styles.label}>Target Job Role</label>
                  <input
                    type="text"
                    className={`form-control ${styles.inputField}`}
                    placeholder="e.g. Senior Frontend Developer"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  />
                </div>

                <button className={`btn btn-lg w-100 mt-auto ${styles.gradientBtn}`} disabled={loading}>
                  {loading ? (
                    <span className={styles.loadingDots}>Scanning Market</span>
                  ) : (
                    "Scan for Opportunities"
                  )}
                </button>
              </form>
            </aside>

            {/* Right: Results (Scrollable) */}
            <main className={styles.scrollSide}>
              {loading && results.length === 0 && (
                <div className={styles.emptyState}>
                  <div className="spinner-border text-primary mb-4" role="status"></div>
                  <h3>Analyzing job markets...</h3>
                  <p>Our AI is matching your skills with thousands of live opportunities.</p>
                </div>
              )}

              {error && (
                <div className={styles.emptyState}>
                  <i className={`bi bi-exclamation-triangle ${styles.emptyIcon}`} style={{ color: '#ef4444' }}></i>
                  <h3>Search Failed</h3>
                  <p>{error}</p>
                </div>
              )}

              {results.length > 0 ? (
                <div className={styles.resultsGrid}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-white mb-0">Career Matches</h3>
                    <span className="text-white-50">{results.length} positions found</span>
                  </div>
                  {results.map((job, index) => (
                    <div className={styles.jobCard} key={job.job_id || index}>
                      <div className={styles.jobHeader}>
                        <div>
                          <h4 className={styles.jobTitle}>{job.job_title}</h4>
                          <p className={styles.company}>{job.company}</p>
                        </div>
                        <div className={`${styles.scoreBadge} ${getScoreClass(job.match_score)}`}>
                          {job.match_score}% Match
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className={styles.sectionLabel}>AI Match Explanation</span>
                        <p className={styles.explanation}>{job.explanation}</p>
                      </div>

                      {job.missing_skills && job.missing_skills.length > 0 && (
                        <div>
                          <span className={styles.sectionLabel}>Skills to Boost</span>
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
                        Details & Apply <i className="bi bi-arrow-right"></i>
                      </a>
                    </div>
                  ))}
                </div>
              ) : !loading && !error && (
                <div className={styles.emptyState}>
                  <i className={`bi bi-briefcase ${styles.emptyIcon}`}></i>
                  <h3>Your matches will appear here</h3>
                  <p>Enter your resume and target role to begin the search.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatching;
