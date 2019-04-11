'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Evaluations', {
      c_id: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      pid: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      evaluation1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      evaluation2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      evaluation3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      evaluation4: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      evaluation5: {
        type: Sequelize.STRING(400),
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
    return queryInterface.dropTable('Evaluations');
  }
};