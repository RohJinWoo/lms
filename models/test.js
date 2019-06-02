'use strict';
module.exports = (sequelize, DataTypes) => {
  const test = sequelize.define('test', {
    testcol: {
      type: DataTypes.STRING(45),
      allowNull : false },
    idtest : {
      type : DataTypes.INTEGER,
      allowNull : false,
       }
  }, {});
  test.associate = function(models) {
    // associations can be defined here
  };
  return test;
};