'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define('Prescription', {
    name: DataTypes.STRING,
    drug: DataTypes.INTEGER,
    schedule_review: DataTypes.INTEGER,
    approved: DataTypes.BOOLEAN,
    nurse:{
        allowNull: true,
        type: DataTypes.INTEGER
      }
  }, {});
  return Prescription;
};