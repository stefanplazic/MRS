'use strict';
module.exports = (sequelize, DataTypes) => {
  const ScheduleReview = sequelize.define('ScheduleReview', {
    description: DataTypes.STRING,
    diagnosis: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'DiagnosisLists',
        key: 'id'
      },
    },
    medicalRecord: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'MedicalRecords',
        key: 'id'
      }
    },
    doctor_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    }
  }, {});
  return ScheduleReview;
};