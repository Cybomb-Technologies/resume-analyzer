import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './ai.css';

export default function MockInterview() {
  const [jobDesc, setJobDesc] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answerMode, setAnswerMode] = useState({}); // Track which question is in "Write Answer" mode
  const [userAnswers, setUserAnswers] = useState({}); // Store user answers
  const [evaluations, setEvaluations] = useState({}); // Store AI evaluations
  const [evaluating, setEvaluating] = useState({}); // Loading state for evaluation
  const [charCount, setCharCount] = useState(0);
  
  const resultsRef = useRef(null);

  useEffect(() => {
    setCharCount(jobDesc.length);
  }, [jobDesc]);

  const handleGenerate = async () => {
    if (!jobDesc.trim()) {
      alert("Please enter a job description.");
      return;
    }

    setLoading(true);
    const resumeText = localStorage.getItem('resume_text') || "";

    try {
      const res = await fetch('/api/ai/interview-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jobDesc, resumeText })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to generate questions");
      }

      const data = await res.json();
      setQuestions(Array.isArray(data.questions) ? data.questions : []);
      setAnswerMode({});
      setUserAnswers({});
      setEvaluations({});
      
      // Scroll to top of results
      if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Error generating questions.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswerMode = (index) => {
    setAnswerMode(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleAnswerChange = (index, value) => {
    setUserAnswers(prev => ({ ...prev, [index]: value }));
  };

  const submitAnswer = async (index, questionText) => {
    const answer = userAnswers[index];
    if (!answer?.trim()) return;

    setEvaluating(prev => ({ ...prev, [index]: true }));

    try {
      const resumeText = localStorage.getItem('resume_text');
      const res = await fetch('/api/ai/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: questionText, 
          userAnswer: answer,
          jobDescription: jobDesc,
          resumeText
        })
      });

      const data = await res.json();
      setEvaluations(prev => ({ ...prev, [index]: data }));
    } catch (error) {
      alert("Error evaluating answer. Ensure backend is running.");
    } finally {
      setEvaluating(prev => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="ai-container single-column">
      <div className="ai-card">
        
        {/* Header */}
        <div className="ai-header">
          <h2>AI Mock Interviewer</h2>
          <p>Prepare for your interview with tailored questions based on the job description.</p>
        </div>

        {/* Input Section (Moved to Top) */}
        <div className="ai-input-section py-3 px-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <div className="ai-input-wrapper horizontal">
                <label className="ai-label">
                    Job Description
                    <span className="status-indicator">
                      <span style={{width: '8px', height: '8px', background: charCount > 0 ? '#10b981' : '#94a3b8', borderRadius: '50%', display: 'inline-block'}}></span>
                      {charCount > 0 ? 'Ready to generate' : 'Awaiting input'}
                    </span>
                </label>
                <textarea 
                  className="ai-input full-width" 
                  placeholder="Paste the job description here...\n\nExample:\nLooking for a Junior Python Developer with knowledge of Django, Flask, and basic database concepts...\n\nRequirements:\n• 1-2 years Python experience\n• Understanding of REST APIs\n• Familiar with version control (Git)"
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  maxLength={3000}
                />
                <div className="char-counter text-white">
                  {charCount}/3000 characters
                </div>
            </div>
            <div className="ai-actions right-align">
                <button 
                    className="ai-btn" 
                    onClick={handleGenerate} 
                    disabled={loading || !jobDesc.trim()}
                >
                    {loading ? (
                      <>
                        <span className="loading-dots"></span>
                        Generating Questions
                      </>
                    ) : (
                      <>
                        Generate Interview Questions
                      </>
                    )}
                </button>
            </div>
        </div>

        {/* Output Section (Moved to Bottom) */}
        <div className="ai-output-section" ref={resultsRef}>
            {questions.length > 0 ? (
                <div className="ai-output-wrapper">
                    <div className="ai-label">
                        <div>
                          <strong>Interview Questions</strong>
                          <div style={{fontSize: '0.85rem', opacity: 0.7, marginTop: '0.25rem'}}>
                            {questions.length} Questions • Write answers to get AI feedback
                          </div>
                        </div>
                        <button 
                          className="copy-btn"
                          onClick={() => {
                            const allQuestions = questions.map((q, i) => 
                              `Q${i+1}: ${q.question}`
                            ).join('\n');
                            navigator.clipboard.writeText(allQuestions);
                            alert('Questions copied to clipboard!');
                          }}
                        >
                          📋 Copy All
                        </button>
                    </div>
                    
                    <div className="questions-list">
                        {questions.map((q, i) => (
                          <div key={i} className="question-item">
                            <div style={{display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem'}}>
                              <div style={{
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                color: 'white',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                flexShrink: 0,
                                fontSize: '0.9rem'
                              }}>
                                {i+1}
                              </div>
                              <div style={{flex: 1}}>
                                <p style={{
                                  marginBottom: '1rem', 
                                  lineHeight: '1.6',
                                  fontSize: '1.05rem',
                                  color: 'rgba(255, 255, 255, 0.95)'
                                }}>
                                  <strong style={{color: 'rgba(255, 255, 255, 0.9)'}}>Question:</strong> {q.question}
                                </p>
                                
                                {answerMode[i] && (
                                  <div className="answer-section">
                                    <textarea
                                      className="user-answer-input"
                                      placeholder="Type your answer here to get AI feedback..."
                                      value={userAnswers[i] || ''}
                                      onChange={(e) => handleAnswerChange(i, e.target.value)}
                                    />
                                    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem'}}>
                                      <button 
                                        className="web-app-button"
                                        onClick={() => submitAnswer(i, q.question)}
                                        disabled={evaluating[i] || !userAnswers[i]?.trim()}
                                        style={{padding: '0.5rem 1rem', fontSize: '0.9rem'}}
                                      >
                                        {evaluating[i] ? 'Evaluating...' : 'Submit for Feedback'}
                                      </button>
                                    </div>

                                    {evaluations[i] && (
                                      <div className="evaluation-result">
                                        <div className="evaluation-header">
                                          <span className="eval-rating">
                                            Rating: {evaluations[i].rating || 'N/A'}
                                          </span>
                                        </div>
                                        <div className="eval-content">
                                          {evaluations[i].feedback && (
                                            <div style={{marginBottom: '0.8rem'}}>
                                              <strong>Feedback:</strong>
                                              <ReactMarkdown className="markdown-content">
                                                {evaluations[i].feedback}
                                              </ReactMarkdown>
                                            </div>
                                          )}
                                          {evaluations[i].suggestion && (
                                            <div style={{marginBottom: '0.8rem'}}>
                                              <strong>Suggestion:</strong>
                                              <ReactMarkdown className="markdown-content">
                                                {evaluations[i].suggestion}
                                              </ReactMarkdown>
                                            </div>
                                          )}
                                          {evaluations[i].bestAnswer && (
                                            <div style={{marginTop: '1rem', padding: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', borderLeft: '3px solid #10b981'}}>
                                              <strong style={{color: '#10b981', display: 'block', marginBottom: '0.5rem'}}>Best Possible Answer:</strong>
                                              <div style={{fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.9.5)'}}>
                                                <ReactMarkdown className="markdown-content">
                                                  {evaluations[i].bestAnswer}
                                                </ReactMarkdown>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                              <div style={{display: 'flex', gap: '1rem'}}>
                                <button 
                                    className="reveal-btn"
                                    onClick={() => toggleAnswerMode(i)}
                                >
                                  {answerMode[i] ? 'Cancel Answer' : '✍️ Write Answer'}
                                </button>
                              </div>
                              <span 
                                className="text-white"
                                style={{
                                fontSize: '0.85rem',
                                opacity: 0.6,
                                fontStyle: 'italic'
                              }}>
                                Estimated answer time: 2-3 minutes
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="ai-output-placeholder" style={{minHeight: '200px'}}>
                    <span>💡</span>
                    <p>Your AI-tailored interview questions will appear here.</p>
                    <p style={{fontSize: '0.95rem', opacity: 0.6, marginTop: '1rem'}}>
                      Paste a job description above and generate questions.
                    </p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}