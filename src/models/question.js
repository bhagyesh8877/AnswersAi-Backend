const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Question.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Question, { foreignKey: 'userId' });

module.exports = Question;
