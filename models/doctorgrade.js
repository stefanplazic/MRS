'use strict';
module.exports = (sequelize, DataTypes) => {
  const DoctorGrade = sequelize.define('DoctorGrade', {
    doctor_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
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
  return DoctorGrade;
};