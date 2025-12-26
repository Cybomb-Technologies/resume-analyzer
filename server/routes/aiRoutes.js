const express = require('express');
const router = express.Router();
const { generateCoverLetter, generateInterviewQuestions } = require('../controllers/aiController');

router.post('/cover-letter', generateCoverLetter);
router.post('/interview-questions', generateInterviewQuestions);
router.post('/evaluate-answer', require('../controllers/aiController').evaluateAnswer);

module.exports = router;
