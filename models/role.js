'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.ENUM('patient', 'doctor', 'nurse', 'clinic_admin', 'clinic_center_admin')
  }, {});
  return Role;
};