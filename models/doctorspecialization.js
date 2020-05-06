'use strict';
module.exports = (sequelize, DataTypes) => {
    const DoctorSpecialization = sequelize.define('DoctorSpecialization', {
        doctor_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
        specialization_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'Specializations',
                key: 'id'
            },
        }
    }, {});
    return DoctorSpecialization;
};