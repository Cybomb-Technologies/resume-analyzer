import React, { useState, useEffect } from 'react';
import styles from './AI.module.css';

export default function CoverLetter() {
  const [jobDesc, setJobDesc] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(jobDesc.length);
  }, [jobDesc]);

  const handleGenerate = async () => {
    if (!jobDesc.trim()) {
      alert("Please enter a job description.");
      return;
    }

    setLoading(true);
    const resumeText = localStorage.getItem('resume_text');

    try {
      const res = await fetch(`/api/ai/cover-letter?t=${Date.now()}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        body: JSON.stringify({ jobDescription: jobDesc, resumeText })
      });
      const data = await res.json();
      setGeneratedLetter(data.coverLetter);
    } catch (error) {
      alert("Error generating cover letter. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container-fluid py-4 ${styles.pageContainer}`}>
      <div className={`container-fluid px-3 h-100`}>
        <div className={`${styles.glassCard} d-flex flex-column`} style={{minHeight: '85vh'}}>
          
          {/* Header */}
          <div className={`p-4 p-md-5 ${styles.header}`}>
            <h2 className={`fw-bold mb-2 ${styles.titleGradient}`}>AI Cover Letter Generator</h2>
            <p className="text-white-50 fs-5 mb-0">Paste the job description and let our AI craft the perfect application for you.</p>
          </div>

          <div className="flex-grow-1 d-flex flex-column">
            <div className="row g-0 flex-grow-1">
              
              {/* Left: Input */}
              <div className="col-lg-6 border-end border-white-10 d-flex flex-column">
                <div className="p-4 p-md-5 d-flex flex-column flex-grow-1">
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <label className="text-white fw-bold">
                            Job Description
                        </label>
                        <span className="badge bg-opacity-10 bg-white border border-white-10 text-light fw-normal d-flex align-items-center gap-2">
                           <span className={styles.statusDot} style={{background: charCount > 0 ? '#10b981' : '#94a3b8'}}></span>
                           {charCount > 0 ? 'Ready' : 'Awaiting Input'}
                        </span>
                    </div>
                    
                    <div className="flex-grow-1 mb-3">
                        <textarea 
                          className={`form-control ${styles.inputField} h-100`} 
                          placeholder="Paste the job description here...\n\nExample:\nWe are seeking a Senior React Developer..."
                          value={jobDesc}
                          onChange={(e) => setJobDesc(e.target.value)}
                          maxLength={5000}
                          style={{resize: 'none', minHeight: '300px'}} 
                        />
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
                        <div className="text-white-50 small">
                            {charCount}/5000 characters
                        </div>
                        <button 
                            className={`btn btn-lg px-4 fw-bold ${styles.gradientBtn}`}
                            onClick={handleGenerate} 
                            disabled={loading || !jobDesc.trim()}
                        >
                            {loading ? (
                              <>
                                <span className={`me-2 ${styles.loadingDots}`}></span>
                                Generating
                              </>
                            ) : (
                              'Generate Cover Letter'
                            )}
                        </button>
                    </div>
                </div>
              </div>

              {/* Right: Output */}
              <div className="col-lg-6 d-flex flex-column">
                <div className="p-4 p-md-5 d-flex flex-column flex-grow-1">
                    {generatedLetter ? (
                        <div className="d-flex flex-column flex-grow-1 h-100">
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <div>
                                  <strong className="text-white d-block">Your Tailored Cover Letter</strong>
                                  <small className="text-white-50">
                                    {Math.ceil(generatedLetter.split(' ').length / 200)} min read
                                  </small>
                                </div>
                                <button 
                                  className={`btn btn-sm ${styles.actionBtn}`}
                                  onClick={() => {
                                    navigator.clipboard.writeText(generatedLetter);
                                    alert('Copied to clipboard!');
                                  }}
                                >
                                  <i className="bi bi-clipboard me-2"></i> Copy
                                </button>
                            </div>
                            <div className="flex-grow-1 h-100">
                                <textarea 
                                  className={`form-control ${styles.outputField} h-100`} 
                                  value={generatedLetter}
                                  onChange={(e) => setGeneratedLetter(e.target.value)}
                                  placeholder="Your AI-generated cover letter will appear here..."
                                  style={{resize: 'none', minHeight: '500px'}}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center text-center text-white-50 opacity-50 flex-grow-1">
                            <i className="bi bi-file-text display-1 mb-4"></i>
                            <p className="fs-5">Your AI-generated cover letter will appear here.</p>
                            <p className="small">Paste a job description and click "Generate" to get started.</p>
                        </div>
                    )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}