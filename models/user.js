'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    salt: DataTypes.STRING,
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