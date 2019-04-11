'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ExamBanks', {
      eb_id: {
        type: Sequelize.STRING(45),
        primaryKey: true,
        allowNull: false,
      },
      eb_title: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      eb_exma1: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      eb_exam2: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      eb_exam3: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      eb_exam4: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      right_answer: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ExamBanks');
  }
};