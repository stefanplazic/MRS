'use strict';
module.exports = (sequelize, DataTypes) => {
  const SchedulePrice = sequelize.define('SchedulePrice', {
    schedule_type_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'ScheduleTypes',
        key: 'id'
      },
    },
    clinic_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Clinics',
        key: 'id'
      },
    },
    price:DataTypes.FLOAT
  }, {});
  return SchedulePrice;
};