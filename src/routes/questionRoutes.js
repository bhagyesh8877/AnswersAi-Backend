const express = require('express');
const { createQuestion, getQuestion, getUserQuestions } = require('../controllers/questionController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createQuestion);
router.get('/:questionId', authMiddleware, getQuestion);
router.get('/user/:userId', authMiddleware, getUserQuestions);

module.exports = router;
