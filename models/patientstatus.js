'use strict';
module.exports = (sequelize, DataTypes) => {
  const PatientStatus = sequelize.define('PatientStatus', {
    status_type: DataTypes.STRING,
    refused_msg: DataTypes.ENUM('a', 'd', 'p'),
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
  }, {});
  return PatientStatus;
};