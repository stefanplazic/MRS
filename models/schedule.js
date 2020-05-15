'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    patienId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    scheduleType: DataTypes.STRING,
    doctorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    start_timestamp: DataTypes.DATE,
    end_timestamp: DataTypes.DATE,
    roomId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Rooms',
        key: 'id'
      },
    },
    reserved: DataTypes.BOOLEAN,
  }, {});
  return Schedule;
};