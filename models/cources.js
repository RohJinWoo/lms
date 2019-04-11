'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cources = sequelize.define('Cources', {
    c_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    c_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    start_register_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_register_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    start_cource_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_cource_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cardinal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plan: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    pid: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    test1: {
      type: DataTypes.STRING(2000),
    },
    test2: {
      type: DataTypes.STRING(2000),
    },
  }, {});
  Cources.associate = function(models) {
    // associations can be defined here
  };
  return Cources;
};