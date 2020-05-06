'use strict';
module.exports = (sequelize, DataTypes) => {
    const Specialization = sequelize.define('Specialization', {
        name: DataTypes.STRING
    }, {});
    return Specialization;
};