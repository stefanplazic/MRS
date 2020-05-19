'use strict';
module.exports = (sequelize, DataTypes) => {
  const DiagnosisList = sequelize.define('DiagnosisList', {
    name: DataTypes.STRING
  }, {});
  return DiagnosisList;
};