'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExamBank = sequelize.define('ExamBank', {
    eb_id: DataTypes.STRING,
    eb_title: DataTypes.STRING,
    eb_exma1: DataTypes.STRING,
    eb_exam2: DataTypes.STRING,
    eb_exam3: DataTypes.STRING,
    eb_exam4: DataTypes.STRING,
    right_answer: DataTypes.INTEGER
  }, {});
  ExamBank.associate = function(models) {
    // associations can be defined here
  };
  return ExamBank;
};