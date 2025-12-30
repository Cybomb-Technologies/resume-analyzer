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

      setResults(response.data.matchedJobs);
    } catch (err) {
      setError("Failed to fetch job matches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <h2 className="text-center mb-4">AI Job Matching</h2>

      <form onSubmit={handleSubmit} className={styles.card}>
        <div className="mb-3">
          <label className="form-label">Paste Your Resume</label>
          <textarea
            className="form-control"
            rows="6"
            placeholder="Paste your resume content here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Preferred Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="India / Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Job Role</label>
            <input
              type="text"
              className="form-control"
              placeholder="Frontend Developer"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Matching Jobs..." : "Find Matching Jobs"}
        </button>
      </form>

      {/* Results */}
      <div className="mt-5">
        {loading && <p className="text-center">Analyzing your profile...</p>}

        {error && <p className="text-danger text-center">{error}</p>}

        {results.length > 0 && (
          <>
            <h4 className="mb-3">Matched Jobs</h4>
            <div className="row">
              {results.map((job, index) => (
                <div className="col-md-6 mb-4" key={index}>
                  <div className={styles.jobCard}>
                    <h5>{job.title}</h5>
                    <p className="text-muted">{job.company}</p>

                    <div className={styles.score}>
                      Match Score: <strong>{job.matchScore}%</strong>
                    </div>

                    <p className="small">{job.reason}</p>

                    <p className="text-warning small">
                      Missing Skills: {job.missingSkills?.join(", ") || "None"}
                    </p>

                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary btn-sm mt-2"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobMatching;
