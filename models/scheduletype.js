'use strict';
module.exports = (sequelize, DataTypes) => {
  const ScheduleType = sequelize.define('ScheduleType', {
    name: DataTypes.STRING,
  }, {});
  return ScheduleType;
};