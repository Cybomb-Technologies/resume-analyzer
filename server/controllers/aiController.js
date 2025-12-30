const axios = require('axios');

// PROMPTS
const GENERATE_QUESTIONS_PROMPT = `
Role: You are an expert Technical Interviewer and Hiring Manager for top-tier tech companies. Your goal is to generate a set of challenging, relevant, and role-specific interview questions based on a job description. A candidate's resume may or may not be provided.

Input Data:

Resume Text: {{ $json.resumeText }} (This may be empty or missing)
Job Description (JD): {{ $json.jobDescription }} (Required)
Instructions:

Analyze the Inputs:

If Resume Text is provided: Compare the resume against the Job Description. Identify key gaps, strengths, and specific technologies mentioned in both.
If Resume Text is MISSING or EMPTY: Focus entirely on the Job Description. Generate questions that effectively test a candidate's suitability for the specific role described in the JD, assuming a standard candidate profile for that level.
Generate Questions:

Create exactly 10 interview questions.
Mix of Types:
2 Technical/Hard Skill questions: Deep dive into specific tools or languages mentioned in the JD.
2 Behavioral/Situational questions: Focused on soft skills, leadership, or conflict resolution relevant to the role.
1 Role-Specific/Resume-Based question:
If Resume exists: Ask about a specific project or achievement from the resume.
If Resume is MISSING: Ask about a hypothetical scenario relevant to the JD (e.g., "How would you handle X situation described in the role responsibilities?").

Output Format (CRITICAL):

You MUST return a valid JSON object.
The structure must be:
{
  "questions": [
    {
      "question": "The interview question text here"
    },
    ...
  ]
}
Do NOT include any markdown formatting (like json ... ) in the output if possible, or ensure it's easily parseable. Just the raw JSON string is preferred.
`;

const EVALUATE_ANSWER_PROMPT = `
Role: You are a Fair and Encouraging Senior Technical Interviewer and Hiring Manager.
Goal: Evaluate the candidate's answer to the technical interview question provided.

Input Data:
- Job Description: {{ $json.jobDescription }}
- Question: {{ $json.question }}
- Candidate's Answer: {{ $json.userAnswer }}
- Resume Context: {{ $json.resumeText }}

Instructions:
1. **Analyze**: Compare the candidate's answer against the key requirements.
2. **Evaluate Fairness**:
   - If the answer is well-structured, covers key technologies (e.g., Kafka, DB choices), and explains *why*, score it HIGH (8-10).
   - **Crucial**: If the user provides a very strong, professional answer (similar to a model answer) with good depth, you MUST rate it highly (9/10 or 10/10). Do not nitpick for minor missing details if the core architecture and reasoning are solid.
   - Look for: Technical accuracy, clarity, use of standard terminology (e.g., "scalability", "idempotency", "async"), and problem-solving approach.
3. **Constructive Feedback**: Briefly mention what was good. If the score is less than 10, explain exactly what ONE or TWO specific things would make it perfect.
4. **Best Possible Answer**: Provide an ideal, model answer. (If the user's answer was already excellent, this can be similar to their answer but polished).

Output Format (JSON Only):
{
  "rating": "Score/10",
  "feedback": "Concise feedback.",
  "suggestion": "Actionable advice.",
  "bestAnswer": "The ideal answer."
}
IMPORTANT: Return ONLY valid JSON. No markdown formatting.
`;

// @desc    Generate Cover Letter via n8n
// @route   POST /api/ai/cover-letter
const generateCoverLetter = async (req, res) => {
    const { jobDescription, resumeText } = req.body;

    const n8nUrl = process.env.N8N_COVER_LETTER_WEBHOOK;

    if (!n8nUrl) {
        return res.status(500).json({ message: 'N8N Cover Letter Webhook not configured' });
    }

    try {
        const response = await axios.post(n8nUrl, {
            jobDescription,
            resumeText
        });
        
        // Assuming n8n returns object with { output: "text" } or similar structure
        // Adjust based on your actual n8n workflow output
        const coverLetter = response.data.output || response.data.json?.output || response.data.text || "No output from n8n";
        
        res.json({ coverLetter });
    } catch (error) {
        console.error("n8n Error:", error.message);
        res.status(500).json({ message: 'Error communicating with AI service' });
    }
};

