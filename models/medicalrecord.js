'use strict';
module.exports = (sequelize, DataTypes) => {
  const MedicalRecord = sequelize.define('MedicalRecord', {
    height: DataTypes.INTEGER,
    weight:DataTypes.FLOAT,
    blood_type:DataTypes.STRING,
    diopter:DataTypes.STRING,
    patient_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    }
  }, {});
  MedicalRecord.associate = function(models) {
  };
  return MedicalRecord;
};