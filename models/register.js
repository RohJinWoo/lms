'use strict';
module.exports = (sequelize, DataTypes) => {
  const Register = sequelize.define('Register', {
    pid: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    c_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    test1_score: {
      type: DataTypes.INTEGER,
    },
    test2_score: {
      type: DataTypes.INTEGER,
    },
  }, {});
  Register.associate = function(models) {
    // associations can be defined here
  };
  return Register;
};