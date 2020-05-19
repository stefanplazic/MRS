'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClinicGrade = sequelize.define('ClinicGrade', {
    clinic_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Clinics',
        key: 'id'
      },
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    grade: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {});
  return ClinicGrade;
};