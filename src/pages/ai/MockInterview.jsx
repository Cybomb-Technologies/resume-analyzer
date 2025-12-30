import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './AI.module.css';

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
      const res = await fetch(`/api/ai/interview-questions?t=${Date.now()}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
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
      const res = await fetch(`/api/ai/evaluate-answer?t=${Date.now()}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
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
    <div className={`container-fluid py-4 ${styles.pageContainer}`}>
      <div className="container-fluid px-3 h-100">
        <div className={`${styles.glassCard} d-flex flex-column`} style={{minHeight: '85vh'}}>
        
          {/* Header */}
          <div className={`p-4 p-md-5 ${styles.header}`}>
            <h2 className={`fw-bold mb-2 ${styles.titleGradient}`}>AI Mock Interviewer</h2>
            <p className="text-white-50 fs-5 mb-0">Prepare for your interview with tailored questions based on the job description.</p>
          </div>

          <div className="flex-grow-1 d-flex flex-column">
            {/* Input Section */}
            <div className="p-4 p-md-5 border-bottom border-secondary border-opacity-25">
                <div className="mb-3 d-flex justify-content-between align-items-center">
                    <label className="text-white fw-bold">Job Description</label>
                    <span className="badge bg-opacity-10 bg-white border border-white-10 text-light fw-normal d-flex align-items-center gap-2">
                       <span className={styles.statusDot} style={{background: charCount > 0 ? '#10b981' : '#94a3b8'}}></span>
                       {charCount > 0 ? 'Ready' : 'Awaiting Input'}
                    </span>
                </div>
                
                <textarea 
                  className={`form-control mb-3 ${styles.inputField}`} 
                  style={{minHeight: '200px'}}
                  placeholder="Paste the job description here...\n\nExample:\nlooking for a Junior Python Developer..."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  maxLength={3000}
                />
                
                <div className="d-flex justify-content-between align-items-center">
                    <div className="text-white-50 small">
                        {charCount}/3000 characters
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
                          'Generate Interview Questions'
                        )}
                    </button>
                </div>
            </div>

            {/* Output Section */}
            <div className="p-4 p-md-5" ref={resultsRef}>
                {questions.length > 0 ? (
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                              <strong className="text-white fs-5">Interview Questions</strong>
                              <div className="text-white-50 small">
                                {questions.length} Questions • Write answers to get AI feedback
                              </div>
                            </div>
                            <button 
                              className={`btn btn-sm ${styles.actionBtn}`}
                              onClick={() => {
                                const allQuestions = questions.map((q, i) => 
                                  `Q${i+1}: ${q.question}`
                                ).join('\n');
                                navigator.clipboard.writeText(allQuestions);
                                alert('Questions copied to clipboard!');
                              }}
                            >
                              <i className="bi bi-clipboard me-2"></i> Copy All
                            </button>
                        </div>
                        
                        <div className="d-flex flex-column gap-4">
                            {questions.map((q, i) => (
                              <div key={i} className={`p-4 text-white rounded-3 ${styles.questionItem}`} style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)'}}>
                                <div className="d-flex gap-3 mb-3">
                                  <div className={`flex-shrink-0 ${styles.questionNumber}`}>
                                    {i+1}
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="fs-5 mb-0" style={{lineHeight: '1.6'}}>
                                      <strong className="d-block text-white-50 small mb-1">Question</strong>
                                      {q.question}
                                    </p>
                                  </div>
                                </div>
                                
                                {answerMode[i] && (
                                  <div className="mt-3 ps-lg-5">
                                    <div className="p-3 rounded-3" style={{background: 'rgba(0,0,0,0.2)'}}>
                                        <textarea
                                          className={`form-control mb-3 bg-transparent text-white border-secondary border-opacity-50`}
                                          style={{ color: '#fff' }}
                                          placeholder="Type your answer here to get AI feedback..."
                                          value={userAnswers[i] || ''}
                                          onChange={(e) => handleAnswerChange(i, e.target.value)}
                                          rows={4}
                                        />
                                        <div className="d-flex justify-content-end">
                                          <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => submitAnswer(i, q.question)}
                                            disabled={evaluating[i] || !userAnswers[i]?.trim()}
                                          >
                                            {evaluating[i] ? 'Evaluating...' : 'Submit for Feedback'}
                                          </button>
                                        </div>

                                        {evaluations[i] && (
                                          <div className="mt-3 p-3 rounded border border-success border-opacity-25 bg-success bg-opacity-10">
                                            <div className="d-flex justify-content-between mb-2">
                                              <span className="fw-bold text-success">
                                                Rating: {evaluations[i].rating || 'N/A'}
                                              </span>
                                            </div>
                                            <div className="small text-white">
                                              {evaluations[i].feedback && (
                                                <div className="mb-2">
                                                  <strong className="text-success text-uppercase small d-block">Feedback</strong>
                                                  <ReactMarkdown>{evaluations[i].feedback}</ReactMarkdown>
                                                </div>
                                              )}
                                              {evaluations[i].suggestion && (
                                                <div className="mb-2">
                                                  <strong className="text-success text-uppercase small d-block">Suggestion</strong>
                                                  <ReactMarkdown>{evaluations[i].suggestion}</ReactMarkdown>
                                                </div>
                                              )}
                                              {evaluations[i].bestAnswer && (
                                                <div className="mt-3 p-2 rounded bg-dark bg-opacity-50 border border-success border-opacity-25">
                                                  <strong className="text-success small d-block mb-1">Best Answer:</strong>
                                                  <ReactMarkdown>{evaluations[i].bestAnswer}</ReactMarkdown>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                )}

                                <div className="d-flex justify-content-between align-items-center mt-3 ps-lg-5">
                                  <button 
                                      className={`btn btn-sm ${styles.actionBtn}`}
                                      onClick={() => toggleAnswerMode(i)}
                                  >
                                    {answerMode[i] ? 'Cancel Answer' : '✍️ Write Answer'}
                                  </button>
                                  <span className="text-white-50 small fst-italic">
                                    ~2 min answer
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-5 text-white-50 opacity-50">
                        <i className="bi bi-lightbulb display-1 mb-4 d-block"></i>
                        <h3 className="h5">Your AI-tailored interview questions will appear here.</h3>
                        <p className="small">Paste a job description above and generate questions.</p>
                    </div>
                )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}