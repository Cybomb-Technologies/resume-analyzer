const History = require('../models/History');

// @desc    Get user history
// @route   GET /api/history
// @access  Private
const getHistory = async (req, res) => {
    const history = await History.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(history);
};

// @desc    Save analysis result
// @route   POST /api/history
// @access  Private
const saveHistory = async (req, res) => {
    const { resumeName, analysisResult } = req.body;

    if (!resumeName || !analysisResult) {
        return res.status(400).json({ message: 'Please provide resume name and result' });
    }

    const history = await History.create({
        userId: req.user._id,
        resumeName,
        analysisResult,
    });

    res.status(201).json(history);
};

module.exports = { getHistory, saveHistory };
