'use strict';
module.exports = (sequelize, DataTypes) => {
  const notice_uploadfiles = sequelize.define('notice_uploadfiles', {
    idnotices_uploadfile: {type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,},
    n_id: DataTypes.INTEGER,
    filepath: DataTypes.STRING(200)
  }, {});
  notice_uploadfiles.associate = function(models) {
    // associations can be defined here
  };
  return notice_uploadfiles;
};