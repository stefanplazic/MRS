'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    floor: DataTypes.STRING,
    label: DataTypes.STRING,
    clinic_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Clinics',
        key: 'id'
      },
    }
  }, {});
  return Room;
};