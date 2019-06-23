'use strict';
module.exports = (sequelize, DataTypes) => {
  const Professors = sequelize.define('professors',{
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
  }, {});
  Professors.associate = function(models) {
    // associations can be defined here
  };
  return Professors;
};