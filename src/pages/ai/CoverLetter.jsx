import React, { useState, useEffect } from 'react';
import './ai.css';

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
      const res = await fetch('/api/ai/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <div className="ai-container">
      <div className="ai-card">
        
        {/* Header */}
        <div className="ai-header">
          <h2>AI Cover Letter Generator</h2>
          <p>Paste the job description and let our AI craft the perfect application for you.</p>
        </div>

        {/* Split Content */}
        <div className="ai-content">
            
            {/* Left: Input */}
            <div className="ai-section">
                <div className="ai-input-wrapper">
                    <label className="ai-label">
                        Job Description
                        <span className="status-indicator">
                          <span style={{width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block'}}></span>
                          {charCount > 0 ? 'Ready' : 'Awaiting Input'}
                        </span>
                    </label>
                    <textarea 
                      className="ai-input" 
                      placeholder="Paste the job description here...\n\nExample:\nWe are seeking a Senior React Developer with 5+ years of experience...\n\nKey Requirements:\n• Expert in React, TypeScript, and modern web technologies\n• Experience with state management (Redux, Context API)\n• Strong understanding of responsive design and web performance optimization"
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      maxLength={5000}
                    />
                    <div className="char-counter text-white">
                      {charCount}/5000 characters
                    </div>
                </div>
                <div className="ai-actions">
                    <button 
                        className="ai-btn" 
                        onClick={handleGenerate} 
                        disabled={loading || !jobDesc.trim()}
                    >
                        {loading ? (
                          <>
                            <span className="loading-dots"></span>
                            Generating
                          </>
                        ) : (
                          <>
                            Generate Cover Letter
                          </>
                        )}
                    </button>
                </div>
            </div>

            <div className="ai-divider"></div>

            {/* Right: Output */}
            <div className="ai-section output-section">
                {generatedLetter ? (
                    <div className="ai-output-wrapper">
                        <div className="ai-label">
                            <div>
                              <strong>Your Tailored Cover Letter</strong>
                              <div style={{fontSize: '0.85rem', opacity: 0.7, marginTop: '0.25rem'}}>
                                {Math.ceil(generatedLetter.split(' ').length / 200)} min read
                              </div>
                            </div>
                            <div style={{display: 'flex', gap: '0.5rem'}}>
                              <button 
                                className="copy-btn"
                                onClick={() => {
                                  navigator.clipboard.writeText(generatedLetter);
                                  alert('Copied to clipboard!');
                                }}
                              >
                                📋 Copy
                              </button>
                              
                            </div>
                        </div>
                        <div className="ai-result-content">
                            <textarea 
                              className="ai-output" 
                              value={generatedLetter}
                              onChange={(e) => setGeneratedLetter(e.target.value)}
                              placeholder="Your AI-generated cover letter will appear here..."
                            />
                        </div>
                    </div>
                ) : (
                    <div className="ai-output-placeholder">
                        <span>📄</span>
                        <p>Your AI-generated cover letter will appear here.</p>
                        <p style={{fontSize: '0.95rem', opacity: 0.6, marginTop: '1rem'}}>
                          Paste a job description and click "Generate Cover Letter" to get started.
                        </p>
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
}