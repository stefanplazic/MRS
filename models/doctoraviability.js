'use strict';
module.exports = (sequelize, DataTypes) => {
    const DoctorAviability = sequelize.define('DoctorAviability', {
        doctor_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
        day_of_the_week: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        start_time: {
            allowNull: false,
            type: 'TIMESTAMP'
        },
        end_time: {
            allowNull: false,
            type: 'TIMESTAMP'
        },

    }, {});
    return DoctorAviability;
};