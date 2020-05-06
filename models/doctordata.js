'use strict';
module.exports = (sequelize, DataTypes) => {
    const DoctorData = sequelize.define('DoctorData', {
        clinic_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'Clinics',
                key: 'id'
            },
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
        }
    }, {});
    return DoctorData;
};