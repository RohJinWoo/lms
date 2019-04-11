'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Learners', {
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
          type : Sequelize.STRING(45),
          primaryKey : true,
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
    return queryInterface.dropTable('Learners');
  }
};