const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/cover-letter', aiController.generateCoverLetter);
router.post('/interview-questions', aiController.generateInterviewQuestions);
router.post('/evaluate-answer', aiController.evaluateAnswer);
router.post('/analyze-resume', aiController.analyzeResume);
router.post('/job-match', aiController.matchJobs);

module.exports = router;
