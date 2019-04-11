'use strict';
module.exports = (sequelize, DataTypes) => {
  const Evaluations = sequelize.define('Evaluations', {
    c_id: DataTypes.STRING,
    pid: DataTypes.STRING,
    evaluation1: DataTypes.INTEGER,
    evaluation2: DataTypes.INTEGER,
    evaluation3: DataTypes.INTEGER,
    evaluation4: DataTypes.INTEGER,
    evaluation5: DataTypes.STRING
  }, {});
  Evaluations.associate = function(models) {
    // associations can be defined here
  };
  return Evaluations;
};