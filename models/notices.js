'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notices = sequelize.define('Notices', {
    n_id: DataTypes.STRING,
    n_title: DataTypes.STRING,
    n_content: DataTypes.STRING
  }, {});
  Notices.associate = function(models) {
    // associations can be defined here
  };
  return Notices;
};