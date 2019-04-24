'use strict';
module.exports = (sequelize, DataTypes) => {
  const Learners = sequelize.define('Learners',{
      l_id: {
        type : DataTypes.STRING(45),
        allowNull : false,
      },
      l_name: {
        type : DataTypes.STRING(20),
        allowNull : false,
      },
      password: {
        type : DataTypes.STRING(35),
        allowNull : false,
      },
      email: {
        type : DataTypes.STRING(45),
        allowNull : false,
      },
      pid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      token: {
        type : DataTypes.STRING(45),
      },
  }, {});
  Learners.associate = function(models) {
    // associations can be defined here
  };
  return Learners;
};