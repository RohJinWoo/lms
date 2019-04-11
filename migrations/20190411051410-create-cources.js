'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cources', {
      c_id: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      c_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      start_register_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_register_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      start_cource_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_cource_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cardinal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      plan: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      pid: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      test1: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      test2: {
        type: Sequelize.STRING(2000),
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
    return queryInterface.dropTable('Cources');
  }
};