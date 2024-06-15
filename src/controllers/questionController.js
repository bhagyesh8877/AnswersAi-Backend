const { Question, User } = require('../models');
const aiService = require('../services/aiService');

const createQuestion = async (req, res) => {
  const { question } = req.body;
  const userId = req.userId;
  try {
    const aiAnswer = await aiService.getAnswer(question);
    const newQuestion = await Question.create({ userId, content: question, answer: aiAnswer });
    res.status(201).json({ questionId: newQuestion.id, answer: aiAnswer });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await Question.findByPk(questionId, { include: User });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ questionId: question.id, question: question.content, answer: question.answer });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserQuestions = async (req, res) => {
  const { userId } = req.params;
  try {
    const questions = await Question.findAll({ where: { userId } });
    res.json({ questions });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createQuestion, getQuestion, getUserQuestions };
