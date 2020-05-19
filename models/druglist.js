'use strict';
module.exports = (sequelize, DataTypes) => {
  const DrugList = sequelize.define('DrugList', {
    name: DataTypes.STRING
  }, {});
  return DrugList;
};