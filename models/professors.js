'use strict';
module.exports = (sequelize, DataTypes) => {
  const Professors = sequelize.define('Professors',{
      p_id: {
          type : DataTypes.STRING(45),
          allowNull : false,
      },
      p_name: {
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
          type : DataTypes.STRING(45),
          allowNull : false,
          primaryKey : true,
      },
  }, {});
  Professors.associate = function(models) {
    // associations can be defined here
  };
  return Professors;
};