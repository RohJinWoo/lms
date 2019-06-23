'use strict';
module.exports = (sequelize, DataTypes) => {
  const notices = sequelize.define('notices', {
    n_id: DataTypes.INTEGER,
    n_title: DataTypes.STRING(200),
    n_content: DataTypes.STRING(10000)
  }, {});
  notices.associate = function(models) {
    // associations can be defined here
  };
  return notices;
};