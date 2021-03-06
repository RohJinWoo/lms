'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('learners', {
      l_id: {
          type : Sequelize.STRING(45),
          allowNull : false,
      },
      l_name: {
          type : Sequelize.STRING(20),
          allowNull : false,
      },
      password: {
          type : Sequelize.STRING(35),
          allowNull : false,
      },
      email: {
          type : Sequelize.STRING(45),
          allowNull : false,
      },
      pid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pid: {
        type: Sequelize.STRING(45),
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
    return queryInterface.dropTable('learners');
  }
};