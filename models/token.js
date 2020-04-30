'use strict';
module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('Token', {
        code: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {});
    return Location;
};