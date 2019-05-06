'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notices = sequelize.define('Notices', {
    n_id: DataTypes.INTEGER,
    n_title: DataTypes.STRING(200),
    n_content: DataTypes.STRING(1000)
  }, {});
  Notices.associate = function(models) {
    // associations can be defined here
  };
  return Notices;
};