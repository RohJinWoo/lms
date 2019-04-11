'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Registers', {
      pid: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      c_id: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      test1_score: {
        type: Sequelize.INTEGER
      },
      test2_score: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Registers');
  }
};