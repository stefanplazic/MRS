'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fName: DataTypes.STRING,
    lName: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    role_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      },
    },
    location: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id'
      }
    }
  }, {});
  return User;
};