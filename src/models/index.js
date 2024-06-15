const sequelize = require('../config/database');
const User = require('./user');
const Question = require('./question');

const initModels = async () => {
  await sequelize.sync();
};

module.exports = {
  sequelize,
  User,
  Question,
  initModels,
};
