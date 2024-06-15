const { User } = require('../models');

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json({ userId: user.id, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ userId: user.id, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createUser, getUser };
