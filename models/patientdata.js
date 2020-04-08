'use strict';
module.exports = (sequelize, DataTypes) => {
  const PatientData = sequelize.define('PatientData', {
    phone: DataTypes.STRING,
    identification_number: DataTypes.STRING,
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    }
  }, {});
  return PatientData;
};