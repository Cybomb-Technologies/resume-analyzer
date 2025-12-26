const express = require('express');
const router = express.Router();
const { getHistory, saveHistory } = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getHistory)
    .post(protect, saveHistory);

module.exports = router;
