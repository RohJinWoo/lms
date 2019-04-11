'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notices', {
      n_id: {
        type: Sequelize.STRING(45),
        primaryKey: true,
        allowNull: false,
      },
      n_title: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      n_content: {
        type: Sequelize.STRING(1000),
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
    return queryInterface.dropTable('Notices');
  }
};