// @desc    Generate Interview Questions via n8n
// @route   POST /api/ai/interview-questions
const generateInterviewQuestions = async (req, res) => {
    const { jobDescription, resumeText } = req.body;
    
    const n8nUrl = process.env.N8N_INTERVIEW_WEBHOOK;

    if (!n8nUrl) {
         return res.status(500).json({ message: 'N8N Interview Webhook not configured' });
    }

    try {
        const response = await axios.post(n8nUrl, {
            jobDescription,
            resumeText,
            systemPrompt: GENERATE_QUESTIONS_PROMPT
        });
        
        // Expecting n8n to return JSON array of questions
        const output = response.data.output || response.data.json || response.data;
        
        // If n8n returns a stringified JSON (common from LLM), parse it
        let questions = output;
        if (typeof output === 'string') {
             try {
                // Find the first '[' or '{' and the last ']' or '}'
                const firstOpen = output.indexOf('[');
                const firstObj = output.indexOf('{');
                const lastClose = output.lastIndexOf(']');
                const lastObj = output.lastIndexOf('}');

                let start = -1;
                let end = -1;

                // Determine if it looks like an array or object
                if (firstOpen !== -1 && (firstObj === -1 || firstOpen < firstObj)) {
                    start = firstOpen;
                } else if (firstObj !== -1) {
                    start = firstObj;
                }

                if (lastClose !== -1 && (lastObj === -1 || lastClose > lastObj)) {
                    end = lastClose;
                } else if (lastObj !== -1) {
                    end = lastObj;
                }

                if (start !== -1 && end !== -1) {
                    const jsonString = output.substring(start, end + 1);
                     questions = JSON.parse(jsonString);
                } else {
                    // Fallback to simpler clean if extraction fails
                    const cleaned = output.replace(/```json/g, '').replace(/```/g, '').trim();
                    questions = JSON.parse(cleaned);
                }
             } catch (e) {
                 // Fallback if parsing fails
                 console.error("JSON Parse Error:", e);
                 questions = [{ question: "Error parsing AI response", answer: output }];
             }
        }
        
        // Ensure structure matches frontend expectation { questions: [...] }
        if (Array.isArray(questions)) {
             res.json({ questions });
        } else if (questions?.questions) {
             res.json(questions);
        } else {
             res.json({ questions: [] });
        }

    } catch (error) {
         console.error("n8n Error:", error.message);
         res.status(500).json({ message: 'Error communicating with AI service' });
    }
};

// @desc    Evaluate User Answer via n8n
// @route   POST /api/ai/evaluate-answer
const evaluateAnswer = async (req, res) => {
    const { question, userAnswer, jobDescription, resumeText } = req.body;
    
    const n8nUrl = process.env.N8N_EVALUATE_WEBHOOK;

    if (!n8nUrl) {
         return res.status(500).json({ message: 'N8N Evaluate Webhook not configured' });
    }

    try {
        const response = await axios.post(n8nUrl, {
            question,
            userAnswer,
            jobDescription,
            resumeText,
            systemPrompt: EVALUATE_ANSWER_PROMPT
        });
        
        // Expecting n8n to return object with rating, feedback, suggestion
        // Example: { rating: "8/10", feedback: "Good answer...", suggestion: "Mention X, Y..." }
        const output = response.data.output || response.data.json || response.data;
        
        // If it's a string (JSON string), try to parse it
        let evaluation = output;
        if (typeof output === 'string') {
            try {
                // Attempt to clean and parse
                const cleaned = output.replace(/```json/g, '').replace(/```/g, '').trim();
                evaluation = JSON.parse(cleaned);
            } catch (e) {
                 // If not JSON, wrapped in object
                 evaluation = { feedback: output }; 
            }
        }

        res.json(evaluation);

    } catch (error) {
         console.error("n8n Error:", error.message);
         res.status(500).json({ message: 'Error communicating with AI service' });
    }
};

// @desc    Analyze Resume via n8n
// @route   POST /api/ai/analyze-resume
const analyzeResume = async (req, res) => {
    const { mode, resume_text, job_description } = req.body;
    
    const n8nUrl = process.env.N8N_RESUME_ANALYZER_WEBHOOK;

    if (!n8nUrl) {
         return res.status(500).json({ message: 'N8N Resume Analyzer Webhook not configured' });
    }

    try {
        const response = await axios.post(n8nUrl, {
            mode,
            resume_text,
            text: resume_text,
            content: resume_text,
            job_description: mode === "JD_BASED" ? job_description : null,
        });
        
        // n8n returns the analysis results
        const output = response.data.output || response.data.json || response.data;
        res.json(output);
    } catch (error) {
         console.error("n8n Error:", error.message);
         res.status(500).json({ message: 'Error communicating with AI service' });
    }
};

// @desc    Match Jobs via n8n
// @route   POST /api/ai/job-match
const matchJobs = async (req, res) => {
    const { resumeText, location, jobType } = req.body;
    
    const n8nUrl = process.env.N8N_JOB_MATCH_WEBHOOK;

    if (!n8nUrl) {
         return res.status(500).json({ message: 'N8N Job Match Webhook not configured' });
    }

    try {
        const response = await axios.post(n8nUrl, {
            resumeText,
            location,
            jobType
        });
        
        // n8n returns the matched jobs
        const output = response.data.output || response.data.json || response.data;
        res.json(output);
    } catch (error) {
         console.error("n8n Error:", error.message);
         res.status(500).json({ message: 'Error communicating with AI service' });
    }
};

module.exports = { generateCoverLetter, generateInterviewQuestions, evaluateAnswer, analyzeResume, matchJobs };
