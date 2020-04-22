'use strict';
module.exports = (sequelize, DataTypes) => {
  const MedicalRecord = sequelize.define('MedicalRecord', {
    medicalHistory: DataTypes.STRING
  }, {});
  MedicalRecord.associate = function(models) {
    // associations can be defined here
  };
  return MedicalRecord;
};