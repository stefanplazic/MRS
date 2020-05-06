'use strict';
module.exports = (sequelize, DataTypes) => {
    const Vacation = sequelize.define('Vacation', {
        doctor_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
        vacation_date: {
            allowNull: false,
            type: DataTypes.DATE,
            default: Date.now()
        },

    }, {});
    return Vacation;
};