'use strict';
module.exports = (sequelize, DataTypes) => {
  const tests = sequelize.define('tests', {
    testcol: DataTypes.STRING(45)
  }, {});
  tests.associate = function(models) {
    // associations can be defined here
  };
  return tests;
};